import { solid, solids } from "@randajan/props";

class Fail extends Error {

    constructor(severity, reason, details, stack) {
        super(reason);
        solids(this, { severity, reason, details });

        if (stack) { solid(this, "stack", stack); }
    }

    setCol(column) {
        if (!this.column) { solid(this, "column", column); }
        return this;
    }

}


export class Minor extends Fail {

    static fail(reason, details) { return new Minor(reason, details); }

    constructor(reason, details) {
        super("minor", reason, details);
    }
}

export class Major extends Fail {

    static fail(reason, details) { return new Major(reason, details); }

    constructor(reason, details) {
        super("major", reason, details);
    }
}

export class Critical extends Fail {

    static fail(reason, stack) { return new Critical(reason, stack); }

    constructor(reason, stack) {
        super("critical", reason, undefined, stack);
    }
}

const _toFail = (err)=>{
    if (err instanceof Fail) { return err; }
    if (err instanceof Error) { return Critical.fail(err.message, err.stack); }
    return Critical.fail("Unknown error", err.stack);
}

export const toFail = (err, colName)=>_toFail(err).setCol(colName);