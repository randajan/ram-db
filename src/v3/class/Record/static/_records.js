import { _chopGetRec } from "../../Chop/static/gets";
import { sync } from "../../Chop/static/eventHandlers";
import { RecordPrivate } from "../RecordPrivate";
import { Major } from "../../Result/Fails";
import { toId } from "../../../tools/traits/uni";

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

export const loadRec = (db, values)=>{
    const _rec = new RecordPrivate(db, values);

    sync(db, _rec.current, true);
    
    return _rec;
}

export const addOrSetRec = (db, values, ctx, isUpdate)=>{
    const _rec = new RecordPrivate(db, values).colsInit().colsPrepare();
    const { _ent, id } = _rec.current;

    const brother = _chopGetRec(db, toId(_ent), id);
    if (brother) { return getRecPriv(brother).valsPush(values, ctx, isUpdate); }

    const res = _rec.colsFinish();
    if (res.isOk) { afterAdd(db, res, ctx); } //TODO afterAdd was replaced with sync
    return res;
}