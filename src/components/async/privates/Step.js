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
      label:async _=>this.pull(await table.cols.label),
      isExist:async _=>!this.isRemoved && await table.rows.exist(this.key),
      isDirty:_=>!!this.changeList.length || this.key !== before?.key || !this.isRemoved !== !(before?.isRemoved)
    });

    this.reset();
  }

  getKey() { return this.key; }

  async pull(col) {
    if (!col) { return; }

    const { vals, raws, vStamp, vSolid, before, wrap } = this;
    const { isVirtual, init, resetIf, formula, isReadonly } = col;
    const cacheStamp = await col.getCacheStamp();

    if (vals.hasOwnProperty(col) && (!isVirtual || vStamp[col] === cacheStamp)) {
      return vals[col]; //revive cached value
    } 

    let raw = raws[col];
    const self = _ => col.toVal(raw, wrap);

    if (!vSolid[col]) { //reset raws if is not solid
      vSolid[col] = !isVirtual; //reset everytime if isVirtual
      if (formula) { raw = await formula(wrap); } //formula
      else {
        const bew = before ? before.raws[col] : raw;
        if (raw !== bew && isReadonly && await isReadonly(wrap, self)) { raw = bew; } //revive value
        if (!before ? (init && raw == null) : (resetIf && await resetIf(wrap, self))) { raw = init ? await init(wrap) : undefined; } //init or reset
      }
    }

    const val = await self();
    if (cacheStamp) {
      vals[col] = val; //cache value
      vStamp[col] = cacheStamp; //create cacheStamp
    } 

    if (!isVirtual || col.isPrimary) { raws[col] = col.toRaw(val); }

    return val;
  };

  async push(vals, force = true) {
    if (this.retired) { return false; }

    const { table: { rows:{ isLoading }, cols }, raws, before } = this;

    const reals = await cols.virtuals.getList(false);
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
        await this.pull(col);
        if (before && raws[col] !== before.raws[col]) { //is isDirty column
          changeList.push(col);
          changes[col] = raws[col];
        } 
      };
    }

    this.key = await this.pull(await cols.primary);

    return !!changeList.length;
  }

  async get(col, throwError=true) {
    const { table: { cols } } = this;
    if (!Array.isArray(col)) { return this.pull(await cols.get(col, throwError !== false)); }
    let row;
    for (const c of col) {
      if (c === col[0]) { row = await this.pull(await cols.get(c, throwError !== false)); }
      else if (row?.get) { row = await row.get(c, throwError); }
      else { return; }
    }
    return row;
  }

  async getRaw(col, throwError=true) {
    const { table: { cols } } = this;
    if (this.raws.hasOwnProperty(col)) { return this.raws[col]; }
    const c = await cols(col, throwError);
    if (c && await c.isVirtual) { return c.toRaw(await this.pull(c)); }
  }

  async eval(selector, opt={}) {
    return evaluate(this, selector, opt);
  }

  async extract(noVals, filter) {
    const { table: { cols } } = this;
    return cols.map(async c=>{
      if (filter && !await filter(c)) { return; }
      return !noVals ? this.pull(c) : !c.isVirtual ? this.raws[c] : c.toRaw(await this.pull(c));
    }, { byKey:true });
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