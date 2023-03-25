import jet from "@randajan/jet-core";
import { columnsLoader } from "../../uni/helpers/columns.js";
import vault from "../../uni/helpers/vault.js";
import CollectionAsync from "./CollectionAsync.js";

const { solid, virtual } = jet.prop;

export class ColumnsAsync extends CollectionAsync {

    constructor(table, stream) {

      super(`${table.name}.cols`, stream, columnsLoader);
      const _p = vault.get(this.uid);
      _p.reals = [];

      solid.all(this, {
        table
      }, false);

      virtual.all(this, {
        primary:async _=>{ await this.init(); return _p.index[_p.primary]; },
        label:async _=>{ await this.init(); return _p.index[_p.label]; },
        reals:async _=>{ await this.init(); return [..._p.reals]; }
      });
      
    }

    forEachReal(callback, sort) {
      this.init();
      return CollectionAsync.map(vault.get(this.uid).reals, false, callback, sort);
    }
  
  }

  export default ColumnsAsync;