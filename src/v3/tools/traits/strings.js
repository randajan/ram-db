
import { fnToStr } from "@randajan/function-parser";
import { throwMajor } from "./uni";

export const toString = (any, opt={})=>{
    const t = typeof any;

    let str;
    if (any == null) { str = ""; }
    else if (t === "string") { str = any; }
    else if (t === "function") { str = fnToStr(any); }
    else { str = String(any); }

    
    if (str === '[object Object]') {
        try { str = JSON.stringify(any); }
        catch(e) { throwMajor("unparseable"); }
    }

    const { min, max } = opt;

    if (min != null && str.length < min) { throwMajor("too short", min); }
    if (max != null && str.length > max) { str = str.substring(0, max); }

    return str;
}

