import { nref, timestamps } from "./components/uni/temps";
import { reductor, summary } from "./components/sync/temps";
import { DB } from "./components/sync/interfaces/DB";


export default (name, stream, config={}) => new DB(name, stream, config);



export {
    nref,
    timestamps,
    reductor,
    summary
}