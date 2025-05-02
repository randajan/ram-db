import { taskWrap } from "../../Task/Task";
import { RecordPrivate } from "../RecordPrivate";
import { _chopGetRec, _chopSyncIn } from "../../Chop/static/sync";
import { _recGetPriv, recUnreg } from "../Record";
import { toId } from "../../../tools/traits/uni";


const exe = (isSet, task, values)=>{
    const { db } = task;
    
    let _rec = new RecordPrivate(db, values).init(task);
    const { _ent, id } = _rec.current;

    const brother = _chopGetRec(db, toId(_ent), id);

    if (!brother) {
        _rec.ready();
        return [_rec, true];
    } else {
        recUnreg(_rec);
        _rec = _recGetPriv(db, brother);
        _rec.update(task, values, isSet);
        return [_rec, false];
    }
}

const roll = (task, [_rec, isAdd])=>{
    const { changes } = _rec.turn;
    task.assign({ changes });
    _rec.turn.detach(true);
}

const rollback = (task, res)=>{
    if (!res) { return; }
    const [_rec, isAdd] = res;
    
    if (isAdd) { _chopSyncOut(db, _rec.current); }
    
    _rec.task.detach(false);
    task.unsign("record");

    if (isAdd) { recUnreg(_rec); }
    else { _chopSyncIn(db, _rec.current); }
}


const exeSet = (...a)=>exe(true, ...a);
const exeUpdate = (...a)=>exe(false, ...a);

export const _recAddOrSet = taskWrap(exeSet, roll, rollback);
export const _recAddOrUpdate = taskWrap(exeUpdate, roll, rollback);