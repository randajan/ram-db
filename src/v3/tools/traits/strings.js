
import { fnToStr } from "@randajan/function-parser";
import { fail } from "./uni";



export const toString = (any, opt={})=>{
    const t = typeof any;

    let str;
    if (any == null) { str = ""; }
    else if (t === "string") { str = any; }
    else if (t === "function") { str = fnToStr(any); }
    else { str = String(any); }

    
    if (str === '[object Object]') {
        try { str = JSON.stringify(any); }
        catch(e) { fail("unparseable"); }
    }

    const { min, max } = opt;

    if (min != null && str.length < min) { fail("too short", ["min", min]); }
    if (max != null && str.length > max) { fail("too long", ["max", max]); }

    return str;
}

