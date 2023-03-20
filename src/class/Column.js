import jet from "@randajan/jet-core";
import Table from "./Table.js";
 
export default class Column {

        static is(col) { return col instanceof Column; }
    
        constructor(cols, key, getScheme, columnTraits) {

            const enumerable = true;
            Object.defineProperties(this, {
                table:{value:cols.table},
                cols:{value:cols},
                key:{enumerable, value:key},
                isExist:{enumerable, get:_=>cols.exist(key) }
            });

            for (const traitName in columnTraits) {
                Object.defineProperty(this, traitName, {enumerable, get:_=>getScheme(key)[traitName]});
            }


        }
    
        toRaw(val) {
            const { separator } = this;
            if (!(separator && Array.jet.is(val))) { return String.jet.to(val) || null; }
            let raw = "";
            for (let i in val) {
                const v = val[i];
                if (jet.isFull(v)) { raw += (raw ? separator : "") + String.jet.to(v); }
            }
            return raw || null;
        }
    
        toVal(raw, rec) {
            const { separator, ref } = this;

            const refName = (ref && rec) ? ref(rec) : null;

            if (Array.jet.is(raw)) { raw = raw.join(separator); }
            if (!separator) { return !refName ? raw : Table.find(refName).rows(raw, false); }
            const list = raw ? String.jet.to(raw).split(separator) : [];
            return (!raw || !refName) ? list : list.map(raw=>Table.find(refName).rows(raw, false));
        }
    
        fetch(vals) {
            return jet.get(vals, this.key);
        }
    
        toJSON() {
            return this.key;
        }
    
        toString() {
            return this.key;
        }
    
    }
      
      