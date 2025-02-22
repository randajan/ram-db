import { fceTrue } from "../../../../components/uni/consts";
import { getColsPriv } from "./_columns";

export const entAdd = (process, _rec)=>{
    const { db, values:{ _ent, id } } = _rec;
    if (_ent !== "_ents") { return; }

    db.add({_ent:"_cols", ent:id, name:"_ent", type:"ref", ref:"_ents", meta:"numb", isReadonly:fceTrue, isRequired:fceTrue}, process.context);
    db.add({_ent:"_cols", ent:id, name:"id", type:"string", meta:"soft", isReadonly:fceTrue, isRequired:fceTrue}, process.context);
}


export const entRem = (_rec)=>{
    const { db, values } = _rec;
    if (values._ent !== "_ents") { return; }

    for (const _col of getColsPriv(db, values.id)) { _col.remove(process.context, true); };
}