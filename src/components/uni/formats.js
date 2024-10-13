

export const isFce = fce=>typeof fce === "function";
export const toFce = (fce, defReturn)=>isFce(fce) ? fce : ()=>defReturn;
export const wrapFce = (wrap, what)=>(...args)=>wrap(what(...args));

export const toStr = (any, def)=>any != null ? String(any) : def;
export const toArr = (any)=>any instanceof Array ? any : [any];

