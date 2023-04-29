import jet from "@randajan/jet-core";
import { vault } from "../../uni/tools.js";
import { Chop } from "../privates/Chop.js";
import { Step } from "../privates/Step.js";
import { Row } from "./Row.js";

const { solid, virtual } = jet.prop;

const save = async (bundle, row, silentSave)=>{
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
        childName:"row",
        defaultContext:"all",
        stream,
        loader:async (rows, bundle, data)=>{
          for (let index in data) {
            const vals = data[index];
            if (!jet.isMapable(vals)) { return; }
            await Row.create(rows, _p.onSave).set(vals, { throwError:false, silentSave:true });
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

      table.db.on("afterReset", _p.recycle, false);

    }

    async exist(key, throwError = false) {
      return super.exist(key, undefined, throwError);
    }
  
    async get(key, throwError=true) {
      return super.get(key, undefined, throwError);
    }
  
    async count(throwError=true) {
      return super.count(undefined, throwError);
    }
  
    async getList(throwError=true) {
      return super.getList(undefined, throwError);
    }
  
    async getIndex(throwError=true) {
      return super.getIndex(undefined, throwError);
    }

    async addOrUpdate(vals, opt={ add:true, update:true, autoSave:true, resetOnError:true, throwError:true }) {
      const _p = vault.get(this.uid);
      await this.untilLoaded(); //await load
      await _p.transactions.last; //await any operation
    
      let step, key;
      const ck = await this.table.cols.primary;
      if (!ck.formula && !ck.resetIf) { key = ck.toRaw(ck.fetch(vals)); } // quick key
      if (key == null) { step = await this.initStep(vals); key = step.getKey(); }
      if (key == null) { if (opt.throwError !== false) { throw Error(this.msg("push failed - missing key", vals)); } return; }
    
      const rowFrom = await this.get(key, false);
    
      if (opt.update !== false) {
        if (rowFrom) { await rowFrom.update(vals, opt); return rowFrom; }
        if (!opt.add) { if (opt.throwError !== false) { throw Error(this.msg("update failed - key not found", key)); } return; }
      }
    
      if (opt.add !== false) {
        if (rowFrom) { if (opt.throwError !== false) { throw Error(this.msg("add failed - duplicate key", key)); } return; }
        const rowTo = Row.create(this, _p.onSave, step || await this.initStep(vals));
        if (opt.autoSave !== false) { await rowTo.save(opt); }
        return rowTo;
      }
    
    }

    async add(vals, opt={ autoSave:true, resetOnError:true, throwError:true }) {
      opt.add = true;
      opt.update = false;
      return this.addOrUpdate(vals, opt);
    }

    async update(vals, opt={ autoSave:true, resetOnError:true, throwError:true }) {
      opt.add = false;
      opt.update = true;
      return this.addOrUpdate(vals, opt);
    }

    nextStep(before) {
      return Step.create(this.table, before);
    }

    async initStep(vals) {
      const step = Step.create(this.table);
      if (jet.isMapable(vals)) { await step.push(vals); }
      return step;
    }

    chop(name, config={}, cache={}) {
      if (cache[name]) { return cache[name]; }

      config.loader = (chop, bundle)=>{
        const cleanUp = this.on("afterUpdate", async row=>{ if (await bundle.set(row, false)) { bundle.remove(row); }});
        chop.on("beforeReset", cleanUp, false);
      }

      return super.chop(name, config, cache);
    }

    async chopByCol(colName, filter, cache={}) {
      if (cache[colName]) { return cache[colName]; }

      const c = await this.table.cols(colName);

      return this.chop(
        colName,
        {
          getContext: async (row, isSet)=>{
            const wrap = row[isSet ? "live" : "saved"];
            if (filter && (await filter(wrap)) === false) { return; }
            const val = await wrap.get(colName);
            if (!c.separator) { return c._toRaw(val); }
            let res = [];
            for (const v of val) { 
              const r = c._toRaw(v);
              if (r != null) { res.push(r); }
            }
            return res;
          }
        },
        cache
      );
  
    }

  }