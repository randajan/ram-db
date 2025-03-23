import { _processWrapper } from "../../Process/Process";
import { _recGetPriv } from "../Record";

const roll = (isSet, chop, process, record, values)=>{
    const { db } = chop;
    _recGetPriv(db, record).update(process, values, isSet);
}

const rollUpdate = (...a)=>roll(false, ...a);
const rollSet = (...a)=>roll(true, ...a);


//TODO ROLLBACK
const rollback = (chop, process, values)=>{

}


export const _recSet = _processWrapper(rollSet, rollback);
export const _recUpdate = _processWrapper(rollUpdate, rollback);
