import jet from "@randajan/jet-core";
import { Step } from "../privates/Step";

const { solid, virtual } = jet.prop;

export class Row extends jet.types.Plex {

  static create(rows, onSave, iniStep) { return new Row(rows, onSave, iniStep); };

  constructor(rows, onSave, iniStep) {
    const { db, table } = rows;
    const _p = {};

    const get = (col, throwError=true) => _p.live.get(col, throwError);
    const push = async (vals, force, opt = { autoSave: true, resetOnError: true, throwError: true, silentSave:false }) => {
      return (await _p.live.push(vals, force)) && (opt.autoSave === false || await this.save(opt));
    }

    const markAsSaved = _=>{ _p.live = Step.create(table, _p.saved = _p.live); }

    super(get);

    solid.all(this, {
      db,
      table,
      rows,
      get,
      getRaw: (col, throwError=true) => _p.live.getRaw(col, throwError),
      eval:(selector, opt = {}) => _p.live.eval(selector, opt),
      set: async (vals, opt = { autoSave: true, resetOnError: true, throwError: true }) => push(vals, true, opt),
      update: async (vals, opt = { autoSave: true, resetOnError: true, throwError: true }) => push(vals, false, opt),
      reset: async _ => !this.isDirty || _p.live.reset(),
      remove: async (opt = { autoSave: true, resetOnError: true, throwError: true }) => {
        return _p.live.remove() && (opt.autoSave === false || await this.save(opt));
      },
      save: async (opt = { resetOnError: true, throwError: true, silentSave:false }) => {
        if (!this.isDirty) { return true; }
        const live = _p.live;
        try {
          live.lock();
          await onSave(this, { throwError:true, silentSave:opt.silentSave === true }, markAsSaved);
          live.retire(); // for duration of on("after...") effects row.saved.before is still present
          return true;
        } catch (err) {
          live.unlock();
          if (opt.resetOnError !== false) { await this.reset(); }
          if (opt.throwError !== false) { throw err; }
          console.warn(this.msg(err?.message || "unknown error"), err?.stack);
          return false;
        }
      }
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

    _p.live = iniStep || Step.create(table);

  }

  msg(text) {
    return this.rows.msg(text, this.key || JSON.stringify(this.raws));
  }

  getKey(isSet) { return isSet ? this.live.key : this.key; }

  toJSON() {
    return this.key;
  }

  toString() {
    return this.key || "";
  }

}
