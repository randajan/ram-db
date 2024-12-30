

import { DB } from "./class/DB/DB";
import { $add } from "./class/Process/static/add";
import { $addOrSet, $addOrUpdate } from "./class/Process/static/addOrUpdate";
import { $remove } from "./class/Process/static/remove";
import { $reset } from "./class/Process/static/reset";
import { $set, $update } from "./class/Process/static/update";

import { tools } from "./tools";

export {
    DB,
    $reset,
    $remove,
    $update,
    $add,
    $addOrSet,
    $addOrUpdate,
    $set,
}


//TODO:

// - loading is huge mess it requires to improve, how to merge meta with regular rows while loading?

// - deduplicates records, will this solves indexes that we require too?

// - self updating formulas (computed values caching)
// - better nref (simplier definition)

//if i somehow manage to do above and performance tests doesnt prove me wrong then its ready for betatesting