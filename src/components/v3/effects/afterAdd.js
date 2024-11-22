import { vault } from "../../uni/consts";
import { setRec } from "./_bits";
import { runEvent } from "./eventHandlers";


const put = (chop, rec, event, res, ctx)=>{
    const { isMultiGroup, recsByGroupId, groupIdsByRec, filter, handlers, childs, state } = vault.get(chop);
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

    if (!event) { return true; }

    return runEvent(handlers, childs, state, event, res, ctx);
}

export const afterLoad = (chop, rec)=>put(chop, rec);
export const afterAdd = (chop, res, ctx)=>put(chop, res.current, "add", res, ctx);