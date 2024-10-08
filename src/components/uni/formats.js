

export const isFce = fce=>typeof fce === "function";
export const toFce = (fce, defaultReturn)=>isFce(fce) ? fce : ()=>defaultReturn;
export const wrapFce = (wrap, what)=>(...args)=>wrap(what(...args));

export const toStr = (any, defaultString="")=>any != null ? String(any) : defaultString;

