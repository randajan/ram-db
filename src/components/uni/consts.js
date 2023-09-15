import jet from "@randajan/jet-core";

const { solid } = jet.prop;

export const vault = jet.vault("RamDBVault");

export const eventsWhen = ["before", "after"];
export const eventsRows = [].concat(
    ...eventsWhen.map(w=>["set", "update", "remove"].map(c=>[w, c, w+String.jet.capitalize(c)]))
);

export const formatKey = (key, def)=>key != null ? String(key) : def;
export const numberPositive = n=>n == null ? 0 : Math.max(0, Number.jet.to(n));
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
    object:{val:v=>jet.json.from(v), raw:v=>jet.json.from(v)}
}

export const colTraits = {
    type: jet.enumFactory(Object.keys(colTo), {
        before:raw=>String.jet.simplify(String.jet.to(raw)), 
        after:(output, traits)=>output != null ? output : traits.ref ? "ref" : "string"
    }),
    isReadonly: functionOrNull,
    resetIf: functionOrNull,
    init: functionOrNull,
    formula: functionWithCache,
    ref: functionOrNull,
    display: numberPositive,
    separator: String.jet.to,
    scope: jet.enumFactory(["global", "db", "table", "self"], {
        before:raw=>String.jet.simplify(String.jet.to(raw)),
        after:output=>output != null ? output : "self"
    }),
    isVirtual: Boolean.jet.to,
    isTrusted: Boolean.jet.to,
    noNull: Boolean.jet.to,
    extra: Object.jet.to
};

//scope: global, db, table, self


const _sortBy = (colName, descending=false, list=[])=>{
    const _sb = (colName, descending)=>_sortBy(colName, descending, list);
    solid(_sb, "list", list);
    list.push([colName, Boolean.jet.to(descending)]);
    return _sb;
}

export const sortBy = (colName, descending=false)=>_sortBy(colName, descending);