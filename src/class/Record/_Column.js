import { cacheds } from "@randajan/props";
import { _Record } from "./_Record";
import { join, toId } from "../../tools/traits/uni";
import { _colCreateGetter, _colCreateSetter, _colCreateStored } from "./static/traits";
import { toString } from "../../tools/traits/strings";
import { metaData } from "../../metaData/interface";
import { propNameBlacklist } from "../../tools/consts";

export class _Column extends _Record {
    constructor(db, values) {
        super(db, values);

        const v = this.values;
        v.ent = toId(v.ent);
        v.name = toString(v.name);
        v.id = join("-", v.ent, v.name);

        if (propNameBlacklist.includes(v.name)) {
            throw this.fail(`blacklist`, ["column", "name"], ["value", v.name]);
        }

        const metaRec = metaData._cols[v.id];
        if (metaRec) {
            this.meta = v.meta = metaRec.meta;
        } else if (v.name === "_ent") {
            this.meta = 2;
        } else if (v.name === "id") {
            this.meta = 1;
        } else {
            this.meta = 0;
        }

        this._traits = {};
        this.traits = cacheds({}, this._traits, {
            stored:_=>_colCreateStored(this),
            getter:_=>_colCreateGetter(this),
            setter:_=>_colCreateSetter(this)
        });

        this._db.colsByEnt.set(v.ent, v.name, this);
    }

    resetTraits() {
        const { _traits } = this;
        delete _traits.stored;
        delete _traits.getter;
        delete _traits.setter;
    }
    
    fit(next, event, task) {
        next();
        this.resetTraits();
    }

    unreg() {
        super.unreg();
        const { _db, values: { ent, name } } = this;
        _db.colsByEnt.delete(ent, name);
    }
}