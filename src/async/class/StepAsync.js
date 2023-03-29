import jet from "@randajan/jet-core";
import WrapAsync from "./WrapAsync";

const { solid, virtual, cached } = jet.prop;

export class StepAsync {

    static is(any) { return any instanceof StepAsync; }

    static create(row, before) { return new StepAsync(row, before); }
  
    constructor(table, before) {

      solid.all(this, {
        table,
        before,
      }, false);

      virtual.all(this, {
        key:_=>this.pull(table.cols.primary, false),
        label:_=>this.pull(table.cols.label, false),
        isExist:_=>!this.isRemoved && table.rows.exist(this.key),
        isDirty:_=>!!this.changes.length || ( !this.isExist !== !before?.isExist ),
      });

      solid(this, "wrap", WrapAsync.create(this), false);

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
      const { table:{ cols }, raws, before } = this;

      const changes = this.changes = [];
      this.vals = {};

      const reals = cols.getChop("reals");

      reals.map(false, col=>{ //for each non virtual
        const raw = col.fetch(vals);
        if (raw !== undefined) { raws[col] = raw === "" ? null : col.toRaw(raw); }
        else if (force) { raws[col] = null; }
      });

      reals.map(false, col=>{ //for each non virtual
        this.pull(col);
        if (!before || raws[col] !== before.raws[col]) { changes.push(col); } //is isDirty column
      });

      return !!changes.length;
    }

    get(col, opt={ missingError:true }) {
      const { table:{cols} } = this;
      if (!Array.isArray(col)) { return this.pull(cols.get(col, opt.missingError !== false)); }
      let row;
      for (const c of col) {
        if (c === col[0]) { row = this.pull(cols.get(c, opt.missingError !== false)); }
        else if (row) { row = row.get(c, opt); }
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
  
  
  export default StepAsync;