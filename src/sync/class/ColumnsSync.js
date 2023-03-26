import { columnsExtend, columnsSuper } from "../../uni/helpers/columns.js";
import ChopSync from "./ChopSync.js";

export class ColumnsSync extends ChopSync {

  constructor(table, stream) {

    super(...columnsSuper(table, stream));
    columnsExtend(table, this);

  }

}

export default ColumnsSync;