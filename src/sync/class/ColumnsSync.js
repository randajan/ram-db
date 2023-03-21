import jet from "@randajan/jet-core";
import { columnsLoader } from "../../uni/helpers/columns.js";
import vault from "../../uni/helpers/vault.js";
import SchemaSync from "./parts/SchemaSync.js";

const { solid, virtual } = jet.prop;

export class ColumnsSync extends SchemaSync {

    constructor(table, stream) {

      super(`${table.name}.cols`, stream, columnsLoader);
      const _p = vault.get(this.uid);

      solid.all(this, {
        table
      }, false);

      virtual.all(this, {
        primary:_=>{ this.init(); return _p.primary; },
        label:_=>{ this.init(); return _p.label; }
      });
      
    }
  
  }

  export default ColumnsSync;