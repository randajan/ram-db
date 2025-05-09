import { isNull, reArray } from "../../../tools/formats";
import { metaData } from "../../../metaData/interface";
import { _chopGetRecs } from "../../Chop/static/sync";
import { fail, warn } from "../../../tools/traits/uni";


export const _colCreateStored = (_col)=>{
    const { db, current: col } = _col;

    const { store } = col;
    return store ? store(col, db) : null;
}

export const _colCreateGetter = (_col) => {
    const { db, current: col, values: v, traits } = _col;

    const { isList, name, ref, type, fallback, isVirtual } = v;
    const { getter } = (metaData._types[v.type] || col.type);

    const typize = type == "ref" ? x => db.get(ref, x, false) : x => getter(x, col, db);
    const n = !isList ? typize : x => reArray(x, typize);

    return (_rec, turn)=>{
        const { current, before, values } = _rec;
        let val = n(isVirtual ? traits.setter(_rec) : turn ? turn.pull(_col) : values[name]);

        if (fallback && isNull(val)) { val = n(fallback(current, before, traits.stored)); }
        return val;
    }
}

export const _colCreateSetter = (_col) => {
    const { db, current: col, values: v, traits } = _col;

    const { isList, name, formula, validator, isReadonly, resetIf, init, isRequired } = v;
    const { setter } = (metaData._types[v.type] || col.type);

    const typize = x => isNull(x) ? undefined : setter(x, col, db);
    const n = !isList ? typize : x => reArray(x, typize);

    return (_rec, val, values={}) => {
        const { current, before } = _rec;
        const stored = traits.stored;

        if (formula) { val = values[name] = n(formula(current, before, stored)); }
        else {
            if (isReadonly && isReadonly(current, before, stored)) {
                if (before) { warn(`readonly`, ["valueFrom", before], ["value", val]); }
            } else {
                val = values[name] = n(val);
                if (validator && !validator(current, before, stored)) {
                    _rec.fail("invalid", ["value", val]);
                }
            }

            if ((!before && isNull(val)) || (resetIf && resetIf(current, before, stored))) {
                val = values[name] = !init ? undefined : n(init(current, before, stored));
            }
        }

        if (isRequired && isNull(val) && isRequired(current, before, stored)) { _rec.fail("required"); }

        return values[name];
    }
}