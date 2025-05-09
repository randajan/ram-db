import { fail } from "../../../tools/traits/uni";
import { _chopSyncIn } from "../../Chop/static/sync";
import { taskWrap } from "../../Task/Task";

const exe = (isSet, task, record, values)=>{
    const { _db } = task;
    const _rec = _db.records.get(record);
    if (!_rec) { throw fail("not a record"); }

    _rec.update(task, values, isSet);

    return _rec;
}

const roll = (task, _rec)=>{
    const { changes } = _rec.turn;
    task.assign({ changes });
    _rec.roll();
    
}

const rollback = (task, _rec)=>{
    const { db } = task;
    if (!_rec) { return; }
    
    _rec.rollback();
    task.unsign("record");
    _chopSyncIn(db, _rec.current);
}


const exeUpdate = (...a)=>exe(false, ...a);
const exeSet = (...a)=>exe(true, ...a);

export const _recSet = taskWrap(exeSet, roll, rollback);
export const _recUpdate = taskWrap(exeUpdate, roll, rollback);
