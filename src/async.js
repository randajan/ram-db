import { nref, timestamps } from "./components/uni/temps";
import { reductor, summary } from "./components/async/temps";
import { DB } from "./components/async/interfaces/DB";


export default (name, stream, config={}) => new DB(name, stream, config);



export {
    nref,
    timestamps,
    reductor,
    summary
}