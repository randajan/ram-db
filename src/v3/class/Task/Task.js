import { solids, virtuals } from "@randajan/props";
import { Effects } from "../Effects/Effects";
import { toFail } from "./Fails";
import { vault } from "../../../components/uni/consts";


export class Task {

    static is(any) { return any instanceof Task; }
    static create(db) { return new Task(db); }

    constructor(parent) {

        if (!Task.is(parent)) {
            this.db = parent;
            this.subs = [];
            this.effects = new Effects();
        } else {
            this.db = parent.db;
            this.parent = parent;
            parent.subs.push(this);
        }

        this.isDone = false;
        this.isOk = true;

        this.echo = {};
        solids(this.echo, {
            db:this.db,
            parent:this.parent?.echo
        }, false);

        virtuals(this.echo, {
            isOk:_=>this.isOk,
            isDone:_=>this.isDone,
            fails:_=>!this.fails ? undefined : [...this.fails],
            subs:_=>!this.subs ? undefined : this.subs.map(c=>c.echo),
            context:_=>this.context,
            record:_=>this.record,
        });
    }

    sub() { return new Task(this); }

    setContext(context) { this.context = context; return this; }
    setRollback(rollback) { this.rollback = rollback; return this; }
    setRecord(record) { this.record = record; return this; }

    effect(callback) {
        const { parent, effects } = this;
        if (effects) { return effects.add(callback); }
        return parent.effect(callback);     
    }

    catch(err, nonMinorThrow=false, metas=[]) {
        const fail = toFail(err, metas);
        if (fail.severity !== "minor") {
            this.isOk = false;
            if (nonMinorThrow) { throw fail; }
            if (this.parent) { this.parent.isOk = false; }
        }
        (this.fails || (this.fails = [])).push(fail);
        return fail;
    }

    catchAll(err, metas=[]) { return this.catch(err, false, metas); }
    catchMinor(err, metas=[]) { return this.catch(err, true, metas); }

    finish() {
        const { isOk, effects, subs, rollback, echo } = this;

        if (isOk) { effects?.run(); return echo; }

        if (subs) {
            for (let i=this.subs.length-1; i>=0; i--) { subs[i].finish(); }
        }
            
        if (rollback) {
            rollback(this);
        }

        return echo;
    }

}


export const taskWrap = (roll, rollback)=>{
    return (db, args, context, throwError=false)=>{

        const _db = vault.get(db);
        const parent = _db.task;
    
        const task = parent ? parent.sub() : Task.create(db);
        task.setContext(context).setRollback(rollback);
        
        if (!parent) { _db.task = task; }
        
        try { roll(task, ...args); }
        catch(err) { task.catch(err, throwError); }

        task.isDone = true;
        if (parent) { return task.echo; }

        delete _db.task;
        return task.finish();
    }
}