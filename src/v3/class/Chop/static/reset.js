import { vault } from "../../../../components/uni/consts";
import { _chopRunEffects } from "./eventHandlers";
import { solid } from "@randajan/props";
import { _processFactory } from "../../Process/Process";

const roll = (process)=>{
    solid(process, "action", "reset");

    const _p = vault.get(process.chop);
    const { bundle, init, fits, effects, childs } = _p;
    
    bundle.clear();
    
    _p.state = "init";
    init(process);

    _p.state = "ready";

    _chopRunFits(process, fits);
    if (childs.size) { for (const child of childs) { child.reset(process.context); } }
    
    _chopRunEffects(process, effects);
    
}

//TODO this can possible result in situation where parents are pending and childs are ready
const rollback = (process)=>{
    const _p = vault.get(process.chop);
    if (!_p) { return; }

    _p.bundle.clear();
    _p.state = "pending";
}

export const _chopReset = _processFactory(roll, rollback, true);