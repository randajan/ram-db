import jet from "@randajan/jet-core";
import WrapSync from "./WrapSync";

const { solid, virtual } = jet.prop;

export class StepSync {

    static is(any) { return any instanceof StepSync; }

    static create(row, before) { return new StepSync(row, before); }
  
    constructor(table, before) {
      this.table = table;
      this.before = before;

      this.raws = before ? {...before.raws} : {};
      this.changes = [];
      this.vals = {};

      this.isSetting = false;

      virtual.all(this, {
        isSeeding:_=>table.rows.state === "pending",
        key:_=>this.pull(table.cols.primary, false),
        label:_=>this.pull(table.cols.label, false)
      })
      
      this.wrap = WrapSync.create(this);

      this.reset();
  
    }

    push(vals, force=true) {
      const { table:{ cols }, raws, before, isSeeding } = this;

      const changes = this.changes = [];
      this.vals = {};

      cols.forEachReal(col=>{ //for each non virtual
        const raw = col.fetch(vals);
        if (raw !== undefined) { raws[col] = raw === "" ? null : col.toRaw(raw); }
        else if (force) { raws[col] = null; }
      });

      if (!isSeeding) {
        cols.forEachReal(col=>{ //for each non virtual
          this.pull(col, false);
          if (!before || raws[col] !== before.raws[col]) { changes.push(col); } //is isDirty column
        });
      }

      return !!changes.length || isSeeding;
    }

    pull(col, autoRef=true) {
      const { vals, raws, before, wrap, isSeeding } = this;
      const { isVirtual, init, resetIf, formula, isReadonly } = col;

      if (vals.hasOwnProperty(col)) { return vals[col]; } 
     
      let raw = raws[col];
      const self = _=>col.toVal(raw, autoRef ? this : undefined);

      if (formula) { raw = formula(wrap, self); } //formula
      else if (isSeeding) {
        const bew = before ? before.raws[col] : null;
        if (raw !== bew && isReadonly && isReadonly(wrap, self)) { raw = bew; } //revive value
        if (!before ? (init && raw == null) : (resetIf && resetIf(wrap, self))) { raw = init ? init(wrap) : undefined; } //init or reset
      }

      if (isVirtual) { return self(); }

      raws[col] = col.toRaw(vals[col] = self());
  
      return vals[col];
    };

    get(col, opt={ autoRef:true, missingError:true }) {
      return this.pull(this.table.cols.get(col, opt.missingError !== false), opt.autoRef !== false);
    }

    reset() {
      const { before } = this;
      this.raws = before ? { ...before.raws } : {};
      this.changes = [];
      return true;
    }
     
  
  }
  
  
  export default StepSync;