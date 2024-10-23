import { toRefId } from "../../uni/formats";
import { _records } from "./records";
import { meta } from "../meta";
import { getRecs } from "../class/static/_bits";
import { setTrait } from "./traits";


const defineTraits = (db, col, colPrivate)=>{
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

    colPrivate.traits = { getter, setter };
}

export const createColumn = (db, col)=>{

    const _col = _records.get(col);

    defineTraits(db, col, _col);

    const rows = getRecs(db, toRefId(col.ent));

    if (rows) {
        for (const [_, row] of rows) { setTrait(_records.get(row), _col); }
    }

}