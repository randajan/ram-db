import { boleanString } from "../consts";


export const toBool = (any)=>typeof any !== "string" ? !!any : !boleanString.test(any);