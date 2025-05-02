
import { metaData } from "../../metaData/interface";
import { _recGetPriv } from "../Record/Record";
import { vault } from "../../../components/uni/consts";
import { _colRem, _colSet } from "../Record/static/_columns";

import { RecordPrivate } from "../Record/RecordPrivate";

import { _entAdd, _entRem } from "../Record/static/_ents";
import { _chopGetAllRecs, _chopGetRecs, _chopSyncIn } from "../Chop/static/sync";
import { rowMetaMerge } from "../../metaData/methods";

export const _dbInit = (db, task, data, save)=>{
    const loaded = new Set();

    const loadRecs = (_ent, recsRaw)=>{
        loaded.add(_ent);
        for (const id in recsRaw) {
            const _rec = new RecordPrivate(db, rowMetaMerge(_ent, id, recsRaw[id]));
            _chopSyncIn(db, _rec.current);
        };
    }

    loadRecs("_ents", ({...metaData._ents, ...(data._ents || {})}));
    loadRecs("_types", ({...metaData._types, ...(data._types || {})}));
    loadRecs("_cols", ({...metaData._cols, ...(data._cols || {})}));

    //load all _ents
    for (const [_ent] of _chopGetRecs(db, "_ents")) {
        if (!loaded.has(_ent)) { loadRecs(_ent, data[_ent]); }
    }

    //set columns definitions
    for (const [_, rec] of _chopGetRecs(db, "_cols")) {
        const _rec = _recGetPriv(db, rec);
        _colSet(_rec);
    }

    //prepare columns for rows
    const _recs = [];
    for (const [rec] of _chopGetAllRecs(db)) {
        const _rec = _recGetPriv(db, rec);
        if (_rec.state === "pending") { _recs.push(_rec.init(task)); }
    }
    
    //set columns for rows
    for (const _rec of _recs) { _rec.ready(); }

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

    db.effect((event, task)=>{
        const { record } = task;

        const ex = record.toJSON();
        const { _ent, id } = ex;
        delete ex._ent;
        delete ex.id;

        save(_ent, id, event === "remove" ? undefined  : ex);
        
    });

};