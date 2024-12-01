import { info } from "@randajan/simple-lib/web";

import socketIOClient from "socket.io-client";
import { BifrostRouter } from "@randajan/bifrost/client";

import { DB } from "../../../dist/v3/index";

const socket = socketIOClient(`localhost:${info.port+1}`);
export const bifrost = new BifrostRouter(socket);

const beam = window.beam = bifrost.createBeam("data");

beam.get().then(records=>{
    const db =  window.db = new DB("db", {
        init:(load, ctx)=>{
            for (const rec of records) { load(rec, ctx); }
        }
    });

    db.reset("test");
    
    db.on((event, res, ctx)=>{
        if (res) {
            //console.log(event);
            //beam.set(db.exportAll());
        }
    });
});


