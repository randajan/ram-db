import { toRefId } from "../../uni/formats";
import { getRecs } from "../class/static/_bits";
import { setTrait } from "./traits";

export const _records = new WeakMap();

export const isRecord = (any, db)=>{
    const _p = _records.get(any);
    return !_p ? false : !db ? true : _p.db === db; 
}

export const createRecord = (db, data)=>{
    const record = {...data};

    const _rec = {
        db,
        record,
        pull:{},
        columns:{},
        current:{...data}
    };

    _records.set(record, _rec);

    const cols = getRecs(db.cols, toRefId(record._ent));

    if (cols) {
        for (const [_, col] of cols) { setTrait(_rec, _records.get(col)); }
    }

    return record;
}