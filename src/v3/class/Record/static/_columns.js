import { isNull, reArray } from "../../../../components/uni/formats";
import { metaData } from "../../../metaData/interface";
import { _chopGetRecs } from "../../Chop/static/sync";
import { cacheds, solid } from "@randajan/props";
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

const createStored = (traits, _col)=>{
    const { db, current: col } = _col;

    const { store } = col;
    return store ? store(col, db) : null;
}

const createGetter = (traits, _col) => {
    const { db, current: col, values: v } = _col;

    //const { fallback } = col;
    const { getter } = (metaData._types[v.type] || col.type);

    const typize = v.type == "ref" ? from => db.get(v.ref, from, false) : v => getter(v, col);
    const n = !v.isList ? typize : f => reArray(f, typize);
    
    return (from, current, before)=>{
        from = n(from);
        //if (fallback && isNull(from)) { from = n(fallback(current, before, traits.stored)); }
        return from;
    }
}

const createSetter = (traits, _col) => {
    const { current: col, values: v } = _col;

    const { name, formula, validator, isReadonly, resetIf, init, isRequired, isList } = col;
    const { setter } = (metaData._types[v.type] || col.type);

    const typize = t => isNull(t) ? undefined : setter(t, col);
    const n = !isList ? typize : t => isNull(t) ? undefined : reArray(t, typize);

    return (to, current, before, output) => {
        const stored = traits.stored;
        if (formula) { to = output[name] = n(formula(current, before, stored)); }
        else {
            if (isReadonly && isReadonly(current, before, stored)) {
                if (before) { warn(`readonly`, ["valueFrom", before], ["valueTo", to]); }
            } else {
                to = output[name] = n(to);
                if (validator && !validator(current, before, stored)) {
                    fail("invalid", ["valueTo", to]);
                }
            }

            if ((!before && isNull(to)) || (resetIf && resetIf(current, before, stored))) {
                to = output[name] = !init ? undefined : n(init(current, before, stored));
            }
        }

        if (isRequired && isNull(to) && isRequired(current, before, stored)) { fail("required"); }

        return output[name];
    }
}

const createTraits = _col => {
    const traits = {};
    return cacheds(traits, {}, {
        stored:_=>createStored(traits, _col),
        getter:_=>createGetter(traits, _col),
        setter:_=>createSetter(traits, _col)
    });
}

export const _colSet = (_rec) => {
    const { _db, values: { _ent, ent, name } } = _rec;
    if (_ent !== "_cols") { return; }

    if (blackList.includes(name)) {
        throw fail(`blacklist`, ["column", "name"], ["valueTo", name]);
    }

    _db.colsByEnt.set(toId(ent), name, _rec);

    solid(_rec, "traits", createTraits(_rec), true, true);
}

export const _colRem = (_rec) => {
    const { _db, values: { _ent, ent, name } } = _rec;
    if (_ent !== "_cols") { return; }

    _db.colsByEnt.delete(toId(ent), name);
}

