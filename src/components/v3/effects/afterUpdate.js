import { vault } from "../../uni/consts";
import { deleteRec, setRec } from "./_bits";
import { runEvent } from "./eventHandlers";


export const afterUpdate = (chop, res, ctx)=>{
    const { isMultiGroup, recsByGroupId, groupIdsByRec, filter, handlers, childs, state } = vault.get(chop);
    const rec = res.current;

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
            setRec(chop, recsByGroupId, groupId, rec); //add new
        }

        for (const groupId of from) {
            deleteRec(chop, recsByGroupId, groupId, rec); //remove old
        }

        groupIdsByRec.set(rec, results);

    } else if (to !== from) {
        setRec(chop, recsByGroupId, to, rec);
        deleteRec(chop, recsByGroupId, from, rec);
        groupIdsByRec.set(rec, to);
    }

    return runEvent(handlers, childs, state, "update", res, ctx);
}