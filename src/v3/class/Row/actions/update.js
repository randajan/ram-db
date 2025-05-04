import { _chopSyncIn } from "../../Chop/static/sync";
import { taskWrap } from "../../Task/Task";
import { _recGetPriv } from "../Record";

const exe = (isSet, task, record, values)=>{
    const { db } = task;
    const row = _recGetPriv(db, record);

    row.update(task, values, isSet);

    return row;
}

const roll = (task, row)=>{
    const { changes } = row.turn;
    task.assign({ changes });
    row.roll();
    
}

const rollback = (task, row)=>{
    const { db } = task;
    if (!row) { return; }
    
    row.rollback();
    task.unsign("record");
    _chopSyncIn(db, row.current);
}


const exeUpdate = (...a)=>exe(false, ...a);
const exeSet = (...a)=>exe(true, ...a);

export const _recSet = taskWrap(exeSet, roll, rollback);
export const _recUpdate = taskWrap(exeUpdate, roll, rollback);
