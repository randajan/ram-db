import jet from "@randajan/jet-core";
import { addTrait } from "../helpers.js";

import RowData from "./RowData.js";


export default class Row extends jet.types.Plex {

    static is(row) { return row instanceof Row; }
  
    constructor(table, onChange) {
      const _p = {
        state:"seed",
        isSeed:table.state === "seeding",
        isDirty:false,
        isRemoved:false,
        steps:[],
      }

      const step = _=>_p.steps[0] || (_p.steps[0] = seed());
      const seed = _=>new RowData(this, _p.steps[0], d=>d !== step());

      const onChangeHandler = (saveError, changes, onError)=>{
        try {
          onChange(this, step().key, changes);
          _p.isDirty = false;
          return true;
        } catch (err) {
          if (onError) { onError(); }
          if (saveError) { this.throwError(err); }
          return false;
        }

      }


      const reset = _=>{
        if (_p.steps.length < 2) { return this; }
        if (_p.isDirty) { _p.steps.shift(); _p.isDirty = false; }
        return this;
      }
  
      const save = (saveError=true, resetOnError=true)=>onChangeHandler(saveError, step().changes, resetOnError ? reset : null);

      const remove = (saveError=true)=>{
        if (this.isRemoved) { if (saveError) { this.throwError("was removed"); }; return false; }
        if (!this.isReal || onChangeHandler(saveError)) { return _p.isRemoved = true; }
        return true;
      } 
  
      const get = (col, missingError, step)=>{
        const c = table.cols(col, missingError); if (!c) { return; }
        return step ? step.get(c) : c.toVal(undefined, this, true);
      }
  
      const set = (update, vals, autoSave=true, saveError=true, resetOnError=true)=>{
        if (!Object.jet.is(vals, false)) { this.throwError("set/update expecting type 'object' as first argument"); }
        if (this.isRemoved) { if (saveError) { this.throwError("was removed"); }; return this; }
        
        if (!_p.isDirty) { //new step if not isDirty
          _p.steps.unshift(seed());
          //limit steps count
        } 
        _p.isDirty = step().set(vals, update);

        if (autoSave) { save(saveError, resetOnError); }
  
        return this;
      }
  
      super((col, missingError=true)=>get(col, missingError, step()));
  
      const enumerable = true;
      Object.defineProperties(this, {
        table:{value:table},

        isSeed:{enumerable, get:_=>_p.isSeed},
        isDirty:{ enumerable, get:_=>_p.isDirty },
        isRemoved:{ enumerable, get:_=>_p.isRemoved},
        isReal:{enumerable, get:_=>table.rows.exist(this.key) },
        key:{ enumerable, get:_=>(_p.isDirty && _p.steps.length > 1) ? _p.steps[1].key : step().key },
        label:{ enumerable, get:_=>step().get(table.cols.label) },
        raws:{ enumerable, get:_=>({...step().raws}) },
        vals:{ enumerable, get:_=>table.cols.map(col=>step().get(col))},
  
        before:{ value:(col, missingError=true)=>get(col, missingError, _p.steps[1]) },
        get:{ value:(col, missingError=true)=>get(col, missingError, step()) },
        
        set:{ value:(vals, autoSave=true, saveError=true)=>set(false, vals, autoSave, saveError) },
        update:{ value:(vals, autoSave=true, saveError=true)=>set(true, vals, autoSave, saveError) },
  
        remove:{ value:remove},
        save:{ value:save },
        reset:{ value:reset }
      });

      addTrait(this, "id", _=>_p.id, id=>{ _p.id = id; return this; });
  
    }
  
    throwError(msg) {
      this.table.rows.throwError(msg, this.key || this.raws);
    }
  
    toJSON() {
      return this.key
    }
  
    toString() {
      return this.key;
    }
  
  }
  
  