import jet from "@randajan/jet-core";


export default class Form {

    constructor() {
        const _p = {
            current:{
                raws:{},
                vals:{}
            },
            before:{
                raws:{},
                vals:{}
            },
            changes:[]
        }
        
        const enumerable = true;
        Object.defineProperties(this, {
            current:{enumerable, get:_=>jet.copy(_p.current, true)},
            before:{enumerable, get:_=>jet.copy(_p.before, true)},
            changes:{enumerable, get:_=>[..._p.changes]}
        });
    }


}


