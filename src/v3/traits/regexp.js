
import parseRegExp from "regex-parser";
import { Major } from "../class/Result/Fails";


export const saveRegExp = (any, col)=>{
    if (any instanceof RegExp) { return any; }
    
    if (typeof any != "string") {
        throw Major.fail("not a regexp");
    }

    try {
        return parseRegExp(any);
    } catch(err) {
        throw Major.fail("unparseable");
    }
    
}