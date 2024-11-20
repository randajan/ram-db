

import { DB } from "./class/Chops/DB";

export {
    DB
}


//TODO:
// - deduplicates records

// - event handlers require whole response object instead of just record

// - self updating formulas - that mean rewrite the push for formulas, with continuous push, how to determine where to send the neccessary update?
// - better nref (simplier definition)

//if i somehow manage to do above and performance tests doesnt prove me wrong then its ready for betatesting