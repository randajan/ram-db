import { vault } from "../../uni/consts";
import { runEvent } from "./eventHandlers";

export const afterReset = (chop, ctx)=>{
    const _p = vault.get(chop);
    const { recsByGroupId, groupIdsByRec, init, handlers, childs, state } = _p;
    
    groupIdsByRec.clear();
    recsByGroupId.clear();
    
    _p.state = "init";
    init(chop, ctx);

    _p.state = "reset";
    runEvent(handlers, childs, _p.state, "reset", undefined, ctx);

    _p.state = "ready";
    return true;
}