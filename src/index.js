import { ChopSync } from "./sync/class/ChopSync";
import { ColumnsSync } from "./sync/class/ColumnsSync";
import { RowsSync } from "./sync/class/RowsSync";
import { Table } from "./uni/Table";

export class DBSync extends ChopSync {

    constructor(name, stream) {
        super(name, {
            stream,
            loader:(self, tables, bundle)=>{
                jet.map(tables, (stream, key)=>bundle.set(new Table(this, key, stream)));
            },
            childName:"table"
        });
    }

    seedCols(table, stream) {
        return new ColumnsSync(table, stream);
    }

    seedRows(table, stream) {
        return new RowsSync(table, stream);
    }

    msg(text, key) {
        return "ram-db sync " + super.msg(text, key);
    }

}


export default (name, stream)=>new DBSync(name, stream);