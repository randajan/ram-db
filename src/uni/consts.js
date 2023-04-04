import jet from "@randajan/jet-core";
import { functionOrNull } from "./tools";

export const colsTraits = {
    isPrimary: "primary",
    isLabel: "label"
};

export const colTypize = {
    ref:String,
    string:String.jet.to,
    datetime:Date.jet.to,
    number:Number.jet.to,
    boolean:Boolean.jet.to,
}

export const colTraits = {
    type: jet.enumFactory(Object.keys(colTypize), {
        before:raw=>String.jet.to(raw).jet.simplify(), 
        after:(output, traits)=>output != null ? output : traits.ref ? "ref" : "string"
    }),
    isReadonly: functionOrNull,
    resetIf: functionOrNull,
    init: functionOrNull,
    formula: functionOrNull,
    ref: functionOrNull,
    separator: String.jet.to,
    isVirtual: Boolean.jet.to
};

