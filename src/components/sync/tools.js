import { bite } from "../uni/tools";

export const reductor = (getList, callback, init) => {
    return row => {
        let val = init;
        for (const x of getList(row)) { val = callback(val, x); }
        return val;
    }
}

export const summary = (colList, colSum) => reductor(row => row(colList), (total, child) => total += child(colSum), 0);

export const reform = (selector, reformator) => {
    return row => reformator(row.eval(selector), row);
}

const remap = (arr, onItem, byKey = false) => {
    const rk = byKey ? {} : null;
    const rl = arr.map(item => onItem(item, rk));
    return rk || rl;
}

export const evaluate = (base, selector, opt, to, forceAlias) => {
    if (!base?.get) { return; }

    let res, alias, path;
    const { byKey, throwError } = opt;

    const isArray = Array.isArray(selector);
    if (!isArray) { [path, selector] = bite(selector, "."); }

    if (path) {
        [alias, path] = bite(path, ":");
        if (path !== "*") {
            const ref = base.get(path, throwError !== false);
            if (!ref?.eval) { return; }
            res = ref.eval(selector, opt);
        } else if (!base.getList) { return; } else {
            const arr = base.getList();
            return remap(arr, (item, rk) => {
                const r = item?.eval(selector, opt);
                return rk ? rk[item] = r : r;
            }, byKey);
        }
    } else if (!isArray && !selector.includes(",")) {
        [alias, selector] = bite(selector, ":");
        res = base.get(selector, throwError !== false);
    } else {
        const arr = isArray ? selector : selector.split(",");
        return remap(arr, (item, rk) => evaluate(base, item, opt, to || rk), byKey);
    }

    if (!byKey) { return res; }
    const key = forceAlias || alias || path || selector;
    if (!to) { return { [key]: res }; }
    if (to.hasOwnProperty(key)) { throw Error(`selector collision at ${key}, please use alias`); }
    to[key] = res;
    return to;
}