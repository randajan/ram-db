

export const toRefId = ref=>(typeof ref !== "string") ? ref?.id : ref;

export const isNull = v=>(v == null || (typeof v === "number" && isNaN(v)));

export const isFce = fce=>typeof fce === "function";
export const toFce = (fce, defReturn)=>isFce(fce) ? fce : ()=>defReturn;
export const wrapFce = (wrap, what)=>(...args)=>wrap(what(...args));

export const toStr = (any, def)=>isNull(any) ? def : String(any);
export const toArr = (any)=>any instanceof Array ? any : [any];

export const toNum = (val, min, max, dec)=>{
    val = Number(val);
    if (isNaN(val)) { return val; }
    if (!isNull(max)) { val = Math.min(val, max); }
    if (!isNull(min)) { val = Math.max(val, min); }
    if (dec == 0) { val = Math.round(val); }
    else if (dec > 0) {
        const pow = Math.pow(10, dec);
        val = Math.round(val*pow)/pow;
    }
    return val;
}

export const toDate = (val, min, max)=>{
    if (!(val instanceof Date)) { val = Date.parse(val); }
    if (isNull(min) && isNull(max)) { return val; }
    return new Date(toNum(x.getTime(), min, max));
}

export const reArray = (val, trait)=>{
    const res = [];
    if (isNull(val)) { return res; }
    if (!Array.isArray(val)) { res.push(trait(val)); return res; }

    for (const v of val) {
        const r = trait(v);
        if (!isNull(r)) { res.push(r); }
    }

    return res;
}