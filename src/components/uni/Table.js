import jet from "@randajan/jet-core";
import { eventsRows } from "./consts";

const { solid, cached, virtual } = jet.prop;

export class Table {

  static is(any) { return any instanceof Table; }

  constructor(db, name, config={}) {
    const { stream, Rows, Cols, onChange } = config;
    const _p = cached({}, {}, "stream", _=>Object.jet.to(stream, this)); //cache even config object
    _p.lastChange = Date.now();

    solid(this, "db", db, false);
    solid(this, "name", name);

    cached.all(this, _p, {
      cols:_=>new Cols(this, _p.stream.cols),
      rows:_=>{
        const rows = new Rows(this, _p.stream.rows);
        for (const [when, action, name] of eventsRows) {
          rows.on(name, (row, ctx, silentSave)=>{
            if (when === "after") { _p.lastChange = Date.now(); }
            return onChange(when, action, row.live, silentSave)
          });
        }
        return rows;
      }
    }, false);

    virtual.all(this, {
      state:_=>this.rows.state,
      isLoading:_=>this.rows.isLoading,
      lastChange:_=>_p.lastChange
    });

  }

  msg(text) { return this.db.msg(text, this.key); }

  eval(selector, opt={}) {
    return this.rows.eval(selector, opt);
  }

  getKey() {
    return this.name;
  }

  toString() {
    return this.name || ""
  }

  toJSON() {
    return this;
  }


}
  