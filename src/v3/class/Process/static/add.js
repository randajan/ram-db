import { addRec } from "../../Record/static/_records";
import { Process } from "../Process";



export const $add = (db, values, context)=>{
    const process = new Process("add", context);
    return addRec(db, values, context);
}