import { fcePass, fceTrue } from "../../uni/consts";
import { saveFn } from "../traits/functions";
import { join, toRefId } from "../../uni/formats";
import { saveRegExp } from "../traits/regexp";

import { saveBol } from "../traits/booleans";
import { saveNum } from "../traits/numbers";
import { saveStr } from "../traits/string";
import { saveObj } from "../traits/objects";
import { saveDate } from "../traits/dates";


const getter = fcePass;
const setter = fcePass;
const isRequired = fceTrue;
const isReadonly = fceTrue;

const metaSoft = Symbol("soft");
const metaHard = Symbol("hard");
const metaNumb = Symbol("numb");

export const metaToStr = v=>v===metaNumb ? "numb" : v === metaHard ? "hard" : v === metaSoft ? "soft" : undefined;
export const isMetaEnt = v=>v === "_ents" || v === "_types" || v === "_cols";


export const metaData = {
    "_ents": {
        "_ents": { meta:metaNumb },
        "_cols": { meta:metaNumb },
        "_types": { meta:metaNumb }
    },
    "_types": {
        "meta":{ meta:metaNumb, setter:metaToStr, getter },
        "string": { meta:metaNumb, setter:saveStr, getter },
        "boolean": { meta:metaNumb, setter:saveBol, getter },
        "number": { meta:metaNumb, setter:saveNum, getter },
        "datetime": { meta:metaNumb, setter:saveDate, getter },
        "duration": { meta:metaNumb, setter:saveNum, getter },
        "function": { meta:metaNumb, setter:saveFn, getter },
        "regexp": { meta:metaNumb, setter:saveRegExp, getter },
        "object": { meta:metaNumb, setter:saveObj, getter },
        "ref": { meta:metaNumb, setter:toRefId, getter },
        "nref": { meta:metaNumb, setter, getter },
    },
    "_cols": {
        "_ents-meta":{
            meta:metaNumb, ent: "_ents", name: "meta", type: "meta", isReadonly,
        },
        "_ents-cols":{
            meta:metaNumb, ent: "_ents", name: "cols", type: "ref", ref:"_cols", parent:"_cols-ent", isList:true, noCache:true,
            store:(c, db)=>{
                const { ref, parent:{ name, isList }} = c;
                return db.chop(ref.id, {
                    group:r=>r[name],
                    isMultiGroup:isList
                })
            },
            formula:(r, b, s)=>s.getList(r, false)
        },
        "_ents-size":{
            meta:metaNumb, ent: "_ents", name: "size", type: "number", noCache:true,
            store:(c, db)=>db,
            formula:(r, b, s)=>s.getSize(r.id, false)
        },
        //_types
        "_types-meta":{
            meta:metaNumb, ent: "_types", name: "meta", type: "meta", isReadonly
        },
        "_types-setter":{
            meta:metaNumb, ent: "_types", name: "setter", type: "function", isReadonly, fallback:_=>setter
        },
        "_types-getter":{
            meta:metaNumb, ent: "_types", name: "getter", type: "function", isReadonly, fallback:_=>getter
        },

        //_cols
        "_cols-meta":{
            meta:metaNumb, ent: "_cols", name: "meta", type: "meta", isReadonly
        },
        "_cols-ent":{
            meta:metaNumb, ent: "_cols", name: "ent", type: "ref", ref: "_ents", isReadonly, isRequired
        },
        "_cols-name":{
            meta:metaNumb, ent: "_cols", name: "name", type: "string", isReadonly, isRequired
        },
        "_cols-type":{
            meta:metaNumb, ent: "_cols", name: "type", type: "ref", ref: "_types", fallback:_=>"string"
        },
        "_cols-ref":{
            meta:metaNumb, ent: "_cols", name: "ref", type: "ref", ref: "_ents",
        },
        "_cols-parent":{
            meta:metaNumb, ent: "_cols", name: "parent", type: "ref", ref: "_cols",
        },
        "_cols-store":{
            meta:metaNumb, ent: "_cols", name:"store", type:"function"
        },
        "_cols-isList":{
            meta:metaNumb, ent: "_cols", name: "isList", type: "boolean",
        },
        "_cols-isReadonly":{
            meta:metaNumb, ent: "_cols", name: "isReadonly", type: "function"
        },
        "_cols-isRequired":{
            meta:metaNumb, ent: "_cols", name: "isRequired", type: "function"
        },
        "_cols-resetIf":{
            meta:metaNumb, ent:"_cols", name:"resetIf", type:"function"
        },
        "_cols-init":{
            meta:metaHard, ent: "_cols", name: "init", type: "function", //Type should be defined as a function
        },
        "_cols-fallback":{
            meta:metaHard, ent: "_cols", name: "fallback", type: "function", //Type should be defined as a function
        },
        "_cols-validator":{
            meta:metaHard, ent: "_cols", name: "validator", type:"function"
        },
        "_cols-decimal":{
            meta:metaHard, ent: "_cols", name: "decimal", type: "number", decimal: 0, min: 0
        },
        "_cols-min":{
            meta:metaHard, ent: "_cols", name: "min", type: "number",
            //decimal:_=>r.decimal //decimal should be defined as a function
        },
        "_cols-max":{
            meta:metaHard, ent: "_cols", name: "max", type: "number",
            //decimal:_=>r.decimal, min:_=>r.min //decimal & min should be defined as a function
        },
        "_cols-formula":{
            meta:metaHard, ent: "_cols", name: "formula", type: "function",
        },
        "_cols-noCache":{
            meta:metaNumb, ent: "_cols", name: "noCache", type: "boolean",
        },
        "_cols-omitChange":{
            meta:metaNumb, ent: "_cols", name: "omitChange", type:"boolean"
        }
    }
}

export const metaDataDynamic = entId=>{
    return [
        {
            _ent:`_cols`, id:`${entId}-_ent`, ent:entId, name: "_ent", type: "ref", ref:"_ents",
            isReadonly, isRequired, meta:metaNumb
        },
        {
            _ent:`_cols`, id:`${entId}-id`, ent:entId, name: "id", type: "string",
            isReadonly, isRequired,
            meta:isMetaEnt(entId) ? metaNumb : metaSoft,
            formula:entId === "_cols" ? r=>join("-", r.ent?.id, r.name) : undefined
        }   
    ];
}