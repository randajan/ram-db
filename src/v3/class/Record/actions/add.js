import { taskWrap } from "../../Task/Task";
import { _chopSyncIn } from "../../Chop/static/sync";
import { _recGetPriv } from "../Record";
import { createRow } from "../static/create";

const exe = (task, values)=>{
    const { db } = task;

    const _rec = createRow(db, values);
    _rec.init(task).ready();

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
    
    _chopSyncOut(db, _rec.current);
    _rec.rollback();
    _rec.unreg();
    task.unsign("record");
}


export const _recAdd = taskWrap(exe, roll, rollback);