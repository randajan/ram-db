
import { info } from "@randajan/simple-lib/node";

import { createServer as createServerHTTP } from "http";
import { Server as IO } from "socket.io";


//Create simple server
const http = createServerHTTP();
http.listen(info.port+1);

//Register Socket.io API
export const io = new IO(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});