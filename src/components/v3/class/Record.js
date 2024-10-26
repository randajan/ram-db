import { toRefId } from "../../uni/formats";
import { getRecs } from "../effects/_bits";
import { afterUpdate } from "../effects/afterUpdate";
import { Push } from "./Push";

const _records = new WeakMap();

export const getRecPriv = (db, any, throwError=true)=>{
    const _p = _records.get(any);
    if (_p && db === _p.db) { return _p; }
    if (throwError) { throw db.msg("is not record", {row:toRefId(any)}); };
}

const configurable = true;
const enumerable = true;

class RecordPrivate {

    constructor(db, values) {
        const current = {...values}; //interface
        const before = {}; //interface

        Object.defineProperties(this, {
            db:{value:db},
            current:{value:current},
            before:{value:before},
        });

        this.values = {...values};

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
        const { db, current, before } = this;
        const { name, formula, noCache } = _col.current;
        const { getter, setter } = _col.traits;
        const isVirtual = (formula && noCache);
    
        const prop = {enumerable, configurable};
        prop.set = _=>{ throw new Error(this.msg("for update use db.update(...) interface", {column:name})) };

        if (isVirtual) { prop.get = _=>getter(setter(undefined, current, before)); }
        else { prop.get = _=>getter(this.push ? this.push.pull(_col) : this.values[name]); }
    
        Object.defineProperty(current, name, prop);

        if (!isVirtual) { prop.get = _=>getter(this.values[name]); }
        Object.defineProperty(before, name, prop);
    }

    update(input, ctx) {
        const push = new Push(this, input);

        this.push = push;
        push.execute();
        delete this.push; //delete right after
        
        if (push.changed.size) {
            this.values = push.output;
            afterUpdate(this.db, this.current, ctx);
        }

        return push.getResult();
    }

}

export const createRecord = (db, data)=>(new RecordPrivate(db, data)).current;