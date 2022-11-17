import jet from "@randajan/jet-core";
import { addTrait } from "../helpers.js";
import Column from "./Column.js";


const traitLocal = (cols, name, getCol)=>{
  let _p;
  return addTrait(cols, name, _=>_p, col=>{
    cols.isNotState("loading", "set "+name, col);
    _p = getCol(col);
  })
}


export default class Columns extends jet.types.Plex {

    constructor(table) {
      const _p = {
        index:{},
        list:[]
      }
  
      const set = (name, schema, missingError=false, autoCreate=true)=>{
        const isArray = !Object.jet.is(name);
        
        jet.map(name, (value, id)=>{
          const objInArray = (isArray && Object.jet.is(value));
          const col = String.jet.to(objInArray ? value.name : isArray ? value : id);

          if (!col) { this.throwError("set failed column name missing", id); }
          delete value.name;

          let c = get(col, missingError);
          if (!c && autoCreate) {
            _p.list.push(c = _p.index[col] = new Column(table, col));
            if (!this.primary) { this.primary = this.label = c; }
          }

          const traits = (isArray && !objInArray) ? schema : value;
          if (c && traits) { c.set(traits); }
        });

        return this;
      };
  
      const get = (name, missingError=true)=>{
        if (_p.index[name]) { return _p.index[name]; }
        if (missingError) { this.throwError("missing!", name); }
      }
  
      super(get);
      
      const enumerable = true;
      Object.defineProperties(this, {
        table:{value:table},
        index:{enumerable, get:_=>({..._p.index})},
        list:{enumerable, get:_=>([..._p.list])},
        count:{enumerable, get:_=>_p.list.length},
        exist:{value:key=>_p.index[key] != null},
        get:{value:get},
        set:{value:set},
        map:{value:(callback, sort)=>jet.map(sort ? _p.list.sort(sort) : _p.index, callback, false)},
        forEach:{value:(callback, sort)=>jet.forEach(sort ? _p.list.sort(sort) : _p.index, callback, false)}
      });

      traitLocal(this, "primary", get);
      traitLocal(this, "label", get);
      
    }
  
    throwError(msg, col) {
      col = String.jet.to(col);
      this.table.throwError((col ? "column '"+col+"' " : "") + msg);
    }

    isNotState(state, msg, col) {
      if (this.table.state !== state) { this.throwError(`${msg} is allowed only in ${state} proces!`, col); }
    }
  
    toJSON() {
      return this.list;
    }
  
    toString() {
      return JSON.stringify(this.list);
    }
  
  }