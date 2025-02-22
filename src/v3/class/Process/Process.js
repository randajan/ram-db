import { solids, virtuals } from "@randajan/props";
import { vault } from "../../../components/uni/consts";
import { toFail } from "./Fails";

const _priv = new WeakMap();

class Process {

    constructor(db, chop, context, parent) {

        const _p = {
            isOk:true,
            isDone:false,
            childs:!parent ? [] : undefined
        }

        solids(this, {
            db,
            chop,
            parent,
        }, false);

        solids(this, {
            context
        });

        virtuals(this, {
            isOk:_=>_p.isOk,
            isDone:_=>_p.isDone,
            fails:_=>!_p.fails ? undefined : [..._p.fails],
            childs:_=>!_p.childs.length ? undefined : [..._p.childs],
        });

        _priv.set(this, _p);

    }

}

export const processFail = (process, err, colName)=>{
    const _p = _priv.get(process);

    const fail = toFail(err, colName);

    if (fail.severity !== "minor") {
        if (colName) { throw fail; }
        _p.isOk = false;
        if (process.parent) { _priv.get(process.parent).isOk = false; }
    }

    if (!_p.fails) { _p.fails = [fail]; } else { _p.fails.push(fail); }

}

export const processRun = (chop, context, args, exe, rollback)=>{
    const db = chop.db;
    const _pdb = vault.get(db);
    const parent = _pdb.process

    const process = new Process(db, chop, context, parent);
    if (!parent) { _pdb.process = process; }
    else { _priv.get(parent).push(process); }

    const _p = _priv.get(process);
    _p.args = args;
    _p.rollback = rollback;
    
    try { exe(process, ...args); }
    catch(err) { processFail(process, err); }
    
    delete _pdb.process;
    _p.isDone = true;
    
    if (parent) { return process; }

    if (!_p.isOk) { rollback(process, ...args); }

    for (const child of _p.childs) {
        if (!_p.isOk) {
            const _pc = _priv.get(child);
            _pc.rollback(..._pc.args);
        }
        _priv.delete(child); //cleanup
    }

    _priv.delete(process);

    return process;
}