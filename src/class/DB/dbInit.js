
import { metaData } from "../../metaData/interface";

import { _chopGetAllRecs, _chopGetRecs, _chopSyncIn } from "../Chop/static/sync";
import { rowMetaMerge } from "../../metaData/methods";
import { createRecord } from "../Record/static/create";

export const _dbInit = (task, data, save)=>{
    const { db, _db } = task;
    const loaded = new Set();

    const loadRecs = (_ent, recsRaw)=>{
        loaded.add(_ent);
        for (const id in recsRaw) {
            const _rec = createRecord(db, rowMetaMerge(_ent, id, recsRaw[id]));
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

    //prepare columns for rows
    const _recs = [];
    for (const [rec, _rec] of _db.records) {
        if (_rec.state === "pending") { _recs.push(_rec.init(task)); }
    }
    
    //set columns for rows
    for (const _rec of _recs) { _rec.ready(); }

    db.fit((next, event, task)=>{
        const { record } = task;
        if (!record) { return next(); }
        const _rec = _db.records.get(record);
        if (!_rec) { return next(); }
        _rec.fit(next, event, task);
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