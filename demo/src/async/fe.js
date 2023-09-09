//import { log, info } from "@randajan/simple-lib/web";
import jet from "@randajan/jet-core";
import ramdbConstructor from "../../../dist/async.js";
import { getSchema } from "./schema.js";


import * as dbfiles from "../../../tmp/db/**";

const _prefix = "../../../tmp/db/";
const _suffix = ".json";
const db = {};

dbfiles.filenames.forEach((pathname, index)=>{
    const name = pathname.substring(_prefix.length).slice(0, -_suffix.length);
    db[name] = dbfiles.default[index].default;
});


export const ramdb = ramdbConstructor("main", async (self)=>{

  const tbls = {};

  for (const name in db) {
    const rows = db[name];

    tbls[name] = {
      cols:_=>getSchema(name, rows),
      rows
    }
  }

  return tbls;

}, { displayDefault:1 });

export default ramdb;