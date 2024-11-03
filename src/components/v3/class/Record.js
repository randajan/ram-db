import { cacheds, solids } from "@randajan/props";
import { toRefId } from "../../uni/formats";
import { getRec, getRecs } from "../effects/_bits";
import { afterAdd } from "../effects/afterAdd";
import { afterRemove } from "../effects/afterRemove";
import { afterUpdate } from "../effects/afterUpdate";
import { meta } from "../meta";
import { Push } from "./Push";

const _records = new WeakMap();

export const getRecPriv = (db, any, throwError=true)=>{
    const _p = _records.get(any);
    if (_p && (!db || db === _p.db)) { return _p; }
    if (throwError) { throw Error(db.msg("is not record", {row:toRefId(any)})); };
}

const createRec = (db, values)=>new RecordPrivate(db, values);

export const addRec = (db, values, ctx)=>{
    let res = createRec(db, values);
    if (db.state === "ready") { res = res.prepareInit().init(); }
    afterAdd(db, res.current, ctx);
    return res;
}

export const addOrSetRec = (db, values, ctx, isUpdate)=>{
    const _rec = createRec(db, values).prepareInit();
    const { _ent, id } = _rec.current;

    const brother = getRec(db, toRefId(_ent), id);
    if (brother) { return getRecPriv(db, brother).set(values, ctx, isUpdate); }

    const res = _rec.init();
    afterAdd(db, res.current, ctx);
    return res;
}

export const removeRec = (record, ctx, force)=>getRecPriv(this, record).remove(ctx, force);

class RecordPrivate {

    constructor(db, values) {
        const _ent = values._ent = toRefId(values._ent);
        const isMeta = values.isMeta && meta.hasOwnProperty(_ent);

        const current = {...values}; //interface
        const before = {}; //interface

        solids(this, {
            db, current, before,
            push:new Push(this),
            isMeta,
        });

        this.values = values;
        this.state = "pending"; //ready, removed;

        const cols = getRecs(db._cols, _ent);
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
        const { current, before, state } = this;

        const { name, formula, noCache } = _col.current;
        const t = _col.traits;
        const isVirtual = (formula != null && noCache != null);
    
        const prop = {
            enumerable:true, configurable:true,
            set:_=>{ throw new Error(this.msg("for update use db.update(...) interface", {column:name})) }
        };

        if (isVirtual) { prop.get = _=>t.getter(t.setter(this, this.values, this.values[name])); }
        else { prop.get = _=>t.getter(this.push.isPending ? this.push.pull(_col) : this.values[name]); }
        Object.defineProperty(current, name, prop);

        if (!isVirtual) { prop.get = _=>t.getter(this.values[name]); }
        Object.defineProperty(before, name, prop);

        if (state === "ready") { t.setter(this, this.values, this.values[name], true); }
    }

    removeColumn(name) {
        const { current, before } = this;
        delete this.values[name];
        delete current[name];
        delete before[name];
    }

    prepareInit() {
        const { state, push, values } = this;
        if (state === "pending") { push.prepare(values); }
        return this;
    }

    init() {
        const { push } = this;
        this.values = push.execute();
        this.state = "ready";
        return push.close();
    }

    set(input, ctx, isUpdate=false, force=false) {
        const { db, current, push } = this;

        push.prepare(input, isUpdate);
        this.values = push.execute();

        if (push.isChanged) {
            afterUpdate(db, current, ctx);
        }

        return push.close();
    }

    remove(ctx, force=false) {
        const { db, current, isMeta } = this;
        const errors = new Map();
        if (!force && isMeta) { errors.set(undefined, "is meta"); }
        else {
            this.state = "removed";
            _records.delete(this);
            afterRemove(db, current, ctx);
        }
        
        return solids({}, {
            isDone:!errors.size,
            errors
        });
    }

}