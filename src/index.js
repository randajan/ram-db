import { nref, timestamps } from "./components/uni/temps";
import { DB } from "./components/sync/DB";


export default (name, stream, maxAge=0, maxAgeError=0) => new DB(name, {
    stream,
    maxAge,
    maxAgeError,
});


export {
    nref,
    timestamps
}