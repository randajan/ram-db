import { solid, solids, virtual, virtuals } from "@randajan/props";
import { vault } from "../../../components/uni/consts";
import { Major } from "../Result/Fails";

const _priv = new WeakMap();

export const $end = (process)=>{
    const _p = _priv.get(process);
    _p.processes.pop();
    _p.isDone = true;
    return process;
}

export class Process {

    static failEnd(fail, action, context, chop, _rec) {
        const process = new Process(action, context, chop, _rec);
        return $end(process.fail(fail));
    }

    constructor(action, context, chop, _rec) {
        const db = chop ? chop.db : undefined;
        const processes = db ? vault.get(db).processes : undefined;

        const depth = (processes?.push(this)-1) || 0;
        const parent = !depth ? undefined : processes[depth-1];

        if (parent) { _priv.get(parent).childs.push(this); }

        const _p = {
            isOk:true,
            isDone:false,
            fails:[],
            childs:[],
            processes
        }

        solids(this, {
            db,
            chop,
            parent
        }, false);

        solids(this, {
            depth,
            action,
            context
        });

        virtuals(this, {
            isOk:_=>_p.isOk,
            isDone:_=>_p.isDone,
            fails:_=>[..._p.fails],
            childs:_=>[..._p.childs],
            record:_=>_rec?.current
        });

        _priv.set(this, _p);

    }

    fail(fail, nonMinorThrow=false) {
        const _p = _results.get(this);

        _p.fails.push(fail);

        if (fail.severity !== "minor") {
            if (nonMinorThrow) { throw fail; }
            else { _p.isOk = false; } 
        }

        return this;
    }

}