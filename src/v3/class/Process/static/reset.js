import { Process } from "../Process";
import { vault } from "../../../../components/uni/consts";
import { runEvent } from "../../Chop/static/eventHandlers";
import { throwMajor } from "../../../tools/traits/uni";

const reset = (process, chop, context)=>{

    const _p = vault.get(chop);
    if (!_p) { throwMajor("not a chop"); }
    
    const { bundle, init, handlers, childs } = _p;
    
    bundle.clear();
    
    _p.state = "init";
    init();

    _p.state = "ready";

    if (childs.size) { for (const child of childs) { $reset(child, context); } }
    runEvent(handlers, process);
    
}


//must be common function due to passing arguments
export const $reset = function (chop, context) {
    return Process.sandbox("reset", chop, context, arguments, reset);
}