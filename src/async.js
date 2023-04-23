import { nref, timestamps } from "./components/uni/temps";
import { DB } from "./components/async/DB";
import { reductor, summary } from "./components/async/temps";


export default (name, stream, maxAge = 0, maxAgeError = 0) => new DB(name, {
    stream,
    maxAge,
    maxAgeError,
});


export {
    nref,
    timestamps,
    reductor,
    summary
}