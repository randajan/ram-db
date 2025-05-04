import { fail } from "../../tools/traits/uni";
import { _chopGetRec } from "../Chop/static/sync";


const _records = new WeakMap();

export const recReg = _rec=>_records.set(_rec.current, _rec);
export const recUnreg = _rec=>_records.delete(_rec.current);

export const _recIs = (db, rec)=>{
    const _p = _records.get(rec);
    return (_p && _p.db === db);
}

export const _recGetPriv = (db, rec, throwError=true)=>{
    const _p = _records.get(rec);
    if (_p && _p.db === db) { return _p; }
    if (throwError) { fail("is not record"); };
}

const _recToJSON = (_rec)=>{
    const r = {};
    for (const _col of _rec.getCols()) {
        const { name, type:{ saver } } = _col.current;
        let value = _rec.getCol(name, true);
        if (isNull(value)) { continue; }
        r[name] = saver ? saver(value) : value;
    }
    return r;
}

export function createRecord(_rec, isCurrent) {

    const get = p=>_rec.getCol(p, isCurrent);
    const id = _=>get("id");
    const json = _=>_recToJSON(_rec);
    
    const handler = {
        get:(_, p)=>(p === "toString") ? id : p === "toJSON" ? json : get(p),
        has:(_, p)=>_rec.hasCol(p),
        set:(_, p, value)=>_rec.db.update(proxy, {[p]:value}),
        deleteProperty:(_, p)=>_rec.db.update(proxy, {[p]:null}),
        ownKeys:_=>[..._rec.getColsNames()],
        getOwnPropertyDescriptor: (_, p) => ({
            enumerable: true,
            configurable: true,
            value: get(p)
        })
    };

    const proxy = new Proxy({}, handler);
    return proxy;
}