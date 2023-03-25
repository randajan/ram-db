import jet from "@randajan/jet-core";
import ColumnsAsync from "../../async/class/ColumnsAsync.js";
import ColumnsSync from "../../sync/class/ColumnsSync.js";
import Rows from "../../class/Rows.js";
import RowsSync from "../../sync/class/RowsSync.js";
import vault from "../helpers/vault.js";

const { solid, cached } = jet.prop;

export class Table {

  static is(any) { return any instanceof Table; }

  static create(db, name, config) { return new Table(db, name, config); }

  constructor(db, name, config) {
    const _p = cached({}, {}, "config", _=>Object.jet.to(config, this)); //cache even config object

    solid(this, "db", db, false);
    solid(this, "name", name);

    cached.all(this, _p, {
      cols:_=>new ColumnsSync(this, _p.config.columns),
      rows:_=>new RowsSync(this, _p.config.rows, _p.config.onChange)
    }, false);

  }

  msg(text) { return this.msg(text, this.name); }

}

export default Table;
  