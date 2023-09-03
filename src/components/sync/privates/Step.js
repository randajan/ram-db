import jet from "@randajan/jet-core";
import { Wrap } from "../../async/interfaces/Wrap";

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

    const { db:{ lastChange }, vals, raws, vStamp, vSolid, before, wrap } = this;
    const { isVirtual, noCache, init, resetIf, formula, isReadonly } = col;

    if (vals.hasOwnProperty(col) && (!isVirtual || vStamp[col] === lastChange)) { return vals[col]; } //revive cached value

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
    if (!noCache) { vals[col] = val; } //cache value

    if (!isVirtual || col.isPrimary) {
      raws[col] = col.toRaw(val);
      vStamp[col] = lastChange;
    }

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