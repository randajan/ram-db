import { fail } from "./uni";

export const toDate = (any, opt={})=>{
    let date = (any instanceof Date) ? any : new Date(any);
    let num = date.getTime();

    if (isNaN(num)) { fail("not a date"); }

    const { min, max } = opt;
    const nn = isNull(min), nm = isNull(max);
    
    if (nn && nm) { return date; }
    if (!nm) { num = Math.min(num, max); }
    if (!nn) { num = Math.max(num, min); }

    return new Date(num);
}