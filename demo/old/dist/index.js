// dist/chunk-ANX6F3ON.js
import jet from "@randajan/jet-core";
import jet2 from "@randajan/jet-core";
var breachSelector = (selector, onOne, onMany) => {
  let alias, path;
  const isArray = Array.isArray(selector);
  if (!isArray) {
    [path, selector] = String.jet.bite(selector, ".");
  }
  if (path) {
    [alias, path] = String.jet.bite(path, ":");
  } else if (!isArray && !selector.includes(",")) {
    [alias, selector] = String.jet.bite(selector, ":");
  } else {
    return onMany(isArray ? selector : selector.split(","));
  }
  return onOne(alias, path, selector);
};
var { solid, cached } = jet.prop;
var vault = /* @__PURE__ */ new WeakMap();
var eventsWhen = ["before", "after"];
var events = cached.all({}, {}, {
  primitive: (_2) => [].concat(
    ...eventsWhen.map((w) => ["set", "update", "remove"].map((c) => [w, c, w + String.jet.capitalize(c)]))
  ),
  extra: (_2) => [].concat(
    ...eventsWhen.map((w) => ["change", "save"].map((c) => [w, c, w + String.jet.capitalize(c)]))
  )
});
var formatKey = (key, def) => key != null ? String(key) : def;
var numberPositive = (num, def = 0) => num == null ? def : Math.max(0, Number.jet.to(num));
var functionOrNull = (val) => val == null ? void 0 : Function.jet.to(val);
var fcePass = (v) => v;
var fceTrue = (_2) => true;
var { solid: solid2, cached: cached2, virtual } = jet2.prop;

// dist/index.js
import jet3 from "@randajan/jet-core";
import jet12 from "@randajan/jet-core";
import { each } from "@randajan/jet-core/eachSync";
import jet4 from "@randajan/jet-core";
import jet22 from "@randajan/jet-core";
import * as _ from "@randajan/jet-core/eachSync";
import jet32 from "@randajan/jet-core";
import jet8 from "@randajan/jet-core";
import jet6 from "@randajan/jet-core";
import jet5 from "@randajan/jet-core";
import jet7 from "@randajan/jet-core";
import jet11 from "@randajan/jet-core";
import jet9 from "@randajan/jet-core";
import { map as map2 } from "@randajan/jet-core/eachSync";
import jet10 from "@randajan/jet-core";
import { solids, virtuals } from "@randajan/props";
import { cacheds as cacheds2, solids as solids4 } from "@randajan/props";
import { solids as solids3 } from "@randajan/props";
import { cacheds, solid as solid11 } from "@randajan/props";
import { solid as solid10, solids as solids2 } from "@randajan/props";
import { solid as solid12, solids as solids5 } from "@randajan/props";
var remap = (arr, onItem, byKey = false) => {
  const rk = byKey ? {} : null;
  const rl = arr.map((item) => onItem(item, rk));
  return rk || rl;
};
var evaluate = (base, selector, opt, to, forceAlias) => {
  if (!base?.get) {
    return;
  }
  const { byKey, throwError } = opt;
  return breachSelector(
    selector,
    (alias, path, selector2) => {
      let res;
      if (!path) {
        res = base.get(selector2, throwError !== false);
      } else if (path !== "*") {
        const ref = base.get(path, throwError !== false);
        if (!ref?.eval) {
          return;
        }
        res = ref.eval(selector2, opt);
      } else {
        if (!base.getList) {
          return;
        }
        const arr = base.getList();
        return remap(arr, (item, rk) => {
          const r = item?.eval(selector2, opt);
          return rk ? rk[item] = r : r;
        }, byKey);
      }
      if (!byKey) {
        return res;
      }
      const key = forceAlias || alias || path || selector2;
      if (!to) {
        return { [key]: res };
      }
      if (to.hasOwnProperty(key)) {
        throw Error(`selector collision at ${key}, please use alias`);
      }
      to[key] = res;
      return to;
    },
    (arr) => remap(arr, (item, rk) => evaluate(base, item, opt, to || rk), byKey)
  );
};
var { solid: solid3, virtual: virtual2 } = jet22.prop;
var Bundle = class {
  constructor(parentName, name, childName, getContext, def) {
    name = formatKey(name, "Bundle");
    solid3.all(this, {
      name,
      fullName: parentName && name ? parentName + "." + name : parentName ? parentName : name ? name : "",
      childName: formatKey(childName, "key"),
      data: {},
      handlers: {},
      getContext: jet22.isRunnable(getContext) ? getContext : (_2) => null,
      def: formatKey(def, "undefined")
    });
    if (!this.name) {
      throw Error(this.msg("critical error - missing name"));
    }
  }
  msg(text, key, context) {
    const { fullName, childName, def } = this;
    key = formatKey(key);
    context = formatKey(context, def);
    let msg = fullName || "";
    if (context !== def) {
      msg += ` context('${context}')`;
    }
    if (key) {
      msg += ` ${childName}('${key}')`;
    }
    if (text) {
      msg += " " + text;
    }
    return msg.trim();
  }
  getData(context, throwError = true, autoCreate = false) {
    const { data, def } = this;
    context = formatKey(context, def);
    if (data[context]) {
      return data[context];
    }
    if (autoCreate || context === def) {
      return data[context] = { context, index: {}, list: [] };
    }
    if (throwError) {
      throw Error(this.msg(`not found`, void 0, context));
    }
    return { context, index: {}, list: [] };
  }
  validateKey(key, action = "validateKey", throwError = true) {
    if (key = key = formatKey(key)) {
      return key;
    }
    if (throwError) {
      throw Error(this.msg(`${action}(...) failed - key undefined`));
    }
  }
  on(event, callback, opt = {}) {
    if (!jet22.isRunnable(callback)) {
      throw Error(this.msg(`on(...) require callback`));
    }
    const { once, bufferMs, maxQueueMs, maxQueueSize } = opt;
    const { handlers } = this;
    const list2 = handlers[event] || (handlers[event] = []);
    let remove;
    let cb = once ? (...args) => {
      callback(...args);
      remove();
    } : callback;
    cb = bufferMs ? jet22.buffer(cb, bufferMs, maxQueueMs, maxQueueSize) : cb;
    if (event.startsWith("before")) {
      list2.push(cb);
    } else {
      list2.unshift(cb);
    }
    return remove = (_2) => {
      const id = list2.indexOf(cb);
      if (id >= 0) {
        list2.splice(id, 1);
      }
      return callback;
    };
  }
  run(event, args = [], opt = {}) {
    const throwError = opt.throwError !== false;
    const handlers = this.handlers[event];
    if (!handlers?.length) {
      return true;
    }
    const isBefore = event.startsWith("before");
    for (let i = handlers.length - 1; i >= 0; i--) {
      const cb = handlers[i];
      if (!cb) {
        continue;
      }
      try {
        cb(...args, opt);
      } catch (err) {
        if (isBefore && throwError) {
          throw err;
        } else if (isBefore) {
          return false;
        } else if (throwError) {
          console.warn(this.msg(err?.message || "unknown error"), err?.stack);
        }
      }
    }
    return true;
  }
  reset(throwError = true) {
    const opt = { throwError };
    if (!this.run("beforeReset", [], opt)) {
      return false;
    }
    for (let i in this.data) {
      delete this.data[i];
    }
    return this.run("afterReset", [], opt);
  }
  _set(context, key, child, opt = {}, afterEffect) {
    const { context: ctx, index, list: list2 } = this.getData(context, opt.throwError, true);
    if (index.hasOwnProperty(key)) {
      if (opt.throwError !== false) {
        throw Error(this.msg(`set(...) failed - duplicate`, key, ctx));
      }
      return false;
    }
    if (!this.run("beforeSet", [child, ctx], opt)) {
      return false;
    }
    list2.push(index[key] = child);
    if (afterEffect) {
      afterEffect(child, ctx, opt);
    }
    return this.run("afterSet", [child, ctx], opt);
  }
  set(child, opt = {}, afterEffect) {
    const context = this.getContext(child, true);
    const key = this.validateKey(child.getKey(true), "set", opt.throwError);
    if (!Array.isArray(context)) {
      return this._set(context, key, child, opt, afterEffect);
    }
    let ok = true;
    for (const ctx of context) {
      ok = this._set(ctx, key, child, opt, afterEffect) && ok;
    }
    return ok;
  }
  _remove(context, key, child, opt = {}, afterEffect) {
    const { context: ctx, index, list: list2 } = this.getData(context, opt.throwError);
    const id = list2.indexOf(child);
    if (id < 0) {
      if (opt.throwError !== false) {
        throw Error(this.msg(`remove(...) failed - missing`, key, ctx));
      }
      return false;
    }
    if (!this.run("beforeRemove", [child, ctx], opt)) {
      return false;
    }
    if (list2.length === 1) {
      delete this.data[ctx];
    } else {
      list2.splice(id, 1);
      delete index[key];
    }
    if (afterEffect) {
      afterEffect(child, ctx, opt);
    }
    return this.run("afterRemove", [child, ctx], opt);
  }
  remove(child, opt = {}, afterEffect) {
    const context = this.getContext(child, false);
    const key = this.validateKey(child.getKey(false), "remove", opt.throwError);
    if (!Array.isArray(context)) {
      return this._remove(context, key, child, opt, afterEffect);
    }
    let ok = true;
    for (const ctx of context) {
      ok = this._remove(ctx, key, child, opt, afterEffect) && ok;
    }
    return ok;
  }
  exist(key, context, throwError = false) {
    const { context: ctx, index } = this.getData(context, throwError);
    key = this.validateKey(key, "exist", throwError);
    if (index.hasOwnProperty(key)) {
      return true;
    }
    if (throwError) {
      throw Error(this.msg(`exist failed - not exist`, key, ctx));
    }
    return false;
  }
  get(key, context, throwError = true) {
    const { context: ctx, index } = this.getData(context, throwError);
    key = this.validateKey(key, "get", throwError);
    const child = index[key];
    if (child) {
      return child;
    }
    if (throwError) {
      throw Error(this.msg(`get failed - not exist`, key, ctx));
    }
  }
  map(callback, opt = {}) {
    const { context, throwError, filter, orderBy, stopable, byKey } = opt;
    const { list: list2, index } = this.getData(context, throwError);
    const optPass = { filter, orderBy, stopable };
    return byKey ? _.map(index, callback, optPass) : _.list(list2, callback, optPass);
  }
  find(checker, opt = {}) {
    const { context, throwError, filter, orderBy, stopable } = opt;
    const { list: list2 } = this.getData(context, throwError);
    return _.find(list2, checker, { filter, orderBy, stopable });
  }
};
var Transactions = class {
  constructor(onError) {
    this.ticks = 0;
    this.state = "ready";
    this.queue = [];
    this.onError = jet32.isRunnable(onError) ? onError : () => {
    };
  }
  execute(name, execution, opt = { stopOnError: false, throwError: true }) {
    const exe = (last) => {
      try {
        last;
      } catch (e) {
      }
      if (this.queue[0] === exe) {
        return false;
      } else {
        this.queue.shift();
      }
      let isErr = this.state === "error";
      let err = this.error;
      if (!isErr) {
        this.state = name;
        try {
          execution(this.ticks++);
        } catch (e) {
          isErr = true;
          err = e;
        }
        this.state = isErr || opt.stopOnError === false ? "ready" : "error";
        if (this.state === "error") {
          this.onError(this.error = err);
        }
      }
      if (isErr && opt.throwError !== false) {
        throw err;
      }
      return !isErr;
    };
    return this.last = exe(this.last);
  }
  reset() {
    this.state = "ready";
    this.queue = [];
  }
};
var { solid: solid22, virtual: virtual22 } = jet4.prop;
var Chop = class extends jet4.types.Plex {
  constructor(name, config = {}) {
    const { stream, loader: loader2, parent, childName, getContext, defaultContext, maxAge, maxAgeError, extra } = Object.jet.to(config);
    super((...args) => this.get(...args));
    const _p = {
      isLoaded: false,
      loader: loader2,
      stream: jet4.isRunnable(stream) ? stream : (_2) => stream,
      transactions: new Transactions((_2) => {
        if (!this.maxAgeError) {
          return;
        }
        clearTimeout(_p.intError);
        _p.intError = setTimeout((_3) => this.reset(), this.maxAgeError);
      }),
      bundle: new Bundle(
        parent?.name,
        name,
        childName,
        getContext,
        defaultContext
      ),
      subs: {}
    };
    vault.set(this, _p);
    solid22.all(this, {
      parent,
      maxAge: Math.max(0, Number.jet.to(maxAge)),
      maxAgeError: Math.max(0, Number.jet.to(maxAgeError)),
      extra: solid22.all({}, Object.jet.to(extra))
    }, false);
    virtual22.all(this, {
      state: (_2) => !_p.isLoaded && _p.transactions.state === "ready" ? "concept" : _p.transactions.state,
      name: (_2) => _p.bundle.name,
      fullName: (_2) => _p.bundle.fullName,
      childName: (_2) => _p.bundle.childName,
      isLoading: (_2) => _p.transactions.state === "loading"
    });
    _p.bundle.on("afterReset", (_2) => {
      clearTimeout(_p.intError);
      clearTimeout(_p.intAge);
      _p.isLoaded = false;
      _p.transactions.reset();
    });
    _p.bundle.on("afterLoad", (_2) => {
      if (this.maxAge) {
        clearTimeout(_p.intAge);
        _p.intAge = setTimeout((_3) => this.reset(), this.maxAge);
      }
    });
  }
  on(event, callback, opt = {}) {
    return vault.get(this).bundle.on(event, callback, opt);
  }
  msg(text, key, context) {
    return vault.get(this).bundle.msg(text, key, context);
  }
  exist(key, context, throwError = false) {
    this.untilLoaded();
    return vault.get(this).bundle.exist(key, context, throwError);
  }
  get(key, context, throwError = true) {
    this.untilLoaded();
    return vault.get(this).bundle.get(key, context, throwError);
  }
  eval(selector, opt = {}) {
    return evaluate(this, selector, opt);
  }
  count(context, throwError = false) {
    this.untilLoaded();
    return vault.get(this).bundle.getData(context, throwError).list.length;
  }
  getList(context, throwError = false) {
    this.untilLoaded();
    return [...vault.get(this).bundle.getData(context, throwError).list];
  }
  getIndex(context, throwError = false) {
    this.untilLoaded();
    return { ...vault.get(this).bundle.getData(context, throwError).index };
  }
  getContextList() {
    this.untilLoaded();
    return Object.keys(vault.get(this).bundle.data);
  }
  map(callback, opt = {}) {
    this.untilLoaded();
    return vault.get(this).bundle.map(callback, opt);
  }
  find(checker, opt = {}) {
    this.untilLoaded();
    return vault.get(this).bundle.find(checker, opt);
  }
  reset(throwError = true) {
    return vault.get(this).bundle.reset(throwError);
  }
  untilLoaded(throwError = true) {
    const _p = vault.get(this);
    if (_p.isLoaded) {
      return true;
    }
    const { state, last } = _p.transactions;
    if (state === "error") {
      return throwError ? last : false;
    }
    if (state === "loading") {
      return last;
    }
    return _p.transactions.execute("loading", (_2) => {
      if (_p.isLoaded) {
        return;
      }
      _p.bundle.run("beforeLoad", [this]);
      const data = _p.stream(this);
      _p.loader(this, _p.bundle, data);
      _p.isLoaded = true;
      _p.bundle.run("afterLoad", [this]);
    }, { stopOnError: false });
  }
  withUntilLoaded(execute) {
    return (...args) => {
      this.untilLoaded();
      return execute(...args);
    };
  }
  addChop(name, config = {}) {
    const subs = vault.get(this).subs;
    const { useCache, throwError, getContext, defaultContext, loader: loader2, extra } = config;
    name = formatKey(name);
    if (useCache !== false && subs[name]) {
      if (throwError !== false) {
        throw Error(this.msg(`chop '${name}' allready exist`));
      }
      return subs[name];
    }
    const sub = new Chop(name, {
      parent: this,
      childName: this.childName,
      maxAge: 0,
      maxAgeError: this.maxAgeError,
      getContext,
      defaultContext,
      loader: (chop, bundle) => {
        this.map((child) => bundle.set(child));
        chop.on("afterReset", this.on("afterSet", (child) => bundle.set(child)), { once: true });
        chop.on("afterReset", this.on("afterRemove", (child) => bundle.remove(child)), { once: true });
        this.on("afterReset", (_2) => chop.reset(), { once: true });
        if (loader2) {
          loader2(chop, bundle);
        }
      },
      extra
    });
    return useCache !== false ? subs[name] = sub : sub;
  }
  getChop(name, throwError = true) {
    const subs = vault.get(this).subs;
    if (subs[name]) {
      return subs[name];
    }
    if (throwError) {
      throw Error(this.msg(`chop '${name}' doesn't exist`));
    }
  }
};
var { solid: solid32, virtual: virtual3 } = jet5.prop;
var Wrap = class extends jet5.types.Plex {
  static is(any) {
    return any instanceof Wrap;
  }
  static create(table, step) {
    return new Wrap(table, step);
  }
  constructor(table, step) {
    const { db: db2, rows, cols } = table;
    const get = (col, throwError = true) => step.get(col, throwError);
    super(get);
    solid32.all(this, {
      db: db2,
      table,
      rows,
      get,
      getRaw: (col, throwError = true) => step.getRaw(col, throwError),
      eval: (selector, opt = {}) => step.eval(selector, opt),
      getRaws: (filter) => step.extract(true, filter),
      getVals: (filter) => step.extract(false, filter)
    }, false);
    virtual3.all(this, {
      key: (_2) => step.key,
      label: (_2) => step.label,
      before: (_2) => step.before?.wrap,
      isExist: (_2) => step.isExist,
      isDirty: (_2) => step.isDirty,
      isRemoved: (_2) => step.isRemoved,
      raws: (_2) => ({ ...step.raws }),
      vals: (_2) => cols.map((col) => step.pull(col), { byKey: true }),
      changeList: (_2) => [...step.changeList],
      changes: (_2) => ({ ...step.changes })
    });
  }
  chopByRef(tableName, colName, filter, cacheAs = true, morphSeparator = "$$") {
    const table = this.db.get(tableName);
    const chop = table.rows.chopByCol(colName, filter, cacheAs, morphSeparator);
    if (chop.extra.isRef) {
      return chop;
    }
    throw Error(this.table.msg(`chopByRef table('${tableName}') column('${colName}') failed because column is not ref`));
  }
  refs(tableName, colName, filter, cache = {}) {
    const chop = cache.current || (cache.current = this.chopByRef(tableName, colName, filter, false));
    return chop.getList((chop.extra.isMorph ? this.table.name + chop.extra.morphSeparator : "") + this.key, false);
  }
  getKey() {
    return this.key;
  }
  toJSON() {
    return this.key || null;
  }
  toString() {
    return this.key || "";
  }
};
var { solid: solid4, virtual: virtual4 } = jet6.prop;
var Step = class {
  static is(any) {
    return any instanceof Step;
  }
  static create(table, before) {
    return new Step(table, before);
  }
  constructor(table, before) {
    this.key = before?.key;
    let state = "ready";
    solid4.all(this, {
      db: table.db,
      table,
      wrap: Wrap.create(table, this),
      lock: (_2) => state !== "ready" ? false : (state = "locked") && true,
      unlock: (_2) => state !== "locked" ? false : (state = "ready") && true,
      retire: (_2) => {
        before = null;
        state = "retired";
      }
    }, false);
    virtual4.all(this, {
      before: (_2) => before,
      state: (_2) => state,
      label: (_2) => this.pull(table.cols.label),
      isExist: (_2) => !this.isRemoved && table.rows.exist(this.key),
      isDirty: (_2) => !!this.changeList.length || this.key !== before?.key || !this.isRemoved !== !before?.isRemoved
    });
    this.reset();
  }
  getKey() {
    return this.key;
  }
  pull(col) {
    if (!col) {
      return;
    }
    const { vals, raws, vStamp, vSolid, before, wrap } = this;
    const { isVirtual, init, resetIf, formula, isReadonly: isReadonly2, separator } = col;
    const cacheStamp = col.getCacheStamp();
    if (vals.hasOwnProperty(col) && (!isVirtual || vStamp[col] === cacheStamp)) {
      const cval = vals[col];
      return separator && cval ? [...cval] : cval;
    }
    let raw = raws[col];
    const self = (_2) => col.toVal(raw, wrap);
    if (!vSolid[col]) {
      vSolid[col] = !isVirtual;
      if (formula) {
        raw = formula(wrap);
      } else {
        const bew = before ? before.raws[col] : raw;
        if (raw !== bew && isReadonly2 && isReadonly2(wrap, self)) {
          raw = bew;
        }
        if (!before ? init && raw == null : resetIf && resetIf(wrap, self)) {
          raw = init ? init(wrap) : void 0;
        }
      }
    }
    const val = self();
    if (cacheStamp) {
      vals[col] = val;
      vStamp[col] = cacheStamp;
    }
    if (!isVirtual || col.isPrimary) {
      raws[col] = col.toRaw(val);
    }
    return val;
  }
  push(vals, force = true) {
    if (this.state !== "ready") {
      return false;
    }
    const { table: { rows: { isLoading }, cols }, raws, before } = this;
    const reals = cols.virtuals.getList(false);
    const changeList = this.changeList = [];
    const changes = this.changes = {};
    this.vals = {};
    this.vStamp = {};
    this.vSolid = {};
    for (const col of reals) {
      this.vSolid[col] = isLoading;
      const raw = col.fetch(vals);
      if (raw !== void 0) {
        raws[col] = col.toRaw(raw);
      } else if (force) {
        delete raws[col];
      }
      if (isLoading) {
        changeList.push(col);
        changes[col] = raws[col];
      }
    }
    if (!isLoading) {
      for (const col of reals) {
        this.pull(col);
        if (before && raws[col] !== before.raws[col]) {
          changeList.push(col);
          changes[col] = raws[col];
        }
      }
      ;
    }
    this.key = this.pull(cols.primary);
    return !!changeList.length;
  }
  get(col, throwError = true) {
    const { table: { cols } } = this;
    if (!Array.isArray(col)) {
      return this.pull(cols.get(col, throwError !== false));
    }
    let row;
    for (const c of col) {
      if (c === col[0]) {
        row = this.pull(cols.get(c, throwError !== false));
      } else if (row?.get) {
        row = row.get(c, throwError);
      } else {
        return;
      }
    }
    return row;
  }
  getRaw(col, throwError = true) {
    const { table: { cols } } = this;
    if (this.raws.hasOwnProperty(col)) {
      return this.raws[col];
    }
    const c = cols(col, throwError);
    if (c && c.isVirtual) {
      return c.toRaw(this.pull(c));
    }
  }
  eval(selector, opt = {}) {
    return evaluate(this, selector, opt);
  }
  extract(noVals, filter) {
    const { table: { cols } } = this;
    return cols.map((c) => {
      if (filter && !filter(c)) {
        return;
      }
      return !noVals ? this.pull(c) : !c.isVirtual ? this.raws[c] : c.toRaw(this.pull(c));
    }, { byKey: true });
  }
  remove() {
    if (this.state !== "ready") {
      return false;
    }
    return this.isRemoved = true;
  }
  reset() {
    if (this.state !== "ready") {
      return false;
    }
    const { before } = this;
    this.isRemoved = before?.isRemoved || false;
    this.raws = before ? { ...before.raws } : {};
    this.vals = before ? { ...before.vals } : {};
    this.vStamp = before ? { ...before.vStamp } : {};
    this.vSolid = before ? { ...before.vSolid } : {};
    this.changeList = [];
    this.changes = {};
    return true;
  }
};
var { solid: solid5, virtual: virtual5 } = jet7.prop;
var Row = class extends jet7.types.Plex {
  static create(rows, onSave, iniStep) {
    return new Row(rows, onSave, iniStep);
  }
  constructor(rows, onSave, iniStep) {
    const { db: db2, table } = rows;
    const _p = {};
    const get = (col, throwError = true) => _p.live.get(col, throwError);
    const push = (vals, force, opt = { autoSave: true, resetOnError: true, throwError: true, silentSave: false }) => {
      return _p.live.push(vals, force) && (opt.autoSave === false || this.save(opt));
    };
    const markAsSaved = (_2) => {
      _p.live = Step.create(table, _p.saved = _p.live);
    };
    super(get);
    solid5.all(this, {
      db: db2,
      table,
      rows,
      get,
      getRaw: (col, throwError = true) => _p.live.getRaw(col, throwError),
      eval: (selector, opt = {}) => _p.live.eval(selector, opt),
      set: (vals, opt = { autoSave: true, resetOnError: true, throwError: true }) => push(vals, true, opt),
      update: (vals, opt = { autoSave: true, resetOnError: true, throwError: true }) => push(vals, false, opt),
      reset: (_2) => !this.isDirty || _p.live.reset(),
      remove: (opt = { autoSave: true, resetOnError: true, throwError: true }) => {
        return _p.live.remove() && (opt.autoSave === false || this.save(opt));
      },
      save: (opt = { resetOnError: true, throwError: true, silentSave: false }) => {
        if (!this.isDirty) {
          return true;
        }
        const live = _p.live;
        try {
          live.lock();
          onSave(this, { throwError: true, silentSave: opt.silentSave === true }, markAsSaved);
          live.retire();
          return true;
        } catch (err) {
          live.unlock();
          if (opt.resetOnError !== false) {
            this.reset();
          }
          if (opt.throwError !== false) {
            throw err;
          }
          console.warn(this.msg(err?.message || "unknown error"), err?.stack);
          return false;
        }
      }
    }, false);
    virtual5.all(this, {
      key: (_2) => _p.saved?.key,
      label: (_2) => _p.saved?.label,
      isRemoved: (_2) => !_p.saved || _p.saved.isRemoved,
      isExist: (_2) => !!_p.saved?.isExist,
      isDirty: (_2) => _p.live.isDirty,
      live: (_2) => _p.live.wrap,
      saved: (_2) => _p.saved?.wrap
    });
    _p.live = iniStep || Step.create(table);
  }
  msg(text) {
    return this.rows.msg(text, this.key || JSON.stringify(this.raws));
  }
  getKey(isSet) {
    return isSet ? this.live.key : this.key;
  }
  toJSON() {
    return this.key;
  }
  toString() {
    return this.key || "";
  }
};
var { solid: solid6 } = jet8.prop;
var _scopes = ["global", "db", "table", "self"];
var functionWithCacheOrNull = (trait, col) => {
  const selector = col.selector;
  const formula = functionOrNull(trait);
  if (!formula) {
    return selector ? (row) => row.eval(selector) : null;
  }
  const cache = {};
  if (!selector) {
    return (row) => formula(row, cache);
  }
  return (row) => formula(row.eval(selector), row, cache);
};
var colTo = map2({
  boolean: { val: Boolean.jet.to },
  string: { val: (v, c) => String.jet.to(v).substr(0, c.max) },
  ref: { val: String, raw: (v) => v.key || v },
  number: { val: (v, c) => Number.jet.round(Number.jet.frame(Number.jet.to(v), c.min, c.max), c.dec) },
  datetime: { val: (v) => v == null ? new Date() : new Date(v) },
  duration: { val: (v) => Math.max(0, Math.round(Number.jet.to(v))) },
  object: { val: (v) => jet9.json.from(v) }
}, (t) => t.raw ? t : { ...t, raw: t.val });
var colTraits = {
  type: jet9.enumFactory(Object.keys(colTo), {
    before: (raw) => String.jet.simplify(String.jet.to(raw)),
    after: (output, col) => col.ref ? "ref" : output != null ? output : "string"
  }),
  isReadonly: functionOrNull,
  resetIf: functionOrNull,
  init: functionOrNull,
  selector: (val) => Array.isArray(val) || typeof val === "string" ? val : null,
  formula: functionWithCacheOrNull,
  ref: functionOrNull,
  display: (val, col) => numberPositive(val, col.db.displayDefault),
  separator: String.jet.to,
  isVirtual: Boolean.jet.to,
  isTrusted: Boolean.jet.to,
  isMorph: (val, col) => typeof col._ref === "function",
  dec: (val, col) => Math.round(numberPositive(val, col.db.decimalDefault)),
  min: (val) => val == null ? void 0 : Number.jet.to(val),
  max: (val) => val == null ? void 0 : Number.jet.to(val),
  noNull: Boolean.jet.to,
  extra: Object.jet.to,
  scope: (raw, col) => {
    if (!col.isVirtual) {
      return (_2) => "self";
    }
    if (typeof raw === "string") {
      raw = String.jet.simplify(String.jet.to(raw));
      return _scopes.includes(raw) ? (_2) => raw : (_2) => raw.split(",");
    }
    if (Array.isArray(raw)) {
      return (_2) => [...raw];
    }
    if (!col.selector) {
      return (_2) => "self";
    }
    let ready, pending;
    const tables = /* @__PURE__ */ new Set(), scopes = /* @__PURE__ */ new Set();
    return (_2) => {
      if (pending) {
        pending;
      } else if (!ready) {
        pending = collectDeps(col.cols, col.selector, tables, scopes);
        ready = true;
        pending = null;
      }
      if (scopes.has("global")) {
        return "global";
      }
      if (scopes.has("db")) {
        return "db";
      }
      if (!tables.size) {
        return "self";
      }
      return [...tables];
    };
  }
};
var collectDeps = (cols, selector, tables, scopes) => {
  if (!cols) {
    return;
  }
  if (scopes.has("global") || scopes.has("db")) {
    return;
  }
  breachSelector(
    selector,
    (alias, path, selector2) => {
      if (path === "*") {
        return;
      }
      const c = cols(path || selector2);
      const s = c.scope();
      if (!Array.isArray(s)) {
        scopes.add(s);
      } else {
        for (const t of s) {
          tables.add(t);
        }
      }
      if (!c._ref) {
        return;
      }
      if (c.isMorph) {
        scopes.add("db");
        return;
      }
      if (!path) {
        return;
      }
      tables.add(c._ref);
      const tbl = cols.db(c._ref);
      return collectDeps(tbl.cols, selector2, tables, scopes);
    },
    (arr) => arr.map((selector2) => collectDeps(cols, selector2, tables, scopes))
  );
};
var { solid: solid7, virtual: virtual6, cached: cached3 } = jet10.prop;
var { solid: solid8, virtual: virtual7 } = jet11.prop;
var { solid: solid9, virtual: virtual8 } = jet12.prop;
var toRefId = (ref) => typeof ref !== "string" ? ref?.id : ref;
var isFce = (fce) => typeof fce === "function";
var toFce = (fce, defReturn) => isFce(fce) ? fce : () => defReturn;
var wrapFce = (wrap, what) => (...args) => wrap(what(...args));
var toStr = (any, def) => any != null ? String(any) : def;
var toArr = (any) => any instanceof Array ? any : [any];
var toNum = (val, min, max, dec) => {
  val = Number(val);
  if (isNaN(val)) {
    return val;
  }
  if (max != null) {
    val = Math.min(val, max);
  }
  if (min != null) {
    val = Math.max(val, min);
  }
  if (dec == 0) {
    val = Math.round(val);
  } else if (dec > 0) {
    const pow = Math.pow(10, dec);
    val = Math.round(val * pow) / pow;
  }
  return val;
};
var _bols = /^(0|n|no|not|off|false)$/i;
var toBol = (val) => typeof val !== "string" ? !!val : !_bols.test(val);
var toDate = (val, min, max) => {
  if (!(val instanceof Date)) {
    return new Date(toNum(val, min, max));
  }
  if (min == null && max == null) {
    return val;
  }
  return new Date(toNum(x.getTime(), min, max));
};
var _arg = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
var parseFceArgs = (args) => {
  if (args) {
    args = args.trim();
  }
  if (!args) {
    return [];
  }
  if (!args.startsWith("(")) {
    return _arg.test(args) ? [args] : void 0;
  }
  if (!args.endsWith(")")) {
    return;
  }
  args = args.slice(1, -1).trim();
  if (!args) {
    return [];
  }
  let result = [];
  for (let a of args.split(",")) {
    a = a.trim();
    if (!_arg.test(a)) {
      return;
    }
    result.push(a);
  }
  return result;
};
var parseFce = (val) => {
  const t = typeof val;
  if (t === "function") {
    return val;
  }
  if (t !== "string") {
    return (_2) => val;
  }
  const frags = val.trim().split("=>");
  if (frags.length <= 1) {
    return (_2) => val;
  }
  const args = parseFceArgs(frags.shift());
  if (!args) {
    return (_2) => val;
  }
  let body = frags.join("=>").trim();
  if (!body.startsWith("{")) {
    body = "return " + body;
  } else if (!body.endsWith("}")) {
    return (_2) => val;
  } else {
    body = body.slice(1, -1).trim();
  }
  return new Function(args, body);
};
var prepareRecs = (chop, recsByGroupId, groupId, throwError = true, autoCreate = false) => {
  let recs = recsByGroupId.get(groupId);
  if (recs) {
    return recs;
  }
  if (autoCreate) {
    recsByGroupId.set(groupId, recs = /* @__PURE__ */ new Map());
  } else if (throwError) {
    throw Error(chop.msg(`not found`, { group: groupId }));
  }
  return recs;
};
var deleteRec = (chop, recsByGroupId, groupId, rec) => {
  const recs = prepareRecs(chop, recsByGroupId, groupId, true, false);
  if (!recs?.has(rec.id)) {
    throw Error(chop.msg(`delete(...) critical error - inconsistency`, { group: groupId, row: rec.id }));
  }
  if (recs.size <= 1) {
    recsByGroupId.delete(groupId);
  } else {
    recs.delete(rec.id);
  }
};
var setRec = (chop, recsByGroupId, groupId, rec) => {
  const recs = prepareRecs(chop, recsByGroupId, groupId, false, true);
  const current = recs.get(rec.id);
  if (!current) {
    recs.set(rec.id, rec);
    return;
  }
  if (current === rec) {
    return;
  }
  throw Error(chop.msg(`add(...) failed - duplicate`, { group: groupId, row: rec.id }));
};
var getRec = (chop, groupId, recId, throwError = false) => {
  if (!recId) {
    if (throwError) {
      throw Error(chop.msg(`get(...) failed - id undefined`, { group: groupId }));
    }
    return;
  }
  const { recsByGroupId } = vault.get(chop);
  const recs = prepareRecs(chop, recsByGroupId, groupId, throwError, false);
  return recs?.get(recId);
};
var getRecs = (chop, groupId, throwError = false) => {
  const { recsByGroupId } = vault.get(chop);
  return prepareRecs(chop, recsByGroupId, groupId, throwError, false);
};
var getAllRecs = (chop) => vault.get(chop).groupIdsByRec;
var afterRemove = (chop, rec, ctx) => {
  const { isMultiGroup, recsByGroupId, groupIdsByRec, filter, handlers, childs, state } = vault.get(chop);
  const current = groupIdsByRec.get(rec);
  if (!current) {
    if (filter(rec)) {
      throw Error(chop.msg(`remove(...) failed - missing`, { row: rec.id }));
    }
    return false;
  }
  if (isMultiGroup) {
    for (const groupId of current) {
      deleteRec(chop, recsByGroupId, groupId, rec);
    }
  } else {
    deleteRec(chop, recsByGroupId, current, rec);
  }
  groupIdsByRec.delete(rec);
  return runEvent(handlers, childs, state, "remove", rec, ctx);
};
var afterReset = (chop, ctx) => {
  const _p = vault.get(chop);
  const { recsByGroupId, groupIdsByRec, init, handlers, childs, state } = _p;
  groupIdsByRec.clear();
  recsByGroupId.clear();
  _p.state = "init";
  init(chop, ctx);
  _p.state = "reset";
  runEvent(handlers, childs, _p.state, "reset", void 0, ctx);
  _p.state = "ready";
  return true;
};
var afterUpdate = (chop, rec, ctx) => {
  const { isMultiGroup, recsByGroupId, groupIdsByRec, group, filter, handlers, childs, state } = vault.get(chop);
  const current = groupIdsByRec.get(rec);
  if (!current) {
    if (filter(rec)) {
      throw Error(chop.msg(`update(...) failed - missing`, { row: rec.id }));
    }
    return false;
  }
  const valid = chop.getGroup(rec);
  if (isMultiGroup) {
    const results = /* @__PURE__ */ new Set();
    for (const groupId of valid) {
      if (results.has(groupId)) {
        continue;
      }
      results.add(groupId);
      if (current.has(groupId)) {
        current.delete(groupId);
        continue;
      }
      setRec(chop, recsByGroupId, groupId, rec);
    }
    for (const groupId of current) {
      deleteRec(chop, recsByGroupId, groupId, rec);
    }
    groupIdsByRec.set(rec, results);
  } else if (valid !== current) {
    setRec(chop, recsByGroupId, valid, rec);
    deleteRec(chop, recsByGroupId, current, rec);
    groupIdsByRec.set(rec, valid);
  }
  return runEvent(handlers, childs, state, "update", rec, ctx);
};
var runEvent = (handlers, childs, state, event, rec, ctx) => {
  if (childs.size && state !== "init") {
    if (event === "reset") {
      for (const child of childs) {
        afterReset(child, ctx);
      }
    } else if (event === "add") {
      for (const child of childs) {
        afterAdd(child, rec, ctx);
      }
    } else if (event === "remove") {
      for (const child of childs) {
        afterRemove(child, rec, ctx);
      }
    } else if (event === "update") {
      for (const child of childs) {
        afterUpdate(child, rec, ctx);
      }
    }
  }
  if (handlers?.length) {
    for (let i = handlers.length - 1; i >= 0; i--) {
      try {
        if (handlers[i]) {
          handlers[i](event, rec, ctx);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
  return true;
};
var onEvent = (chop, callback, onlyOnce = false) => {
  if (!isFce(callback)) {
    throw Error(chop.msg(`on(...) require callback`));
  }
  const { handlers } = vault.get(chop);
  let remove;
  const cb = onlyOnce ? (...args) => {
    callback(...args);
    remove();
  } : callback;
  handlers.unshift(cb);
  return remove = (_2) => {
    const x2 = handlers.indexOf(cb);
    if (x2 >= 0) {
      handlers.splice(x2, 1);
    }
    return callback;
  };
};
var afterAdd = (chop, rec, ctx) => {
  const { isMultiGroup, recsByGroupId, groupIdsByRec, filter, group, handlers, childs, state } = vault.get(chop);
  if (!filter(rec)) {
    return false;
  }
  const valid = chop.getGroup(rec);
  if (isMultiGroup) {
    const results = /* @__PURE__ */ new Set();
    for (const groupId of valid) {
      if (results.has(groupId)) {
        continue;
      }
      setRec(chop, recsByGroupId, groupId, rec);
      results.add(groupId);
    }
    groupIdsByRec.set(rec, results);
  } else {
    setRec(chop, recsByGroupId, valid, rec);
    groupIdsByRec.set(rec, valid);
  }
  return runEvent(handlers, childs, state, "add", rec, ctx);
};
var Chop2 = class {
  constructor(id, opt = {}, parent) {
    id = toStr(id);
    if (!id) {
      throw Error(this.msg("critical error - missing id"));
    }
    const { init, group, autoReset = true, isMultiGroup = false } = opt;
    const filter = toFce(opt.filter, true);
    const _p = {
      state: "pending",
      handlers: [],
      childs: /* @__PURE__ */ new Set(),
      groupIdsByRec: /* @__PURE__ */ new Map(),
      // rec -> groupIds
      recsByGroupId: /* @__PURE__ */ new Map(),
      // groupId -> recs
      isMultiGroup,
      init: toFce(init),
      filter: parent ? (rec) => parent.getGroup(rec) === id && filter(rec) : filter
    };
    solids(this, {
      db: parent?.db || this,
      parent,
      getGroup: !isMultiGroup ? toFce(group) : wrapFce(toArr, toFce(group, [void 0]))
    }, false);
    solids(this, {
      id: parent ? parent.id + "." + id : id,
      isMultiGroup
    });
    virtuals(this, {
      state: (_2) => _p.state,
      size: (_2) => _p.groupIdsByRec.size,
      childs: (_2) => [..._p.childs]
    });
    vault.set(this, _p);
    if (parent) {
      const _pp = vault.get(parent);
      _p.init = (_2, ctx) => {
        for (const [rec] of _pp.groupIdsByRec) {
          afterAdd(this, rec, false, ctx);
        }
      };
      _pp.childs.add(this);
    }
    if (autoReset) {
      this.reset();
    }
  }
  msg(text, details = {}) {
    let msg = this.id;
    for (let i in details) {
      msg += ` ${i}[${details[i]}]`;
    }
    if (text) {
      msg += " " + text;
    }
    return msg.trim();
  }
  on(callback, onlyOnce = false) {
    return onEvent(this, callback, onlyOnce);
  }
  reset(ctx) {
    return afterReset(this, ctx);
  }
  get(groupId, recId, throwError = false) {
    return getRec(this, groupId, recId, throwError);
  }
  getMap(groupId, throwError = false) {
    const recs = getRecs(this, groupId, throwError);
    return recs ? new Map(recs) : /* @__PURE__ */ new Map();
  }
  getList(groupId, throwError = false) {
    const recs = getRecs(this, groupId, throwError);
    return recs ? recs.values() : [];
  }
  getAll() {
    return getAllRecs(this).keys();
  }
  chop(id, opt = {}) {
    return new Chop2(id, opt, this);
  }
};
var getter = fcePass;
var setter = fcePass;
var isRequired = fceTrue;
var isReadonly = fceTrue;
var meta = {
  "_ents": {
    "_ents": {},
    "_cols": {},
    "_types": {}
  },
  "_types": {
    "string": { setter: (v, c) => toStr(v, "").substr(0, c.max), getter },
    "boolean": { setter: (v, c) => toBol(v), getter },
    "number": { setter: (v, c) => toNum(v, c.min, c.max, c.dec), getter },
    "datetime": { setter: (v, c) => toDate(v, c.min, c.max), getter },
    "duration": { setter: (v, c) => toNum(v, c.min > 0 ? c.min : 0, c.max, 0), getter },
    "function": { setter: (v, c) => parseFce(v), getter },
    "object": { setter: (v, c) => typeof v == "string" ? JSON.parse(v) : {}, getter },
    "ref": { setter, getter },
    "nref": { setter, getter },
    "any": { setter, getter }
  },
  "_cols": {
    "_ents-isMeta": {
      ent: "_ents",
      name: "isMeta",
      type: "boolean",
      isReadonly
    },
    "_ents-cols": {
      ent: "_ents",
      name: "cols",
      type: "nref",
      ref: "_cols",
      parent: "_cols-ent",
      noCache: true
    },
    //_types
    "_types-isMeta": {
      ent: "_types",
      name: "isMeta",
      type: "boolean",
      isReadonly
    },
    "_types-setter": {
      ent: "_types",
      name: "setter",
      type: "function",
      isReadonly,
      fallback: (_2) => setter
    },
    "_types-getter": {
      ent: "_types",
      name: "getter",
      type: "function",
      isReadonly,
      fallback: (_2) => getter
    },
    //_cols
    "_cols-isMeta": {
      ent: "_cols",
      name: "isMeta",
      type: "boolean",
      isReadonly
    },
    "_cols-ent": {
      ent: "_cols",
      name: "ent",
      type: "ref",
      ref: "_ents",
      isReadonly,
      isRequired
    },
    "_cols-name": {
      ent: "_cols",
      name: "name",
      type: "string",
      isReadonly,
      isRequired
    },
    "_cols-type": {
      ent: "_cols",
      name: "type",
      type: "ref",
      ref: "_types",
      fallback: (_2) => "any"
    },
    "_cols-ref": {
      ent: "_cols",
      name: "ref",
      type: "ref",
      ref: "_ents"
    },
    "_cols-parent": {
      ent: "_cols",
      name: "parent",
      type: "ref",
      ref: "_cols"
    },
    "_cols-isList": {
      ent: "_cols",
      name: "isList",
      type: "boolean"
    },
    "_cols-isReadonly": {
      ent: "_cols",
      name: "isReadonly",
      type: "function"
    },
    "_cols-isRequired": {
      ent: "_cols",
      name: "isRequired",
      type: "function"
    },
    "_cols-resetIf": {
      ent: "_cols",
      name: "resetIf",
      type: "function"
    },
    "_cols-init": {
      ent: "_cols",
      name: "init",
      type: "function"
      //Type should be defined as a function
    },
    "_cols-fallback": {
      ent: "_cols",
      name: "fallback",
      type: "function"
      //Type should be defined as a function
    },
    "_cols-validator": {
      ent: "_cols",
      name: "validator",
      type: "function"
    },
    "_cols-decimal": {
      ent: "_cols",
      name: "decimal",
      type: "number",
      decimal: 0,
      min: 0
    },
    "_cols-min": {
      ent: "_cols",
      name: "min",
      type: "number"
      //decimal:_=>r.decimal //decimal should be defined as a function
    },
    "_cols-max": {
      ent: "_cols",
      name: "max",
      type: "number"
      //decimal:_=>r.decimal, min:_=>r.min //decimal & min should be defined as a function
    },
    "_cols-formula": {
      ent: "_cols",
      name: "formula",
      type: "function"
    },
    "_cols-noCache": {
      ent: "_cols",
      name: "noCache",
      type: "boolean"
    },
    "_cols-omitChange": {
      ent: "_cols",
      name: "omitChange",
      type: "boolean"
    }
  }
};
var metaEnt = (ent) => {
  return {
    _ent: `_cols`,
    id: `${ent}-_ent`,
    ent,
    name: "_ent",
    type: "ref",
    ref: "_ents",
    isReadonly,
    isRequired,
    isMeta: true
  };
};
var metaId = (ent, formula) => {
  return {
    _ent: `_cols`,
    id: `${ent}-id`,
    ent,
    name: "id",
    type: "string",
    isReadonly,
    isRequired,
    isMeta: true,
    formula
  };
};
var Exception = class {
  constructor(severity, reason, details, column) {
    solids2(this, { severity, column, reason, details });
  }
};
var ColMinor = class extends Exception {
  constructor(column, reason, details) {
    super("minor", reason, details, column);
  }
};
var ColMajor = class extends Exception {
  constructor(column, reason, details) {
    super("major", reason, details, column);
  }
};
var PushMajor = class extends Exception {
  constructor(reason, details) {
    super("major", reason, details);
  }
};
var _columnsByEnt = /* @__PURE__ */ new Map();
var getColsPriv = (entId) => _columnsByEnt.get(entId);
var createGetter = (_col) => {
  const col = _col.current;
  const v = _col.values;
  const { getter: getter2 } = meta._types[v.type] || col.type;
  return v.type == "ref" ? (from) => _col.db.get(v.ref, from, false) : getter2;
};
var createSetter = (_col) => {
  const col = _col.current;
  const v = _col.values;
  const { name, ref, parent, formula, validator, isReadonly: isReadonly2, resetIf, init, fallback, isRequired: isRequired2 } = col;
  const { setter: setter2 } = meta._types[v.type] || col.type;
  const typize = (v2) => v2 == null ? void 0 : setter2(v2, col);
  const n = v.type != "ref" ? typize : (v2) => typize(toRefId(v2));
  return ({ current, before }, output, to, isInit) => {
    if (formula) {
      to = output[name] = n(formula(current, col, before));
    } else {
      if (!isInit && isReadonly2 && isReadonly2(current, col, before)) {
        throw new ColMinor(name, `is readonly`);
      }
      to = output[name] = n(to);
      if (validator && !validator(current[name], before[name], current, col, before)) {
        throw new ColMajor(name, "is invalid");
      }
      if (isInit && to == null || resetIf && resetIf(current, col, before)) {
        to = output[name] = !init ? void 0 : n(init(current, col, before));
      }
    }
    if (to == null && fallback) {
      to = output[name] = n(fallback(current, col, before));
    }
    if (to == null && isRequired2 && isRequired2(current, col, before)) {
      throw new ColMajor(name, "is required");
    }
    return output[name];
  };
};
var createTraits = (_col) => {
  return cacheds({}, {}, {
    getter: (_2) => createGetter(_col),
    setter: (_2) => createSetter(_col)
  });
};
var setColumn = (db2, col) => {
  const _col = getRecPriv(db2, col);
  const ent = _col.values.ent = toRefId(_col.values.ent);
  if (_columnsByEnt.has(ent)) {
    _columnsByEnt.get(ent).add(_col);
  } else {
    _columnsByEnt.set(ent, /* @__PURE__ */ new Set([_col]));
  }
  solid11(_col, "traits", createTraits(_col), true, true);
  solid11(_col, "isMetaColumn", !meta.hasOwnProperty(ent));
  const rows = getRecs(db2, ent);
  if (rows) {
    for (const [_2, row] of rows) {
      getRecPriv(db2, row).addColumn(_col);
    }
  }
};
var removeColumn = (db2, col) => {
  const { name, ent } = col;
  const rows = getRecs(db2, toRefId(ent));
  if (rows) {
    for (const [_2, row] of rows) {
      getRecPriv(db2, row).removeColumn(name);
    }
  }
};
var Push = class {
  constructor(_rec) {
    solids3(this, {
      _rec
    });
  }
  throw(error) {
    if (this.isDone && error.severity !== "minor") {
      this.isDone = false;
    }
    this.exceptions.push(error);
  }
  prepare(input, isUpdate = false) {
    const { values, state, isMeta, isMetaColumn } = this._rec;
    this.input = input;
    const output = this.output = {};
    const pendings = this.pendings = /* @__PURE__ */ new Set();
    this.isDone = true;
    this.exceptions = [];
    this.changed = /* @__PURE__ */ new Set();
    this.isPending = false;
    this.isChanged = false;
    if (!values._ent) {
      this.throw(new ColMajor("_ent", "is required"));
      return;
    }
    const _cols = getColsPriv(values._ent);
    if (!_cols) {
      this.throw(new ColMajor("_ent", "invalid"));
      return;
    }
    for (const _col of _cols) {
      const { name, formula, resetIf, noCache } = _col.values;
      const real = input.hasOwnProperty(name);
      output[name] = values[name];
      if (real && state === "ready") {
        if (_col.isMeta && isMeta && !isMetaColumn) {
          this.throw(new ColMinor(name, "is meta"));
          continue;
        }
        if (formula) {
          this.throw(new ColMinor(name, `has formula`));
          continue;
        }
      }
      if (formula && noCache) {
        continue;
      }
      if (isMeta && state === "pending") {
        continue;
      }
      if (formula) {
        pendings.add(_col);
        continue;
      }
      if (!isUpdate || real) {
        pendings.add(_col);
        this.isPending = true;
        continue;
      }
      if (resetIf) {
        input[name] = values[name];
        pendings.add(_col);
        continue;
      }
    }
    if (state === "ready" && !this.isPending) {
      this.throw(new PushMajor("blank"));
    }
  }
  execute() {
    if (this.isPending) {
      for (const _col of this.pendings) {
        this.pull(_col);
      }
    }
    if (!this.isChanged || !this.isDone) {
      this.isChanged = false;
      this.output = this._rec.values;
      this.changed.clear();
    }
    return this.output;
  }
  pull(_col) {
    const { _rec, pendings, output, input, changed } = this;
    const { values: { name, omitChange }, traits: { setter: setter2 } } = _col;
    if (pendings.has(_col)) {
      if (this.pending === _col) {
        return output[name];
      }
      this.pending = _col;
      try {
        setter2(_rec, output, input[name], _rec.state === "pending");
      } catch (err) {
        this.throw(err);
      }
      delete this.pending;
      pendings.delete(_col);
      if (output[name] !== _rec.values[name]) {
        changed.add(name);
        if (!this.isChanged && !omitChange) {
          this.isChanged = true;
        }
      }
    }
    return output[name];
  }
  close() {
    const { _rec: { current }, isDone, changed, exceptions } = this;
    delete this.isDone;
    delete this.input;
    delete this.output;
    delete this.exceptions;
    delete this.pending;
    delete this.pendings;
    delete this.changed;
    delete this.isChanged;
    delete this.isPending;
    return solids3({}, {
      isDone,
      current,
      changed,
      exceptions
    });
  }
};
var _records = /* @__PURE__ */ new WeakMap();
var getRecPriv = (db2, any, throwError = true) => {
  const _p = _records.get(any);
  if (_p && (!db2 || db2 === _p.db)) {
    return _p;
  }
  if (throwError) {
    throw Error(db2.msg("is not record", { row: toRefId(any) }));
  }
  ;
};
var createRec = (db2, values) => new RecordPrivate(db2, values);
var addRec = (db2, values, ctx) => {
  let res = createRec(db2, values);
  if (db2.state === "ready") {
    res = res.prepareInit().init();
  }
  afterAdd(db2, res.current, ctx);
  return res;
};
var addOrSetRec = (db2, values, ctx, isUpdate) => {
  const _rec = createRec(db2, values).prepareInit();
  const { _ent, id } = _rec.current;
  const brother = getRec(db2, toRefId(_ent), id);
  if (brother) {
    return getRecPriv(db2, brother).set(values, ctx, isUpdate);
  }
  const res = _rec.init();
  afterAdd(db2, res.current, ctx);
  return res;
};
var removeRec = (record, ctx, force) => getRecPriv(void 0, record).remove(ctx, force);
var RecordPrivate = class {
  constructor(db2, values) {
    const _ent = values._ent = toRefId(values._ent);
    const isMeta = values.isMeta && meta.hasOwnProperty(_ent);
    const current = { ...values };
    const before = {};
    solids4(this, {
      db: db2,
      current,
      before,
      push: new Push(this),
      isMeta
    });
    this.values = values;
    this.state = "pending";
    const cols = getRecs(db2._cols, _ent);
    if (cols) {
      for (const [_2, col] of cols) {
        this.addColumn(_records.get(col));
      }
    }
    _records.set(current, this);
  }
  msg(text, details = {}) {
    return this.db.msg(text, {
      ent: toRefId(this.values._ent),
      row: this.values.id,
      ...details
    });
  }
  addColumn(_col) {
    const { current, before, state } = this;
    const { name, formula, noCache } = _col.current;
    const t = _col.traits;
    const isVirtual = formula != null && noCache != null;
    const prop = {
      enumerable: true,
      configurable: true,
      set: (_2) => {
        throw new Error(this.msg("for update use db.update(...) interface", { column: name }));
      }
    };
    if (isVirtual) {
      prop.get = (_2) => t.getter(t.setter(this, this.values, this.values[name]));
    } else {
      prop.get = (_2) => t.getter(this.push.isPending ? this.push.pull(_col) : this.values[name]);
    }
    Object.defineProperty(current, name, prop);
    if (!isVirtual) {
      prop.get = (_2) => t.getter(this.values[name]);
    }
    Object.defineProperty(before, name, prop);
    if (state === "ready") {
      t.setter(this, this.values, this.values[name], true);
    }
  }
  removeColumn(name) {
    const { current, before } = this;
    delete this.values[name];
    delete current[name];
    delete before[name];
  }
  prepareInit() {
    const { state, push, values } = this;
    if (state === "pending") {
      push.prepare(values);
    }
    return this;
  }
  init() {
    const { push } = this;
    this.values = push.execute();
    this.state = "ready";
    return push.close();
  }
  set(input, ctx, isUpdate = false, force = false) {
    const { db: db2, current, push } = this;
    push.prepare(input, isUpdate);
    this.values = push.execute();
    if (push.isChanged) {
      afterUpdate(db2, current, ctx);
    }
    return push.close();
  }
  remove(ctx, force = false) {
    const { db: db2, current, isMeta } = this;
    const errors = /* @__PURE__ */ new Map();
    if (!force && isMeta) {
      errors.set(void 0, "is meta");
    } else {
      this.state = "removed";
      _records.delete(this);
      afterRemove(db2, current, ctx);
    }
    return solids4({}, {
      isDone: !errors.size,
      errors
    });
  }
};
var DB2 = class extends Chop2 {
  constructor(id, opt = {}) {
    const { init } = opt;
    super(id, {
      autoReset: false,
      group: (rec) => toRefId(rec._ent),
      init: (_2) => {
        for (const _ent in meta) {
          for (const id2 in meta[_ent]) {
            addRec(this, { _ent, id: id2, isMeta: true, ...meta[_ent][id2] });
          }
          ;
        }
        init(this);
      }
    });
    const _cols = this.chop("_cols", {
      group: (rec) => toRefId(rec.ent)
    });
    this.on((event, rec) => {
      if (event === "reset") {
        const _recs = [];
        for (const [rec2] of getAllRecs(this)) {
          _recs.push(getRecPriv(this, rec2).prepareInit());
        }
        for (const _rec of _recs) {
          const resp = _rec.init();
          if (!resp.isDone) {
            console.log(resp);
          }
        }
      }
    });
    this.on((event, rec, ctx) => {
      const _ent = toRefId(rec?._ent);
      if (_ent != "_ents") {
        return;
      }
      const { id: id2 } = rec;
      if (event === "remove") {
        for (const col of _cols.getList(id2)) {
          removeRec(col, ctx, true);
        }
        ;
      } else if (event === "add") {
        this.add(metaId(id2, id2 === "_cols" ? (r) => toRefId(r.ent) + "-" + r.name : void 0), ctx);
        this.add(metaEnt(id2), ctx);
      }
    });
    _cols.on((event, rec) => {
      if (event === "add" || event === "update") {
        setColumn(this, rec);
      } else if (event === "remove") {
        removeColumn(this, rec);
      }
    });
    solids5(this, {
      _cols
    });
    this.reset();
  }
  isRecord(any, throwError = false) {
    return !!getRecPriv(this, any, throwError);
  }
  remove(record, ctx) {
    return removeRec(record, ctx);
  }
  add(values, ctx) {
    return addRec(this, values, ctx);
  }
  addOrSet(values, ctx) {
    return addOrSetRec(this, values, ctx);
  }
  addOrUpdate(values, ctx) {
    return addOrSetRec(this, values, ctx, true);
  }
  set(record, values, ctx) {
    return getRecPriv(this, record).set(values, ctx);
  }
  update(record, values, ctx) {
    return getRecPriv(this, record).set(values, ctx, true);
  }
  removeBy(groupId, recId, ctx) {
    const rec = this.get(groupId, recId);
    if (rec) {
      return this.remove(rec, ctx);
    }
  }
  setBy(groupId, recId, values, ctx) {
    const rec = this.get(groupId, recId);
    if (rec) {
      return this.set(rec, values, ctx);
    }
  }
  updateBy(groupId, recId, values, ctx) {
    const rec = this.get(groupId, recId);
    if (rec) {
      return this.update(rec, values, ctx);
    }
  }
};

// demo/src/index.js
import fs from "fs-extra";
var records = fs.readJsonSync("demo/data/db.json");
var db = new DB2("db", {
  init: (self, ctx) => {
    for (const rec of records) {
      self.add(rec, ctx);
    }
  }
});
db.on((event, rec, ctx) => {
});
//# sourceMappingURL=index.js.map
