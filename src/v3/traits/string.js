import { isNull } from "../../components/uni/formats"
import { Major } from "../class/Result/Fails";


export const saveStr = (str, col)=>{
    str = isNull(str) ? "" : String(str);
    if (str === "[object Object]") {
        try { str = JSON.stringify(str); }
        catch(e) { throw Major.fail("unparseable"); }
    }

    const { name, min, max } = col;
    if (min != null && str.length < min) { throw Major("too short", min); }
    if (max != null && str.length > max) { str = str.substr(0, max); }

    return str;
}