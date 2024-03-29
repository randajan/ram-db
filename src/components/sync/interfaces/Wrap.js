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
      eval:(selector, opt = {}) => step.eval(selector, opt),
      getRaws:filter=>step.extract(true, filter),
      getVals:filter=>step.extract(false, filter)
    }, false);

    virtual.all(this, {
      key: _ => step.key,
      label: _ => step.label,
      before: _ => step.before?.wrap,
      isExist: _ => step.isExist,
      isDirty: _ => step.isDirty,
      isRemoved: _ => step.isRemoved,
      raws: _ => ({ ...step.raws }),
      vals: _ => cols.map(col => step.pull(col), { byKey: true }),
      changeList: _ => ([...step.changeList]),
      changes: _ => ({ ...step.changes })
    });

  }

  chopByRef(tableName, colName, filter, cacheAs = true, morphSeparator = "$$") {
    const table = this.db.get(tableName);
    const chop = table.rows.chopByCol(colName, filter, cacheAs, morphSeparator);
    if (chop.extra.isRef) { return chop; }
    throw Error(this.table.msg(`chopByRef table('${tableName}') column('${colName}') failed because column is not ref`));
  }

  refs(tableName, colName, filter, cache = {}) {
    const chop = (cache.current || (cache.current = this.chopByRef(tableName, colName, filter, false)));
    return chop.getList((chop.extra.isMorph ? this.table.name + chop.extra.morphSeparator : "") + this.key, false);
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