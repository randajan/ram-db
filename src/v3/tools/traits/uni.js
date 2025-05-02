
import { Major, Minor } from "../../class/Task/Fails";
import { toString } from "./strings";

export const toId = ref=>(typeof ref !== "string") ? ref?.id : ref;

export const isEmpty = any=>{
    if (any == null) { return true; }

    const t = typeof any;
    if (t === "string") { return !any; }
    if (t === "number") { return isNaN(any); }
    if (t === "object") {
        if (any instanceof Date) { return isNaN(any.getTime()); }
        if (any instanceof Array) { return !any.length; }
        if (any instanceof Set || any instanceof Map) { return !any.size; }
        for (let i in any) { return false; }
        return true;
    }

    return false;
}

export const join = (separator, ...vals)=>{
    let s = "";
    for (let v of vals) {
        v = toString(v);
        if (!v) { continue; }
        s += (!s ? "" : separator) + v;
    }
    return s;
}

export const fail = (message, ...infos)=>{
    throw Major.fail(message).addInfos(infos);
}

export const warn = (message, ...infos)=>{
    throw Minor.fail(message).addInfos(infos);
}
