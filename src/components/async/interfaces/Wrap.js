import jet from "@randajan/jet-core";

const { solid, virtual } = jet.prop;

export class Wrap extends jet.types.Plex {

  static is(any) { return any instanceof Wrap; }

  static create(table, step) { return new Wrap(table, step); }

  constructor(table, step) {
    const { db, rows, cols } = table;

    const get = (col, throwError = true) => step.get(col, throwError);

    super(get);

    solid.all(this, {
      db,
      table,
      rows,
      get,
      getRaw:(col, throwError=true) => step.getRaw(col, throwError),
      select:(selector, opt = {}) => step.select(selector, opt),
      eval:(selector, opt = {}) => step.eval(selector, opt)
    }, false);

    virtual.all(this, {
      key: _ => step.key,
      label: async _ => step.label,
      before: _ => step.before?.wrap,
      isExist: async _ => step.isExist,
      isDirty: _ => step.isDirty,
      isRemoved: _ => step.isRemoved,
      raws: _ => ({ ...step.raws }),
      vals: async _ => cols.map(col => step.pull(col), { byKey: true }),
      changeList: _ => ([...step.changeList]),
      changes: _ => ({ ...step.changes })
    });

  }

  async chopByRef(tableName, colName, filter, cacheAs = true) {
    const table = await this.db.get(tableName);
    return table.rows.chopByCol(colName, filter, cacheAs);
  }

  async refs(tableName, colName, filter, cache = {}) {
    const chop = await (cache.current || (cache.current = this.chopByRef(tableName, colName, filter, false)));
    return chop.getList(this.key, false);
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