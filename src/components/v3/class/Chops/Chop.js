import { vault } from "../../../uni/consts";

import { toArr, toFce, toStr, wrapFce } from "../../../uni/formats";
import { afterAdd } from "../../effects/afterAdd";
import { onEvent } from "../../effects/eventHandlers";
import { getAllRecs, getRec, getRecs } from "../../effects/_bits";
import { afterReset } from "../../effects/afterReset";
import { solids, virtuals } from "@randajan/props";
import { exportFn } from "../../traits/functions";
import { Major } from "../Exceptions";

export class Chop {

    constructor(id, opt={}, parent) {
        id = toStr(id);
        if (!id) { throw Major.fail("missing id"); }

        const { init, group, autoReset=true, isMultiGroup=false } = opt;
        const filter = toFce(opt.filter, true);

        const _p = {
            state:"pending",
            handlers:[],
            childs:new Set(),
            groupIdsByRec:new Map(), // rec -> groupIds
            recsByGroupId:new Map(), // groupId -> recs
            isMultiGroup,
            init:toFce(init),
            filter:parent ? rec=>(parent.getGroup(rec) === id && filter(rec)) : filter,
        }

        solids(this, {
            id,
            db:parent?.db || this,
            parent,
            getGroup:!isMultiGroup ? toFce(group) : wrapFce(toArr, toFce(group, [undefined])),
            isMultiGroup
        }, false);

        virtuals(this, {
            state:_=>_p.state,
            size:_=>_p.groupIdsByRec.size,
            childs:_=>[..._p.childs],
        });

        vault.set(this, _p);

        if (parent) {
            const _pp = vault.get(parent);
            _pp.childs.add(this);
            _p.init = (_, ctx)=>{
                for (const [rec] of _pp.groupIdsByRec) { afterAdd(this, rec, ctx); }
            }
        }

        if (autoReset) { this.reset(); }

    }

    msg(text, details={}) {
        let msg = this.id;
        for (let i in details) { msg += ` ${i}[${details[i]}]`; }
        if (text) { msg += " " + text; }
        return msg.trim();
    }

    on(callback, onlyOnce = false) {
        return onEvent(this, callback, onlyOnce);
    }

    reset(ctx) {
        return afterReset(this, ctx);
    }

    get(groupId, recId, throwError = false) {
        return getRec(this, groupId, recId, throwError);
    }

    getMap(groupId, throwError = false) {
        const recs = getRecs(this, groupId, throwError);
        return recs ? new Map(recs) : new Map(); 
    }

    getList(groupId, throwError = false) {
        const recs = getRecs(this, groupId, throwError);
        return recs ? Array.from(recs.values()) : []; 
    }

    getSize(groupId, throwError=false) {
        return getRecs(this, groupId, throwError)?.size || 0;
    }

    map(callback) {
        const result = [];
        const recs = getAllRecs(this);
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
            
            res[i] = Array.isArray(v) ? v.map(exportFn) : exportFn(v);
        }
        return res;
    }

    exportAll() {
        return this.map(this.export);
    }

    chop(id, opt={}) {
        return new Chop(id, opt, this);
    }
}