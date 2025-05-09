import { boleanString } from "../consts";


export const toBoolean = (any)=>typeof any !== "string" ? !!any : !boleanString.test(any);