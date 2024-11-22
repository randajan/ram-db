import { solids } from "@randajan/props";
import { toRefId } from "../../../uni/formats";
import { afterRemove } from "../../effects/afterRemove";
import { afterUpdate } from "../../effects/afterUpdate";
import { metaToStr, isMetaEnt } from "../../metaData/interface";
import { Turn } from "./Turn";
import { getColsPriv, setCol } from "./_columns";
import { Major } from "../Exceptions";
import { regRec, unregRec } from "./_records";
import { Record } from "./Record";
import { Result } from "./Result";

export class RecordPrivate {

    constructor(db) {
        
        solids(this, {
            db,
            current: new Record(),
            before: new Record()
        });

        this.state = "pending"; //ready, removed;
        this.values = {};

        regRec(this);
    }

    msg(text, details={}) {
        return this.db.msg(text, {
            ent:this.values._ent,
            row:this.values.id,
            ...details
        });
    }

    colAdd(_col) {
        const { current, before, state } = this;

        const { name, formula, noCache } = _col.current;
        const t = _col.traits;
        const isVirtual = (formula && noCache);
    
        const prop = {
            enumerable:true, configurable:true,
            set:_=>{ throw new Error(this.msg("for update use db.update(...) interface", {column:name})) }
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
        const { db, values } = this;
        const cols = getColsPriv(db, values._ent);
        if (cols) { for (const _col of cols) { this.colAdd(_col); } }
        return this;
    }

    colsPrepare() {
        const { state, values } = this;
        if (state === "pending") { Turn.attach(this, values); }
        return this;
    }

    colsFinish() {
        const { state, turn } = this;
        if (state === "pending") {
            this.values = turn.execute();
            this.state = "ready";
        }

        return this.turn.detach();
    }

    valsLoad(values) {
        const { state, current, values:v } = this;
        if (state !== "pending") {  } //TODO

        Object.assign(v, values);

        v._ent = toRefId(v._ent);
        if (v._ent === "_cols") { v.ent = toRefId(v.ent); }
        this.meta = isMetaEnt(v._ent) ? v.meta = metaToStr(v.meta) : undefined;

        Object.assign(this.current, v);

        return this;
    }

    valsPush(values, ctx, isUpdate=false) {

        this.values = Turn.attach(this, values, isUpdate).execute();
        const result = this.turn.detach();

        if (this.turn.isReal) {
            setCol(this, ctx);
            afterUpdate(this.db, result, ctx);
        }

        return result;
    }

    remove(ctx, force=false) {
        const { db, meta } = this;
        const result = new Result(this);

        if (!force && meta) { result.addFail(Major.fail("is meta")); }
        else {
            this.state = "removed";
            afterRemove(db, result, ctx);
            unregRec(this);
        }
        
        return result;
    }

}