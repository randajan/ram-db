import { _processFactory } from "../../Process/Process";
import { RecordPrivate } from "../RecordPrivate";
import { solid } from "@randajan/props";
import { _chopSyncIn } from "../../Chop/static/sync";
import { _recGetPriv } from "./_records";

const roll = (process, values)=>{
    solid(process, "action", "add");

    const _rec = new RecordPrivate(process.db, values);

    _rec.colsInit().init(process).ready();
    _chopSyncIn(process, _rec.current);
}

const rollback = (process)=>{
    const _rec = _recGetPriv(process.db, process.record, false);
    _rec?.remove(process, true);
}


export const _recAdd = _processFactory(roll, rollback);