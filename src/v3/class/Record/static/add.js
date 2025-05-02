import { taskWrap } from "../../Task/Task";
import { RecordPrivate } from "../RecordPrivate";
import { _chopSyncIn } from "../../Chop/static/sync";
import { _recGetPriv } from "../Record";

const roll = (task, values)=>{
    const { db } = task

    const _rec = new RecordPrivate(db, values);
    _rec.init(task).ready();
    
    _chopSyncIn(db, _rec.current, task);
}

const rollback = (task)=>{
    const { db, record } = task;
    const _rec = _recGetPriv(db, record, false);
    _rec?.remove(task, true);
}


export const _recAdd = taskWrap(roll, rollback);