import jet from "@randajan/jet-core";
import { columnsLoader } from "../../uni/helpers/columns.js";
import vault from "../../uni/helpers/vault.js";
import SchemaAsync from "./SchemaAsync.js";

const { solid, virtual } = jet.prop;

export class ColumnsAsync extends SchemaAsync {

    constructor(table, stream) {

      super(`${table.name}.cols`, stream, columnsLoader);
      const _p = vault.get(this.uid);

      solid.all(this, {
        table
      }, false);

      virtual.all(this, {
        primary: async _=>{ await this.init(); return _p.primary; },
        label: async _=>{ await this.init(); return _p.label; }
      });
      
    }
  
  }

  export default ColumnsAsync;