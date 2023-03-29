import jet from "@randajan/jet-core";
import ColumnsAsync from "../../async/class/ColumnsAsync.js";

import ColumnsSync from "../../sync/class/ColumnsSync.js";
import RowsSync from "../../sync/class/RowsSync.js";

const { solid, cached } = jet.prop;

export class Table {

  static is(any) { return any instanceof Table; }

  static create(db, key, config) { return new Table(db, key, config); }

  constructor(db, key, config) {
    const _p = cached({}, {}, "config", _=>Object.jet.to(config, this)); //cache even config object

    solid(this, "db", db, false);
    solid(this, "key", key, false);
    solid(this, "name", key);

    cached.all(this, _p, {
      cols:_=>new ColumnsAsync(this, _p.config.columns),
      rows:_=>new RowsSync(this, _p.config.rows, _p.config.onChange)
    }, false);

  }

  msg(text) { return this.msg(text, this.key); }

}

export default Table;
  