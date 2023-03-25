import Collection from "../../class/parts/Collection";
import CollectionSync from "../../sync/class/CollectionSync";
import vault from "../helpers/vault";
import Table from "./Table";



export class Tables extends CollectionSync {

    static create(name, config) { return new Tables(name, config); }

    constructor(name, config) {
        super(`RamDB '${name}'`, config, (self, tables)=>{
            jet.map(tables, (config, name)=>this.add(name, config));
        });
    }

    add(name, config={}) {
        name = String.jet.to(name);
        return vault.get(this.uid).set(name, Table.create(this, name, config));
    }

}