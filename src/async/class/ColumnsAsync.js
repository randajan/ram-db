import jet from "@randajan/jet-core";
import vault from "../../uni/vault.js";
import { colsTraits } from "../../uni/consts.js";
import { ChopAsync } from "./ChopAsync.js";
import { ColumnAsync } from "./ColumnAsync.js";
import { formatKey } from "../../uni/tools.js";

const { solid, virtual } = jet.prop;

const loader = async (cols, bundle, data) => {
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
    
    await bundle.set(new ColumnAsync(cols, list.length, name, traits));
  }

  if (!list.length) { throw Error(cols.msg("at least one column is required")); }

  if (!_p.primary) { _p.primary = _p.list[0]; }
  if (!_p.label) { _p.label = _p.primary; }

}

export class ColumnsAsync extends ChopAsync {

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
      virtuals:this.chop("virtuals", c=>c.isVirtual, true),
      refs:this.chop("refs", c=>!!c.ref, true)
    }, false);
  
    virtual.all(this, {
      primary:this.withInit(_=>_p.bundle.get(_p.primary)),
      label:this.withInit(_=>_p.bundle.get(_p.label))
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