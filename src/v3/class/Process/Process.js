import { solids, virtuals } from "@randajan/props";
import { vault } from "../../../components/uni/consts";
import { toFail } from "./Fails";
import { Effects } from "../Effects/Effects";

const _priv = new WeakMap();

/*TODO BETTER ERROR HANDLING*/

class Process {

    constructor(chopOrigin, context, rollback, parent, isBatch=false) {

        const _p = {
            isOk:true,
            isDone:false,
            chopOrigin,
            effects:!parent ? new Effects() : undefined,
            childs:!parent ? [] : undefined,
            rollback
        }

        solids(this, {
            parent,
            effect:parent?.effect || (cb=>_p.effects.add(cb)),
        }, false);

        solids(this, {
            context,
            isBatch
        });

        virtuals(this, {
            isOk:_=>_p.isOk,
            isDone:_=>_p.isDone,
            fails:_=>!_p.fails ? undefined : [..._p.fails],
            childs:_=>!_p.childs ? undefined : [..._p.childs],
        });

        _priv.set(this, _p);

    }

}

export const _processFail = (process, err, colName)=>{
    const _p = _priv.get(process);

    const fail = toFail(err, colName);

    if (fail.severity === "minor") { console.warn(fail); }
    else {
        console.error(fail);
        if (colName) { throw fail; }
        _p.isOk = false;
        if (process.parent) { _priv.get(process.parent).isOk = false; }
    }

    if (!_p.fails) { _p.fails = [fail]; } else { _p.fails.push(fail); }

}

export const _processWrapper = (roll, rollback, isBatch=false)=>{
    return (chopOrigin, args, context)=>{

        const _pdb = vault.get(chopOrigin.db);
        const parent = _pdb.process;
    
        const process = new Process(chopOrigin, context, rollback, parent, isBatch);
        if (!parent) { _pdb.process = process; }
        else { _priv.get(parent).childs.push(process); }
    
        const _p = _priv.get(process);
        
        try { roll(chopOrigin, process, ...args); }
        catch(err) { _processFail(process, err); }
        
        _p.isDone = true;
        
        if (parent) { return process; }

        //end of the process / cleanUp

        delete _pdb.process;

        for (let i=_p.childs.length-1; i>=0; i--) {
            const child = _p.childs[i];
            if (!_p.isOk) {
                const _pc = _priv.get(child);
                _pc.rollback(_pc.chopOrigin, child);
            }
            _priv.delete(child); //cleanup
        }

        if (_p.isOk) { _p.effects.run(); }
        else { _p.rollback(chopOrigin, process); }
    
        _priv.delete(process); //cleanup
    
        return process;
    }
}