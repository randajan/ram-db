import jet from "@randajan/jet-core";

import RowData from "./RowData.js";


export default class Row extends jet.types.Plex {

    static is(row) { return row instanceof Row; }
  
    constructor(table, gid, onSave) {
      const _p = {
        removed:false,
        dirty:true,
        steps:[],
      }
  
      const seed = _=>new RowData(this, _p.steps[0], d=>d !== _p.steps[0]);
      const now = _=>_p.steps[0] = _p.steps[0] || seed();
  
      const save = (saveError=true, resetOnError=true)=>{
        if (_p.removed) { if (saveError) { this.throwError("was removed"); }; return this; }
        _p.dirty = !onSave(this, now().changes, saveError);
        if (_p.dirty && resetOnError && _p.steps.length > 1) { _p.steps.shift(); _p.dirty = false; }
        return this;
      }
  
      const remove = _=>{ if (this.exist && onSave(this)) { _p.dirty = false; _p.removed = true; } return this; } 
  
      const get = (col, missingError, step)=>{
        const c = table.cols(col, missingError); if (!c) { return; }
        return step ? step.get(c) : c.toVal(undefined, this, true);
      }
  
      const set = (update, vals, autoSave=true, saveError=true, resetOnError=true)=>{
        if (!Object.jet.is(vals, false)) { this.throwError("set/update expecting type 'object' as first argument"); }
        if (_p.removed) { if (saveError) { this.throwError("was removed"); }; return this; }
        
        if (!_p.dirty) { _p.steps.unshift(seed()); }
        _p.dirty = now().set(vals, update);
  
        if (autoSave) { save(saveError); }
  
        return autoSave ? save(saveError, resetOnError) : this;
      }
  
      super((col, missingError=true)=>get(col, missingError, now()));
  
      const enumerable = true;
      Object.defineProperties(this, {
        table:{value:table},
        gid:{enumerable, value:gid},
        id:{enumerable, get:_=>table.rows.gidToId(gid) },
        exist:{enumerable, get:_=>this.id != null },
  
        dirty:{ enumerable, get:_=>_p.dirty },
        removed:{ enumerable, get:_=>_p.removed},
        key:{ enumerable, get:_=>now().key },
        label:{ enumerable, get:_=>now().get(table.cols.label) },
        raws:{ enumerable, get:_=>[...now().raws] },
        vals:{ enumerable, get:_=>table.cols.map(col=>now().get(col))},
  
        before:{ value:(col, missingError=true)=>get(col, missingError, _p.steps[1]) },
        get:{ value:(col, missingError=true)=>get(col, missingError, now()) },
        
        set:{ value:(vals, autoSave=true, saveError=true)=>set(false, vals, autoSave, saveError) },
        update:{ value:(vals, autoSave=true, saveError=true)=>set(true, vals, autoSave, saveError) },
  
        remove:{ value:remove},
        save:{ value:save },
      });
  
    }
  
    throwError(msg) { this.table.rows.throwError(this.key || JSON.stringify(this.raws), msg);}
  
    toJSON() {
      return this.key
    }
  
    toString() {
      return this.key;
    }
  
  }
  
  