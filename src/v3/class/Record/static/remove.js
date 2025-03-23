import { _processWrapper } from "../../Process/Process";
import { _chopSyncIn } from "../../Chop/static/sync";
import { _recGetPriv } from "../Record";



const roll = (chop, process, record, force=false)=>{
    const { db } = chop;
    _recGetPriv(db, record).remove(process, force);
}

const rollRemoveForce = (chop, process, record)=>roll(chop, process, record, true);
const rollRemove = (chop, process, record)=>roll(chop, process, record, false);

const rollback = (chop, process)=>{
    if (!process.record) { return; }
    _chopSyncIn(chop, process, process.record, true);
}


export const _recRemove = _processWrapper(rollRemove, rollback);
export const _recRemoveForce = _processWrapper(rollRemoveForce, rollback);