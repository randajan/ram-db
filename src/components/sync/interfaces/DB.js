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
                const onChange = (when, action, row, silentSave)=>{
                    if (row.rows.state === "loading") { return; }
                    if (when === "before") { bundle.run(when+"Change", [action, row]); }
                    if (silentSave !== true) { bundle.run(when+"Save", [action, row]); }
                    if (when === "after") { bundle.run(when+"Change", [action, row]); }
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