import { vault } from "../../../components/uni/consts";

import { isFce, toFce, toStr, wrapFce } from "../../../components/uni/formats";
import { solids, virtuals } from "@randajan/props";
import { _chopReset } from "./static/reset";
import { fail } from "../../tools/traits/uni";

import { _chopGetAllRecs, _chopGetRec, _chopGetRecs, _chopSyncIn } from "./static/sync";
import { toBoolean } from "../../tools/traits/booleans";
import { SuperMap } from "../SuperMap/SuperMap";
import { Effects } from "../Effects/Effects";
import { Fits } from "../Effects/Fits";


export class Chop {

    constructor(id, opt={}) {
        id = toStr(id);
        if (!id) { fail("missing id"); }

        const { parent, init } = opt;

        const isMultiGroup = toBoolean(opt.isMultiGroup);
        const filter = toFce(opt.filter, true);
        const getId = isFce(opt.getId) ? opt.getId : (r=>r.id);
        const getGroup = !isMultiGroup ? toFce(opt.getGroup) : wrapFce(toArr, toFce(opt.getGroup, [undefined]));

        const _p = {
            getId,
            getGroup,
            isMultiGroup,
            state:"pending",
            fits:new Fits(),
            effects:new Effects(),
            childs:new Set(),
            init:toFce(init),
            byRec:new Map(),
            byGroup:new SuperMap(),
            filter,
        }

        solids(this, {
            id,
            db:parent?.db || this,
            parent
        }, false);

        virtuals(this, {
            state:_=>_p.state,
            size:_=>_p.byRec.size,
            childs:_=>[..._p.childs],
            isMultiGroup:_=>_p.isMultiGroup,
        });

        vault.set(this, _p);

    }

    fit(callback) { return vault.get(this).fits.add(callback); }
    effect(callback) { return vault.get(this).effects.add(callback); }

    isIn(groupId, rec) {
        const { getGroup, isMultiGroup } = vault.get(this);
        const group = getGroup(rec);
        return isMultiGroup ? group.includes(groupId) : (group === groupId);
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
        const { state, byRec, childs } = vault.get(this);

        const filter = toFce(opt.filter, true);

        opt.parent = this;
        opt.filter = rec=>(this.isIn(id, rec) && filter(rec));
        opt.init = process=>{ for (const [rec] of byRec) { _chopSyncIn(process, rec, true); } }

        const child = new Chop(id, opt);

        childs.add(child);

        if (state !== "init") { $reset(child, context); }

        return child;

    }
}