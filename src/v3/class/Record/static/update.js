import { taskWrap } from "../../Task/Task";
import { _recGetPriv } from "../Record";

const roll = (isSet, task, record, values)=>{
    const { db } = task;
    _recGetPriv(db, record).update(task, values, isSet);
}

const rollUpdate = (...a)=>roll(false, ...a);
const rollSet = (...a)=>roll(true, ...a);


//TODO ROLLBACK
const rollback = (task, values)=>{

}


export const _recSet = taskWrap(rollSet, rollback);
export const _recUpdate = taskWrap(rollUpdate, rollback);
