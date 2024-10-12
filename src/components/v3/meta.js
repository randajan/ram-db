
export const meta = {
    "_ents": {
        "_ents": { },
        "_cols": { },
        "_types": { }
    },
    "_types": {
        "string": { },
        "boolean": { },
        "number": { },
        "datetime": { },
        "duration": { },
        "function": { },
        "object": { },
        "any": { },
        "ref": { }
    },
    "_cols": {
        "_ents-_ent":{
            ent: "_ents _ents", name: "_ent", type: "_types ref", ref:"_ents",
            writable: 0, readable: 1, required: 1,
        },
        "_ents-id":{
            ent: "_ents _ents", name: "id", type: "_types string",
            writable: 0, readable: 1, required: 1,
        },
        "_ents-isMeta":{
            ent: "_ents _ents", name: "isMeta", type: "_types boolean",
            writable: 0, readable: 1, required: 0,
        },

        //_types
        "_types-_ent":{
            ent: "_ents _types", name: "_ent", type: "_types ref", ref:"_ents",
            writable: 0, readable: 1, required: 1,
        },
        "_types-id":{
            ent: "_ents _types", name: "id", type: "_types string",
            writable: 0, readable: 1, required: 1,
        },
        "_types-isMeta":{
            ent: "_ents _types", name: "isMeta", type: "_types boolean",
            writable: 0, readable: 1, required: 0,
        },

        //_cols
        "_cols-_ent":{
            ent: "_ents _cols", name: "_ent", type: "_types ref", ref:"_ents",
            writable: 0, readable: 1, required: 1,
        },
        "_cols-id":{
            ent: "_ents _cols", name: "id", type: "_types string",
            writable: 0, readable: 1, required: 1,
        },
        "_cols-isMeta":{
            ent: "_ents _cols", name: "isMeta", type: "_types boolean",
            writable: 0, readable: 1, required: 0,
        },
        "_cols-ent":{
            ent: "_ents _cols", name: "ent", type: "_types ref", ref: "_ents",
            writable: 0, readable: 1, required: 1,
        },
        "_cols-name":{
            ent: "_ents _cols", name: "name", type: "_types string",
            writable: 0, readable: 1, required: 0,
        },
        "_cols-type":{
            ent: "_ents _cols", name: "type", type: "_types ref", ref: "_types",
            writable: 1, readable: 1, required: 0
        },
        "_cols-isList":{
            ent: "_ents _cols", name: "isList", type: "_types boolean",
            writable: 1, readable: 1, required: 0
        },
        "_cols-readable":{
            ent: "_ents _cols", name: "readable", type: "_types number",
            writable: 1, readable: 1, required: 0,
            min: 0
        },
        "_cols-writable":{
            ent: "_ents _cols", name: "writable", type: "_types number",
            writable: 1, readable: 1, required: 0,
            min: 0
        },
        "_cols-required":{
            ent: "_ents _cols", name: "required", type: "_types number",
            writable: 1, readable: 1, required: 0,
            min: 0
        },
        "_cols-initial":{
            ent: "_ents _cols", name: "initial", type: "_types any", //Type should be defined as a function
            writable: 1, readable: 1, required: 0
        },
        "_cols-fallback":{
            ent: "_ents _cols", name: "fallback", type: "_types any", //Type should be defined as a function
            writable: 1, readable: 1, required: 0,
        },
        "_cols-decimal":{
            ent: "_ents _cols", name: "decimal", type: "_types number",
            writable: 1, readable: 1, required: 0,
            decimal: 0, min: 0
        },
        "_cols-min":{
            ent: "_ents _cols", name: "min", type: "_types number",
            writable: 1, readable: 1, required: 0,
            //decimal:_=>r.decimal //decimal should be defined as a function
        },
        "_cols-max":{
            ent: "_ents _cols", name: "max", type: "_types number",
            writable: 1, readable: 1, required: 0,
            //decimal:_=>r.decimal, min:_=>r.min //decimal & min should be defined as a function
        }
    }
}