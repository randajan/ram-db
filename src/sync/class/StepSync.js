import jet from "@randajan/jet-core";
import WrapSync from "./WrapSync";
import RowSync from "./RowSync";

const { solid, virtual, cached } = jet.prop;

export class StepSync {

    static is(any) { return any instanceof StepSync; }

    static create(row, before) { return new StepSync(row, before); }
  
    constructor(table, before) {

      solid.all(this, {
        db:table.db,
        table,
        before,
      }, false);

      virtual.all(this, {
        key:_=>this.pull(table.cols.primary, false),
        label:_=>this.pull(table.cols.label, false),
        isExist:_=>!this.isRemoved && table.rows.exist(this.key),
        isDirty:_=>!!this.changes.length || ( !this.isExist !== !before?.isExist ),
      });

      solid(this, "wrap", WrapSync.create(this), false);

      this.reset();
  
    }

    pull(col) {
      if (!col) { return; }
      
      const { table, vals, raws, before, wrap } = this;
      const { isVirtual, init, resetIf, formula, isReadonly } = col;

      if (vals.hasOwnProperty(col)) { return vals[col]; } 
     
      let raw = raws[col];
      const self = _=>col.toVal(raw, wrap);

      if (formula) { raw = formula(wrap, self); } //formula
      else if (table.rows.state !== "pending") {
        const bew = before ? before.raws[col] : null;
        if (raw !== bew && isReadonly && isReadonly(wrap, self)) { raw = bew; } //revive value
        if (!before ? (init && raw == null) : (resetIf && resetIf(wrap, self))) { raw = init ? init(wrap) : undefined; } //init or reset
      }

      const val = self();
      if (isVirtual) { return val; }
      raws[col] = col.toRaw(vals[col] = val);
  
      return val
    };

    push(vals, force=true) {
      const { table:{ cols:{ reals } }, raws, before } = this;

      const changes = this.changes = [];
      this.vals = {};

      reals.map(col=>{ //for each non virtual
        const raw = col.fetch(vals);
        if (raw !== undefined) { raws[col] = raw === "" ? null : col.toRaw(raw); }
        else if (force) { raws[col] = null; }
        if (!before) { changes.push(col); }
      });

      if (before) {
        reals.map(col=>{ //for each non virtual
          this.pull(col);
          if (raws[col] !== before.raws[col]) { changes.push(col); } //is isDirty column
        });
      }

      return !!changes.length;
    }

    get(col, opt={ throwError:true }) {
      const { table:{cols} } = this;
      if (!Array.isArray(col)) { return this.pull(cols.get(col, opt.throwError !== false)); }
      let row;
      for (const c of col) {
        if (c === col[0]) { row = this.pull(cols.get(c, opt.throwError !== false)); }
        else if (RowSync.is(row)) { row = row.get(c, opt); }
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
  
  
  export default StepSync;