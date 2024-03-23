import jet from "@randajan/jet-core";
import { formatKey, vault } from "../../uni/consts";
import { Bundle } from "./Bundle";
import { Transactions } from "./Transactions";
import { evaluate } from "../tools";

const { solid, virtual } = jet.prop;

export class Chop extends jet.types.Plex {

  constructor(name, config = {}) {
    const { stream, loader, parent, childName, getContext, defaultContext, maxAge, maxAgeError, extra } = Object.jet.to(config);    
    super((...args) => this.get(...args));

    const _p = {
      isLoaded:false,
      loader,
      stream: jet.isRunnable(stream) ? stream : _ => stream,
      transactions:new Transactions(_=>{
        if (!this.maxAgeError) { return; }
        clearTimeout(_p.intError);
        _p.intError = setTimeout(_=>this.reset(), this.maxAgeError);
      }),
      bundle:new Bundle(
        parent?.name,
        name,
        childName,
        getContext,
        defaultContext
      ),
      subs:{}
    }
    vault.set(this, _p);

    solid.all(this, {
      parent,
      maxAge: Math.max(0, Number.jet.to(maxAge)),
      maxAgeError: Math.max(0, Number.jet.to(maxAgeError)),
      extra: solid.all({}, Object.jet.to(extra))
    }, false);

    virtual.all(this, {
      state:_=>(!_p.isLoaded && _p.transactions.state === "ready") ? "concept" : _p.transactions.state,
      name:_=>_p.bundle.name,
      fullName:_=>_p.bundle.fullName,
      childName:_=>_p.bundle.childName,
      isLoading:_=>_p.transactions.state === "loading"
    });

    _p.bundle.on("beforeReset", _=>{
      clearTimeout(_p.intError);
      clearTimeout(_p.intAge);
      _p.isLoaded = false;
      _p.transactions.reset();
    });

    _p.bundle.on("afterLoad", _=>{
      if (this.maxAge) {
        clearTimeout(_p.intAge);
        _p.intAge = setTimeout(_=>this.reset(), this.maxAge);
      }
    });

  }

  on(event, callback, opt={}) {
    return vault.get(this).bundle.on(event, callback, opt);
  }

  msg(text, key, context) {
    return vault.get(this).bundle.msg(text, key, context);
  }

  async exist(key, context, throwError = false) {
    await this.untilLoaded();
    return vault.get(this).bundle.exist(key, context, throwError);
  }

  async get(key, context, throwError = true) {
    await this.untilLoaded();
    return vault.get(this).bundle.get(key, context, throwError);
  }

  async eval(selector, opt={}) {
    return evaluate(this, selector, opt);
  }

  async count(context, throwError=false) {
    await this.untilLoaded();
    return vault.get(this).bundle.getData(context, throwError).list.length;
  }

  async getList(context, throwError=false) {
    await this.untilLoaded();
    return [...vault.get(this).bundle.getData(context, throwError).list];
  }

  async getIndex(context, throwError=false) {
    await this.untilLoaded();
    return {...vault.get(this).bundle.getData(context, throwError).index};
  }

  async getContextList() {
    await this.untilLoaded();
    return Object.keys(vault.get(this).bundle.data);
  }

  async map(callback, opt={}) {
    await this.untilLoaded();
    return vault.get(this).bundle.map(callback, opt);
  }

  async filter(checker, opt={}) {
    await this.untilLoaded();
    return vault.get(this).bundle.filter(checker, opt);
  }

  async find(checker, opt={}) {
    await this.untilLoaded();
    return vault.get(this).bundle.find(checker, opt);
  }

  async reset(throwError=true) {
    return vault.get(this).bundle.reset(throwError);
  }

  async untilLoaded(throwError = true) {
    const _p = vault.get(this);
    if (_p.isLoaded) { return true; }

    const { state, last } = _p.transactions;
    if (state === "error") { return throwError ? last : false; }
    if (state === "loading") { return last; }

    return _p.transactions.execute("loading", async _=>{
      if (_p.isLoaded) { return; }
      await _p.bundle.run("beforeLoad", [this]);
      const data = await _p.stream(this);
      await _p.loader(this, _p.bundle, data);
      _p.isLoaded = true;
      await _p.bundle.run("afterLoad", [this]);
    }, { stopOnError:false });
  }

  withUntilLoaded(execute) {
    return async (...args) => {
      await this.untilLoaded();
      return execute(...args);
    }
  }

  addChop(name, config={}) {
    const subs = vault.get(this).subs; //sub chops
    const { useCache, throwError, getContext, defaultContext, loader, extra } = config;

    name = formatKey(name);

    if (useCache !== false && subs[name]) {
      if (throwError !== false) { throw Error(this.msg(`chop '${name}' allready exist`)); }
      return subs[name];
    }

    const sub = new Chop(name, {
      parent:this,
      childName:this.childName,
      maxAge:0,
      maxAgeError:this.maxAgeError,
      getContext,
      defaultContext,
      loader: async (chop, bundle) =>{
        await this.map(child =>bundle.set(child));
        chop.on("beforeReset", this.on("afterSet", async child=>bundle.set(child)), { once:true });
        chop.on("beforeReset", this.on("afterRemove", async child=>bundle.remove(child)), { once:true });
        this.on("beforeReset", _=>chop.reset(), { once:true });
        if (loader) { loader(chop, bundle); }
      },
      extra
    });

    return (useCache !== false) ? subs[name] = sub : sub;
  }

  getChop(name, throwError=true) {
    const subs = vault.get(this).subs; //sub chops
    if (subs[name]) { return subs[name]; }
    if (throwError) { throw Error(this.msg(`chop '${name}' doesn't exist`)); }
  }

}