import jet from "@randajan/jet-core";
import Row from "./Row.js";


export default class Rows extends jet.types.Plex {
    constructor(table, onChange) {
      const _p = {
        index:{}, //all rows by key
        list:[] //all rows
        //keys:{}, //gid => rawkeys
        //ids:{} //gid => rawid
      }
  
      onChange = Function.jet.to(onChange);
  
      const onChangeHandler = (row, newKey, changes)=>{
        const { key, isDirty } = row;

        const event = !changes ? "remove" : !_p.index[key] ? "add" : "update";

        if (event !== "remove") {
          if (newKey == null) { throw "missing key!"; }
          if (_p.index[newKey] && _p.index[newKey] !== row) { throw "duplicate key!"; } //duplicate row
        }
        
        if (table.state === "ready") { onChange(event, row, newKey, changes); }

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
  
      const seed = (vals, autoSave=true, saveError=true)=>{
        const row = new Row(table, onChangeHandler);
        if (jet.isMapable(vals)) { row.set(vals, autoSave, saveError); }
        return row;
      };
  
      const get = (key, missingError=true, autoCreate=true)=>{
        if (_p.index[key]) { return _p.index[key]; }
        if (missingError) { this.throwError("missing!", key); }
        return autoCreate ? seed() : null;
      }

      const push = (vals, create=true, update=true, autoSave=true, saveError=true)=>{
        const c = table.cols.primary;
        let row, key;
  
        if (!c.formula && !c.resetIf) { key = c.toRaw(c.fetch(vals)); } // quick key
        if (key == null) { row = seed(vals, false); key = row.key; }
  
        if (key == null) { if (saveError) { this.throwError("missing key!", vals); } return; }
        const tr = _p.index[key];
  
        if (update) {
          if (tr) { return tr.update(vals, autoSave, saveError); }
          if (!create) { if (saveError) { this.throwError("not found. Update failed!", key); } return; }
        }
  
        if (create) {
          if (tr) { if (saveError) { this.throwError("duplicate key. Create failed!", key); } return; }
          return !row ? seed(vals, autoSave, saveError) : autoSave ? row.save(saveError) : row;
        }
  
      }

      const set = rows=>{
        this.isNotSeeding("set", rows);
        jet.map(rows, (values, id)=>{ seed(values, true, false).setId(id); });
        return this;
      };
  
      super(get);
  
      const enumerable = true;
      Object.defineProperties(this, {
        table:{value:table},
        index:{enumerable, get:_=>({..._p.index})},
        list:{enumerable, get:_=>([..._p.list])},
        count:{enumerable, get:_=>_p.list.length},
        exist:{value:key=>_p.index[key] != null},
        set:{value:set},
        get:{value:get},
        add:{value:(vals, autoSave=true, saveError=true)=>push(vals, true, false, autoSave, saveError)},
        update:{value:(vals, autoSave=true, saveError=true)=>push(vals, false, true, autoSave, saveError)},
        addOrUpdate:{value:(vals, autoSave=true, saveError=true)=>push(vals, true, true, autoSave, saveError)},
        map:{value:(callback, sort)=>jet.map(sort ? _p.list.sort(sort) : _p.index, callback, false)},
        forEach:{value:(callback, sort)=>jet.forEach(sort ? _p.list.sort(sort) : _p.index, callback, false)}
      });
  
    }
  
    throwError(msg, row) {
      row = String.jet.to(row);
      this.table.throwError((row ? "row '" + row + "' " : "") + msg);
    }

    isNotSeeding(msg, row) {
      if (this.table.state !== "seeding") { this.throwError(msg+" is allowed only in seeding proces!", row); }
    }
  
    toJSON() {
      return this.list;
    }
  
    toString() {
      return JSON.stringify(this);
    }
  }