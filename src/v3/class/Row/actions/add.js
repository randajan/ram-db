import { taskWrap } from "../../Task/Task";
import { _chopSyncIn } from "../../Chop/static/sync";
import { _recGetPriv } from "../Record";
import { createRow } from "../static/create";

const exe = (task, values)=>{
    const { db } = task;

    const row = createRow(db, values);
    row.init(task).ready();

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
    
    _chopSyncOut(db, row.current);
    row.rollback();
    row.unreg();
    task.unsign("record");
}


export const _recAdd = taskWrap(exe, roll, rollback);