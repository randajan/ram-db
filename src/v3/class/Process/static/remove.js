import { getRecPriv } from "../../Record/static/_records";
import { Major } from "../../Result/Fails";
import { Process } from "../Process";



export const $remove = (record, context)=>{
    
    const _rec = getRecPriv(record, false);
    if (!_rec) { return Process.failEnd(Major.fail("is not record"), "remove", context); }

    return _rec.remove(context);
}