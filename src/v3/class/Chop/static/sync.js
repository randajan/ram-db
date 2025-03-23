import { solid } from "@randajan/props";
import { vault } from "../../../../components/uni/consts";

import { toSet } from "../../../../components/uni/formats";
import { fail } from "../../../tools/traits/uni";

export const _chopGetAllRecs = chop=>vault.get(chop).byRec;
export const _chopGetRecs = (chop, groupId)=>vault.get(chop).byGroup.getAll(groupId);
export const _chopGetRec = (chop, groupId, recId)=>vault.get(chop).byGroup.get(groupId, recId);

const pushSingleGroup = (_chop, rec, id, from, to)=>{
    const { byRec, byGroup } = _chop;

    if (from === to) { return; } //no change

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

const pushMultiGroup = (_chop, rec, id, from, to)=>{
    const { byRec, byGroup } = _chop;

    if (from === to) { return; }

    if (to == null) { byRec.delete(rec); } //remove
    else {
        let isChange;
        to = toSet(to);

        for (const groupId of to) {
            if (from?.has(groupId)) { from.delete(groupId); continue; } //already correct
            isChange = true;

            const current = byGroup.get(groupId, id);
            if (current && current !== rec) { fail(`Duplicate index '${id}' at '${groupId}'`); }

            byGroup.set(groupId, id, rec); //add new
        }
        if (!isChange) { return; }
        byRec.set(rec, to);
    } 

    if (from != null) {
        for (const groupId of from) {
            byGroup.delete(groupId, id); //remove old
        }
    }
}

const pushRecursive = (inc, chop, process, rec, silent)=>{
    const _chop = vault.get(chop);
    const { byRec, childs, getId, getGroup, filter, fits, effects, isMultiGroup } = _chop;

    inc = (inc && filter(rec));
    const has = byRec.has(rec);

    if (!inc && !has) { return; } //nothing gona change

    const id = getId(rec);
    const from = byRec.get(rec);
    const to = inc ? getGroup(rec) : null; //removed by filter

    const event = !has ? "add" : !inc ? "remove" : "update";
    const push = isMultiGroup ? pushMultiGroup : pushSingleGroup;

    //fits
    if (silent) { push(_chop, rec, id, from, to); }
    else { fits.run(_=>push(_chop, rec, id, from, to), event, process); }

    for (const child of childs) { pushRecursive(inc, child, process, rec, silent); }

    if (!silent) { process.effect(_=>effects.run(event, process)); }

}

const pushInit = (inc, chop, process, rec, silent=false)=>{
    const { isBatch, record } = process;

    if (!isBatch && record !== rec) { solid(process, "record", rec); }

    pushRecursive(inc, chop, process, rec, silent);
}

export const _chopSyncIn = (chop, process, rec, silent=false)=>pushInit(true, chop, process, rec, silent);
export const _chopSyncOut = (chop, process, rec, silent=false)=>pushInit(false, chop, process, rec, silent);