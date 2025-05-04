import { cacheds } from "@randajan/props";
import { Row } from "./Row";
import { toId } from "../../tools/traits/uni";
import { _colCreateGetter, _colCreateSetter, _colCreateStored } from "./static/traits";

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

export class Column extends Row {
    constructor(db, values) {
        super(db, values);

        const v = this.values;
        v.ent = toId(v.ent);

        if (nameBlackList.includes(v.name)) {
            throw this.fail(`blacklist`, ["column", "name"], ["value", v.name]);
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
        delete this._traits.stored;
        delete this._traits.getter;
        delete this._traits.setter;
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