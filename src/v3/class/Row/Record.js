import { fail } from "../../tools/traits/uni";
import { _chopGetRec } from "../Chop/static/sync";


const _records = new WeakMap();

export const recReg = row=>_records.set(row.current, row);
export const recUnreg = row=>_records.delete(row.current);

export const _recIs = (db, rec)=>{
    const _p = _records.get(rec);
    return (_p && _p.db === db);
}

export const _recGetPriv = (db, rec, throwError=true)=>{
    const _p = _records.get(rec);
    if (_p && _p.db === db) { return _p; }
    if (throwError) { fail("is not record"); };
}

const _recToJSON = (row)=>{
    const r = {};
    for (const _col of row.getCols()) {
        const { name, type:{ saver } } = _col.current;
        let value = row.getCol(name, true);
        if (isNull(value)) { continue; }
        r[name] = saver ? saver(value) : value;
    }
    return r;
}

export function createRecord(row, isCurrent) {

    const get = p=>row.getCol(p, isCurrent);
    const id = _=>get("id");
    const json = _=>_recToJSON(row);
    
    const handler = {
        get:(_, p)=>(p === "toString") ? id : p === "toJSON" ? json : get(p),
        has:(_, p)=>row.hasCol(p),
        set:(_, p, value)=>row.db.update(proxy, {[p]:value}),
        deleteProperty:(_, p)=>row.db.update(proxy, {[p]:null}),
        ownKeys:_=>[...row.getColsNames()],
        getOwnPropertyDescriptor: (_, p) => ({
            enumerable: true,
            configurable: true,
            value: get(p)
        })
    };

    const proxy = new Proxy({}, handler);
    return proxy;
}