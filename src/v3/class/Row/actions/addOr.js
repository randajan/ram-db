import { taskWrap } from "../../Task/Task";
import { _chopGetRec, _chopSyncIn } from "../../Chop/static/sync";
import { _recGetPriv } from "../Record";
import { toId } from "../../../tools/traits/uni";


const exe = (isSet, task, values)=>{
    const { db } = task;
    
    let row = createRow(db, values).init(task);
    const { _ent, id } = row.current;

    const brother = _chopGetRec(db, toId(_ent), id);

    if (!brother) {
        row.ready();
        return [row, true];
    } else {
        row.unreg();
        row = _recGetPriv(db, brother);
        row.update(task, values, isSet);
        return [row, false];
    }
}

const roll = (task, [row, isAdd])=>{
    const { changes } = row.turn;
    task.assign({ changes });
    row.roll();
}

const rollback = (task, res)=>{
    if (!res) { return; }
    const [row, isAdd] = res;
    
    if (isAdd) { _chopSyncOut(db, row.current); }
    
    row.rollback();
    task.unsign("record");

    if (isAdd) { row.unreg(); }
    else { _chopSyncIn(db, row.current); }
}


const exeSet = (...a)=>exe(true, ...a);
const exeUpdate = (...a)=>exe(false, ...a);

export const _recAddOrSet = taskWrap(exeSet, roll, rollback);
export const _recAddOrUpdate = taskWrap(exeUpdate, roll, rollback);