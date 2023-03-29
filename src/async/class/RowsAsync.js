import jet from "@randajan/jet-core";
import vault from "../../uni/helpers/vault.js";
import ChopAsync from "./ChopAsync.js";
import RowAsync from "./RowAsync.js";
import StepAsync from "./StepAsync.js";

const { solid, virtual } = jet.prop;

export class RowsAsync extends ChopAsync {
    constructor(table, stream, onChange) {
      super(`${table.name}.rows`, {
        stream,
        loader:async (rows, data)=>{

          for (let index in data) {

            const vals = data[index];
            if (!jet.isMapable(vals)) { return; }
            
            await RowAsync.create(rows).set(vals, { saveError:false });
          }

          rows.on("afterSet", async (self, row)=>onChange(table, "set", row.live));
          rows.on("afterRemove", async (self, row)=>onChange(table, "remove", row.saved));

        },
        childName:"row"
      });

      const _p = vault.get(this.uid);

      _p.save = async (row)=>{
        const keySaved = await row.key;
        const wasRemoved = await row.isRemoved;
        const key = await row.live.key;
        const isRemoved = await row.live.isRemoved;

        const rekey = key !== keySaved;
        const remove = isRemoved !== wasRemoved;

        if (key && !isRemoved) {
          if (rekey) { await _p.set(row, key); }
          else { onChange(table, "update", row.live); }
        }
        if (keySaved && (rekey || remove)) { await _p.remove(row); }

      }

      solid.all(this, {
        db:table.db,
        table
      }, false);
      
    }

    seed() { return RowAsync.create(this); }

    async get(key, opt={ autoCreate:false, missingError:true }) {
      const row = super.get(key, !opt.autoCreate && opt.missingError);
      if (row) { return row; } else if (opt.autoCreate === true) { return this.seed(); }
    }

    async addOrUpdate(vals, opt={ add:true, update:true, autoSave:true, resetOnError:true, saveError:true }) {

      await this.init();
    
      let step, key;
      const ck = await this.table.cols.primary;
      if (!ck.formula && !ck.resetIf) { key = await ck.toRaw(ck.fetch(vals)); } // quick key
      if (key == null) { step = await this.initStep(vals); key = step.key; }
      if (key == null) { if (opt.saveError !== false) { throw Error(this.msg("push failed - missing key", vals)); } return; }
    
      const rowFrom = await this.get(key, { autoCreate:false, missingError:false });
    
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


  }

  export default RowsAsync;