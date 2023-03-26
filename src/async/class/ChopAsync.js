import jet from "@randajan/jet-core";
import Chop from "../../uni/class/Chop";
import vault from "../../uni/helpers/vault";

import { asyncBuilder } from "../helpers/chopBuilder";
import { asyncMap } from "../helpers/chopMap";

export class ChopAsync extends Chop {

  constructor(name, config={}) {
    super(name, asyncBuilder, config);
  }

  addChop(name, checker) {
    const _p = vault.get(this.uid);
    name = Chop.formatKey(name);
    if (!name) { throw Error(this.msg(`addChop failed - missing name`)); }
    return _p.chops[name] = new ChopAsync(name, {
      parent:this,
      loader: async chop=>{
        const _c = vault.get(chop.uid);
        await this.syncMap(false, (child)=>{ _c.set(child); });
        _p._chops.push(_c);
      },
      checker,
      childName:this.childName
    });
  }

  afterInit(execute) {
    return async (...args)=>{
      await this.init();
      return execute(...args);
    }
  }

  async exist(key, missingError=false) {
    await this.init();
    return super.exist(key, missingError);
  }

  async get(key, missingError=true) {
    await this.init();
    return super.get(key, missingError);
  }

  async map(byIndex, callback, sort) {
    await this.init();
    return asyncMap(byIndex, callback, sort);
  }

  async filter(byIndex, checker, sort) {
    return this.map(byIndex, async (child, i, count, stop) => {
      if (await checker(child, i, count, stop)) { return child; }
    }, sort);
  }

  async find(checker, sort) {
    return this.map(false, async (child, i, count, stop) => {
      if (await checker(child, i, count, stop)) { return stop(child); }
    }, sort)[0];
  }

}

export default ChopAsync;