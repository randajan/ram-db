import { fcePass, fceTrue } from "../../components/uni/consts";

import { toFunction } from "../tools/traits/functions";
import { toRegExp } from "../tools/traits/regexp";
import { toBoolean } from "../tools/traits/booleans";
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
        "_ents":{ meta:"numb" },
        "_cols":{ meta:"numb" },
        "_types":{ meta:"numb" }
    },
    "_types":{
        "string":{ meta:"numb", setter:(v, c)=>toString(v, c), getter },
        "boolean":{ meta:"numb", setter:(v, c)=>toBoolean(v, c), getter },
        "number":{ meta:"numb", setter:(v, c)=>toNumber(v, c), getter },
        "datetime":{ meta:"numb", setter:(v, c)=>toDate(v, c), getter },
        "duration":{ meta:"numb", setter:(v, c)=>toNumber(v, c), getter },
        "function":{ meta:"numb", setter:(v, c)=>toFunction(v, c), getter, saver:v=>toString(v) },
        "regexp":{ meta:"numb", setter:(v, c)=>toRegExp(v, c), getter },
        "object":{ meta:"numb", setter:(v, c)=>toObject(v, c), getter, saver:v=>toString(v) },
        "ref":{ meta:"numb", setter:(v, c)=>toId(v, c), getter, saver:v=>toId(v) },
        "nref":{ meta:"numb", setter, getter },
    },
    "_cols":{
        "_ents-_ent":{ meta:"numb", ent:"_ents", name:"_ent", type:"ref", ref:"_ents", isReadonly, isRequired },
        "_ents-id":{ meta:"numb", ent:"_ents", name:"id", type:"string", isReadonly, isRequired },
        "_ents-meta":{ meta:"numb", ent:"_ents", name:"meta", type:"string", isReadonly },
        // "_ents-cols":{
        //     meta:"numb", ent:"_ents", name:"cols", type:"ref", ref:"_cols", parent:"_cols-ent", isList:true, noCache:true,
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
        //     meta:"numb", ent:"_ents", name:"size", type:"number", noCache:true,
        //     store:(c, db)=>db,
        //     formula:(r, b, s)=>s.getSize(r.id, false)
        // },

        //_types
        "_types-_ent":{ meta:"numb", ent:"_types", name:"_ent", type:"ref", ref:"_ents", isReadonly, isRequired },
        "_types-id":{ meta:"numb", ent:"_types", name:"id", type:"string", isReadonly, isRequired },
        "_types-meta":{ meta:"numb", ent:"_types", name:"meta", type:"string", isReadonly },
        "_types-setter":{ meta:"numb", ent:"_types", name:"setter", type:"function", isReadonly, fallback:_=>v=>v },
        "_types-getter":{ meta:"numb", ent:"_types", name:"getter", type:"function", isReadonly, fallback:_=>v=>v },
        "_types-saver":{ meta:"numb", ent:"_types", name:"saver", type:"function", isReadonly },
        "_types-loader":{ meta:"numb", ent:"_types", name:"loader", type:"function", isReadonly},

        //_cols
        "_cols-_ent":{ meta:"numb", ent:"_cols", name:"_ent", type:"ref", ref:"_ents", isReadonly, isRequired },
        "_cols-id":{ meta:"numb", ent:"_cols", name:"id", type:"string", isReadonly, isRequired, formula:r=>join("-", r.ent?.id, r.name) },
        "_cols-meta":{ meta:"numb", ent:"_cols", name:"meta", type:"string", isReadonly },
        "_cols-ent":{ meta:"numb", ent:"_cols", name:"ent", type:"ref", ref:"_ents", isReadonly, isRequired },
        "_cols-name":{ meta:"numb", ent:"_cols", name:"name", type:"string", isReadonly, isRequired },
        "_cols-type":{ meta:"numb", ent:"_cols", name:"type", type:"ref", ref:"_types", fallback:_=>"string" },
        "_cols-ref":{ meta:"numb", ent:"_cols", name:"ref", type:"ref", ref:"_ents" },
        "_cols-parent":{ meta:"numb", ent:"_cols", name:"parent", type:"ref", ref:"_cols" },
        "_cols-store":{ meta:"numb", ent:"_cols", name:"store", type:"function" },
        "_cols-isList":{ meta:"numb", ent:"_cols", name:"isList", type:"boolean" },
        "_cols-isReadonly":{ meta:"numb", ent:"_cols", name:"isReadonly", type:"function" },
        "_cols-isRequired":{ meta:"numb", ent:"_cols", name:"isRequired", type:"function" },
        "_cols-resetIf":{ meta:"numb", ent:"_cols", name:"resetIf", type:"function" },
        "_cols-init":{ meta:"hard", ent:"_cols", name:"init", type:"function" }, //Type should be defined as a function
        "_cols-fallback":{ meta:"hard", ent:"_cols", name:"fallback", type:"function" }, //Type should be defined as a function
        "_cols-validator":{ meta:"hard", ent:"_cols", name:"validator", type:"function" },
        "_cols-decimal":{ meta:"hard", ent:"_cols", name:"decimal", type:"number", decimal:0, min:0 },
        "_cols-min":{ meta:"hard", ent:"_cols", name:"min", type:"number" }, //decimal should be defined as a function
        "_cols-max":{ meta:"hard", ent:"_cols", name:"max", type:"number" }, //decimal:_=>r.decimal //decimal should be defined as a function
        "_cols-formula":{ meta:"hard", ent:"_cols", name:"formula", type:"function" },
        "_cols-isVirtual":{ meta:"numb", ent:"_cols", name:"isVirtual", type:"boolean" },
        "_cols-omitChange":{ meta:"numb", ent:"_cols", name:"omitChange", type:"boolean" },
    }
}