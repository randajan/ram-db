import jet from "@randajan/jet-core";

const { solid, cached, virtual } = jet.prop;

export class Table {

  static is(any) { return any instanceof Table; }

  constructor(db, name, config={}) {
    const { stream, Rows, Cols, onChange } = config;
    const _p = cached({}, {}, "stream", _=>Object.jet.to(stream, this)); //cache even config object

    solid(this, "db", db, false);
    solid(this, "name", name);

    cached.all(this, _p, {
      cols:_=>new Cols(this, _p.stream.cols),
      rows:_=>{
        const rows = new Rows(this, _p.stream.rows);
        for (const en of ["before", "after"]) {
          rows.on(en+"Set", (row, ctx, silentSave)=>onChange(en, "set", row.live, silentSave));
          rows.on(en+"Update", (row, ctx, silentSave)=>onChange(en, "update", row.live, silentSave));
          rows.on(en+"Remove", (row, ctx, silentSave)=>onChange(en, "remove", row.saved, silentSave));
        }
        return rows;
      }
    }, false);

    virtual.all(this, {
      state:_=>this.rows.state,
      isLoading:_=>this.rows.isLoading
    });

  }

  msg(text) { return this.db.msg(text, this.key); }

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
  