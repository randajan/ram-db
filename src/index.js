import jet from "@randajan/jet-core";
import { ChopSync } from "./sync/class/ChopSync";
import { ColumnsSync } from "./sync/class/ColumnsSync";
import { RowsSync } from "./sync/class/RowsSync";
import { Table } from "./uni/Table";

const { solid } = jet.prop;

export class DBSync extends ChopSync {

    constructor(name, stream, maxAge=0, maxAgeError=0) {
        super(name, {
            stream,
            loader:(self, tables, bundle)=>{
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
        return new ColumnsSync(table, stream);
    }

    seedRows(table, stream) {
        return new RowsSync(table, stream);
    }

}


export default (name, stream)=>new DBSync(name, stream);