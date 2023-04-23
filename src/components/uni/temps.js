export const nref = (tableName, colName)=>{
    return {
        isVirtual:true,
        isTrusted:true,
        ref:tableName,
        separator:"; ",
        formula:(row, cache)=>row.refs(tableName, colName, cache)
    }
};

export const timestamps = (alternative=false)=>({
    ["updated"+(alternative ? "" : "_at")]: { type: "datetime", formula: _ => new Date() },
    updater: {},
    ["created"+(alternative ? "" : "_at")]: { type: "datetime", init: _ => new Date(), isReadonly: true },
    creator: {}
});
