import fse from "fs-extra";
import { log, info } from "@randajan/simple-lib/node";
import jet from "@randajan/jet-core";
import ramdbConstructor from "../../../dist";
import { getSchema } from "./schema.js";



const dbRoot = info.dir.root+"\\tmp\\db";

export const ramdb = ramdbConstructor("main", (self)=>{
  self.on("beforeSave", (action, row)=>{
    const { table } = row;
    const rows = table.rows.map(r=>r.saved.raws, { byKey:true });
  
    if (action === "remove") { delete rows[row.key]; }
    else { rows[row.key] = row.raws; }

    log.yellow(table.name, "SAVED", action, row.key);
  
    return fse.outputJsonSync(dbRoot+"\\"+table.name+".json", rows);
  });

  const dbFiles = fse.readdirSync(dbRoot);
  const tbls = {};

  for (const file of dbFiles) {
    const rows = fse.readJSONSync(dbRoot+"\\"+file);
    const name = file.replace(/\.json$/g, "");

    tbls[name] = {
      cols:_=>getSchema(name, rows),
      rows
    }
  }

  return tbls;

}, { displayDefault:1 });

ramdb.on("beforeSave", (action, row)=>{
  const rr = row.table.rows(row.key, false);
  console.log("AAA", rr?.key);
});

ramdb.on("afterSave", (action, row)=>{
  const rr = row.table.rows(row.key, false);
  console.log("BBB", rr?.key);
});

export default ramdb;