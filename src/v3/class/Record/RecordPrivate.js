import { solids } from "@randajan/props";
import { isMetaEnt } from "../../metaData/methods";
import { Turn } from "../Turn/Turn";
import { _colSet } from "./static/_columns";
import { _recGetPriv, _recIs, recReg, recUnreg } from "./Record";
import { createRecord } from "./Record";
import { fail, toId } from "../../tools/traits/uni";
import { _chopSyncIn, _chopSyncOut } from "../Chop/static/sync";
import { vault } from "../../../components/uni/consts";


export class RecordPrivate {

    constructor(db, values) {

        this.state = "pending"; //created, pending, ready, removed;
        const v = this.values = Object.assign({}, values);

        v._ent = toId(v._ent);
        if (v._ent === "_cols") { v.ent = toId(v.ent); }

        this.meta = isMetaEnt(v._ent) ? v.meta : 0;
        
        solids(this, {
            _db:vault.get(db),
            db,
            current: createRecord(this, true),
            before: createRecord(this, false)
        });

        recReg(this);
    }

    fail(reason, ...infos) {
        const { id, _ent } = this.values;
        return fail(reason, ["entity", _ent], ["record", id], ...infos);
    }

    init(task) {
        const { state, values } = this;
        if (state !== "pending") { this.fail("not pending"); }
        Turn.attach(task, this, values, true);
        this.state = "init";
        return this;
    }

    ready() {
        const { db, state, current, turn, task } = this;
        if (state !== "init") { this.fail("not init"); }

        turn.execute();
        this.state = "ready";
        _chopSyncIn(db, current, task);

        return this;
    }

    update(task, values, isSet=false) {
        const { state, db, current } = this;
        if (state !== "ready") { this.fail("not ready"); }

        Turn.attach(task, this, values, isSet).execute();
        _chopSyncIn(db, current, task);

        return this;
    }

    export() {
        const r = {};
        for (const _col of this.getCols()) {
            const { name, type:{ saver } } = _col.current;
            let value = this.getCol(name, true);
            if (value == null) { continue; }
            r[name] = saver ? saver(value) : value;
        }
        return r;
    }

    getColsNames() { return this._db.colsByEnt.keys(this.values._ent); }
    getCols() { return this._db.colsByEnt.values(this.values._ent); }

    getCol(colName, isCurrent=true) {
        const { _db, turn, current, values, state } = this;
        const value = values[colName];

        const _col = _db.colsByEnt.get(values._ent, colName);
        if (!_col) { return state === "ready" ? undefined : value; }

        const t = _col.traits;

        if (!isCurrent) { return t.getter(value); }

        const { isVirtual } = (_col === this) ? values : _col.current;
    
        if (!isVirtual) { return t.getter(turn ? turn.pull(_col) : value); }

        return t.getter(t.setter(current, values, value, state === "ready" ? before : undefined)); 

    }

    hasCol(colName) {
        const { _db, values } = this;
        return _db.colsByEnt.has(values._ent, colName);
    }

}