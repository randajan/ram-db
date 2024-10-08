import { _privates } from "./_consts";


export class Record {

    static is(any) { return any instanceof Record; }

    constructor() {
        _privates.set(this, {});
    }

}
