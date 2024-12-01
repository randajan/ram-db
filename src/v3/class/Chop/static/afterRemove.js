import { vault } from "../../../../components/uni/consts";
import { _chopDeleteRec } from "./_private";
import { runEvent } from "./eventHandlers";


export const afterRemove = (chop, res, ctx)=>{
    const { isMultiGroup, recsByGroupId, groupIdsByRec, filter, handlers, childs, state } = vault.get(chop);
    const rec = res.current;

    const from = groupIdsByRec.get(rec);
    if (!from) {
        if (filter(rec)) { throw Error(chop.msg(`remove(...) failed - missing`, { row:rec.id })); }
        return false;
    }

    if (isMultiGroup) {
        for (const groupId of from) { _chopDeleteRec(chop, recsByGroupId, groupId, rec); }
    } else {
        _chopDeleteRec(chop, recsByGroupId, from, rec);
    }
    
    groupIdsByRec.delete(rec);

    return runEvent(handlers, childs, state, "remove", res, ctx);
}
