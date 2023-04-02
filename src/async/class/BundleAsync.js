import jet from "@randajan/jet-core";
import { formatKey } from "../../uni/tools";

const { solid } = jet.prop;

export class BundleAsync {

  constructor(name, childName, getContext, def) {

    solid.all(this, {
      name:formatKey(name, "Bundle"),
      childName:formatKey(childName, "key"),
      data:{},
      handlers: {},
      getContext: jet.isRunnable(getContext) ? getContext : _=>null,
      def:formatKey(def, "null")
    });

  }

  msg(text, key, context) {
    const { name, childName, def } = this;
    key = formatKey(key);
    context = formatKey(context, def);
    let msg = name;
    if (context !== def) { msg += ` context('${context}')`; }
    if (key) { msg += ` ${childName}('${key}')`; }
    if (text) { msg += " "+text; }
    return msg;
  }

  getData(context, throwError=true, autoCreate=false) {
    const { data, def } = this;
    context = formatKey(context, def);
    if (data[context]) { return data[context]; }
    if (autoCreate || context === def) { return data[context] = { context, index:{}, list:[] }; }
    if (throwError) { throw Error(this.msg(`not found`, undefined, context)); }
    return { context, index:{}, list:[] }
  };

  validateKey(key, action="validateKey", throwError=true) {
    if (key = key = formatKey(key)) { return key; }
    if (throwError) { throw Error(this.msg(`${action}(...) failed - key undefined`));}
  }

  on(event, callback, repeat=true) {
    if (!jet.isRunnable(callback)) { throw Error(this.msg(`on(...) require callback`)); }

    const { handlers } = this;
    const list = (handlers[event] || (handlers[event] = new Set()));
    const cb = repeat ? callback : async (...args)=>{ await callback(...args); list.delete(cb); }
    list.add(cb);

    return _ => { list.delete(cb); return callback; }
  }

  async run(hard, event, args=[], throwError=true) {
    const handlers = this.handlers[event];
    if (!handlers?.size) { return true; }
    try {
      for (const cb of handlers) {
        try { await cb(...args); } catch(err) {
          if (hard) { throw err; }
          else if (throwError) { console.warn(this.msg(err.message), err.stack); }
        }
      }
      return true;
    } catch(err) {
      if (throwError) { throw err; }
      return false;
    }
  }

  async runSoft(event, args=[], throwError=true) {
    return this.run(false, event, args, throwError);
  }

  async runHard(event, args=[], throwError=true) {
    return this.run(true, event, args, throwError);
  }

  async reset(throwError=true) {
    if (!await this.runHard("beforeReset", [], throwError)) { return false; }
    for (let i in this.data) { delete this.data[i]; }
    return this.runSoft("afterReset", [], throwError);
  }

  async _set(context, key, child, throwError = true) {
    const { context:ctx, index, list } = this.getData(context, throwError, true);
    
    if (index.hasOwnProperty(key)) {
      if (throwError) { throw Error(this.msg(`set(...) failed - duplicate`, ctx)); }
      return false;
    }

    if (!(await this.runHard("beforeSet", [child, ctx], throwError))) { return false; }
    
    list.push(index[key] = child);

    return this.runSoft("afterSet", [child, ctx], throwError);
  }

  async set(child, throwError = true) {
    const context = await this.getContext(child, true);
    const key = this.validateKey(await child.getKey(true), "set", throwError);
    if (!Array.isArray(context)) { return this._set(context, key, child, throwError); }
    let ok = true;
    for (const ctx of context) { ok = (await this._set(ctx, key, child, throwError)) && ok; }
    return ok;
  }

  async _remove(context, key, child, throwError = true) {
    const { context:ctx, index, list } = this.getData(context, throwError);
    const id = list.indexOf(child);

    if (id < 0) {
      if (throwError) { throw Error(this.msg(`remove(...) failed - missing`, key, ctx)); }
      return false;
    }

    if (!(await this.runHard("beforeRemove", [child, ctx], throwError))) { return false; }

    if (list.length === 1) { delete this.data[ctx]; } else {
      list.splice(id, 1);
      delete index[key];
    }
    
    return this.runSoft("afterRemove", [child, ctx], throwError);
  }

  async remove(child, throwError = true) {
    const context = await this.getContext(child, false);
    const key = this.validateKey(await child.getKey(false), "remove", throwError);
    if (!Array.isArray(context)) { return this._remove(context, key, child, throwError); }
    let ok = true;
    for (const ctx of context) { ok = (await this._remove(ctx, key, child, throwError)) && ok; }
    return ok;
  }

  exist(key, context, throwError = false) {
    const { context:ctx, index } = this.getData(context, throwError);
    key = this.validateKey(key, "exist", throwError);
    if (index.hasOwnProperty(key)) { return true; }
    if (throwError) { throw Error(this.msg(`exist failed - not exist`, key, ctx)); }
    return false;
  }

  get(key, context, throwError = true) {
    const { context:ctx, index } = this.getData(context, throwError);
    key = this.validateKey(key, "get", throwError);
    const child = index[key];
    if (child) { return child; }
    if (throwError) { throw Error(this.msg(`get failed - not exist`, key, ctx)); }
  }

  async map(callback, opt={}) {
    const { context, byKey, sort } = opt;
    const { list } = this.getData(context);
    const sorted = sort ? list.sort(sort) : [...list];
    const stop = val => { stop.active = true; return val; }
    const result = byKey ? {} : [];
    let count = 0;

    for (let i in sorted) {
        if (stop.active) { break; }
        const child = sorted[i];
        const r = await callback(child, i + 1, count, stop);
        if (r === undefined) { continue; }
        if (byKey) { result[await child.getKey(false)] = r; }
        else { result.push(r); }
        count++;
    }

    return result;
  }

  async filter(checker, opt={}) {
    return this.map(async (child, i, count, stop) => {
      if (await checker(child, i, count, stop)) { return child; }
    }, opt);
  }

  async find(checker, opt={}) {
    opt.byKey = false;
    return this.map(async (child, i, count, stop) => {
      if (await checker(child, i, count, stop)) { return stop(child); }
    }, opt)[0];
  }

}