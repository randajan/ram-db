import jet from "@randajan/jet-core";
import StackControl from "./StackControl.js";



const rowStack = new StackControl();

export default class RowData {

  constructor(row, before, isLock) {
    this.iid = rowStack._nextIID  = (rowStack._nextIID || 0) + 1;

    this.row = row;
    this.before = before;
    this.key = before ? before.key : undefined;
    this.raws = before ? [...before.raws] : [];

    Object.defineProperties(this, {
      lock:{get:_=>isLock(this)},
      keying:{get:_=>rowStack.has(this.iid, "key")},
      setting:{get:_=>rowStack.has("set")},
      seeding:{get:_=>row.table.state === "seeding"}
    })

  }

  setChanges(cid) {
    const dirty = (!this.before || this.raws[cid] !== this.before.raws[cid]);
    if (dirty) { this.changes[cid] = this.raws[cid]; }
    return dirty;
  }

  get(col, autoCreateRef=true) {
    const { iid, row, raws, before, keying, setting } = this;

    const { id, name, isVirtual, init, resetIf, formula, isReadonly } = col;

    const release = rowStack(iid, "get", name);
    if (!release.ok) { row.throwError(`get col '${name}' raised in loop `); }
   
    let raw = raws[id];    
    const self = _=>col.toVal(raw, keying ? undefined : row, autoCreateRef);

    if (formula && (isVirtual || setting)) { raw = formula(row, self); } //formula
    else if (setting && !keying) {
      const bew = before ? before.raws[id] : undefined;
      if (raw !== bew && isReadonly && isReadonly(row, self)) { raw = bew; } //revive value
      if (!before ? (init && raw == null) : (resetIf && resetIf(row, self))) { raw = init ? init(row) : undefined; } //init or reset
    } //default

    return release(self());
  };

  set(vals, update=false) {
    const { iid, row, raws, lock, seeding } = this;

    if (lock) { row.throwError("unexpected set/update"); }

    const release = rowStack("set");
    //if (!release.ok) { row.throwError(`set raised in loop `); }

    this.changes = [];
    let dirty = false;

    const cr = row.table.cols.raws;
    const praws = [];

    for (let c of cr) {
      praws[c.id] = raws[c.id];
      const raw = c.fetch(vals);
      if (raw !== undefined) { raws[c.id] = raw === "" ? null : c.toRaw(raw); }
      else if (!update) { raws[c.id] = null; }
      //if (!seeding) { dirty = this.setChanges(c.id) || dirty; } should be useless
    }

    if (!seeding) { for (let c of cr) {
      const val = this.get(c, false);
      raws[c.id] = c.toRaw(val);
      dirty = this.setChanges(c.id) || dirty;
    }}

    this.key = rowStack(iid, "key")(this.get(row.table.cols.primary));

    return release(dirty);
  }
  

}