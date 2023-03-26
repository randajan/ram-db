import jet from "@randajan/jet-core";
import vault from "./vault";

import Column from "../class/Column";


const { solid, virtual } = jet.prop;

const privateTraits = {
  isPrimary: "primary",
  isLabel: "label"
}

const loader = (cols, traits, set) => {
  const _p = vault.get(cols.uid);
  const isArray = !Object.jet.is(traits);

  jet.map(traits, (value, index) => {
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

    set(new Column(cols, _p.list.length, key, value));

  });

  if (!cols.count) { throw Error(cols.msg("at least one column is required")); }

  if (!_p.primary) { _p.primary = _p.list[0]; }
  if (!_p.label) { _p.label = _p.primary; }

};

export const columnsSuper = (table, stream)=>{
  return [
    `${table.name}.cols`,
    {
      stream,
      loader,
      childName:"column"
    }
  ]
}

export const columnsExtend = (table, cols)=>{
  const _p = vault.get(cols.uid);

  solid.all(cols, {
    db:table.db,
    table
  }, false);

  
  virtual.all(cols, {
    primary:cols.afterInit(_=>_p.index[_p.primary]),
    label:cols.afterInit(_=>_p.index[_p.label])
  });

  cols.addChop("reals", c=>!c.isVirtual);
  cols.addChop("refs", c=>!!c.ref);
}