import jet from "@randajan/jet-core";
import vault from "../../uni/helpers/vault.js";
import StepAsync from "./StepAsync.js";

const { solid, virtual } = jet.prop;

export class RowAsync extends jet.types.Plex {

    static is(row) { return row instanceof RowAsync; }

    static create(rows, iniStep) { return new RowAsync(rows, iniStep); };
  
    constructor(rows, iniStep) {
      const { db, table } = rows;
      const _p = {};
      const save = vault.get(rows.uid).save;

      const get = (col, opt={ missingError:true })=>_p.live.get(col, opt);
      const push = (vals, force, opt={ autoSave:true, resetOnError:true, saveError:true })=>{
        return _p.live.push(vals, force) && (opt.autoSave === false || this.save(opt));
      }

      super(get);

      solid.all(this, {
        db,
        table,
        rows,
        get,
        set:(vals, opt={ autoSave:true, resetOnError:true, saveError:true })=>push(vals, true, opt),
        update:(vals, opt={ autoSave:true, resetOnError:true, saveError:true })=>push(vals, false, opt),
        reset:_=>!this.isDirty || _p.live.reset(),
        remove:(opt={ autoSave:true, resetOnError:true, saveError:true })=>{
          return _p.live.remove() && (opt.autoSave === false || this.save(opt));
        },
        save:(opt={ resetOnError:true, saveError:true })=>{
          if (!this.isDirty) { return true; }
          _p.isSaving = true;
          try {
            save(this);
            _p.isSaving = false;
            _p.live = rows.nextStep(_p.saved = _p.live);
            return true;
          } catch (err) {
            _p.isSaving = false;
            if (opt.resetOnError !== false) { this.reset(); }
            if (opt.saveError !== false) { throw err; }
            console.warn(err);
            return false;
          }
        },

      }, false);

      virtual.all(this, {
        key:_=>(_p.isSaving ? _p.live.key : _p.saved?.key),
        label:_=>(_p.isSaving ? _p.live.key : _p.saved?.key),
        isRemoved:_=>(_p.isSaving ? _p.live.isRemoved : (!_p.saved || _p.saved.isRemoved)),
        isExist:_=>(_p.isSaving ? _p.live.isExist : !!_p.saved?.isExist),
        isDirty:_=>_p.live.isDirty,
        live:_=>_p.live.wrap,
        saved:_=>_p.saved?.wrap
      });

      _p.live = iniStep || rows.nextStep();
  
    }

    msg(text) {
      return this.rows.msg(text, this.key || this.raws);
    }
  
    toJSON() {
      return this.key
    }
  
    toString() {
      return this.key;
    }
  
  }
  
  
  export default RowAsync;