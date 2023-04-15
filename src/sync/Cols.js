import jet from "@randajan/jet-core";
import { vault } from "../tools.js";
import { colsTraits } from "../tools.js";
import { Chop } from "./Chop.js";
import { Col } from "./Col.js";
import { formatKey } from "../tools.js";

const { solid, virtual } = jet.prop;

const loader = (cols, bundle, data) => {
  const _p = vault.get(cols.uid);
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
    
    bundle.set(new Col(cols, list.length, name, traits));
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

    const _p = vault.get(this.uid);
    table.db.on("afterReset", _p.recycle, false);

    solid.all(this, {
      db:table.db,
      table,
      virtuals:this.chop("virtuals", { getContext:c=>c.isVirtual, defaultContext:true }),
      refs:this.chop("refs", { getContext:c=>!!c.ref, defaultContext:true })
    }, false);
  
    virtual.all(this, {
      primary:this.withUntilReady(_=>_p.bundle.get(_p.primary)),
      label:this.withUntilReady(_=>_p.bundle.get(_p.label))
    });

  }

  exist(name, throwError = false) {
    return super.exist(name, undefined, throwError);
  }

  get(name, throwError = true) {
    return super.get(name, undefined, throwError);
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