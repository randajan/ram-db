import { _chopGetRec } from "../Chop/static/sync";

const _recToJSON = (_rec)=>{
    const r = {};
    for (const _col of _rec.getCols()) {
        const { name, type:{ saver } } = _col.current;
        let value = _rec.getCol(name, true);
        if (isNull(value)) { continue; }
        r[name] = saver ? saver(value) : value;
    }
    return r;
}

export class Record {
    constructor(_rec, isCurrent) {

        const get = p => _rec.getCol(p, isCurrent);
        const id = () => get("id");
        const json = () => _recToJSON(_rec);

        const proxy = new Proxy(this, {
            get: (_, p) => {
                if (p === "toString") { return id; }
                if (p === "toJSON") { return json; }
                return get(p);
            },
            has: (_, p) => _rec.hasCol(p),
            set: (_, p, value) => _rec.db.update(proxy, { [p]: value }),
            deleteProperty: (_, p) => _rec.db.update(proxy, { [p]: null }),
            ownKeys: _ => [..._rec.getColsNames()],
            getOwnPropertyDescriptor: (_, p) => ({
                enumerable: true,
                configurable: true,
                value: get(p)
            })
        });

        return proxy;
    }
}
