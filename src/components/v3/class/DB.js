
import { Chop } from "./Chop";
import { afterAdd } from "../effects/afterAdd";
import { afterRemove } from "../effects/afterRemove";
import { afterUpdate } from "../effects/afterUpdate";

import { toRefId } from "../../uni/formats";
import { meta } from "../meta";
import { createRecord, getRecPriv } from "./Record";
import { defineColumn } from "../interfaces/columns";

export class DB extends Chop {

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
            if (event === "add") { defineColumn(this, rec); }
        });

        Object.defineProperties(this, {
            cols:{value:cols}
        });

    }

    isRecord(any, throwError=false) { return !!getRecPriv(this, any, throwError) }

    add(data, ctx) {
        const record = createRecord(this, data);
        return afterAdd(this, record, ctx);
    }

    remove(record, ctx) {
        return afterRemove(this, record, ctx);
    }

    update(record, input, ctx) {
        return getRecPriv(this, record).update(input, ctx);
    }
}