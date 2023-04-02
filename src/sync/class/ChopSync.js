import jet from "@randajan/jet-core";
import vault from "../../uni/vault";
import { BundleSync } from "./BundleSync";

const { solid, virtual } = jet.prop;

export class ChopSync extends jet.types.Plex {

  constructor(name, config = {}) {
    const { stream, loader, parent, childName, getContext, defaultContext } = Object.jet.to(config);
    const [uid, _p] = vault.set({
      state: "waiting",
      loader,
      stream: jet.isRunnable(stream) ? stream : _ => stream,
      bundle:new BundleSync(
        name,
        childName,
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
    const _p = vault.get(this.uid);
    if (!_p.bundle.reset(throwError)) { return false; }
    _p.state = "waiting";
    delete _p.errorAt;
    delete _p.error;
    return true;
  }

  init(throwError = true) {
    const _p = vault.get(this.uid);
    if (_p.state === "error" && throwError) { throw _p.error; }
    else if (_p.state === "waiting") {
      _p.build = (_=>{
        _p.state = "pending";
        try {
          _p.bundle.runHard("beforeInit");
          const data = _p.stream();
          if (Promise.jet.is(data)) { throw Error(this.msg(`init failed - promise found at sync`)); }
          _p.loader(this, data, _p.bundle);
          _p.bundle.runSoft("afterInit");
          _p.state = "ready";
        } catch(error) {
          _p.state = "error";
          _p.errorAt = new Date();
          _p.error = error;
          if (throwError) { throw error; }
          return false;
        }
        return true;
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
    
    const chop = new ChopSync(this.name+"."+name, {
      parent: this,
      childName:bundle.childName,
      getContext,
      defaultContext,
      loader: (chop, data, bundle) => {
        this.map(child =>bundle.set(child));
        const cu1 = this.on("afterSet", child=>bundle.set(child));
        const cu2 = this.on("afterRemove", child=>bundle.remove(child));
      }
    });

    //TODO: TAKE RESETS INTO A COUNT AND MAKE CLEANUPS
    

    return chop;
  }

}