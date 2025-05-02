import { taskWrap } from "../../Task/Task";
import { _chopSyncIn } from "../../Chop/static/sync";
import { _recGetPriv } from "../Record";



const roll = (task, record, force=false)=>{
    const { db } = task;
    _recGetPriv(db, record).remove(task, force);
}

const rollRemoveForce = (task, record)=>roll(task, record, true);
const rollRemove = (task, record)=>roll(task, record, false);

const rollback = (task)=>{
    const { db, record } = chop;
    if (!record) { return; }
    _chopSyncIn(db, record);
}


export const _recRemove = taskWrap(rollRemove, rollback);
export const _recRemoveForce = taskWrap(rollRemoveForce, rollback);