import { solids } from "@randajan/props";
import { isFce, toArr, toFce, wrapFce } from "../../../components/uni/formats";
import { toBoolean } from "../../tools/traits/booleans";
import { SuperMap } from "../SuperMap/SuperMap";
import { throwMajor } from "../../tools/traits/uni";

const syncSingleGroup = (bundle, id, rec, from, to)=>{
    const { byRec, byGroup } = bundle;

    if (from == to) { return; } //no change

    if (to == null) { byRec.delete(rec); } //remove
    else {
        const current = byGroup.get(to, id);
        if (current && current !== rec) { throwMajor(`Duplicate index '${id}' at '${to}'`); }
        byGroup.set(to, id, rec);
        byRec.set(rec, to);
    }

    //cleanup
    byGroup.delete(from, id);
}

const syncMultiGroup = (bundle, id, rec, from, to)=>{
    const { byRec, byGroup } = bundle;
    let hasNew, toGroups;

    if (to == null) { byRec.delete(rec); } //remove
    else {
        to = toArr(to);
        toGroups = new Set();

        for (const groupId of to) {
            if (toGroups.has(groupId)) { continue; } //duplicate control
            toGroups.add(groupId);
            if (from?.has(groupId)) { from.delete(groupId); continue; } //already correct
            
            hasNew = true;
            const current = byGroup.get(groupId, id);
            if (current && current !== rec) { throwMajor(`Duplicate index '${id}' at '${groupId}'`); }

            byGroup.set(groupId, id, rec); //add new
            byRec.set(rec, toGroups);
        }    
    } 

    if (!hasNew && from?.size === toGroups?.size) { return; } //no change

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

    sync(inc, rec) {
        const { byRec, getId, getGroup, filter, isMultiGroup } = this;

        inc = (inc && filter(rec));
        const has = byRec.has(rec);

        if (!inc && !has) { return false; } //nothing gona change

        const id = getId(rec);
        const to = inc ? getGroup(rec) : null; //removed by filter

        const from = byRec.get(rec);

        if (isMultiGroup) { syncMultiGroup(this, id, rec, from, to); }
        else if (to != from) { syncSingleGroup(this, id, rec, from, to); }
    
        return true;
    }

}