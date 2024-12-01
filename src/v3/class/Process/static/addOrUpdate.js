import { addOrSetRec } from "../../Record/static/_records";
import { Process } from "../Process";


export const addOrSet = (action, db, values, context, isUpdate=false)=>{
    const process = new Process("addOrSet", context);
    return addOrSetRec(db, values, context, isUpdate);
}

export const $addOrSet = (db, values, context)=>addOrSet("set", db, values, context);

export const $addOrUpdate = (db, values, context)=>addOrSet("update", db, values, context, true);