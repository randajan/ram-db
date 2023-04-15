import { log } from "@randajan/simple-lib/node";

import jet from "@randajan/jet-core";
import ramdb from "./async";

import odataServer from "../../dist/api/odata.js";

import http from "http";


const api = odataServer(ramdb, {
    url:'http://localhost:1337',
    filter:(context, entity, col)=>{
        if (entity.startsWith("safe_")) { return false; }
        return true;
    }
});


const server = http.createServer(api.resolver).listen(1337);


process.on("exit", (msg)=>{
    server.close();
});