import fse from "fs-extra";
import { log, info } from "@randajan/simple-lib/node";
import jet from "@randajan/jet-core";
import ramdbConstructor from "../../../dist/async.js";
import { getSchema } from "./schema.js";



const dbRoot = info.dir.root+"\\tmp\\db";

export const ramdb = ramdbConstructor("main", async (self)=>{
  self.on("beforeSave", async (action, row)=>{
    const { table } = row;
    const rows = await table.rows.map(r=>r.saved.raws, { byKey:true });
  
    if (action === "remove") { delete rows[row.key]; }
    else { rows[row.key] = row.raws; }

    log.yellow(table.name, "SAVED", action, row.key);
  
    return fse.outputJSON(dbRoot+"\\"+table.name+".json", rows);
  });

  const dbFiles = await fse.readdir(dbRoot);
  const tbls = {};

  for (const file of dbFiles) {
    const rows = await fse.readJSON(dbRoot+"\\"+file);
    const name = file.replace(/\.json$/g, "");

    tbls[name] = {
      cols:_=>getSchema(name, rows),
      rows
    }
  }

  return tbls;

}, { displayDefault:1 });

ramdb.on("beforeSave", async (action, row)=>{
  const rr = await row.table.rows(row.key, false);
  console.log("AAA", rr?.key);
});

ramdb.on("afterSave", async (action, row)=>{
  const rr = await row.table.rows(row.key, false);
  console.log("BBB", rr?.key);
});

export default ramdb;