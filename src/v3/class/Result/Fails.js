import { solid, solids } from "@randajan/props";

class Fail {

    constructor(severity, reason, details) {
        solids(this, { severity, reason, details });
    }

    setEnt(entId) {
        solid(this, "ent", entId);
        return this;
    }

    setCol(colId) {
        solid(this, "col", colId);
        return this;
    }

    setRow(rowId) {
        solid(this, "row", rowId);
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

    static fail(reason, details) { return new Critical(reason, details); }

    constructor(reason, details) {
        super("critical", reason, details);
    }
}

export const toFail = err=>{
    if (err instanceof Fail) { return err; }
    if (err instanceof Error) { return Critical.fail(err.message, err.stack); }
    return Critical.fail("Unknown error", err);
}