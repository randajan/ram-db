// <define:__slib_info>
var define_slib_info_default = { isServer: true, isBuild: false, name: "@randajan/ram-db", description: "Realtime database", version: "2.8.7", author: { name: "Jan Randa", email: "jnranda@gmail.com", url: "https://www.linkedin.com/in/randajan/" }, env: "development", mode: "node", port: 3005, dir: { root: "C:\\dev\\lib\\ram-db", dist: "demo/backend/dist" } };

// node_modules/@randajan/simple-lib/dist/chunk-JLCKRPTS.js
import chalkNative from "chalk";
var chalkProps = Object.getOwnPropertyNames(Object.getPrototypeOf(chalkNative)).filter((v) => v !== "constructor");
var Logger = class extends Function {
  constructor(formater, chalkInit) {
    super();
    const chalk = chalkInit || chalkNative;
    const log2 = (...msgs) => {
      console.log(chalk(formater(msgs)));
    };
    const self = Object.setPrototypeOf(log2.bind(), new.target.prototype);
    for (const prop of chalkProps) {
      Object.defineProperty(self, prop, { get: (_) => new Logger(formater, chalk[prop]), enumerable: false });
    }
    return self;
  }
};
var logger = (...prefixes) => {
  const now = (_) => new Date().toLocaleTimeString("cs-CZ");
  prefixes = prefixes.filter((v) => !!v).join(" ");
  return new Logger((msgs) => `${prefixes} | ${now()} | ${msgs.join(" ")}`);
};

// node_modules/@randajan/simple-lib/dist/chunk-XM4YD4K6.js
var enumerable = true;
var lockObject = (o) => {
  if (typeof o !== "object") {
    return o;
  }
  const r = {};
  for (const i in o) {
    const descriptor = { enumerable };
    let val = o[i];
    if (val instanceof Array) {
      descriptor.get = (_) => [...val];
    } else {
      descriptor.value = lockObject(val);
    }
    Object.defineProperty(r, i, descriptor);
  }
  return r;
};
var info = lockObject(define_slib_info_default);

// node_modules/@randajan/simple-lib/dist/node/index.js
import { parentPort } from "worker_threads";
var log = logger(info.name, info.version, info.env);
parentPort.on("message", (msg) => {
  if (msg === "shutdown") {
    process.exit(0);
  }
});
process.on("uncaughtException", (e) => {
  console.log(e.stack);
});

// demo/backend/src/index.js
import { BifrostRouter } from "@randajan/bifrost/server";

// demo/backend/src/http.js
import { createServer as createServerHTTP } from "http";
import { Server as IO } from "socket.io";
var http = createServerHTTP();
http.listen(info.port + 1);
var io = new IO(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// demo/backend/src/index.js
import fs from "fs-extra";
var records = fs.readJsonSync("demo/backend/src/data/db.json");
var bifrost = new BifrostRouter(io);
bifrost.createBeam("data", {
  get: (_) => records,
  set: (data) => {
    console.log(data);
    fs.writeJsonSync("demo/backend/src/data/db.json", data, { spaces: 2 });
    return records = data;
  }
});
//# sourceMappingURL=index.js.map
