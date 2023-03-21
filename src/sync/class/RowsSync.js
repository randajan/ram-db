import jet from "@randajan/jet-core";
import Row from "../../class/Row.js";
import vault from "../../uni/helpers/vault.js";
import SchemaSync from "./parts/SchemaSync.js";

const { solid, virtual } = jet.prop;

let _nextPid = 1;

export class RowsSync extends SchemaSync {
    constructor(table, stream, onChange) {

      const loader = (rows, set, data)=>{
        jet.map(data, vals=>{
          if (!jet.isMapable(vals)) { return; }
          const row = new Row(rows, vals);
          set(row.key, row);
        });
      }

      super(`${table.name}.rows`, stream, loader);
      const _p = vault.get(this.uid);

      onChange = Function.jet.to(onChange);

      const seed = async (vals, autoSave=true, saveError=true)=>{
        const row = new Row(this);
        if (jet.isMapable(vals)) { row.set(vals, autoSave, saveError); }
        return row;
      };

      const push = async (vals, create=true, update=true, autoSave=true, saveError=true)=>{
        
        let rowTo, key;
  
        //const c = table.cols.primary;
        //if (!c.formula && !c.resetIf) { key = c.toRaw(c.fetch(vals)); } // quick key
        if (key == null) { rowTo = seed(vals, false); key = rowTo.key; }
        if (key == null) { if (saveError) { throw Error(this.msg("push failed - missing key", vals)); } return; }

        const rowFrom = this.get(key, false, false);
  
        if (update) {
          if (rowFrom) { return await rowFrom.update(vals, autoSave, saveError); }
          if (!create) { if (saveError) { throw Error(this.msg("update failed - key not found", key)); } return; }
        }
  
        if (create) {
          if (rowFrom) { if (saveError) { throw Error(this.msg("create failed - duplicate key", key)); } return; }
          return !rowTo ? seed(vals, autoSave, saveError) : autoSave ? rowTo.save(saveError) : rowTo;
        }
  
      }

      const onChangeHandler = async (row, newKey, changes)=>{
        const { key, isDirty } = row;

        const event = !changes ? "remove" : !_p.index[key] ? "add" : "update";

        if (event !== "remove") {
          if (newKey == null) { throw "missing key!"; }
          if (_p.index[newKey] && _p.index[newKey] !== row) { throw "duplicate key!"; } //duplicate row
        }
        
        if (this.state === "ready" && (isDirty || event === "remove")) {
          await onChange(event, row, newKey, changes);
        }

        if (event === "remove" || key !== newKey) {
          delete _p.index[key];
          const x = _p.list.indexOf(row);
          if (x >=0) { _p.list.splice(x, 1); }
        }

        if (event === "add" || key !== newKey) {
          _p.index[newKey] = row;
          _p.list.push(row);
        }
        
      }

      solid.all(this, {
        table
      }, false);
      
    }

    get(key, autoCreate=true, missingError=true) {
      const row = super.get(key, !autoCreate && missingError);
      return row || {};
    }

    // add:{value:(vals, autoSave=true, saveError=true)=>push(vals, true, false, autoSave, saveError)},
    // update:{value:(vals, autoSave=true, saveError=true)=>push(vals, false, true, autoSave, saveError)},
    // addOrUpdate:{value:(vals, autoSave=true, saveError=true)=>push(vals, true, true, autoSave, saveError)}

  }

  export default RowsSync;