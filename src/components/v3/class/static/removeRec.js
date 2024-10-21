import { vault } from "../../../uni/consts";
import { deleteRec } from "./_bits";
import { runEvent } from "./eventHandlers";


export const removeRec = (chop, rec, ctx)=>{
    const { isMultiGroup, recsByGroupId, groupIdsByRec, filter, handlers, childs, state } = vault.get(chop);

    const current = groupIdsByRec.get(rec);
    if (!current) {
        if (filter(rec)) { throw Error(chop.msg(`remove(...) failed - missing`, rec.id)); }
        return false;
    }

    if (isMultiGroup) {
        for (const groupId of current) { deleteRec(chop, recsByGroupId, groupId, rec); }
    } else {
        deleteRec(chop, recsByGroupId, current, rec);
    }
    
    groupIdsByRec.delete(rec);

    return runEvent(handlers, childs, state, "remove", rec, ctx);
}
