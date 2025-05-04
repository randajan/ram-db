
import { metaData } from "../../metaData/interface";
import { _recGetPriv } from "../Row/Record";

import { _chopGetAllRecs, _chopGetRecs, _chopSyncIn } from "../Chop/static/sync";
import { rowMetaMerge } from "../../metaData/methods";
import { createRow } from "../Row/static/create";

export const _dbInit = (db, task, data, save)=>{
    const loaded = new Set();

    const loadRecs = (_ent, recsRaw)=>{
        loaded.add(_ent);
        for (const id in recsRaw) {
            const row = createRow(db, rowMetaMerge(_ent, id, recsRaw[id]));
            _chopSyncIn(db, row.current);
        };
    }

    loadRecs("_ents", ({...metaData._ents, ...(data._ents || {})}));
    loadRecs("_types", ({...metaData._types, ...(data._types || {})}));
    loadRecs("_cols", ({...metaData._cols, ...(data._cols || {})}));

    //load all _ents
    for (const [_ent] of _chopGetRecs(db, "_ents")) {
        if (!loaded.has(_ent)) { loadRecs(_ent, data[_ent]); }
    }

    //prepare columns for rows
    const _recs = [];
    for (const [rec] of _chopGetAllRecs(db)) {
        const row = _recGetPriv(db, rec);
        if (row.state === "pending") { _recs.push(row.init(task)); }
    }
    
    //set columns for rows
    for (const row of _recs) { row.ready(); }

    db.fit((next, event, task)=>{
        const { record } = task;
        const row = _recGetPriv(db, record);
        if (!row) { return next(); }
        row.fit(next, event, task);
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