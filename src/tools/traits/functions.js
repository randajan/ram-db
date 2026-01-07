import { anyToFn } from "@randajan/function-parser";
import { tools } from "..";
import { jet } from "@randajan/jet";


export const toFunction = (any, tls={})=>jet.fn.to(any, {...tools, tls});
