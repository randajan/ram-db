import { _records } from "./records";

const noSetFactory = (db, recId, colName)=>_=>{
    throw Error(db.msg(`can't be set because column '${colName}' has defined formula`, recId));
}

export const setTrait = (_row, _col)=>{
    const { record:col, traits:{ getter, setter } } = _col;
    const { db, columns, record:row } = _row;
    const { name, formula, noCache } = col;
    const isVirtual = (formula && noCache);

    const prop = {enumerable:true};
    prop.set = (formula) ? noSetFactory(db, row.id, col.name) : v=>db.update(row, {[name]:v});

    if (isVirtual) { prop.get = _=>getter(setter(row)); } else {

        const pull = _row.pull[name] = _=>{
            const { push, current } = _row;
            const from = current[name];
            if (!push?.pending.has(name)) { return from; }
            push.pending.delete(name);
            const to = current[name] = setter(row, push.data[name]);
            if (to !== from) { push.changed.add(name); }
            return to;
        };
        
        prop.get = _=>getter(pull());
    }

    columns[name] = _col;

    Object.defineProperty(row, name, prop);
}

export const pushToRecord = (db, record, data)=>{
    const _p = _records.get(record);
    if (!_p || _p.db !== db) { throw db.msg("is not record", toRefId(record)); };

    const pending = new Set();
    const changed = new Set();

    for (let i in data) { if (_p.pull[i]) { pending.add(i); } }

    if (!pending.size) { return changed; }

    _p.push = { data, pending, changed };

    for (let i in _p.pull) { _p.pull[i](); }

    delete _p.push;

    return changed;
}