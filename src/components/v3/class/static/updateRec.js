import { deleteRec, setRec } from "./_bits";
import { runEvent } from "./eventHandlers";


export const updateRec = (chop, rec, ctx)=>{
    const { isMultiGroup, recsByGroupId, groupIdsByRec, group, filter, handlers, childs, state } = vault.get(chop);

    const valid = group(rec);
    const current = groupIdsByRec.get(rec);

    if (current) {
        if (filter(rec)) { throw Error(chop.msg(`update(...) failed - missing`, rec.id)); }
        return false;
    }

    if (isMultiGroup) {
        const results = new Set();

        for (const groupId of valid) {
            if (results.has(groupId)) { continue; }
            if (current.has(groupId)) { current.delete(groupId); }
            else if (!setRec(chop, recsByGroupId, groupId, rec)) { continue; }
            results.add(groupId);
        }

        for (const groupId of current) { deleteRec(chop, recsByGroupId, groupId, rec); }

        groupIdsByRec.set(rec, results);

    } else if (valid !== current && setRec(chop, recsByGroupId, valid, rec)) {
        deleteRec(chop, recsByGroupId, current, rec);
        groupIdsByRec.set(rec, valid);
    }

    return runEvent(handlers, childs, state, "update", rec, ctx);
}