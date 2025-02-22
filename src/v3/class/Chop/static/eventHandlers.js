import { solid } from "@randajan/props";
import { vault } from "../../../../components/uni/consts";
import { isFce } from "../../../../components/uni/formats";
import { throwMajor } from "../../../tools/traits/uni";

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

const _sync = (inc, process, rec, isBatch=false)=>{

    solid(process, "isBatch", isBatch);

    if (isBatch) { return propagate(process.chop, process, rec, inc); }

    const befs = [], afts = [];

    solid(process, "record", rec);
    propagate(process.chop, process, rec, inc, befs, afts);
    for (const b of befs) { runEvent(process, b); }
    
    for (const a of afts) { runEvent(process, a, false); }

}

export const syncIn = (process, rec, isBatch=false)=>_sync(true, process, rec, isBatch);
export const syncOut = (process, rec, isBatch=false)=>_sync(false, process, rec, isBatch);

export const runEvent = (process, handlers, throwErrors=true)=>{
    for (let i = handlers.length - 1; i >= 0; i--) {
        if (!handlers[i]) { return; }
        try { handlers[i](process); }
        catch(err) {
            if (throwErrors) { throw err; }
            console.warn(err); //TODO better non important errors handler
        }
    }
}


export const onEvent = (chop, isBefore, callback)=>{
    if (!isFce(callback)) { throwMajor(`on(...) require function`); }
    const { befores, afters } = vault.get(chop);
    const handlers = isBefore ? befores : afters;

    handlers.unshift(callback);

    return _ => {
        const x = handlers.indexOf(callback);
        if (x >= 0) { handlers.splice(x, 1); }
        return callback;
    }
}