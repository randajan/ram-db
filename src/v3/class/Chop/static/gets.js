import { vault } from "../../../../components/uni/consts";

export const _chopGetAllRecs = chop=>vault.get(chop).bundle.byRec;

export const _chopGetRecs = (chop, groupId)=>vault.get(chop).bundle.byGroup.getAll(groupId);

export const _chopGetRec = (chop, groupId, recId)=>vault.get(chop).bundle.byGroup.get(groupId, recId);
