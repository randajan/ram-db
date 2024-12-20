import { vault } from "../../../../components/uni/consts";
import { isFce } from "../../../../components/uni/formats";
import { afterAdd } from "./afterAdd";
import { afterRemove } from "./afterRemove";
import { afterUpdate } from "./afterUpdate";


export const runEvent = (handlers, childs, state, event, res, ctx)=>{
    if (state === "init") { return; }

    if (childs.size) {
        if (event === "add") {
            for (const child of childs) { afterAdd(child, res, ctx); }
        }
        else if (event === "remove") {
            for (const child of childs) { afterRemove(child, res, ctx); }
        }
        else if (event === "update") {
            for (const child of childs) { afterUpdate(child, res, ctx); }
        }
    }

    if (handlers?.length) {
        for (let i = handlers.length - 1; i >= 0; i--) {
            try { if (handlers[i]) { handlers[i](event, res, ctx); } }
            catch(err) { console.error(err); } //TODO better fail handler
        }
    }

    return true;
}

export const run = (handlers, process)=>{
    if (!handlers?.length) { return; }
    
    for (let i = handlers.length - 1; i >= 0; i--) {
        try { if (handlers[i]) { handlers[i](process); } }
        catch(err) { console.error(err); } //TODO better fail handler
    }

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