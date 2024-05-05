import jet from "@randajan/jet-core";
import { events, vault } from "../../uni/consts.js";
import { Chop } from "../privates/Chop.js";
import { Step } from "../privates/Step.js";
import { Row } from "./Row.js";

const { solid } = jet.prop;

const initStep = async (table, vals) => {
  const step = Step.create(table);
  if (jet.isMapable(vals)) { await step.push(vals); }
  return step;
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

    const _p = vault.get(this);

    const save = async (row, opt={}, afterEffect) => {
      const keySaved = await row.key;
      const wasRemoved = await row.isRemoved;
      const key = await row.live.key;
      const isRemoved = await row.live.isRemoved;
    
      const rekey = key !== keySaved;
      const remove = isRemoved !== wasRemoved;
    
      if (key && !isRemoved) {
        if (rekey) { await _p.bundle.set(row, opt, afterEffect); }
        else {
          await _p.bundle.run("beforeUpdate", [row, undefined], opt);
          if (afterEffect) { await afterEffect(row, undefined, opt); }
          await _p.bundle.run("afterUpdate", [row, undefined], opt);
        }
      }
      if (keySaved && (rekey || remove)) { await _p.bundle.remove(row, opt, afterEffect); }
    
    }

    _p.onSave = (...args) => this.isLoading ? save(...args) : _p.transactions.execute("saving", _ => save(...args));

    solid.all(this, {
      db:table.db,
      table,
    }, false);

    //translate primitive events to extra events
    for (const [when, action, name] of events.primitive) {
      this.on(name, async (row, ctx, opt)=>{
        if (this.state === "loading" || opt.silentSave) { return; }
        return _p.bundle.run(when+"Save", [action, row], opt);
      });
      this.on(name, async (row, ctx, opt)=>{
        if (this.state === "loading") { return; }
        return _p.bundle.run(when+"Change", [action, row], opt);
      });
    }

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
    const _p = vault.get(this);
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
        chop.on("afterReset", this.on("beforeUpdate", row=>bundle.remove(row)), false);
        chop.on("afterReset", this.on("afterUpdate", row=>bundle.set(row)), false);
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
        getContext: async row => {
          if (filter && (await filter(row)) === false) { return; }
          const val = await row.saved?.get(colName);
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