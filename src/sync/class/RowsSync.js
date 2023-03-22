import jet from "@randajan/jet-core";
import Row from "../../class/Row.js";
import vault from "../../uni/helpers/vault.js";
import SchemaSync from "./SchemaSync.js";

const { solid, virtual } = jet.prop;

export class RowsSync extends SchemaSync {
    constructor(table, stream, onChange) {

      const loader = (rows, data)=>{
        const { seed } = vault.get(rows.uid);
        jet.map(data, vals=>seed(vals, true, false));
      };

      super(`${table.name}.rows`, stream, loader);
      const _p = vault.get(this.uid);

      _p.seed = (vals, autoSave=true, saveError=true)=>{
        const row = new Row(this);
        if (jet.isMapable(vals)) { row.set(vals, autoSave, saveError); }
        return row;
      };

      _p.put = ({vals, create, update, autoSave, saveError})=>{

        this.init();

        let rowTo, key;
        const ck = table.cols.primary;
        if (!ck.formula && !ck.resetIf) { key = ck.toRaw(ck.fetch(vals)); } // quick key
        if (key == null) { rowTo = _p.seed(vals, false); key = rowTo.key; }
        if (key == null) { if (saveError) { throw Error(this.msg("push failed - missing key", vals)); } return; }

        const rowFrom = _p.index[key];
  
        if (update) {
          if (rowFrom) { return rowFrom.update(vals, autoSave, saveError); }
          if (!create) { if (saveError) { throw Error(this.msg("update failed - key not found", key)); } return; }
        }
  
        if (create) {
          if (rowFrom) { if (saveError) { throw Error(this.msg("create failed - duplicate key", key)); } return; }
          return !rowTo ? _p.seed(vals, autoSave, saveError) : autoSave ? rowTo.save(saveError) : rowTo;
        }
  
      }

      // const onChangeHandler = async (row, newKey, changes)=>{
      //   const { key, isDirty } = row;

      //   const event = !changes ? "remove" : !_p.index[key] ? "add" : "update";

      //   if (event !== "remove") {
      //     if (newKey == null) { throw "missing key!"; }
      //     if (_p.index[newKey] && _p.index[newKey] !== row) { throw "duplicate key!"; } //duplicate row
      //   }
        
      //   if (this.state === "ready" && (isDirty || event === "remove")) {
      //     await onChange(event, row, newKey, changes);
      //   }

      //   if (event === "remove" || key !== newKey) {
      //     delete _p.index[key];
      //     const x = _p.list.indexOf(row);
      //     if (x >=0) { _p.list.splice(x, 1); }
      //   }

      //   if (event === "add" || key !== newKey) {
      //     _p.index[newKey] = row;
      //     _p.list.push(row);
      //   }
        
      // }

      solid.all(this, {
        table
      }, false);
      
    }

    get(key, autoCreate=true, missingError=true) {
      const row = super.get(key, !autoCreate && missingError);
      return row || vault.get(this.uid).seed();
    }

    add(vals, autoSave=true, saveError=true) {
      return vault.get(this.uid).put({vals, create:true, autoSave, saveError});
    }

    update(vals, autoSave=true, saveError=true) {
      return vault.get(this.uid).put({vals, update:true, autoSave, saveError});
    }

    update(vals, autoSave=true, saveError=true) {
      return vault.get(this.uid).put({vals, create:true, update:true, autoSave, saveError});
    }

  }

  export default RowsSync;