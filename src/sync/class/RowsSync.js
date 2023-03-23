import jet from "@randajan/jet-core";
import vault from "../../uni/helpers/vault.js";
import RowSync from "./RowSync.js";
import SchemaSync from "./SchemaSync.js";

const { solid, virtual } = jet.prop;

export class RowsSync extends SchemaSync {
    constructor(table, stream, onChange) {
      const loader = (rows, data)=>{
        jet.map(data, vals=>RowSync.create(this, vals, { saveError:false }));
      };

      super(`${table.name}.rows`, stream, loader);
      const _p = vault.get(this.uid);

      _p.save = (row, newKey)=>{
        const { key, raws, changes } = row;
        const event = !newKey ? "remove" : !key ? "add" : "update";

        if (key !== newKey) {
          if (key) { _p.remove(key); }
          if (newKey) { _p.set(newKey, row); }
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

    get(key, opt={ autoCreate:true, missingError:true }) {
      const row = super.get(key, !opt.autoCreate && opt.missingError);
      if (row) { return row; } else if (opt.autoCreate) { return RowSync.create(this); }
    }

    addOrUpdate(vals, opt={ add:true, update:true, autoSave:true, resetOnError:true, saveError:true }) {

      this.init();
    
      let rowTo, key;
      const ck = this.table.cols.primary;
      if (!ck.formula && !ck.resetIf) { key = ck.toRaw(ck.fetch(vals)); } // quick key
      if (key == null) { rowTo = RowSync.create(this, vals, { autoSave:false }); key = rowTo.key; }
      if (key == null) { if (saveError) { throw Error(this.msg("push failed - missing key", vals)); } return; }
    
      const rowFrom = this.get(key, { autoCreate:false, missingError:false });
    
      if (opt.update !== false) {
        if (rowFrom) { return rowFrom.update(vals, opt); }
        if (!opt.add) { if (saveError) { throw Error(this.msg("update failed - key not found", key)); } return; }
      }
    
      if (opt.add !== false) {
        if (rowFrom) { if (saveError) { throw Error(this.msg("add failed - duplicate key", key)); } return; }
        return !rowTo ? RowSync.create(this, vals, opt) : autoSave ? rowTo.save(opt) : rowTo;
      }
    
    }

    add(vals, opt={ autoSave:true, resetOnError:true, saveError:true }) {
      opt.add = true;
      opt.update = false;
      return this.addOrUpdate(vals, opt);
    }

    update(vals, opt={ autoSave:true, resetOnError:true, saveError:true }) {
      opt.add = false;
      opt.update = true;
      return this.addOrUpdate(vals, opt);
    }


  }

  export default RowsSync;