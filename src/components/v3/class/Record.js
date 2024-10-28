import { toRefId } from "../../uni/formats";
import { getRecs } from "../effects/_bits";
import { afterAdd } from "../effects/afterAdd";
import { afterUpdate } from "../effects/afterUpdate";
import { Push } from "./Push";

const _records = new WeakMap();

export const getRecPriv = (db, any, throwError=true)=>{
    const _p = _records.get(any);
    if (_p && (!db || db === _p.db)) { return _p; }
    if (throwError) { throw db.msg("is not record", {row:toRefId(any)}); };
}

export const createRec = (db, values, ctx)=>{
    const _rec = new RecordPrivate(db, values);
    if (db.state !== "ready") { return afterAdd(db, _rec.current, ctx); }
    const result = _rec.prepareInit().init();
    afterAdd(db, _rec.current, ctx);
    return result;
}

class RecordPrivate {

    constructor(db, values) {
        const current = {...values}; //interface
        const before = {}; //interface

        Object.defineProperties(this, {
            db:{value:db},
            current:{value:current},
            before:{value:before},
            push:{value:new Push(this)}
        });

        this.values = {...values};
        this.initializing = true;

        const cols = getRecs(db.cols, toRefId(current._ent));
        if (cols) { for (const [_, col] of cols) { this.addColumn(_records.get(col)); } }

        _records.set(current, this);
    }

    msg(text, details={}) {
        return this.db.msg(text, {
            ent:toRefId(this.values._ent),
            row:this.values.id,
            ...details
        });
    }

    addColumn(_col) {
        const { current, before, initializing } = this;
        const { name, formula, noCache } = _col.current;
        const t = _col.traits;
        const isVirtual = (formula != null && noCache != null);
    
        const prop = {
            enumerable:true, configurable:true,
            set:_=>{ throw new Error(this.msg("for update use db.update(...) interface", {column:name})) }
        };

        if (isVirtual) { prop.get = _=>t.getter(t.setter(undefined, this)); }
        else { prop.get = _=>t.getter(this.push.isPending ? this.push.pull(_col) : this.values[name]); }
        Object.defineProperty(current, name, prop);

        if (!isVirtual) { prop.get = _=>t.getter(this.values[name]); }
        Object.defineProperty(before, name, prop);

        if (!initializing) { this.values[name] = t.setter(this.values[name], this, true); }
    }

    removeColumn(name) {
        const { current, before } = this;
        delete this.values[name];
        delete current[name];
        delete before[name];
    }

    prepareInit() {
        const { initializing, push, values } = this;
        if (initializing) { push.prepare(values, true, true); }
        return this;
    }

    init() {
        const { push } = this;
        if (push.execute()) { this.values = push.output; }
        delete this.initializing;
        return push.close();
    }

    update(input, ctx) {
        const { push } = this;

        push.prepare(input);
        
        if (push.execute()) {
            this.values = push.output;
            afterUpdate(this.db, this.current, ctx);
        }

        return push.close();
    }

}