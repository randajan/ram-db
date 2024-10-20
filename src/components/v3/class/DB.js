
import { Chop } from "./Chop";
import { addRec } from "./static/addRec";
import { removeRec } from "./static/removeRec";
import { updateRec } from "./static/updateRec";

import { toRefId } from "../../uni/formats";
import { meta } from "../meta";
import { createRecord, isRecord } from "../interfaces/records";
import { createColumn } from "../interfaces/columns";

export class DB extends Chop {

    static isRecord(any, db) { return isRecord(any, db); }

    constructor(id, opt={}) {

        super(id, {
            group:rec=>toRefId(rec._ent),
            init:_=>{
                for (const _ent in meta) {
                    for (const id in meta[_ent]) {
                        this.add({_ent, id, isMeta:true, ...meta[_ent][id]});
                    };
                }
            }
        });

        const cols = this.chop("cols", {
            group:rec=>toRefId(rec.ent),
            filter:rec=>toRefId(rec._ent) == "_cols",
        });

        this.on((event, rec)=>{
            if (!rec || toRefId(rec._ent) != "_ents") { return; }
    
            if (event === "remove") {
                for (const col of cols.getList(rec.id)) { this.remove(col); };
            }
            else if (event === "add") {
                this.add({
                    _ent:`_cols`, id:`${rec.id}-_ent`,
                    ent: rec.id, name: "_ent", type: "ref", ref:"_ents",
                    writable: 0, readable: 1, required: 1, isMeta:true,
                });
                this.add({
                    _ent:`_cols`, id:`${rec.id}-id`,
                    ent: rec.id, name: "id", type: "string",
                    writable: 0, readable: 1, required: 1, isMeta:true,
                });
            }
        });
    
        cols.on((event, rec)=>{
            if (event === "add") { createColumn(this, rec); }
        });

        Object.defineProperties(this, {
            cols:{value:cols}
        });

    }

    isRecord(any) { return isRecord(any, this); }

    add(data, ctx) {
        const record = createRecord(this, data);
        return addRec(this, record, ctx);
    }

    remove(record, ctx) {
        return removeRec(this, record, ctx);
    }

    update(record, data, ctx) {
        return updateRec(this, record, ctx);
    }
}