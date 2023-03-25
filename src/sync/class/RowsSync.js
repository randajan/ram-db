import jet from "@randajan/jet-core";
import vault from "../../uni/helpers/vault.js";
import RowSync from "./RowSync.js";
import CollectionSync from "./CollectionSync.js";
import StepSync from "./StepSync.js";

const { solid, virtual } = jet.prop;

export class RowsSync extends CollectionSync {
    constructor(table, stream, onChange) {

      const loader = (rows, data)=>{
        jet.map(data, vals=>{
          if (!jet.isMapable(vals)) { return; }
          RowSync.create(this).set(vals, { saveError:false });
        });
      };

      super(`${table.name}.rows`, stream, loader);
      const _p = vault.get(this.uid);

      _p.save = (row)=>{
        const isReady = this.state === "ready";
        const { live:{ key, isRemoved }, key:keySaved, isRemoved:wasRemoved } = row;
        const rekey = key !== keySaved;
        const remove = isRemoved !== wasRemoved;

        if (key && !isRemoved) {
          if (isReady) { onChange(table, (rekey || wasRemoved) ? "add" : "update", row.live); }
          if (rekey) { _p.set(key, row); }
        }

        if (keySaved && (rekey || remove)) {
          if (isReady) { onChange(table, "remove", row.saved); }
          _p.remove(keySaved);
        }
        
      }

      solid.all(this, {
        db:table.db,
        table
      }, false);
      
    }

    seed() { return RowSync.create(this); }

    get(key, opt={ autoCreate:false, missingError:true }) {
      const row = super.get(key, !opt.autoCreate && opt.missingError);
      if (row) { return row; } else if (opt.autoCreate === true) { return this.seed(); }
    }

    addOrUpdate(vals, opt={ add:true, update:true, autoSave:true, resetOnError:true, saveError:true }) {

      this.init();
    
      let step, key;
      const ck = this.table.cols.primary;
      if (!ck.formula && !ck.resetIf) { key = ck.toRaw(ck.fetch(vals)); } // quick key
      if (key == null) { step = this.initStep(vals); key = step.key; }
      if (key == null) { if (opt.saveError !== false) { throw Error(this.msg("push failed - missing key", vals)); } return; }
    
      const rowFrom = this.get(key, { autoCreate:false, missingError:false });
    
      if (opt.update !== false) {
        if (rowFrom) { rowFrom.update(vals, opt); return rowFrom; }
        if (!opt.add) { if (opt.saveError !== false) { throw Error(this.msg("update failed - key not found", key)); } return; }
      }
    
      if (opt.add !== false) {
        if (rowFrom) { if (opt.saveError !== false) { throw Error(this.msg("add failed - duplicate key", key)); } return; }
        const rowTo = RowSync.create(this, step || this.initStep(vals));
        if (opt.autoSave !== false) { rowTo.save(opt); }
        return rowTo;
      }
    
    }

    add(vals, opt={ autoSave:true, resetOnError:true, saveError:true }) {
      opt.add = true;
      opt.update = false;
      return this.addOrUpdate(vals, opt);
    }

    update(vals, opt={ autoSave:true, resetOnError:true, saveError:true }) {
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


  }

  export default RowsSync;