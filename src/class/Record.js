import jet from "@randajan/jet-core";
import StackControl from "./parts/StackControl.js";

export default class Record extends jet.types.Plex {

  static is(rec) { return rec instanceof Record; }
  static validate(rec, pid) { return Record.is(rec) && rec.pid === pid ? rec : null; }

  constructor(rows, pid, isSeed, before, getAfter) {
    const table = rows.table;
    const cols = table.cols;

    const _p = {
      key:null,
      before,
      inputs:{},
      raws:{},
      changes:[],
      isSetting:false,
      isKeying:false,
      isSaved:false,
    };

    const get = async (col, missingError=true)=>{
      col = cols(col, missingError); if (!col) { return; }

      const { isSetting, isKeying } = _p;
      
      const { isVirtual, init, resetIf, formula, isReadonly } = col;
  
      let raw = _p.raws[col];
      const self = _=>col.toVal(raw, isKeying ? undefined : this);
  
      if (formula && (isVirtual || isSetting)) { raw = await formula(this, self); }
      else if (isSetting && !isKeying) {
        const bew = this.before.raws[col];
        if (!this.isSeeding && raw !== bew && isReadonly && await isReadonly(this, self)) { raw = bew; } //revive value
        if ((init && raw == null) || (resetIf && await resetIf(this, self))) { raw = init ? await init(this) : null; } //init or reset
      } //default
  
      return self();
    }

    const set = async (update, values, autoSave=true, saveError=true, resetOnError=true)=>{
      if (!Object.jet.is(values, false)) { throw Error(this.msg("set/update expecting type 'object' as first argument")); }     
      if (_p.isSetting) { throw Error(this.msg("set is unavailable because currently setting")); }
      if (this.after) { return this.after.set(update, values, autoSave, saveError, resetOnError); }

      _p.isSetting = true;

      const colsList = cols.list;
      const { inputs, raws } = _p;
      const changes = _p.changes = [];
      
      for (const col of colsList) {
        if (col.isVirtual) { continue; }
        const input = col.fetch(values);
        if (input !== undefined) { raws[col] = col.toRaw(inputs[col] = input); }
        else if (!update) {
          delete inputs[col];
          raws[col] = null;
        }
      }
  
      if (!this.isSeeding) {
        const bews = this.before.raws;
        for (const col of colsList) {
          if (col.isVirtual) { continue; }
          raws[col] = col.toRaw(await get(col, false));
          if (bews[col] !== raws[col]) { changes.push(col); }
        }
      }
  
      _p.isKeying = true;
      _p.key = await get(cols.primary);
      _p.isSetting = _p.isKeying = false;
      
      //if (autoSave) { await save(saveError, resetOnError); }
  
      return true;
    }


    super((col, missingError=true)=>get(col, missingError));
  
    const enumerable = true;
    Object.defineProperties(this, {
      table:{value:table},
      rows:{value:rows},

      pid:{ enumerable, value:pid },
      key:{ enumerable, get:_=>_p.key },

      after:{ get:_=>getAfter ? Record.validate(getAfter(), pid) : null },
      before:{ get:_=>_p.before || (_p.before = new Record(rows, pid, false, null, _=>this)) },

      isExist:{enumerable, get:_=>rows.exist(_p.key) },
      isSaved:{ enumerable, get:_=>this.isExist && _p.isSaved },
      isSeeding:{ enumerable, get:_=>isSeed && rows.state !== "ready" },

      inputs:{ enumerable, get:_=>({..._p.inputs}) },
      raws:{ enumerable, get:_=>({..._p.raws}) },
      changes:{ enumerable, get:_=>([...changes]) },

      //asyncs property
      vals:{ enumerable, get:_=>cols.map(async col=>await get(col, false))},
      label:{ enumerable, get:async _=>get(cols.label) },

      get:{ value:(col, missingError=true)=>get(col, missingError) },
      
      set:{ value:(vals, autoSave=true, saveError=true)=>set(false, vals, autoSave, saveError) },
      update:{ value:(vals, autoSave=true, saveError=true)=>set(true, vals, autoSave, saveError) },

      //remove:{ value:remove},
      //save:{ value:save },
      //reset:{ value:reset }
    });

  }
  
  msg(text) {
    return this.rows.msg(text, this.key || this.pid);
  }

}