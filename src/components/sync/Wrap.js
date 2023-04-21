import jet from "@randajan/jet-core";

const { solid, virtual } = jet.prop;

export class Wrap extends jet.types.Plex {

  static is(any) { return any instanceof Wrap; }

  static create(step) { return new Wrap(step); }

  constructor(step) {
    const { table } = step, { db, cols } = table;

    const get = (col, throwError=true) => step.get(col, throwError);

    super(get);

    solid.all(this, {
      db,
      table,
      get
    }, false);

    virtual.all(this, {
      key:_=>step.key,
      label:_=>step.label,
      before:_=>step.before.wrap,
      isExist:_=>step.isExist,
      isDirty:_=>step.isDirty,
      isRemoved:_=>step.isRemoved,
      raws:_=>({...step.raws}),
      vals:_=>cols.map(col=>step.pull(col, true), { byKey:true }),
      changeList:_=>([...step.changeList]),
      changes:_=>({...step.changes})
    });

  }

  refs(tableName, colName, cache={}) {
    const table = this.db.get(tableName);
    const refs = table.rows.refs(colName, cache);
    return refs.getList(this.key, false);
  }

  getKey() {
    return this.key;
  }

  toJSON() {
    return this.key || null;
  }

  toString() {
    return this.key || "";
  }

}