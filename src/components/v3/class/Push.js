import { toRefId } from "../../uni/formats";
import { getRecs } from "../effects/_bits";
import { getColsPriv } from "./Columns";
import { getRecPriv } from "./Record";




export class Push {

    constructor(_rec) {
        Object.defineProperties(this, {
            _rec:{value:_rec},
        });
    }

    prepare(input, isSet=false) {
        const { values, current, before, initializing } = this._rec;

        this.input = input;
        const output = this.output = {}
        const errors = this.errors = new Map();
        const pendings = this.pendings = new Set();
        this.changed = new Set();

        this.isPending = false;
        this.isChanged = false;

        const _ent = toRefId(values._ent);
        if (!_ent) { errors.set("_ent", "is required"); return; }

        const _cols = getColsPriv(_ent);
        if (!_cols) { errors.set("_ent", "invalid"); return; }

        for (const _col of _cols) {
            const { name, formula, isReadonly, resetIf, noCache, isMeta } = _col.values;
            const real = input.hasOwnProperty(name);
            const meta = (isMeta && values.isMeta);

            output[name] = values[name]; //default output is value without change
            if (name === "validator") { console.log(typeof output[name], output[name]); }

            //fail quick
            if (!initializing && real) {
                if (formula) { errors.set(name, `has formula`); continue; }
                if (isReadonly && isReadonly(current, _col.current, before)) { errors.set(name, `is readonly`); continue; }
                if (meta) { errors.set(name, `is meta`); continue; }
            }

            if (formula && noCache) { continue; }
            if (initializing && meta) { continue; } //meta column of meta row should never pending
            if (formula) { pendings.add(_col); continue; }

            if (isSet || real) { pendings.add(_col); this.isPending = true; continue; }
            if (resetIf) { input[name] = values[name]; pendings.add(_col); continue; } //default input 
        }

        if (!initializing && !this.isPending) { errors.set(undefined, "blank"); }
    }

    execute() {
        if (this.isPending) {
            for (const _col of this.pendings) { this.pull(_col); }
        }

        if (!this.isChanged || this.errors.size) {
            this.isChanged = false;
            this.output = this._rec.values;
            this.changed.clear();
        }

        return this.output;
    }

    pull(_col) {
        const { _rec, pendings, output, input, changed, errors } = this;
        const { values:{ name, omitChange }, traits:{ setter } } = _col;
        
        if (pendings.has(_col)) {

            //because computed value of column can reference itself
            if (this.pending === _col) { return output[name]; }
            this.pending = _col;

            try { setter(_rec, output, input[name], _rec.initializing);}
            catch(err) { errors.set(name, err.message); }

            //cleanup
            delete this.pending;
            pendings.delete(_col);

            //detect changes
            if (output[name] !== _rec.values[name]) {
                changed.add(name);
                if (!this.isChanged && !omitChange) { this.isChanged = true; }
            }
            
        }

        return output[name];
    }

    close() {
        const { _rec:{current}, changed, errors } = this;

        delete this.input;
        delete this.output;
        delete this.errors;
        delete this.pending;
        delete this.pendings;
        delete this.changed;
        delete this.isChanged;
        delete this.isPending;
        

        return {
            current,
            changed,
            errors
        }
    }

}