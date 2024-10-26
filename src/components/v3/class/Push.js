import { toRefId } from "../../uni/formats";
import { getRecs } from "../effects/_bits";
import { getRecPriv } from "./Record";




export class Push {

    constructor(_rec, input) {

        const { db, values } = _rec;
        
        Object.defineProperties(this, {
            db:{value:db},
            _rec:{value:_rec},
            input:{value:input},
            errors:{value:new Map()},
            pending:{value:new Set()},
            pendingReal:{value:new Set()},
            changed:{value:new Set()},
            output:{value:{...values}}
        });

        const columns = getRecs(db.cols, toRefId(values._ent));

        for (const [_, col] of columns) {
            const _col = getRecPriv(db, col);
            const { name, formula, noCache, writable, isMeta } = _col.values;
            const real = input.hasOwnProperty(name);

            if (real) {
                if (formula) { this.errors.set(name, `it has formula`); continue; }
                if (!writable) { this.errors.set(name, `it's readonly`); continue; }
                if (isMeta && values.isMeta) { this.errors.set(name, `because it's meta`); continue; }
                this.pendingReal.add(_col);
            } else if (!formula || noCache) { continue; }

            this.pending.add(_col);
        }

        if (!this.pendingReal.size) { this.errors.set(undefined, "nothing to update"); }
    }

    pull(_col) {
        const { _rec, pending, output, input, changed } = this;
        const { values:{ name }, traits:{ setter } } = _col;
        const { current, before } = _rec;

        const from = output[name];
        if (!pending.has(_col)) { return from; }
        pending.delete(_col);

        const to = output[name] = setter(input[name], current, before);
        if (to !== from) { changed.add(name); }
        return to;
    }

    execute() {
        if (this.errors.size) { return; }
        for (const _col of this.pendingReal) { this.pull(_col); }
        for (const _col of this.pending) { this.pull(_col); }
        if (this.errors.size) { this.changed.clear(); }
    }

    getResult() {
        const { changed, errors } = this;
        return {
            changed,
            errors
        }
    }

}