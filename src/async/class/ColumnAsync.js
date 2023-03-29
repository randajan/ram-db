import jet from "@randajan/jet-core";
import { colTraits } from "../../uni/helpers/consts";
import RowAsync from "./RowAsync";

const { solid, virtual, cached } = jet.prop;

export default class ColumnAsync {

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
            isExist: _ => cols.exist(key),
            isPrimary: _ => cols.primary === this,
            isLabel: _ => cols.label === this
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
        return this.cols.msg(text, this.key);
    }

    async _toRaw(val) {
        return RowAsync.is(val) ? await val.key : (String.jet.to(val) || null);
    }

    async toRaw(val) {
        const { separator } = this;
        if (!separator || !Array.isArray(val)) { return this._toRaw(val); }
        let raw = "";
        for (let v of val) {
            if (jet.isFull(v)) { raw += (raw ? separator : "") + await this._toRaw(v); }
        }
        return raw || null;
    }

    async _toVal(raw, refName) {
        const { db, type } = this;
        if (type === "datetime") { raw = Date.jet.to(raw); }
        if (type === "number") { raw = Number.jet.to(raw); }
        return refName ? await db(refName).rows(raw, { autoCreate: true }) : raw;
    }

    async toVal(raw, row) {
        const { separator, ref } = this;
        const refName = (ref && row) ? ref(row) : null;

        if (Array.jet.is(raw)) { raw = raw.join(separator); }
        if (!separator) { return this._toVal(raw, refName); }

        const list = raw ? String.jet.to(raw).split(separator) : [];
        return list.length ? Promise.all(list.map(v => this._toVal(v, refName))) : list;
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

