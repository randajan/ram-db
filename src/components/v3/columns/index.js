


import { toRefId, toStr } from "../../uni/formats";
import { meta } from "../meta";



const createColumn = (db, col)=>{
    const { type, fallback, required, formula } = col;
    const typeId = toRefId(type);
    const ref = toRefId(col.ref);
    const convert = type.to || meta._types[typeId]?.to || (_=>_);

    const getter = typeId == "ref" ? from=>db.get(ref, from, false) : from=>from;

    const setter = (row, to, from)=>{
        if (formula) { to = formula(row, col); }
        if (typeId == "ref") { to = toRefId(to); }
        if (to == null) { to = fallback; }
        if (to == null && !(required > 0)) { return; }
        return convert(to, col);
    }

    return { getter, setter };
}

export const defineColumn = (db, col)=>{
    const { name, ent, formula, noCache } = col;
    const rows = db.getList(toRefId(ent));
    
    const { getter, setter } = createColumn(db, col);

    for (const row of rows) {
        if (formula && noCache) {
            Object.defineProperty(row, name, {
                get:_=>getter(setter(row)),
            });
        } else {
            let current = setter(row, row[name]); 
            Object.defineProperty(row, name, {
                get:_=>getter(current),
                set:to=>current = setter(row, to, current)
            });
        }

    }
}