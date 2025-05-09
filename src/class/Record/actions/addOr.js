import { taskWrap } from "../../Task/Task";
import { _chopGetRec, _chopSyncIn } from "../../Chop/static/sync";
import { toId } from "../../../tools/traits/uni";


const exe = (isSet, task, values)=>{
    const { db, _db } = task;
    
    let _rec = createRecord(db, values).init(task);
    const { _ent, id } = _rec.current;

    const brother = _chopGetRec(db, toId(_ent), id);

    if (!brother) {
        _rec.ready();
        return [_rec, true];
    } else {
        _rec.unreg();
        _rec = _db.records.get(brother);
        _rec.update(task, values, isSet);
        return [_rec, false];
    }
}

const roll = (task, [_rec, isAdd])=>{
    const { changes } = _rec.turn;
    task.assign({ changes });
    _rec.roll();
}

const rollback = (task, res)=>{
    if (!res) { return; }
    const [_rec, isAdd] = res;
    
    if (isAdd) { _chopSyncOut(db, _rec.current); }
    
    _rec.rollback();
    task.unsign("record");

    if (isAdd) { _rec.unreg(); }
    else { _chopSyncIn(db, _rec.current); }
}


const exeSet = (...a)=>exe(true, ...a);
const exeUpdate = (...a)=>exe(false, ...a);

export const _recAddOrSet = taskWrap(exeSet, roll, rollback);
export const _recAddOrUpdate = taskWrap(exeUpdate, roll, rollback);