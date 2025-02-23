import { solids, virtuals } from "@randajan/props";
import { vault } from "../../../components/uni/consts";
import { toFail } from "./Fails";

const _priv = new WeakMap();

class Process {

    constructor(db, chop, context, rollback, parent, isBatch=false) {

        const _p = {
            isOk:true,
            isDone:false,
            childs:!parent ? [] : undefined,
            rollback
        }

        solids(this, {
            db,
            chop,
            parent,
        }, false);

        solids(this, {
            context,
            isBatch
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

export const _processFail = (process, err, colName)=>{
    const _p = _priv.get(process);

    const fail = toFail(err, colName);

    if (fail.severity !== "minor") {
        if (colName) { throw fail; }
        _p.isOk = false;
        if (process.parent) { _priv.get(process.parent).isOk = false; }
    }

    if (!_p.fails) { _p.fails = [fail]; } else { _p.fails.push(fail); }

}

export const _processFactory = (exe, rollback, isBatch=false)=>{
    return (chop, args, context)=>{
        const db = chop.db;
        const _pdb = vault.get(db);
        const parent = _pdb.process;
    
        const process = new Process(db, chop, context, rollback, parent, isBatch);
        if (!parent) { _pdb.process = process; }
        else { _priv.get(parent).childs.push(process); }
    
        const _p = _priv.get(process);
        
        try { exe(process, ...args); }
        catch(err) { _processFail(process, err); }
        
        delete _pdb.process;
        _p.isDone = true;
        
        if (parent) { return process; }
    
        for (let i=_p.childs.length-1; i>=0; i--) {
            const child = _p.childs[i];
            if (!_p.isOk) { _priv.get(child).rollback(child); }
            _priv.delete(child); //cleanup
        }

        if (!_p.isOk) { rollback(process); }
    
        _priv.delete(process);
    
        return process;
    }
}