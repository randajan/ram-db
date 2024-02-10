import jet from "@randajan/jet-core";
import { vault } from "../../uni/consts.js";
import { Chop } from "../privates/Chop.js";
import { Step } from "../privates/Step.js";
import { Row } from "./Row.js";

const { solid } = jet.prop;

const initStep = async (table, vals) => {
  const step = Step.create(table);
  if (jet.isMapable(vals)) { await step.push(vals); }
  return step;
}

const save = async (bundle, row, silentSave) => {
  const keySaved = await row.key;
  const wasRemoved = await row.isRemoved;
  const key = await row.live.key;
  const isRemoved = await row.live.isRemoved;

  const rekey = key !== keySaved;
  const remove = isRemoved !== wasRemoved;

  if (key && !isRemoved) {
    if (rekey) { await bundle.set(row, true, silentSave); }
    else {
      await bundle.run("beforeUpdate", [row, undefined, silentSave]);
      await bundle.run("afterUpdate", [row, undefined, silentSave]);
    }
  }
  if (keySaved && (rekey || remove)) { await bundle.remove(row, true, silentSave); }

}

export class Rows extends Chop {
  constructor(table, stream) {
    super(`${table.name}.rows`, {
      childName: "row",
      defaultContext: "all",
      stream,
      loader: async (rows, bundle, data) => {
        for (let index in data) {
          const vals = data[index];
          if (!jet.isMapable(vals)) { return; }
          await Row.create(rows, _p.onSave).set(vals, { throwError: false, silentSave: true });
        }
      }
    });

    const _p = vault.get(this.uid);
    _p.onSave = (row, silentSave) => {
      if (this.isLoading) {
        return save(_p.bundle, row, silentSave);
      } else {
        return _p.transactions.execute("saving", _ => save(_p.bundle, row, silentSave));
      }
    }

    solid.all(this, {
      db: table.db,
      table,
    }, false);

    this.on("afterSet", row=>row._markAsSaved());
    this.on("afterUpdate", row=>row._markAsSaved());

    table.db.on("afterReset", _p.recycle, false);

  }

  async exist(key, throwError = false) {
    return super.exist(key, undefined, throwError);
  }

  async get(key, throwError = true) {
    return super.get(key, undefined, throwError);
  }

  async count(throwError = true) {
    return super.count(undefined, throwError);
  }

  async getList(throwError = true) {
    return super.getList(undefined, throwError);
  }

  async getIndex(throwError = true) {
    return super.getIndex(undefined, throwError);
  }

  async addOrUpdate(vals, opt = { add: true, update: true, autoSave: true, resetOnError: true, throwError: true }) {
    const { table } = this;
    const _p = vault.get(this.uid);
    await this.untilLoaded(); //await load
    await _p.transactions.last; //await any operation

    let step, key;
    const ck = await table.cols.primary;
    if (!ck.formula && !ck.resetIf) { key = ck.toRaw(ck.fetch(vals)); } // quick key
    if (key == null) { step = await initStep(table, vals); key = step.getKey(); }
    if (key == null) { if (opt.throwError !== false) { throw Error(this.msg("push failed - missing key", vals)); } return; }

    const rowFrom = await this.get(key, false);

    if (opt.update !== false) {
      if (rowFrom) { await rowFrom.update(vals, opt); return rowFrom; }
      if (!opt.add) { if (opt.throwError !== false) { throw Error(this.msg("update failed - key not found", key)); } return; }
    }

    if (opt.add !== false) {
      if (rowFrom) { if (opt.throwError !== false) { throw Error(this.msg("add failed - duplicate key", key)); } return; }
      const rowTo = Row.create(this, _p.onSave, step || await initStep(table, vals));
      if (opt.autoSave !== false) { await rowTo.save(opt); }
      return rowTo;
    }

  }

  async add(vals, opt = { autoSave: true, resetOnError: true, throwError: true }) {
    opt.add = true;
    opt.update = false;
    return this.addOrUpdate(vals, opt);
  }

  async update(vals, opt = { autoSave: true, resetOnError: true, throwError: true }) {
    opt.add = false;
    opt.update = true;
    return this.addOrUpdate(vals, opt);
  }

  addChop(name, opt = {}) {
    return super.addChop(name, {
      ...opt,
      loader: (chop, bundle) => {
        const cleanUp = this.on("afterUpdate", async row => { if (await bundle.set(row, false)) { bundle.remove(row); } });
        chop.on("beforeReset", cleanUp, false);
      }
    });
  }

  async chopByCol(colName, filter, cacheAs = true, morphSeparator="$$") {
    const c = await this.table.cols(colName);
    const { separator, ref, isMorph } = c;
    const extra = { isRef:!!ref, isMorph };
    const toRaw = !isMorph ? v=>c._toRaw(v) : v=>{ if (v) { return v.table.name + morphSeparator + v.key } }
    if (isMorph) { extra.morphSeparator = morphSeparator; }

    return this.addChop(
      typeof cacheAs == "string" ? cacheAs : colName,
      {
        useCache: cacheAs,
        getContext: async (row, isSet) => {
          const wrap = row[isSet ? "live" : "saved"];
          if (filter && (await filter(wrap)) === false) { return; }
          const val = await wrap.get(colName);
          if (!separator) { return toRaw(val, row); }
          let res = [];
          for (const v of val) {
            const r = toRaw(v, row);
            if (r != null) { res.push(r); }
          }
          return res;
        },
        extra
      }
    );

  }

}