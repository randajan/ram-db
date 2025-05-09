
export class Fail extends Error {
    constructor(severity, reason, cause) {
        super(undefined, { cause });
        this.name = this.constructor.name;
        this.reason = reason;
        this.severity = severity;
    }

    addInfo(key, value) {
        const info = (this.info || (this.info = []));
        info.unshift([key, value]);
        return this;
    }

    addInfos(keyValuePairs=[]) {
        for (let [key, value] of keyValuePairs) { this.addInfo(key, value); }
        return this;
    }

    get message() {
        let msg = `${this.reason}`;

        if (this.info) {
            const metaStr = this.info.map(([k, v]) => `${k} ${JSON.stringify(v)}`).join(", ");
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

export const toFail = (err, infos=[]) => {
    let fail;
    if (err instanceof Fail) { fail = err; }
    else if (err instanceof Error) { fail = Critical.fail(err.constructor.name, err); }
    else { fail = Critical.fail(err); }
    return fail.addInfos(infos);
};

