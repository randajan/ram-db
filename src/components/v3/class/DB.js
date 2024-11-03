
import { Chop } from "./Chop";
import { afterAdd } from "../effects/afterAdd";
import { afterRemove } from "../effects/afterRemove";

import { toRefId } from "../../uni/formats";
import { meta, metaEnt, metaId } from "../meta";
import { addOrSetRec, addRec, getRecPriv, removeRec } from "./Record";
import { setColumn, removeColumn } from "./Columns";
import { getAllRecs, getRec, getRecs } from "../effects/_bits";
import { solid, solids } from "@randajan/props";

export class DB extends Chop {

    constructor(id, opt={}) {

        super(id, {
            group:rec=>toRefId(rec._ent),
            init:_=>{
                for (const _ent in meta) {
                    for (const id in meta[_ent]) {
                        addRec(this, {_ent, id, isMeta:true, ...meta[_ent][id]});
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

        this.on((event, rec, ctx)=>{
            const _ent = toRefId(rec?._ent);
            if (_ent != "_ents") { return; }

            const { id } = rec;
    
            if (event === "remove") {
                for (const col of cols.getList(id)) { removeRec(col, ctx, true); };
            }
            else if (event === "add") {
                this.add(metaId(id, id === "_cols" ? r=>toRefId(r.ent) + "-" + r.name : undefined), ctx);
                this.add(metaEnt(id), ctx);
            }
        });
    
        cols.on((event, rec)=>{
            if (event === "add" || event === "update") { setColumn(this, rec); }
            else if (event === "remove") { removeColumn(this, rec); }
        });

        solids(this, {
            cols
        })

    }

    isRecord(any, throwError=false) { return !!getRecPriv(this, any, throwError); }

    remove(record, ctx) {
        return removeRec(record, ctx);
    }

    add(values, ctx) {
        return addRec(this, values, ctx);
    }

    addOrSet(values, ctx) {
        return addOrSetRec(this, values, ctx);
    }

    addOrUpdate(values, ctx) {
        return addOrSetRec(this, values, ctx, true);
    }

    set(record, values, ctx) {
        return getRecPriv(this, record).set(values, ctx);
    }

    update(record, values, ctx) {
        return getRecPriv(this, record).set(values, ctx, true);
    }

    removeBy(groupId, recId, ctx) {
        const rec = this.get(groupId, recId);
        if (rec) { return this.remove(rec, ctx); }
    }

    setBy(groupId, recId, values, ctx) {
        const rec = this.get(groupId, recId);
        if (rec) { return this.set(rec, values, ctx); }
    }

    updateBy(groupId, recId, values, ctx) {
        const rec = this.get(groupId, recId);
        if (rec) { return this.update(rec, values, ctx); }
    }

}