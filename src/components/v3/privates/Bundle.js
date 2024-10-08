import { toStr } from "../../uni/consts";
import { isFce, toFce, toStr, wrapFce } from "../../uni/formats";
import { Record } from "../class/Record";


export class Bundle {

  constructor(parentName, name, getGroup) {

    this.name = toStr(name);

    if (!this.name) { throw Error(this.msg("critical error - missing name")); }

    this.fullName = parentName ? (parentName + "." + this.name) : this.name;
    this.rawData = {};
    this.handlers = {};
    this.getGroup = wrapFce(toStr, toFce(getGroup));

  }

  msg(text, id, group) {
    const { fullName } = this;
    id = toStr(id);
    group = toStr(group);
    let msg = fullName || "";
    if (group) { msg += ` group('${group}')`; }
    if (id) { msg += ` record('${id}')`; }
    if (text) { msg += " "+text; }
    return msg.trim();
  }

  getRawData(group, throwError=true, autoCreate=false) {
    const { rawData } = this;
    if (rawData[group]) { return rawData[group]; }
    if (autoCreate) { return rawData[group] = { index:{}, list:[] }; }
    if (throwError) { throw Error(this.msg(`not found`, undefined, group)); }
    return { index:{}, list:[] }
  };

  validateId(id, throwError=true, action="validateId") {
    if (id = toStr(id)) { return id; }
    if (throwError) { throw Error(this.msg(`${action}(...) failed - id undefined`));}
  }

  on(event, callback, onlyOnce=false) {
    if (!isFce(callback)) { throw Error(this.msg(`on(...) require callback`)); }
    const { handlers } = this;
    const list = (handlers[event] || (handlers[event] = []));

    let remove;
    const cb = onlyOnce ? (...args)=>{ callback(...args); remove(); } : callback;
    
    list.unshift(cb);

    return remove = _ => {
      const id = list.indexOf(cb);
      if (id >= 0) { list.splice(id, 1); }
      return callback;
    }
  }

  run(event, args=[], throwError = true) {
    const handlers = this.handlers[event];
    if (!handlers?.length) { return true; }

    for (let i=handlers.length-1; i>=0; i--) {
      const cb = handlers[i];
      if (cb) { cb(...args, throwError); }
    }
    
    return true;
  }

  reset(throwError=true) {
    for (let i in this.rawData) { delete this.rawData[i]; }
    return this.run("reset", [], throwError);
  }

  _addOne(group, id, rec, throwError=true) {
    const { index, list } = this.getRawData(group, throwError, true);
    
    if (index.hasOwnProperty(id)) {
      if (throwError) { throw Error(this.msg(`add(...) failed - duplicate`, id, group)); }
      return false;
    }

    list.push(index[id] = rec);

    return this.run("add", [rec, group], throwError);
  }

  add(rec, throwError=true) {
    const group = this.getGroup(rec);
    const id = this.validateId(rec.id, throwError, "add");
    if (!Array.isArray(group)) { return this._addOne(group, id, rec, throwError); }
    let ok = true;
    for (const g of group) { ok = this._addOne(g, id, rec, throwError) && ok; }
    return ok;
  }

  _removeOne(group, id, rec, throwError=true) {
    const { index, list } = this.getRawData(group, throwError);
    const id = list.indexOf(rec);

    if (id < 0) {
      if (throwError) { throw Error(this.msg(`remove(...) failed - missing`, id, group)); }
      return false;
    }

    if (list.length === 1) { delete this.rawData[group]; } else {
      list.splice(id, 1);
      delete index[id];
    }
    
    return this.run("remove", [rec, group], throwError);
  }

  remove(rec, throwError=true) {
    const group = this.getGroup(rec);
    const id = this.validateId(rec.id, throwError, "remove");
    if (!Array.isArray(group)) { return this._removeOne(group, id, rec, throwError); }
    let ok = true;
    for (const g of group) { ok = (this._removeOne(g, id, rec, throwError)) && ok; }
    return ok;
  }

  getBy(group, id, throwError = true) {
    const group = toStr(group);
    const { index } = this.getRawData(group, throwError);
    id = this.validateId(id, throwError, "get");
    if (Record.is(index[id])) { return index[id]; }
    if (throwError) { throw Error(this.msg(`get failed - not exist`, id, group)); }
  }

  get(id, throwError = true) { return this.getBy("", id, throwError); }

  getAllBy(group, throwError=true) {
    const group = toStr(group);
    const { list } = this.getRawData(group, throwError);
    return list;
  }

  getAll(throwError=false) { return this.getAllBy("", throwError); }

}