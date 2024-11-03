import { vault } from "../../uni/consts";

import { toArr, toFce, toStr, wrapFce } from "../../uni/formats";
import { afterAdd } from "../effects/afterAdd";
import { onEvent } from "../effects/eventHandlers";
import { getAllRecs, getRec, getRecs } from "../effects/_bits";
import { afterReset } from "../effects/afterReset";
import { solids, virtuals } from "@randajan/props";


const enumerable = true;
export class Chop {

    constructor(id, opt={}, parent) {
        id = toStr(id);
        if (!id) { throw Error(this.msg("critical error - missing id")); }

        const { init, group, filter, isMultiGroup=false } = opt;
        if (parent) { id = parent.id + "." + id; }

        const _p = {
            state:"pending",
            handlers:[],
            childs:new Set(),
            groupIdsByRec:new Map(), // rec -> groupIds
            recsByGroupId:new Map(), // groupId -> recs
            group:!isMultiGroup ? toFce(group) : wrapFce(toArr, toFce(group, [undefined])),
            isMultiGroup,
            init:toFce(init),
            filter:toFce(filter, true),
        }

        solids(this, { db:parent?.db || this, parent }, false);
        solids(this, { id, isMultiGroup });

        virtuals(this, {
            state:_=>_p.state,
            size:_=>_p.groupIdsByRec.size,
            childs:_=>[..._p.childs],
        });

        vault.set(this, _p);

        if (parent) {
            const _pp = vault.get(parent);
            _p.init = (_, ctx)=>{
                for (const [rec] of _pp.groupIdsByRec) { afterAdd(this, rec, false, ctx); }
            }
            _pp.childs.add(this);
        }

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
        return recs ? recs.values() : []; 
    }

    getAll() {
        return getAllRecs(this).keys();
    }

    chop(id, opt={}) {
        return new Chop(id, opt, this);
    }
}