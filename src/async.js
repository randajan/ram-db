import { nref, timestamps,} from "./components/uni/tools";
import { reductor, summary, reform } from "./components/async/tools";
import { DB } from "./components/async/interfaces/DB";


export default (name, stream, config={}) => new DB(name, stream, config);



export {
    nref,
    timestamps,
    reductor,
    summary,
    reform
}