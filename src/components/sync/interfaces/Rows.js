import jet from "@randajan/jet-core";
import { vault } from "../../uni/consts.js";
import { Chop } from "../privates/Chop.js";
import { Step } from "../privates/Step.js";
import { Row } from "./Row.js";

const { solid } = jet.prop;

const initStep = (table, vals)=>{
  const step = Step.create(table);
  if (jet.isMapable(vals)) { step.push(vals); }
  return step;
}

const save = (bundle, row, silentSave)=>{
  const keySaved = row.key;
  const wasRemoved = row.isRemoved;
  const key = row.live.key;
  const isRemoved = row.live.isRemoved;
  
  const rekey = key !== keySaved;
  const remove = isRemoved !== wasRemoved;
  
  if (key && !isRemoved) {
    if (rekey) { bundle.set(row, true, silentSave); }
    else {
      bundle.run("beforeUpdate", [row, undefined, silentSave]);
      bundle.run("afterUpdate", [row, undefined, silentSave]);
    }
  }
  if (keySaved && (rekey || remove)) { bundle.remove(row, true, silentSave); }

}

export class Rows extends Chop {
    constructor(table, stream) {
      super(`${table.name}.rows`, {
        childName:"row",
        defaultContext:"all",
        stream,
        loader:(rows, bundle, data)=>{
          for (let index in data) {
            const vals = data[index];
            if (!jet.isMapable(vals)) { return; }
            Row.create(rows, _p.onSave).set(vals, { throwError:false, silentSave:true });
          }
        }
      });

      const _p = vault.get(this.uid);
      _p.onSave = (row, silentSave)=>{
        if (this.isLoading) {
          return save(_p.bundle, row, silentSave);
        } else {
          return _p.transactions.execute("saving", _=>save(_p.bundle, row, silentSave));
        }
      }

      solid.all(this, {
        db:table.db,
        table,
      }, false);

      this.on("afterSet", row=>row._markAsSaved());
      this.on("afterUpdate", row=>row._markAsSaved());
      table.db.on("afterReset", _p.recycle, false);

    }

    exist(key, throwError = false) {
      return super.exist(key, undefined, throwError);
    }
  
    get(key, throwError=true) {
      return super.get(key, undefined, throwError);
    }
  
    count(throwError=true) {
      return super.count(undefined, throwError);
    }
  
    getList(throwError=true) {
      return super.getList(undefined, throwError);
    }
  
    getIndex(throwError=true) {
      return super.getIndex(undefined, throwError);
    }

    addOrUpdate(vals, opt={ add:true, update:true, autoSave:true, resetOnError:true, throwError:true }) {
      const { table } = this;
      const _p = vault.get(this.uid);
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

    add(vals, opt={ autoSave:true, resetOnError:true, throwError:true }) {
      opt.add = true;
      opt.update = false;
      return this.addOrUpdate(vals, opt);
    }

    update(vals, opt={ autoSave:true, resetOnError:true, throwError:true }) {
      opt.add = false;
      opt.update = true;
      return this.addOrUpdate(vals, opt);
    }

    addChop(name, opt={}) {
      return super.addChop(name, {
        ...opt,
        loader:(chop, bundle)=>{
          const cleanUp = this.on("afterUpdate", row=>{ if (bundle.set(row, false)) { bundle.remove(row); }});
          chop.on("beforeReset", cleanUp, false);
        }
      });
    }

    chopByCol(colName, filter, cacheAs=true) {
      const c = this.table.cols(colName);

      return this.addChop(
        typeof cacheAs == "string" ? cacheAs : colName,
        {
          useCache:cacheAs,
          getContext: (row, isSet)=>{
            const wrap = row[isSet ? "live" : "saved"];
            if (filter && (filter(wrap)) === false) { return; }
            const val = wrap.get(colName);
            if (!c.separator) { return c._toRaw(val); }
            let res = [];
            for (const v of val) { 
              const r = c._toRaw(v);
              if (r != null) { res.push(r); }
            }
            return res;
          }
        }
      );
  
    }

  }