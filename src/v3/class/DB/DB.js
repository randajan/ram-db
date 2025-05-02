
import { Chop } from "../Chop/Chop";

import { _recGetPriv } from "../Record/Record";
import { vault } from "../../../components/uni/consts";
import { toId } from "../../tools/traits/uni";


import { _recAdd } from "../Record/static/add";
import { _recAddOrSet, _recAddOrUpdate } from "../Record/static/addOr";
import { _recSet, _recUpdate } from "../Record/static/update";
import { _recRemove } from "../Record/static/remove";
import { SuperMap } from "../SuperMap/SuperMap";
import { _dbInit } from "./dbInit";
import { Task } from "../Task/Task";

export class DB extends Chop {

    constructor(id, opt={}) {

        const { data, save } = opt;

        super(id, {
            getId:rec=>toId(rec.id),
            getGroup:rec=>toId(rec._ent),
        });

        const _p = vault.get(this);
        _p.colsByEnt = new SuperMap();

        _dbInit(this, Task.create(this), data, save);

    }

    isRecord(any, throwError=false) { return !!_recGetPriv(any, throwError); }

    add(values, context, throwError=false) { return _recAdd(this, arguments, context, throwError); }

    addOrSet(values, context, throwError=false) { return _recAddOrSet(this, arguments, context, throwError); }
    addOrUpdate(values, context, throwError=false) { return _recAddOrUpdate(this, arguments, context, throwError); }

    set(record, values, context, throwError=false) { return _recSet(this, arguments, context, throwError); }
    update(record, values, context, throwError=false) { return _recUpdate(this, arguments, context, throwError); }

    remove(record, context, throwError=false) { return _recRemove(this, arguments, context, throwError); }

}