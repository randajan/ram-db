import jet from "@randajan/jet-core";
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

  on(event, callback, repeat=true) {
    if (!jet.isRunnable(callback)) { throw Error(this.msg(`on(...) require callback`)); }

    const { handlers } = this;
    const list = (handlers[event] || (handlers[event] = []));

    let remove;
    const cb = repeat ? callback : async (...args)=>{ await callback(...args); remove(); }
    if (event.startsWith("before")) { list.push(cb); } else { list.unshift(cb) }

    return remove = _ => {
      const id = list.indexOf(cb);
      if (id >= 0) { list.splice(id, 1); }
      return callback;
    }
  }

  async run(event, args=[], throwError=true) {
    const handlers = this.handlers[event];
    if (!handlers?.length) { return true; }
    const isBefore = event.startsWith("before");
    try {
      for (let i=handlers.length; i>=0; i--) {
        const cb = handlers[i];
        try { if (cb) { await cb(...args); } } catch(err) {
          if (isBefore) { throw err; }
          else if (throwError) { console.warn(this.msg(err?.message || "unknown error"), err?.stack); }
        }
      }
      return true;
    } catch(err) {
      if (throwError) { throw err; }
      return false;
    }
  }

  async reset(throwError=true) {
    if (!await this.run("beforeReset", [], throwError)) { return false; }
    for (let i in this.data) { delete this.data[i]; }
    return this.run("afterReset", [], throwError);
  }

  async _set(context, key, child, throwError = true, opt) {
    const { context:ctx, index, list } = this.getData(context, throwError, true);
    
    if (index.hasOwnProperty(key)) {
      if (throwError) { throw Error(this.msg(`set(...) failed - duplicate`, key, ctx)); }
      return false;
    }

    if (!(await this.run("beforeSet", [child, ctx, opt], throwError))) { return false; }
    
    list.push(index[key] = child);

    return this.run("afterSet", [child, ctx, opt], throwError);
  }

  async set(child, throwError = true, opt) {
    const context = await this.getContext(child, true);
    const key = this.validateKey(child.getKey(true), "set", throwError);
    if (!Array.isArray(context)) { return this._set(context, key, child, throwError, opt); }
    let ok = true;
    for (const ctx of context) { ok = (await this._set(ctx, key, child, throwError, opt)) && ok; }
    return ok;
  }

  async _remove(context, key, child, throwError = true, opt) {
    const { context:ctx, index, list } = this.getData(context, throwError);
    const id = list.indexOf(child);

    if (id < 0) {
      if (throwError) { throw Error(this.msg(`remove(...) failed - missing`, key, ctx)); }
      return false;
    }

    if (!(await this.run("beforeRemove", [child, ctx, opt], throwError))) { return false; }

    if (list.length === 1) { delete this.data[ctx]; } else {
      list.splice(id, 1);
      delete index[key];
    }
    
    return this.run("afterRemove", [child, ctx, opt], throwError);
  }

  async remove(child, throwError = true, opt) {
    const context = await this.getContext(child, false);
    const key = this.validateKey(child.getKey(false), "remove", throwError);
    if (!Array.isArray(context)) { return this._remove(context, key, child, throwError, opt); }
    let ok = true;
    for (const ctx of context) { ok = (await this._remove(ctx, key, child, throwError, opt)) && ok; }
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
    const { context, byKey, orderBy, throwError } = opt;
    const { list } = this.getData(context, throwError);
    const bk = byKey ? {} : null;

    const bn = await Array.jet.remapAsync(list, async (child, key, stop)=>{
      const r = await callback(child, stop);
      if (bk && r !== undefined) { bk[child.getKey(false)] = r; } 
      return r;
    }, ...(orderBy || []));

    return bk || bn;
  }

  async filter(checker, opt={}) {
    return this.map(async (child, stop) => {
      if (await checker(child, stop)) { return child; }
    }, opt);
  }

  async find(checker, opt={}) {
    opt.byKey = false;
    return (await this.map(async (child, stop) => {
      if (await checker(child)) { return stop(child); }
    }, opt))[0];
  }

}