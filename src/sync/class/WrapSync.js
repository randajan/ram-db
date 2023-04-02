import jet from "@randajan/jet-core";

const { solid, virtual } = jet.prop;

export class WrapSync extends jet.types.Plex {

  static is(any) { return any instanceof WrapSync; }

  static create(step) { return new WrapSync(step); }

  constructor(step) {
    const { table } = step, { db, cols } = table;

    const get = (col, opt = { throwError: true }) => step.get(col, opt);

    super(get);

    solid.all(this, {
      db,
      table,
      get
    }, false);

    virtual.all(this, {
      key: _ => step.key,
      label: _ => step.label,
      before: _ => step.before.wrap,
      isExist: _ => step.isExist,
      isDirty: _ => step.isDirty,
      isRemoved: _ => step.isRemoved,
      raws: _ => ({ ...step.raws }),
      vals: _ => cols.map(col => step.pull(col, true), { byKey: true }),
      changes: _ => ([...step.changes])
    });

  }

  getKey() { return this.key; }

  refList(tableName, col) {
    return this.db.get(tableName).rows.refs(col).getList(this.getKey(), false);
  }

}