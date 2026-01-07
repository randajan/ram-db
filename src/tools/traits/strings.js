
import { fnToStr } from "@randajan/function-parser";
import { fail } from "./uni";
import { isNull } from "../formats";
import { jet } from "@randajan/jet";



export const toString = (any, opt={})=>{
    const { comma, min, max } = opt;
    const str = jet.str.to(any, { comma });

    if (min != null && str.length < min) { fail("too short", ["min", min]); }
    if (max != null && str.length > max) { fail("too long", ["max", max]); }

    return str;
}

