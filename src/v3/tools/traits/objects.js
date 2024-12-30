import { Major } from "../../class/Result/Fails";



export const toObject = obj=>{
    const t = typeof obj;
    if (t === "object") { return obj; }
    if (t !== "string") { throw Major.fail("unparseable"); }
    try { return JSON.parse(obj); }
    catch(e) { throw Major.fail("unparseable"); }
    
}