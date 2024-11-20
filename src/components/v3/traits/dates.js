import { Major } from "../class/Exceptions";

export const saveDate = (date, col)=>{
    if (!(date instanceof Date)) { date = new Date(date); }

    const { name, min, max } = col;
    let num = date.getTime();

    if (isNaN(num)) { throw Major.fail("not a date"); }
    if (min == null && max == null) { return date; }

    if (max != null) { num = Math.min(num, max); }
    if (min != null) { num = Math.max(num, min); }

    return new Date(num);
}