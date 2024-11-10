import { fceNone, fcePass, fceTrue } from "../../uni/consts";
import { strToFce } from "../../uni/fnParser";
import { toBol, toDate, toNum, toRefId, toStr } from "../../uni/formats";


const getter = fcePass;
const setter = fcePass;
const isRequired = fceTrue;
const isReadonly = fceTrue;

export const metaStrong = Symbol("metaStrong");
export const metaWeak = Symbol("metaWeak");

export const metaToStr = v=>v === metaStrong ? "strong" : v === metaWeak ? "weak" : undefined;
export const isMetaEnt = v=>v === "_ents" || v === "_types" || v === "_cols";


export const metaData = {
    "_ents": {
        "_ents": { },
        "_cols": { },
        "_types": { }
    },
    "_types": {
        "meta":{ setter:metaToStr, getter },
        "string": { setter:(v, c)=>toStr(v, "").substr(0, c.max), getter },
        "boolean": { setter:(v, c)=>toBol(v), getter },
        "number": { setter:(v, c)=>toNum(v, c.min, c.max, c.dec), getter },
        "datetime": { setter:(v, c)=>toDate(v, c.min, c.max), getter },
        "duration": { setter:(v, c)=>toNum(v, c.min > 0 ? c.min : 0, c.max, 0), getter },
        "function": { setter:(v, c)=>strToFce(v), getter },
        "object": { setter:(v, c)=>typeof v == "string" ? JSON.parse(v) : {}, getter },
        "ref": { setter:toRefId, getter },
        "nref": { setter, getter },
        "any": { setter, getter }
    },
    "_cols": {
        "_ents-meta":{
            ent: "_ents", name: "meta", type: "meta", isReadonly,
        },
        "_ents-cols":{
            ent: "_ents", name: "cols", type: "nref", ref:"_cols", parent:"_cols-ent", noCache:true,
        },

        //_types
        "_types-meta":{
            ent: "_types", name: "meta", type: "meta", isReadonly
        },
        "_types-setter":{
            ent: "_types", name: "setter", type: "function", isReadonly, fallback:_=>setter
        },
        "_types-getter":{
            ent: "_types", name: "getter", type: "function", isReadonly, fallback:_=>getter
        },

        //_cols
        "_cols-meta":{
            ent: "_cols", name: "meta", type: "meta", isReadonly
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

export const metaDataDynamic = entId=>{
    return [
        {
            _ent:`_cols`, id:`${entId}-_ent`, ent:entId, name: "_ent", type: "ref", ref:"_ents",
            isReadonly, isRequired, meta:metaStrong
        },
        {
            _ent:`_cols`, id:`${entId}-id`, ent:entId, name: "id", type: "string",
            isReadonly, isRequired,
            meta:isMetaEnt(entId) ? metaStrong : metaWeak,
            formula:entId === "_cols" ? r=>r.ent.id + "-" + r.name : undefined
        }   
    ];
}