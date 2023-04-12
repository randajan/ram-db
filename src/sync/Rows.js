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
        loader:(rows, bundle, data)=>{
          for (let index in data) {
            const vals = data[index];
            if (!jet.isMapable(vals)) { return; }
            Row.create(rows).set(vals, { throwError:false });
          }

          this.on("beforeReset", this.on("beforeSet", row=>onSave(table, "set", row.live)), false);
          this.on("beforeReset", this.on("beforeUpdate", row=>onSave(table, "update", row.live)), false);
          this.on("beforeReset", this.on("beforeRemove", row=>onSave(table, "remove", row.saved)), false);
        }
      });

      const _p = vault.get(this.uid);

      _p.save = (row)=>{
        const keySaved = row.key;
        const wasRemoved = row.isRemoved;
        const key = row.live.key;
        const isRemoved = row.live.isRemoved;
        
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
        table,
      }, false);

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

      this.init();
    
      let step, key;
      const ck = this.table.cols.primary;
      if (!ck.formula && !ck.resetIf) { key = ck.toRaw(ck.fetch(vals)); } // quick key
      if (key == null) { step = this.initStep(vals); key = step.getKey(); }
      if (key == null) { if (opt.throwError !== false) { throw Error(this.msg("push failed - missing key", vals)); } return; }
    
      const rowFrom = this.get(key, false);
    
      if (opt.update !== false) {
        if (rowFrom) { rowFrom.update(vals, opt); return rowFrom; }
        if (!opt.add) { if (opt.throwError !== false) { throw Error(this.msg("update failed - key not found", key)); } return; }
      }
    
      if (opt.add !== false) {
        if (rowFrom) { if (opt.throwError !== false) { throw Error(this.msg("add failed - duplicate key", key)); } return; }
        const rowTo = Row.create(this, step || this.initStep(vals));
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
      return Step.create(this.table, before);
    }

    initStep(vals) {
      const step = Step.create(this.table);
      if (jet.isMapable(vals)) { step.push(vals); }
      return step;
    }

    chop(name, config={}) {

      config.loader = (chop, bundle)=>{
        const cleanUp = this.on("afterUpdate", row=>{ if (bundle.set(row, false)) { bundle.remove(row); }});
        chop.on("beforeReset", cleanUp, false);
      }

      return super.chop(name, config);
    }

    refs(col, cache={}) {

      const c = this.table.cols(col);
      if (!c.ref) { throw Error(this.msg(`refs('${c.name}') failed - column is not ref`)); }

      if (cache && cache[c.name]) { return cache[c.name]; }

      return this.chop(
        c.name,
        {
          getContext: (row, isSet)=>{
            const val = row[isSet ? "live" : "saved"].get(c.name);
            return c.separator ? val.map(v=>v.key) : val.key;
          },
          cache
        }
      );
  
    }

  }