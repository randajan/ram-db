import { _processFactory } from "../../Process/Process";
import { RecordPrivate } from "../RecordPrivate";
import { solid } from "@randajan/props";
import { _chopGetRec, _chopSyncIn } from "../../Chop/static/sync";


const roll = (process, values, force=false)=>{
    const { db } = process;

    process.action = "addOrUpdate";
    
    const _rec = new RecordPrivate(db, values).colsInit().init(process);
    const { _ent, id } = _rec.current;

    const brother = _chopGetRec(db, toId(_ent), id);

    if (brother) {
        solid(process, "action", "update");
        _recGetPriv(db, brother).update(values, ctx, force);
    } else {
        solid(process, "action", "add");
        _rec.ready();
        _chopSyncIn(process, _rec.current);
    }
}

const rollUpdate = (process, values)=>roll(process, values, true);
const rollSet = (process, values)=>roll(process, values, false);

const rollback = (process)=>{

}


export const _recAddOrUpdate = _processFactory(rollUpdate, rollback);
export const _recAddOrSet = _processFactory(rollSet, rollback);