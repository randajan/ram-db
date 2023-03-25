import jet from "@randajan/jet-core";
import { columnsLoader } from "../../uni/helpers/columns.js";
import vault from "../../uni/helpers/vault.js";
import CollectionSync from "./CollectionSync.js";

const { solid, virtual } = jet.prop;

export class ColumnsSync extends CollectionSync {

    constructor(table, stream) {

      super(`${table.name}.cols`, stream, columnsLoader);
      const _p = vault.get(this.uid);
      _p.reals = [];

      solid.all(this, {
        db:table.db,
        table
      }, false);

      virtual.all(this, {
        primary:_=>{ this.init(); return _p.index[_p.primary]; },
        label:_=>{ this.init(); return _p.index[_p.label]; },
        reals:_=>{ this.init(); return [..._p.reals]; }
      });
      
    }

    forEachReal(callback, sort) {
      this.init();
      return CollectionSync.map(vault.get(this.uid).reals, false, callback, sort);
    }
  
  }

  export default ColumnsSync;