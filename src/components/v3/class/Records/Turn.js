import { solids } from "@randajan/props";
import { getColsPriv } from "./_columns";
import { Major, Minor, toFail } from "../Exceptions";
import { ResultTurn } from "./Result";


export class Turn {

    static attach(_rec, input, isUpdate=false) {
        return _rec.turn = new Turn(_rec, input, isUpdate);
    }

    constructor(_rec, input, isUpdate=false) {

        this._rec = _rec;
        this.result = new ResultTurn(_rec);
        
        solids(this, {
            isUpdate,
            input,
            output:{},
            pendings:new Set(),
        });

        this.isPending = false;

        try { this._prepare(); } catch(err) { result.addFail(toFail(err)); }

    }

    _prepare() {
        const { _rec, result } = this;
        const { db, values, state } = _rec;

        if (!values._ent) { throw Major.fail("is required").setCol("_ent"); }

        const _cols = getColsPriv(db, values._ent);
        if (!_cols) { throw Major.fail("invalid").setCol("_ent"); }

        for (const _col of _cols) {
            try { this._prepareCol(_col); } catch(err) {
                result.addFail(toFail(err).setCol(_col.values.name));
            }
        }

        if (state === "ready" && !this.isPending) { throw Major.fail("blank"); }
    }

    _prepareCol(_col) {
        const { _rec, isUpdate, input, output, pendings } = this;
        const { meta:metaRec, values, state } = _rec;
        const { meta:metaCol, values:{ name, formula, resetIf, noCache } } = _col;

        const isReal = input.hasOwnProperty(name);
        const isMeta = (metaRec && metaCol && (metaCol === "numb" || metaRec !== "soft"));

        output[name] = values[name]; //default output is value without change

        //fail quick
        if (isReal && state === "ready") {
            if (isMeta) { throw Minor.fail("is meta"); }
            if (formula) { throw Minor.fail(`has formula`); }
        }

        if (formula && noCache) { return; }
        if (isMeta && state === "pending") { return; } //meta records should never pending
        if (formula) { pendings.add(_col); return; }
        
        if (!isUpdate || isReal) { pendings.add(_col); this.isPending = true; return; }
        if (resetIf) { input[name] = values[name]; pendings.add(_col); return; } //default input 
    }

    execute() {
        const { _rec, pendings, result } = this;

        if (this.isPending) {
            for (const _col of pendings) { this.pull(_col); }
        }

        return (result.isOk && result.isReal) ? this.output : _rec.values;
    }

    pull(_col) {
        const { _rec, pendings, output, input, result } = this;
        const { state, current, before } = _rec;
        const { name, omitChange } = _col.values;
        
        if (pendings.has(_col)) {
            const { setter } = _col.traits;

            //because computed value of column can reference itself
            pendings.delete(_col);

            try {
                setter(current, output, input[name], state === "ready" ? before : undefined);
            } catch(err) {
                result.addFail(toFail(err).setCol(name));
            }
            
            //detect changes
            if (output[name] !== _rec.values[name]) {
                result.addChange(name, !omitChange);
            }

        }

        return output[name];
    }

    detach() {
        const { _rec, result } = this;
        
        delete this._rec;
        delete this.result;
        delete _rec.turn;

        return result;
    }

}