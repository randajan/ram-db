import jet from "@randajan/jet-core";
import StackControl from "./StackControl.js";



const rowStack = new StackControl();

export default class RowData {

  constructor(row, before, isLock) {
    this.uid = rowStack._nextIID = (rowStack._nextIID || 0) + 1;

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
      seeding:{get:_=>row.table.state === "seeding"}
    });

  }

  get(col, autoCreateRef=true) {
    const { uid, row, raws, before, keying, setting } = this;

    const { isVirtual, init, resetIf, formula, isReadonly } = col;

    const release = rowStack(uid, "get", col);
    if (!release.ok) { row.throwError(`get col '${col}' raised in loop `); }
   
    let raw = raws[col];    
    const self = _=>col.toVal(raw, keying ? undefined : row, autoCreateRef);

    if (formula && (isVirtual || setting)) { raw = formula(row, self); } //formula
    else if (setting && !keying) {
      const bew = before ? before.raws[col] : undefined;
      if (raw !== bew && isReadonly && isReadonly(row, self)) { raw = bew; } //revive value
      if (!before ? (init && raw == null) : (resetIf && resetIf(row, self))) { raw = init ? init(row) : undefined; } //init or reset
    } //default

    return release(self());
  };

  set(vals, update=false) {
    const { uid, row, raws, lock } = this;

    if (lock) { row.throwError("unexpected set/update"); }

    const release = rowStack("set");
    //if (!release.ok) { row.throwError(`set raised in loop `); }

    row.table.cols.map(col=>{
      if (col.isVirtual) { return; }
      const raw = col.fetch(vals);
      if (raw !== undefined) { raws[col] = raw === "" ? null : col.toRaw(raw); }
      else if (!update) { raws[col] = null; }
    });

    this.setChanges();

    this.key = rowStack(uid, "key")(this.get(row.table.cols.primary));

    return release(this.isDirty);
  }

  setChanges() {
    this.changes = {};
    this.isDirty = false;
    if (this.seeding) { return; } // no changes while seeding

    const { row, before, raws, changes } = this;
    row.table.cols.map(col=>{
      if (col.isVirtual) { return; }
      const val = this.get(col, false);
      raws[col] = col.toRaw(val);
      //is isDirty column
      const isDirtyCol = (!before || raws[col] !== this.before.raws[col]);
      if (isDirtyCol) { changes[col] = raws[col]; }
      this.isDirty = this.isDirty || isDirtyCol;
    });
  }

}