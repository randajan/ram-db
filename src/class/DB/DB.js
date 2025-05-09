
import { Chop } from "../Chop/Chop";

import { vault } from "../../tools/consts";
import { toId } from "../../tools/traits/uni";


import { _recAdd } from "../Record/actions/add";
import { _recAddOrSet, _recAddOrUpdate } from "../Record/actions/addOr";
import { _recSet, _recUpdate } from "../Record/actions/update";
import { _recRemove } from "../Record/actions/remove";
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
        _p.records = new Map();
        _p.typesById = new Map();
        _p.colsByEnt = new SuperMap();

        _dbInit(new Task(this), data, save);

    }

    isRecord(any) { return vault.get(this).records.has(any); }

    add(values, throwError=false, context=null) { return _recAdd(this, arguments, throwError, context); }

    addOrSet(values, throwError=false, context=null) { return _recAddOrSet(this, arguments, throwError, context); }
    addOrUpdate(values, throwError=false, context=null) { return _recAddOrUpdate(this, arguments, throwError, context); }

    set(record, values, throwError=false, context=null) { return _recSet(this, arguments, throwError, context); }
    update(record, values, throwError=false, context=null) { return _recUpdate(this, arguments, throwError, context); }

    remove(record, throwError=false, context=null) { return _recRemove(this, arguments, throwError, context); }

    setBy(groupId, recId, values, throwError = false, context=null) {
        return this.set(this.get(groupId, recId, throwError), values, throwError, context);
    }

    updateBy(groupId, recId, values, throwError = false, context=null) {
        return this.update(this.get(groupId, recId, throwError), values, throwError, context);
    }

    removeBy(groupId, recId, throwError = false, context=null) {
        return this.remove(this.get(groupId, recId, throwError), throwError, context);
    }

}