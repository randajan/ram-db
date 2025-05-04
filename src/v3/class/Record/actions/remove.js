import { taskWrap } from "../../Task/Task";
import { _chopSyncIn, _chopSyncOut } from "../../Chop/static/sync";
import { _recGetPriv } from "../Record";



const exe = (task, record, force=false)=>{
    const { db } = task;
    const _rec = _recGetPriv(db, record);

    if (!force && _rec.meta) { _rec.fail("is meta"); }
    
    _chopSyncOut(db, record, task);
    
    return _rec;
}

const roll = (task, _rec)=>{
    _rec.unreg();
}

const rollback = (task, _rec)=>{
    const { db } = task;
    if (!_rec) { return; }
    _chopSyncIn(db, _rec.current);
}

const exeRemoveForce = (task, record)=>exe(task, record, true);
const exeRemove = (task, record)=>exe(task, record, false);


export const _recRemove = taskWrap(exeRemove, roll, rollback);
export const _recRemoveForce = taskWrap(exeRemoveForce, roll, rollback);