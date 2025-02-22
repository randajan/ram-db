
import { Chop } from "../Chop/Chop";

import { metaData } from "../../metaData/interface";
import { recAddOrSet, recAddOrUpdate, recGetPriv } from "../Record/static/_records";
import { _chopGetAllRecs, _chopGetRecs, syncIn } from "../Chop/static/eventHandlers";
import { vault } from "../../../components/uni/consts";
import { colRem, colSet } from "../Record/static/_columns";
import { recAdd, recRemove, recSet, recUpdate } from "../Record/static/_records";
import { toId } from "../../tools/traits/uni";
import { RecordPrivate } from "../Record/RecordPrivate";
import { processRun } from "../Process/Process";
import { entAdd, entRem } from "../Record/static/_ents";

export class DB extends Chop {

    constructor(id, opt={}) {

        const { init } = opt;

        super(id, {
            getId:rec=>toId(rec.id),
            getGroup:rec=>toId(rec._ent),
            init:process=>{

                //load database
                //init(load, context);

                for (const _ent in metaData) {
                    for (const id in metaData[_ent]) {
                        const _rec = new RecordPrivate(this, {_ent, id, ...metaData[_ent][id]});
                        syncIn(process, _rec.current, true);
                    };
                }

                //set columns definitions
                for (const [_, rec] of _chopGetRecs(this, "_cols")) {
                    const _rec = recGetPriv(this, rec);
                    colSet(_rec);
                }

                //prepare columns for rows
                const _recs = [];
                for (const [rec] of _chopGetAllRecs(this)) {
                    const _rec = recGetPriv(this, rec);
                    if (_rec.state === "pending") { _recs.push(_rec.init(process)); }
                }
                
                //set columns for rows
                for (const _rec of _recs) { _rec.ready(); }

                //return _recs;

            }
        });

        this.before(process=>{
            const { action, record, isBatch } = process;
            if (isBatch) { return; }

            const _rec = recGetPriv(this, record);
            const { _ent } = _rec.values;

            if (_ent == "_ents") {
                if (action === "remove") { entRem(process, _rec); }
                else if (action === "add") { entAdd(process, _rec); }
            }
            else if (_ent === "_cols") {
                if (action === "add" || action === "update") { colSet(_rec); }
                else if (action === "remove") { colRem(_rec); }
            }

        });

        const _p = vault.get(this);

        _p.colsByEnt = new Map();
    }

    isRecord(any, throwError=false) { return !!recGetPriv(any, throwError); }

    add(values, context) { return processRun(this, context, arguments, recAdd); }

    addOrSet(values, context) { return processRun(this, context, arguments, recAddOrSet); }
    addOrUpdate(values, context) { return processRun(this, context, arguments, recAddOrUpdate); }

    set(record, values, context) { return processRun(this, context, arguments, recSet); }
    update(record, values, context) { return processRun(this, context, arguments, recUpdate); }

    remove(record, context) { return processRun(this, context, arguments, recRemove); }

}