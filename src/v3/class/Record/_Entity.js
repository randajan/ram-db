import { fceTrue } from "../../../components/uni/consts";
import { _recRemoveForce } from "./actions/remove";
import { _Record } from "./_Record";
import { metaData } from "../../metaData/interface";
import { toString } from "../../tools/traits/strings";


export class _Entity extends _Record {
    constructor(db, values) {
        super(db, values);

        const v = this.values;
        v.id = toString(v.id);

        const metaRec = metaData._ents[v.id];
        if (metaRec) {
            this.meta = v.meta = metaRec.meta;
        } else {
            this.meta = v.meta = 0;
        }
        
    }

    fit(next, event, task) {
        next();
        const { _db, db, values:{ id } } = this;

        if (event === "add") {
            const temp = { _ent:"_cols", ent:id, isReadonly:fceTrue, isRequired:fceTrue };
    
            db.add({ ...temp, name:"_ent", type:"ref", ref:"_ents", meta:2}, task?.context);
            db.add({ ...temp, name:"id", type:"string", meta:1, }, task?.context);
        }
        else if (event === "remove") {
            for (const _col of _db.colsByEnt.values(id)) {
                _recRemoveForce(db, [_col.current], task?.context);
            };
        }
        

    }

}