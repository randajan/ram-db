import jet from "@randajan/jet-core";

const { solid, virtual } = jet.prop;

const _select = (step, cols, selector, opt={})=>{
  const { byKey, noVals, throwError } = opt;
  const isArray = Array.isArray(selector);
  const bk = (byKey || !isArray) ? {} : null;
  const bl = Object.keys(selector).map(x => {
    // when selector is array it expect values to be the columns while for object its oposite
    const c = isArray ? selector[x] : x, as = isArray ? x : selector[x];
    const col = cols.get(c, throwError); if (!col) { return; }
    const asref = (!isArray && typeof as === "object");
    if (asref && !col.ref) { throw Error(col.msg("selector looks for ref")); }
    const val = (noVals && !asref) ? step.raws[col] : step.pull(col);
    if (val == null) { return; } else if (isArray) { return bk ? bk[col] = val : val; } //filter simple scenario
    if (!asref) { return bk[typeof as === "string" ? as : col] = val; } //filter alias or another scimple scenario
    bk[col] = col.separator ? val.map(v=>v.select(as, opt)) : val.select(as, opt); 
  });
  return bk || bl;
}

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
      getRaw:(colName, throwError=true) => {
        if (step.raws.hasOwnProperty(colName)) { return step.raws[colName]; }
        const col = cols(colName, throwError);
        if (col && col.isVirtual) { return col.toRaw(step.pull(col)); }
      },
      select:(selector, opt = {}) => _select(step, cols, selector, opt)
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

  chopByRef(tableName, colName, filter, cacheAs = true) {
    const table = this.db.get(tableName);
    return table.rows.chopByCol(colName, filter, cacheAs);
  }

  refs(tableName, colName, filter, cache = {}) {
    const chop = (cache.current || (cache.current = this.chopByRef(tableName, colName, filter, false)));
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