import { _chopSyncIn } from "../../Chop/static/sync";
import { taskWrap } from "../../Task/Task";
import { _recGetPriv } from "../Record";

const exe = (isSet, task, record, values)=>{
    const { db } = task;
    const _rec = _recGetPriv(db, record);

    _rec.update(task, values, isSet);

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
    
    _rec.turn.detach(false);
    task.unsign("record");
    _chopSyncIn(db, _rec.current);
}


const exeUpdate = (...a)=>exe(false, ...a);
const exeSet = (...a)=>exe(true, ...a);

export const _recSet = taskWrap(exeSet, roll, rollback);
export const _recUpdate = taskWrap(exeUpdate, roll, rollback);
