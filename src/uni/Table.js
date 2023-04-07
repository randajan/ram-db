import jet from "@randajan/jet-core";

const { solid, cached, virtual } = jet.prop;

export class Table {

  static is(any) { return any instanceof Table; }

  constructor(db, name, config={}) {
    const { stream, Rows, Cols } = config;
    const _p = cached({}, {}, "stream", _=>Object.jet.to(stream, this)); //cache even config object

    solid(this, "db", db, false);
    solid(this, "name", name);

    cached.all(this, _p, {
      cols:_=>new Cols(this, _p.stream.cols),
      rows:_=>new Rows(this, _p.stream.rows, _p.stream.onSave)
    }, false);

    virtual(this, "state", _=>this.rows.state);

  }

  msg(text) { return this.db.msg(text, this.key); }

  getKey() {
    return this.name;
  }

}
  