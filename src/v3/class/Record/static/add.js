import { _processWrapper } from "../../Process/Process";
import { RecordPrivate } from "../RecordPrivate";
import { _chopSyncIn } from "../../Chop/static/sync";
import { _recGetPriv } from "./_records";

const roll = (chop, process, values)=>{
    const { db } = chop;

    const _rec = new RecordPrivate(db, values);

    _rec.colsInit().init(process).ready();
    _chopSyncIn(db, process, _rec.current);
}

const rollback = (chop, process)=>{
    const _rec = _recGetPriv(chop.db, process.record, false);
    _rec?.remove(process, true);
}


export const _recAdd = _processWrapper(roll, rollback);