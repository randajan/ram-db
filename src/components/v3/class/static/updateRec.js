import { vault } from "../../../uni/consts";
import { deleteRec, setRec } from "./_bits";
import { runEvent } from "./eventHandlers";


export const updateRec = (chop, rec, ctx)=>{
    const { isMultiGroup, recsByGroupId, groupIdsByRec, group, filter, handlers, childs, state } = vault.get(chop);

    const current = groupIdsByRec.get(rec);
    if (!current) {
        if (filter(rec)) { throw Error(chop.msg(`update(...) failed - missing`, rec.id)); }
        return false;
    }

    const valid = group(rec);

    if (isMultiGroup) {
        const results = new Set();

        for (const groupId of valid) {
            if (results.has(groupId)) { continue; } //duplicate control
            results.add(groupId);
            if (current.has(groupId)) { current.delete(groupId); continue; } //remove valid current
            setRec(chop, recsByGroupId, groupId, rec); //add new
        }

        for (const groupId of current) {
            deleteRec(chop, recsByGroupId, groupId, rec); //remove old
        }

        groupIdsByRec.set(rec, results);

    } else {
        if (valid === current) { return false; }
        setRec(chop, recsByGroupId, valid, rec);
        deleteRec(chop, recsByGroupId, current, rec);
        groupIdsByRec.set(rec, valid);
    }

    return runEvent(handlers, childs, state, "update", rec, ctx);
}