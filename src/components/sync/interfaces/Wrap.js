import jet from "@randajan/jet-core";

const { solid, virtual } = jet.prop;

export class Wrap extends jet.types.Plex {

  static is(any) { return any instanceof Wrap; }

  static create(step) { return new Wrap(step); }

  constructor(step) {
    const { table } = step, { db, rows, cols } = table;

    const get = (col, throwError=true) => step.get(col, throwError);

    super(get);

    solid.all(this, {
      db,
      table,
      rows,
      get,
      getVals:(select, throwError=true)=>{
        const r = {};
        for (const c of select) {
          const col = cols.get(c, throwError);
          if (col) { r[c] = step.pull(col); }
        }
        return r;
      },
      getRaws:(select, throwError=true)=>{
        const r = {};
        for (const c of select) {
          const col = throwError !== false ? cols.get(c) : c;
          if (col) { r[c] = step.raws[c]; }
        }
        return r;
      },
    }, false);

    virtual.all(this, {
      key:_=>step.key,
      label:_=>step.label,
      before:_=>step.before.wrap,
      isExist:_=>step.isExist,
      isDirty:_=>step.isDirty,
      isRemoved:_=>step.isRemoved,
      raws:_=>({...step.raws}),
      vals:_=>cols.map(col=>step.pull(col), { byKey:true }),
      changeList:_=>([...step.changeList]),
      changes:_=>({...step.changes})
    });

  }

  chopByRef(tableName, colName, filter, cacheAs=true) {
    const table = this.db.get(tableName);
    return table.rows.chopByCol(colName, filter, cacheAs);
  }

  refs(tableName, colName, filter, cache={}) {
    const chop = cache.current || (cache.current = this.chopByRef(tableName, colName, filter, false));
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