import { solids } from "@randajan/props";
import { toRefId } from "../../../uni/formats";
import { afterRemove } from "../../effects/afterRemove";
import { afterUpdate } from "../../effects/afterUpdate";
import { metaToStr, isMetaEnt } from "../../metaData/interface";
import { Push } from "./Push";
import { getColsPriv, remCol, setCol } from "./_columns";
import { PushMajor } from "../Exceptions";
import { regRec, unregRec } from "./_records";
import { Record } from "./Record";
import { remEnt } from "./_ents";

export class RecordPrivate {

    constructor(db) {
        
        solids(this, {
            db,
            push:new Push(this),
            current:new Record(),
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

        if (isVirtual) { prop.get = _=>t.getter(t.setter(current, this.values, this.values[name], this.state === "ready" ? before : undefined)); }
        else { prop.get = _=>t.getter(this.push.isPending ? this.push.pull(_col) : this.values[name]); }
        Object.defineProperty(current, name, prop);

        if (!isVirtual) { prop.get = _=>t.getter(this.values[name]); }
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
        const { state, push, values } = this;
        if (state === "pending") { push.prepare(values); }
        return this;
    }

    colsFinish() {
        const { state, push } = this;
        if (state === "pending") {
            this.values = push.execute();
            this.state = "ready";
        }
        return push.close();
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
        const { db, current, push } = this;

        push.prepare(values, isUpdate);
        this.values = push.execute();

        if (push.isChanged) {
            setCol(this, ctx);
            afterUpdate(db, current, ctx);
        }

        return push.close();
    }

    remove(ctx, force=false) {
        const { db, current, meta } = this;
        const exceptions = [];

        if (!force && meta) { exceptions.push(new PushMajor("is meta")); }
        else {
            this.state = "removed";
            afterRemove(db, current, ctx);
            unregRec(this);
        }
        
        return solids({}, {
            isDone:!exceptions.size,
            exceptions
        });
    }

}