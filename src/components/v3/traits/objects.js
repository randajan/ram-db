import { Major } from "../class/Exceptions";



export const saveObj = (obj, col)=>{
    const t = typeof obj;
    if (t === "object") { return obj; }
    if (t !== "string") { throw Major.fail("unparseable"); }
    try { return JSON.parse(obj); }
    catch(e) { throw Major.fail("unparseable"); }
    
}