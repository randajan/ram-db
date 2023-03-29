import jet from "@randajan/jet-core";
import vault from "../../uni/helpers/vault.js";

const { solid, virtual } = jet.prop;

export class RowAsync extends jet.types.Plex {

    static is(row) { return row instanceof RowAsync; }

    static create(rows, iniStep) { return new RowAsync(rows, iniStep); };
  
    constructor(rows, iniStep) {
      const { db, table } = rows;
      const _p = {};
      const save = vault.get(rows.uid).save;

      const get = async (col, opt={ missingError:true })=>_p.live.get(col, opt);
      const push = async (vals, force, opt={ autoSave:true, resetOnError:true, saveError:true })=>{
        return (await _p.live.push(vals, force)) && (opt.autoSave === false || await this.save(opt));
      }

      super(get);

      solid.all(this, {
        db,
        table,
        rows,
        get,
        set:async (vals, opt={ autoSave:true, resetOnError:true, saveError:true })=>await push(vals, true, opt),
        update:async (vals, opt={ autoSave:true, resetOnError:true, saveError:true })=>await push(vals, false, opt),
        reset:async _=>!(await this.isDirty) || _p.live.reset(),
        remove:async (opt={ autoSave:true, resetOnError:true, saveError:true })=>{
          return _p.live.remove() && (opt.autoSave === false || await this.save(opt));
        },
        save:async (opt={ resetOnError:true, saveError:true })=>{
          if (!(await this.isDirty)) { return true; }
          
          try {
            await save(this);
            _p.live = rows.nextStep(_p.saved = _p.live);
            return true;
          } catch (err) {
            if (opt.resetOnError !== false) { await this.reset(); }
            if (opt.saveError !== false) { throw err; }
            console.warn(err);
            return false;
          }
        },

      }, false);

      virtual.all(this, {
        key:async _=>_p.saved?.key,
        label:async _=>_p.saved?.label,
        isRemoved:_=>!_p.saved || _p.saved.isRemoved,
        isExist:async _=>!!(await _p.saved?.isExist),
        isDirty:async _=>_p.live.isDirty,
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