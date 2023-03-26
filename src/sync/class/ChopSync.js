import jet from "@randajan/jet-core";
import Chop from "../../uni/class/Chop";
import vault from "../../uni/helpers/vault";

import { syncBuilder } from "../helpers/chopBuilder";

export class ChopSync extends Chop {

  constructor(name, config={}) {
    super(name, syncBuilder, config);
  }

  addChop(name, checker) {
    const _p = vault.get(this.uid);
    name = Chop.formatKey(name);
    if (!name) { throw Error(this.msg(`addChop failed - missing name`)); }
    return _p.chops[name] = new ChopSync(name, {
      parent:this,
      loader:(chop)=>{
        const _c = vault.get(chop.uid);
        this.syncMap(false, (child)=>{ _c.set(child); });
        _p._chops.push(_c);
      },
      checker,
      childName:this.childName
    });
  }

  afterInit(execute) {
    return (...args)=>{
      this.init();
      return execute(...args);
    }
  }

  exist(key, missingError=false) {
    this.init();
    return super.exist(key, missingError);
  }

  get(key, missingError=true) {
    this.init();
    return super.get(key, missingError);
  }

  map(byIndex, callback, sort) {
    this.init();
    return super.map(byIndex, callback, sort);
  }

}

export default ChopSync;