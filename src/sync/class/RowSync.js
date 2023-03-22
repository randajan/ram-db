import jet from "@randajan/jet-core";
import vault from "../../uni/helpers/vault.js";
import { addTrait } from "../helpers.js";

const { solid, virtual } = jet.prop;

export default class Row extends jet.types.Plex {

    static is(row) { return row instanceof Row; }
  
    constructor(rows, rowsSet) {
      const table = rows.table, cols = table.cols;

      const [uid, _p] = vault.set({
        updates:{},
        changes:[],
        now:{ key:"", raws:{} },
        saved:null //saved is saved now
      });

      //const save = (saveError=true, resetOnError=true)=>onChangeHandler(saveError, step().changes, resetOnError);

      const get = (col, autoRef=true)=>{
        const { isSetting, isKeying, now, saved } = _p;
        const { isVirtual, init, resetIf, formula, isReadonly } = col;
       
        let raw = now.raws[col];
        const self = _=>col.toVal(raw, (autoRef && !isKeying) ? this : undefined);
    
        if (formula && (isSetting || isVirtual)) { raw = formula(this, self); } //formula
        else if (isSetting && !isKeying) {
          const bew = saved ? saved.raws[col] : undefined;
          if (rows.state !== "pending" && raw !== bew && isReadonly && isReadonly(this, self)) { raw = bew; } //revive value
          if (!saved ? (init && raw == null) : (resetIf && resetIf(this, self))) { raw = init ? init(this) : undefined; } //init or reset
        }
    
        return self();
      };

      const setDirty = col=>{
        _p.updates[col] = _p.now.raws[col];
        _p.changes.push(col);
      }

      _p.put = ({vals, update, autoSave, saveError})=>{
        const { now, saved } = _p;

        _p.isSetting = true;
        _p.updates = {};
        _p.changes = [];

        cols.forEachReal(col=>{ //for each non virtual
          const raw = col.fetch(vals);
          if (raw !== undefined) { now.raws[col] = raw === "" ? null : col.toRaw(raw); }
          else if (!update) { now.raws[col] = null; }
          if (!saved) { setDirty(col); }
        });

        if (saved) {
          cols.forEachReal(async col=>{ //for each non virtual
            const val = undefined;//await this.get(col, false);
            now.raws[col] = col.toRaw(val);
            if (now.raws[col] !== saved.raws[col]) { setDirty(col); } //is isDirty column
          });
        }

        _p.isKeying = true;
        now.key = get(cols.primary, false);
        _p.isKeying = false;

        _p.isSetting = false;

        return _p.changes.length;
        //return release(this.isDirty);
      }

      // const onChangeHandler = async (saveError, changes, resetOnError=false)=>{
      //   try {
      //     await onChange(this, step().key, changes);
      //     _p.changes = [];
      //     return true;
      //   } catch (err) {
      //     if (resetOnError) { reset(); }
      //     if (saveError) { this.throwError(err); }
      //     return false;
      //   }

      // }
  
      // const reset = _=>{
      //   if (!this.isDirty) { return true; }

      //   _p.changes = [];
      //   return true
      // }

      // const remove = async (saveError=true)=>{
      //   if (!this.isExist || await onChangeHandler(saveError)) { return _p.isRemoved = true; }
      //   return true;
      // }
  
      super((col, missingError=true)=>get(true, col, missingError));

      solid.all(this, {
        uid,
        table,
        rows,
      });

      virtual.all(this, {
        key:_=>_p.saved.key,
        isExist:_=>rows.exist(_p.now.key),
        isDirty:_=>!!_p.now.changes.length,
        raws:_=>({..._p.raws}), //cached interface will be better
        vals:_=>cols.map(col=>get(col, true)), //cached interface will be better
        label:_=>get(cols.label, true),
        
      });
  
    }

    msg(text) {
      return this.rows.msg(text, this.key || this.raws);
    }

    set(vals, autoSave=true, saveError=true) {
      return vault.get(this.uid).put({vals, autoSave, saveError});
    }

    update(vals, autoSave=true, saveError=true) {
      return vault.get(this.uid).put({vals, autoSave, saveError, update:true});
    }
  
    toJSON() {
      return this.key
    }
  
    toString() {
      return this.key;
    }
  
  }
  
  