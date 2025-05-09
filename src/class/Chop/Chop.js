import { vault } from "../../tools/consts";

import { isFce, toFce, toStr, wrapFce } from "../../tools/formats";
import { solids, virtuals } from "@randajan/props";
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

        const { parent } = opt;

        const isMultiGroup = toBoolean(opt.isMultiGroup);
        const filter = toFce(opt.filter, true);
        const getId = isFce(opt.getId) ? opt.getId : (r=>r.id);
        const getGroup = !isMultiGroup ? toFce(opt.getGroup) : wrapFce(toArr, toFce(opt.getGroup, [undefined]));

        const _p = {
            getId,
            getGroup,
            isMultiGroup,
            fits:new Fits(),
            effects:new Effects(),
            childs:new Set(),
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
            size:_=>_p.byRec.size,
            childs:_=>[..._p.childs],
            isMultiGroup:_=>_p.isMultiGroup,
        });

        vault.set(this, _p);

    }

    fit(callback) { return vault.get(this).fits.add(callback); }
    effect(callback) { return vault.get(this).effects.add(callback); }

    has(groupId, rec) {
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

    map(callback) {
        const result = [];
        const recs = _chopGetAllRecs(this);
        for (const [rec] of recs) {
            const r = callback(rec);
            if (r !== undefined) { result.push(r); }
        }
        return result;
    }

    chop(id, opt={}) {
        const { byRec, childs } = vault.get(this);

        const filter = toFce(opt.filter, true);

        opt.parent = this;
        opt.filter = rec=>(this.has(id, rec) && filter(rec));
        
        const child = new Chop(id, opt);

        for (const [rec] of byRec) { _chopSyncIn(child, rec); }

        childs.add(child);

        return child;

    }
}