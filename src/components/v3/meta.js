import { parseFce, toBol, toDate, toNum, toStr } from "../uni/formats"

export const meta = {
    "_ents": {
        "_ents": { },
        "_cols": { },
        "_types": { }
    },
    "_types": {
        "string": { to:(v, c)=>toStr(v, "").substr(0, c.max) },
        "boolean": { to:(v, c)=>toBol(v) },
        "number": { to:(v, c)=>toNum(v, c.min, c.max, c.dec) },
        "datetime": { to:(v, c)=>toDate(v, c.min, c.max) },
        "duration": { to:(v, c)=>toNum(v, c.min > 0 ? c.min : 0, c.max, 0) },
        "function": { to:(v, c)=>parseFce(v) },
        "object": { to:(v, c)=>typeof v == "string" ? JSON.parse(v) : {} },
        "ref": { },
        "any": { }
    },
    "_cols": {
        "_ents-isMeta":{
            ent: "_ents", name: "isMeta", type: "boolean",
            writable: 0, readable: 1,
        },

        //_types
        "_types-isMeta":{
            ent: "_types", name: "isMeta", type: "boolean",
            writable: 0, readable: 1,
        },
        "_types-to":{
            ent: "_types", name: "to", type: "function",
            writable: 0, readable: 1, fallback:_=>_
        },

        //_cols
        "_cols-isMeta":{
            ent: "_cols", name: "isMeta", type: "boolean",
            writable: 0, readable: 1,
        },
        "_cols-ent":{
            ent: "_cols", name: "ent", type: "ref", ref: "_ents",
            writable: 0, readable: 1, required: 1,
        },
        "_cols-name":{
            ent: "_cols", name: "name", type: "string",
            writable: 0, readable: 1, required: 1,
        },
        "_cols-type":{
            ent: "_cols", name: "type", type: "ref", ref: "_types",
            writable: 1, readable: 1, fallback:"any"
        },
        "_cols-ref":{
            ent: "_cols", name: "ref", type: "ref", ref: "_ents",
            writable: 1, readable: 1,
        },
        "_cols-isList":{
            ent: "_cols", name: "isList", type: "boolean",
            writable: 1, readable: 1,
        },
        "_cols-readable":{
            ent: "_cols", name: "readable", type: "number",
            writable: 1, readable: 1,
            min: 0
        },
        "_cols-writable":{
            ent: "_cols", name: "writable", type: "number",
            writable: 1, readable: 1,
            min: 0
        },
        "_cols-required":{
            ent: "_cols", name: "required", type: "number",
            writable: 1, readable: 1,
            min: 0
        },
        "_cols-initial":{
            ent: "_cols", name: "initial", type: "any", //Type should be defined as a function
            writable: 1, readable: 1,
        },
        "_cols-fallback":{
            ent: "_cols", name: "fallback", type: "any", //Type should be defined as a function
            writable: 1, readable: 1,
        },
        "_cols-decimal":{
            ent: "_cols", name: "decimal", type: "number",
            writable: 1, readable: 1,
            decimal: 0, min: 0
        },
        "_cols-min":{
            ent: "_cols", name: "min", type: "number",
            writable: 1, readable: 1,
            //decimal:_=>r.decimal //decimal should be defined as a function
        },
        "_cols-max":{
            ent: "_cols", name: "max", type: "number",
            writable: 1, readable: 1,
            //decimal:_=>r.decimal, min:_=>r.min //decimal & min should be defined as a function
        },
        "_cols-formula":{
            ent: "_cols", name: "formula", type: "function",
            writable: 1, readable: 1
        },
        "_cols-noCache":{
            ent: "_cols", name: "noCache", type: "boolean",
            writable: 1, readable: 1
        },
    }
}