import jet from "@randajan/jet-core";
import { vault } from "../../uni/consts";
import { evaluate } from "../tools";
import { colTraits, colTo, } from "../traits";

const { solid, virtual, cached } = jet.prop;

const cacheStampFactory = col=>{
    const { db, table } = col;
    const scope = col.scope();
    if (scope === "self") { return _=>1; }
    if (scope === "table") { return _=>table.lastChange; }
    if (scope === "db") { return _=>db.lastChange; }
    if (scope === "global") { return _=>0; }
    
    const getLastChanges = tn=>db(tn).then(t=>t.lastChange);
    return _=>Math.max(...scope.map(getLastChanges));
}

export class Col {

    constructor(cols, id, name, traits) {
        const { db, table } = cols;
        const _c = vault.get(cols.uid);
        const _p = {};

        let _gcs;
        solid.all(this, {
            db,
            table,
            cols,
            getCacheStamp: _=>(_gcs || (_gcs = cacheStampFactory(this))).then(gcs=>gcs()),
            _ref:traits.ref
        }, false);

        solid.all(this, {
            id,
            name
        });
        
        virtual.all(this, {
            isPrimary: _ => _c.primary === name,
            isLabel: _ => _c.label === name
        });

        for (const tn in colTraits) {
            const trait = traits[tn];
            delete traits[tn];
            cached(this, _p, tn, _=>colTraits[tn](trait, this));
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

    get(trait, throwError=true) {
        if (trait === "name" || colTraits[trait]) { return this[trait]; }
        if (throwError) { throw Error(`unknown trait '${trait}'`); }
    }

    eval(selector, opt={}) {
        return evaluate(this, selector, opt);
    }

    msg(text) {
        return this.cols.msg(text, this.name);
    }

    getKey() { return this.name; }

    _toRaw(val) {
        if (val != null || this.noNull) { return colTo[this.type].raw(val, this); }
    }

    toRaw(val) {
        const { separator } = this;
        if (!separator) { return this._toRaw(val); }
        if (!Array.isArray(val)) { val = Array.jet.to(String.jet.to(val, separator)); }
        let raw = "";
        for (let v of val) {
            v = this._toRaw(v);           
            if (v == null || v == "") { continue; }
            raw += (raw ? separator : "") + v;
        }
        if (raw) { return raw; }
    }

    _toVal(raw, refName) {
        if (raw != null || this.noNull) { raw = colTo[this.type].val(raw, this); }
        if (raw != null) { return refName ? (this.db(refName)).rows.get(raw, false) : raw; }
    }

    toVal(raw, row) {
        const { separator, ref, isTrusted } = this;
        const refName = (ref && row) ? ref(row) : null;

        if (!separator) { return this._toVal(raw, refName); }

        const list = raw == null ? [] : Array.isArray(raw) ? raw : String(raw).split(separator);
        if (!list.length || (isTrusted && raw === list)) { return list; }

        for (let i in list) { list[i] = this._toVal(list[i], refName); }

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