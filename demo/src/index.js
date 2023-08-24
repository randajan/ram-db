import jet from "@randajan/jet-core";
import ramdb from "./async";

import odataServer from "../../dist/api/odata.js";

import responder from "@randajan/odata-server/express";

import http from "http";

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


ramdb("sys_states").then(tbl=>tbl.rows.map(async row=>{
    const r = await row.select(["sys_ent", "code"], { byKey: true});
    return row.saved.raws;
}, { orderBy:[[r=>r(["sys_ent", "id"]), true], [r=>r("code"), false]]})).then(v=>console.log(JSON.stringify(v)));

//ramdb("sys_apps").then(tbl=>tbl.cols.getList()).then(list=>console.log(list));

process.on("exit", (msg)=>{
    server.close();
});