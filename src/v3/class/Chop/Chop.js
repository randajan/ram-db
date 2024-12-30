import info from "@randajan/simple-lib/info";
import { vault } from "../../../components/uni/consts";

import { toFce, toStr } from "../../../components/uni/formats";
import { sync, onEvent } from "./static/eventHandlers";
import { _chopGetAllRecs, _chopGetRec, _chopGetRecs } from "./static/gets";
import { solids, virtual, virtuals } from "@randajan/props";
import { Major } from "../Result/Fails";
import { $reset } from "../Process/static/reset";
import { Bundle } from "../Bundle/Bundle";

export class Chop {

    constructor(id, opt={}) {
        id = toStr(id);
        if (!id) { throw Major.fail("missing id"); }

        const { parent, init } = opt;

        const _p = {
            state:"pending",
            handlers:[],
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

    //TODO
    msg(text, details={}) {
        let msg = this.id;
        for (let i in details) { msg += ` ${i}[${details[i]}]`; }
        if (text) { msg += " " + text; }
        return msg.trim();
    }

    on(callback, onlyOnce = false) {
        return onEvent(this, callback, onlyOnce);
    }

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
        opt.init = _=>{ for (const [rec] of bundle.byRec) { sync(child, rec, true); } }

        const child = new Chop(id, opt);

        childs.add(child);

        if (state !== "init") { $reset(child, context); }

        return child;

    }
}