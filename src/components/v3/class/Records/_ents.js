import { metaDataDynamic } from "../../metaData/interface";
import { getColsPriv } from "./_columns";
import { addRec, loadRec } from "./_records";

export const addEnt = (_rec, ctx)=>{
    const { db, values } = _rec;
    if (values._ent !== "_ents") { return; }

    for (const mdd of metaDataDynamic(values.id)) { addRec(db, mdd, ctx); }
}

export const loadEnt = (_rec, ctx)=>{
    const { db, values } = _rec;
    if (values._ent !== "_ents") { return; }

    for (const mdd of metaDataDynamic(values.id)) { loadRec(db, mdd, ctx); }
}


export const remEnt = (_rec, ctx)=>{
    const { db, values } = _rec;
    if (values._ent !== "_ents") { return; }

    for (const _col of getColsPriv(db, values.id)) { _col.remove(ctx, true); };
}