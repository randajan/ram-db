import { vault } from "../../../../components/uni/consts";
import { isFce } from "../../../../components/uni/formats";

const prepare = (chop, rec, inc, process, syncs, hands)=>{
    const { bundle, childs, handlers } = vault.get(chop);

    const sync = bundle.prepare(rec);
    if (!sync) { return; }

    syncs.push(sync);

    if (!process) { return; }

    if (childs.size) { for (const child of childs) { prepare(child, rec, inc, process, syncs); }}
    if (handlers.length) { hands.push(handlers); }

}

export const sync = (chop, rec, inc, process)=>{

    const syncs = [], hands = [];

    prepare(chop, rec, inc, process, syncs, hands);

    for (const sync of syncs) { sync(); }
    for (const hand of hands) { runEvent(hand, process); }
}

export const runEvent = (handlers, process)=>{
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