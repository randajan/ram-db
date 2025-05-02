import { solid } from "@randajan/props";
import { isFce } from "../../../components/uni/formats";
import { fail } from "../../tools/traits/uni";


export class Effects extends Array {

    constructor(onError) {
        super();
        solid(this, "onError", isFce(onError) ? onError : console.warn);
    }

    remove(callback) {
        const x = this.indexOf(callback);
        if (x >= 0) { this.splice(x, 1); }
        return callback;
    }

    add(callback) {
        if (!isFce(callback)) { fail(`callback must be a function`); }
    
        this.unshift(callback);
    
        return _ =>this.remove(callback);
    }

    run(...args) {
        for (let i = this.length - 1; i >= 0; i--) {
            if (!this[i]) { return; }
            try { this[i](...args); }
            catch(err) { this.onError(err); }
        }
    }

    clear() {
        this.length = 0;
    }

}