import { anyToFn, fnToStr, strToFn } from "@randajan/function-parser";

export const saveFn = (any, col)=>anyToFn(any);


export const exportFn = any=>{
    return (typeof any !== "function") ? any : fnToStr(any);
}
