export class Record {
    
    constructor(values) {
        Object.assign(this, values);
    }

    toString() { return this.id; }
    toJSON() { return this.id; }
}