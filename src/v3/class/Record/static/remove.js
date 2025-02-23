import { _processFactory } from "../../Process/Process";
import { RecordPrivate } from "../RecordPrivate";
import { solid } from "@randajan/props";
import { _chopGetRec, _chopSyncIn } from "../../Chop/static/sync";



const roll = (process, record, force=false)=>{
    solid(process, "action", "remove");
    _chopGetRec(process.db, record).remove(process, force);
}

const rollRemoveForce = (process, record)=>roll(process, record, true);
const rollRemove = (process, record)=>roll(process, record, false);

const rollback = (process, values)=>{

}


export const _recRemove = _processFactory(rollRemove, rollback);
export const _recRemoveForce = _processFactory(rollRemoveForce, rollback);