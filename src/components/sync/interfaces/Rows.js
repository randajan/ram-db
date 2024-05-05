import jet from "@randajan/jet-core";
import { events, vault } from "../../uni/consts.js";
import { Chop } from "../privates/Chop.js";
import { Step } from "../privates/Step.js";
import { Row } from "./Row.js";

const { solid } = jet.prop;

const initStep = (table, vals) => {
  const step = Step.create(table);
  if (jet.isMapable(vals)) { step.push(vals); }
  return step;
}

export class Rows extends Chop {
  constructor(table, stream) {

    super(`${table.name}.rows`, {
      childName: "row",
      defaultContext: "all",
      stream,
      loader: (rows, bundle, data) => {
        for (let index in data) {
          const vals = data[index];
          if (!jet.isMapable(vals)) { return; }
          Row.create(rows, _p.onSave).set(vals, { throwError: false, silentSave: true });
        }
      }
    });

    const _p = vault.get(this);

    const save = (row, opt={}, afterEffect) => {
      const keySaved = row.key;
      const wasRemoved = row.isRemoved;
      const key = row.live.key;
      const isRemoved = row.live.isRemoved;
    
      const rekey = key !== keySaved;
      const remove = isRemoved !== wasRemoved;
    
      if (key && !isRemoved) {
        if (rekey) { _p.bundle.set(row, opt, afterEffect); }
        else {
          _p.bundle.run("beforeUpdate", [row, undefined], opt);
          if (afterEffect) { afterEffect(row, undefined, opt); }
          _p.bundle.run("afterUpdate", [row, undefined], opt);
        }
      }
      if (keySaved && (rekey || remove)) { _p.bundle.remove(row, opt, afterEffect); }
    
    }

    _p.onSave = (...args) => this.isLoading ? save(...args) : _p.transactions.execute("saving", _ => save(...args));

    solid.all(this, {
      db:table.db,
      table,
    }, false);

    //translate primitive events to extra events
    for (const [when, action, name] of events.primitive) {
      this.on(name, (row, ctx, opt)=>{
        if (this.state === "loading" || opt.silentSave) { return; }
        return _p.bundle.run(when+"Save", [action, row], opt);
      });
      this.on(name, (row, ctx, opt)=>{
        if (this.state === "loading") { return; }
        return _p.bundle.run(when+"Change", [action, row], opt);
      });
    }

  }

  exist(key, throwError = false) {
    return super.exist(key, undefined, throwError);
  }

  get(key, throwError = true) {
    return super.get(key, undefined, throwError);
  }

  count(throwError = true) {
    return super.count(undefined, throwError);
  }

  getList(throwError = true) {
    return super.getList(undefined, throwError);
  }

  getIndex(throwError = true) {
    return super.getIndex(undefined, throwError);
  }

  addOrUpdate(vals, opt = { add: true, update: true, autoSave: true, resetOnError: true, throwError: true }) {
    const { table } = this;
    const _p = vault.get(this);
    this.untilLoaded(); //load
    _p.transactions.last; //any operation

    let step, key;
    const ck = table.cols.primary;
    if (!ck.formula && !ck.resetIf) { key = ck.toRaw(ck.fetch(vals)); } // quick key
    if (key == null) { step = initStep(table, vals); key = step.getKey(); }
    if (key == null) { if (opt.throwError !== false) { throw Error(this.msg("push failed - missing key", vals)); } return; }

    const rowFrom = this.get(key, false);

    if (opt.update !== false) {
      if (rowFrom) { rowFrom.update(vals, opt); return rowFrom; }
      if (!opt.add) { if (opt.throwError !== false) { throw Error(this.msg("update failed - key not found", key)); } return; }
    }

    if (opt.add !== false) {
      if (rowFrom) { if (opt.throwError !== false) { throw Error(this.msg("add failed - duplicate key", key)); } return; }
      const rowTo = Row.create(this, _p.onSave, step || initStep(table, vals));
      if (opt.autoSave !== false) { rowTo.save(opt); }
      return rowTo;
    }

  }

  add(vals, opt = { autoSave: true, resetOnError: true, throwError: true }) {
    opt.add = true;
    opt.update = false;
    return this.addOrUpdate(vals, opt);
  }

  update(vals, opt = { autoSave: true, resetOnError: true, throwError: true }) {
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

  chopByCol(colName, filter, cacheAs = true, morphSeparator="$$") {
    const c = this.table.cols(colName);
    const { separator, ref, isMorph } = c;
    const extra = { isRef:!!ref, isMorph };
    const toRaw = !isMorph ? v=>c._toRaw(v) : v=>{ if (v) { return v.table.name + morphSeparator + v.key } }
    if (isMorph) { extra.morphSeparator = morphSeparator; }

    return this.addChop(
      typeof cacheAs == "string" ? cacheAs : colName,
      {
        useCache: cacheAs,
        getContext: row => {
          if (filter && (filter(row)) === false) { return; }
          const val = row.saved?.get(colName);
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