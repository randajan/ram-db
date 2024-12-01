import { vault } from "../../../../components/uni/consts";
import { _chopDeleteRec, _chopSetRec } from "./_private";
import { runEvent } from "./eventHandlers";


const _afterUpdate = (chop, rec, event, res, ctx)=>{
    const { isMultiGroup, recsByGroupId, groupIdsByRec, filter, handlers, childs, state } = vault.get(chop);

    const from = groupIdsByRec.get(rec);
    if (!from) {
        if (filter(rec)) { throw Error(chop.msg(`update(...) failed - missing`, { row:rec.id })); }
        return false;
    }

    const to = chop.getGroup(rec);

    if (isMultiGroup) {
        const results = new Set();

        for (const groupId of to) {
            if (results.has(groupId)) { continue; } //duplicate control
            results.add(groupId);
            if (from.has(groupId)) { from.delete(groupId); continue; } //remove to from
            _chopSetRec(chop, recsByGroupId, groupId, rec); //add new
        }

        for (const groupId of from) {
            _chopDeleteRec(chop, recsByGroupId, groupId, rec); //remove old
        }

        groupIdsByRec.set(rec, results);

    } else if (to !== from) {
        _chopSetRec(chop, recsByGroupId, to, rec);
        _chopDeleteRec(chop, recsByGroupId, from, rec);
        groupIdsByRec.set(rec, to);
    }

    if (!event) { return true; }

    return runEvent(handlers, childs, state, "update", res, ctx);
}

export const afterUpdateInit = (chop, rec)=>_afterUpdate(chop, rec);
export const afterUpdate = (chop, res, ctx)=>_afterUpdate(chop, res.current, "update", res, ctx);