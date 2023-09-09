import jet from "@randajan/jet-core";
import { nref } from "../../../dist/async.js";



const schema = {
    sys_apps:{
      url:{ isVirtual:true, formula:async r=>`https://www.appsheet.com/start/${await r("url_id")}`, extra:{ test:"aaaa" } },
      sys_ents:nref("sys_ents", "sys_app_default"),
      test:{ type:"object", isVirtual:true, formula:_=>({ wtf:1 }) }
    },
    sys_ents:{
      sys_app_default:{ ref:"sys_apps" },
      options:{ separator:"; " },
      label:{ isVirtual:true, isLabel:true, formula:r=>r("plural") },
      is_happy: { type:"boolean", isVirtual:true, formula:_=>true }
    },
    sys_views:{
      id:{ isVirtual:true, formula:async r=>jet.melt([await r(["sys_ent", "id"]), await r("key")], "_") },
      sys_ent:{ ref:"sys_ents" },
      name_prefix:{ init:true },
      label:{ isVirtual:true, isLabel:true, formula:async r=>jet.melt([await r("name_prefix") ? await r(["sys_ent", "label"]) : "", await r("name")], " ") }
    },
    sys_states:{
      sys_ent:{ ref:"sys_ents" },
      sys_news_owner:{ separator:"; " },
      sys_news_supervizor:{ separator:"; " },
      code:{ isVirtual:true, formula:async r=>(await r("x"))+(await r("y")).padStart(2, "0") },
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
      kin_loc_bill:{ ref:"kin_locs" },
      phone:{ separator:"; " }
    },
    book_items:{
      book_doc:{ ref:"book_docs" },
      price_m:{ type:"number" }
    },
    book_series:{
      book_docs:nref("book_docs", "book_serie")
    },
    case_tasks:{
      case_order:{ref:"case_orders"},
    },
    book_docs:{
      case_order:{ref:"case_orders"},
      book_items:nref("book_items", "book_doc"),
      is_our:{type:"boolean"},
      is_anonym:{type:"boolean"},
      book_serie:{ ref:"book_series" },
      bank_acc:{ ref:"book_accs" },
      case_order:{ ref:"case_orders" }
    },
    history_contacts:{
      kin_contact:{ ref:"kin_contacts" },
      version:{ type:"number" },
      id:{ isVirtual:true, isPrimary:true, formula:async r=>jet.melt([await r(["kin_contact", "id"]), await r("version")], "_") }
    },
    book_accs:{
      id:{ isVirtual:true, isPrimary:true, formula:async r=>(await r("account_id"))+"/"+(await r("bank_id")) }
    },
    kin_relations:{
      id:{ isVirtual:true, isPrimary:true, formula:async r=>jet.melt([await r(["kin_contact_from", "id"]), await r(["kin_contact_to", "id"])], "_") }
    },
    case_orders:{
      book_docs:nref("book_docs", "case_order"),
      case_tasks:nref("case_tasks", "case_order")
    },
    kin_locs:{
      duration:{ type:"duration", noNull:true },
      distance:{ type:"number" }
    }
  
  }


  export const getSchema = (name, rows)=>{
    let cols = {};
    for (const rid in rows) { for (const cid in rows[rid]) { if (!cols[cid]) { cols[cid] = {}; } } }

    if (schema[name]) { cols = {...cols, ...schema[name] }; }
  
    if (cols.id) {
      cols.id.isPrimary = true;
      cols.id.init = _=>jet.uid(12);
    } else {
      console.log(name);
    }
  
    const up = cols.updater;
    if (up) { up.ref ="kin_contacts"; up.resetIf = true; }
    const cp = cols.creator;
    if (cp) { cp.ref = "kin_contacts"; cp.isReadonly = true; }
    const op = cols.owner;
    if (op) { op.ref = "kin_contacts"; }
  
    const ut = cols.updated || cols.updated_at;
    if (ut) { ut.init = _=>new Date(); ut.resetIf = true; ut.type = "datetime"; }
    const ct = cols.created || cols.created_at;
    if (ct) { ct.init = _=>new Date(); ct.isReadonly = true; ct.type = "datetime"; }
  
    cols._ent = { isVirtual:true, formula:_=>name, ref:"sys_ents" };
    cols._url = { isVirtual:true, formula:async r=>`https://tis.itcan.cz/${await r(["_ent","sys_app_default", "pathname"])}#control=${name}_Detail&row=${await r.key}` };
  
    return cols;
  }