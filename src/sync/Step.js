import jet from "@randajan/jet-core";
import { Wrap } from "./Wrap";

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
      label:_=>this.pull(table.cols.label, false),
      isExist:_=>!this.isRemoved && table.rows.exist(this.key),
      isDirty:_=>!!this.changes.length || this.key !== before?.key || !this.isRemoved !== !(before?.isRemoved)
    });

    solid(this, "wrap", Wrap.create(this), false);

    this.reset();

  }

  getKey() { return this.key; }

  pull(col) {
    if (!col) { return; }

    const { table:{ rows }, vals, raws, before, wrap } = this;
    const { isVirtual, init, resetIf, formula, isReadonly } = col;

    if (vals.hasOwnProperty(col)) { return vals[col]; }

    let raw = raws[col];
    const self = _ => col.toVal(raw, wrap);

    if (formula) { raw = formula(wrap); } //formula
    else if (!rows.isLoading) {
      const bew = before ? before.raws[col] : null;
      if (raw !== bew && isReadonly && isReadonly(wrap, self)) { raw = bew; } //revive value
      if (!before ? (init && raw == null) : (resetIf && resetIf(wrap, self))) { raw = init ? init(wrap) : undefined; } //init or reset
    }

    const val = self();
    if (!isVirtual) { raws[col] = col.toRaw(vals[col] = val); }

    return val
  };

  push(vals, force = true) {
    const { table: { rows, cols }, raws, before } = this;

    const reals = cols.virtuals.getList(false);
    const changes = this.changes = [];
    this.vals = {};

    for (const col of reals) {
      const raw = col.fetch(vals);
      if (raw !== undefined) { raws[col] = col.toRaw(raw); }
      else if (force) { raws[col] = null; }
      if (rows.isLoading) { changes.push(col); }
    }

    if (!rows.isLoading) {
      for (const col of reals) {
        this.pull(col);
        if (before && raws[col] !== before.raws[col]) { changes.push(col); } //is isDirty column
      };
    }

    this.key = this.pull(cols.primary, false);

    return !!changes.length;
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
    this.raws = before ? { ...before.raws } : {};
    this.vals = before ? { ...before.vals } : {};
    this.changes = [];
    return true;
  }


}