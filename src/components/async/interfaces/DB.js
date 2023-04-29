import jet from "@randajan/jet-core";
import { Table } from "../../uni/Table";
import { Chop } from "../privates/Chop";
import { Rows } from "./Rows";
import { Cols } from "./Cols";
import { vault } from "../../uni/tools";

const { virtual } = jet.prop;

export class DB extends Chop {

    constructor(name, config={}) {
        
        const { stream, maxAge, maxAgeError } = config;
        super(name, {
            stream,
            loader: (self, bundle, tables) => {
                const onChange = async (when, action, row, silentSave)=>{
                    if (row.rows.state === "loading") { return; }
                    if (when === "before") { await bundle.run(when+"Change", [action, row]); }
                    if (silentSave !== true) { await bundle.run(when+"Save", [action, row]); }
                    if (when === "after") { await bundle.run(when+"Change", [action, row]); }
                };
                jet.map(tables, (stream, key) => bundle.set(new Table(this, key, { stream, Rows, Cols, onChange})));
            },
            childName: "table",
            defaultContext: "all",
            maxAge,
            maxAgeError
        });

        const _p = vault.get(this.uid);
        _p.lastChange = Date.now();
        virtual(this, "changed", _=>_p.lastChange);
        this.on("afterChange", _=>_p.lastChange = Date.now());
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