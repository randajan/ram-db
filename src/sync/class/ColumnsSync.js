import jet from "@randajan/jet-core";
import vault from "../../uni/vault.js";
import { colsTraits } from "../../uni/consts.js";
import { ChopSync } from "./ChopSync.js";
import { ColumnSync } from "./ColumnSync";

const { solid, virtual } = jet.prop;

const loader = (cols, traits, bundle) => {
  const _p = vault.get(cols.uid);
  const list = _p.bundle.fetch().list;
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
    
    bundle.set(new ColumnSync(cols, list.length, key, value));
  }

  if (!list.length) { throw Error(cols.msg("at least one column is required")); }

  if (!_p.primary) { _p.primary = _p.list[0]; }
  if (!_p.label) { _p.label = _p.primary; }

}

export class ColumnsSync extends ChopSync {

  constructor(table, stream) {

    super(`${table.name}.cols`, {
      childName:"column",
      stream,
      loader
    });

    const _p = vault.get(this.uid);

    solid.all(this, {
      db:table.db,
      table,
      reals:this.chop("reals", c=>!c.isVirtual, true),
      refs:this.chop("refs", c=>!!c.ref, true)
    }, false);
  
    virtual.all(this, {
      primary:this.afterInit(_=>_p.bundle.fetch().index[_p.primary]),
      label:this.afterInit(_=>_p.bundle.fetch().index[_p.label])
    });

  }

  exist(key, throwError = false) {
    return super.exist(key, undefined, throwError);
  }

  get(key, throwError = true) {
    return super.get(key, undefined, throwError);
  }

  count(throwError=true) {
    return super.count(undefined, throwError);
  }

  getList(throwError=true) {
    return super.getList(undefined, throwError);
  }

  getIndex(throwError=true) {
    return super.getIndex(undefined, throwError);
  }

}