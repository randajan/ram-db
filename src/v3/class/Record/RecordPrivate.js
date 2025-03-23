import { solids } from "@randajan/props";
import { isMetaEnt } from "../../metaData/interface";
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

        this.meta = isMetaEnt(v._ent) ? v.meta : undefined; //TODO
        
        solids(this, {
            _db:vault.get(db),
            db,
            current: createRecord(this, true),
            before: createRecord(this, false)
        });

        recReg(this);
    }

    init(process) {
        const { state, values } = this;
        if (state !== "pending") { fail("record is not pending"); }
        Turn.attach(process, this, values, true);
        this.state = "init";
        return this;
    }

    ready() {
        const { state, turn } = this;
        if (state !== "init") { fail("record is not init"); }
        this.values = turn.execute();
        this.turn.detach();
        this.state = "ready";
        return this;
    }

    //TODO update must be refactored
    update(process, values, isSet=false) {
        if (this.state !== "ready") { fail("record is not ready"); }

        this.values = Turn.attach(process, this, values, isSet).execute();
        
        if (this.turn.isChange) {
            _colSet(this);
            _chopSyncIn(this.db, process, this.current);
        }

        this.turn.detach();
    }

    remove(process, force=false) {
        const { meta, current } = this;

        if (!force && meta) { fail("is meta"); }
        
        this.state = "removed";
        _chopSyncOut(this.db, process, current);
        recUnreg(this);
    }

    export() {
        const { db } = this;
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
        if (!_col) { return value; }

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