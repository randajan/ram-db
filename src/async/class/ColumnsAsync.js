import { columnsExtend, columnsSuper } from "../../uni/helpers/columns.js";
import ChopAsync from "./ChopAsync.js";

export class ColumnsAsync extends ChopAsync {

  constructor(table, stream) {

    super(...columnsSuper(table, stream));
    columnsExtend(table, this);

  }

}

export default ColumnsAsync;