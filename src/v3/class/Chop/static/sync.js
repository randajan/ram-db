import { solid } from "@randajan/props";
import { vault } from "../../../../components/uni/consts";
import { _chopRunEffects, _chopRunFits } from "./eventHandlers";

export const _chopGetAllRecs = chop=>vault.get(chop).bundle.byRec;
export const _chopGetRecs = (chop, groupId)=>vault.get(chop).bundle.byGroup.getAll(groupId);
export const _chopGetRec = (chop, groupId, recId)=>vault.get(chop).bundle.byGroup.get(groupId, recId);

const propagate = (inc, chop, process, rec, force=false)=>{
    const { bundle, childs, fits } = vault.get(chop);

    const isChange = force ? bundle.sync(inc, rec) : _chopRunFits(process, fits, _=>bundle.sync(inc, rec));

    for (const child of childs) { propagate(inc, child, process, rec, force); }

    return isChange;
}

const sync = (inc, process, rec, force=false)=>{
    const { isBatch, chop, record } = process;

    if (!isBatch && record !== rec) { solid(process, "record", rec); }

    return propagate(inc, chop, process, rec, force);
}

export const _chopSyncIn = (process, rec, force=false)=>sync(true, process, rec, force);
export const _chopSyncOut = (process, rec, force=false)=>sync(false, process, rec, force);