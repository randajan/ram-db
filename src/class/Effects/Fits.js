import { Effects } from "./Effects";


export class Fits extends Effects {

    run(zenit, ...args) {
        let i = this.length-1, res;
        const next = ()=>{
            const fit = this[i--];
            if (fit) { fit(next, ...args); }
            else if (zenit) { res = zenit(); }
            return res;
        }
        return next();
    }
}