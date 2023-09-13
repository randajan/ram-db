export const reductor = (getList, callback, init) => {
    return async row => {
        let val = init;
        for (const x of await getList(row)) { val = await callback(val, x); }
        return val;
    }
}

export const summary = (colList, colSum) => reductor(row => row(colList), async (total, child) => total += await child(colSum), 0);
