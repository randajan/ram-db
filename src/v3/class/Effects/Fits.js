import { Effects } from "./Effects";


export class Fits extends Effects {

    run(process, zenit) {
        let i = this.length-1, res;
        const next = ()=>{
            const fit = this[i--];
            if (fit) { fit(process, next); }
            else if (zenit) { res = zenit(process); }
            return res;
        }
        return next();
    }
}