import jet from "@randajan/jet-core";
import vault from "../../uni/helpers/vault.js";
import StepSync from "./StepSync.js";

const { solid, virtual } = jet.prop;

export class RowSync extends jet.types.Plex {

    static is(row) { return row instanceof RowSync; }

    static create(rows, iniStep) { return new RowSync(rows, iniStep); };
  
    constructor(rows, iniStep) {
      const table = rows.table;
      const _p = {};
      const save = vault.get(rows.uid).save;

      const get = (col, opt={ autoRef:true, missingError:true })=>_p.live.get(col, opt);
      const push = (vals, force, opt={ autoSave:true, resetOnError:true, saveError:true })=>{
        return _p.live.push(vals, force) && (opt.autoSave === false || this.save(opt));
        //TODO:
        //1. list of dirty rows
        //2. cached row values
        //3. collecting refs
        //4. create async
      }
  
      super(get);

      solid.all(this, {
        table,
        rows,
        get,
        set:(vals, opt={ autoSave:true, resetOnError:true, saveError:true })=>push(vals, true, opt),
        update:(vals, opt={ autoSave:true, resetOnError:true, saveError:true })=>push(vals, false, opt),
        reset:_=>!this.isDirty || _p.live.reset(),
        save:(opt={ resetOnError:true, saveError:true })=>{
          if (!this.isDirty && rows.state !== "pending") { return true; }
          try {
            save(this);
            _p.live = rows.nextStep(_p.saved = _p.live);
          } catch (err) {
            if (opt.resetOnError !== false) { this.reset(); }
            if (opt.saveError !== false) { throw err; }
            return false;
          }
        }
      }, false);

      virtual.all(this, {
        key:_=>_p.saved?.key,
        label:_=>_p.saved?.label,
        isExist:_=>rows.exist(this.key),
        isDirty:_=>!!_p.live.changes.length,
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
  
  
  export default RowSync;