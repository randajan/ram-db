import jet from "@randajan/jet-core";

const { solid, virtual } = jet.prop;

const _select = async (step, cols, selector, opt={})=>{
  const { byKey, noVals, throwError } = opt;
  const isArray = Array.isArray(selector);
  const bk = (byKey || !isArray) ? {} : null;
  const bl = await Promise.all(Object.keys(selector).map(async x => {
    // when selector is array it expect values to be the columns while for object its oposite
    const c = isArray ? selector[x] : x, as = isArray ? x : selector[x];
    const col = await cols.get(c, throwError); if (!col) { return; }
    const asref = (!isArray && typeof as === "object");
    if (asref && !col.ref) { throw Error(col.msg("selector looks for ref")); }
    const val = (noVals && !asref) ? step.raws[col] : await step.pull(col);
    if (val == null) { return; } else if (isArray) { return bk ? bk[col] = val : val; } //filter simple scenario
    if (!asref) { return bk[typeof as === "string" ? as : col] = val; } //filter alias or another scimple scenario
    bk[col] = col.separator ? await Promise.all(val.map(v=>v.select(as, opt))) : await val.select(as, opt); 
  }));
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
      select:async (selector, opt = {}) => _select(step, cols, selector, opt)
    }, false);

    virtual.all(this, {
      key: _ => step.key,
      label: async _ => step.label,
      before: _ => step.before.wrap,
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
    const chop = cache.current || (cache.current = await this.chopByRef(tableName, colName, filter, false));
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