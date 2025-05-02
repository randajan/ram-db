import { taskWrap } from "../../Task/Task";
import { RecordPrivate } from "../RecordPrivate";
import { _chopGetRec, _chopSyncIn } from "../../Chop/static/sync";
import { _recGetPriv } from "../Record";


const roll = (isSet, task, values)=>{
    const { db } = task;
    
    const _rec = new RecordPrivate(db, values).init(task);
    const { _ent, id } = _rec.current;

    const brother = _chopGetRec(db, toId(_ent), id);

    if (brother) {
        _recGetPriv(db, brother).update(values, ctx, isSet);
    } else {
        _rec.ready();
        _chopSyncIn(db, _rec.current, task);
    }
}

const rollUpdate = (...a)=>roll(false, ...a);
const rollSet = (...a)=>roll(true, ...a);

//TODO ROLLBACK
const rollback = (task)=>{

}


export const _recAddOrUpdate = taskWrap(rollUpdate, rollback);
export const _recAddOrSet = taskWrap(rollSet, rollback);