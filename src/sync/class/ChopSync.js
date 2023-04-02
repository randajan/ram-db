import jet from "@randajan/jet-core";
import vault from "../../uni/vault";
import { BundleSync } from "./BundleSync";

const { solid, virtual } = jet.prop;

export class ChopSync extends jet.types.Plex {

  constructor(name, config = {}) {
    const { stream, loader, parent, childName, getContext, defaultContext, maxAge, maxAgeError } = Object.jet.to(config);
    const [uid, _p] = vault.set({
      state: "waiting",
      loader,
      stream: jet.isRunnable(stream) ? stream : _ => stream,
      bundle:new BundleSync(
        name,
        childName,
        getContext,
        defaultContext
      ),
      recycle:_=>{ if (_p.bundle.runHard("beforeRecycle")) { console.warn(this.msg("recycled")); vault.end(uid); }}
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
      childName:_=>_p.bundle.childName
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

  exist(key, context, throwError = false) {
    this.init();
    return vault.get(this.uid).bundle.exist(key, context, throwError);
  }

  get(key, context, throwError = true) {
    this.init();
    return vault.get(this.uid).bundle.get(key, context, throwError);
  }

  count(context, throwError=true) {
    this.init();
    return vault.get(this.uid).bundle.getData(context, throwError).list.length;
  }

  getList(context, throwError=true) {
    this.init();
    return [...vault.get(this.uid).bundle.getData(context, throwError).list];
  }

  getIndex(context, throwError=true) {
    this.init();
    return {...vault.get(this.uid).bundle.getData(context, throwError).index};
  }

  getContextList() {
    this.init();
    return Object.keys(vault.get(this.uid).bundle.data);
  }

  map(callback, opt={}) {
    this.init();
    return vault.get(this.uid).bundle.map(callback, opt);
  }

  filter(checker, opt={}) {
    this.init();
    return vault.get(this.uid).bundle.filter(checker, opt);
  }

  find(checker, opt={}) {
    this.init();
    return vault.get(this.uid).bundle.find(checker, opt);
  }

  reset(throwError=true) {
    return vault.get(this.uid).bundle.reset(throwError);
  }

  init(throwError = true) {
    const _p = vault.get(this.uid);
    if (_p.state === "waiting") {
      _p.build = (_=>{
        _p.state = "pending";
        try {
          _p.bundle.runHard("beforeInit");
          const data = _p.stream();
          if (Promise.jet.is(data)) { throw Error(this.msg(`init failed - promise found at sync`)); }
          _p.loader(this, data, _p.bundle);
          _p.bundle.runSoft("afterInit");
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
      this.init();
      return execute(...args);
    }
  }

  chop(name, getContext, defaultContext) {
    const chop = new ChopSync(this.name+"."+name, {
      parent: this,
      childName:this.childName,
      maxAge:this.maxAge,
      maxAgeError:this.maxAgeError,
      getContext,
      defaultContext,
      loader: (chop, data, bundle) => this.map(child =>bundle.set(child))
    });

    const { bundle } = vault.get(chop.uid);
    this.on("afterSet", child=>{if (chop.state === "ready") { bundle.set(child); }});
    this.on("afterRemove", child=>{if (chop.state === "ready") { bundle.remove(child); }});
    this.on("afterReset", _=>chop.reset());

    return chop;
  }

}