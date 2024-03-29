import jet from "@randajan/jet-core";
import { vault, formatKey } from "../../uni/consts.js";
import { colsTraits } from "../traits.js";

import { Chop } from "../privates/Chop.js";
import { Col } from "../interfaces/Col.js";



const { solid, virtual } = jet.prop;

const loader = async (cols, bundle, data) => {
  const _p = vault.get(cols);
  const isArray = Array.isArray(data);
  const { list } = _p.bundle.getData();

  delete _p.primary;
  delete _p.label;

  for (const index in data) {
    let value = data[index];
    const isObj = Object.jet.is(value);

    const name = formatKey((isArray && !isObj) ? value : value.name, index);
    const traits = isObj ? {...value} : {};

    if (isObj) {
      delete traits.name;
      for (const trait in colsTraits) {
        const v = traits[trait];
        delete traits[trait];
        if (!v) { continue; }
        const prop = colsTraits[trait];
        if (_p[prop]) { throw Error(cols.msg(`${prop} column is allready set as '${_p[prop]}'`, name)); }
        _p[prop] = name;
      }
    }
    
    await bundle.set(new Col(cols, list.length, name, traits));
  }

  if (!list.length) { throw Error(cols.msg("at least one column is required")); }

  if (!_p.primary) { _p.primary = list[0]; }
  if (!_p.label) { _p.label = _p.primary; }

}

export class Cols extends Chop {

  constructor(table, stream) {

    super(`${table.name}.cols`, {
      childName:"column",
      defaultContext:"all",
      stream,
      loader
    });

    const _p = vault.get(this);

    solid.all(this, {
      db:table.db,
      table,
      virtuals:this.addChop("virtuals", { getContext:c=>c.isVirtual, defaultContext:true }),
      refs:this.addChop("refs", { getContext:c=>!!c.ref, defaultContext:true })
    }, false);
  
    virtual.all(this, {
      primary:this.withUntilLoaded(_=>_p.bundle.get(_p.primary)),
      label:this.withUntilLoaded(_=>_p.bundle.get(_p.label))
    });

  }

  async exist(name, throwError = false) {
    return super.exist(name, undefined, throwError);
  }

  async get(name, throwError = true) {
    return super.get(name, undefined, throwError);
  }

  async count(throwError=true) {
    return super.count(undefined, throwError);
  }

  async getList(throwError=true) {
    return super.getList(undefined, throwError);
  }

  async getIndex(throwError=true) {
    return super.getIndex(undefined, throwError);
  }

}