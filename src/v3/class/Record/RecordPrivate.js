import { solid, solids } from "@randajan/props";
import { isMetaEnt } from "../../metaData/interface";
import { Turn } from "../Turn/Turn";
import { getColsPriv, colSet } from "./static/_columns";
import { recReg, recUnreg } from "./static/_records";
import { Record } from "./Record";
import { throwMajor, toId } from "../../tools/traits/uni";
import { syncIn, syncOut } from "../Chop/static/eventHandlers";
import { Major } from "../Process/Fails";

export class RecordPrivate {

    constructor(db, values) {

        this.state = "pending"; //created, pending, ready, removed;
        const v = this.values = Object.assign({}, values);

        v._ent = toId(v._ent);
        if (v._ent === "_cols") { v.ent = toId(v.ent); }

        this.meta = isMetaEnt(v._ent) ? v.meta : undefined; //TODO
        
        solids(this, {
            db,
            current: new Record(v),
            before: new Record()
        });

        recReg(this);
    }

    colAdd(_col) {
        const { db, current, before, state } = this;

        const { name, formula, noCache } = _col.current;
        const t = _col.traits;
        const isVirtual = (formula && noCache);
    
        const prop = {
            enumerable:true, configurable:true,
            set:_=>{ throw Major.fail("For update use db.update(...) interface").setCol(name); }
        };

        if (isVirtual) { prop.get = _=>t.getter(t.setter(current, this.values, this.values[name], this.state === "ready" ? before : undefined), this.state === "ready"); }
        else { prop.get = _=>t.getter(this.turn ? this.turn.pull(_col) : this.values[name], this); }
        Object.defineProperty(current, name, prop);

        if (!isVirtual) { prop.get = _=>t.getter(this.values[name], this); }
        Object.defineProperty(before, name, prop);

        if (state === "ready") { t.setter(current, this.values, this.values[name]); }
    }

    colRem(name) {
        const { current, before } = this;
        delete this.values[name];
        delete current[name];
        delete before[name];
    }

    colsInit() {
        const { db, state, values } = this;
        if (state !== "pending") { throwMajor("record is not pending"); }
        const cols = getColsPriv(db, values._ent);
        if (cols) { for (const _col of cols) { this.colAdd(_col); } }
        return this;
    }

    init(process) {
        const { state, values } = this;
        if (state !== "pending") { throwMajor("record is not pending"); }
        Turn.attach(process, this, values, true);
        this.state = "init";
        return this;
    }

    ready() {
        const { state, turn } = this;
        if (state !== "init") { throwMajor("record is not init"); }
        this.values = turn.execute();
        this.turn.detach();
        this.state = "ready";
        return this;
    }

    update(process, values, force=false) {
        if (this.state !== "ready") { throwMajor("record is not ready"); }

        this.values = Turn.attach(process, this, values, force).execute();
        
        if (this.turn.isChange) {
            colSet(this);
            syncIn(process, this.current);
        }

        this.turn.detach();
    }

    remove(process, force=false) {
        const { db, meta, current } = this;

        if (!force && meta) { throwMajor("is meta"); }
        
        this.state = "removed";
        syncOut(db, current, process);
        recUnreg(this);

    }

}