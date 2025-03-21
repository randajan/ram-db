import { solid } from "@randajan/props";
import { vault } from "../../../../components/uni/consts";

import { toArr } from "../../../../components/uni/formats";
import { fail } from "../../../tools/traits/uni";

export const _chopGetAllRecs = chop=>vault.get(chop).byRec;
export const _chopGetRecs = (chop, groupId)=>vault.get(chop).byGroup.getAll(groupId);
export const _chopGetRec = (chop, groupId, recId)=>vault.get(chop).byGroup.get(groupId, recId);

const syncSingleGroup = (byRec, byGroup, id, rec, from, to)=>{
    if (from == to) { return; } //no change

    if (to == null) { byRec.delete(rec); } //remove
    else {
        const current = byGroup.get(to, id);
        if (current && current !== rec) { fail(`Duplicate index '${id}' at '${to}'`); }
        byGroup.set(to, id, rec);
        byRec.set(rec, to);
    }

    //cleanup
    byGroup.delete(from, id);
}

const syncMultiGroup = (byRec, byGroup, id, rec, from, to)=>{
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
            if (current && current !== rec) { fail(`Duplicate index '${id}' at '${groupId}'`); }

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


//TODO ADD EFECTS and FITS
const bundleSync = (chop, inc, rec)=>{
    const { byRec, byGroup, getId, getGroup, filter, fits, effects, isMultiGroup } = vault.get(chop);

    inc = (inc && filter(rec));
    const has = byRec.has(rec);

    if (!inc && !has) { return false; } //nothing gona change

    const id = getId(rec);
    const to = inc ? getGroup(rec) : null; //removed by filter

    const from = byRec.get(rec);

    if (isMultiGroup) { syncMultiGroup(byRec, byGroup, id, rec, from, to); }
    else if (to != from) { syncSingleGroup(byRec, byGroup, id, rec, from, to); }

    return true;
}

//TODO MERGE WITH bundleSync
const propagate = (inc, chop, process, rec, skipFits=false)=>{
    const { childs, fits, effects } = vault.get(chop);

    const isChange = skipFits ? bundleSync(chop, inc, rec) : _chopRunFits(process, fits, _=>bundleSync(chop, inc, rec));

    for (const child of childs) { propagate(inc, child, process, rec, skipFits); }

    //if (isChange) { _chopRunEffects(inc, ) }

    return isChange;
}

const sync = (inc, process, rec, skipFits=false)=>{
    const { isBatch, chop, record } = process;

    if (!isBatch && record !== rec) { solid(process, "record", rec); }

    return propagate(inc, chop, process, rec, skipFits);
}

export const _chopSyncIn = (process, rec, skipFits=false)=>sync(true, process, rec, skipFits);
export const _chopSyncOut = (process, rec, skipFits=false)=>sync(false, process, rec, skipFits);