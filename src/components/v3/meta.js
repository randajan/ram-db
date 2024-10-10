

export const meta = [
    { _ent:"_ents", id: "_ents", isMeta: true },
    { _ent:"_ents", id: "_cols", isMeta: true },
    { _ent:"_ents", id: "_types", isMeta: true },

    { _ent:"_types", id: "string", isMeta: true },
    { _ent:"_types", id: "boolean", isMeta: true },
    { _ent:"_types", id: "number", isMeta: true },
    { _ent:"_types", id: "datetime", isMeta: true },
    { _ent:"_types", id: "duration", isMeta: true },
    { _ent:"_types", id: "function", isMeta: true },
    { _ent:"_types", id: "object", isMeta: true },
    { _ent:"_types", id: "any", isMeta: true },
    { _ent:"_types", id: "ref", isMeta: true },

    //_ents
    {
        _ent:"_cols",
        id: "_ents-_ent", isMeta: true, ent: "_ents",
        name: "_ent", type: "string",
        writable: 0, readable: 1, required: 1,
    },
    {
        _ent:"_cols",
        id: "_ents-id", isMeta: true, isPrimary: true, ent: "_ents",
        name: "id", type: "string",
        writable: 0, readable: 1, required: 1,
    },
    {
        _ent:"_cols",
        id: "_ents-isMeta", isMeta: true, ent: "_ents",
        name: "isMeta", type: "boolean",
        writable: 0, readable: 1, required: 0,
    },

    //_types
    {
        _ent:"_cols",
        id: "_types-_ent", isMeta: true, ent: "_ents",
        name: "_ent", type: "string",
        writable: 0, readable: 1, required: 1,
    },
    {
        _ent:"_cols",
        id: "_types-id", isMeta: true, isPrimary: true, ent: "_types",
        name: "id", type: "string",
        writable: 0, readable: 1, required: 1,
    },
    {
        _ent:"_cols",
        id: "_types-isMeta", isMeta: true, ent: "_types",
        name: "isMeta", type: "boolean",
        writable: 0, readable: 1, required: 0,
    },

    //_cols
    {
        _ent:"_cols",
        id: "_cols-_ent", isMeta: true, ent: "_ents",
        name: "_ent", type: "string",
        writable: 0, readable: 1, required: 1,
    },
    {
        _ent:"_cols",
        id: "_cols-id", isMeta: true, isPrimary: true, ent: "_cols",
        name: "id", type: "string",
        writable: 0, readable: 1, required: 1,
    },
    {
        _ent:"_cols",
        id: "_cols-isMeta", isMeta: true, ent: "_cols",
        name: "isMeta", type: "boolean",
        writable: 0, readable: 1, required: 0,
    },
    {
        _ent:"_cols",
        id: "_cols-isPrimary", isMeta: true, ent: "_cols",
        name: "isPrimary", type: "boolean",
        writable: 0, readable: 1, required: 0,
    },
    {
        _ent:"_cols",
        id: "_cols-ent", isMeta: true, ent: "_cols",
        name: "ent", type: "ref", ref: "_ents",
        writable: 0, readable: 1, required: 1,
    },
    {
        _ent:"_cols",
        id: "_cols-name", isMeta: true, ent: "_cols",
        name: "name", type: "string",
        writable: 0, readable: 1, required: 0,
    },
    {
        _ent:"_cols",
        id: "_cols-type", isMeta: true, ent: "_cols",
        name: "type", type: "ref", ref: "_types",
        writable: 1, readable: 1, required: 0
    },
    {
        _ent:"_cols",
        id: "_cols-separator", isMeta: true, ent: "_cols",
        name: "separator", type: "string",
        writable: 1, readable: 1, required: 0
    },
    {
        _ent:"_cols",
        id: "_cols-readable", isMeta: true, ent: "_cols",
        name: "readable", type: "number",
        writable: 1, readable: 1, required: 0,
        min: 0
    },
    {
        _ent:"_cols",
        id: "_cols-writable", isMeta: true, ent: "_cols",
        name: "writable", type: "number",
        writable: 1, readable: 1, required: 0,
        min: 0
    },
    {
        _ent:"_cols",
        id: "_cols-required", isMeta: true, ent: "_cols",
        name: "required", type: "number",
        writable: 1, readable: 1, required: 0,
        min: 0
    },
    {
        _ent:"_cols",
        id: "_cols-initial", isMeta: true, ent: "_cols",
        name: "initial", type: "any", //Type should be defined as a function
        writable: 1, readable: 1, required: 0
    },
    {
        _ent:"_cols",
        id: "_cols-fallback", isMeta: true, ent: "_cols",
        name: "fallback", type: "any", //Type should be defined as a function
        writable: 1, readable: 1, required: 0,
    },
    {
        _ent:"_cols",
        id: "_cols-decimal", isMeta: true, ent: "_cols",
        name: "decimal", type: "number",
        writable: 1, readable: 1, required: 0,
        decimal: 0, min: 0
    },
    {
        _ent:"_cols",
        id: "_cols-min", isMeta: true, ent: "_cols",
        name: "min", type: "number",
        writable: 1, readable: 1, required: 0,
        //decimal:_=>r.decimal //decimal should be defined as a function
    },
    {
        _ent:"_cols",
        id: "_cols-max", isMeta: true, ent: "_cols",
        name: "max", type: "number", separator: null,
        writable: 1, readable: 1, required: 0,
        //decimal:_=>r.decimal, min:_=>r.min //decimal & min should be defined as a function
    }
]