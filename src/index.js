import { nref, timestamps } from "./components/uni/tools";
import { reductor, summary, reform } from "./components/sync/tools";
import { DB } from "./components/sync/interfaces/DB";


export default (name, stream, config={}) => new DB(name, stream, config);



export {
    nref,
    timestamps,
    reductor,
    summary,
    reform
}