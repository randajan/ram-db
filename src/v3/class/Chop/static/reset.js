import { vault } from "../../../../components/uni/consts";
import { runEvent } from "./eventHandlers";
import { throwMajor } from "../../../tools/traits/uni";
import { solid } from "@randajan/props";

export const chopReset = (process)=>{
    solid(process, "action", "reset");

    const _p = vault.get(process.chop);
    if (!_p) { throwMajor("not a chop"); }
    
    const { bundle, init, befores, afters, childs } = _p;
    
    bundle.clear();
    
    _p.state = "init";
    init(process);

    _p.state = "ready";

    if (childs.size) { for (const child of childs) { child.reset(process.context); } }
    runEvent(process, befores);
    runEvent(process, afters, false);
    
}

//TODO this can possible result in situation where parents are pending and childs are ready
export const chopResetRollback = (process)=>{
    const _p = vault.get(process.chop);
    if (!_p) { return; }

    _p.bundle.clear();
    _p.state = "pending";
}