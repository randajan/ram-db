import { jet } from "@randajan/jet";
import { isNull } from "../formats";
import { fail } from "./uni";

export const toDate = (any, opt={})=>{
    const { min, max } = opt;

    const date = jet.dt.to(any);
    const nn = isNull(min), nm = isNull(max);
    let n = date.getTime();

    if (isNaN(n)) { fail("not a date"); }
    
    if (nn && nm) { return date; }

    if (!nm) { n = Math.min(n, max); }
    if (!nn) { n = Math.max(n, min); }

    return new Date(n);
}