import { toRefId } from "../../uni/formats";
import { getRecPriv } from "./Record";
import { meta } from "../meta";
import { getRecs } from "../effects/_bits";
import { fceNone, fcePass } from "../../uni/consts";
import { cacheds, solid } from "@randajan/props";
import { ColMajor, ColMinor } from "./Exceptions";

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

    const { name, formula, validator, isReadonly, resetIf, init, fallback, isRequired } = col;
    const { setter } = (meta._types[v.type] || col.type);

    const typize = v=>v == null ? undefined : setter(v, col);
    const n = v.type != "ref" ? typize : v=>typize(toRefId(v));

    return ({current, before}, output, to, isInit)=>{
        if (formula) { to = output[name] = n(formula(current, col, before)); }
        else {
            if (!isInit && isReadonly && isReadonly(current, col, before)) { throw new ColMinor(name, `is readonly`); }
            to = output[name] = n(to);
            if (validator && !validator(current[name], before[name], current, col, before)) { throw new ColMajor(name, "is invalid"); }

            if ((isInit && to == null) || (resetIf && resetIf(current, col, before))) { 
                to = output[name] = !init ? undefined : n(init(current, col, before));
            }
        }

        if (to == null && fallback) { to = output[name] = n(fallback(current, col, before)); }
        if (to == null && isRequired && isRequired(current, col, before)) { throw new ColMajor(name, "is required"); }
        return output[name];
    }
}

const createTraits = _col=>{
    return cacheds({}, {}, {
        getter:_=>createGetter(_col),
        setter:_=>createSetter(_col)
    });
}

export const setColumn = (db, col)=>{

    const _col = getRecPriv(db, col);
    const ent = _col.values.ent = toRefId(_col.values.ent);

    if (_columnsByEnt.has(ent)) { _columnsByEnt.get(ent).add(_col); }
    else { _columnsByEnt.set(ent, new Set([_col])); }

    solid(_col, "traits", createTraits(_col), true, true);

    //this is because columns of columns that are not meta can be updated
    solid(_col, "isMetaColumn", !meta.hasOwnProperty(ent)); 

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

