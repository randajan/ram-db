import jet from "@randajan/jet-core";
import vault from "../helpers/vault";

const { solid, virtual } = jet.prop;

export class Chop extends jet.types.Plex {

  static formatKey(key) { return jet.isMapable(key) ? JSON.stringify(key) : String.jet.to(key); }

  constructor(name, builder, config={}) {
    const { stream, loader, checker, parent, childName } = Object.jet.to(config);
    const [uid, _p] = vault.set({
      state: "waiting",
      index: {},
      list: [],
      builder,
      loader,
      stream:jet.isRunnable(stream) ? stream : _=>stream,
      checker:jet.isRunnable(checker) ? checker : _=>true,
      chops:{},
      _chops:[]
    });

    _p.set = (child, key, duplicateError=true)=>{
      key = this.validateKey(key || child?.key, "set");

      if (_p.index.hasOwnProperty(key)) {
        if (duplicateError) { throw Error(this.msg(`set failed - duplicate`, key)); }
        return;
      }

      if (!_p.checker(child, key)) { return; }
      _p.list.push(_p.index[key] = child);

      for (let chop of _p._chops) { chop.set(child);}

      return child;
    }

    _p.remove = (child, missingError=true)=>{
      const key = this.validateKey(child?.key, "remove");
      const id = _p.list.indexOf(child);

      if (id<0) {
        if (missingError) { throw Error(this.msg(`remove failed - missing`, key)); }
        return false;
      }

      _p.list.splice(id, 1);
      delete _p.index[key];

      for (let chop of _p._chops) { chop.remove(child, false);}

      return true;
    }

    super((...args)=>this.get(...args));

    solid.all(this, {
      uid,
      parent
    }, false);

    solid.all(this, {
      name,
      childName:String.jet.to(childName) || "key"
    })

    virtual.all(this, {
      state: _ => _p.state,
      count: this.afterInit(_=>_p.list.length)
    });

    virtual.all(this, {
      index: this.afterInit(_=>({ ..._p.index })),
      list: this.afterInit(_=>([..._p.list])),
    }, false);

  }

  msg(text, key) {
    key = Chop.formatKey(key);
    return this.name + (key ? ` ${this.childName} '${key}' ` : " ") + text;
  }

  validateKey(key, action = "format") {
    if (key = Chop.formatKey(key)) { return key; }
    throw Error(this.msg(`${action} failed - key undefined`));
  }

  init(streamError=true) {
    const _p = vault.get(this.uid);
    if (_p.state === "ready") { return this; }
    if (_p.state === "pending") { return _p.build; }
    if (_p.state !== "error") {
      try { return _p.build = _p.builder(this); } catch (err) {
        _p.error = err;
        _p.state = "error";
        _p.errorAt = new Date();
      }
    }
    if (!streamError) { return this; }
    throw _p.error;
  }

  getChop(name, missingError=true) {
    name = Chop.formatKey(name);
    if (!name) { throw Error(this.msg(`getChop failed - missing name`)); }
    const { chops } = vault.get(this.uid);
    const chop = chops[name];
    if (chop) { return chop; }
    if (missingError) { throw Error(this.msg(`chop '${name}' getChop failed - not found`)); }
  }

  exist(key, missingError=false) {
    key = Chop.formatKey(key);
    const { index } = vault.get(this.uid);
    if (index.hasOwnProperty()) { return true; }
    if (missingError) { throw Error(this.msg(`exist failed - missing key`, key)); }
    return false;
  }

  get(key, missingError=true) {
    key = Chop.formatKey(key);
    const { index } = vault.get(this.uid);
    const child = index[key];
    if (child) { return child; }
    if (missingError) { throw Error(this.msg(`get failed - missing key`, key)); }
  }

  map(byIndex, callback, sort) {
    return syncMap(vault.get(this.uid).list, byIndex, callback, sort);
  }

  filter(byIndex, checker, sort) {
    return this.map(byIndex, (child, i, count, stop) => {
      if (checker(child, i, count, stop)) { return child; }
    }, sort);
  }

  find(checker, sort) {
    return this.map(false, (child, i, count, stop) => {
      if (checker(child, i, count, stop)) { return stop(child); }
    }, sort)[0];
  }

}

export default Chop;