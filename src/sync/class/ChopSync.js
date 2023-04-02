import jet from "@randajan/jet-core";
import { formatKey } from "../../uni/tools";
import vault from "../../uni/vault";
import { BundleSync } from "./BundleSync";

const { solid, virtual } = jet.prop;

export class ChopSync extends jet.types.Plex {

  constructor(name, config = {}) {
    const { stream, loader, parent, childName, getKey, getContext, defaultContext } = Object.jet.to(config);
    const [uid, _p] = vault.set({
      state: "waiting",
      loader,
      stream: jet.isRunnable(stream) ? stream : _ => stream,
      bundle:new BundleSync(
        name,
        childName,
        getKey,
        getContext,
        defaultContext
      )
    });

    super((...args) => this.get(...args));

    solid.all(this, {
      uid,
      parent
    }, false);

    virtual.all(this, {
      state:_=>_p.state,
      name:_=>_p.bundle.name,
      childName:_=>_p.bundle.childName
    });

  }

  on(event, callback) {
    return vault.get(this.uid).bundle.on(event, callback);
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
    return vault.get(this.uid).bundle.fetch(context, throwError).list.length;
  }

  getList(context, throwError=true) {
    this.init();
    return [...vault.get(this.uid).bundle.fetch(context, throwError).list];
  }

  getIndex(context, throwError=true) {
    this.init();
    return {...vault.get(this.uid).bundle.fetch(context, throwError).index};
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

  init(streamError = true) {
    const _p = vault.get(this.uid);
    if (_p.state === "error" && streamError) { throw _p.error; }
    else if (_p.state === "waiting") {
      _p.build = (_=>{
        _p.state = "pending";
        try {
          _p.bundle.run("beforeInit", this);
          const data = _p.stream();
          if (Promise.jet.is(data)) { throw Error(this.msg(`init failed - promise found at sync`)); }
          _p.loader(this, data, _p.bundle);
          _p.bundle.run("afterInit", this);
          _p.state = "ready";
        } catch(error) {
          _p.errorAt = new Date();
          _p.state = "error";
          if (streamError) { throw (_p.error = error); }
        }
        return this;
      })();
    }
    return _p.build;
  }

  afterInit(execute) {
    return (...args) => {
      this.init();
      return execute(...args);
    }
  }

  chop(name, getContext, defaultContext) {
    const { bundle } = vault.get(this.uid);
    
    const chop = new ChopSync(name, {
      parent: this,
      childName:bundle.childName,
      getKey:bundle.getKey,
      getContext,
      defaultContext,
      loader: (chop, data, bundle) => {
        this.map(child =>bundle.set(child));
        this.on("afterSet", child=>bundle.set(child));
        this.on("afterRemove", child=>bundle.remove(child));
      }
    });

    return chop;
  }

}