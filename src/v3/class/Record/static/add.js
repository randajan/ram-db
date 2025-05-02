import { taskWrap } from "../../Task/Task";
import { RecordPrivate } from "../RecordPrivate";
import { _chopSyncIn } from "../../Chop/static/sync";
import { _recGetPriv, recUnreg } from "../Record";

const exe = (task, values)=>{
    const { db } = task;

    const _rec = new RecordPrivate(db, values);
    _rec.init(task).ready();

    return _rec;
}

const roll = (task, _rec)=>{
    const { changes } = _rec.turn;
    task.assign({ changes });
    _rec.turn.detach(true);
}

const rollback = (task, _rec)=>{
    const { db } = task;
    if (!_rec) { return; }
    
    _chopSyncOut(db, _rec.current);
    _rec.task.detach(false);
    task.unsign("record");
    recUnreg(_rec);
}


export const _recAdd = taskWrap(exe, roll, rollback);