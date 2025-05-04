import { isNull } from "../../../components/uni/formats";
import { metaData } from "../../metaData/interface";
import { toFunction } from "../../tools/traits/functions";
import { toString } from "../../tools/traits/strings";
import { _Record } from "./_Record";



export class _Type extends _Record {
    constructor(db, values) {
        super(db, values);

        const v = this.values;
        v.id = toString(v.id);

        const metaRec = metaData._types[v.id];
        if (metaRec) {
            this.meta = v.meta = metaRec.meta;
            v.setter = metaRec.setter;
            v.getter = metaRec.getter
            v.saver = metaRec.saver;
            v.loader = metaRec.loader;
        } else {
            this.meta = v.meta = 0;
            v.setter = isNull(v.setter) ? undefined : toFunction(v.setter);
        }
        
    }
}