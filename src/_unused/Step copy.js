import jet from "@randajan/jet-core";
import StackControl from "./StackControl.js";


let _nextUID = 0;

const rowStack = new StackControl();


export default class Step {

  constructor(row, before, isLock) {
    this.uid = _nextUID ++;

    this.row = row;
    this.before = before;
    this.key = before ? before.key : undefined;
    this.raws = before ? {...before.raws} : {};
    this.isDirty = false;
    this.changes = {};


    Object.defineProperties(this, {
      lock:{get:_=>isLock(this)},
      keying:{get:_=>rowStack.has(this.uid, "key")},
      setting:{get:_=>rowStack.has("set")},
    });

  }

  async get(col, autoCreateRef=true) {
    const { uid, row, raws, before, keying, setting } = this;

    const { isVirtual, init, resetIf, formula, isReadonly } = col;

    const release = rowStack(uid, "get", col);
    if (!release.ok) { row.throwError(`get col '${col}' raised in loop `); }
   
    let raw = raws[col];    
    const self = _=>col.toVal(raw, keying ? undefined : row, autoCreateRef);

    if (formula && (isVirtual || setting)) { raw = await formula(row, self); } //formula
    else if (setting && !keying) {
      const bew = before ? before.raws[col] : undefined;
      if (row.rows.state !== "pending" && raw !== bew && isReadonly && isReadonly(row, self)) { raw = bew; } //revive value
      if (!before ? (init && raw == null) : (resetIf && await resetIf(row, self))) { raw = init ? await init(row) : undefined; } //init or reset
    } //default

    return release(await self());
  };

  async set(vals, update=false) {
    const { uid, row, raws, lock } = this;

    if (lock) { row.throwError("unexpected set/update"); }

    const release = rowStack("set");
    //if (!release.ok) { row.throwError(`set raised in loop `); }

    await row.table.cols.forEach(col=>{
      if (col.isVirtual) { return; }
      const raw = col.fetch(vals);
      if (raw !== undefined) { raws[col] = raw === "" ? null : col.toRaw(raw); }
      else if (!update) { raws[col] = null; }
    });

    await this.setChanges();

    this.key = rowStack(uid, "key")(await this.get(await row.table.cols.primary));

    return release(this.isDirty);
  }

  async setChanges() {
    this.changes = {};
    this.isDirty = false;
    if (this.row.rows.state !== "pending") { return; } // no changes while rows is pending

    const { row, before, raws, changes } = this;
    await row.table.cols.forEach(async col=>{
      if (col.isVirtual) { return; }
      const val = await this.get(col, false);
      raws[col] = col.toRaw(val);
      //is isDirty column
      const isDirtyCol = (!before || raws[col] !== this.before.raws[col]);
      if (isDirtyCol) { changes[col] = raws[col]; }
      this.isDirty = this.isDirty || isDirtyCol;
    });
  }

}