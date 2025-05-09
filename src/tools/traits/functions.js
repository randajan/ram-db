import { anyToFn } from "@randajan/function-parser";
import { tools } from "..";


export const toFunction = any=>typeof any === "function" ? any : anyToFn(any, tools);
