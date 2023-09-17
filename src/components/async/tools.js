import { bite } from "../uni/tools";

export const reductor = (getList, callback, init) => {
    return async row => {
        let val = init;
        for (const x of await getList(row)) { val = await callback(val, x); }
        return val;
    }
}

export const summary = (colList, colSum) => reductor(row => row(colList), async (total, child) => total += await child(colSum), 0);

export const reform = (selector, reformator) => {
    return async row => reformator(await row.eval(selector), row);
}

const remap = async (arr, onItem, byKey = false) => {
    const rk = byKey ? {} : null;
    const rl = await Promise.all(arr.map(item => onItem(item, rk)));
    return rk || rl;
}

export const evaluate = async (base, selector, opt, to, forceAlias) => {
    if (!base?.get) { return; }

    let res, alias, path;
    const { byKey, throwError } = opt;

    const isArray = Array.isArray(selector);
    if (!isArray) { [path, selector] = bite(selector, "."); }

    if (path) {
        [alias, path] = bite(path, ":");
        if (path !== "*") {
            const ref = await base.get(path, throwError !== false);
            if (!ref?.eval) { return; }
            res = await ref.eval(selector, opt);
        } else if (!base.getList) { return; } else {
            const arr = await base.getList();
            return remap(arr, async (item, rk) => {
                const r = await item?.eval(selector, opt);
                return rk ? rk[item] = r : r;
            }, byKey);
        }
    } else if (!isArray && !selector.includes(",")) {
        [alias, selector] = bite(selector, ":");
        res = await base.get(selector, throwError !== false);
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