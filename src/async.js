import jet from "@randajan/jet-core";
import { ChopSync } from "./sync/class/ChopSync";
import { ColumnsAsync } from "./async/class/ColumnsAsync";
import { RowsAsync } from "./async/class/RowsAsync";
import { Table } from "./uni/Table";

const { solid } = jet.prop;

export class DBAsync extends ChopSync {

    constructor(name, stream, maxAge=0, maxAgeError=0) {
        super(name, {
            stream,
            loader:(self, bundle, tables)=>{
                jet.map(tables, (stream, key)=>bundle.set(new Table(this, key, stream)));
            },
            childName:"table",
            defaultContext:"all",
            maxAge,
            maxAgeError
        });

        solid(this, "epics", this.chop("epics", tbl=>tbl.name.split("_")[0], "sys"));
        
    }

    seedCols(table, stream) {
        return new ColumnsAsync(table, stream);
    }

    seedRows(table, stream, onSave) {
        return new RowsAsync(table, stream, onSave);
    }

}


export default (name, stream)=>new DBAsync(name, stream);