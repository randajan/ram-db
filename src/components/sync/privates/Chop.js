import jet from "@randajan/jet-core";
import { formatKey, vault } from "../../uni/consts";
import { Bundle } from "./Bundle";
import { Transactions } from "./Transactions";
import { evaluate } from "../tools";

const { solid, virtual } = jet.prop;

export class Chop extends jet.types.Plex {

  constructor(name, config = {}) {
    const { stream, loader, parent, childName, getContext, defaultContext, maxAge, maxAgeError } = Object.jet.to(config);
    const [uid, _p] = vault.set({
      isLoaded:false,
      loader,
      stream: jet.isRunnable(stream) ? stream : _ => stream,
      transactions:new Transactions(_=>{ if (this.maxAgeError) { setTimeout(_=>this.reset(), this.maxAgeError); } }),
      bundle:new Bundle(
        parent?.name,
        name,
        childName,
        getContext,
        defaultContext
      ),
      subs:{},
      recycle:_=>{ if (_p.bundle.run("beforeRecycle")) { vault.end(uid); }},
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
      state:_=>(!_p.isLoaded && _p.transactions.state === "ready") ? "concept" : _p.transactions.state,
      name:_=>_p.bundle.name,
      fullName:_=>_p.bundle.fullName,
      childName:_=>_p.bundle.childName,
      isLoading:_=>_p.transactions.state === "loading"
    });

    _p.bundle.on("beforeReset", _=>{
      _p.isLoaded = false;
      _p.transactions.reset();
    });

  }

  on(event, callback, repeat=true) {
    return vault.get(this.uid).bundle.on(event, callback, repeat);
  }

  msg(text, key, context) {
    return vault.get(this.uid).bundle.msg(text, key, context);
  }

  exist(key, context, throwError = false) {
    this.untilLoaded();
    return vault.get(this.uid).bundle.exist(key, context, throwError);
  }

  get(key, context, throwError = true) {
    this.untilLoaded();
    return vault.get(this.uid).bundle.get(key, context, throwError);
  }

  eval(selector, opt={}) {
    return evaluate(this, selector, opt);
  }

  count(context, throwError=false) {
    this.untilLoaded();
    return vault.get(this.uid).bundle.getData(context, throwError).list.length;
  }

  getList(context, throwError=false) {
    this.untilLoaded();
    return [...vault.get(this.uid).bundle.getData(context, throwError).list];
  }

  getIndex(context, throwError=false) {
    this.untilLoaded();
    return {...vault.get(this.uid).bundle.getData(context, throwError).index};
  }

  getContextList() {
    this.untilLoaded();
    return Object.keys(vault.get(this.uid).bundle.data);
  }

  map(callback, opt={}) {
    this.untilLoaded();
    return vault.get(this.uid).bundle.map(callback, opt);
  }

  filter(checker, opt={}) {
    this.untilLoaded();
    return vault.get(this.uid).bundle.filter(checker, opt);
  }

  find(checker, opt={}) {
    this.untilLoaded();
    return vault.get(this.uid).bundle.find(checker, opt);
  }

  reset(throwError=true) {
    return vault.get(this.uid).bundle.reset(throwError);
  }

  untilLoaded(throwError = true) {
    const _p = vault.get(this.uid);
    if (_p.isLoaded) { return true; }

    const { state, last } = _p.transactions;
    if (state === "error") { return throwError ? last : false; }
    if (state === "loading") { return last; }

    return _p.transactions.execute("loading", _=>{
      if (_p.isLoaded) { return; }
      _p.bundle.run("beforeLoad", [_p.bundle]);
      const data = _p.stream(this);
      if (Promise.jet.is(data)) { throw Error(this.msg(`init failed - promise found at sync`)); }
      _p.loader(this, _p.bundle, data);
      _p.isLoaded = true;
      _p.bundle.run("afterLoad", [_p.bundle]);
      if (this.maxAge) { setTimeout(_=>this.reset(), this.maxAge); }
    }, { stopOnError:false });
  }

  withUntilLoaded(execute) {
    return (...args) => {
      this.untilLoaded();
      return execute(...args);
    }
  }

  addChop(name, opt={}) {
    const subs = vault.get(this.uid).subs; //sub chops
    const { useCache, throwError, getContext, defaultContext, loader } = opt;

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
      loader: (chop, bundle) =>{
        this.map(child =>bundle.set(child));
        chop.on("beforeReset", this.on("afterSet", child=>bundle.set(child)), false);
        chop.on("beforeReset", this.on("afterRemove", child=>bundle.remove(child)), false);
        this.on("beforeReset", _=>chop.reset(), false);
        if (loader) { loader(chop, bundle); }
      }
    });

    return (useCache !== false) ? subs[name] = sub : sub;
  }

  getChop(name, throwError=true) {
    const subs = vault.get(this.uid).subs; //sub chops
    if (subs[name]) { return subs[name]; }
    if (throwError) { throw Error(this.msg(`chop '${name}' doesn't exist`)); }
  }

}