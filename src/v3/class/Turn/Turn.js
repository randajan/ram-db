import { solids } from "@randajan/props";
import { warn } from "../../tools/traits/uni";


export class Turn {

    static attach(task, _rec, input, force=false) {
        return _rec.turn = new Turn(task, _rec, input, force);
    }

    constructor(task, _rec, input, force=false) {

        this.task = task;
        this._rec = _rec;

        this.isChange = _rec.state === "pending";
        
        solids(this, {
            force,
            input,
            output:{},
            changes:new Set(),
            pendings:new Set(),
        });

        this._prepare();
    }

    _prepare() {
        const { _rec, task, pendings } = this;
        const { values, state } = _rec;

        if (!values._ent) { throw _rec.fail("required", ["column", "_ent"]); }

        const _cols = _rec.getCols();
        if (!_cols) { throw _rec.fail("invalid", ["column", "_ent"]); }

        for (const _col of _cols) {
            try { this._prepareCol(_col); } catch(err) {
                task.catchMinor(err, [["column", _col.values.name]]);
            }
        }

        if (state !== "ready" || pendings.size > 0) { return; }

        _rec.fail("blank", ["values", values]);
    }

    _prepareCol(_col) {
        const { _rec, force, input, output, pendings } = this;
        const { meta:metaRec, values, state } = _rec;
        const { meta:metaCol, values:{ name, formula, resetIf, isVirtual } } = _col;

        const isReal = input.hasOwnProperty(name);
        const isMeta = (metaRec + metaCol) > 3;

        output[name] = values[name]; //default output is value without change

        //fail quick
        if (isReal && state === "ready") {
            if (isMeta) { warn("meta"); }
            if (formula) { warn(`formula`); }
        }

        if (isVirtual) { return; }
        if (formula) { pendings.add(_col); return; }
        if (isMeta && state === "pending") { return; } //meta records should never pending
        
        if (force || isReal) { pendings.add(_col); return; }
        if (resetIf) { input[name] = values[name]; pendings.add(_col); return; } //default input 
    }

    execute() {
        const { pendings } = this;
        for (const _col of pendings) { this.pull(_col); }
        return this;
    }

    pull(_col) {
        const { task, _rec, pendings, output, input, changes } = this;
        const { state, current, before } = _rec;
        const { name, omitChange } = _col.values;
        
        if (pendings.has(_col)) {
            const { setter } = _col.traits;

            //because computed value of column can reference itself
            pendings.delete(_col);

            try {
                setter(input[name], current, state === "ready" ? before : undefined, output);
            } catch(err) {
                task.catchMinor(err, [["column", name]]); //record fail
            }
            
            //detect changes
            if (output[name] !== _rec.values[name]) {
                changes.add(name);
                if (!omitChange) { this.isChange = true; }
            }

        }

        return output[name];
    }

    detach(isOk) {
        const { _rec, output } = this;
        if (isOk) { _rec.values = output; }
        delete this._rec;
        delete _rec.turn;
    }

}