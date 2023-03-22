import jet from "@randajan/jet-core";
import vault from "../../uni/helpers/vault";

const { solid, virtual } = jet.prop;

const map = (list, byIndex, callback, sort) => {
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

export class SchemaSync extends jet.types.Plex {

  constructor(name, stream, loader) {
    const [uid, _p] = vault.set({
      state: "waiting",
      index: {},
      list: [],
      before: {},
      after: {},
      set:(key, child, duplicateError=true)=>{
        key = this.formatKey(key, "set");
        if (_p.index[key] == null) {
          _p.list.push(_p.index[key] = child);
          return child;
        }
        if (duplicateError) { throw Error(this.msg(`set failed - duplicate`, key)); }
      }
    });

    _p.builder = _=>{
      const data = jet.isRunnable(stream) ? stream() : stream;
      if (Promise.jet.is(data)) { throw Error(this.msg(`init failed - promise found at sync`)); }
      loader(this, data, _p.set);
      return this;
    };

    super((...args)=>this.get(...args));

    solid.all(this, {
      uid
    }, false);

    solid.all(this, {
      name
    })

    virtual.all(this, {
      state: _ => _p.state,
      count: _ => { this.init(); return _p.list.length; }
    });

    virtual.all(this, {
      index: _ => { this.init(); return { ..._p.index }; },
      list: _ => { this.init(); return [..._p.list]; },
    }, false);

  }

  msg(text, key) {
    key = String.jet.to(key);
    return this.name + " " + (key ? "key '"+key+"' " : "") + text;
  }

  formatKey(key, action = "format") {
    if (key = String.jet.to(key)) { return key; }
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

  exist(key) {
    const { index } = vault.get(this.uid);
    this.init();
    return index[String.jet.to(key)] != null;
  }

  get(key, missingError=true) {
    const { index } = vault.get(this.uid);
    this.init();
    const child = index[String.jet.to(key)];
    if (child) { return child; }
    if (missingError) { throw Error(this.msg(`get failed - missing key`, key)); }
  }

  // remove(key, ...args) {
  //   const { list, index, removeChildren } = vault.get(this.uid);
  //   this.init();
  //   key = this.formatKey(key, "remove");
  //   const child = index[key];
  //   const x = list.indexOf(child);
  //   if (x < 0) { throw Error(this.msg(`remove failed - not found`, key)); }
  //   if (removeChildren(child, ...args) === false) { return false; }
  //   list.splice(x, 1);
  //   delete index[key];
  //   return true;
  // }

  map(callback, sort) {
    const { list } = vault.get(this.uid);
    this.init();
    return map(list, true, callback, sort);
  }

  forEach(callback, sort) {
    const { list } = vault.get(this.uid);
    this.init();
    return map(list, false, callback, sort);
  }

  filter(checker, sort) {
    return this.forEach((child, i, count, stop) => {
      if (checker(child, i, count, stop)) { return child; }
    }, sort);
  }

  find(checker, sort) {
    return this.forEach((child, i, count, stop) => {
      if (checker(child, i, count, stop)) { return stop(child); }
    }, sort)[0];
  }

}

export default SchemaSync;