import jet from "@randajan/jet-core";
import ColumnsAsync from "../../async/class/ColumnsAsync.js";
import ColumnsSync from "../../sync/class/ColumnsSync.js";
import Rows from "../../class/Rows.js";
import RowsSync from "../../sync/class/RowsSync.js";

const { solid, cached } = jet.prop;

const _index = {};

const msg = (text, name)=>{
  name = String.jet.to(name);
  return `Table ${(name ? `'${name}'` + " " : "") + text}`;
}

export const tableExist = name=>!!_index[name];
export const tableFind = (name, missingError=true)=>{
  if (tableExist(name)) { return _index[name]; }
  if (missingError) { throw Error(msg("nof found!", name)); }
}

export class Table {

  static is(any) { return any instanceof Table; }

  constructor(name, config) {
    const _p = cached({}, {}, "config", _=>Object.jet.to(config, this)); //cache even config object

    solid.all(this, {
      name
    })

    cached.all(this, _p, {
      cols:_=>new ColumnsSync(this, _p.config.columns),
      rows:_=>new RowsSync(this, _p.config.rows, _p.config.onChange)
    });

    if (!name) { throw Error(this.msg("name missing")); }
    if (tableExist(name)) { throw Error(this.msg("allready exist")); }

    solid(_index, name, this);

  }

  msg(text) { return msg(text, this.name); }

}

export default Table;
  