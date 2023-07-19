import jet from "@randajan/jet-core";

export const vault = jet.vault("RamDBVault");

export const formatKey = (key, def)=>key != null ? String(key) : def;
export const functionOrNull = val=>val == null ? undefined : Function.jet.to(val);
export const functionWithCache = trait=>{
    trait = functionOrNull(trait);
    if (!trait) { return; }
    const cache = {};
    return val=>trait(val, cache);
}

export const colsTraits = {
    isPrimary: "primary",
    isLabel: "label"
};

export const colTo = {
    boolean:{val:Boolean.jet.to, raw:Boolean.jet.to},
    string:{val:String.jet.to, raw:String.jet.to},
    ref:{val:String, raw:v=>v.key || v},
    number:{val:v=>Number.jet.round(Number.jet.to(v), 2), raw:v=>Number.jet.round(Number.jet.to(v), 2)},
    datetime:{val:v=>v == null ? new Date() : new Date(v), raw:v=>v == null ? new Date() : new Date(v)},
    duration:{val:v=>Math.max(0, Math.round(Number.jet.to(v))), raw:v=>Math.max(0, Math.round(Number.jet.to(v)))},
}

export const colTraits = {
    type: jet.enumFactory(Object.keys(colTo), {
        before:raw=>String.jet.to(raw).jet.simplify(), 
        after:(output, traits)=>output != null ? output : traits.ref ? "ref" : "string"
    }),
    isReadonly: functionOrNull,
    resetIf: functionOrNull,
    init: functionOrNull,
    formula: functionWithCache,
    ref: functionOrNull,
    separator: String.jet.to,
    isVirtual: Boolean.jet.to,
    isTrusted: Boolean.jet.to,
    noCache: Boolean.jet.to,
    noNull: Boolean.jet.to
};