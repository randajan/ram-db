import jet from "@randajan/jet-core";


export default class Bundle {

    constructor(createChildren, onChange) {

        const enumerable = true;
        Object.defineProperties(this, {
            index:{ enumerable, value:{}},
            list:{ enumerable, value:[] },
            count:{ enumerable, get:_=>this.list.length },
            _createChildren:{ value:createChildren },
            _onChange:{ value:onChange}
        });

    }

    formatKey(key, action="format") {
        key = String.jet.to(key);
        if (key) { return key; }
        throw new Error(`${action} failed - missing key`);
    }

    exist(key) {
        return this.index[String.jet.to(key)] != null;
    }

    get(key) {
        return this.index[String.jet.to(key)];
    }

    remove(key, ...args) {
        key = this.formatKey(key, "remove");
        const child = this.index[key];
        const x = this.list.indexOf(child);
        if (x >=0) { throw new Error(`remove '${key}' failed - not found`); }
        this.list.splice(x, 1);
        delete this.index[key];
        this._onChange(this, "remove", key, ...args);
    }
    
    set(key, ...args) {
        key = this.formatKey(key, "set");
        if (this.index[key] != null) { throw new Error(`set '${key}' failed - duplicate`); }
        const child = this._createChildren(key, ...args);
        this.list.push(this.index[key] = child);
        this._onChange(this, "set", key, ...args);
    }

    mapSync(byIndex, callback, sort) {
        const sorted = sort ? this.list.sort(sort) : this.list;
        const stop = _=>stop.active=true;
        const result = byIndex ? {} : [];
        let count = 0;

        for (let i in sorted) {
            if (stop.active) { break; }
            const child = sorted[i];
            const r = callback(child, i+1, count, stop);
            if (r === undefined) { continue; }
            if (byIndex) { result[child.key] = r; }
            else { result.push(r); }
            count ++;
        }

        return result;
    }

    async mapAsync(byIndex, callback, sort) {
        const sorted = sort ? this.list.sort(sort) : this.list;
        const stop = val=>{ stop.active=true; return val; }
        const result = byIndex ? {} : [];
        let count = 0;

        for (let i in sorted) {
            if (stop.active) { break; }
            const child = sorted[i];
            const r = await callback(child, i+1, count, stop);
            if (r === undefined) { continue; }
            if (byIndex) { result[child.key] = r; }
            else { result.push(r); }
            count ++;
        }

        return result;
    }

    findSync(checker, sort) {
        return this.mapSync(false, (child, i, count, stop)=>{
            if (checker(child, i, count, stop)) { return stop(child); }
        }, sort)[0];
    }

    async findAsync(checker, sort) {
        return this.mapSync(false, async (child, i, count, stop)=>{
            if (await checker(child, i, count, stop)) { return stop(child); }
        }, sort)[0];
    }

}