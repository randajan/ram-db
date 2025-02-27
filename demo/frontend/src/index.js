import { info } from "@randajan/simple-lib/web";

import socketIOClient from "socket.io-client";
import { BifrostRouter } from "@randajan/bifrost/client";

import { DB } from "../../../dist/v3/index";

const socket = socketIOClient(`localhost:${info.port+1}`);
export const bifrost = new BifrostRouter(socket);

const beam = window.beam = bifrost.createBeam("data");

beam.get().then(data=>{
    const db = window.db = new DB("db", {
        load:(entName)=>{
            return data[entName];
        },
        save:(entName, recId, rec)=>{
            console.log(entName, recId, rec);
            return true;
        }
    });

    // db.fit((process, next)=>{
    //     if (!process.isBatch) { throw "FUCK"; }
    //     console.log("FIT", process);
    // })

    console.log(db.reset("test"));
});


