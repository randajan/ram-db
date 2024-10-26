import { toRefId } from "../../uni/formats";
import { getRecPriv } from "../class/Record";
import { meta } from "../meta";
import { getRecs } from "../effects/_bits";

const createTraits = (db, col)=>{
    const { type, fallback, required, formula } = col;
    const typeId = toRefId(type);
    const ref = toRefId(col.ref);

    const _setter = type.setter || meta._types[typeId]?.setter || (v=>v);
    const _getter = type.getter || meta._types[typeId]?.getter || (v=>v);

    const getter = typeId == "ref" ? from=>db.get(ref, from, false) : _getter;

    const setter = (to, current, before)=>{
        if (formula) { to = formula(current, col, before); }
        if (typeId == "ref") { to = toRefId(to); }
        if (to == null) { to = fallback; }
        if (to == null && !(required > 0)) { return; }
        return _setter(to, col);
    }

    return { getter, setter };
}

export const defineColumn = (db, col)=>{

    const _col = getRecPriv(db, col);

    _col.traits = createTraits(db, col);

    const rows = getRecs(db, toRefId(col.ent));

    if (rows) {
        for (const [_, row] of rows) { getRecPriv(db, row).addColumn(_col); }
    }

}