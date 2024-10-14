import { isFce, toArr, toFce, toStr, wrapFce } from "../../uni/formats";


export class Bundle {

    constructor(id, opt={}) {
        id = toStr(id);
        if (!id) { throw Error(this.msg("critical error - missing id")); }

        const { init, group, filter, isMultiGroup=false } = opt;
        this._batchLevel = 0;
        this._queue = [];

        jet.prop.solid.all(this, {
            id,
            isMultiGroup,
            _handlers:[],
            _groupIdsByRec:new Map(), // rec -> groupIds
            _recsByGroupId:new Map(), // groupId -> recs
            _group:!isMultiGroup ? toFce(group) : wrapFce(toArr, toFce(group, [undefined])),
            _init:init,
            _filter:toFce(filter, true),
        });
        
        this.on(event=>{
            console.log(this.id, event);
            if (event === "batchStart") { this._batchLevel += 1;}
            else if (event === "batchEnd") {
                this._batchLevel = Math.max(0, this._batchLevel-1);
                if (!this._batchLevel) {
                    for (const args of this._queue) { this._run(...args); }
                    this._queue = [];
                }
            }
        });
    }

    msg(text, recId, groupId) {
        recId = toStr(recId);
        let msg = this.id;
        if (groupId) { msg += ` group('${groupId}')`; }
        if (recId) { msg += ` rec('${recId}')`; }
        if (text) { msg += " " + text; }
        return msg.trim();
    }

    _prepareRecs(groupId, autoCreate = false, throwError = true) {
        const { _recsByGroupId } = this;
        let recs = _recsByGroupId.get(groupId);
        if (recs) { return recs; }
        if (autoCreate) { _recsByGroupId.set(groupId, recs = new Map()); }
        else if (throwError) { throw Error(this.msg(`not found`, undefined, groupId)); }
        return recs;
    };

    _deleteRec(groupId, recId, throwError = true) {
        const { _recsByGroupId } = this;
        const recs = this._prepareRecs(groupId, false, throwError);
        if (!recs?.has(recId)) {
            if (throwError) { throw Error(this.msg(`delete(...) failed - inconsistency detected`, recId)); }
            return false;
        }
        if (recs.size <= 1) { _recsByGroupId.delete(groupId); }
        else { recs.delete(recId); }
        return true;
    }

    validateRecId(recId, throwError = true, action = "validateRecId") {
        if (recId = toStr(recId)) { return recId; }
        if (throwError) { throw Error(this.msg(`${action}(...) failed - id undefined`)); }
    }

    on(callback, onlyOnce = false) {
        if (!isFce(callback)) { throw Error(this.msg(`on(...) require callback`)); }
        const { _handlers } = this;

        let remove;
        const cb = onlyOnce ? (...args) => { callback(...args); remove(); } : callback;

        _handlers.unshift(cb);

        return remove = _ => {
            const x = _handlers.indexOf(cb);
            if (x >= 0) { _handlers.splice(x, 1); }
            return callback;
        }
    }

    _run(event, rec, ctx) {
        const { _handlers, _batchLevel, _queue }  = this;
        if (_batchLevel && !event.startsWith("batch")) { _queue.push([event, rec, ctx]); return true; }
        if (!_handlers?.length) { return true; }

        for (let i = _handlers.length - 1; i >= 0; i--) {
            try { if (_handlers[i]) { _handlers[i](event, rec, ctx); } }
            catch(err) { console.error(err); }
        }

        return true;
    }

    reset(ctx) {
        const { _recsByGroupId, _groupIdsByRec, _init } = this;
        _groupIdsByRec.clear();
        _recsByGroupId.clear();
        this._reseting = true;
        _init(this, ctx);
        this._reseting = false;
        this._run("reset", undefined, ctx);
        return true;
    }

    add(rec, throwError = true, ctx) {
        const { isMultiGroup, _groupIdsByRec, _filter, _group } = this;
        const recId = this.validateRecId(rec.id, throwError, "add");
        if (!recId || !_filter(rec)) { return false; }

        if (_groupIdsByRec.has(rec)) {
            if (throwError) { throw Error(this.msg(`add(...) failed - duplicate`, recId)); }
            return false;
        }

        const valid = _group(rec);
        if (isMultiGroup) {
            const results = new Set();

            for (const groupId of valid) {
                if (results.has(groupId)) { continue; }
                const recs = this._prepareRecs(groupId, true);
                recs.set(recId, rec);
                results.add(groupId);
            }
    
            _groupIdsByRec.set(rec, results);
        } else {
            const recs = this._prepareRecs(valid, true);
            recs.set(recId, rec);

            _groupIdsByRec.set(rec, valid);
        }

        return this._run("add", rec, ctx);
    }

    remove(rec, throwError = true, ctx) {
        const { isMultiGroup, _groupIdsByRec, _filter } = this;
        const recId = this.validateRecId(rec.id, throwError, "remove");
        if (!recId) { return false; }

        if (!_groupIdsByRec.has(rec)) {
            if (throwError && _filter(rec)) { throw Error(this.msg(`remove(...) failed - missing`, recId)); }
            return false;
        }

        const current = _groupIdsByRec.get(rec);
        if (isMultiGroup) {
            for (const groupId of current) { this._deleteRec(groupId, recId); }
        } else {
            this._deleteRec(current, recId);
        }
        

        _groupIdsByRec.delete(rec);

        return this._run("remove", rec, ctx);
    }

    update(rec, throwError=true, ctx) {
        const { isMultiGroup, _groupIdsByRec, _group, _filter } = this;
        const recId = this.validateRecId(rec.id, throwError, "update");
        if (!recId) { return false; }

        if (!_groupIdsByRec.has(rec)) {
            if (throwError && _filter(rec)) { throw Error(this.msg(`update(...) failed - missing`, recId)); }
            return false;
        }

        const valid = _group(rec);
        const current = _groupIdsByRec.get(rec);
        if (isMultiGroup) {
            const results = new Set();

            for (const groupId of valid) {
                if (results.has(groupId)) { continue; }
                if (current.has(groupId)) { current.delete(groupId); }
                else {
                    const recs = this._prepareRecs(groupId, true);
                    recs.set(recId, rec);
                }
                results.add(groupId);
            }
    
            for (const groupId of current) { this._deleteRec(groupId, recId); }
    
            _groupIdsByRec.set(rec, results);
        } else if (valid !== current) {
            const recs = this._prepareRecs(valid, true);
            recs.set(recId, rec);
            this._deleteRec(current, recId);
            _groupIdsByRec.set(rec, valid);
        }

        return this._run("update", rec, ctx);
    }

    get(groupId, recId, throwError = true) {
        recId = this.validateRecId(recId, throwError, "get");
        if (!recId) { return; }

        const recs = this._prepareRecs(groupId, false, throwError);
        return recs?.get(recId);
    }

    gets(groupId, throwError = true) { return this._prepareRecs(groupId, throwError); }

    chop(id, opt={}) {
        id = toStr(id);
        if (!id) { throw Error(this.msg("critical error - chop missing id")); }

        opt.init = (chop, ctx)=>{
            for (const [rec] of this._groupIdsByRec) { chop.add(rec, true, ctx); }
        };
        
        const chop = new Bundle(this.id + "." + id, opt);

        this.on((event, rec, ctx)=>{
            if (event === "reset") { return chop.reset(ctx); }
            if (this._reseting) { return; }
            if (event === "add") { return chop.add(rec, true, ctx); }
            if (event === "remove") { return chop.remove(rec, true, ctx); }
            if (event === "update") { return chop.update(rec, true, ctx); }
        });

        return chop;
    }
}