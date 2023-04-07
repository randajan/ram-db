import { nref } from "./tools";
import { RamDB } from "./uni/RamDB";
import { Rows } from "./async/Rows";
import { Cols } from "./async/Cols";


export default (name, stream, maxAge=0, maxAgeError=0) => new RamDB(name, {
    stream,
    maxAge,
    maxAgeError,
    Rows,
    Cols
});

export {
    nref
}