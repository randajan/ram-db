

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

const _arg = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
const parseFceArgs = (args)=>{
    if (args) { args = args.trim(); }
    if (!args) { return []; }

    if (!args.startsWith("(")) { return _arg.test(args) ? [args] : undefined; }
    if (!args.endsWith(")")) { return; }

    args = args.slice(1, -1).trim(); //remove braces;
    if (!args) { return []; }

    let result = [];
    for (let a of args.split(",")) {
        a = a.trim();
        if (!_arg.test(a)) { return; }
        result.push(a);
    }

    return result;
}

export const parseFce = (val)=>{
    const t = typeof val;
    if (t === "function") { return val; }
    if (t !== "string") { return _=>val; }

    const frags = val.trim().split("=>");
    if (frags.length <= 1) { return _=>val; }

    const args = parseFceArgs(frags.shift());
    if (!args) { return _=>val; }

    let body = frags.join("=>").trim();
    if (!body.startsWith("{")) { body = "return "+body; }
    else if (!body.endsWith("}")) { return _=>val; }
    else { body = body.slice(1, -1).trim(); }

    return new Function(args, body);
}