import { toRefId } from "../../uni/formats";
import { getRecs } from "../effects/_bits";
import { getColsPriv } from "./Columns";
import { getRecPriv } from "./Record";




export class Push {

    constructor(_rec) {
        Object.defineProperties(this, {
            _rec:{value:_rec},
            isPending:{get:_=>!!this.pending?.size}
        });
    }

    prepare(input, isSet=false, isInit=false) {
        const { values } = this._rec;

        this.input = input;
        const output = this.output = {}
        const errors = this.errors = new Map();
        const pending = this.pending = new Set();
        const pendingReal = this.pendingReal = new Set();
        this.changed = new Set();

        const _ent = toRefId(values._ent);
        if (!_ent) { errors.set("_ent", "is required"); return; }

        const _cols = getColsPriv(_ent);
        if (!_cols) { errors.set("_ent", "invalid"); return; }

        for (const _col of _cols) {
            const { name, formula, noCache, isMeta } = _col.values;
            const real = input.hasOwnProperty(name);
            const meta = (isMeta && values.isMeta);

            if (real) {
                if (formula) { errors.set(name, `has formula`); continue; }
                if (!isInit && meta) { errors.set(name, `is meta`); continue; }
            }

            if (formula && noCache) { continue; }
            if (isInit && meta) { output[name] = values[name]; continue; }
            if (formula) { pending.add(_col); continue; }

            if (isSet || real) { pendingReal.add(_col); pending.add(_col); continue; }
            output[name] = values[name];
        }

        if (!pendingReal.size) { errors.set(undefined, "blank"); }
    }

    execute() {
        if (this.errors.size) { return false; }
        for (const _col of this.pendingReal) { this.pull(_col); }
        for (const _col of this.pending) { this.pull(_col); }
        if (this.errors.size) { this.changed.clear(); }
        return !!this.changed.size;
    }

    pull(_col) {
        const { _rec, pending, output, input, changed, errors } = this;
        const { values:{ name }, traits:{ setter } } = _col;
        
        if (pending.has(_col)) {
            try { output[name] = setter(input[name], _rec, _rec.initializing);}
            catch(err) { errors.set(name, err.message); }
            pending.delete(_col);
            if (output[name] !== _rec.values[name]) { changed.add(name); }
        }

        return output[name];
    }

    close() {
        const { _rec:{current}, changed, errors } = this;

        delete this.input;
        delete this.errors;
        delete this.pending;
        delete this.pendingReal;
        delete this.changed;
        delete this.output;

        return {
            current,
            changed,
            errors
        }
    }

}