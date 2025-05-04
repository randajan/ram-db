import { isNull, reArray } from "../../../../components/uni/formats";
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

    const typize = type == "ref" ? x => db.get(ref, x, false) : x => getter(x, col);
    const n = !isList ? typize : x => reArray(x, typize);

    return (row, turn)=>{
        const { current, before, values } = row;
        let val = n(isVirtual ? traits.setter(row) : turn ? turn.pull(_col) : values[name]);

        if (fallback && isNull(val)) { val = n(fallback(current, before, traits.stored)); }
        return val;
    }
}

export const _colCreateSetter = (_col) => {
    const { current: col, values: v, traits } = _col;

    const { isList, name, formula, validator, isReadonly, resetIf, init, isRequired } = col;
    const { setter } = (metaData._types[v.type] || col.type);

    const typize = x => isNull(x) ? undefined : setter(x, col);
    const n = !isList ? typize : x => reArray(x, typize);

    return (row, val, values={}) => {
        const { current, before } = row;
        const stored = traits.stored;

        if (formula) { val = values[name] = n(formula(current, before, stored)); }
        else {
            if (isReadonly && isReadonly(current, before, stored)) {
                if (before) { warn(`readonly`, ["valueFrom", before], ["value", val]); }
            } else {
                val = values[name] = n(val);
                if (validator && !validator(current, before, stored)) {
                    fail("invalid", ["value", val]);
                }
            }

            if ((!before && isNull(val)) || (resetIf && resetIf(current, before, stored))) {
                val = values[name] = !init ? undefined : n(init(current, before, stored));
            }
        }

        if (isRequired && isNull(val) && isRequired(current, before, stored)) { fail("required"); }

        return values[name];
    }
}