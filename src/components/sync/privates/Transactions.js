import jet from "@randajan/jet-core";

export class Transactions {

    constructor(onError) {
        this.ticks = 0;
        this.state = "ready";
        this.queue = [];
        this.onError = jet.isRunnable(onError) ? onError : ()=>{};
        //this.last
        //this.error
    }

    execute(name, execution, opt={ stopOnError:false, throwError:true }) {
        const exe = last=>{
            try { last; } catch(e) {}

            if (this.queue[0] === exe) { return false; } //it was removed before it started
            else { this.queue.shift(); }

            //transaction before raised in error and it has stopOnError parametr active
            let isErr = this.state === "error";
            let err = this.error; 

            if (!isErr) { 
                this.state = name;
                try { execution(this.ticks++); } catch(e) { isErr = true; err = e; }
                this.state = (isErr || opt.stopOnError === false) ? "ready" : "error";
                if (this.state === "error") { this.onError(this.error = err); }
            }
            
            if (isErr && opt.throwError !== false) { throw err; }
            
            return !isErr;
        }

        return this.last = exe(this.last);
    }

    reset() {
        this.state = "ready";
        this.queue = [];
    }


}