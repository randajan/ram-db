import jet from "@randajan/jet-core";
import { loaderFactory } from "../../uni/helpers/columns.js";
import SchemaAsync from "./parts/SchemaAsync.js";

const { solid, virtual } = jet.prop;

export class ColumnsAsync extends SchemaAsync {

    constructor(table, stream) {

      const _p = {};

      super(`${table.name}.cols`, stream, loaderFactory(_p));

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