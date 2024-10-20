

import { DB } from "./class/DB";


export const testV3 = _=> {

    const db = new DB("db");

    db.reset();

    window.db = db;
}