import { solid } from "@randajan/props";
import { vault } from "../../../../components/uni/consts";
import { _chopRunEffects, _chopRunFits } from "./eventHandlers";

export const _chopGetAllRecs = chop=>vault.get(chop).bundle.byRec;
export const _chopGetRecs = (chop, groupId)=>vault.get(chop).bundle.byGroup.getAll(groupId);
export const _chopGetRec = (chop, groupId, recId)=>vault.get(chop).bundle.byGroup.get(groupId, recId);


//TODO: effects should be called after everything is done
const propagate = (chop, process, rec, inc, befs, afts)=>{
    const { bundle, childs, fits, effects } = vault.get(chop);
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

    const befs = [], wws = [];

    if (process.record !== rec) { solid(process, "record", rec); }
    propagate(process.chop, process, rec, inc, befs, afts);
    for (const b of befs) { _chopRunFits(process, b); }
    for (const a of wws) { _chopRunEffects(process, a); }
}

export const _chopSyncIn = (process, rec)=>sync(true, process, rec);
export const _chopSyncOut = (process, rec)=>sync(false, process, rec);