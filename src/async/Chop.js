import jet from "@randajan/jet-core";
import { formatKey, vault } from "../tools";
import { Bundle } from "./Bundle";

const { solid, virtual } = jet.prop;

export class Chop extends jet.types.Plex {

  constructor(name, config = {}) {
    const { stream, loader, parent, childName, getContext, defaultContext, maxAge, maxAgeError } = Object.jet.to(config);
    const [uid, _p] = vault.set({
      state: "waiting",
      loader,
      stream: jet.isRunnable(stream) ? stream : _ => stream,
      bundle:new Bundle(
        parent?.name,
        name,
        childName,
        getContext,
        defaultContext
      ),
      recycle:async _=>{ if (await _p.bundle.run("beforeRecycle")) { vault.end(uid); }}
    });

    super((...args) => this.get(...args));
    if (parent) { parent.on("beforeRecycle", _p.recycle, false); }

    solid.all(this, {
      uid,
      parent,
      maxAge: Math.max(0, Number.jet.to(maxAge)),
      maxAgeError: Math.max(0, Number.jet.to(maxAgeError)),
    }, false);

    virtual.all(this, {
      state:_=>_p.state,
      name:_=>_p.bundle.name,
      fullName:_=>_p.bundle.fullName,
      childName:_=>_p.bundle.childName,
      isReady:_=>_p.state === "ready"
    });

    _p.bundle.on("beforeReset", _=>{
      _p.state = "waiting";
      delete _p.error;
    });

  }

  on(event, callback, repeat=true) {
    return vault.get(this.uid).bundle.on(event, callback, repeat);
  }

  msg(text, key, context) {
    return vault.get(this.uid).bundle.msg(text, key, context);
  }

  async exist(key, context, throwError = false) {
    await this.init();
    return vault.get(this.uid).bundle.exist(key, context, throwError);
  }

  async get(key, context, throwError = true) {
    await this.init();
    return vault.get(this.uid).bundle.get(key, context, throwError);
  }

  async count(context, throwError=false) {
    await this.init();
    return vault.get(this.uid).bundle.getData(context, throwError).list.length;
  }

  async getList(context, throwError=false) {
    await this.init();
    return [...vault.get(this.uid).bundle.getData(context, throwError).list];
  }

  async getIndex(context, throwError=false) {
    await this.init();
    return {...vault.get(this.uid).bundle.getData(context, throwError).index};
  }

  async getContextList() {
    await this.init();
    return Object.keys(vault.get(this.uid).bundle.data);
  }

  async map(callback, opt={}) {
    await this.init();
    return vault.get(this.uid).bundle.map(callback, opt);
  }

  async filter(checker, opt={}) {
    await this.init();
    return vault.get(this.uid).bundle.filter(checker, opt);
  }

  async find(checker, opt={}) {
    await this.init();
    return vault.get(this.uid).bundle.find(checker, opt);
  }

  async reset(throwError=true) {
    return vault.get(this.uid).bundle.reset(throwError);
  }

  async init(throwError = true) {
    const _p = vault.get(this.uid);
    if (_p.state === "waiting") {
      _p.build = (async _=>{
        _p.state = "pending";
        try {
          await _p.bundle.run("beforeInit", [_p.bundle]);
          const data = await _p.stream();
          //if (Promise.jet.is(data)) { throw Error(this.msg(`init failed - promise found at sync`)); }
          await _p.loader(this, _p.bundle, data);
          await _p.bundle.run("afterInit", [_p.bundle]);
          _p.state = "ready";
          if (this.maxAge) { setTimeout(_=>this.reset(), this.maxAge); }
        } catch(error) {
          _p.error = error;
          _p.state = "error";
          if (this.maxAgeError) { setTimeout(_=>this.reset(), this.maxAgeError); }
          if (throwError) { throw error; }
        }
        return _p.state === "ready";
      })();
    }
    else if (_p.state === "error" && throwError) { throw _p.error; }
    return _p.build;
  }

  withInit(execute) {
    return async (...args) => {
      await this.init();
      return execute(...args);
    }
  }

  chop(name, config={}) {
    const { getContext, defaultContext, cache, loader } = config;

    name = formatKey(name);

    if (cache && cache[name]) { return cache[name]; }

    const chop = new Chop(name, {
      parent:this,
      childName:this.childName,
      maxAge:0,
      maxAgeError:this.maxAgeError,
      getContext,
      defaultContext,
      loader: async (chop, bundle) =>{
        await this.map(child =>bundle.set(child));
        chop.on("beforeReset", this.on("afterSet", async child=>bundle.set(child)), false);
        chop.on("beforeReset", this.on("afterRemove", async child=>bundle.remove(child)), false);
        this.on("beforeReset", _=>chop.reset(), false);
        if (loader) { loader(chop, bundle); }
      }
    });

    return cache ? (cache[name] = chop) : chop;

  }

}