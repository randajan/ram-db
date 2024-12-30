import { solids } from "@randajan/props";
import { isFce, toArr, toFce, wrapFce } from "../../../components/uni/formats";
import { toBoolean } from "../../tools/traits/booleans";
import { toFunction } from "../../tools/traits/functions";
import { SuperMap } from "../SuperMap/SuperMap";
import { Major } from "../Result/Fails";

const prepareSingleGroup = (bundle, id, rec, from, to)=>{

    if (from == to) { return; } //no change

    if (to != null) {
        const current = bundle.byGroup.get(to, id);
        if (current && current !== rec) { throw Major.fail(`Duplicate id '${id} at ${to}'`); }
    }

    return _=>syncSingleGroup(bundle, id, rec, from, to);
}

const syncSingleGroup = (bundle, id, rec, from, to)=>{
    const { byRec, byGroup } = bundle;

    if (to == null) { byRec.delete(rec); } //remove
    else {
        byGroup.set(to, id, rec);
        byRec.set(rec, to);
    }

    //cleanup
    byGroup.delete(from, id);

}

const prepareMultiGroup = (bundle, id, rec, from, to)=>{
    let hasNew, toUniq;

    if (to != null) {
        toUniq = new Set();
        to = toArr(to);

        for (const groupId of to) {
            if (toUniq.has(groupId)) { continue; } //duplicate control
            toUniq.add(groupId);
            if (from?.has(groupId)) { continue; } //already correct
            hasNew = true;
            const current = bundle.byGroup.get(groupId, id);
            if (current && current !== rec) { throw Major.fail(`Duplicate id '${id}' at '${groupId}'`); }
        }    
    } 

    if (!hasNew && from?.size === toUniq?.size) { return } //no change

    return _=>syncMultiGroup(bundle, id, rec, from, toUniq);
}

const syncMultiGroup = (bundle, id, rec, from, to)=>{
    const { byRec, byGroup } = bundle;

    if (to == null) { byRec.delete(rec); } //remove
    else {   
        for (const groupId of to) {  
            if (from?.has(groupId)) { from.delete(groupId); continue; } //already correct
            byGroup.set(groupId, id, rec); //add new
        }

        byRec.set(rec, to);
    }

    //cleanup
    if (from != null) {
        for (const groupId of from) {
            byGroup.delete(groupId, id); //remove old
        }
    }
}

export class Bundle {
    constructor(opt={}) {

        const isMultiGroup = toBoolean(opt.isMultiGroup);

        const filter = toFce(opt.filter, true);

        const getId = isFce(opt.getId) ? opt.getId : (r=>r.id)
        const getGroup = !isMultiGroup ? toFce(opt.getGroup) : wrapFce(toArr, toFce(opt.getGroup, [undefined]))

        solids(this, {
            byRec:new Map(),
            byGroup:new SuperMap(),
            getId,
            getGroup,
            filter,
            isMultiGroup
        });
        
    }

    isInGroup(groupId, rec) {
        const group = this.getGroup(rec);
        return this.isMultiGroup ? group.includes(groupId) : (group === groupId);
    }

    clear() {
        this.byRec.clear();
        this.byGroup.clear();
    }

    prepare(rec, inc=true) {
        const { byRec, getId, getGroup, filter, isMultiGroup } = this;

        inc = (inc && filter(rec));
        const has = byRec.has(rec);

        if (!inc && !has) { return; } //nothing gona change

        const id = getId(rec);
        const to = inc ? getGroup(rec) : null; //removed by filter

        const from = byRec.get(rec);

        if (isMultiGroup) { return prepareMultiGroup(this, id, rec, from, to); }
        else if (to != from) { return prepareSingleGroup(this, id, rec, from, to); }
    
    }

    sync(rec) {
        const sync = this.prepare(rec);
        if (sync) { sync(); }
    }

}