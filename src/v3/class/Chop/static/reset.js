import { vault } from "../../../../components/uni/consts";
import { _processWrapper } from "../../Process/Process";

const roll = (chop, process)=>{
    const _p = vault.get(chop);
    const { byRec, byGroup, init, fits, effects, childs } = _p;
    
    byRec.clear();
    byGroup.clear();
    
    _p.state = "init";
    init(chop, process);

    _p.state = "ready";

    //_chopRunFits(process, fits, !childs.size ? null : _=>{ for (const child of childs) { child.reset(process.context); } });
    
    //_chopRunEffects(process, effects);
    
}

//TODO this can possible result in situation where parents are pending and childs are ready
const rollback = (chop, process)=>{
    const _p = vault.get(chop);

    _p.byRec.clear();
    _p.byGroup.clear();
    _p.state = "pending";
}

export const _chopReset = _processWrapper(roll, rollback, true);