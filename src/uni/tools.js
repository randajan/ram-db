
export const formatKey = (key, def)=>key != null ? String(key) : def;

export const functionOrNull = val=>val == null ? undefined : Function.jet.to(val);