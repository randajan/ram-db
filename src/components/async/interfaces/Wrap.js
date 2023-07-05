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
      getVals:async (select, throwError=true)=>{
        const r = {};
        for (const c of select) {
          const col = await cols.get(c, throwError);
          if (col) { r[c] = await step.pull(col); }
        }
        return r;
      },
      getRaws:async (select, throwError=true)=>{
        const r = {};
        for (const c of select) {
          const col = throwError !== false ? await cols.get(c) : c;
          if (col) { r[c] = step.raws[c]; }
        }
        return r;
      },
    }, false);

    virtual.all(this, {
      key:_=>step.key,
      label:async _=>step.label,
      before:_=>step.before.wrap,
      isExist:async _=>step.isExist,
      isDirty:_=>step.isDirty,
      isRemoved:_=>step.isRemoved,
      raws:_=>({...step.raws}),
      vals:async _=>cols.map(col=>step.pull(col), { byKey:true }),
      changeList:_=>([...step.changeList]),
      changes:_=>({...step.changes})
    });

  }

  async refs(tableName, colName, filter, cache={}) {
    const table = await this.db.get(tableName);
    const refs = await table.rows.chopByCol(colName, filter, cache);
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