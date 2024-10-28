import { toRefId } from "../../uni/formats";
import { getRecPriv } from "./Record";
import { meta } from "../meta";
import { getRecs } from "../effects/_bits";

const _columnsByEnt = new Map();

export const getColsPriv = entId=>_columnsByEnt.get(entId);

const createGetter = (db, _col)=>{
    const col = _col.current;
    const v = _col.values;
    
    const { id, getter } = meta._types[v.type] || col.type;

    return id == "ref" ? from=>db.get(v.ref, from, false) : getter;
}

const createSetter = (db, _col)=>{
    const col = _col.current;
    const v = _col.values;

    const { formula, initial, isReadonly, fallback, isRequired } = col;
    const { id:typeId, setter } = meta._types[v.type] || col.type;
    const norm = typeId == "ref" ? toRefId : v=>v;

    return (to, {current, before}, initializing)=>{
        if (formula) { to = formula(current, col, before); }
        else if (!initializing && isReadonly && isReadonly(current, col, before)) { throw Error("is readonly"); }

        to = norm(to);
        if (initializing && to == null && initial) { to = norm(initial(current, col, before)); }
        if (to == null && fallback) { to = norm(fallback); }
        if (to == null && isRequired && isRequired(current, col, before)) { throw Error("is required"); }
        if (to == null) { return; }
        return setter(to, col);
    }
}

const createTraits = (db, _col)=>{
    let getter, setter;
    return Object.defineProperties({}, {
        getter:{get:_=>getter || (getter = createGetter(db, _col))},
        setter:{get:_=>setter || (setter = createSetter(db, _col))}
    });
}

export const setColumn = (db, col)=>{

    const _col = getRecPriv(db, col);
    const ent = toRefId(col.ent);

    if (_columnsByEnt.has(ent)) { _columnsByEnt.get(ent).add(_col); }
    else { _columnsByEnt.set(ent, new Set([_col])); }

    _col.traits = createTraits(db, _col);

    const rows = getRecs(db, ent);
    if (rows) {
        for (const [_, row] of rows) { getRecPriv(db, row).addColumn(_col); }
    }

}

export const removeColumn = (db, col)=>{
    const { name, ent } = col;

    const rows = getRecs(db, toRefId(ent));
    if (rows) {
        for (const [_, row] of rows) { getRecPriv(db, row).removeColumn(name); }
    }

}

