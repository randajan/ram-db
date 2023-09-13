export const nref = (tableName, colName, filter)=>{
    return {
        isVirtual:true,
        isTrusted:true,
        ref:tableName,
        separator:"; ",
        formula:(row, cache)=>row.refs(tableName, colName, filter, cache)
    }
};

export const timestamps = (doerRef, doerFormula, alternative=false)=>({
    ["updated"+(alternative ? "" : "_at")]: { type: "datetime", formula: _ => new Date() },
    updater: { ref:doerRef, formula:doerFormula },
    ["created"+(alternative ? "" : "_at")]: { type: "datetime", init: _ => new Date(), isReadonly: true },
    creator: { ref:doerRef, init:doerFormula, isReadonly:true }
});

export const reform = (selector, reformator)=>{
    return async row=>reformator(await row.select(selector), row);
}