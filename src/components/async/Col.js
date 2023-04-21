import jet from "@randajan/jet-core";
import { colTraits, colTo } from "../uni/tools";
import { vault } from "../uni/tools";

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
            isLabel: _ => _c.label === name
        });

        for (const tn in colTraits) {
            solid(this, tn, colTraits[tn](traits[tn], traits));
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
        return val == null ? null : colTo[this.type].raw(val);
    }

    toRaw(val) {
        const { separator } = this;
        if (!(separator && Array.jet.is(val))) { return this._toRaw(val); }
        let raw = "";
        for (let v of val) {
            if (!v) { continue; }
            if (v = this._toRaw(v)) { raw += (raw ? separator : "") + v; }
        }
        return raw || null;
    }

    async _toVal(raw, refName) {
        raw = colTo[this.type].val(raw);
        return refName ? (await this.db(refName)).rows.get(raw, false) : raw;
    }

    async toVal(raw, row) {
        const { separator, ref, isTrusted } = this;
        const refName = (ref && row) ? await ref(row) : null;

        if (!separator) { return this._toVal(raw, refName); }

        const list = Array.isArray(raw) ? raw : raw ? String.jet.to(raw).split(separator) : [];
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

