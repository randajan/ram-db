import { fail } from "../../../tools/traits/uni";
import { _chopGetRec, _chopSyncIn } from "../../Chop/static/sync";


const _records = new WeakMap();

export const recReg = _rec=>_records.set(_rec.current, _rec);
export const recUnreg = _rec=>_records.delete(_rec.current);

export const _recGetPriv = (db, any, throwError=true)=>{
    const _p = _records.get(any);
    if (_p && _p.db === db) { return _p; }
    if (throwError) { fail("is not record"); };
}
