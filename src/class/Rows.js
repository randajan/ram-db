import jet from "@randajan/jet-core";
import Row from "./Row.js";


export default class Rows extends jet.types.Plex {
    constructor(table, getRow, setRow, lastId, onChange) {
      const _p = {
        gid:0,
        index:{}, //all rows by key
        raws:[], //only real rows
        keys:{}, //gid => rawkeys
        ids:{} //gid => rawid
      }
  
      onChange = Function.jet.is(onChange) ? onChange : null;
  
      const onSave = (row, changes, saveError=true)=>{
  
        let { gid, key, id, dirty } = row;
        const fkey = _p.keys[gid];
  
        if (key == null) { if (saveError) { row.throwError("missing key!"); }; delete _p.ids[gid]; return false; }
        if (_p.index[key] && _p.index[key] !== row) { if (saveError) { row.throwError("duplicate key!"); }; return false; } //duplicate row
  
        if (key !== fkey) { delete _p.index[fkey]; }
  
        const event = !dirty ? "seed" : !changes ? "delete" : id == null ? "add" : "update";
  
        if (changes) {
          id = _p.ids[gid] = (id == null ? lastId()+1 : id);
          _p.index[key] = _p.raws[id] = row;
          _p.keys[gid] = key;
        } else {
          delete _p.index[key];
          delete _p.raws[id];
          delete _p.ids[gid];
          delete _p.keys[gid];
        }
  
        const result = false !== (!changes ? setRow(id) : dirty ? setRow(id, getRow(id).map((v, cid)=>changes[cid] !== undefined ? changes[cid] : v)) : true);
  
        if (dirty && result && onChange) { onChange(row, event, changes); }
  
        return result;
      }
  
      const seed = (vals, id, autoSave=true, saveError=true)=>{
        const gid = _p.gid ++;
        const r = new Row(table, gid, onSave);
        if (id != null) { _p.ids[gid] = id; }
        return vals ? r.set(vals, autoSave, saveError) : r;
      };
  
      const exist = key=>{
        return _p.index[key] != null;
      }
  
      const get = (key, missingError=true, autoCreate=true)=>{
        if (_p.index[key] || _p.raws[key]) { return _p.index[key] || _p.raws[key]; }
        if (missingError) { this.throwError(key, "missing!"); }
        return autoCreate ? seed() : null;
      }
  
      const load = rows=>rows.map((vals, id)=>this.isNotSeeding(JSON.stringify(vals), "load") || seed(vals, id, true, false));
      const push = (vals, create=true, update=true, autoSave=true, saveError=true)=>{
        const c = table.cols.primary;
        let row, key;
  
        if (!c.formula && !c.resetIf) { key = c.toRaw(c.fetch(vals)); } // quick key
        if (key == null) { row = seed(vals, null, false); key = row.key; }
  
        if (key == null) { if (saveError) { this.throwError(JSON.stringify(vals), "missing key!"); } return; }
        const tr = _p.index[key];
  
        if (update) {
          if (tr) { return tr.update(vals, autoSave, saveError); }
          if (!create) { if (saveError) { this.throwError(key, "not found. Update failed!"); } return; }
        }
  
        if (create) {
          if (tr) { if (saveError) { this.throwError(key, "duplicate key. Create failed!"); } return; }
          return !row ? seed(vals, null, autoSave, saveError) : autoSave ? row.save(saveError) : row;
        }
  
      }
  
      super(get);
  
      const enumerable = true;
      Object.defineProperties(this, {
        table:{value:table},
        index:{enumerable, get:_=>({..._p.index})},
        list:{enumerable, get:_=>_p.raws.filter(_=>_)},
        raws:{enumerable, get:_=>[..._p.raws]},
        count:{enumerable, get:_=>_p.raws.length},
        exist:{value:exist},
        load:{value:load},
        get:{value:get},
        add:{value:(vals, autoSave=true, saveError=true)=>push(vals, true, false, autoSave, saveError)},
        update:{value:(vals, autoSave=true, saveError=true)=>push(vals, false, true, autoSave, saveError)},
        addOrUpdate:{value:(vals, autoSave=true, saveError=true)=>push(vals, true, true, autoSave, saveError)},
        gidToId:{value:gid=>_p.ids[gid]},
        map:{value:(callback, indexed=false)=>jet.map(indexed ? _p.index : _p.list, callback, false)},
        forEach:{value:(callback, indexed=false)=>jet.forEach(indexed ? _p.index : _p.list, callback, false)}
      });
  
    }
  
    throwError(row, msg) { this.table.throwError("row '"+row+"' " + msg); }
    isNotSeeding(row, msg) {
      if (this.table.state !== "seeding") { this.throwError(row, msg+" is allowed only in seeding proces!"); }
    }
  
    toJSON() {
      return this.list;
    }
  
    toString() {
      return JSON.stringify(this);
    }
  }