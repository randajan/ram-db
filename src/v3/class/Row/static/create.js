import { toId } from "../../../tools/traits/uni";
import { Column } from "../Column";
import { Entity } from "../Entity";
import { Row } from "../Row";



export const createRow = (db, values)=>{
    values = Object.assign({}, values);

    const _ent = values._ent = toId(values._ent);

    if (_ent === "_cols") { return new Column(db, values); } 
    if (_ent === "_ents") { return new Entity(db, values); }

    return new Row(db, values);
    
}