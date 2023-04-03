import jet from "@randajan/jet-core";

const { solid, cached } = jet.prop;

export class Table {

  static is(any) { return any instanceof Table; }

  constructor(db, name, config) {
    const _p = cached({}, {}, "config", _=>Object.jet.to(config, this)); //cache even config object

    solid(this, "db", db, false);
    solid(this, "name", name);

    cached.all(this, _p, {
      cols:_=>db.seedCols(this, _p.config.cols),
      rows:_=>db.seedRows(this, _p.config.rows, _p.config.onSave)
    }, false);

  }

  msg(text) { return this.db.msg(text, this.key); }

  getKey() {
    return this.name;
  }

}
  