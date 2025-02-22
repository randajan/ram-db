

import { DB } from "./class/DB/DB";

import { tools } from "./tools";

export {
    DB,
    tools
}


//TODO:

// - loading is huge mess it requires to improve, how to merge meta with regular rows while loading?

// - deduplicates records, will this solves indexes that we require too?

// - self updating formulas (computed values caching)
// - better nref (simplier definition)

//if i somehow manage to do above and performance tests doesnt prove me wrong then its ready for betatesting