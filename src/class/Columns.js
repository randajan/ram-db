import jet from "@randajan/jet-core";
import Column from "./Column.js";


export default class Columns extends jet.types.Plex {

    constructor(table) {
      const _p = {
        index:{}, //all columns
        list:[], //all columns
        raws:[] //only real
      }
  
      const seed = (name, id)=>{
        const c = new Column(table, name, id);
        if (id != null) { _p.raws[id] = c; }
        _p.list.push(_p.index[name] = c);
        if (!_p.primary) { _p.primary = _p.label = name; }
        return c;
      };
  
      const get = (name, missingError=true)=>{
        if (_p.index[name]) { return _p.index[name]; }
        if (_p.raws[name]) { return _p.raws[name]; }
        if (missingError) { this.throwError(name, "missing!"); }
      }
  
      const virtual = (name, formula, existError=true)=>{
        const n = String.jet.to(name);
        if (_p.index[n] || _p.raws[n]) {
          if (existError) { this.throwError(n, "is allready exist"); }
          return _p.index[n] || _p.raws[n];
        }
        if (!n) { this.throwError(n, "isn't valid name"); }
        this.isNotState("loading", n, "virtual");
        return seed(name).setFormula(formula);
      }
  
      const load = (cols)=>{
        return cols.map((name, id)=>this.isNotState("loading", name, "load") || seed(name, id));
      }
  
      const setTrait = (trait, val)=>this.isNotState("loading", val, "set "+trait) || (_p[trait] = get(val).name);
  
      const setTraits = (name, traits, missingError=true)=>{
        const c = _p.index[name] || _p.raws[name];
        if (!c) { if (missingError) { this.throwError(name, "missing!"); } return false; }
        Object.assign(c, traits);
        return true;
      }
  
      const exist = key=>{
        return _p.index[key] != null;
      }
  
      super(get);
      
      const enumerable = true;
      Object.defineProperties(this, {
        table:{value:table},
        index:{enumerable, get:_=>({..._p.index})},
        list:{enumerable, get:_=>[..._p.list]},
        raws:{enumerable, get:_=>[..._p.raws]},
        count:{enumerable, get:_=>_p.raws.length},
        exist:{value:exist},
        get:{value:get},
        virtual:{value:virtual},
        load:{value:load},
        primary:{enumerable, get:_=>_p.index[_p.primary], set:v=>setTrait("primary", v)},
        label:{enumerable, get:_=>_p.index[_p.label], set:v=>setTrait("label", v)},
        setTraits:{value:setTraits},
        map:{value:(callback, indexed=false)=>jet.map(indexed ? _p.index : _p.list, callback, false)},
        forEach:{value:(callback, indexed=false)=>jet.forEach(indexed ? _p.index : _p.list, callback, false)}
      });
      
    }
  
    throwError(col, msg) { this.table.throwError((col ? "column '"+col+"' " : "") + msg);}
    isNotState(state, col, msg) {
      if (this.table.state !== state) { this.throwError(col, `${msg} is allowed only in ${state} proces!`); }
    }
  
    setPrimary(name) { this.primary = name; return this; }
    setLabel(name) { this.label = name; return this; }
  
    toJSON() {
      return this.list;
    }
  
    toString() {
      return JSON.stringify(this.list);
    }
  
  }