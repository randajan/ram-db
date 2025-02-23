import { _processFactory } from "../../Process/Process";
import { solid } from "@randajan/props";
import { _chopGetRec, _chopSyncIn } from "../../Chop/static/sync";

const roll = (process, record, values, force)=>{
    solid(process, "action", "update");
    _recGetPriv(process.db, record).update(process, values, force);
}

const rollSet = (process, record, values)=>roll(process, record, values, true);
const rollUpdate = (process, record, values)=>roll(process, record, values, false);


const rollback = (process, values)=>{

}


export const _recSet = _processFactory(rollSet, rollback);
export const _recUpdate = _processFactory(rollUpdate, rollback);
