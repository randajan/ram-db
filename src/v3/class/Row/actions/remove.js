import { taskWrap } from "../../Task/Task";
import { _chopSyncIn, _chopSyncOut } from "../../Chop/static/sync";
import { _recGetPriv } from "../Record";



const exe = (task, record, force=false)=>{
    const { db } = task;
    const row = _recGetPriv(db, record);

    if (!force && row.meta) { row.fail("is meta"); }
    
    _chopSyncOut(db, record, task);
    
    return row;
}

const roll = (task, row)=>{
    row.unreg();
}

const rollback = (task, row)=>{
    const { db } = task;
    if (!row) { return; }
    _chopSyncIn(db, row.current);
}

const exeRemoveForce = (task, record)=>exe(task, record, true);
const exeRemove = (task, record)=>exe(task, record, false);


export const _recRemove = taskWrap(exeRemove, roll, rollback);
export const _recRemoveForce = taskWrap(exeRemoveForce, roll, rollback);