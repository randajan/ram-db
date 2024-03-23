import jet from "@randajan/jet-core";
import { events } from "./consts";

const { solid, cached, virtual } = jet.prop;

export class Table {

  static is(any) { return any instanceof Table; }

  constructor(db, name, config={}) {
    const { stream, bundle, Rows, Cols, onRows } = config;
    const _p = cached({}, {}, "stream", _=>Object.jet.to(stream, this)); //cache even config object
    _p.lastChange = Date.now();

    solid(this, "db", db, false);
    solid(this, "name", name);

    cached.all(this, _p, {
      cols:_=>{
        const cols = new Cols(this, _p.stream.cols);
        bundle.on("beforeReset", _=>cols.reset(), { once:true });
        return cols;
      },
      rows:_=>{
        const rows = new Rows(this, _p.stream.rows);

        for (const [when, action, name] of events.extra) {
          const cleanUp = rows.on(name, (standardAction, rowLive)=>bundle.run(name, [standardAction, rowLive]));
          rows.on("beforeReset", cleanUp, { once:true });
        }

        bundle.on("beforeReset", _=>rows.reset(), { once:true });
        rows.on("afterChange", _=>_p.lastChange = Date.now());
        return rows;
      }
    }, false);

    virtual.all(this, {
      state:_=>this.rows.state,
      isLoading:_=>this.rows.isLoading,
      lastChange:_=>_p.lastChange
    });

  }

  msg(text) { return this.db.msg(text, this.name); }

  eval(selector, opt={}) {
    return this.rows.eval(selector, opt);
  }

  getKey() {
    return this.name;
  }

  toString() {
    return this.name || "";
  }

  toJSON() {
    return this;
  }


}
  