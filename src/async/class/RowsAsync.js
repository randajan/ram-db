import jet from "@randajan/jet-core";
import vault from "../../uni/vault.js";
import { ChopAsync } from "./ChopAsync.js";
import { RowAsync } from "./RowAsync.js";
import { StepAsync } from "./StepAsync.js";
import { formatKey } from "../../uni/tools.js";

const { solid } = jet.prop;

export class RowsAsync extends ChopAsync {
    constructor(table, stream) {
      super(`${table.name}.rows`, {
        childName:"row",
        defaultContext:"all",
        stream,
        loader:async (rows, data)=>{
          for (let index in data) {
            const vals = data[index];
            if (!jet.isMapable(vals)) { return; }
            await RowAsync.create(rows).set(vals, { saveError:false });
          }
        }
      });

      const _p = vault.get(this.uid);
      table.db.on("afterReset", _p.recycle, false);

      _p.refs = {};

      _p.save = async (row)=>{
        const keySaved = await row.key;
        const wasRemoved = await row.isRemoved;
        const key = await row.live.key;
        const isRemoved = await row.live.isRemoved;
        
        const rekey = key !== keySaved;
        const remove = isRemoved !== wasRemoved;

        if (key && !isRemoved) {
          if (rekey) { await _p.bundle.set(row); }
          else {
            await _p.bundle.runHard("beforeUpdate", [row]);
            await _p.bundle.runSoft("afterUpdate", [row]);
          }
        }
        if (keySaved && (rekey || remove)) { await _p.bundle.remove(row); }

      }

      solid.all(this, {
        db:table.db,
        table
      }, false);
      
    }

    async exist(key, throwError = false) {
      return super.exist(key, undefined, throwError);
    }
  
    async get(key, opt={ autoCreate:false, throwError:true }) {
      const row = await super.get(key, undefined, !opt.autoCreate && opt.throwError);
      if (row) { return row; } else if (opt.autoCreate === true) { return this.seed(); }
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

    seed() { return RowAsync.create(this); }

    async addOrUpdate(vals, opt={ add:true, update:true, autoSave:true, resetOnError:true, saveError:true }) {

      await this.init();
    
      let step, key;
      const ck = await this.table.cols.primary;
      if (!ck.formula && !ck.resetIf) { key = await ck.toRaw(ck.fetch(vals)); } // quick key
      if (key == null) { step = await this.initStep(vals); key = step.getKey(); }
      if (key == null) { if (opt.saveError !== false) { throw Error(this.msg("push failed - missing key", vals)); } return; }
    
      const rowFrom = await this.get(key, { autoCreate:false, throwError:false });
    
      if (opt.update !== false) {
        if (rowFrom) { await rowFrom.update(vals, opt); return rowFrom; }
        if (!opt.add) { if (opt.saveError !== false) { throw Error(this.msg("update failed - key not found", key)); } return; }
      }
    
      if (opt.add !== false) {
        if (rowFrom) { if (opt.saveError !== false) { throw Error(this.msg("add failed - duplicate key", key)); } return; }
        const rowTo = RowAsync.create(this, step || await this.initStep(vals));
        if (opt.autoSave !== false) { await rowTo.save(opt); }
        return rowTo;
      }
    
    }

    async add(vals, opt={ autoSave:true, resetOnError:true, saveError:true }) {
      opt.add = true;
      opt.update = false;
      return this.addOrUpdate(vals, opt);
    }

    async update(vals, opt={ autoSave:true, resetOnError:true, saveError:true }) {
      opt.add = false;
      opt.update = true;
      return this.addOrUpdate(vals, opt);
    }

    nextStep(before) {
      return StepAsync.create(this.table, before);
    }

    async initStep(vals) {
      const step = StepAsync.create(this.table);
      if (jet.isMapable(vals)) { await step.push(vals); }
      return step;
    }

    chop(name, getContext, defaultContext) {
      const chop = super.chop(name, getContext, defaultContext);
      const _p = vault.get(chop.uid);

      if (chop) {
        this.on("afterUpdate", async row=>{
          if (chop.state !== "ready") { return; }
          if (!(await _p.bundle.set(row, false))) { return; }
          return _p.bundle.remove(row);
        });
      }

      return chop;
    }

    async refs(col) {
      const _p = vault.get(this.uid);
      col = formatKey(col);

      if (_p.refs[col]) { return _p.refs[col]; }

      const c = await this.table.cols(col);
      if (!c.ref) { throw Error(this.msg(`refs('${col}') failed - column is not ref`)); }

      return _p.refs[col] = this.chop(
        col,
        async (row, isSet)=>{
          const val = await row[isSet ? "live" : "saved"].get(col);
          return c.separator ? Promise.all(val.map(v=>v.key)) : val.key;
        }
      );
  
    }

  }