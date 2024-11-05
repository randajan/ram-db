import { fceNone, fcePass, fceTrue } from "../uni/consts";
import { parseFce, toBol, toDate, toNum, toStr } from "../uni/formats"

const getter = fcePass;
const setter = fcePass;
const isRequired = fceTrue;
const isReadonly = fceTrue;

export const meta = {
    "_ents": {
        "_ents": { },
        "_cols": { },
        "_types": { }
    },
    "_types": {
        "string": { setter:(v, c)=>toStr(v, "").substr(0, c.max), getter },
        "boolean": { setter:(v, c)=>toBol(v), getter },
        "number": { setter:(v, c)=>toNum(v, c.min, c.max, c.dec), getter },
        "datetime": { setter:(v, c)=>toDate(v, c.min, c.max), getter },
        "duration": { setter:(v, c)=>toNum(v, c.min > 0 ? c.min : 0, c.max, 0), getter },
        "function": { setter:(v, c)=>parseFce(v), getter },
        "object": { setter:(v, c)=>typeof v == "string" ? JSON.parse(v) : {}, getter },
        "ref": { setter, getter },
        "nref": { setter, getter },
        "any": { setter, getter }
    },
    "_cols": {
        "_ents-isMeta":{
            ent: "_ents", name: "isMeta", type: "boolean", isReadonly,
        },
        "_ents-cols":{
            ent: "_ents", name: "cols", type: "nref", ref:"_cols", parent:"_cols-ent", noCache:true,
        },

        //_types
        "_types-isMeta":{
            ent: "_types", name: "isMeta", type: "boolean", isReadonly
        },
        "_types-setter":{
            ent: "_types", name: "setter", type: "function", isReadonly, fallback:_=>setter
        },
        "_types-getter":{
            ent: "_types", name: "getter", type: "function", isReadonly, fallback:_=>getter
        },

        //_cols
        "_cols-isMeta":{
            ent: "_cols", name: "isMeta", type: "boolean", isReadonly
        },
        "_cols-ent":{
            ent: "_cols", name: "ent", type: "ref", ref: "_ents", isReadonly, isRequired
        },
        "_cols-name":{
            ent: "_cols", name: "name", type: "string", isReadonly, isRequired
        },
        "_cols-type":{
            ent: "_cols", name: "type", type: "ref", ref: "_types", fallback:_=>"any"
        },
        "_cols-ref":{
            ent: "_cols", name: "ref", type: "ref", ref: "_ents",
        },
        "_cols-parent":{
            ent: "_cols", name: "parent", type: "ref", ref: "_cols",
        },
        "_cols-isList":{
            ent: "_cols", name: "isList", type: "boolean",
        },
        "_cols-isReadonly":{
            ent: "_cols", name: "isReadonly", type: "function"
        },
        "_cols-isRequired":{
            ent: "_cols", name: "isRequired", type: "function"
        },
        "_cols-resetIf":{
            ent:"_cols", name:"resetIf", type:"function"
        },
        "_cols-init":{
            ent: "_cols", name: "init", type: "function", //Type should be defined as a function
        },
        "_cols-fallback":{
            ent: "_cols", name: "fallback", type: "function", //Type should be defined as a function
        },
        "_cols-validator":{
            ent: "_cols", name: "validator", type:"function"
        },
        "_cols-decimal":{
            ent: "_cols", name: "decimal", type: "number", decimal: 0, min: 0
        },
        "_cols-min":{
            ent: "_cols", name: "min", type: "number",
            //decimal:_=>r.decimal //decimal should be defined as a function
        },
        "_cols-max":{
            ent: "_cols", name: "max", type: "number",
            //decimal:_=>r.decimal, min:_=>r.min //decimal & min should be defined as a function
        },
        "_cols-formula":{
            ent: "_cols", name: "formula", type: "function",
        },
        "_cols-noCache":{
            ent: "_cols", name: "noCache", type: "boolean",
        },
        "_cols-omitChange":{
            ent: "_cols", name: "omitChange", type:"boolean"
        }
    }
}

export const metaEnt = ent=>{
    return {
        _ent:`_cols`, id:`${ent}-_ent`, ent, name: "_ent", type: "ref", ref:"_ents",
        isReadonly, isRequired, isMeta:true
    }
}

export const metaId = (ent, formula)=>{
    return {
        _ent:`_cols`, id:`${ent}-id`, ent, name: "id", type: "string",
        isReadonly, isRequired, isMeta:true, formula
    }   
}