import jet from "@randajan/jet-core";
import { vault } from "../tools.js";
import { Chop } from "./Chop.js";
import { Row } from "./Row.js";
import { Step } from "./Step.js";
import { formatKey } from "../tools.js";

const { solid, virtual } = jet.prop;

export class Rows extends Chop {
    constructor(table, stream, onSave) {
      super(`${table.name}.rows`, {
        childName:"row",
        defaultContext:"all",
        stream,
        loader:async (rows, bundle, data)=>{
          for (let index in data) {
            const vals = data[index];
            if (!jet.isMapable(vals)) { return; }
            await Row.create(rows).set(vals, { throwError:false });
          }

          this.on("beforeReset", this.on("beforeSet", async row=>onSave(table, "set", row.live)), false);
          this.on("beforeReset", this.on("beforeUpdate", async row=>onSave(table, "update", row.live)), false);
          this.on("beforeReset", this.on("beforeRemove", async row=>onSave(table, "remove", row.saved)), false);
        }
      });

      const _p = vault.get(this.uid);

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
            await _p.bundle.run("beforeUpdate", [row]);
            await _p.bundle.run("afterUpdate", [row]);
          }
        }
        if (keySaved && (rekey || remove)) { await _p.bundle.remove(row); }

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

      await this.init();
    
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
        const rowTo = Row.create(this, step || await this.initStep(vals));
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

    chop(name, getContext, defaultContext) {
      const chop = super.chop(name, getContext, defaultContext);

      chop.on("afterInit", bundle=>{
        const cleanUp = this.on("afterUpdate", async row=>{ if (await bundle.set(row, false)) { bundle.remove(row); }});
        chop.on("beforeReset", cleanUp, false);
      });

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