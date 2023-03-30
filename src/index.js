import ChopSync from "./sync/class/ChopSync";
import ColumnsSync from "./sync/class/ColumnsSync";
import RowsSync from "./sync/class/RowsSync";
import { Table } from "./uni/Table";

export class DBSync extends ChopSync {

    constructor(name, stream) {
        super(`ram-db '${name}'`, {
            stream,
            loader:(self, tables, set)=>jet.map(tables, (stream, key)=>set(new Table(this, key, stream))),
            childName:"table"
        });
    }

    seedCols(table, stream) {
        return new ColumnsSync(table, stream);
    }

    seedRows(table, stream) {
        return new RowsSync(table, stream);
    }

}


export default (name, stream)=>new DBSync(name, stream);