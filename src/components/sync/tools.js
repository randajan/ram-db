import jet from "@randajan/jet-core";
import { breachSelector } from "../uni/tools";

export const reductor = (getList, callback, init) => {
    return row => {
        let val = init;
        for (const x of getList(row)) { val = callback(val, x); }
        return val;
    }
}

export const summary = (colList, colSum) => reductor(row => row(colList), (total, child) => total += child(colSum), 0);

export const remap = (arr, onItem, byKey = false) => {
    const rk = byKey ? {} : null;
    const rl = arr.map(item => onItem(item, rk));
    return rk || rl;
}



export const evaluate = (base, selector, opt, to, forceAlias)=>{
    if (!base?.get) { return; }

    const { byKey, throwError } = opt;

    return breachSelector(selector, 
        (alias, path, selector)=>{
            let res;
            if (!path) { res = base.get(selector, throwError !== false); }
            else if (path !== "*") {
                const ref = base.get(path, throwError !== false);
                if (!ref?.eval) { return; }
                res = ref.eval(selector, opt);
            } else {
                if (!base.getList) { return; }
                const arr = base.getList();
                return remap(arr, (item, rk) => {
                    const r = item?.eval(selector, opt);
                    return rk ? rk[item] = r : r;
                }, byKey);
            }

            if (!byKey) { return res; }
            const key = forceAlias || alias || path || selector;
            if (!to) { return { [key]: res }; }
            if (to.hasOwnProperty(key)) { throw Error(`selector collision at ${key}, please use alias`); }
            to[key] = res;
            return to;
        },
        arr=>remap(arr, (item, rk) => evaluate(base, item, opt, to || rk), byKey)
    );

}