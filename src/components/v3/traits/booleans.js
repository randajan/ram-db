const _bols = /^(0|n|no|not|off|false)$/i;

export const saveBol = (val, col)=>typeof val !== "string" ? !!val : !_bols.test(val);