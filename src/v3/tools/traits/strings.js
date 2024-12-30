import { Major } from "../../class/Result/Fails";

import { fnToStr } from "@randajan/function-parser";

export const toString = (any, opt={})=>{
    const t = typeof any;

    let str;
    if (any == null) { str = ""; }
    else if (t === "string") { str = any; }
    else if (t === "function") { str = fnToStr(any); }
    else { str = String(any); }

    
    if (str === '[object Object]') {
        try { str = JSON.stringify(any); }
        catch(e) { throw Major.fail("unparseable"); }
    }

    const { min, max } = opt;

    if (min != null && str.length < min) { throw Major.fail("too short", min); }
    if (max != null && str.length > max) { str = str.substring(0, max); }

    return str;
}

