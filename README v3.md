# RAMDB v3

Main point is to create Database That Contains Itself (DBTCI) model
Which, means that all metadata about database itself should be accessible and through same interface as anything else stored in database.

## Default structure

1. sys_tables = table where every row represents a table in database
2. sys_columns = table where every row represents a column of some table in database
3. sys_enums = table where every row represents a kind of enum
4. sys_values = table where every row represents a values used at enums

## Default columns

1. sys_tables
    - id(string)
    - isMeta(boolean)
2. sys_datatypes
    - id(string)
    - isMeta(boolean)
    - enum(ref:sys_enums)
    - type(ref:sys_values.datatypes)
    - value(_=>type)
2. sys_columns
    - id(string)
    - isMeta(boolean)
    - isPrimary(boolean)
    - table(ref: sys_tables)
    - name(string)
    - type(ref:sys_values.datatypes)
    - ref(ref:sys_tables)
    - separator(string)
    - readable(number) //0 hidden, 1 visible
    - writable(number) //0 readonly, 1 writable
    - required(number) //0 optional, 1 required
    - initial(_=>type)
    - fallback(_=>type)
    - decimal(number)
    - min(number)
    - max(number)


```js

const sys_tables = [
    { id:"sys_tables", isMeta:true },
    { id:"sys_columns", isMeta:true },
    { id:"sys_datatypes", isMeta:true }
];

const sys_datatypes = [
    {id:"string", isMeta:true },
    {id:"boolean", isMeta:true },
    {id:"number", isMeta:true },
    {id:"datetime", isMeta:true },
    {id:"duration", isMeta:true },
    {id:"function", isMeta:true },
    {id:"object", isMeta:true },
    {id:"any", isMeta:true },
    {id:"ref", isMeta:true }
];

const sys_columns = [

    //sys_tables
    {
        id:"sys_tables-id", isMeta:true, isPrimary:true, table:"sys_tables",
        name:"id", type:"string",
        writable:0, readable:1, required:1,
    },
    {
        id:"sys_tables-isMeta", isMeta:true, table:"sys_tables",
        name:"isMeta", type:"boolean",
        writable:1, readable:1, required:0,
    },

    //sys_datatypes
    {
        id:"sys_datatypes-id", isMeta:true, isPrimary:true, table:"sys_datatypes",
        name:"id", type:"string",
        writable:0, readable:1, required:1,
    },
    {
        id:"sys_datatypes-isMeta", isMeta:true, table:"sys_datatypes",
        name:"isMeta", type:"boolean",
        writable:1, readable:1, required:0,
    },

    //sys_columns
    {
        id:"sys_columns-id", isMeta:true, isPrimary:true, table:"sys_columns",
        name:"id", type:"string",
        writable:0, readable:1, required:1,
    },
    {
        id:"sys_columns-isMeta", isMeta:true, table:"sys_columns",
        name:"isMeta", type:"boolean",
        writable:1, readable:1, required:0,
    },
    {
        id:"sys_columns-isPrimary", isMeta:true, table:"sys_columns",
        name:"isPrimary", type:"boolean",
        writable:1, readable:1, required:0,
    },
    {
        id:"sys_columns-table", isMeta:true, table:"sys_columns",
        name:"isMeta", type:"ref", ref:"sys_tables",
        writable:1, readable:1, required:1,
    },
    {
        id:"sys_columns-name", isMeta:true, table:"sys_columns",
        name:"name", type:"string",
        writable:1, readable:1, required:0,
    },
    {
        id:"sys_columns-type", isMeta:true, table:"sys_columns",
        name:"type", type:"ref", ref:"sys_datatypes",
        writable:1, readable:1, required:0
    },
    {
        id:"sys_columns-separator", isMeta:true, table:"sys_columns",
        name:"separator", type:"string",
        writable:1, readable:1, required:0
    },
    {
        id:"sys_columns-readable", isMeta:true, table:"sys_columns",
        name:"readable", type:"number",
        writable:1, readable:1, required:0,
        min:0
    },
    {
        id:"sys_columns-writable", isMeta:true, table:"sys_columns",
        name:"writable", type:"number",
        writable:1, readable:1, required:0,
        min:0
    },
    {
        id:"sys_columns-required", isMeta:true, table:"sys_columns",
        name:"required", type:"number",
        writable:1, readable:1, required:0,
        min:0
    },
    {
        id:"sys_columns-initial", isMeta:true, table:"sys_columns",
        name:"initial", type:"any", //Type should be defined as a function
        writable:1, readable:1, required:0
    },
    {
        id:"sys_columns-fallback", isMeta:true, table:"sys_columns",
        name:"fallback", type:"any", //Type should be defined as a function
        writable:1, readable:1, required:0,
    },
    {
        id:"sys_columns-decimal", isMeta:true, table:"sys_columns",
        name:"decimal", type:"number",
        writable:1, readable:1, required:0,
        decimal:0, min:0
    },
    {
        id:"sys_columns-min", isMeta:true, table:"sys_columns",
        name:"min", type:"number",
        writable:1, readable:1, required:0,
        //decimal:_=>r.decimal //decimal should be defined as a function
    },
    {
        id:"sys_columns-max", isMeta:true, table:"sys_columns",
        name:"max", type:"number", separator:null,
        writable:1, readable:1, required:0,
        //decimal:_=>r.decimal, min:_=>r.min //decimal & min should be defined as a function
    },
];

```