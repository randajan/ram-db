import { taskWrap } from "../../Task/Task";
import { RecordPrivate } from "../RecordPrivate";
import { _chopGetRec, _chopSyncIn } from "../../Chop/static/sync";
import { _recGetPriv, recUnreg } from "../Record";


const exe = (isSet, task, values)=>{
    const { db } = task;
    
    let _rec = new RecordPrivate(db, values).init(task);
    const { _ent, id } = _rec.current;

    const brother = _chopGetRec(db, toId(_ent), id);

    if (brother) {
        recUnreg(_rec);
        _rec = _recGetPriv(db, brother);
        _rec.update(task, values, isSet);
    } else {
        _rec.ready();
    }

    return _rec;
}

const exeUpdate = (...a)=>exe(false, ...a);
const exeSet = (...a)=>exe(true, ...a);

//TODO ROLLBACK
const rollback = (task)=>{

}


export const _recAddOrUpdate = taskWrap(exeUpdate, {rollback});
export const _recAddOrSet = taskWrap(exeSet, {rollback});