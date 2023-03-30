import ChopSync from "./sync/class/ChopSync";
import ColumnsAsync from "./async/class/ColumnsAsync";
import RowsAsync from "./async/class/RowsAsync";
import { Table } from "./uni/Table";
import { asyncMap } from "./async/tools";
import vault from "./uni/vault";

export class DBAsync extends ChopSync {

    constructor(name, stream) {
        super(`ram-db '${name}'`, {
            stream,
            loader:(self, tables, set)=>jet.map(tables, (stream, key)=>set(new Table(this, key, stream))),
            childName:"table"
        });
    }

    seedCols(table, stream) {
        return new ColumnsAsync(table, stream);
    }

    seedRows(table, stream) {
        return new RowsAsync(table, stream);
    }

    mapAsync(byIndex, callback, sort) {
        this.init();
        return asyncMap(vault.get(this.uid).list, byIndex, callback, sort);
    }

}


export default (name, stream)=>new DBAsync(name, stream);