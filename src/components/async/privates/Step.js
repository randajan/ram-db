import jet from "@randajan/jet-core";
import { Wrap } from "../interfaces/Wrap";

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
      label:async _=>this.pull(await table.cols.label, false),
      isExist:async _=>!this.isRemoved && await table.rows.exist(this.key),
      isDirty:_=>!!this.changeList.length || this.key !== before?.key || !this.isRemoved !== !(before?.isRemoved)
    });

    solid(this, "wrap", Wrap.create(this), false);

    this.reset();

  }

  getKey() { return this.key; }

  async pull(col) {
    if (!col) { return; }

    const { db:{ lastChange }, table:{ rows }, vals, raws, valsStamp, before, wrap } = this;
    const { isVirtual, noCache, init, resetIf, formula, isReadonly } = col;

    if (vals.hasOwnProperty(col) && (!isVirtual || valsStamp[col] === lastChange)) { return vals[col]; }

    let raw = raws[col];
    const self = _ => col.toVal(raw, wrap);

    if (formula) { raw = await formula(wrap); } //formula
    else if (!rows.isLoading) {
      const bew = before ? before.raws[col] : raw;
      if (raw !== bew && isReadonly && await isReadonly(wrap, self)) { raw = bew; } //revive value
      if (!before ? (init && raw == null) : (resetIf && await resetIf(wrap, self))) { raw = init ? await init(wrap) : undefined; } //init or reset
    }

    const val = await self();
    if (!noCache) { vals[col] = val; }
    if (!isVirtual) { valsStamp[col] = lastChange; }
    else { raws[col] = col.toRaw(val); }

    return val;
  };

  async push(vals, force = true) {
    const { table: { rows, cols }, raws, before } = this;

    const reals = await cols.virtuals.getList(false);
    const changeList = this.changeList = [];
    const changes = this.changes = {};
    this.vals = {};
    this.valsStamp = {};

    for (const col of reals) {
      const raw = col.fetch(vals);
      if (raw !== undefined) { raws[col] = col.toRaw(raw); }
      else if (force) { raws[col] = null; }
      if (rows.isLoading) {
        changeList.push(col);
        changes[col] = raws[col];
      }
    }

    if (!rows.isLoading) {
      for (const col of reals) {
        await this.pull(col);
        if (before && raws[col] !== before.raws[col]) { //is isDirty column
          changeList.push(col);
          changes[col] = raws[col];
        } 
      };
    }

    this.key = await this.pull(await cols.primary, false);

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

  remove() {
    return this.isRemoved = true;
  }

  reset() {
    const { before } = this;
    this.isRemoved = before?.isRemoved || false;
    this.raws = before ? { ...before.raws } : {};
    this.vals = before ? { ...before.vals } : {};
    this.valsStamp = before ? { ...before.valsStamp } : {};
    this.changeList = [];
    this.changes = {};
    return true;
  }


}