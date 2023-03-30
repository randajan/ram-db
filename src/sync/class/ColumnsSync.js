import jet from "@randajan/jet-core";
import vault from "../../uni/vault.js";
import { colsTraits } from "../../uni/consts.js";
import ChopSync from "./ChopSync.js";


const { solid, virtual } = jet.prop;

const loader = (cols, traits, set) => {
  const _p = vault.get(cols.uid);
  const isArray = Array.isArray(traits);

  for (const index in traits) {
    let value = traits[index];
    const isObj = Object.jet.is(value);
    const key = String.jet.to((isArray && !isObj) ? value : (value.key || index));

    if (!isObj) { value = {}; } else {
      delete value.key;
      for (const trait in colsTraits) {
        const v = value[trait];
        delete value[trait];
        if (!v) { continue; }
        const prop = colsTraits[trait];
        if (_p[prop]) { throw Error(cols.msg(`${prop} column is allready set as '${_p[prop]}'`, key)); }
        _p[prop] = key;
      }
    }

    set(new ColumnsSync(cols, _p.list.length, key, value));
  }

  if (!cols.count) { throw Error(cols.msg("at least one column is required")); }

  if (!_p.primary) { _p.primary = _p.list[0]; }
  if (!_p.label) { _p.label = _p.primary; }

}

export class ColumnsSync extends ChopSync {

  constructor(table, stream) {


    super(`${table.name}.cols`, {
      stream,
      loader,
      childName:"column"
    });

    const _p = vault.get(this.uid);

    solid.all(this, {
      db:table.db,
      table,
      reals:this.addChop("reals", c=>!c.isVirtual),
      refs:this.addChop("refs", c=>!!c.ref)
    }, false);
  
    virtual.all(this, {
      primary:this.afterInit(_=>_p.index[_p.primary]),
      label:this.afterInit(_=>_p.index[_p.label])
    });

  }

}

export default ColumnsSync;