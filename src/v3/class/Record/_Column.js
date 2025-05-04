import { cacheds } from "@randajan/props";
import { _Record } from "./_Record";
import { join, toId } from "../../tools/traits/uni";
import { _colCreateGetter, _colCreateSetter, _colCreateStored } from "./static/traits";
import { toString } from "../../tools/traits/strings";
import { metaData } from "../../metaData/interface";

export const nameBlackList = [
    "constructor",           // Object konstruktor
    "__proto__",             // přímý přístup k prototype chain
    "hasOwnProperty",        // důležitá metoda pro práci s vlastnostmi
    "isPrototypeOf",         // používá se v dědičnosti
    "propertyIsEnumerable",  // zjišťuje, zda je vlastnost výčtová
    "toLocaleString",        // převod pro lokalizaci
    "toString",              // převod na řetězec
    "valueOf",               // převod na primitivní hodnotu
    "toJSON"                 // výstup při JSON.stringify()
];

export class _Column extends _Record {
    constructor(db, values) {
        super(db, values);

        const v = this.values;
        v.ent = toId(v.ent);
        v.name = toString(v.name);
        v.id = join("-", v.ent, v.name);

        if (nameBlackList.includes(v.name)) {
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