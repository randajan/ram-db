import { toRefId } from "../../uni/formats";
import { getRecPriv } from "./Record";
import { meta } from "../meta";
import { getRecs } from "../effects/_bits";
import { fceNone, fcePass } from "../../uni/consts";

const _columnsByEnt = new Map();

export const getColsPriv = entId=>_columnsByEnt.get(entId);

const createGetter = _col=>{
    const col = _col.current;
    const v = _col.values;
    
    const { getter } = (meta._types[v.type] || col.type);
    return v.type == "ref" ? from=>_col.db.get(v.ref, from, false) : getter;
}

const createSetter = _col=>{
    const col = _col.current;
    const v = _col.values;

    let { name, formula, validator, resetIf, init, fallback, isRequired } = col;
    const { setter } = (meta._types[v.type] || col.type);

    const typize = v=>v == null ? undefined : setter(v, col);
    const n = v.type != "ref" ? typize : v=>typize(toRefId(v));

    return ({current, before}, output, to, initializing)=>{
        if (formula) { to = output[name] = n(formula(current, col, before)); }
        else {
            to = output[name] = n(to);
            if (validator && !validator(current[name], before[name], current, col, before)) { throw Error("is invalid"); }

            if ((initializing && to == null) || (resetIf && resetIf(current, col, before))) { 
                to = output[name] = !init ? undefined : n(init(current, col, before));
            }
        }

        if (to == null && fallback) { to = output[name] = n(fallback(current, col, before)); }
        if (to == null && isRequired && isRequired(current, col, before)) { throw Error("is required"); }
        return output[name];
    }
}

const createTraits = _col=>{
    let getter, setter;
    return Object.defineProperties({}, {
        getter:{get:_=>getter || (getter = createGetter(_col))},
        setter:{get:_=>setter || (setter = createSetter(_col))}
    });
}

export const setColumn = (db, col)=>{

    const _col = getRecPriv(db, col);
    const ent = toRefId(col.ent);

    if (_columnsByEnt.has(ent)) { _columnsByEnt.get(ent).add(_col); }
    else { _columnsByEnt.set(ent, new Set([_col])); }

    _col.traits = createTraits(_col);

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

