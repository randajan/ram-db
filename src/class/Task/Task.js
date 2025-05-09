import { virtuals } from "@randajan/props";
import { Effects } from "../Effects/Effects";
import { toFail } from "../Fails/Fails";
import { vault } from "../../tools/consts";


export class Task {

    constructor(db, context, roll, rollback) {
        this.db = db;
        const _db = this._db = vault.get(db);
        const parent = this.parent = _db.task;

        if (parent) {
            parent.subs.push(this);
        } else {
            _db.task = this;
            this.subs = [];
            this.effects = new Effects();
        }

        this.isDone = false;
        this.isOk = true;
        this.context = context;
        this.roll = roll;
        this.rollback = rollback;
        this.echo = {};

        virtuals(this.echo, {
            isOk:_=>this.isOk,
            isDone:_=>this.isDone,
            error:_=>this.error,
            warnings:_=>!this.warnings ? undefined : [...this.warnings],
            subs:_=>!this.subs ? undefined : this.subs.map(c=>c.echo),
            context:_=>this.context,
            record:_=>this.record,
            changes:_=>!this.changes ? undefined : new Set(this.changes),
        });
    }

    assign(obj) { Object.assign(this, obj); return this; }
    unsign(...props) {
        for (const prop of props) { delete this[prop]; }
    }

    effect(callback) {
        const { parent, effects } = this;
        if (effects) { return effects.add(callback); }
        return parent.effect(callback);     
    }

    catch(err, nonMinorThrow=false, infos=[]) {
        const fail = toFail(err, infos);

        if (fail.severity === "minor") {
            (this.warnings || (this.warnings = [])).push(fail);
        } else {
            const { parent } = this;
            this.isOk = false;
            this.error = fail;
            if (parent) {
                parent.isOk = false;
                parent.error = fail;
            }
            if (nonMinorThrow) { throw fail; }
        }
        
        return fail;
    }

    catchAll(err, infos=[]) { return this.catch(err, false, infos); }
    catchMinor(err, infos=[]) { return this.catch(err, true, infos); }

    doRoll() {
        const { effects, roll, subs, result } = this;
        this.isOk = true;

        if (subs) {
            for (let i=subs.length-1; i>=0; i--) { subs[i].doRoll(); }
        }

        if (roll) { roll(this, result); }
        effects?.run();
    }

    doRollback() {
        const { subs, rollback, result } = this;
        this.isOk = false;

        if (subs) {
            for (let i=subs.length-1; i>=0; i--) { subs[i].doRollback(); }
        }
        
        if (rollback) { rollback(this, result); }
    }

    finish(throwError=false) {
        const { _db, parent, isOk, error, echo } = this;

        this.isDone = true;
        if (parent) { return echo; }

        delete _db.task;
        if (isOk) { this.doRoll(); }
        else { this.doRollback(); }

        if (throwError && !isOk) { throw error; }

        return echo;
    }

}


export const taskWrap = (exe, roll, rollback)=>{
    return (db, args, throwError=false, context=null)=>{

        const task = new Task(db, context, roll, rollback);
        
        try { task.result = exe(task, ...args); }
        catch(err) { task.catch(err); }

        return task.finish(throwError);
    }
}