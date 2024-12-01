import { toRefId } from "../../../../components/uni/formats";
import { _chopGetRec } from "../../Chop/static/_private";
import { afterAdd, afterAddInit } from "../../Chop/static/afterAdd";
import { afterUpdate, afterUpdateInit } from "../../Chop/static/afterUpdate";
import { loadEnt } from "./_ents";
import { RecordPrivate } from "../RecordPrivate";
import { Major } from "../../Result/Fails";

const _records = new WeakMap();

export const regRec = _rec=>{
    _records.set(_rec.current, _rec);
    return _rec;
}

export const unregRec = _rec=>{
    _records.delete(_rec.current);
    return _rec;
}

export const getRecPriv = (any, throwError=true)=>{
    const _p = _records.get(any);
    if (_p) { return _p; }
    if (throwError) { throw Major.fail("is not record"); };
}

export const loadRec = (db, values, ctx)=>{
    const id = toRefId(values);
    const _ent = toRefId(values._ent);

    const brother = _chopGetRec(db, _ent, id);
    const _rec = brother ? getRecPriv(brother) : new RecordPrivate(db, values);

    if (brother) {
        _rec.valsLoad(values);
        afterUpdateInit(db, _rec.current); //TODO!!!
    }
    else {
        afterAddInit(db, _rec.current);
        loadEnt(_rec);
    }
    
    return _rec;
}

export const addRec = (db, values, ctx)=>{
    const _rec = new RecordPrivate(db, values);
    const res = _rec.colsInit().colsPrepare().colsFinish();
    if (res.isOk) { afterAdd(db, res, ctx); }
    return res;
}

export const addOrSetRec = (db, values, ctx, isUpdate)=>{
    const _rec = new RecordPrivate(db, values).colsInit().colsPrepare();
    const { _ent, id } = _rec.current;

    const brother = _chopGetRec(db, toRefId(_ent), id);
    if (brother) { return getRecPriv(brother).valsPush(values, ctx, isUpdate); }

    const res = _rec.colsFinish();
    if (res.isOk) { afterAdd(db, res, ctx); }
    return res;
}