import { solids } from "@randajan/props";
import { warn } from "../../tools/traits/uni";


export class Turn {

    static attach(task, row, input, force=false) {
        return row.turn = new Turn(task, row, input, force);
    }

    constructor(task, row, input, force=false) {

        this.task = task;
        this.row = row;

        this.isChange = row.state === "pending";
        
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
        const { row, task, pendings } = this;
        const { values, state } = row;

        if (!values._ent) { throw row.fail("required", ["column", "_ent"]); }

        const _cols = row.getCols();
        if (!_cols) { throw row.fail("invalid", ["column", "_ent"]); }

        for (const _col of _cols) {
            try { this._prepareCol(_col); } catch(err) {
                task.catchMinor(err, [["column", _col.values.name]]);
            }
        }

        if (state !== "ready" || pendings.size > 0) { return; }

        row.fail("blank", ["values", values]);
    }

    _prepareCol(_col) {
        const { row, force, input, output, pendings } = this;
        const { meta:metaRec, values, state } = row;
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
        const { task, row, pendings, input, output, changes } = this;
        const { name, omitChange } = _col.values;
        
        if (pendings.has(_col)) {
            const { setter } = _col.traits;
            pendings.delete(_col);

            try {
                setter(row, input[name], output);
            } catch(err) {
                task.catchMinor(err, [["column", name]]); //record fail
            }
            
            //detect changes
            if (output[name] !== row.values[name]) {
                changes.add(name);
                if (!omitChange) { this.isChange = true; }
            }

        }

        return output[name];
    }

    detach(isOk) {
        const { row, output } = this;
        if (isOk) { row.values = output; }
        delete this.row;
        delete row.turn;
    }

}