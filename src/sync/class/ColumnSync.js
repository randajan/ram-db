import jet from "@randajan/jet-core";
import { colTraits } from "../../uni/consts";
import vault from "../../uni/vault";

const { solid, virtual } = jet.prop;

export class ColumnSync {

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
            isLabel: _ => _c.label === name
        });

        for (const tn in colTraits) {
            const type = colTraits[tn];
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
        return this.cols.msg(text, this.name);
    }

    getKey() { return this.name; }

    _toRaw(val) {
        return val?.getKey ? val.getKey() : (String.jet.to(val) || null);
    }

    toRaw(val) {
        const { separator } = this;
        if (!(separator && Array.jet.is(val))) { return this._toRaw(val); }
        let raw = "";
        for (let v of val) {
            if (jet.isFull(v)) { raw += (raw ? separator : "") + this._toRaw(v); }
        }
        return raw || null;
    }

    _toVal(raw, refName) {
        const { db, type } = this;
        if (type === "datetime") { raw = Date.jet.to(raw); }
        if (type === "number") { raw = Number.jet.to(raw); }
        return refName ? db(refName).rows(raw, { autoCreate: true }) : raw;
    }

    toVal(raw, row) {
        const { separator, ref } = this;
        const refName = (ref && row) ? ref(row) : null;

        if (Array.jet.is(raw)) { raw = raw.join(separator); }
        if (!separator) { return this._toVal(raw, refName); }

        const list = raw ? String.jet.to(raw).split(separator) : [];
        return list.length ? list.map(raw => this._toVal(raw, refName)) : list;
    }

    fetch(vals) {
        return Array.isArray(vals) ? vals[this.id] : jet.get(vals, this.name);
    }

    toJSON() {
        return this.name;
    }

    toString() {
        return this.name;
    }

}

