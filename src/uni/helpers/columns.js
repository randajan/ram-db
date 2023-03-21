import Column from "../class/Column";
import vault from "./vault";


export const privateTraits = {
    isPrimary:"primary",
    isLabel:"label"
}

export const columnsLoader = (cols, set, traits)=>{
    const _p = vault.get(cols.uid);

    const isArray = !Object.jet.is(traits);

    jet.map(traits, (value, index)=>{
      const objInArray = (isArray && Object.jet.is(value));
      const key = String.jet.to((!objInArray && isArray) ? value : (value.key || index));

      delete value.key;
      const col = set(key, new Column(cols, _p.list.length, key, value));

      for (const trait in privateTraits) {
        if (!col[trait]) { continue; }
        const prop = privateTraits[trait];
        if (_p[prop]) { throw Error(cols.msg(`${prop} column is allready set as '${_p[prop]}'`, col.key)); }
        _p[prop] = col;
      }

    });

    if (!cols.count) { throw Error(cols.msg("at least one column is required")); }

    if (!_p.primary) { _p.primary = _p.list[0]; }
    if (!_p.label) { _p.label = _p.primary; }

  };