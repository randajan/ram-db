import { fcePass, fceTrue } from "../tools/consts";

import { toFunction } from "../tools/traits/functions";
import { toRegExp } from "../tools/traits/regexp";
import { toBool } from "../tools/traits/booleans";
import { toNumber } from "../tools/traits/numbers";
import { toString } from "../tools/traits/strings";
import { toObject } from "../tools/traits/objects";
import { toDate } from "../tools/traits/dates";
import { join, toId } from "../tools/traits/uni";

const getter = fcePass;
const setter = fcePass;
const isRequired = fceTrue;
const isReadonly = fceTrue;

export const metaEnts = [ "_ents", "_types", "_cols" ];

export const metaData = {
    "_ents":{
        "_ents":{ meta:3 },
        "_cols":{ meta:3 },
        "_types":{ meta:3 }
    },
    "_types":{
        "string":{ meta:3, setter:(v, c)=>toString(v, c), getter },
        "boolean":{ meta:3, setter:(v, c)=>toBool(v, c), getter },
        "number":{ meta:3, setter:(v, c)=>toNumber(v, c), getter },
        "datetime":{ meta:3, setter:(v, c)=>toDate(v, c), getter },
        "duration":{ meta:3, setter:(v, c)=>toNumber(v, c), getter },
        "function":{ meta:3, setter:(v, c)=>toFunction(v, c), getter, saver:v=>toString(v) },
        "regexp":{ meta:3, setter:(v, c)=>toRegExp(v, c), getter },
        "object":{ meta:3, setter:(v, c)=>toObject(v, c), getter, saver:v=>toString(v) },
        "ref":{ meta:3, setter:(v, c)=>toId(v, c), getter:(v, c, db) => db.get(c.ref?.id, x, false), saver:v=>toId(v) },
        "nref":{ meta:3, setter, getter },
    },
    "_cols":{
        "_ents-_ent":{ meta:3, ent:"_ents", name:"_ent", type:"ref", ref:"_ents", isReadonly, isRequired },
        "_ents-id":{ meta:3, ent:"_ents", name:"id", type:"string", isReadonly, isRequired },
        "_ents-meta":{ meta:3, ent:"_ents", name:"meta", type:"number", isReadonly },
        // "_ents-cols":{
        //     meta:3, ent:"_ents", name:"cols", type:"ref", ref:"_cols", parent:"_cols-ent", isList:true, noCache:true,
        //     store:(c, db)=>{
        //         const { ref, parent:{ name, isList }} = c;
        //         return db.chop(ref.id, {
        //             group:r=>r[name],
        //             isMultiGroup:isList
        //         })
        //     },
        //     formula:(r, b, s)=>s.getList(r, false)
        // },
        // "_ents-size":{
        //     meta:3, ent:"_ents", name:"size", type:"number", noCache:true,
        //     store:(c, db)=>db,
        //     formula:(r, b, s)=>s.getSize(r.id, false)
        // },

        //_types
        "_types-_ent":{ meta:3, ent:"_types", name:"_ent", type:"ref", ref:"_ents", isReadonly, isRequired },
        "_types-id":{ meta:3, ent:"_types", name:"id", type:"string", isReadonly, isRequired },
        "_types-meta":{ meta:3, ent:"_types", name:"meta", type:"number", isReadonly },
        "_types-setter":{ meta:3, ent:"_types", name:"setter", type:"function", isReadonly },
        "_types-getter":{ meta:3, ent:"_types", name:"getter", type:"function", isReadonly },
        "_types-saver":{ meta:3, ent:"_types", name:"saver", type:"function", isReadonly },
        "_types-loader":{ meta:3, ent:"_types", name:"loader", type:"function", isReadonly },

        //_cols
        "_cols-_ent":{ meta:3, ent:"_cols", name:"_ent", type:"ref", ref:"_ents", isReadonly, isRequired },
        "_cols-id":{ meta:3, ent:"_cols", name:"id", type:"string", isReadonly, isRequired, formula:r=>join("-", r.ent?.id, r.name) },
        "_cols-meta":{ meta:3, ent:"_cols", name:"meta", type:"number", isReadonly },
        "_cols-ent":{ meta:3, ent:"_cols", name:"ent", type:"ref", ref:"_ents", isReadonly, isRequired },
        "_cols-name":{ meta:3, ent:"_cols", name:"name", type:"string", isReadonly, isRequired },
        "_cols-type":{ meta:3, ent:"_cols", name:"type", type:"ref", ref:"_types", init:_=>"string", isRequired },
        "_cols-ref":{ meta:3, ent:"_cols", name:"ref", type:"ref", ref:"_ents" },
        "_cols-parent":{ meta:3, ent:"_cols", name:"parent", type:"ref", ref:"_cols" },
        "_cols-store":{ meta:3, ent:"_cols", name:"store", type:"function" },
        "_cols-isList":{ meta:3, ent:"_cols", name:"isList", type:"boolean" },
        "_cols-isReadonly":{ meta:3, ent:"_cols", name:"isReadonly", type:"function" },
        "_cols-isRequired":{ meta:3, ent:"_cols", name:"isRequired", type:"function" },
        "_cols-resetIf":{ meta:3, ent:"_cols", name:"resetIf", type:"function" },
        "_cols-init":{ meta:2, ent:"_cols", name:"init", type:"function" }, //_Type should be defined as a function
        "_cols-fallback":{ meta:2, ent:"_cols", name:"fallback", type:"function" }, //_Type should be defined as a function
        "_cols-validator":{ meta:2, ent:"_cols", name:"validator", type:"function" },
        "_cols-decimal":{ meta:2, ent:"_cols", name:"decimal", type:"number", decimal:0, min:0 },
        "_cols-min":{ meta:2, ent:"_cols", name:"min", type:"number" }, //decimal should be defined as a function
        "_cols-max":{ meta:2, ent:"_cols", name:"max", type:"number" }, //decimal:_=>r.decimal //decimal should be defined as a function
        "_cols-formula":{ meta:2, ent:"_cols", name:"formula", type:"function" },
        "_cols-isVirtual":{ meta:3, ent:"_cols", name:"isVirtual", type:"boolean" },
        "_cols-omitChange":{ meta:3, ent:"_cols", name:"omitChange", type:"boolean" },
    }
}