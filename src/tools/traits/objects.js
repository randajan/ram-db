import { fail } from "./uni";



export const toObject = obj=>{
    const t = typeof obj;
    if (t === "object") { return obj; }
    if (t !== "string") { fail("unparseable"); }
    try { return JSON.parse(obj); }
    catch(e) { fail("unparseable"); }
    
}