


import { toStr } from "../uni/formats";
import { meta } from "./meta";

import { Bundle } from "./privates/Bundle";



export const testV3 = _=> {

    const refId = ref=>(typeof ref !== "string") ? ref?.id : ref.split(" ")[1];

    const db = new Bundle("db", {
        group:rec=>refId(rec._ent),
        init:bundle=>{
            for (const _ent in meta) {
                for (const id in meta[_ent]) {
                    bundle.add({_ent:`_ents ${_ent}`, id, isMeta:true, ...meta[_ent][id]});
                };
            }
        }
    });

    db.on((event, rec)=>{
        if (!rec || refId(rec._ent) != "_ents") { return; }

        if (event === "add") {
            db.add({
                _ent:`_ents _cols`, id:`${rec.id}-_ent`,
                ent: `_ents ${rec.id}`, name: "_ent", type: "_types ref", ref:"_ents",
                writable: 0, readable: 1, required: 1, isMeta:true,
            });
            db.add({
                _ent:`_ents _cols`, id:`${rec.id}-id`,
                ent: `_ents ${rec.id}`, name: "id", type: "_types string",
                writable: 0, readable: 1, required: 1, isMeta:true,
            });

            return;
        }

        if (event === "remove") {
            for (const col of cols.gets(rec.id)) { db.remove(col); };
        }
    })

    const cols = db.chop("cols", {
        group:rec=>refId(rec.ent),
        filter:rec=>refId(rec._ent) == "_cols",
    });

    //new column appear in the database
    cols.on((event, rec)=>{
        if (event === "add") { defineColumn(rec); }
    });

    const refs = cols.chop("refs", {
        group:rec=>refId(rec.ent),
        filter:rec=>rec.type.id === "ref"
    });

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
    


    window.db = db;
    window.dbCols = cols;
    window.colRef = refs;
}