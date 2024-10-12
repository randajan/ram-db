


import { toStr } from "../uni/formats";
import { meta } from "./meta";

import { Bundle } from "./privates/Bundle";



export const testV3 = _=> {

    const refId = ref=>(typeof ref !== "string") ? ref?.id : ref.split(" ")[1];

    const db = new Bundle("db", rec=>refId(rec._ent));

    const defineColumn = (col)=>{
        const rows = db.gets(refId(col.ent));
        for (const [_, row] of rows) {
            if (refId(col.type) === "ref") {
                let val = row[col.name].split(" ");
                Object.defineProperty(row, col.name, {
                    get:_=>db.get(val[0], val[1]),
                    set:v=>val = v.split(" ")
                });
            }
        }
    }

    
    for (const _ent in meta) {
        for (const id in meta[_ent]) {
            db.add({_ent:`_ents ${_ent}`, id, isMeta:true, ...meta[_ent][id]});
        };
    }

    const cols = new Bundle("cols", rec=>refId(rec.ent));
    for (const [_, col] of db.gets("_cols")) { defineColumn(col); }

    //new column appeared in the database
    db.on((event, rec)=>{
        if (refId(rec._ent) != "_cols") { return; }
        if (event === "add") { cols.add(rec); defineColumn(rec); }
        else if (event === "update") { cols.update(rec); }
        else if (event === "remove") { cols.remove(rec); }
    });

    window.db = db;
}