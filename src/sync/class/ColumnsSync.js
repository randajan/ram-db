import jet from "@randajan/jet-core";
import { loaderFactory } from "../../uni/helpers/columns.js";
import SchemaSync from "./parts/SchemaSync.js";

const { solid, virtual } = jet.prop;

export class ColumnsSync extends SchemaSync {

    constructor(table, stream) {

      const _p = {};

      super(`${table.name}.cols`, stream, loaderFactory(_p));

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