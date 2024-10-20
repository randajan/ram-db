import { vault } from "../../../uni/consts";
import { deleteRec } from "./_bits";
import { runEvent } from "./eventHandlers";


export const removeRec = (chop, rec, ctx)=>{
    const { isMultiGroup, recsByGroupId, groupIdsByRec, filter, handlers, childs, state } = vault.get(chop);

    const current = groupIdsByRec.get(rec);
    if (isMultiGroup) {
        for (const groupId of current) { deleteRec(chop, recsByGroupId, groupId, rec); }
    } else {
        deleteRec(chop, recsByGroupId, current, rec);
    }
    
    groupIdsByRec.delete(rec);

    return runEvent(handlers, childs, state, "remove", rec, ctx);
}
