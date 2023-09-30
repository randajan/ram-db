
export const nref = (tableName, colName, filter)=>{
    return {
        isVirtual:true,
        isTrusted:true,
        ref:tableName,
        separator:"; ",
        scope:tableName,
        formula:(row, cache)=>row.refs(tableName, colName, filter, cache)
    }
};

export const timestamps = (doerRef, doerFormula, alternative=false)=>({
    ["updated"+(alternative ? "" : "_at")]: { type: "datetime", formula: _ => new Date() },
    updater: { ref:doerRef, formula:doerFormula },
    ["created"+(alternative ? "" : "_at")]: { type: "datetime", init: _ => new Date(), isReadonly: true },
    creator: { ref:doerRef, init:doerFormula, isReadonly:true }
});

export const breachSelector = (selector, onOne, onMany)=>{
    let alias, path;

    const isArray = Array.isArray(selector);
    if (!isArray) { [path, selector] = String.jet.bite(selector, "."); }

    if (path) { [alias, path] = String.jet.bite(path, ":"); }
    else if (!isArray && !selector.includes(",")) { [alias, selector] = String.jet.bite(selector, ":"); }
    else { return onMany(isArray ? selector : selector.split(",")); }

    return onOne(alias, path, selector);
}