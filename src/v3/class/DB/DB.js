
import { Chop } from "../Chop/Chop";

import { metaData } from "../../metaData/interface";
import { _recGetPriv } from "../Record/static/_records";
import { vault } from "../../../components/uni/consts";
import { _colRem, _colSet } from "../Record/static/_columns";
import { toId } from "../../tools/traits/uni";
import { RecordPrivate } from "../Record/RecordPrivate";

import { _entAdd, _entRem } from "../Record/static/_ents";
import { _chopGetAllRecs, _chopGetRecs, _chopSyncIn } from "../Chop/static/sync";

import { _recAdd } from "../Record/static/add";
import { _recAddOrSet, _recAddOrUpdate } from "../Record/static/addOr";
import { _recSet, _recUpdate } from "../Record/static/update";
import { _recRemove } from "../Record/static/remove";



export class DB extends Chop {

    constructor(id, opt={}) {

        const { load, save } = opt;

        super(id, {
            getId:rec=>toId(rec.id),
            getGroup:rec=>toId(rec._ent),
            init:(_, process)=>{

                const loadRecs = (_ent, recsRaw)=>{
                    for (const id in recsRaw) {
                        const _rec = new RecordPrivate(this, {_ent, id, ...recsRaw[id]});
                        _chopSyncIn(this, process, _rec.current, true);
                        
                    };
                }

                loadRecs("_ents", load("_ents") || metaData._ents);
                loadRecs("_types", load("_types") || metaData._types);
                loadRecs("_cols", load("_cols") || metaData._cols);

                //load all _ents
                for (const [_ent] of _chopGetRecs(this, "_ents")) {
                    if (_ent.startsWith("_")) { continue; }
                    loadRecs(_ent, load(_ent));
                }

                //set columns definitions
                for (const [_, rec] of _chopGetRecs(this, "_cols")) {
                    const _rec = _recGetPriv(this, rec);
                    _colSet(_rec);
                }

                //prepare columns for rows
                const _recs = [];
                for (const [rec] of _chopGetAllRecs(this)) {
                    const _rec = _recGetPriv(this, rec);
                    if (_rec.state === "pending") { _recs.push(_rec.init(process)); }
                }
                
                //set columns for rows
                for (const _rec of _recs) { _rec.ready(); }

            }
        });

        this.fit((next, event, process)=>{
            const { record, isBatch } = process;
            next();

            if (isBatch) { return; }

            const _rec = _recGetPriv(this, record);

            if (event === "add") {
                _entAdd(process, _rec);
                _colSet(_rec);
            }
            else if (event === "update") {
                _colSet(_rec);
            }
            else if (event === "remove") {
                _entRem(process, _rec);
                _colRem(_rec);
            }

        });

        this.effect(console.log);

        const _p = vault.get(this);

        _p.colsByEnt = new Map();
    }

    isRecord(any, throwError=false) { return !!_recGetPriv(any, throwError); }

    add(values, context) { return _recAdd(this, arguments, context); }

    addOrSet(values, context) { return _recAddOrSet(this, arguments, context); }
    addOrUpdate(values, context) { return _recAddOrUpdate(this, arguments, context); }

    set(record, values, context) { return _recSet(this, arguments, context); }
    update(record, values, context) { return _recUpdate(this, arguments, context); }

    remove(record, context) { return _recRemove(this, arguments, context); }

}