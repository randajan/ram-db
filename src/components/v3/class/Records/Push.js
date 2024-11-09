import { solids } from "@randajan/props";
import { toRefId } from "../../../uni/formats";
import { getColsPriv } from "./_columns";
import { ColMajor, ColMinor, PushMajor } from "../Exceptions";


export class Push {

    constructor(_rec) {
        solids(this, {
            _rec
        });
    }

    throw(error) {
        if (this.isDone && error.severity !== "minor") { this.isDone = false; }
        this.exceptions.push(error);
    }

    prepare(input, isUpdate=false) {
        const { db, meta:metaRec, values, state } = this._rec;

        this.input = input;
        const output = this.output = {}
        const pendings = this.pendings = new Set();
        this.isDone = true;
        this.exceptions = [];
        this.changed = new Set();

        this.isPending = false;
        this.isChanged = false;

        if (!values._ent) { this.throw(new ColMajor("_ent", "is required")); return; }

        const _cols = getColsPriv(db, values._ent);
        if (!_cols) { this.throw(new ColMajor("_ent", "invalid")); return; }

        for (const _col of _cols) {
            const { meta:metaCol, values:{ name, formula, resetIf, noCache } } = _col;
            const isReal = input.hasOwnProperty(name);
            const isMeta = (metaCol && metaRec === "strong")

            output[name] = values[name]; //default output is value without change

            //fail quick
            if (isReal && state === "ready") {
                if (isMeta) { this.throw(new ColMinor(name, "is meta")); continue; }
                if (formula) { this.throw(new ColMinor(name, `has formula`)); continue; }
            }

            if (formula && noCache) { continue; }
            if (isMeta && state === "pending") { continue; } //meta records should never pending
            if (formula) { pendings.add(_col); continue; }
            

            if (!isUpdate || isReal) { pendings.add(_col); this.isPending = true; continue; }
            if (resetIf) { input[name] = values[name]; pendings.add(_col); continue; } //default input 
        }

        if (state === "ready" && !this.isPending) { this.throw(new PushMajor("blank")); }
    }

    execute() {
        if (this.isPending) {
            for (const _col of this.pendings) { this.pull(_col); }
        }

        if (!this.isChanged || !this.isDone) {
            this.isChanged = this._rec.state === "pending";
            this.output = this._rec.values;
            this.changed.clear();
        }

        return this.output;
    }

    pull(_col) {
        const { _rec, pendings, output, input, changed } = this;
        const { name, omitChange } = _col.values;
        
        if (pendings.has(_col)) {
            const { setter } = _col.traits;

            //because computed value of column can reference itself
            if (this.pending === _col) { return output[name]; }
            this.pending = _col;

            try { setter(_rec.current, output, input[name], _rec.state === "ready" ? _rec.before : undefined);}
            catch(err) { this.throw(err); }

            //cleanup
            delete this.pending;
            pendings.delete(_col);

            //detect changes
            if (output[name] !== _rec.values[name]) {
                changed.add(name);
                this.isChanged = this.isChanged || !omitChange;
            }
            
        }

        return output[name];
    }

    close() {
        const { _rec:{current}, isDone, changed, exceptions } = this;

        delete this.isDone;
        delete this.input;
        delete this.output;
        delete this.exceptions;
        delete this.pending;
        delete this.pendings;
        delete this.changed;
        delete this.isChanged;
        delete this.isPending;
        

        return solids({}, {
            isDone,
            current,
            changed,
            exceptions
        })
    }

}