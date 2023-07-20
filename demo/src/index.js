import jet from "@randajan/jet-core";
import ramdb from "./async";

import odataServer from "../../dist/api/odata.js";
import responder from "@randajan/odata-server/express";

import http from "http";

setTimeout(_=>{
    ramdb.reset().then(_=>console.log("Reset"));
}, 10000);


const api = odataServer(ramdb, {
    extender:(context, returnVals)=>{
        context.returnVals = returnVals;
        // const route = context.server.findRoute("/"+context.url.pathname);
        // console.log("b");
        // console.log(context.url, route?.action);
    },
    returnVals:(context)=>context.returnVals,
    fakeRemove:"$$remove",
    filter:(context, tbl, col)=>{
        if (tbl.name.startsWith("safe_")) { return false; }
        return true;
    }
});

//setInterval(_=>log.magenta(JSON.stringify(ramdb.map(tbl=>tbl.state === "ready" ? tbl.name : undefined))), 5000);

// setTimeout(async _=>{
//     const rows = ramdb("sys_ents").rows
// }, 10000);
// ramdb("sys_")


const server = http.createServer(api.serve(responder, 'http://localhost:1337/odata', true)).listen(1337);


process.on("exit", (msg)=>{
    server.close();
});