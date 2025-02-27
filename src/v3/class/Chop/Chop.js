import info from "@randajan/simple-lib/info";
import { vault } from "../../../components/uni/consts";

import { toFce, toStr } from "../../../components/uni/formats";
import { _chopOnEvent } from "./static/eventHandlers";
import { solids, virtual, virtuals } from "@randajan/props";
import { _chopReset } from "./static/reset";
import { Bundle } from "../Bundle/Bundle";
import { throwMajor } from "../../tools/traits/uni";

import { _chopGetAllRecs, _chopGetRec, _chopGetRecs, _chopSyncIn } from "./static/sync";

export class Chop {

    constructor(id, opt={}) {
        id = toStr(id);
        if (!id) { throwMajor("missing id"); }

        const { parent, init } = opt;

        const _p = {
            state:"pending",
            fits:[],
            effects:[],
            childs:new Set(),
            init:toFce(init),
            bundle:new Bundle(opt),
        }

        solids(this, {
            id,
            db:parent?.db || this,
            parent
        }, false);

        virtuals(this, {
            state:_=>_p.state,
            size:_=>_p.bundle.byRec.size,
            childs:_=>[..._p.childs],
            isMultiGroup:_=>_p.bundle.isMultiGroup,
            
        });

        if (!info.isBuild) { virtual(this, "bundle", _=>_p.bundle); }

        vault.set(this, _p);

    }

    fit(callback) { return _chopOnEvent(this, true, callback); }
    effect(callback) { return _chopOnEvent(this, false, callback); }

    get(groupId, recId, throwError = false) {
        return _chopGetRec(this, groupId, recId, throwError);
    }

    getMap(groupId, throwError = false) {
        const recs = _chopGetRecs(this, groupId, throwError);
        return recs ? new Map(recs) : new Map(); 
    }

    getList(groupId, throwError = false) {
        const recs = _chopGetRecs(this, groupId, throwError);
        return recs ? Array.from(recs.values()) : []; 
    }

    getSize(groupId, throwError=false) {
        return _chopGetRecs(this, groupId, throwError)?.size || 0;
    }
    
    reset(context) { return _chopReset(this, arguments, context); }

    map(callback) {
        const result = [];
        const recs = _chopGetAllRecs(this);
        for (const [rec] of recs) {
            const r = callback(rec);
            if (r !== undefined) { result.push(r); }
        }
        return result;
    }

    export(rec) {
        const res = {};
        for (const i in rec) {
            const v = rec[i];
            
            //res[i] = Array.isArray(v) ? v.map(exportFn) : exportFn(v); TODO
        }
        return res;
    }

    exportAll() {
        return this.map(this.export);
    }

    chop(id, opt={}, context) {
        const { state, bundle, childs } = vault.get(this);

        const filter = toFce(opt.filter, true);

        opt.parent = this;
        opt.filter = rec=>(bundle.isInGroup(id, rec) && filter(rec));
        opt.init = process=>{ for (const [rec] of bundle.byRec) { _chopSyncIn(process, rec, true); } }

        const child = new Chop(id, opt);

        childs.add(child);

        if (state !== "init") { $reset(child, context); }

        return child;

    }
}