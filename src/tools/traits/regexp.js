
import parseRegExp from "regex-parser";


export const toRegExp = any=>{
    if (any instanceof RegExp) { return any; }
    
    if (typeof any != "string") { fail("not a regexp"); }

    try { return parseRegExp(any);}
    catch(err) { fail("unparseable"); }
}