import { toRefId } from "../../../uni/formats";
import { getRec } from "../../effects/_bits";
import { afterAdd, afterLoad } from "../../effects/afterAdd";
import { afterUpdate } from "../../effects/afterUpdate";
import { loadEnt } from "./_ents";
import { RecordPrivate } from "./RecordPrivate";

const _records = new WeakMap();

export const regRec = _rec=>{
    _records.set(_rec.current, _rec);
    return _rec;
}

export const unregRec = _rec=>{
    _records.delete(_rec.current);
    return _rec;
}

const createRec = (db, values)=>(new RecordPrivate(db)).valsLoad(values);

export const getRecPriv = (db, any, throwError=true)=>{
    const _p = _records.get(any);
    if (_p && (!db || db === _p.db)) { return _p; }
    if (throwError) { throw Error(db.msg("is not record", {row:toRefId(any)})); };
}

export const loadRec = (db, values, ctx)=>{
    const id = toRefId(values);
    const _ent = toRefId(values._ent);

    const brother = getRec(db, _ent, id);
    const _rec = brother ? getRecPriv(db, brother) : createRec(db, values);

    if (brother) {
        _rec.valsLoad(values);
        afterUpdate(db, { current:_rec.current }, ctx); //TODO!!!
    }
    else {
        afterLoad(db, _rec.current);
        loadEnt(_rec, ctx);
    }
    
    return _rec;
}

export const addRec = (db, values, ctx)=>{
    const _rec = createRec(db, values);
    const res = _rec.colsInit().colsPrepare().colsFinish();
    if (res.isOk) { afterAdd(db, res, ctx); }
    return res;
}

export const addOrSetRec = (db, values, ctx, isUpdate)=>{
    const _rec = createRec(db, values).valsLoad(values).colsInit().colsPrepare();
    const { _ent, id } = _rec.current;

    const brother = getRec(db, toRefId(_ent), id);
    if (brother) { return getRecPriv(db, brother).valsPush(values, ctx, isUpdate); }

    const res = _rec.colsFinish();
    if (res.isOk) { afterAdd(db, res, ctx); }
    return res;
}

export const removeRec = (db, record, ctx, force)=>getRecPriv(db, record).remove(ctx, force);