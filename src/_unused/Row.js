import jet from "@randajan/jet-core";
import { addTrait } from "../helpers.js";

import Step from "./Step.js";

const createSchema = _=>({
  current:{
    key:"xxx",
    raws:{},
    vals:{},
    changes:[],
    dirty:false
  },
  before:{
    key:"xxx",
    raws:{},
    vals:{},
    changes:[],
    dirty:false
  }
})


export default class Row extends jet.types.Plex {

    static is(row) { return row instanceof Row; }
  
    constructor(rows, key, getScheme, onChange) {
      const _p = {
        isSetting:false,
        isKeying:false,
        now:{
          key,
          raws:{},
          vals:{},
          changes:[],
          dirty:false
        }
      };

      Object.defineProperty(_p, "isSeeding", {get:_=>rows.state !== "ready"});

      const onChangeHandler = async (saveError, changes, resetOnError=false)=>{
        try {
          await onChange(this, step().key, changes);
          _p.changes = [];
          return true;
        } catch (err) {
          if (resetOnError) { reset(); }
          if (saveError) { this.throwError(err); }
          return false;
        }

      }
  
      const save = (saveError=true, resetOnError=true)=>onChangeHandler(saveError, step().changes, resetOnError);
  
      const get = async (actual, col, missingError=true)=>{
        col = this.table.cols(col, missingError); if (!col) { return; }

        const { isSetting, isKeying, isSeeding } = _p;
        const { isVirtual, init, resetIf, formula, isReadonly } = col;

        const now = getScheme(_p.now.key, false);
    
        let raw = actual ? _p.raws[col] : now ? now.raws[col] : undefined
        const self = _=>col.toVal(raw, isKeying ? undefined : this);
    
        if (formula && (isVirtual || isSetting)) { raw = await formula(this, self); } //formula known BUG: formula for before will be computed from actual values
        else if (actual && isSetting && !isKeying) {
          const bew = now ? now.raws[col] : undefined
          if (!isSeeding && raw !== bew && isReadonly && isReadonly(this, self)) { raw = bew; } //revive value
          if (!now ? (init && raw == null) : (resetIf && await resetIf(this, self))) { raw = init ? await init(this) : undefined; } //init or reset
        } //default
    
        return self();
      }

      const reset = _=>{
        if (!this.isDirty) { return true; }

        _p.changes = [];
        return true
      }

      const remove = async (saveError=true)=>{
        if (!this.isExist || await onChangeHandler(saveError)) { return _p.isRemoved = true; }
        return true;
      }
  
      super((col, missingError=true)=>get(true, col, missingError));
  
      const enumerable = true;
      Object.defineProperties(this, {
        table:{value:rows.table},
        rows:{value:rows},

        isExist:{enumerable, get:_=>rows.exist(_p.now.key) },
        isDirty:{ enumerable, get:_=>this.isExist && getScheme(_p.now.key).dirty },

        key:{ enumerable, get:_=>_p.now.key },
        
        raws:{ enumerable, get:_=>({..._p.raws}) },

        //asyncs property
        vals:{ enumerable, get:_=>this.table.cols.map(col=>get(true, col))},
        label:{ enumerable, get:async _=>get(true, this.table.cols.label) },
  
        before:{ value:(col, missingError=true)=>get(false, col, missingError) },
        get:{ value:(col, missingError=true)=>get(true, col, missingError) },
        
        set:{ value:(vals, autoSave=true, saveError=true)=>set(false, vals, autoSave, saveError) },
        update:{ value:(vals, autoSave=true, saveError=true)=>set(true, vals, autoSave, saveError) },
  
        remove:{ value:remove},
        save:{ value:save },
        reset:{ value:reset }
      });

      addTrait(this, "id", _=>_p.id, id=>{ _p.id = id; return this; });
  
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
  
  