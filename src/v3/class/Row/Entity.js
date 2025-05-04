import { fceTrue } from "../../../components/uni/consts";
import { _recRemoveForce } from "./actions/remove";
import { Row } from "./Row";


/*
    db.fit((next, event, task)=>{
        const { record } = task;
        next();

        const _rec = _recGetPriv(db, record);

        if (event === "add") {
            _entAdd(task, _rec);
            _colSet(_rec);
        }
        else if (event === "update") {
            _colSet(_rec);
        }
        else if (event === "remove") {
            _entRem(task, _rec);
            _colRem(_rec);
        }

    });
*/

export class Entity extends Row {
    constructor(db, values) {
        super(db, values);
    }

    fit(next, event, task) {
        next();
        const { _db, db, values:{ id } } = row;

        if (event === "add") {
            const temp = { _ent:"_cols", ent:id, isReadonly:fceTrue, isRequired:fceTrue };
    
            db.add({ ...temp, name:"_ent", type:"ref", ref:"_ents", meta:3}, task?.context);
            db.add({ ...temp, name:"id", type:"string", meta:1, }, task?.context);
        }
        else if (event === "remove") {
            for (const _col of _db.colsByEnt.values(id)) {
                _recRemoveForce(db, [_col.current], task?.context);
            };
        }
        

    }

}