export const asyncMap = async (list, byIndex, callback, sort)=>{
    const sorted = sort ? list.sort(sort) : list;
    const stop = val => { stop.active = true; return val; }
    const result = byIndex ? {} : [];
    let count = 0;

    for (let i in sorted) {
        if (stop.active) { break; }
        const child = sorted[i];
        const r = await callback(child, i + 1, count, stop);
        if (r === undefined) { continue; }
        if (byIndex) { result[await child.key] = r; }
        else { result.push(r); }
        count++;
    }

    return result;
}