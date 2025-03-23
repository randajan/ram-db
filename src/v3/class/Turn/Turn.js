import { solids } from "@randajan/props";
import { Major } from "../Process/Fails";
import { fail, warn } from "../../tools/traits/uni";
import { _processFail } from "../Process/Process";


export class Turn {

    static attach(process, _rec, input, force=false) {
        return _rec.turn = new Turn(process, _rec, input, force);
    }

    constructor(process, _rec, input, force=false) {

        this.process = process;
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
        const { _rec, process } = this;
        const { values, state } = _rec;

        if (!values._ent) { throw Major.fail("is required").setCol("_ent"); }

        const _cols = _rec.getCols();
        if (!_cols) { throw Major.fail("invalid").setCol("_ent"); }

        for (const _col of _cols) {
            try { this._prepareCol(_col); } catch(err) {
                _processFail(process, err, _col.values.name);
            }
        }

        if (state === "ready") { fail("blank"); }

    }

    _prepareCol(_col) {
        const { _rec, force, input, output, pendings } = this;
        const { meta:metaRec, values, state } = _rec;
        const { meta:metaCol, values:{ name, formula, resetIf, isVirtual } } = _col;

        const isReal = input.hasOwnProperty(name);
        const isMeta = (metaRec && metaCol && (metaCol === "numb" || metaRec !== "soft"));

        output[name] = values[name]; //default output is value without change

        //fail quick
        if (isReal && state === "ready") {
            if (isMeta) { warn("is meta"); }
            if (formula) { warn(`has formula`); }
        }

        if (isVirtual) { return; }
        if (formula) { pendings.add(_col); return; }
        if (isMeta && state === "pending") { return; } //meta records should never pending
        
        if (force || isReal) { pendings.add(_col); return; }
        if (resetIf) { input[name] = values[name]; pendings.add(_col); return; } //default input 
    }

    execute() {
        const { process, _rec, pendings, isChange } = this;

        for (const _col of pendings) { this.pull(_col); }

        return (process.isOk && isChange) ? this.output : _rec.values;
    }

    pull(_col) {
        const { process, _rec, pendings, output, input, changes } = this;
        const { state, current, before } = _rec;
        const { name, omitChange } = _col.values;
        
        if (pendings.has(_col)) {
            const { setter } = _col.traits;

            //because computed value of column can reference itself
            pendings.delete(_col);

            try {
                setter(current, output, input[name], state === "ready" ? before : undefined);
            } catch(err) {
                _processFail(process, err, name);
            }
            
            //detect changes
            if (output[name] !== _rec.values[name]) {
                changes.add(name);
                if (!omitChange) { this.isChange = true; }
            }

        }

        return output[name];
    }

    detach() {
        const { _rec } = this;
        
        delete this._rec;
        delete _rec.turn;
    }

}