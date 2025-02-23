import { solid } from "@randajan/props";
import { vault } from "../../../../components/uni/consts";
import { _chopRunEvent } from "./eventHandlers";

export const _chopGetAllRecs = chop=>vault.get(chop).bundle.byRec;
export const _chopGetRecs = (chop, groupId)=>vault.get(chop).bundle.byGroup.getAll(groupId);
export const _chopGetRec = (chop, groupId, recId)=>vault.get(chop).bundle.byGroup.get(groupId, recId);

const propagate = (chop, process, rec, inc, befs, afts)=>{
    const { bundle, childs, befores, afters } = vault.get(chop);
    const isChange = bundle.sync(rec, inc);

    if (isChange) {
        for (const child of childs) { propagate(child, process, rec, inc, hands); }
        if (befs && befores.length) { befs.push(befores); }
        if (afts && afters.length) { afts.push(afters); }
    }

    return isChange;
}

const sync = (inc, process, rec)=>{

    if (process.isBatch) { return propagate(process.chop, process, rec, inc); }

    const befs = [], afts = [];

    if (process.record !== rec) { solid(process, "record", rec); }
    propagate(process.chop, process, rec, inc, befs, afts);
    for (const b of befs) { _chopRunEvent(process, b); }
    for (const a of afts) { _chopRunEvent(process, a, false); }
}

export const _chopSyncIn = (process, rec)=>sync(true, process, rec);
export const _chopSyncOut = (process, rec)=>sync(false, process, rec);