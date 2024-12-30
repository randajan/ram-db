import { sync } from "../../Chop/static/eventHandlers";
import { RecordPrivate } from "../../Record/RecordPrivate";
import { Process } from "../Process";


const add = (process, db, values)=>{

    const _rec = new RecordPrivate(db, values);
    _rec.colsInit().colsPrepare(process).colsFinish();

    sync(db, _rec.current, true, process);
}


export function $add(db, values, context) {
    return Process.sandbox("add", db, context, arguments, add);
}