import jet from "@randajan/jet-core";
import { Wrap } from "../interfaces/Wrap";
import { evaluate } from "../tools";

const { solid, virtual } = jet.prop;

export class Step {

  static is(any) { return any instanceof Step; }

  static create(table, before) { return new Step(table, before); }

  constructor(table, before) {

    this.key = before?.key;
    let retired = false;

    solid.all(this, {
      db: table.db,
      table,
      wrap:Wrap.create(table, this),
      retire:_=>{ before = null; retired = true; return this; }
    }, false);

    virtual.all(this, {
      before:_=>before,
      retired:_=>retired,
      label:_=>this.pull(table.cols.label),
      isExist:_=>!this.isRemoved && table.rows.exist(this.key),
      isDirty:_=>!!this.changeList.length || this.key !== before?.key || !this.isRemoved !== !(before?.isRemoved)
    });

    this.reset();
  }

  getKey() { return this.key; }

  pull(col) {
    if (!col) { return; }

    const { vals, raws, vStamp, vSolid, before, wrap } = this;
    const { isVirtual, cacheStamp, init, resetIf, formula, isReadonly } = col;

    if (vals.hasOwnProperty(col) && (!isVirtual || vStamp[col] === cacheStamp)) {
      return vals[col]; //revive cached value
    } 

    let raw = raws[col];
    const self = _ => col.toVal(raw, wrap);

    if (!vSolid[col]) { //reset raws if is not solid
      vSolid[col] = !isVirtual; //reset everytime if isVirtual
      if (formula) { raw = formula(wrap); } //formula
      else {
        const bew = before ? before.raws[col] : raw;
        if (raw !== bew && isReadonly && isReadonly(wrap, self)) { raw = bew; } //revive value
        if (!before ? (init && raw == null) : (resetIf && resetIf(wrap, self))) { raw = init ? init(wrap) : undefined; } //init or reset
      }
    }

    const val = self();
    if (cacheStamp) {
      vals[col] = val; //cache value
      vStamp[col] = cacheStamp; //create cacheStamp
    } 

    if (!isVirtual || col.isPrimary) { raws[col] = col.toRaw(val); }

    return val;
  };

  push(vals, force = true) {
    if (this.retired) { return false; }

    const { table: { rows:{ isLoading }, cols }, raws, before } = this;

    const reals = cols.virtuals.getList(false);
    const changeList = this.changeList = [];
    const changes = this.changes = {};
    this.vals = {};
    this.vStamp = {};
    this.vSolid = {};

    for (const col of reals) {
      this.vSolid[col] = isLoading; //no reset raws on pull
      const raw = col.fetch(vals);
      if (raw !== undefined) { raws[col] = col.toRaw(raw); }
      else if (force) { delete raws[col]; }
      if (isLoading) {
        changeList.push(col);
        changes[col] = raws[col];
      }
    }

    if (!isLoading) {
      for (const col of reals) {
        this.pull(col);
        if (before && raws[col] !== before.raws[col]) { //is isDirty column
          changeList.push(col);
          changes[col] = raws[col];
        } 
      };
    }

    this.key = this.pull(cols.primary);

    return !!changeList.length;
  }

  get(col, throwError=true) {
    const { table: { cols } } = this;
    if (!Array.isArray(col)) { return this.pull(cols.get(col, throwError !== false)); }
    let row;
    for (const c of col) {
      if (c === col[0]) { row = this.pull(cols.get(c, throwError !== false)); }
      else if (row?.get) { row = row.get(c, throwError); }
      else { return; }
    }
    return row;
  }

  getRaw(col, throwError=true) {
    const { table: { cols } } = this;
    if (this.raws.hasOwnProperty(col)) { return this.raws[col]; }
    const c = cols(col, throwError);
    if (c && c.isVirtual) { return c.toRaw(this.pull(c)); }
  }

  select(selector, opt={}) {
    console.warn(this.table.msg("select() is deprecated please use eval()"));
    const { table: { cols } } = this;
    const { byKey, noVals, throwError } = opt;
    const isArray = Array.isArray(selector);
    const bk = (byKey || !isArray) ? {} : null;
    const bl = Object.keys(selector).map(x => {
      // when selector is array it expect values to be the columns while for object its oposite
      const c = isArray ? selector[x] : x, as = isArray ? x : selector[x];
      const col = cols.get(c, throwError); if (!col) { return; }
      const asref = (!isArray && typeof as === "object");
      if (asref && !col.ref) { throw Error(col.msg("selector looks for ref")); }
      const val = (noVals && !asref) ? this.raws[col] : this.pull(col);
      if (val == null) { return; } else if (isArray) { return bk ? bk[col] = val : val; } //filter simple scenario
      if (!asref) { return bk[typeof as === "string" ? as : col] = val; } //filter alias or another scimple scenario
      bk[col] = col.separator ? val.map(v=>v.select(as, opt)) : val.select(as, opt); 
    });
    return bk || bl;
  }

  eval(selector, opt={}) {
    return evaluate(this, selector, opt);
  }

  remove() {
    if (this.retired) { return false; }
    return this.isRemoved = true;
  }

  reset() {
    if (this.retired) { return false; }
    const { before} = this;
    this.isRemoved = before?.isRemoved || false;
    this.raws = before ? { ...before.raws } : {}; // raw data stored
    this.vals = before ? { ...before.vals } : {}; // values ready to use
    this.vStamp = before ? { ...before.vStamp } : {}; // keep track of when value was cached
    this.vSolid = before ? { ...before.vSolid } : {}; // keep track of values that should be reseted (formula bug repair)
    this.changeList = [];
    this.changes = {};
    return true;
  }

}