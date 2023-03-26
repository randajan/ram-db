import jet from "@randajan/jet-core";
import StackControl from "./parts/StackControl.js";


let _nextUID = 0;

const rowStack = new StackControl();


export default class Step {

  constructor(row, before, isLock) {
    this.uid = _nextUID ++;

    this.row = row;
    this.before = before;
    this.key = before ? before.key : undefined;
    this.raws = before ? {...before.raws} : {};
    this.isDirty = false;
    this.changes = {};


    Object.defineProperties(this, {
      lock:{get:_=>isLock(this)},
      keying:{get:_=>rowStack.has(this.uid, "key")},
      setting:{get:_=>rowStack.has("set")},
    });

  }





}