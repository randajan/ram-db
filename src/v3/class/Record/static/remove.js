import { _processFactory } from "../../Process/Process";
import { solid } from "@randajan/props";
import { _chopSyncIn } from "../../Chop/static/sync";
import { _recGetPriv } from "./_records";



const roll = (process, record, force=false)=>{
    solid(process, "action", "remove");
    _recGetPriv(process.db, record).remove(process, force);
}

const rollRemoveForce = (process, record)=>roll(process, record, true);
const rollRemove = (process, record)=>roll(process, record, false);

const rollback = (process)=>{
    if (!process.record) { return; }
    _chopSyncIn(process, process.record, true);
}


export const _recRemove = _processFactory(rollRemove, rollback);
export const _recRemoveForce = _processFactory(rollRemoveForce, rollback);