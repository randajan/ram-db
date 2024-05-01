import jet from "@randajan/jet-core";
import { each } from "@randajan/jet-core/eachSync";
import { Table } from "../../uni/Table";
import { Chop } from "../privates/Chop";
import { Rows } from "./Rows";
import { Cols } from "./Cols";
import { numberPositive, vault } from "../../uni/consts";

const { solid, virtual } = jet.prop;

export class DB extends Chop {

    constructor(name, stream, config={}) {
        
        const { displayDefault, decimalDefault, maxAge, maxAgeError } = config;
        super(name, {
            stream,
            loader: (self, bundle, tables) => {
                each(tables, (stream, ctx) =>{ bundle.set(new Table(this, ctx.key, { bundle, stream, Rows, Cols })); });
            },
            childName: "table",
            defaultContext: "all",
            maxAge,
            maxAgeError
        });

        const _p = vault.get(this);
        _p.lastChange = Date.now();

        this.on("afterChange", _=>_p.lastChange = Date.now());

        virtual(this, "lastChange", _=>_p.lastChange);
        solid(this, "displayDefault", numberPositive(displayDefault));
        solid(this, "decimalDefault", numberPositive(decimalDefault, 2));
        
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