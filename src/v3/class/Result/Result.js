import { solid, solids, virtual, virtuals } from "@randajan/props";

const _results = new WeakMap();

export class Result {

    constructor(_rec, context) {
        const _p = {
            _rec,
            isOk:true,
            fails:[]
        }

        const { current } = _rec;
        solids(this, {
            current,
            context
        });

        virtuals(this, {
            isOk:_=>_p.isOk,
            fails:_=>[..._p.fails]
        });

        _results.set(this, _p);
    }

    addFail(fail, nonMinorThrow=false) {
        const _p = _results.get(this);

        const { values } = _p._rec;
        fail.setRow(values.id).setEnt(values._ent);

        if (fail.severity !== "minor") {
            if (nonMinorThrow) { throw fail; }
            else { _p.isOk = false; } 
        }

        _p.fails.push(fail);

        return true;
    }

}

export class ResultTurn extends Result {

    constructor(_rec) {
        super(_rec);

        const _p = _results.get(this);

        _p.changed = new Set();
        _p.isReal = _rec.state === "pending";

        virtuals(this, {
            isReal:_=>_p.isReal,
            changed:_=>new Set(_p.changed)
        });

    }

    addChange(change, isReal=false) {
        const _p = _results.get(this);

        _p.changed.add(change);
        if (isReal) { _p.isReal = true; }

        return true;
    }

}