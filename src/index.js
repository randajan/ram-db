import { nref } from "./tools";
import { DB } from "./sync/DB";


export default (name, stream, maxAge=0, maxAgeError=0) => new DB(name, {
    stream,
    maxAge,
    maxAgeError,
});

export {
    nref
}