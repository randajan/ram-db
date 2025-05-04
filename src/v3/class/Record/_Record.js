import { Turn } from "../Turn/Turn";
import { _recGetPriv, _recIs, recReg, recUnreg } from "./Record";
import { createRecord } from "./Record";
import { fail, toId } from "../../tools/traits/uni";
import { _chopSyncIn, _chopSyncOut } from "../Chop/static/sync";
import { vault } from "../../tools/const";


export class _Record {

    constructor(db, values) {

        this.db = db;
        this._db = vault.get(db);

        this.meta = 0;
        this.state = "pending"; //created, pending, ready;
        
        const v = this.values = Object.assign({}, values);
        v._ent = toId(v._ent);
        
        this.current = createRecord(this, true);

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
        this.before = createRecord(this, false);
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

    getColsNames() { return this._db.colsByEnt.keys(this.values._ent); }
    getCols() { return this._db.colsByEnt.values(this.values._ent); }

    getCol(colName, isCurrent=true) {
        const { _db, values, state, turn } = this;

        const _col = _db.colsByEnt.get(values._ent, colName);
        //TODO - this line is here just because possible inconsistencies during loading
        if (!_col) { return state === "ready" ? undefined : values[colName]; }

        return _col.traits.getter(this, isCurrent ? undefined : turn);
    }

    hasCol(colName) {
        const { _db, values } = this;
        return _db.colsByEnt.has(values._ent, colName);
    }
    
    fit(next, event, task) {
        next();
    }

    roll() { this.turn?.detach(true); }
    rollback() { this.turn?.detach(false); }

    unreg() { recUnreg(this); }

}