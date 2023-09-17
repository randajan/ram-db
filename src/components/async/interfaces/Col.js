import jet from "@randajan/jet-core";
import { vault, colTraits, colTo, colsTraits } from "../../uni/consts";
import { evaluate } from "../tools";

const { solid, virtual } = jet.prop;

export class Col {

    constructor(cols, id, name, traits) {
        const { db, table } = cols;
        const _c = vault.get(cols.uid);

        solid.all(this, {
            db,
            table,
            cols,
        }, false);

        solid.all(this, {
            id,
            name
        });

        virtual.all(this, {
            isPrimary: _ => _c.primary === name,
            isLabel: _ => _c.label === name,
            cacheStamp: _=>{
                switch (this.scope) {
                    case "self": return 1;
                    case "table": return table.lastChange;
                    case "db": return db.lastChange;
                    default: return 0; //case "global";
                }
            }
        });

        for (const tn in colTraits) {
            let tv = colTraits[tn](traits[tn], traits);
            if (tn === "display") { tv = tv || db.displayDefault; }
            solid(this, tn, tv);
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

    async get(trait, throwError=true) {
        if (trait === "name" || colTraits[trait]) { return this[trait]; }

        console.log(colTraits);
        if (throwError) { throw Error(`unknown trait '${trait}'`); }
    }

    async eval(selector, opt={}) {
        return evaluate(this, selector, opt);
    }

    msg(text) {
        return this.cols.msg(text, this.name);
    }

    getKey() { return this.name; }

    _toRaw(val) {
        if (val != null || this.noNull) { return colTo[this.type].raw(val); }
    }

    toRaw(val) {
        const { separator } = this;
        if (!separator || val == null) { return this._toRaw(val); }
        if (!Array.isArray(val)) { val = String(val).split(separator); }
        let raw = "";
        for (let v of val) {
            v = this._toRaw(v);           
            if (v == null || v == "") { continue; }
            raw += (raw ? separator : "") + v;
        }
        return raw;
    }

    async _toVal(raw, refName) {
        if (raw != null || this.noNull) { raw = colTo[this.type].val(raw); }
        if (raw != null) { return refName ? (await this.db(refName)).rows.get(raw, false) : raw; }
    }

    async toVal(raw, row) {
        const { separator, ref, isTrusted } = this;
        const refName = (ref && row) ? await ref(row) : null;

        if (!separator) { return this._toVal(raw, refName); }

        const list = raw == null ? [] : Array.isArray(raw) ? raw : String(raw).split(separator);
        if (!list.length || (isTrusted && raw === list)) { return list; }

        for (let i in list) { list[i] = await this._toVal(list[i], refName); }

        return list;
    }

    fetch(vals) {
        return Array.isArray(vals) ? vals[this.id] : vals ? vals[this.name] : undefined;
    }

    toJSON() {
        return this.name || null;
    }

    toString() {
        return this.name || "";
    }

}

