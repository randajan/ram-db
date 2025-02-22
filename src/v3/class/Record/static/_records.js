import { _chopGetRec } from "../../Chop/static/eventHandlers";
import { RecordPrivate } from "../RecordPrivate";
import { throwMajor, toId } from "../../../tools/traits/uni";
import { syncIn } from "../../Chop/static/eventHandlers";
import { solid } from "@randajan/props";


const _records = new WeakMap();

export const recReg = _rec=>_records.set(_rec.current, _rec);
export const recUnreg = _rec=>_records.delete(_rec.current);

export const recGetPriv = (db, any, throwError=true)=>{
    const _p = _records.get(any);
    if (_p && _p.db === db) { return _p; }
    if (throwError) { throwMajor("is not record"); };
}

export const recAdd = (process, values)=>{
    solid(process, "action", "add");

    const _rec = new RecordPrivate(process.db, values);

    _rec.colsInit().init(process).ready();

    syncIn(process, _rec.current);
}


export const recRemoveForce = (process, _rec)=>{
    solid(process, "action", "remove");
    _rec.remove(process, true);
}

export const recRemove = (process, record)=>{
    solid(process, "action", "remove");
    recGetPriv(process.db, record).remove(process, false);
}

const _recUpdate = (process, record, force=false)=>{
    solid(process, "action", "update");
    recGetPriv(process.db, record).update(process, values, force);
}
export const recSet = (process, record, values)=>_recUpdate(process, record, values, true);
export const recUpdate = (process, record, values)=>_recUpdate(process, record, values, false);


const _recAddOrUpdate = (process, values, force=false)=>{
    const { db } = process;

    process.action = "addOrUpdate";
    
    const _rec = new RecordPrivate(db, values).colsInit().init(process);
    const { _ent, id } = _rec.current;

    const brother = _chopGetRec(db, toId(_ent), id);

    if (brother) {
        solid(process, "action", "update");
        recGetPriv(db, brother).update(values, ctx, force);
    } else {
        solid(process, "action", "add");
        _rec.ready();
        syncIn(process, _rec.current);
    }
}
export const recAddOrSet = (process, values)=>_recAddOrUpdate(process, values, true);
export const recAddOrUpdate = (process, values)=>_recAddOrUpdate(process, values, false);
