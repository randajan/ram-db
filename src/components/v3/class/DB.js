
import { Chop } from "./Chop";
import { afterAdd } from "../effects/afterAdd";
import { afterRemove } from "../effects/afterRemove";

import { toRefId } from "../../uni/formats";
import { meta, metaEnt, metaId } from "../meta";
import { createRec, getRecPriv } from "./Record";
import { setColumn, removeColumn } from "./Columns";
import { getAllRecs, getRecs } from "../effects/_bits";

export class DB extends Chop {

    constructor(id, opt={}) {

        super(id, {
            group:rec=>toRefId(rec._ent),
            init:_=>{
                for (const _ent in meta) {
                    for (const id in meta[_ent]) {
                        createRec(this, {_ent, id, isMeta:true, ...meta[_ent][id]});
                    };
                }
            }
        });

        const cols = this.chop("cols", {
            group:rec=>toRefId(rec.ent),
            filter:rec=>toRefId(rec._ent) == "_cols",
        });

        this.on((event, rec)=>{
            if (event === "reset") {
                const _recs = [];
                for (const [rec] of getAllRecs(this)) {
                    _recs.push(getRecPriv(this, rec).prepareInit());
                }
                for (const _rec of _recs) {
                    console.log(_rec.init());
                }
            }
        });

        this.on((event, rec)=>{
            const _ent = toRefId(rec?._ent);
            if (_ent != "_ents") { return; }

            const { id } = rec;
    
            if (event === "remove") {
                for (const col of cols.getList(id)) { this.remove(col); };
            }
            else if (event === "add") {
                this.add(metaId(id, id === "_cols" ? r=>toRefId(r.ent) + "-" + r.name : undefined));
                this.add(metaEnt(id));
            }
        });
    
        cols.on((event, rec)=>{
            if (event === "add" || event === "update") { setColumn(this, rec); }
            else if (event === "remove") { removeColumn(this, rec); }
        });

        Object.defineProperties(this, {
            cols:{value:cols}
        });

    }

    isRecord(any, throwError=false) { return !!getRecPriv(this, any, throwError); }

    add(values, ctx) {
        return createRec(this, values, ctx);
    }

    remove(record, ctx) {
        return afterRemove(this, record, ctx);
    }

    update(record, input, ctx) {
        return getRecPriv(this, record).update(input, ctx);
    }
}