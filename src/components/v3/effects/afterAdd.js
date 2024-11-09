import { vault } from "../../uni/consts";
import { setRec } from "./_bits";
import { runEvent } from "./eventHandlers";


const afterSet = (chop, event, rec, ctx)=>{
    const { isMultiGroup, recsByGroupId, groupIdsByRec, filter, group, handlers, childs, state } = vault.get(chop);
    if (!filter(rec)) { return false; }

    const valid = chop.getGroup(rec);
    if (isMultiGroup) {
        const results = new Set();

        for (const groupId of valid) {
            if (results.has(groupId)) { continue; }
            setRec(chop, recsByGroupId, groupId, rec);
            results.add(groupId);
        }

        groupIdsByRec.set(rec, results);

    } else {
        setRec(chop, recsByGroupId, valid, rec)
        groupIdsByRec.set(rec, valid);
    }

    return runEvent(handlers, childs, state, event, rec, ctx);
}

export const afterAdd = (chop, rec, ctx)=>afterSet(chop, "add", rec, ctx);
export const afterLoad = (chop, rec, ctx)=>afterSet(chop, "load", rec, ctx);