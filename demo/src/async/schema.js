import jet from "@randajan/jet-core";
import { nref, summary } from "../../../dist/async.js";



const schema = {
    sys_apps:{
      url:{ isVirtual:true, formula:async r=>`https://www.appsheet.com/start/${await r("url_id")}`, extra:{ test:"aaaa" } },
      sys_ents:nref("sys_ents", "sys_app_default"),
      test:{ type:"object", isVirtual:true, selector:"name", formula:name=>({ name }) },
      check:{ isVirtual:true, formula:async (r, cache)=>{ return cache.t = (cache.t || 0) + 1; } }
    },
    sys_ents:{
      sys_app_default:{ ref:"sys_apps" },
      options:{ separator:"; ", display:2 },
      label:{ isVirtual:true, isLabel:true, selector:"plural" },
      is_happy: { type:"object", isVirtual:true, selector:"singular", formula:name=>({ name }) }
    },
    sys_views:{
      id:{ isVirtual:true, selector:["sys_ent", "key"], formula:s=>jet.melt(s, "_") },
      sys_ent:{ ref:"sys_ents" },
      name_prefix:{ init:true },
      label:{ isVirtual:true, isLabel:true, formula:async r=>jet.melt([await r("name_prefix") ? await r(["sys_ent", "label"]) : "", await r("name")], " ") },
      is_happy: { type:"object", isVirtual:true, selector:"sys_ent.is_happy", formula:v=>{ console.log("REGENERATED"); return v; } }
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
      phone:{ separator:"; " },
      email:{ separator:"; " },
      accounts:{ separator:"; " },
      label:{ isLabel:true, isVirtual:true, display:2,
        selector:"alias,name,email,accounts,phone,in",
        formula:([l, n, e, a, p, i], r)=>l || n || e[0] || a[0] || p[0] || i || r.key
      }
    },
    book_items:{
      "id": { isPrimary:true, init:_=>jet.uid() },
      "book_doc": { ref:"book_docs" },
      "is_visible": { type:"boolean" },
      "is_exclusive": { type:"boolean" },
      "type": {},
      "case_task": { ref:"case_tasks" },
      "book_feature": { ref:"book_features" },
      "is_sell": { type:"boolean" },
      "is_resale": { type:"boolean" },
      "is_select": { type:"boolean" },
      "stuff_pack": { },
      "stuff_type": { type:"stuff_types" },
      "fitness": { },
      "warranty_months": { type:"number" },
      "desc_real": {},
      "desc_fake": {},
      "serials": { separator:"; " },
      "is_desc_rich": { type:"boolean" },
      "amount": { type:"number" },
      "unit": { ref:"sys_units" },
      "price_m": { type:"number" },
      "is_price_total": { type:"boolean" },
      "fee_recycle": { type:"number" },
      "fee_copyright": { type:"number" },
      "is_price_with_fee": { type:"boolean" },
      "vat_ratio": { type:"number" },
      "is_price_with_vat": { type:"boolean" },
      "store_amount_check": { type:"number" },
      "checked_at": { type:"datetime" },
      "book_item_root": { ref:"book_items" },
      "book_item_master": { ref:"book_items" },
      "is_master":{ isVirtual:true, type:"boolean", formula:async r=>!(await r("book_item_master")) },
      "book_items_slave":nref("book_items", "book_item_master"),
      "book_items_inclusive":nref("book_items", "book_item_master", async r=>!(await r("is_exclusive"))),
      // "price_self_one_novat": { isVirtual:true, type:"number", formula:async r=>(await r("price_self_novat"))/(await r("amount")) },
      "price_self_total":{ isVirtual:true, type:"number", formula: async r=>{
        let price = await r("price_m");
        if (await r("is_price_total")) { price /= await r("amount"); }
        if (await r("is_price_with_vat")) { price /= 1+(await r("vat_ratio")); }
        if ((await r("type")) === "Zboží" && !(await r("is_price_with_fee")) ) { price += ((await r("fee_recycle"))+(await r("fee_copyright"))); }
        price *= await r("amount");
        if (await r(["book_doc", "is_vat"])) { price *= 1+(await r("vat_ratio")); }
        return price;
      }},
      "price_inclusive_total":{ isVirtual:true, type:"number", formula:summary("book_items_inclusive", "price_self_total") },
      "price_novat": { isVirtual:true, type:"number", formula:async r=>{
        if (!(await r("is_exclusive"))) { return 0; }
        let price = await r("price_total");
        if (await r(["book_doc", "is_vat"])) { price /= 1+(await r("vat_ratio")); }
        return price;
      }},
      "price_total": { isVirtual:true, type:"number", formula:async r=>{
        if (!(await r("is_exclusive"))) { return 0; }
        const price = ((await r("price_self_total"))+(await r("price_inclusive_total"))*(await r("amount")));
        return price * ((await r(["book_doc", "is_our"])) == (await r("is_sell")) ? 1 : -1);
      }},
      "price_one":{ isVirtual:true, type:"number", formula: async r=>{
        const [exc, tlt, amnt] = await r.select(["is_exclusive", "price_total", "amount"]);
        return exc ? tlt/amnt : 0;
      }},
      "price_one_novat":{ isVirtual:true, type:"number", formula:async r=>{
        const [exc, tlt, amnt] = await r.select(["is_exclusive", "price_novat", "amount"]);
        return exc ? tlt/amnt : 0;
      }},
      "desc_real_row":{ isVirtual:true, type:"string", formula:async r=>{
        const v = await r.select(["is_master", "is_exclusive", "desc_real", "is_desc_rich", "fitness"], { byKey:true });
        let s = v.desc_real;
        if (!v.is_master && v.is_exclusive) { s = " + " + s; }
        if (v.is_desc_rich && v.fitness) { s += " *"+v.fitness[0]; }
        return s;
      }}
    },
    book_series:{
      book_docs:nref("book_docs", "book_serie")
    },
    case_tasks:{
      case_order:{ref:"case_orders"},
    },
    book_docs:{
      "id": { isPrimary:true, init:_=>jet.uid() },
      "is_our": { type:"boolean" },
      "book_serie": { ref:"book_series" },
      "rank": { type:"number" },
      "sn": { },
      "case_order": { ref:"case_orders" },
      "org": { ref:"kin_contacts" },
      "org_ancestor": { ref:"history_contacts" },
      "partner": { ref:"kin_contacts" },
      "partner_ancestor": { ref:"history_contacts" },
      "partner_target": { ref:"kin_contacts" },
      "is_anonym": { type:"boolean" },
      "desc": { },
      "original": { },
      "signed": { },
      "pay_method": { },
      "bank_acc": { ref:"book_accs" },
      "vs_rank": { type:"number" },
      "vs": { },
      "ks": { },
      "ss": { },
      "issued_at": { type:"datetime" },
      "taxed_at": { type:"datetime" },
      "lifespan": { type:"number" },
      "issuer": { ref:"kin_contacts" },
      "price_round": { type:"number" },
      "pay_tip": { type:"number" },
      "accounted_at": { type:"datetime" },
      "accountant": { ref:"kin_contacts" },
      "sys_step_last": { ref:"history_steps" },
      "sys_step_first": { ref:"history_steps" },
      "sys_state":{ isVirtual:true, formula:async r=>r(["sys_step_last", "sys_state"]), ref:"sys_states" },
      "expired_at":{ isVirtual:true, type:"datetime", formula:async r=>{
        const expired = Date.jet.create(await r("issued_at"));
        const lifespan = Math.max(0, await r("lifespan"));
        return expired.setDate(expired.getDate() + lifespan);
      } },
      "book_items":nref("book_items", "book_doc"),
      "book_pays":nref("book_pays", "book_doc"),
      "pays_total":{ isVirtual:true, type:"number", formula:summary("book_pays", "amount") },
      "is_vat":{ isVirtual:true, type:"boolean", formula:async r=> (await r("is_our")) ? r(["org_ancestor", "is_vat_payer"]) : r(["partner_ancestor", "is_vat_payer"]) },
      "book_items_list":nref("book_items", "book_doc", r=>r("is_exclusive")),
      "price_novat":{ isVirtual:true, type:"number", formula:summary("book_items_list", "price_novat")},
      "price_vat":{ isVirtual:true, type:"number", formula:async r=>(await r("price_sum"))-(await r("price_novat"))},
      "price_sum":{ isVirtual:true, type:"number", formula:summary("book_items_list", "price_total") },
      "price_total":{ isVirtual:true, type:"number", formula:async r=>(await r("price_round"))+(await r("price_sum")) }
    },
    history_contacts:{
      kin_contact:{ ref:"kin_contacts" },
      version:{ type:"number" },
      id:{ isVirtual:true, isPrimary:true, formula:async r=>jet.melt([await r(["kin_contact", "id"]), await r("version")], "_") }
    },
    book_accs:{
      id:{ isVirtual:true, isPrimary:true, formula:async r=>(await r("account_id"))+"/"+(await r("bank_id")) },
    },
    kin_relations:{
      id:{ isVirtual:true, isPrimary:true, formula:async r=>jet.melt([await r(["kin_contact_from", "id"]), await r(["kin_contact_to", "id"])], "_") }
    },
    kin_contacts:{
      name:{ max:10 },
      doc_lifespan:{ type:"number", dec:4, min:0, max:31 },
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