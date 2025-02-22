import { throwMajor } from "./uni";

export const toDate = (any, opt={})=>{
    let date = (any instanceof Date) ? any : new Date(any);
    let num = date.getTime();

    if (isNaN(num)) { throwMajor("not a date"); }

    const { min, max } = opt;
    if (min == null && max == null) { return date; }
    if (max != null) { num = Math.min(num, max); }
    if (min != null) { num = Math.max(num, min); }

    return new Date(num);
}