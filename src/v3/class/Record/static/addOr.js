import { _processWrapper } from "../../Process/Process";
import { RecordPrivate } from "../RecordPrivate";
import { _chopGetRec, _chopSyncIn } from "../../Chop/static/sync";
import { _recGetPriv } from "../Record";


const roll = (isSet, chop, process, values)=>{
    const { db } = chop;
    
    const _rec = new RecordPrivate(db, values).init(process);
    const { _ent, id } = _rec.current;

    const brother = _chopGetRec(db, toId(_ent), id);

    if (brother) {
        _recGetPriv(db, brother).update(values, ctx, isSet);
    } else {
        _rec.ready();
        _chopSyncIn(db, process, _rec.current);
    }
}

const rollUpdate = (...a)=>roll(false, ...a);
const rollSet = (...a)=>roll(true, ...a);

//TODO ROLLBACK
const rollback = (chop, process)=>{

}


export const _recAddOrUpdate = _processWrapper(rollUpdate, rollback);
export const _recAddOrSet = _processWrapper(rollSet, rollback);