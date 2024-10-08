import { Bundle } from "../privates/Bundle";


export class Collection {

    constructor(fetchLot, defaultLot) {
        this.bundle = new Bundle(fetchLot, defaultLot);       
    }

    add(rec, throwError) {

    }

    remove(rec, throwError) {

    }

    getBy(lot, rec, throwError) {

    }

    get(rec, throwError) {
        return this.getBy(_p.defLot, rec, throwError);
    }

}