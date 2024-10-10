import { nref, timestamps } from "./components/uni/tools";
import { reductor, summary } from "./components/sync/tools";
import { DB } from "./components/sync/interfaces/DB";


export default (name, stream, config={}) => new DB(name, stream, config);

import { testV3 } from "./components/v3/index.js";

export {
    nref,
    timestamps,
    reductor,
    summary,
    testV3
}