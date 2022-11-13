import jet from "@randajan/jet-core";
import Row from "./Row.js";


const columnTraits = {
    readonly:"function",
    resetIf:"function",
    init:"function",
    formula:"function",
    ref:"function",
    separator:"string"
};
  
export default class Column extends jet.types.Plex {

    static is(col) { return col instanceof Column; }

    constructor(table, name, id) {
        const _p = {};

        super();

        const enumerable = true;
        Object.defineProperties(this, {
            table:{value:table},
            id:{enumerable, value:id},
            name:{enumerable, value:name},
            virtual:{enumerable, get:_=>this.id == null},
            primary:{enumerable, get:_=>table.cols.primary === this},
        });

        for (let t in columnTraits) {
            const type = columnTraits[t];

            const set = val=>{
                table.cols.isNotState("loading", name, "set "+t);
                if (val == null) { delete _p[t]; return this; }
                if (typeof val === type) { _p[t] = val; return this; }
                if (type === "function") { _p[t] = _=>val; return this; }
                this.throwError(`${t} expecting ${type}`);

            }

            Object.defineProperty(this, t, {get:_=>_p[t], set});
            Object.defineProperty(this, "set"+String.jet.capitalize(t), {value:set});

        }

    }   

    throwError(msg) { this.table.cols.throwError(this.name, msg);}

    setPrimary() { this.table.cols.primary = this.name; return this; }
    setLabel() { this.table.cols.label = this.name; return this; }

    toRaw(val) {
        const separator = this.separator;
        if (!(separator && (Object.jet.is(val) || Array.jet.is(val)))) { return (!Row.is(val) || val.exist) ? val : ""; }
        let raw = "";
        for (let i in val) {
        const v = val[i];
        if (v != "" && v != null) { raw += (raw ? separator : "") + v; }
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
        return vals.hasOwnProperty(this.name) ? vals[this.name] : vals[this.id];
    }

    toJSON() {
        return this.name;
    }

    toString() {
        return this.name;
    }

}
  
  