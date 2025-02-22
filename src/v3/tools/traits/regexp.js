
import parseRegExp from "regex-parser";
import { Major } from "../../class/Process/Fails";


export const toRegExp = any=>{
    if (any instanceof RegExp) { return any; }
    
    if (typeof any != "string") { throwMajor("not a regexp"); }

    try { return parseRegExp(any);}
    catch(err) { throwMajor("unparseable"); }
}