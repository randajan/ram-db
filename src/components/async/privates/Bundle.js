import jet from "@randajan/jet-core";
import * as _ from "@randajan/jet-core/eachAsync";
import { formatKey } from "../../uni/consts";

const { solid, virtual } = jet.prop;

export class Bundle {

  constructor(parentName, name, childName, getContext, def) {

    name = formatKey(name, "Bundle");

    solid.all(this, {
      name,
      fullName:(parentName && name) ? (parentName + "." + name) : parentName ? parentName : name ? name : "",
      childName:formatKey(childName, "key"),
      data:{},
      handlers: {},
      getContext: jet.isRunnable(getContext) ? getContext : _=>null,
      def:formatKey(def, "undefined")
    });

    if (!this.name) { throw Error(this.msg("critical error - missing name")); }

  }

  msg(text, key, context) {
    const { fullName, childName, def } = this;
    key = formatKey(key);
    context = formatKey(context, def);
    let msg = fullName || "";
    if (context !== def) { msg += ` context('${context}')`; }
    if (key) { msg += ` ${childName}('${key}')`; }
    if (text) { msg += " "+text; }
    return msg.trim();
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

  on(event, callback, opt={}) {
    if (!jet.isRunnable(callback)) { throw Error(this.msg(`on(...) require callback`)); }
    const { once, bufferMs, maxQueueMs, maxQueueSize } = opt;
    const { handlers } = this;
    const list = (handlers[event] || (handlers[event] = []));

    let remove;
    let cb = once ? async (...args)=>{ await callback(...args); remove(); } : callback;
    cb = bufferMs ? jet.buffer(cb, bufferMs, maxQueueMs, maxQueueSize) : cb;
    
    if (event.startsWith("before")) { list.push(cb); } else { list.unshift(cb); }

    return remove = _ => {
      const id = list.indexOf(cb);
      if (id >= 0) { list.splice(id, 1); }
      return callback;
    }
  }

  async run(event, args=[], opt={}) {
    const throwError = opt.throwError !== false;
    const handlers = this.handlers[event];
    if (!handlers?.length) { return true; }
    const isBefore = event.startsWith("before");

    for (let i=handlers.length-1; i>=0; i--) {
      const cb = handlers[i];
      if (!cb) { continue; }
      try { await cb(...args, opt); } catch(err) {
        if (isBefore && throwError) { throw err; }
        else if (isBefore) { return false; }
        else if (throwError) { console.warn(this.msg(err?.message || "unknown error"), err?.stack); }
      }
    }
    
    return true;
  }

  async reset(throwError=true) {
    const opt = { throwError };
    if (!await this.run("beforeReset", [], opt)) { return false; }
    for (let i in this.data) { delete this.data[i]; }
    return this.run("afterReset", [], opt);
  }

  async _set(context, key, child, opt={}, afterEffect) {
    const { context:ctx, index, list } = this.getData(context, opt.throwError, true);
    
    if (index.hasOwnProperty(key)) {
      if (opt.throwError !== false) { throw Error(this.msg(`set(...) failed - duplicate`, key, ctx)); }
      return false;
    }

    if (!(await this.run("beforeSet", [child, ctx], opt))) { return false; }
    
    list.push(index[key] = child);

    if (afterEffect) { await afterEffect(child, ctx, opt); }

    return this.run("afterSet", [child, ctx], opt);
  }

  async set(child, opt={}, afterEffect) {
    const context = await this.getContext(child, true);
    const key = this.validateKey(child.getKey(true), "set", opt.throwError);
    if (!Array.isArray(context)) { return this._set(context, key, child, opt, afterEffect); }
    let ok = true;
    for (const ctx of context) { ok = (await this._set(ctx, key, child, opt, afterEffect)) && ok; }
    return ok;
  }

  async _remove(context, key, child, opt={}, afterEffect) {
    const { context:ctx, index, list } = this.getData(context, opt.throwError);
    const id = list.indexOf(child);

    if (id < 0) {
      if (opt.throwError !== false) { throw Error(this.msg(`remove(...) failed - missing`, key, ctx)); }
      return false;
    }

    if (!(await this.run("beforeRemove", [child, ctx], opt))) { return false; }

    if (list.length === 1) { delete this.data[ctx]; } else {
      list.splice(id, 1);
      delete index[key];
    }

    if (afterEffect) { await afterEffect(child, ctx, opt); }
    
    return this.run("afterRemove", [child, ctx], opt);
  }

  async remove(child, opt={}, afterEffect) {
    const context = await this.getContext(child, false);
    const key = this.validateKey(child.getKey(false), "remove", opt.throwError);
    if (!Array.isArray(context)) { return this._remove(context, key, child, opt, afterEffect); }
    let ok = true;
    for (const ctx of context) { ok = (await this._remove(ctx, key, child, opt, afterEffect)) && ok; }
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
    const { context, throwError, filter, orderBy, stopable, paralelAwait, byKey } = opt;
    const { list, index } = this.getData(context, throwError);
    const optPass = { filter, orderBy, stopable, paralelAwait };
    return byKey ? _.map(index, callback, optPass) : _.list(list, callback, optPass);
  }

  async find(checker, opt={}) {
    const { context, throwError, filter, orderBy, stopable, paralelAwait } = opt;
    const { list } = this.getData(context, throwError);
    return _.find(list, checker, { filter, orderBy, stopable, paralelAwait });
  }

}