import jet from "@randajan/jet-core";
import { vault } from "../tools.js";

const { solid, virtual } = jet.prop;

export class Row extends jet.types.Plex {

  static create(rows, iniStep) { return new Row(rows, iniStep); };

  constructor(rows, iniStep) {
    const { db, table } = rows;
    const _p = {};
    const save = vault.get(rows.uid).save;

    const get = (col, throwError=true) => _p.live.get(col, throwError);
    const push = async (vals, force, opt = { autoSave: true, resetOnError: true, throwError: true }) => {
      return (await _p.live.push(vals, force)) && (opt.autoSave === false || await this.save(opt));
    }

    super(get);

    solid.all(this, {
      db,
      table,
      rows,
      get,
      set: async (vals, opt = { autoSave: true, resetOnError: true, throwError: true }) => push(vals, true, opt),
      update: async (vals, opt = { autoSave: true, resetOnError: true, throwError: true }) => push(vals, false, opt),
      reset: async _ => !this.isDirty || _p.live.reset(),
      remove: async (opt = { autoSave: true, resetOnError: true, throwError: true }) => {
        return _p.live.remove() && (opt.autoSave === false || await this.save(opt));
      },
      save: async (opt = { resetOnError: true, throwError: true }) => {
        if (!this.isDirty) { return true; }
        try {
          await save(this);
          _p.live = rows.nextStep(_p.saved = _p.live);
          return true;
        } catch (err) {
          if (opt.resetOnError !== false) { await this.reset(); }
          if (opt.throwError !== false) { throw err; }
          console.warn(this.msg(err?.message || "unknown error"), err?.stack);
          return false;
        }
      },

    }, false);

    virtual.all(this, {
      key: _ => _p.saved?.key,
      label: async _ => _p.saved?.label,
      isRemoved: _ => !_p.saved || _p.saved.isRemoved,
      isExist: async _ => !!(await _p.saved?.isExist),
      isDirty: _ => _p.live.isDirty,
      live: _ => _p.live.wrap,
      saved: _ => _p.saved?.wrap
    });

    _p.live = iniStep || rows.nextStep();

  }

  msg(text) {
    return this.rows.msg(text, this.key || JSON.stringify(this.raws));
  }

  getKey(isSet) { return isSet ? this.live.key : this.key; }

  toJSON() {
    return this.key || null;
  }

  toString() {
    return this.key || "";
  }

}
