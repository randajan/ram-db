const _bols = /^(0|f|n|no|not|off|false)$/i;

export const toBoolean = (any)=>typeof any !== "string" ? !!any : !_bols.test(any);