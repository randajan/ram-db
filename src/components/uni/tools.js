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
    ref:{val:String, raw:v=>v.key || v},
    string:{val:String.jet.to, raw:_=>_},
    datetime:{val:Date.jet.to, raw:_=>_},
    number:{val:Number.jet.to, raw:_=>_},
    boolean:{val:Boolean.jet.to, raw:_=>_},
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
    isTrusted: Boolean.jet.to
};