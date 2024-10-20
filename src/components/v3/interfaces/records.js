import { vault } from "../../uni/consts";
import { toRefId } from "../../uni/formats";
import { getRecs } from "../class/static/_bits";
import { setColumn } from "./columns";

export const _records = new WeakMap();

export const isRecord = (any, db)=>{
    const _p = _records.get(any);
    return !_p ? false : !db ? true : _p.db === db; 
}

export const createRecord = (db, data)=>{
    const _p = {
        db,
        current:{...data}
    };

    const record = {...data};
    _records.set(record, _p);

    const cols = getRecs(db.cols, toRefId(record._ent));

    if (cols) {
        for (const [_, col] of cols) {
            setColumn(record, _p, col, _records.get(col));
        }
    }

    return record;
}