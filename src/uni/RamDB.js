import jet from "@randajan/jet-core";
import { Chop } from "../sync/Chop";
import { Table } from "./Table";

const { solid } = jet.prop;

export class RamDB extends Chop {

    constructor(name, config={}) {
        const { stream, maxAge, maxAgeError, Rows, Cols } = config;
        super(name, {
            stream,
            loader: (self, bundle, tables) => {
                jet.map(tables, (stream, key) => bundle.set(new Table(this, key, {
                    stream,
                    Rows,
                    Cols
                })));
            },
            childName: "table",
            defaultContext: "all",
            maxAge,
            maxAgeError
        });

        solid(this, "epics", this.chop("epics", tbl => tbl.name.split("_")[0], "sys"));

    }

    exist(name, throwError = false) {
        return super.exist(name, undefined, throwError);
    }

    get(name, throwError = true) {
        return super.get(name, undefined, throwError);
    }

    count(throwError = true) {
        return super.count(undefined, throwError);
    }

    getList(throwError = true) {
        return super.getList(undefined, throwError);
    }

    getIndex(throwError = true) {
        return super.getIndex(undefined, throwError);
    }

}