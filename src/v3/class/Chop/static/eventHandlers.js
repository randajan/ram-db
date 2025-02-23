import { vault } from "../../../../components/uni/consts";
import { isFce } from "../../../../components/uni/formats";
import { throwMajor } from "../../../tools/traits/uni";

export const _chopRunEvent = (process, handlers, throwErrors=true)=>{
    for (let i = handlers.length - 1; i >= 0; i--) {
        if (!handlers[i]) { return; }
        try { handlers[i](process); }
        catch(err) {
            if (throwErrors) { throw err; }
            console.warn(err); //TODO better non important errors handler
        }
    }
}


export const _chopOnEvent = (chop, isBefore, callback)=>{
    if (!isFce(callback)) { throwMajor(`on(...) require function`); }
    const { befores, afters } = vault.get(chop);
    const handlers = isBefore ? befores : afters;

    handlers.unshift(callback);

    return _ => {
        const x = handlers.indexOf(callback);
        if (x >= 0) { handlers.splice(x, 1); }
        return callback;
    }
}