import jet from "@randajan/jet-core";
import { functionOrNull, numberPositive } from "../uni/consts";
import { breachSelector } from "../uni/tools";


const _scopes = ["global", "db", "table", "self"];
export const colsTraits = {
    isPrimary: "primary",
    isLabel: "label"
};

const functionWithCacheOrNull = (trait, col)=>{
    const selector = col.selector;
    const formula = functionOrNull(trait);
    if (!formula) { return selector ? row=>row.eval(selector) : null; }
    const cache = {};
    if (!selector) { return row=>formula(row, cache); }
    return async row=>formula(await row.eval(selector), row, cache);
}

export const colTo = {
    boolean:{val:Boolean.jet.to, raw:Boolean.jet.to},
    string:{val:String.jet.to, raw:String.jet.to},
    ref:{val:String, raw:v=>v.key || v},
    number:{val:v=>Number.jet.round(Number.jet.to(v), 2), raw:v=>Number.jet.round(Number.jet.to(v), 2)},
    datetime:{val:v=>v == null ? new Date() : new Date(v), raw:v=>v == null ? new Date() : new Date(v)},
    duration:{val:v=>Math.max(0, Math.round(Number.jet.to(v))), raw:v=>Math.max(0, Math.round(Number.jet.to(v)))},
    object:{val:v=>jet.json.from(v), raw:v=>jet.json.from(v)}
}

export const colTraits = {
    type: jet.enumFactory(Object.keys(colTo), {
        before:raw=>String.jet.simplify(String.jet.to(raw)), 
        after:(output, col)=>col.ref ? "ref" : output != null ? output : "string"
    }),
    isReadonly: functionOrNull,
    resetIf: functionOrNull,
    init: functionOrNull,
    selector:val=>(Array.isArray(val) || typeof val === "string") ? val : null,
    formula: functionWithCacheOrNull,
    ref: functionOrNull,
    display: (val, col)=>numberPositive(val) || col.db.displayDefault,
    separator: String.jet.to,
    isVirtual: Boolean.jet.to,
    isTrusted: Boolean.jet.to,
    noNull: Boolean.jet.to,
    extra: Object.jet.to,
    scope: (raw, col)=>{
        if (!col.isVirtual) { return _=>"self"; }
        if (typeof raw === "string") {
            raw = String.jet.simplify(String.jet.to(raw));
            return _scopes.includes(raw) ? _=>raw : _=>raw.split(",");
        }
        if (Array.isArray(raw)) { return _=>[...raw]; }
        if (!col.selector) { return _=>"self"; }

        let ready, pending;
        const tables = new Set(), scopes = new Set();

        return async _=>{
            if (pending) { await pending; }
            else if (!ready) {
                await (pending = collectDeps(col.cols, col.selector, tables, scopes));
                ready = true;
                pending = null;
            }
            if (scopes.has("global")) { return "global"; }
            if (scopes.has("db")) { return "db"; }
            if (!tables.size) { return "self"; }
    
            return [...tables];
        }

    }

};

const collectDeps = async (cols, selector, tables, scopes)=>{
    if (!cols) { return; }
    if (scopes.has("global") || scopes.has("db")) { return; }

    await breachSelector(selector, 
        async (alias, path, selector)=>{
            if (path === "*") { return; } //not allowed here
            const c = await cols(path || selector);
            const s = await c.scope();
            if (!Array.isArray(s)) { scopes.add(s); }
            else { for (const t of s) { tables.add(t); } }
            if (!c._ref) { return; }
            if (typeof c._ref !== "string") { scopes.add("db"); return; } //selector found morph ref it should fall back to scope=db
            if (!path) { return; }
            tables.add(c._ref);
            const tbl = await cols.db(c._ref);
            return collectDeps(tbl.cols, selector, tables, scopes);
        },
        async arr=>Promise.all(arr.map(selector=>collectDeps(cols, selector, tables, scopes)))
    );
}
