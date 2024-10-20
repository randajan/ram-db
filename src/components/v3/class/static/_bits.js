import { vault } from "../../../uni/consts";

const prepareRecs = (chop, recsByGroupId, groupId, throwError = true, autoCreate = false)=>{
    let recs = recsByGroupId.get(groupId);
    if (recs) { return recs; }
    if (autoCreate) { recsByGroupId.set(groupId, recs = new Map()); }
    else if (throwError) { throw Error(chop.msg(`not found`, undefined, groupId)); }
    return recs;
};

export const deleteRec = (chop, recsByGroupId, groupId, rec)=>{
    const recs = prepareRecs(recsByGroupId, groupId, true, false);

    if (!recs?.has(rec.id)) { throw Error(chop.msg(`delete(...) failed - missing`, rec.id, groupId));}

    if (recs.size <= 1) { recsByGroupId.delete(groupId); }
    else { recs.delete(rec.id); }
    return true;
}

export const setRec = (chop, recsByGroupId, groupId, rec)=>{
    const recs = prepareRecs(chop, recsByGroupId, groupId, false, true);

    const current = recs.get(rec.id);

    if (current === rec) { return true; }

    if (current) { throw Error(chop.msg(`add(...) failed - duplicate`, rec.id, groupId)); }

    recs.set(rec.id, rec);

    return true;
}


export const getRec = (chop, groupId, recId, throwError = false)=>{

    if (!recId) {
        if (throwError) { throw Error(chop.msg(`get(...) failed - id undefined`, undefined, groupId)); }
        return;
    }

    const { recsByGroupId } = vault.get(chop);
    const recs = prepareRecs(chop, recsByGroupId, groupId, throwError, false);

    return recs?.get(recId);
}

export const getRecs = (chop, groupId, throwError = false)=>{
    const { recsByGroupId } = vault.get(chop);
    return prepareRecs(chop, recsByGroupId, groupId, throwError, false);
}