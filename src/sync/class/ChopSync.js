import jet from "@randajan/jet-core";
import vault from "../../uni/helpers/vault";

const { solid, virtual } = jet.prop;

const formatKey = key=>jet.isMapable(key) ? JSON.stringify(key) : String.jet.to(key);

export class ChopSync extends jet.types.Plex {

  static map(list, byIndex, callback, sort) {
    const sorted = sort ? list.sort(sort) : list;
    const stop = val => { stop.active = true; return val; }
    const result = byIndex ? {} : [];
    let count = 0;
  
    for (let i in sorted) {
      if (stop.active) { break; }
      const child = sorted[i];
      const r = callback(child, i + 1, count, stop);
      if (r === undefined) { continue; }
      if (byIndex) { result[child.key] = r; }
      else { result.push(r); }
      count++;
    }
  
    return result;
  }

  constructor(name, config={}) {
    const { stream, loader, checker, parent, childName } = Object.jet.to(config);
    const [uid, _p] = vault.set({
      state: "waiting",
      index: {},
      list: [],
      checker:jet.isRunnable(checker) ? checker : _=>true,
      chops:{},
      _chops:[]
    });

    _p.builder = _=>{
      const data = jet.isRunnable(stream) ? stream() : stream;
      if (Promise.jet.is(data)) { throw Error(this.msg(`init failed - promise found at sync`)); }
      loader(this, data, _p.set);
      return this;
    };

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
      parent:parent instanceof ChopSync ? parent : undefined
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
    key = formatKey(key);
    return this.name + (key ? ` ${this.childName} '${key}' ` : " ") + text;
  }

  validateKey(key, action = "format") {
    if (key = formatKey(key)) { return key; }
    throw Error(this.msg(`${action} failed - key undefined`));
  }

  init(streamError=true) {
    const _p = vault.get(this.uid);
    if (_p.state === "ready") { return this; }
    if (_p.state === "pending") { return _p.build; }
    if (_p.state !== "error") {
      _p.state = "pending";
      try {
        _p.build = _p.builder();
        _p.state = "ready";
        return this;
      }
      catch (err) {
        _p.error = err;
        _p.state = "error";
        _p.errorAt = new Date();
      }
    }
    if (!streamError) { return this; }
    throw _p.error;
  }

  afterInit(execute) {
    return (...args)=>{
      this.init();
      return execute(...args);
    }
  }

  addChop(name, checker) {
    const _p = vault.get(this.uid);
    name = formatKey(name);
    if (!name) { throw Error(this.msg(`addChop failed - missing name`)); }
    return _p.chops[name] = new ChopSync(name, {
      parent:this,
      loader:(chop)=>{
        const _c = vault.get(chop.uid);
        this.map(false, (child)=>{ _c.set(child); });
        _p._chops.push(_c);
      },
      checker,
      childName:this.childName
    });
  }

  getChop(name, missingError=true) {
    this.init();
    name = formatKey(name);
    if (!name) { throw Error(this.msg(`getChop failed - missing name`)); }
    const { chops } = vault.get(this.uid);
    const chop = chops[name];
    if (chop) { return chop; }
    if (missingError) { throw Error(this.msg(`chop '${name}' getChop failed - not found`)); }
  }

  exist(key, missingError=false) {
    this.init();
    key = formatKey(key);
    const { index } = vault.get(this.uid);
    if (index.hasOwnProperty()) { return true; }
    if (missingError) { throw Error(this.msg(`exist failed - missing key`, key)); }
    return false;
  }

  get(key, missingError=true) {
    this.init();
    key = formatKey(key);
    const { index } = vault.get(this.uid);
    const child = index[key];
    if (child) { return child; }
    if (missingError) { throw Error(this.msg(`get failed - missing key`, key)); }
  }

  map(byIndex, callback, sort) {
    this.init();
    return ChopSync.map(vault.get(this.uid).list, byIndex, callback, sort);
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

export default ChopSync;