import { toRefId } from "../../uni/formats";
import { getRecs } from "../effects/_bits";
import { afterUpdate } from "../effects/afterUpdate";
import { Push } from "./Push";

const _records = new WeakMap();

export const getRecPriv = (db, any, throwError=true)=>{
    const _p = _records.get(any);
    if (_p && db === _p.db) { return _p; }
    if (throwError) { throw db.msg("is not record", toRefId(any)); };
}

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

    addColumn(_col) {
        const { db, current, before, values } = this;
        const { name, formula, noCache } = _col.current;
        const { getter, setter } = _col.traits;
        const isVirtual = (formula && noCache);
    
        const prop = {enumerable:true};
        if (!formula) { prop.set = v=>db.update(current, {[name]:v}); }

        if (isVirtual) { prop.get = _=>getter(setter(undefined, current, before)); }
        else { prop.get = _=>getter(this.push ? this.push.pull(_col) : this.values[name]); }
    
        Object.defineProperty(current, name, prop);
        Object.defineProperty(before, name, { enumerable:true, get:isVirtual ? prop.get : _=>getter(this.values[name]) });
    }

    update(input, ctx) {
        const push = new Push(this, input);

        if (push.real) {
            this.push = push;
            push.execute();
            delete this.push; //delete right after
            this.values = push.output; //set new data;
            if (push.changed.size) { afterUpdate(this.db, this.current, ctx); }
        }

        return push.getResult();
    }

}

export const createRecord = (db, data)=>(new RecordPrivate(db, data)).current;