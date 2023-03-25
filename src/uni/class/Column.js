import jet from "@randajan/jet-core";

const { solid, virtual, cached } = jet.prop;

const _traits = {
    isReadonly:Function,
    resetIf:Function,
    init:Function,
    formula:Function,
    ref:Function,
    separator:String,
    isVirtual:Boolean
  };
 
export default class Column {

        static is(col) { return col instanceof Column; }
    
        constructor(cols, id, key, traits) {
            const { db, table } = cols;

            solid.all(this, {
                db,
                table,
                cols,
            }, false);

            solid.all(this, {
                id,
                key
            });

            virtual.all(this, {
                isExist:_=>cols.exist(key),
                isPrimary:_=>cols.primary === this,
                isLabel:_=>cols.label === this
            });

            for (const tn in _traits) {
                const type = _traits[tn];
                const raw = traits[tn];
                
                const value = (type !== Function || raw != null) ? type.jet.to(raw) : undefined;
                solid(this, tn, value);
                delete traits[tn];
            }

            if (this.isVirtual && !this.formula) {
                throw Error(this.msg("virtual column require formula to be set"));
            }

            const unknownTraits = Object.keys(traits);

            if (unknownTraits.length) {
                throw Error(this.msg(`unknown trait${unknownTraits.length > 1 ? "s" : ""} '${unknownTraits.join("', '")}'`));
            }

        }

        msg(text) {
            return this.cols.msg(text, this.key);
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
    
        toVal(raw, row) {
            const { db, separator, ref } = this;

            const refName = (ref && row) ? ref(row) : null;

            if (Array.jet.is(raw)) { raw = raw.join(separator); }
            if (!separator) { return !refName ? raw : db.get(refName).rows(raw, false); }
            const list = raw ? String.jet.to(raw).split(separator) : [];
            return (!raw || !refName) ? list : list.map(raw=>db.get(refName).rows(raw, false));
        }
    
        fetch(vals) {
            return Array.isArray(vals) ? vals[this.id] : jet.get(vals, this.key);
        }
    
        toJSON() {
            return this.key;
        }
    
        toString() {
            return this.key;
        }
    
    }
      
      