import { vault } from "../../uni/consts";

import { toArr, toFce, toStr, wrapFce } from "../../uni/formats";
import { addRec } from "./static/addRec";
import { onEvent } from "./static/eventHandlers";
import { getRec, getRecs } from "./static/_bits";
import { resetRecs } from "./static/resetRecs";


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
            recordIds:new Set(),
            groupIdsByRec:new Map(), // rec -> groupIds
            recsByGroupId:new Map(), // groupId -> recs
            group:!isMultiGroup ? toFce(group) : wrapFce(toArr, toFce(group, [undefined])),
            isMultiGroup,
            init:toFce(init),
            filter:toFce(filter, true),
        }

        Object.defineProperties(this, {
            db:{value:parent?.db || this},
            parent:{value:parent},
            childs:{ get:_=>[..._p.childs]},
            id:{enumerable, value:id},
            state:{enumerable, get:_=>_p.state},
            size:{enumerable, get:_=>_p.recordIds.size},
            isMultiGroup:{enumerable, value:isMultiGroup}
        });

        vault.set(this, _p);

        if (parent) {
            const _pp = vault.get(parent);
            _p.init = (_, ctx)=>{
                for (const [rec] of _pp.groupIdsByRec) { addRec(this, rec, false, ctx); }
            }
            _pp.childs.add(this);
        }

    }

    msg(text, recId, groupId) {
        recId = toStr(recId);
        let msg = this.id;
        if (groupId) { msg += ` group('${groupId}')`; }
        if (recId) { msg += ` rec('${recId}')`; }
        if (text) { msg += " " + text; }
        return msg.trim();
    }

    on(callback, onlyOnce = false) {
        return onEvent(this, callback, onlyOnce);
    }

    reset(ctx) {
        return resetRecs(this, ctx);
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

    chop(id, opt={}) {
        return new Chop(id, opt, this);
    }
}