
import { Chop } from "./Chop";

import { toRefId, toStr } from "../../../uni/formats";
import { metaData, metaDataDynamic, metaStrong } from "../../metaData/interface";
import { addOrSetRec, addRec, getRecPriv, loadRec, removeRec } from "../Records/_records";
import { getAllRecs, getRecs } from "../../effects/_bits";
import { vault } from "../../../uni/consts";
import { getColsPriv, remCol, setCol } from "../Records/_columns";
import { addEnt, remEnt } from "../Records/_ents";

export class DB extends Chop {

    constructor(id, opt={}) {

        const { init } = opt;

        super(id, {
            autoReset:false,
            group:rec=>toRefId(rec._ent),
            init:(self, ctx)=>{

                const load = values=>loadRec(this, values, ctx);

                init(load, ctx);

                for (const _ent in metaData) {
                    for (const id in metaData[_ent]) {
                        load({_ent, id, meta:metaStrong, ...metaData[_ent][id]});
                    };
                }

                
                for (const [_, rec] of getRecs(this, "_cols")) {
                    const _rec = getRecPriv(this, rec);
                    setCol(_rec, ctx);
                }

                const _recs = [];
                for (const [rec] of getAllRecs(this)) {
                    const _rec = getRecPriv(this, rec);
                    if (_rec.state === "pending") { _recs.push(_rec.colsPrepare()); }
                }
                
                for (const _rec of _recs) { console.log(_rec.colsFinish()); }

                return _recs;

            }
        });

        this.on((event, rec, ctx)=>{
            if (!rec) { return; }
            const _rec = getRecPriv(this, rec);
            const { _ent } = _rec.values;

            if (_ent == "_ents") {
                if (event === "remove") { remEnt(_rec, ctx); }
                else if (event === "add") { addEnt(_rec, ctx); }
            }
            else if (_ent === "_cols") {
                if (event === "add" || event === "update") { setCol(_rec, ctx); }
                else if (event === "remove") { remCol(_rec, ctx); }
            }

        });

        vault.get(this).colsByEnt = new Map();     

        this.reset();
    }

    isRecord(any, throwError=false) { return !!getRecPriv(this, any, throwError); }

    remove(record, ctx) {
        return removeRec(this, record, ctx);
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
        return getRecPriv(this, record).valsPush(values, ctx);
    }

    update(record, values, ctx) {
        return getRecPriv(this, record).valsPush(values, ctx, true);
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