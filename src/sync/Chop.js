import jet from "@randajan/jet-core";
import { formatKey, vault } from "../tools";
import { Bundle } from "./Bundle";

const { solid, virtual } = jet.prop;

//states = [ init,  ]

export class Chop extends jet.types.Plex {

  constructor(name, config = {}) {
    const { stream, loader, parent, childName, getContext, defaultContext, maxAge, maxAgeError } = Object.jet.to(config);
    const [uid, _p] = vault.set({
      state: "concept",
      loader,
      stream: jet.isRunnable(stream) ? stream : _ => stream,
      bundle:new Bundle(
        parent?.name,
        name,
        childName,
        getContext,
        defaultContext
      ),
      recycle:_=>{ if (_p.bundle.run("beforeRecycle")) { vault.end(uid); }}
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
      isLoading:_=>_p.state === "loading"
    });

    _p.bundle.on("beforeReset", _=>{
      _p.state = "concept";
      delete _p.error;
    });

  }

  on(event, callback, repeat=true) {
    return vault.get(this.uid).bundle.on(event, callback, repeat);
  }

  msg(text, key, context) {
    return vault.get(this.uid).bundle.msg(text, key, context);
  }

  exist(key, context, throwError = false) {
    this.load();
    return vault.get(this.uid).bundle.exist(key, context, throwError);
  }

  get(key, context, throwError = true) {
    this.load();
    return vault.get(this.uid).bundle.get(key, context, throwError);
  }

  count(context, throwError=false) {
    this.load();
    return vault.get(this.uid).bundle.getData(context, throwError).list.length;
  }

  getList(context, throwError=false) {
    this.load();
    return [...vault.get(this.uid).bundle.getData(context, throwError).list];
  }

  getIndex(context, throwError=false) {
    this.load();
    return {...vault.get(this.uid).bundle.getData(context, throwError).index};
  }

  getContextList() {
    this.load();
    return Object.keys(vault.get(this.uid).bundle.data);
  }

  map(callback, opt={}) {
    this.load();
    return vault.get(this.uid).bundle.map(callback, opt);
  }

  filter(checker, opt={}) {
    this.load();
    return vault.get(this.uid).bundle.filter(checker, opt);
  }

  find(checker, opt={}) {
    this.load();
    return vault.get(this.uid).bundle.find(checker, opt);
  }

  reset(throwError=true) {
    return vault.get(this.uid).bundle.reset(throwError);
  }

  load(throwError = true) {
    const _p = vault.get(this.uid);
    if (_p.state === "concept") {
      _p.build = (_=>{
        _p.state = "loading";
        try {
          _p.bundle.run("beforeInit", [_p.bundle]);
          const data = _p.stream();
          if (Promise.jet.is(data)) { throw Error(this.msg(`load failed - promise found at sync`)); }
          _p.loader(this, _p.bundle, data);
          _p.bundle.run("afterInit", [_p.bundle]);
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
    return (...args) => {
      this.load();
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
      loader: (chop, bundle) =>{
        this.map(child =>bundle.set(child));
        chop.on("beforeReset", this.on("afterSet", child=>bundle.set(child)), false);
        chop.on("beforeReset", this.on("afterRemove", child=>bundle.remove(child)), false);
        this.on("beforeReset", _=>chop.reset(), false);
        if (loader) { loader(chop, bundle); }
      }
    });

    return cache ? (cache[name] = chop) : chop;

  }

}