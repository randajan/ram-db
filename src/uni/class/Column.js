import jet from "@randajan/jet-core";

const { solid, virtual, cached } = jet.prop;

const _traits = {
    type:String,
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

            if (this.ref && (this.isPrimary || this.isLabel)) {
                throw Error(this.msg("columns with ref couldn't be primary or label"));
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

        _toVal(raw, refName) {
            const { db, type } = this;
            if (type === "datetime") { raw = Date.jet.to(raw); }
            if (type === "number") { raw = Number.jet.to(raw); }
            return refName ? db(refName).rows(raw, { autoCreate:true }) : raw;
        }
    
        toVal(raw, row) {
            const { separator, ref } = this;
            const refName = (ref && row) ? ref(row) : null;

            if (Array.jet.is(raw)) { raw = raw.join(separator); }
            if (!separator) { return this._toVal(raw, refName); }

            const list = raw ? String.jet.to(raw).split(separator) : [];
            return list.length ? list.map(raw=>this._toVal(raw, refName)) : list;
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
      
      