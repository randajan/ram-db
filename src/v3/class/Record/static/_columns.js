import { isNull, reArray } from "../../../../components/uni/formats";
import { recGetPriv } from "./_records";
import { metaData } from "../../../metaData/interface";
import { _chopGetRecs } from "../../Chop/static/eventHandlers";
import { cacheds, solid } from "@randajan/props";
import { vault } from "../../../../components/uni/consts";
import { throwMajor } from "../../../tools/traits/uni";

const nregCol = (db, entId, _col, action)=>{
    const colsByEnt = vault.get(db)?.colsByEnt;
    if (!colsByEnt) { throwMajor("columns not found"); }
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

    const typize = v.type == "ref" ? from=>db.get(v.ref, from, false) : v=>getter(v, col);
    const n = !v.isList ? typize : f=>reArray(f, typize);

    return n;
}

const createSetter = _col=>{
    const { db, current:col, values:v } = _col;

    const { name, ref, parent, formula, store, noCache, validator, isReadonly, resetIf, init, fallback, isRequired, isList } = col;
    const { setter } = (metaData._types[v.type] || col.type);

    const typize = t=>isNull(t) ? undefined : setter(t, col);
    const n = !isList ? typize : t=>isNull(t) ? undefined : reArray(t, typize);

    const stored = !store ? undefined : store(col, db);

    return (current, output, to, before)=>{

        if (formula) { to = output[name] = n(formula(current, before, stored)); }
        else {
            if (isReadonly && isReadonly(current, before, stored)) {
                if (before) { throwMino(`is readonly`); }
            } else {
                to = output[name] = n(to);
                if (validator && !validator(current, before, stored)) {
                    throwMajor("is invalid");
                }
            }

            if ((!before && isNull(to)) || (resetIf && resetIf(current, before, stored))) { 
                to = output[name] = !init ? undefined : n(init(current, before, stored));
            }
        }

        if (fallback && isNull(to)) { to = output[name] = n(fallback(current, before, stored)); }
        if (isRequired && isNull(to) && isRequired(current, before, stored)) { throwMajor("is required"); }
        
        return output[name];
    }
}

const createTraits = _col=>{
    return cacheds({}, {}, {
        getter:_=>createGetter(_col),
        setter:_=>createSetter(_col)
    });
}

export const colSet = (_rec)=>{
    const { db, values:{ _ent, ent } } = _rec;
    if (_ent !== "_cols") { return; }

    nregCol(db, ent, _rec, true);

    solid(_rec, "traits", createTraits(_rec), true, true);

    const rows = _chopGetRecs(db, ent);
    if (rows) {
        for (const [_, row] of rows) { recGetPriv(db, row).colAdd(_rec); }
    }

}

export const colRem = (_rec)=>{
    const { db, values } = _rec;
    if (values._ent !== "_cols") { return; }

    nregCol(db, values.ent, _rec, false);

    const rows = _chopGetRecs(db, values.ent);
    if (rows) {
        for (const [_, row] of rows) { recGetPriv(db, row).colRem(values.name); }
    }

}

