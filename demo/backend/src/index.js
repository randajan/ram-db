
import { info } from "@randajan/simple-lib/node";

import { BifrostRouter } from "@randajan/bifrost/server";
import { io } from "./http";
import fs from "fs-extra";

let records = fs.readJsonSync("demo/_data/db.json");

const bifrost = new BifrostRouter(io);

bifrost.createBeam("data", {
    get:_=>records,
    set:data=>{
        fs.writeJsonSync("demo/_data/db.json", data);
        return records = data;
    }
});