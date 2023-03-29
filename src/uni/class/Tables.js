
import ChopSync from "../../sync/class/ChopSync";
import ColumnsSync from "../../sync/class/ColumnsSync";
import vault from "../helpers/vault";
import Table from "./Table";

export class Tables extends ChopSync {

    static create(name, stream) { return new Tables(name, stream); }

    constructor(name, stream) {
        super(`RamDB '${name}'`, {
            stream,
            loader:(self, tables)=>{
                jet.map(tables, (stream, key)=>this.add(key, stream));
            },
            childName:"table"
        });
    }

    add(key, stream={}) {
        return vault.get(this.uid).set(Table.create(this, key, stream));
    }

}

export default Tables;