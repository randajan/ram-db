import { vault } from "../../../../components/uni/consts";
import { isFce } from "../../../../components/uni/formats";
import { throwMajor } from "../../../tools/traits/uni";

export const _chopOnEvent = (chop, isFit, callback)=>{
    
    if (!isFce(callback)) { throwMajor(`${isFit ? "fit" : "effect"}(...) require function`); }
    const { fits, effects } = vault.get(chop);
    const handlers = isFit ? fits : effects;

    handlers.unshift(callback);

    return _ => {
        const x = handlers.indexOf(callback);
        if (x >= 0) { handlers.splice(x, 1); }
        return callback;
    }
}

export const _chopRunFits = (process, fits, zenit)=>{
    let i = fits.length-1, res;
    const next = ()=>{
        const fit = fits[i--];
        if (fit) { fit(process, next); }
        else if (zenit) { res = zenit(); }
        return res;
    }
    return next();
}

export const _chopRunEffects = (process, effects)=>{
    for (let i = effects.length - 1; i >= 0; i--) {
        if (!effects[i]) { return; }
        try { effects[i](process); }
        catch(err) { console.warn(err); } //TODO better non important errors handler
    }
}
