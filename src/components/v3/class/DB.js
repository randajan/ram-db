
import { Chop } from "./Chop";
import { afterAdd } from "../effects/afterAdd";
import { afterRemove } from "../effects/afterRemove";

import { toRefId } from "../../uni/formats";
import { meta, metaEnt, metaId } from "../meta";
import { addOrSetRec, addRec, getRecPriv, removeRec } from "./Record";
import { setColumn, removeColumn, getColsPriv } from "./Columns";
import { getAllRecs, getRec, getRecs } from "../effects/_bits";
import { solid, solids } from "@randajan/props";

export class DB extends Chop {

    constructor(id, opt={}) {

        const { init } = opt;

        super(id, {
            autoReset:false,
            group:rec=>toRefId(rec._ent),
            init:_=>{

                for (const _ent in meta) {
                    for (const id in meta[_ent]) {
                        addRec(this, {_ent, id, isMeta:true, ...meta[_ent][id]});
                    };
                }

                init(this);

                const _recs = [];
                for (const [rec] of getAllRecs(this)) {
                    const _rec = getRecPriv(this, rec);
                    if (_rec.state === "ready") { console.log(_rec.values); }
                    _recs.push(_rec.prepareInit());
                }
                for (const _rec of _recs) {
                    if (!_rec) { continue; } //because some rows was already ready - IDK why
                    const resp = _rec.init(); //init responses
                    if (!resp.isDone) { console.log(resp); }
                }

            }
        });

        this.on((event, rec, ctx)=>{
            if (!rec) { return; }

            const _ent = toRefId(rec._ent);

            if (_ent == "_ents") {
                const { id } = rec;
    
                if (event === "remove") {
                    for (const _col of getColsPriv(id)) { _col.remove(ctx, true); };
                }
                else if (event === "add") {
                    this.add(metaId(id, id === "_cols" ? r=>toRefId(r.ent) + "-" + r.name : undefined), ctx);
                    this.add(metaEnt(id), ctx);
                }
            } else if (_ent === "_cols") {
                if (event === "add" || event === "update") { setColumn(this, rec); }
                else if (event === "remove") { removeColumn(this, rec); }
            }


        });

        this.reset();

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