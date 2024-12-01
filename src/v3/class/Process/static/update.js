import { getRecPriv } from "../../Record/static/_records";
import { Process } from "../Process";


const set = (process, record, values, context)=>{
    
    return getRecPriv(record).valsPush(values, context, action === "update");
}

export const $set = (record, values, context)=>{
    const process = new Process("set", context);
    set("set", record, values, context);
}
export const $update = (record, values, context)=>set("update", record, values, context);