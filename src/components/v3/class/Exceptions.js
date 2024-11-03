import { solid, solids } from "@randajan/props";




class Exception {
    constructor(severity, reason, details, column) {
        solids(this, { severity, column, reason, details });
    }
}

export class ColMinor extends Exception {
    constructor(column, reason, details) {
        super("minor", reason, details, column);
    }
}

export class ColMajor extends Exception {
    constructor(column, reason, details) {
        super("major", reason, details, column);
    }
}

export class PushMinor extends Exception {
    constructor(reason, details) {
        super("minor", reason, details);
    }
}

export class PushMajor extends Exception {
    constructor(reason, details) {
        super("major", reason, details);
    }
}