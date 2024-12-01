import { vault } from "../../../../components/uni/consts";

const prepareRecs = (chop, recsByGroupId, groupId, throwError = true, autoCreate = false)=>{
    let recs = recsByGroupId.get(groupId);
    if (recs) { return recs; }
    if (autoCreate) { recsByGroupId.set(groupId, recs = new Map()); }
    else if (throwError) { throw Error(chop.msg(`not found`, {group:groupId})); }
    return recs;
};

export const _chopDeleteRec = (chop, recsByGroupId, groupId, rec)=>{
    const recs = prepareRecs(chop, recsByGroupId, groupId, true, false);

    if (!recs?.has(rec.id)) { throw Error(chop.msg(`delete(...) critical error - inconsistency`, { group:groupId, row:rec.id }));}

    if (recs.size <= 1) { recsByGroupId.delete(groupId); }
    else { recs.delete(rec.id); }
}

export const _chopSetRec = (chop, recsByGroupId, groupId, rec)=>{
    const recs = prepareRecs(chop, recsByGroupId, groupId, false, true);

    const current = recs.get(rec.id);

    if (!current) { recs.set(rec.id, rec); return; }
    if (current === rec) { return; }

    throw Error(chop.msg(`add(...) failed - duplicate`, { group:groupId, row:rec.id }));
}


export const _chopGetRec = (chop, groupId, recId, throwError = false)=>{

    if (!recId) {
        if (throwError) { throw Error(chop.msg(`get(...) failed - id undefined`, { group:groupId })); }
        return;
    }

    const { recsByGroupId } = vault.get(chop);
    const recs = prepareRecs(chop, recsByGroupId, groupId, throwError, false);

    return recs?.get(recId);
}

export const _chopGetRecs = (chop, groupId, throwError = false)=>{
    const { recsByGroupId } = vault.get(chop);
    return prepareRecs(chop, recsByGroupId, groupId, throwError, false);
}

export const _chopGetAllRecs = chop=>vault.get(chop).groupIdsByRec;
