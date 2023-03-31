import jet from "@randajan/jet-core";
import ramdb from "../../dist/index.js";
import testData from "../data/TISDB_export.json";


export default ramdb("main", _=>{
  const schema = {
    sys_apps:{
      url:{ isVirtual:true, formula:r=>`https://www.appsheet.com/start/${r("url_id")}` }
    },
    sys_ents:{
      sys_app_default:{ ref:"sys_apps" },
      options:{ separator:"; " },
      label:{ isVirtual:true, isLabel:true, formula:r=>r("plural") }
    },
    sys_views:{
      id:{ isVirtual:true, formula:r=>jet.melt([r(["sys_ent", "id"]), r("key")], "_") },
      sys_ent:{ ref:"sys_ents" },
      name_prefix:{ init:true },
      label:{ isVirtual:true, isLabel:true, formula:r=>jet.melt([r("name_prefix") ? r(["sys_ent", "label"]) : "", r("name")], " ") }
    },
    sys_states:{
      sys_ent:{ ref:"sys_ents" },
      sys_news_owner:{ separator:"; " },
      sys_news_supervizor:{ separator:"; " },
      code:{ isVirtual:true, formula:r=>r("x")+(r("y")<10 ? "0" : "")+r("y") },
      label:{ isVirtual:true, isLabel:true, formula:r=>r("code") + " " + r("name") }
    },
    sys_rights:{
      kin_contact:{ ref:"kin_contacts" },
      sys_ents:{ separator:"; ", ref:"sys_ents" },
      sys_views:{ separator:"; ", ref:"sys_views" },
      sys_states:{ separator:"; ", ref:"sys_states" }
    },
    sys_apis:{
      sys_ents_readable:{ ref:"sys_ents", separator:"; " },
      extra_apps:{ separator:"; " },
      owner:{ ref:_=>"kin_contacts" },
      is_expired:{ isVirtual:true, formula:r=>r("expired_at") && (new Date() > r("expired_at")) }
    },
    kin_contacts:{
      kin_loc_bill:{ ref:"kin_locs" } 
    },
    book_items:{
      book_doc:{ ref:"book_docs" },
      price_m:{ type:"number" }
    },
    book_docs:{
      book_items:{ isVirtual:true, separator:"; ", ref:"book_items", formula:r=>window.ramdb("book_items").rows.filter(m=>m("book_doc").key === r.key) }
    },
    history_contacts:{
      kin_contact:{ ref:"kin_contacts" },
      version:{ type:"number" },
      id:{ isVirtual:true, isPrimary:true, formula:r=>jet.melt([r(["kin_contact", "id"]), r("version")], "_") }
    }

  }

  const global = (name, cols)=>{
    if (schema[name]) { cols = {...cols, ...schema[name] }; }

    if (cols.id) {
      cols.id.isPrimary = true;
      cols.id.init = _=>jet.uid(12);
    } else {
      console.log(name);
    }

    const ut = cols.updated || cols.updated_at;

    if (ut) { ut.init = _=>new Date(); ut.resetIf = true; ut.type = "datetime"; }

    const ct = cols.created || cols.created_at;
    if (ct) { ct.init = _=>new Date(); ct.isReadonly = true; ct.type = "datetime"; }

    cols._ent = { isVirtual:true, formula:_=>name, ref:"sys_ents" };
    cols._url = { isVirtual:true, formula:r=>`https://tis.itcan.cz/${r(["_ent","sys_app_default", "pathname"])}#control=${name}_Detail&row=${r.key}` };

    return cols;
  }

  return jet.map(testData, (rows, name)=>{
    return {
      cols:_=>global(name, jet.map(rows[0], _=>({}))),
      rows:_=>rows,
      onChange:(table, event, data)=>{
        console.log({ name:table.name, event, key:data.key, data:data.raws });
      }
    }
  });
});