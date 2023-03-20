import jet from "@randajan/jet-core";
import Columns from "./Columns.js";
import Rows from "./Rows.js";

const _index = {};

const msg = (text, name)=>{
  name = String.jet.to(name);
  return "Table " + (name ? name + " " : "") + text;
}

export default class Table {

  static is(any) { return any instanceof Table; }

  static exist(name) { return !!_index[name]; }

  static find(name, missingError=true) {
    if (Table.exist(name)) { return _index[name]; }
    if (missingError) { throw Error(msg(name, "nof found!")); }
  }

  constructor(name, config) {

    const _p = {};
    const { columns, rows, onChange } = Object.jet.to(config, this);

    const enumerable = true;
    Object.defineProperties(this, {
      name:{ enumerable, value:name },
      cols:{ enumerable, get:_=>_p.cols || (_p.cols = new Columns(this, columns)) },
      rows:{ enumerable, get:_=>_p.rows || (_p.rows = new Rows(this, rows, onChange)) }
    });

    if (!name) { throw Error(this.msg("name missing")); }
    if (Table.exist(name)) { throw Error(this.msg("allready exist")); }
    Object.defineProperty(_index, name, { enumerable, value:this });

  }

  msg(text) { return msg(text, this.name); }

}
  