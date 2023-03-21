import jet from "@randajan/jet-core";
import vault from "../../../uni/helpers/vault";

const { solid, virtual } = jet.prop;

const map = async (list, byIndex, callback, sort) => {
  const sorted = sort ? list.sort(sort) : list;
  const stop = val => { stop.active = true; return val; }
  const result = byIndex ? {} : [];
  let count = 0;

  for (let i in sorted) {
    if (stop.active) { break; }
    const child = sorted[i];
    const r = await callback(child, i + 1, count, stop);
    if (r === undefined) { continue; }
    if (byIndex) { result[child.key] = r; }
    else { result.push(r); }
    count++;
  }

  return result;
}

export class SchemaAsync extends jet.types.Plex {

  constructor(name, stream, loader) {
    const [uid, _p] = vault.set({
      state: "waiting",
      index: {},
      list: [],
      before: {},
      after: {},
    });

    _p.builder = async _=>{
      const set = (key, child, duplicateError=true)=>{
        key = this.formatKey(key, "set");
        if (_p.index[key] == null) {
          _p.list.push(_p.index[key] = child);
          return child;
        }
        if (duplicateError) { throw Error(this.msg(`set failed - duplicate`, key)); }
      }
      const data = (jet.isRunnable(stream) ? stream() : stream);
      loader(this, set, await data);

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
      count: async _ => { await this.init(); return _p.list.length; }
    });

    virtual.all(this, {
      index: async _ => { await this.init(); return { ..._p.index }; },
      list: async _ => { await this.init(); return [..._p.list]; },
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

  async init(initError=true) {
    const _p = vault.get(this.uid);
    if (_p.state === "ready") { return this; }
    if (_p.state === "pending") { return _p.build; }
    if (_p.state !== "error") {
      _p.state = "pending";
      try {
        await (_p.build = _p.builder());
        _p.state = "ready";
        return this;
      }
      catch (err) {
        _p.error = err;
        _p.state = "error";
        _p.errorAt = new Date();
      }
    }
    if (!initError) { return this; }
    throw _p.error;
  }

  async exist(key) {
    const { index } = vault.get(this.uid);
    await this.init();
    return index[String.jet.to(key)] != null;
  }

  async get(key, missingError=true) {
    const { index } = vault.get(this.uid);
    await this.init();
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

  async map(callback, sort) {
    const { list } = vault.get(this.uid);
    await this.init();
    return map(list, true, callback, sort);
  }

  async forEach(callback, sort) {
    const { list } = vault.get(this.uid);
    await this.init();
    return map(list, false, callback, sort);
  }

  async filter(checker, sort) {
    return this.forEach((child, i, count, stop) => {
      if (checker(child, i, count, stop)) { return child; }
    }, sort);
  }

  async find(checker, sort) {
    return this.forEach((child, i, count, stop) => {
      if (checker(child, i, count, stop)) { return stop(child); }
    }, sort)[0];
  }

}

export default SchemaAsync