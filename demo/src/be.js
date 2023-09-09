import jet from "@randajan/jet-core";
import ramdb from "./async/async";

import odataServer from "../../dist/api/odata.js";

import responder from "@randajan/odata-server/express";

import http from "http";

const api = odataServer(ramdb, {
    extender:(context, returnVals)=>{
        context.returnVals = returnVals;
    },
    returnVals:(context)=>context.returnVals,
    fakeRemove:"$$remove",
    filter:(context, tbl, col)=>{
        if (tbl.name.startsWith("safe_")) { return false; }
        return true;
    }
});


const server = http.createServer(api.serve(responder, 'http://localhost:1337/odata', false)).listen(1337);

process.on("exit", (msg)=>{
    server.close();
});