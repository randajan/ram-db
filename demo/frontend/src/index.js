import { info } from "@randajan/simple-lib/web";

import socketIOClient from "socket.io-client";
import { BifrostRouter } from "@randajan/bifrost/client";

import { DB } from "../../../dist/v3/index";

const socket = socketIOClient(`localhost:${info.port+1}`);
export const bifrost = new BifrostRouter(socket);

const beam = window.beam = bifrost.createBeam("data");

beam.get().then(data=>{
    const db = window.db = new DB("db", {
        data,
        save:(entName, recId, rec)=>{
            if (rec) {
                const ent = data[entName] || (data[entName] = {}); 
                ent[recId] = rec;
            } else if (data[entName]) {
                const ent = data[entName];
                delete ent[recId];
            }
            console.log(data);
            beam.set(data);
        }
    });

    db.fit((next, event, process)=>{
        console.log("FIT", event, process);
        return next();
    });

});


