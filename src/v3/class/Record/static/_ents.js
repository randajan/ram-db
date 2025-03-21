import { fceTrue } from "../../../../components/uni/consts";
import { getColsPriv } from "./_columns";
import { _recRemoveForce } from "./remove";

export const _entAdd = (process, _rec)=>{
    const { db, values:{ _ent, id } } = _rec;
    if (_ent !== "_ents") { return; }

    db.add({_ent:"_cols", ent:id, name:"_ent", type:"ref", ref:"_ents", meta:"numb", isReadonly:fceTrue, isRequired:fceTrue}, process.context);
    db.add({_ent:"_cols", ent:id, name:"id", type:"string", meta:"soft", isReadonly:fceTrue, isRequired:fceTrue}, process.context);
}


export const _entRem = (process, _rec)=>{
    const { db, values:{ _ent, id } } = _rec;
    if (_ent !== "_ents") { return; }

    for (const _col of getColsPriv(db, id)) { _recRemoveForce(db, [_col.current], process.context); };
}