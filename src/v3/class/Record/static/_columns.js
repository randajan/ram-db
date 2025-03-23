import { isNull, reArray } from "../../../../components/uni/formats";
import { metaData } from "../../../metaData/interface";
import { _chopGetRecs } from "../../Chop/static/sync";
import { cacheds, solid } from "@randajan/props";
import { vault } from "../../../../components/uni/consts";
import { fail, toId, warn } from "../../../tools/traits/uni";


const blackList = [
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

const createGetter = _col => {
    const { db, current: col, values: v } = _col;
    const { getter } = (metaData._types[v.type] || col.type);

    const typize = v.type == "ref" ? from => db.get(v.ref, from, false) : v => getter(v, col);
    const n = !v.isList ? typize : f => reArray(f, typize);

    return n;
}

const createSetter = _col => {
    const { db, current: col, values: v } = _col;

    const { name, formula, store, validator, isReadonly, resetIf, init, fallback, isRequired, isList } = col;
    const { setter } = (metaData._types[v.type] || col.type);

    const typize = t => isNull(t) ? undefined : setter(t, col);
    const n = !isList ? typize : t => isNull(t) ? undefined : reArray(t, typize);

    const stored = !store ? undefined : store(col, db);

    return (current, output, to, before) => {

        if (formula) { to = output[name] = n(formula(current, before, stored)); }
        else {
            if (isReadonly && isReadonly(current, before, stored)) {
                if (before) { warn(`is readonly`); }
            } else {
                to = output[name] = n(to);
                if (validator && !validator(current, before, stored)) {
                    fail("is invalid");
                }
            }

            if ((!before && isNull(to)) || (resetIf && resetIf(current, before, stored))) {
                to = output[name] = !init ? undefined : n(init(current, before, stored));
            }
        }

        if (fallback && isNull(to)) { to = output[name] = n(fallback(current, before, stored)); }
        if (isRequired && isNull(to) && isRequired(current, before, stored)) { fail("is required"); }

        return output[name];
    }
}

const createTraits = _col => {
    return cacheds({}, {}, {
        getter: _ => createGetter(_col),
        setter: _ => createSetter(_col)
    });
}

export const _colSet = (_rec) => {
    const { _db, values: { _ent, ent, name } } = _rec;
    if (_ent !== "_cols") { return; }

    if (blackList.includes(name)) {
        fail(`blacklisted name ${name}`, blackList).setCol("name");
    }

    _db.colsByEnt.set(toId(ent), name, _rec);

    solid(_rec, "traits", createTraits(_rec), true, true);
}

export const _colRem = (_rec) => {
    const { _db, values } = _rec;
    if (values._ent !== "_cols") { return; }

    _db.colsByEnt.delete(toId(ent), _rec.values.name);
}

