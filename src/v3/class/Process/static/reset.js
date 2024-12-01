import { $end, Process } from "../Process";
import { vault } from "../../../../components/uni/consts";
import { run } from "../../Chop/static/eventHandlers";
import { Major } from "../../Result/Fails";


export const $reset = (chop, context)=>{
    const _p = vault.get(chop);
    if (!_p) { return Process.failEnd(Major.fail("is not chop")); }

    const process = new Process("reset", context, chop);
    
    const { recsByGroupId, groupIdsByRec, init, handlers, childs } = _p;
    
    groupIdsByRec.clear();
    recsByGroupId.clear();
    
    _p.state = "init";
    init(process);

    _p.state = "reset";
    if (childs.size) { for (const child of childs) { $reset(child, context); } }
    run(handlers, process);

    _p.state = "ready";

    return $end(process);
}