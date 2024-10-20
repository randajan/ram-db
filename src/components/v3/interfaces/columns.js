


import { toRefId, toStr } from "../../uni/formats";
import { _records } from "./records";
import { meta } from "../meta";
import { getRecs } from "../class/static/_bits";

const defineColumnInterface = (db, col, colPrivate)=>{
    const { type, fallback, required, formula } = col;
    const typeId = toRefId(type);
    const ref = toRefId(col.ref);
    const convert = type.to || meta._types[typeId]?.to || (_=>_);

    const getter = typeId == "ref" ? from=>db.get(ref, from, false) : from=>from;

    const setter = (row, to)=>{
        if (formula) { to = formula(row, col); }
        if (typeId == "ref") { to = toRefId(to); }
        if (to == null) { to = fallback; }
        if (to == null && !(required > 0)) { return; }
        return convert(to, col);
    }

    colPrivate.columnInterface = { getter, setter };
}

export const setColumn = (row, rowPrivate, col, colPrivate)=>{
    const { current } = rowPrivate;
    const { name, formula, noCache } = col;
    const { columnInterface:{ getter, setter } } = colPrivate;

    if (formula && noCache) {
        Object.defineProperty(row, name, {
            get:_=>getter(setter(row)),
        });
    } else {
        Object.defineProperty(row, name, {
            get:_=>getter(current[name]),
            set:to=>current[name] = setter(row, to, current[name])
        });
        
        row[name] = current[name];
    }

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