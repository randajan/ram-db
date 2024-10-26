import { vault } from "../../uni/consts";
import { isFce } from "../../uni/formats";
import { afterAdd } from "./afterAdd";
import { afterRemove } from "./afterRemove";
import { afterReset } from "./afterReset";
import { afterUpdate } from "./afterUpdate";


export const runEvent = (handlers, childs, state, event, rec, ctx)=>{

    if (childs.size && state === "ready") {
        if (event === "reset") {
            for (const child of childs) { afterReset(child, ctx); }
        }
        else if (event === "add") {
            for (const child of childs) { afterAdd(child, rec, ctx); }
        }
        else if (event === "remove") {
            for (const child of childs) { afterRemove(child, rec, ctx); }
        }
        else if (event === "update") {
            for (const child of childs) { afterUpdate(child, rec, ctx); }
        }
    }

    if (handlers?.length) {
        for (let i = handlers.length - 1; i >= 0; i--) {
            try { if (handlers[i]) { handlers[i](event, rec, ctx); } }
            catch(err) { console.error(err); }
        }
    }

    return true;
}

export const onEvent = (chop, callback, onlyOnce = false)=>{
    if (!isFce(callback)) { throw Error(chop.msg(`on(...) require callback`)); }
    const { handlers } = vault.get(chop);

    let remove;
    const cb = onlyOnce ? (...args) => { callback(...args); remove(); } : callback;

    handlers.unshift(cb);

    return remove = _ => {
        const x = handlers.indexOf(cb);
        if (x >= 0) { handlers.splice(x, 1); }
        return callback;
    }
}