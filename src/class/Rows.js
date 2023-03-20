import jet from "@randajan/jet-core";
import Collection from "./parts/Collection.js";
import Row from "./Row.js";
import Record from "./Record.js";

let _nextPid = 1;

export default class Rows extends Collection {
    constructor(table, builder, onChange) {
      let _b; //bundle will be set by calling super

      onChange = Function.jet.to(onChange);

      const seed = async (key, vals, autoSave=true, saveError=true)=>{
        const row = this.get(key);
        if (jet.isMapable(vals)) { await row.set(vals, autoSave, saveError); }
        return row;
      };

      const push = async (vals, create=true, update=true, autoSave=true, saveError=true)=>{
        const c = await table.cols.primary;
        let row, key;
  
        if (!c.formula && !c.resetIf) { key = c.toRaw(c.fetch(vals)); } // quick key
        if (key == null) { row = await seed(vals, false); key = row.key; }
  
        if (key == null) { if (saveError) { this.throwError("missing key!", vals); } return; }
        const tr = await prop("index")[key];
  
        if (update) {
          if (tr) { return await tr.update(vals, autoSave, saveError); }
          if (!create) { if (saveError) { this.throwError("not found. Update failed!", key); } return; }
        }
  
        if (create) {
          if (tr) { if (saveError) { this.throwError("duplicate key. Create failed!", key); } return; }
          return !row ? await seed(vals, autoSave, saveError) : autoSave ? await row.save(saveError) : row;
        }
  
      }

      const onChangeHandler = async (row, newKey, changes)=>{
        const { key, isDirty } = row;

        const event = !changes ? "remove" : !_p.index[key] ? "add" : "update";

        if (event !== "remove") {
          if (newKey == null) { throw "missing key!"; }
          if (_p.index[newKey] && _p.index[newKey] !== row) { throw "duplicate key!"; } //duplicate row
        }
        
        if (this.state === "ready" && (isDirty || event === "remove")) {
          await onChange(event, row, newKey, changes);
        }

        if (event === "remove" || key !== newKey) {
          delete _p.index[key];
          const x = _p.list.indexOf(row);
          if (x >=0) { _p.list.splice(x, 1); }
        }

        if (event === "add" || key !== newKey) {
          _p.index[newKey] = row;
          _p.list.push(row);
        }
        
      }

      const createMask = (key, getScheme)=>new Row(this, key, getScheme, onChange);
      const createScheme = (key, values)=>{
        return { };
      }

      const onInit = async rows=>{
        await Promise.all(jet.forEach(rows, async (values, key)=>seed(key, values, true, false)));
        //this.save();
      }

      super({
        isSync:false,
        createMask,
        createScheme,
        builder,
        onInit,
        bundleHook:bundle=>_b=bundle,
        getErrMsg:(type, key)=>this.msg("is missing!", key),
      },
      {
        table:{value:table},
        add:{value:(vals, autoSave=true, saveError=true)=>push(vals, true, false, autoSave, saveError)},
        update:{value:(vals, autoSave=true, saveError=true)=>push(vals, false, true, autoSave, saveError)},
        addOrUpdate:{value:(vals, autoSave=true, saveError=true)=>push(vals, true, true, autoSave, saveError)}
      });
      
    }

    seed() {
      return new Record(this, _nextPid++);
    }

    msg(text, key) {
      key = String.jet.to(key);
      return this.table.msg((key ? " row '"+key+"' " : "") + text);
    }

  }