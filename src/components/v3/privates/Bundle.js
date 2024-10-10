import { isFce, toArr, toFce, toStr, wrapFce } from "../../uni/formats";


export class Bundle {

    constructor(id, getGroups) {

        this.id = toStr(id);
        if (!this.id) { throw Error(this.msg("critical error - missing id")); }

        this.groupsByRecId = new Map(); // recId -> groups
        this.recsByGroupId = new Map(); // groupId -> recs

        this.handlers = {};
        this.getGroups = wrapFce(toArr, toFce(getGroups, [undefined]));
    }

    msg(text, recId, groupId) {
        recId = toStr(recId);
        let msg = this.id;
        if (groupId) { msg += ` group('${groupId}')`; }
        if (recId) { msg += ` rec('${recId}')`; }
        if (text) { msg += " " + text; }
        return msg.trim();
    }

    prepareRecs(groupId, autoCreate = false, throwError = true) {
        let recs = this.recsByGroupId.get(groupId);
        if (recs) { return recs; }
        if (autoCreate) { this.recsByGroupId.set(groupId, recs = new Map()); }
        else if (throwError) { throw Error(this.msg(`not found`, undefined, groupId)); }
        return recs;
    };

    validateRecId(recId, throwError = true, action = "validateRecId") {
        if (recId = toStr(recId)) { return recId; }
        if (throwError) { throw Error(this.msg(`${action}(...) failed - id undefined`)); }
    }

    on(event, callback, onlyOnce = false) {
        if (!isFce(callback)) { throw Error(this.msg(`on(...) require callback`)); }
        const { handlers } = this;
        const list = (handlers[event] || (handlers[event] = []));

        let remove;
        const cb = onlyOnce ? (...args) => { callback(...args); remove(); } : callback;

        list.unshift(cb);

        return remove = _ => {
            const x = list.indexOf(cb);
            if (x >= 0) { list.splice(x, 1); }
            return callback;
        }
    }

    run(event, args = []) {
        const handlers = this.handlers[event];
        if (!handlers?.length) { return true; }

        for (let i = handlers.length - 1; i >= 0; i--) {
            try { if (handlers[i]) { handlers[i](...args); } }
            catch(err) { console.error(err); }
        }

        return true;
    }

    reset() {
        this.groupsByRecId.clear();
        this.dataByGroupId.clear();
        return this.run("reset", []);
    }

    add(rec, throwError = true) {
        const recId = this.validateRecId(rec.id, throwError, "add");
        if (!recId) { return false; }

        const currents = this.groupsByRecId.get(recId);
        if (currents) {
            if (throwError) { throw Error(this.msg(`add(...) failed - duplicate`, recId)); }
            return false;
        }

        const valids = this.getGroups(rec);
        const results = new Set();
        for (const groupId of valids) {
            if (results.has(groupId)) { continue; }
            const recs = this.prepareRecs(groupId, true);
            recs.set(recId, rec);
            results.add(groupId);
        }

        this.groupsByRecId.set(recId, results);

        return this.run("add", [rec]);
    }

    remove(rec, throwError = true) {
        const recId = this.validateRecId(rec.id, throwError, "remove");
        if (!recId) { return false; }

        const currents = this.groupsByRecId.get(recId);
        if (!currents) {
            if (throwError) { throw Error(this.msg(`remove(...) failed - missing`, recId)); }
            return false;
        }

        for (const groupId of currents) {
            const recs = this.prepareRecs(groupId, false);
            if (recs.size <= 1) { this.recsByGroupId.delete(groupId); }
            else { recs.delete(recId); }
        }

        this.groupsByRecId.delete(recId);

        return this.run("remove", [rec]);
    }

    update(rec, throwError=true) {
        const recId = this.validateRecId(rec.id, throwError, "update");
        if (!recId) { return false; }

        const currents = this.groupsByRecId.get(recId);
        if (!currents) {
            if (throwError) { throw Error(this.msg(`update(...) failed - missing`, recId)); }
            return false;
        }

        const valids = this.getGroups(rec);
        const results = new Set();

        //add
        for (const groupId of valids) {
            if (results.has(groupId)) { continue; }
            if (currents.has(groupId)) { currents.delete(groupId); }
            else {
                const recs = this.prepareRecs(groupId, true);
                recs.set(recId, rec);
            }
            results.add(groupId);
        }

        //delete
        for (const groupId of currents) {
            const recs = this.prepareRecs(groupId);
            if (recs.size <= 1) { this.recsByGroupId.delete(groupId); }
            else { recs.delete(recId); }
        }

        this.groupsByRecId.set(recId, results);

        return this.run("update", [rec]);
    }

    get(groupId, recId, throwError = true) {
        recId = this.validateRecId(recId, throwError, "get");
        if (!recId) { return; }

        const recs = this.prepareRecs(groupId, false, throwError);
        return recs?.get(recId);
    }

    gets(groupId, throwError = true) { return this.prepareRecs(groupId, throwError); }

}