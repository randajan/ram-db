import { fail } from "./uni";

const _nums = /-?(\d+(\s+\d+)*)*[,.]?\d+/;
const strToNum = str=>{
    const match = String(str).replace(/\u00A0/g, ' ').match(_nums);
    if (!match || !match[0]) { return NaN; }
    const res = Number(match[0].replaceAll(" ", "").replace(",", "."));
    return res;
}


export const toNumber = (any, opt={})=>{
    const t = typeof any;

    let num;
    if (t === "number") { num = any; }
    if (t === "string") { num = strToNum(any); }
    else { num = Number(any); }

    const { min, max, dec } = opt;

    if (isNaN(num)) { fail("not a number"); }
    if (max != null) { num = Math.min(num, max); }
    if (min != null) { num = Math.max(num, min); }

    if (dec == 0) { num = Math.round(num); }
    else if (dec > 0) {
        const pow = Math.pow(10, dec);
        num = Math.round(num*pow)/pow;
    }

    return num;
}