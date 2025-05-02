import { fceTrue } from "../../../../components/uni/consts";
import { _recRemoveForce } from "./remove";

export const _entAdd = (task, _rec)=>{
    const { db, values:{ _ent, id } } = _rec;
    if (_ent !== "_ents") { return; }

    db.add({_ent:"_cols", ent:id, name:"_ent", type:"ref", ref:"_ents", meta:3, isReadonly:fceTrue, isRequired:fceTrue}, task.context);
    db.add({_ent:"_cols", ent:id, name:"id", type:"string", meta:1, isReadonly:fceTrue, isRequired:fceTrue}, task.context);
}

export const _entRem = (task, _rec)=>{
    const { _db, db, values:{ _ent, id } } = _rec;
    if (_ent !== "_ents") { return; }

    for (const _col of _db.colsByEnt.values(id)) { _recRemoveForce(db, [_col.current], task.context); };
}