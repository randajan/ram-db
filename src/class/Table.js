import jet from "@randajan/jet-core";
import Columns from "./Columns.js";
import Rows from "./Rows.js";

const _index = {};


export default class Table extends jet.types.Plex {

  static is(any) { return any instanceof Table; }

  static exist(name) {
    return !!_index[name];
  }

  static find(name, missingError=true) {
    if (Table.exist(name)) { return _index[name]; }
    if (missingError) { throw "Table '" + name + "' not found!"; }
  }

    constructor(name, config) {
  
      const _p = {
        state:"pending",
      };
  
      const build = prop=>{
        if (_p[prop]) { return _p[prop]; }
        if (_p.state !== "pending") { this.throwError(`access to '${prop}' is restricted when table state is '${_p.state}'`); }
  
        const { loadCols, loadRows, onChange } = Object.jet.to(config, this);
        _p.state = "loading";
        _p.cols = new Columns(this);
        if (loadCols) { loadCols(this); }
  
        _p.state = "seeding";
        _p.rows = new Rows(this, onChange);
        if (loadRows) { loadRows(this); }
  
        _p.state = "ready";
  
        return _p[prop];
      };
  
      super((...a)=>this.rows(...a));
  
      const enumerable = true;
      Object.defineProperties(this, {
        name:{enumerable, value:name},
        state:{enumerable, get:_=>_p.state},
        cols:{ enumerable, get:_=>build("cols") },
        rows:{ enumerable, get:_=>build("rows") }
      });
  
      if (!name) { this.throwError("name missing"); }
      if (Table.exist(name)) { this.throwError("allready exist"); }
      Object.defineProperty(_index, name, {enumerable:true, value:this});
  
    }
  
    throwError(msg) {throw "Table '" + this.name + "' " + msg;}
    
    toJSON() {
      return [this.cols, ...this.rows.raws.map(r=>r.raws)];
    }
  
    toString() {
      return JSON.stringify(this);
    }
  
  }
  