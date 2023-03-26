import Column from "../class/Column";
import vault from "./vault";


export const privateTraits = {
    isPrimary:"primary",
    isLabel:"label"
}

export const columnsLoader = (cols, traits, set)=>{
    const _p = vault.get(cols.uid);
    const isArray = !Object.jet.is(traits);

    jet.map(traits, (value, index)=>{
      const isObj = Object.jet.is(value);
      const key = String.jet.to((isArray && !isObj) ? value : (value.key || index));
      
      if (!isObj) { value = {}; } else {
        delete value.key;
        for (const trait in privateTraits) {
          const v = value[trait];
          delete value[trait];
          if (!v) { continue; }
          const prop = privateTraits[trait];
          if (_p[prop]) { throw Error(cols.msg(`${prop} column is allready set as '${_p[prop]}'`, key)); }
          _p[prop] = key;
        }
      }

      const col = set(new Column(cols, _p.list.length, key, value));

      if (col.ref) { _p.refs.push(col); }
      if (!col.isVirtual) { _p.reals.push(col); }

    });

    if (!cols.count) { throw Error(cols.msg("at least one column is required")); }

    if (!_p.primary) { _p.primary = _p.list[0]; }
    if (!_p.label) { _p.label = _p.primary; }

  };