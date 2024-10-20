

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
    if (!(val instanceof Date)) { return new Date(toNum(val, min, max)); }
    if (min == null && max == null) { return val; }
    return new Date(toNum(x.getTime(), min, max));
}

const parseFceArgs = (args)=>{
    if (!args) { return; }
    if (args.startsWith("(")) { args = args.slice(1, -1); }
    return args.trim().split(/\s*,\s*/);
}
export const parseFce = (val)=>{
    const t = typeof val;
    if (t === "function") { return val; }
    if (t !== "string") { return ()=>{}; }

    const frags = val.split("=>");
    const args = parseFceArgs(frags.length > 1 ? frags.shift() : null);
    const body = "return "+frags.join("=>").trim();

    return !args ? new Function(body) : new Function(args, body);
}