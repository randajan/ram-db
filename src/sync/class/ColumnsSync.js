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

      solid.all(this, {
        db:table.db,
        table
      }, false);

      
      virtual.all(this, {
        primary:this.afterInit(_=>_p.index[_p.primary]),
        label:this.afterInit(_=>_p.index[_p.label])
      });

      this.addChop("reals", c=>!c.isVirtual);
      this.addChop("refs", c=>!!c.ref);
      
    }
  
  }

  export default ColumnsSync;