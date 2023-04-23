export const reductor = (getList, callback, init) => {
    return row => {
        let val = init;
        for (const x of getList(row)) { val = callback(val, x); }
        return val;
    }
}

export const summary = (colList, colSum) => reductor(row => row(colList), (total, child) => total += child(colSum), 0);
