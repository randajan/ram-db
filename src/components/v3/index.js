

import { DB } from "./class/DB";


export const testV3 = _=> {

    const db = new DB("db");

    db.reset();

    window.db = db;
}


//TODO:
// - duplicates records
// - loading / saving


// - nRefs
// - self updating formulas
// - isList modificator

//if i somehow manage to do above and performance tests doesnt prove me wrong then its ready for betatesting