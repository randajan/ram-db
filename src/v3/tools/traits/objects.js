import { throwMajor } from "./uni";



export const toObject = obj=>{
    const t = typeof obj;
    if (t === "object") { return obj; }
    if (t !== "string") { throwMajor("unparseable"); }
    try { return JSON.parse(obj); }
    catch(e) { throwMajor("unparseable"); }
    
}