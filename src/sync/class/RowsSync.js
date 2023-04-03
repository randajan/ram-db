import jet from "@randajan/jet-core";
import vault from "../../uni/vault.js";
import { ChopSync } from "./ChopSync.js";
import { RowSync } from "./RowSync.js";
import { StepSync } from "./StepSync.js";
import { formatKey } from "../../uni/tools.js";

const { solid } = jet.prop;

export class RowsSync extends ChopSync {
    constructor(table, stream) {
      super(`${table.name}.rows`, {
        childName:"row",
        defaultContext:"all",
        stream,
        loader:(rows, bundle, data)=>{
          for (let index in data) {
            const vals = data[index];
            if (!jet.isMapable(vals)) { return; }
            RowSync.create(rows).set(vals, { throwError:false });
          }
        }
      });

      const _p = vault.get(this.uid);
      table.db.on("afterReset", _p.recycle, false);

      _p.refs = {};

      _p.save = (row)=>{
        const { live:{ key, isRemoved }, key:keySaved, isRemoved:wasRemoved } = row;
        
        const rekey = key !== keySaved;
        const remove = isRemoved !== wasRemoved;

        if (key && !isRemoved) {
          if (rekey) { _p.bundle.set(row); }
          else {
            _p.bundle.run("beforeUpdate", [row]);
            _p.bundle.run("afterUpdate", [row]);
          }
        }
        if (keySaved && (rekey || remove)) { _p.bundle.remove(row); }

      }

      solid.all(this, {
        db:table.db,
        table
      }, false);
      
    }

    exist(key, throwError = false) {
      return super.exist(key, undefined, throwError);
    }
  
    get(key, opt={ autoCreate:false, throwError:true }) {
      const row = super.get(key, undefined, !opt.autoCreate && opt.throwError);
      if (row) { return row; } else if (opt.autoCreate === true) { return this.seed(); }
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

    seed() { return RowSync.create(this); }

    addOrUpdate(vals, opt={ add:true, update:true, autoSave:true, resetOnError:true, throwError:true }) {

      this.init();
    
      let step, key;
      const ck = this.table.cols.primary;
      if (!ck.formula && !ck.resetIf) { key = ck.toRaw(ck.fetch(vals)); } // quick key
      if (key == null) { step = this.initStep(vals); key = step.getKey(); }
      if (key == null) { if (opt.throwError !== false) { throw Error(this.msg("push failed - missing key", vals)); } return; }
    
      const rowFrom = this.get(key, { autoCreate:false, throwError:false });
    
      if (opt.update !== false) {
        if (rowFrom) { rowFrom.update(vals, opt); return rowFrom; }
        if (!opt.add) { if (opt.throwError !== false) { throw Error(this.msg("update failed - key not found", key)); } return; }
      }
    
      if (opt.add !== false) {
        if (rowFrom) { if (opt.throwError !== false) { throw Error(this.msg("add failed - duplicate key", key)); } return; }
        const rowTo = RowSync.create(this, step || this.initStep(vals));
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

    nextStep(before) {
      return StepSync.create(this.table, before);
    }

    initStep(vals) {
      const step = StepSync.create(this.table);
      if (jet.isMapable(vals)) { step.push(vals); }
      return step;
    }

    chop(name, getContext, defaultContext) {
      const chop = super.chop(name, getContext, defaultContext);

      chop.on("afterInit", bundle=>{
        const cleanUp = this.on("afterUpdate", row=>{ if (bundle.set(row, false)) { bundle.remove(row); }});
        chop.on("beforeReset", cleanUp, false);
      });

      return chop;
    }

    refs(col) {
      const _p = vault.get(this.uid);
      col = formatKey(col);

      if (_p.refs[col]) { return _p.refs[col]; }

      const c = this.table.cols(col);
      if (!c.ref) { throw Error(this.msg(`refs('${col}') failed - column is not ref`)); }

      return _p.refs[col] = this.chop(
        col,
        (row, isSet)=>{
          const val = row[isSet ? "live" : "saved"].get(col);
          return c.separator ? val.map(v=>v.key) : val.key;
        }
      );
  
    }

  }