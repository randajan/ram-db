import { isNull, reArray, toRefId } from "../../../uni/formats";
import { getRecPriv } from "./_records";
import { metaData } from "../../metaData/interface";
import { getRecs } from "../../effects/_bits";
import { cacheds, solid } from "@randajan/props";
import { ColMajor, ColMinor } from "../Exceptions";
import { vault } from "../../../uni/consts";

const nregCol = (db, entId, _col, action)=>{
    const colsByEnt = vault.get(db)?.colsByEnt;
    if (!colsByEnt) { throw Error(db.msg(`columns not found`)); }
    let cols = colsByEnt.get(entId);

    if (action) {
        if (cols) { cols.add(_col); }
        else { colsByEnt.set(entId, new Set([_col]));  }
    } else if (cols) {
        if (cols.size > 1) {cols.delete(_col);  }
        else { colsByEnt.delete(entId); }
    }
};

export const getColsPriv = (db, entId)=>vault.get(db)?.colsByEnt?.get(entId);

const createGetter = _col=>{
    const { db, current:col, values:v } = _col;
    
    const { getter } = (metaData._types[v.type] || col.type);

    const typize = v.type == "ref" ? from=>_col.db.get(v.ref, from, false) : v=>getter(v, col);
    const n = !v.isList ? typize : f=>reArray(f, typize);

    return n;
}

const createSetter = _col=>{
    const { db, current:col, values:v } = _col;

    const { name, ref, parent, formula, validator, isReadonly, resetIf, init, fallback, isRequired, isList } = col;
    const { setter } = (metaData._types[v.type] || col.type);

    const typize = t=>isNull(t) ? undefined : setter(t, col);
    const n = !isList ? typize : t=>isNull(t) ? undefined : reArray(t, typize);

    return (current, output, to, before)=>{
        if (formula) { to = output[name] = n(formula(current, col, before)); }
        else {
            if (isReadonly && isReadonly(current, col, before)) {
                if (before) { throw new ColMinor(name, `is readonly`); }
            } else {
                to = output[name] = n(to);
                if (validator && !validator(current[name], before[name], current, col, before)) { throw new ColMajor(name, "is invalid"); }
            }

            if ((!before && isNull(to)) || (resetIf && resetIf(current, col, before))) { 
                to = output[name] = !init ? undefined : n(init(current, col, before));
            }
        }
        if (isNull(to) && fallback) { to = output[name] = n(fallback(current, col, before)); }
        if (isNull(to) && isRequired && isRequired(current, col, before)) { throw new ColMajor(name, "is required"); }
        return output[name];
    }
}

const createTraits = _col=>{
    return cacheds({}, {}, {
        getter:_=>createGetter(_col),
        setter:_=>createSetter(_col)
    });
}

export const setCol = (_rec, ctx)=>{
    const { db, values } = _rec;
    if (values._ent !== "_cols") { return; }

    const ent = values.ent;

    nregCol(db, ent, _rec, true);

    solid(_rec, "traits", createTraits(_rec), true, true);

    const rows = getRecs(db, ent);
    if (rows) {
        for (const [_, row] of rows) { getRecPriv(db, row).colAdd(_rec); }
    }

}

export const remCol = (_rec, ctx)=>{
    const { db, values } = _rec;
    if (values._ent !== "_cols") { return; }

    nregCol(db, values.ent, _rec, false);

    const rows = getRecs(db, values.ent);
    if (rows) {
        for (const [_, row] of rows) { getRecPriv(db, row).colRem(values.name); }
    }

}

