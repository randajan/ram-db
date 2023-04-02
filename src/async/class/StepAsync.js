import jet from "@randajan/jet-core";
import { WrapAsync } from "./WrapAsync";

const { solid, virtual } = jet.prop;

export class StepAsync {

  static is(any) { return any instanceof StepAsync; }

  static create(row, before) { return new StepAsync(row, before); }

  constructor(table, before) {

    solid.all(this, {
      db: table.db,
      table,
      before,
    }, false);

    virtual.all(this, {
      key:async _=>this.pull(await table.cols.primary, false),
      label:async _=>this.pull(await table.cols.label, false),
      isExist:async _=>!this.isRemoved && await table.rows.exist(await this.key),
      isDirty:async _=>!!this.changes.length || ( !(await this.isExist) !== !(await before?.isExist) ),
    });

    solid(this, "wrap", WrapAsync.create(this), false);

    this.reset();

  }

  async getKey() { return this.key; }

  async pull(col) {
    if (!col) { return; }

    const { table, vals, raws, before, wrap } = this;
    const { isVirtual, init, resetIf, formula, isReadonly } = col;

    if (vals.hasOwnProperty(col)) { return vals[col]; }

    let raw = raws[col];
    const self = _ => col.toVal(raw, wrap);

    if (formula) { raw = await formula(wrap, self); } //formula
    else if (table.rows.state !== "pending") {
      const bew = before ? before.raws[col] : null;
      if (raw !== bew && isReadonly && await isReadonly(wrap, self)) { raw = bew; } //revive value
      if (!before ? (init && raw == null) : (resetIf && await resetIf(wrap, self))) { raw = init ? await init(wrap) : undefined; } //init or reset
    }

    const val = await self();
    if (isVirtual) { return val; }
    raws[col] = await col.toRaw(vals[col] = val);

    return val
  };

  async push(vals, force = true) {
    const { table: { cols }, raws, before } = this;

    const reals = await cols.virtuals.getList(false);
    const changes = this.changes = [];
    this.vals = {};

    for (const col of reals) {
      const raw = col.fetch(vals);
      if (raw !== undefined) { raws[col] = raw === "" ? null : await col.toRaw(raw); }
      else if (force) { raws[col] = null; }
      if (!before) { changes.push(col); }
    }

    if (before) {
      for (const col of reals) {
        await this.pull(col);
        if (raws[col] !== before.raws[col]) { changes.push(col); } //is isDirty column
      };
    }

    return !!changes.length;
  }

  async get(col, opt = { throwError: true }) {
    const { table: { cols } } = this;
    if (!Array.isArray(col)) { return this.pull(await cols.get(col, opt.throwError !== false)); }
    let row;
    for (const c of col) {
      if (c === col[0]) { row = await this.pull(await cols.get(c, opt.throwError !== false)); }
      else if (row.get) { row = await row.get(c, opt); }
      else { break; }
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