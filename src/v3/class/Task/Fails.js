
export class Fail extends Error {
    constructor(severity, reason, cause) {
        super(undefined, { cause });
        this.name = this.constructor.name;
        this.reason = reason;
        this.severity = severity;
    }

    addMeta(key, value) {
        const meta = (this.meta || (this.meta = []));
        meta.unshift([key, value]);
        return this;
    }

    addMetas(keyValuePairs=[]) {
        for (let [key, value] of keyValuePairs) { this.addMeta(key, value); }
        return this;
    }

    get message() {
        let msg = `${this.reason}`;

        if (this.meta) {
            const metaStr = this.meta.map(([k, v]) => `${k} ${JSON.stringify(v)}`).join(", ");
            msg += ` ${metaStr}`;
        }

        if (this.cause?.message) {
            msg += ` | cause: ${this.cause.message}`;
        }

        return msg;
    }
}


export class Minor extends Fail {
    static fail(reason, cause) { return new Minor(reason, cause); }
    constructor(reason, cause) { super("minor", reason, cause); }
}

export class Major extends Fail {
    static fail(reason, cause) { return new Major(reason, cause); }
    constructor(reason, cause) { super("major", reason, cause); }
}

export class Critical extends Fail {
    static fail(reason, cause) { return new Critical(reason, cause); }
    constructor(reason, cause) { super("critical", reason, cause); }
}

export const toFail = (err, metas=[]) => {
    let fail;
    if (err instanceof Fail) { fail = err; }
    else if (err instanceof Error) { fail = Critical.fail(err.constructor.name, err); }
    else { fail = Critical.fail(err); }
    return fail.addMetas(metas);
};

