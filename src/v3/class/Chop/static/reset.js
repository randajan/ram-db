import { vault } from "../../../../components/uni/consts";
import { solid } from "@randajan/props";
import { _processFactory } from "../../Process/Process";

const roll = (process)=>{
    solid(process, "action", "reset");

    const _p = vault.get(process.chop);
    const { byRec, byGroup, init, fits, effects, childs } = _p;
    
    byRec.clear();
    byGroup.clear();
    
    _p.state = "init";
    init(process);

    _p.state = "ready";

    //_chopRunFits(process, fits, !childs.size ? null : _=>{ for (const child of childs) { child.reset(process.context); } });
    
    //_chopRunEffects(process, effects);
    
}

//TODO this can possible result in situation where parents are pending and childs are ready
const rollback = (process)=>{
    const _p = vault.get(process.chop);
    if (!_p) { return; }

    _p.byRec.clear();
    _p.byGroup.clear();
    _p.state = "pending";
}

export const _chopReset = _processFactory(roll, rollback, true);