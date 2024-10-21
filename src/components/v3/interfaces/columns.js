


import { toRefId, toStr } from "../../uni/formats";
import { _records } from "./records";
import { meta } from "../meta";
import { getRecs } from "../class/static/_bits";

const noSetFactory = (db, recId, colName)=>_=>{
    throw Error(db.msg(`can't be set because column '${colName}' has defined formula`, recId));
}

const defineColumnInterface = (db, col, colPrivate)=>{
    const { type, fallback, required, formula } = col;
    const typeId = toRefId(type);
    const ref = toRefId(col.ref);

    const _setter = type.setter || meta._types[typeId]?.setter || (v=>v);
    const _getter = type.getter || meta._types[typeId]?.getter || (v=>v);

    const getter = typeId == "ref" ? from=>db.get(ref, from, false) : _getter;

    const setter = (row, to)=>{
        if (formula) { to = formula(row, col); }
        if (typeId == "ref") { to = toRefId(to); }
        if (to == null) { to = fallback; }
        if (to == null && !(required > 0)) { return; }
        return _setter(to, col);
    }

    colPrivate.columnInterface = { getter, setter };
}

export const setColumn = (row, rowPrivate, col, colPrivate)=>{
    const { db, current } = rowPrivate;
    const { name, formula, noCache } = col;
    const { columnInterface:{ getter, setter } } = colPrivate;

    const get = (formula && noCache) ? _=>getter(setter(row)) : _=>getter(current[name]);
    const set = (formula) ? noSetFactory(db, row.id, col.name) : v=>db.update(row, {[name]:v});

    Object.defineProperty(row, name, { enumerable:true, get, set });
}

export const createColumn = (db, col)=>{

    const colPrivate = _records.get(col);

    defineColumnInterface(db, col, colPrivate);

    const rows = getRecs(db, toRefId(col.ent));

    if (rows) {
        for (const [_, row] of rows) {
            setColumn(row, _records.get(row), col, colPrivate);
        }
    }

}