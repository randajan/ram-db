import jet from "@randajan/jet-core";
import { Table } from "../../dist/index.js";
import { addTrait } from "../helpers.js";

const knownTraits = new Set();

const traitRemote = (col, name)=>{
    knownTraits.add(addTrait(col, name,
        _=>col.table.cols[name] === col,
        _=>col.table.cols[name] = col.name,
        "is", "as"
    ));
};

const traitPrivate = (col, name, type, keepDefault, validate)=>{
    let _p = keepDefault ? type.jet.create() : undefined;
    knownTraits.add(addTrait(col, name, 
        _=>_p,
        val=>{
            col.table.cols.isNotState("loading", "set '"+String.jet.to(val)+"'", name);
            val = (keepDefault || val != null) ? type.jet.to(val) : undefined;
            if (validate) { validate(val); }
            _p = val;
            return col;
        }
    
    ));
};
  
export default class Column extends jet.types.Plex {

    static is(col) { return col instanceof Column; }

    constructor(table, name) {
        super();

        const enumerable = true;
        Object.defineProperties(this, {
            table:{value:table},
            name:{enumerable, value:name},
            isReal:{enumerable, get:_=>!this.isVirtual}
        });

        traitRemote(this, "primary");
        traitRemote(this, "label");
        traitPrivate(this, "isReadonly", Function, false);
        traitPrivate(this, "resetIf", Function, false);
        traitPrivate(this, "init", Function, false);
        traitPrivate(this, "formula", Function, false, val=>{
            if (val != null || !this.isVirtual) { return }
            this.throwError("virtual columns require formulas to be set"); 
        });
        traitPrivate(this, "ref", Function, false);
        traitPrivate(this, "separator", String, true);
        traitPrivate(this, "isVirtual", Boolean, true, val=>{
            if (!val || this.formula) { return }
            this.throwError("virtual columns require formulas to be set"); 
        });

    }

    set(name, schema) {
        const isArray = !Object.jet.is(name);
        jet.map(name, (value, id)=>{
            const trait = isArray ? value : id;
            if (!trait) { this.throwError(`trait name missing`); }
            if (!knownTraits.has(trait)) { this.throwError(`unknown trait '${trait}'`); }
            this[trait] = isArray ? schema : value;
        });
        return this;
    }

    throwError(msg) { this.table.cols.throwError(msg, this.name);}

    toRaw(val) {
        const separator = this.separator;
        if (!(separator && Array.jet.is(val))) { return String.jet.to(val); }
        let raw = "";
        for (let i in val) {
            const v = val[i];
            if (jet.isFull(v)) { raw += (raw ? separator : "") + String.jet.to(v); }
        }
        return raw || null;
    }

    toVal(raw, row, autoCreateRef=true) {
        const { separator, ref } = this;
        const refName = (ref && row) ? ref(row) : null;

        if (Array.jet.is(raw)) { raw = raw.join(separator); }
        if (!separator) { return !refName ? raw : Table.find(refName).rows(raw, false, autoCreateRef); }
        const list = raw ? String.jet.to(raw).split(separator) : [];
        return (!raw || !refName) ? list : list.map(raw=>Table.find(refName).rows(raw, false, autoCreateRef));
    }

    fetch(vals) {
        return jet.get(vals, this.name);
    }

    toJSON() {
        return this.name;
    }

    toString() {
        return this.name;
    }

}
  
  