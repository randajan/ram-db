import jet from "@randajan/jet-core";
import { Wrap } from "../../sync/interfaces/Wrap";

const { solid, virtual } = jet.prop;

export class Step {

  static is(any) { return any instanceof Step; }

  static create(row, before) { return new Step(row, before); }

  constructor(table, before) {

    this.key = before?.key;

    solid.all(this, {
      db: table.db,
      table,
      before,
    }, false);

    virtual.all(this, {
      label:_=>this.pull(table.cols.label),
      isExist:_=>!this.isRemoved && table.rows.exist(this.key),
      isDirty:_=>!!this.changeList.length || this.key !== before?.key || !this.isRemoved !== !(before?.isRemoved)
    });

    solid(this, "wrap", Wrap.create(this), false);

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

    if (!vSolid[col]) {
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
    const { table: { rows:{ isLoading }, cols }, raws, before } = this;

    const reals = cols.virtuals.getList(false);
    const changeList = this.changeList = [];
    const changes = this.changes = {};
    this.vals = {};
    this.vStamp = {};
    this.vSolid = {};

    for (const col of reals) {
      this.vSolid[col] = isLoading;
      const raw = col.fetch(vals);
      if (raw !== undefined) { raws[col] = col.toRaw(raw); }
      else if (force) { raws[col] = null; }
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
    return this.isRemoved = true;
  }

  reset() {
    const { before } = this;
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