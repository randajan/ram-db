import { getRecs } from "../effects/_bits";
import { getRecPriv } from "./Record";




export class Push {

    constructor(_rec, input) {

        const { db, values } = _rec;
        let real = false;
        
        Object.defineProperties(this, {
            db:{value:db},
            _rec:{value:_rec},
            current:{value:_rec.current},
            input:{value:input},
            pending:{value:new Set()},
            changed:{value:new Set()},
            output:{value:{...values}},
            real:{get:_=>real}
        });

        const columns = getRecs(db.cols, values._ent);

        for (const [_, col] of columns) {
            const _col = getRecPriv(db, col);
            const { name, formula, noCache } = _col.values;
            if (formula ? noCache : !input.hasOwnProperty(name)) { continue; }
            if (!formula) { real = true; }
            this.pending.add(_col);
        }

    }

    pull(_col) {
        const { _rec, pending, output, input, changed } = this;
        const { values:{ name }, traits:{ setter } } = _col;
        const { current, before, values } = _rec;

        const from = values[name];
        if (!pending.has(_col)) { return from; }
        pending.delete(_col);

        const to = output[name] = setter(input[name], current, before);
        if (to !== from) { changed.add(name); }
        return to;
    }

    execute() {
        for (const _col of this.pending) { this.pull(_col); }
    }

    getResult() {
        const { changed } = this;
        return {
            changed
        }
    }

}