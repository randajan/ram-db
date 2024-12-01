import { vault } from "../../../../components/uni/consts";
import { _chopSetRec } from "./_private";
import { runEvent } from "./eventHandlers";


const _afterAdd = (chop, rec, event, res, ctx)=>{
    const { isMultiGroup, recsByGroupId, groupIdsByRec, filter, handlers, childs, state } = vault.get(chop);
    if (!filter(rec)) { return false; }

    const valid = chop.getGroup(rec);
    if (isMultiGroup) {
        const results = new Set();

        for (const groupId of valid) {
            if (results.has(groupId)) { continue; }
            _chopSetRec(chop, recsByGroupId, groupId, rec);
            results.add(groupId);
        }

        groupIdsByRec.set(rec, results);

    } else {
        _chopSetRec(chop, recsByGroupId, valid, rec)
        groupIdsByRec.set(rec, valid);
    }

    if (!event) { return true; }

    return runEvent(handlers, childs, state, event, res, ctx);
}

export const afterAddInit = (chop, rec)=>_afterAdd(chop, rec);
export const afterAdd = (chop, res, ctx)=>_afterAdd(chop, res.current, "add", res, ctx);