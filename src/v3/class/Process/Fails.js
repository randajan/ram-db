import { solid, solids } from "@randajan/props";

class Fail extends Error {

    constructor(severity, reason, details) {
        super(reason);
        solids(this, { severity, reason, details });
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

    static fail(reason, details) { return new Critical(reason, details); }

    constructor(reason, details) {
        super("critical", reason, details);
    }
}

const _toFail = (err)=>{
    if (err instanceof Fail) { return err; }
    if (err instanceof Error) { return Critical.fail(err.message, err.stack); }
    return Critical.fail("Unknown error", err);
}

export const toFail = (err, colName)=>solid(_toFail(err), "column", colName);