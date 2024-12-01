
import { Chop } from "../Chop/Chop";

import { toRefId } from "../../../components/uni/formats";
import { metaData } from "../../metaData/interface";
import { addOrSetRec, addRec, getRecPriv, loadRec } from "../Record/static/_records";
import { _chopGetAllRecs, _chopGetRecs } from "../Chop/static/_private";
import { vault } from "../../../components/uni/consts";
import { getColsPriv, remCol, setCol } from "../Record/static/_columns";
import { addEnt, remEnt } from "../Record/static/_ents";
import { $reset } from "../Process/static/reset";
import { $remove } from "../Process/static/remove";
import { $add } from "../Process/static/add";
import { $set, $update } from "../Process/static/update";
import { $addOrSet, $addOrUpdate } from "../Process/static/addOrUpdate";

export class DB extends Chop {

    static reset = $reset;
    static remove = $remove;
    static add = $add;
    static set = $set;
    static update = $update;
    static addOrSet = $addOrSet;
    static addOrUpdate = $addOrUpdate;

    constructor(id, opt={}) {

        const { init } = opt;

        super(id, {
            group:rec=>toRefId(rec._ent),
            init:(context)=>{

                const load = values=>loadRec(this, values, context);

                //load database
                init(load, context);

                //override with metadata
                for (const _ent in metaData) {
                    for (const id in metaData[_ent]) {
                        load({_ent, id, ...metaData[_ent][id]}); //TODO
                    };
                }

                //set columns definitions
                for (const [_, rec] of _chopGetRecs(this, "_cols")) {
                    const _rec = getRecPriv(rec);
                    setCol(_rec, context);
                }

                //prepare columns for rows
                const _recs = [];
                for (const [rec] of _chopGetAllRecs(this)) {
                    const _rec = getRecPriv(rec);
                    if (_rec.state === "pending") { _recs.push(_rec.colsPrepare()); }
                }
                
                //set columns for rows
                for (const _rec of _recs) { 
                    _rec.colsFinish();
                }

                //return _recs;

            }
        });

        this.on((event, res, context)=>{
            if (!res) { return; }
            const _rec = getRecPriv(res.current);
            const { _ent } = _rec.values;

            if (_ent == "_ents") {
                // if (event === "remove") { remEnt(_rec, context); } TODO with process 
                // else if (event === "add") { addEnt(_rec, context); }
            }
            else if (_ent === "_cols") {
                if (event === "add" || event === "update") { setCol(_rec, context); }
                else if (event === "remove") { remCol(_rec, context); }
            }

        });

        const _p = vault.get(this);

        _p.colsByEnt = new Map();
        _p.processes = [];
    }

    isRecord(any, throwError=false) { return !!getRecPriv(any, throwError); }

    reset(context) { return $reset(this, context); }
    remove(record, context) { return $remove(record, context); }
    add(values, context) { return $add(this, values, context); }

    set(record, values, context) { return $set(record, values, context); }
    update(record, values, context) { return $update(record, values, context); }

    addOrSet(values, context) { return $addOrSet(this, values, context); }
    addOrUpdate(values, context) { return $addOrUpdate(this, values, context); }

}