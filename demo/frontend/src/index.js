import { info } from "@randajan/simple-lib/web";

import socketIOClient from "socket.io-client";
import { BifrostRouter } from "@randajan/bifrost/client";

import { DBv3 } from "../../../dist/index";

const socket = socketIOClient(`localhost:${info.port+1}`);
export const bifrost = new BifrostRouter(socket);

const beam = window.beam = bifrost.createBeam("data");

beam.get().then(records=>{
    const db =  window.db = new DBv3("db", {
        init:(self, ctx)=>{
            console.log(records);
            for (const rec of records) {
                const result = self.addOrUpdate(rec, ctx);
                if (!result.isDone) { console.log(result); }
            }
            console.log(records);
        }
    });
    
    db.on((event, rec, ctx)=>{
        if (rec) {
            beam.set(db.export());
        }
    });
});


