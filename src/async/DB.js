import jet from "@randajan/jet-core";
import { Chop } from "./Chop";
import { Rows } from "./Rows";
import { Cols } from "./Cols";
import { Table } from "../uni/Table";

export class DB extends Chop {

    constructor(name, config={}) {
        
        const { stream, maxAge, maxAgeError } = config;
        super(name, {
            stream,
            loader: (self, bundle, tables) => {
                jet.map(tables, (stream, key) => bundle.set(new Table(this, key, { stream, Rows, Cols })));
            },
            childName: "table",
            defaultContext: "all",
            maxAge,
            maxAgeError
        });
    }

    async exist(name, throwError = false) {
        return super.exist(name, undefined, throwError);
    }

    async get(name, throwError = true) {
        return super.get(name, undefined, throwError);
    }

    async count(throwError = true) {
        return super.count(undefined, throwError);
    }

    async getList(throwError = true) {
        return super.getList(undefined, throwError);
    }

    async getIndex(throwError = true) {
        return super.getIndex(undefined, throwError);
    }

}