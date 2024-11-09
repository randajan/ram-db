

export const toRefId = ref=>(typeof ref !== "string") ? ref?.id : ref;

export const isFce = fce=>typeof fce === "function";
export const toFce = (fce, defReturn)=>isFce(fce) ? fce : ()=>defReturn;
export const wrapFce = (wrap, what)=>(...args)=>wrap(what(...args));

export const toStr = (any, def)=>any != null ? String(any) : def;
export const toArr = (any)=>any instanceof Array ? any : [any];

export const toNum = (val, min, max, dec)=>{
    val = Number(val);
    if (isNaN(val)) { return val; }
    if (max != null) { val = Math.min(val, max); }
    if (min != null) { val = Math.max(val, min); }
    if (dec == 0) { val = Math.round(val); }
    else if (dec > 0) {
        const pow = Math.pow(10, dec);
        val = Math.round(val*pow)/pow;
    }
    return val;
}

const _bols = /^(0|n|no|not|off|false)$/i;
export const toBol = val=>typeof val !== "string" ? !!val : !_bols.test(val);

export const toDate = (val, min, max)=>{
    if (!(val instanceof Date)) { val = Date.parse(val); }
    if (min == null && max == null) { return val; }
    return new Date(toNum(x.getTime(), min, max));
}