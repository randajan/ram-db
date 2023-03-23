import jet from "@randajan/jet-core";
import vault from "../../uni/helpers/vault.js";

const { solid, virtual } = jet.prop;

export class StepSync extends jet.types.Plex {

    static is(row) { return row instanceof StepSync; }
  
    constructor(row) {
      const rows = row.rows, table = rows.table, cols = table.cols;
      const [uid, _p] = vault.set({
        raws:{},
        updates:{},
        changes:[]
      });

      _p.setDirty = col=>{
        _p.updates[col] = _p.now.raws[col];
        _p.changes.push(col);
      }

      _p.resetDirty = (ok)=>{
        _p.updates = {};
        _p.changes = [];
        if (ok == null) { return true; }
        if (!ok && !_p.saved) { return false; }
        const from = _p[ok ? "now" : "saved"];
        _p[ok ? "saved" : "now"] = { key:from.key, raws:{...from.raws} };
        return true;
      }

      _p.get = (col, autoRef=true)=>{
        const { now, saved } = _p;
        const { isSetting, isKeying, isSeeding } = this;
        const { isVirtual, init, resetIf, formula, isReadonly } = col;
        const withTraits = isSetting && !isSeeding;
       
        let raw = now.raws[col];
        const self = _=>col.toVal(raw, (autoRef && !isKeying) ? this : undefined);
    
        if (formula && (isVirtual || withTraits)) { raw = formula(this, self); } //formula
        else if (!isKeying && withTraits) {
          const bew = saved ? saved.raws[col] : undefined;
          if (raw !== bew && isReadonly && isReadonly(this, self)) { raw = bew; } //revive value
          if (!saved ? (init && raw == null) : (resetIf && resetIf(this, self))) { raw = init ? init(this) : undefined; } //init or reset
        }
    
        return self();
      };
  
      super((col, opt)=>this.get(col, opt));

      solid.all(this, {
        uid,
        table
      }, false);

      virtual.all(this, {
        key:_=>_p.saved?.key,
        isExist:_=>rows.exist(this.key),
        isDirty:_=>!!_p.changes.length,
        isSetting:_=>_p.isSetting,
        isKeying:_=>_p.isKeying,
        isSeeding:_=>rows.state !== "ready",
        raws:_=>({..._p.now.raws}), //virtual interface?
        vals:_=>cols.map(col=> _p.get(col, true)), //virtual interface?
        label:_=>_p.get(cols.label, true),
        changes:_=>([..._p.changes]),
        updates:_=>({..._p.updates})
      });
  
    }

    get(col, opt={ autoRef:true, missingError:true }) {
      return vault.get(this.uid).get(this.table.cols.get(col, opt.missingError !== false), opt.autoRef !== false);
    }

    setOrUpdate(vals, opt={ set:true, autoSave:true, resetOnError:true, saveError:true }) {
      const { table:{cols}, isSeeding, isDirty } = this;
      const _p = vault.get(this.uid);
      const { now, saved } = _p;

      _p.isSetting = true;
      _p.resetDirty();

      cols.forEachReal(col=>{ //for each non virtual
        let raw = col.fetch(vals);
        if (raw !== undefined) { raw = raw === "" ? null : col.toRaw(raw); }
        else if (opt.set) { raw = null; }
        else if (isDirty) { raw = now.raws[col]; }
        else if (saved) { raw = saved.raws[col]; }
        now.raws[col] = raw;
        if (isSeeding) { _p.setDirty(col); }
      });

      if (!isSeeding) {
        cols.forEachReal(col=>{ //for each non virtual
          const val = _p.get(col, false);
          now.raws[col] = col.toRaw(val);
          if (!saved || now.raws[col] !== saved.raws[col]) { _p.setDirty(col); } //is isDirty column
        });
      }

      _p.isKeying = true;
      now.key = _p.get(cols.primary, false);
      _p.isSetting = _p.isKeying = false;

      return opt.autoSave !== false ? this.save(opt) : !!_p.changes.length;
    }

    set(vals, opt={ autoSave:true, resetOnError:true, saveError:true }) {
      opt.set = true;
      return this.setOrUpdate(vals, opt);
    }
    update(vals, opt={ autoSave:true, resetOnError:true, saveError:true }) {
      opt.set = false;
      return this.setOrUpdate(vals, opt);
    }

    reset() {
      const _p = vault.get(this.uid);
      return !_p.changes.length || _p.resetDirty(false);
    }

    save(opt={ resetOnError:true, saveError:true }) {
      const _p = vault.get(this.uid);
      if (!_p.changes.length) { return true; }
      try {
        _p.save(this, _p.now.key);
        return _p.resetDirty(true);
      } catch (err) {
        if (opt.resetOnError !== false) { this.reset(); }
        if (opt.saveError !== false) { throw err; }
        return false;
      }
    }
  
    toJSON() {
      return this.key
    }
  
    toString() {
      return this.key;
    }
  
  }
  
  
  export default RowSync;