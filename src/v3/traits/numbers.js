import { Major } from "../class/Result/Fails";

const _nums = /-?(\d+(\s+\d+)*)*[,.]?\d+/;
const strToNum = str=>{
    const match = String(str).replace(/\u00A0/g, ' ').match(_nums);
    if (!match || !match[0]) { return NaN; }
    const res = Number(match[0].replaceAll(" ", "").replace(",", "."));
    return res;
}

export const saveNum = (num, col)=>{
    const t = typeof num;
    if (t === "string") { num = strToNum(num); }
    else if (t !== "number") { num = Number(num); }

    const { name, min, max, dec } = col;

    if (isNaN(num)) { throw Major.fail("not a number"); }
    if (max != null) { num = Math.min(num, max); }
    if (min != null) { num = Math.max(num, min); }

    if (dec == 0) { num = Math.round(num); }
    else if (dec > 0) {
        const pow = Math.pow(10, dec);
        num = Math.round(num*pow)/pow;
    }

    return num;
}