import { toId } from "../../../tools/traits/uni";
import { _Column } from "../_Column";
import { _Entity } from "../_Entity";
import { _Record } from "../_Record";
import { _Type } from "../_Type";



export const createRecord = (db, values)=>{
    values = Object.assign({}, values);

    const _ent = values._ent = toId(values._ent);

    if (_ent === "_ents") { return new _Entity(db, values); }
    if (_ent === "_types") { return new _Type(db, values); }
    if (_ent === "_cols") { return new _Column(db, values); } 

    return new _Record(db, values);
    
}