import jet from "@randajan/jet-core";
import WrapSync from "./WrapSync";

export class StepSync {

    static is(any) { return any instanceof StepSync; }

    static create(row, before) { return new StepSync(row, before); }
  
    constructor(table, before) {
      this.table = table;
      this.before = before;

      this.raws = before ? {...before.raws} : {};
      this.changes = [];
      this.key = undefined;

      this.isSetting = false;
      this.isKeying = false;
      
      this.wrap = WrapSync.create(this);

      this.reset();
  
    }

    push(vals, force=true) {
      const { table:{ cols, rows }, raws, before } = this;
      const isSeeding = rows.state === "pending";

      this.isSetting = true;
      const changes = this.changes = [];

      cols.forEachReal(col=>{ //for each non virtual
        const raw = col.fetch(vals);
        if (raw !== undefined) { raws[col] = raw === "" ? null : col.toRaw(raw); }
        else if (force) { raws[col] = null; }
      });

      if (!isSeeding) {
        cols.forEachReal(col=>{ //for each non virtual
          const val = this.pull(col, false);
          raws[col] = col.toRaw(val);
          if (!before || raws[col] !== before.raws[col]) { changes.push(col); } //is isDirty column
        });
      }

      this.isKeying = true;
      this.key = this.pull(cols.primary, false);
      this.isSetting = this.isKeying = false;

      return !!changes.length || isSeeding;
    }

    pull(col, autoRef=true) {
      const { table:{ rows }, raws, before, wrap, isSetting, isKeying } = this;
      const { isVirtual, init, resetIf, formula, isReadonly } = col;
      const isSeeding = rows.state === "pending";
      const withTraits = isSetting && !isSeeding;
     
      let raw = raws[col];
      const self = _=>col.toVal(raw, (autoRef && !isKeying) ? this : undefined);
  
      if (formula && (isVirtual || withTraits)) { raw = formula(wrap, self); } //formula
      else if (!isKeying && withTraits) {
        const bew = before ? before.raws[col] : null;
        if (raw !== bew && isReadonly && isReadonly(wrap, self)) { raw = bew; } //revive value
        if (!before ? (init && raw == null) : (resetIf && resetIf(wrap, self))) { raw = init ? init(wrap) : undefined; } //init or reset
      }
  
      return self();
    };

    get(col, opt={ autoRef:true, missingError:true }) {
      return this.pull(this.table.cols.get(col, opt.missingError !== false), opt.autoRef !== false);
    }

    reset() {
      const { before } = this;
      this.key = before?.key;
      this.raws = before ? { ...before.raws } : {};
      this.changes = [];
      return true;
    }
     
  
  }
  
  
  export default StepSync;