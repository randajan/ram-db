import jet from "@randajan/jet-core";
import { columnsLoader } from "../../uni/helpers/columns.js";
import vault from "../../uni/helpers/vault.js";
import ChopSync from "./ChopSync.js";

const { solid, virtual } = jet.prop;

export class ColumnsSync extends ChopSync {

    constructor(table, stream) {

      super(`${table.name}.cols`, {
        stream,
        loader:columnsLoader,
        childName:"column"
      })
      const _p = vault.get(this.uid);
      _p.reals = [];
      _p.refs = [];

      solid.all(this, {
        db:table.db,
        table
      }, false);

      
      virtual.all(this, {
        primary:this.afterInit(_=>_p.index[_p.primary]),
        label:this.afterInit(_=>_p.index[_p.label]),
        reals:this.afterInit(_=>[..._p.reals]),
        refs:this.afterInit(_=>[..._p.refs])
      });
      
    }

    forEachReal(callback, sort) {
      this.init();
      return ChopSync.map(vault.get(this.uid).reals, false, callback, sort);
    }

    forEachRef(callback, sort) {
      this.init();
      return ChopSync.map(vault.get(this.uid).reals, false, callback, sort);
    }
  
  }

  export default ColumnsSync;