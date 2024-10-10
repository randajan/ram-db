


import { meta } from "./meta";

import { Bundle } from "./privates/Bundle";


export const testV3 = _=> {
    const bundle = new Bundle("db", row=>row._ent);

    bundle.on("add", console.log);

    meta.forEach(rec=>bundle.add(rec));

    window.bundle = bundle;
}