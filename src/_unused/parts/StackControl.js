import jet from "@randajan/jet-core";


export default class StackControl extends jet.types.Plex {

    static create (getHash) {
      return new StackControl(getHash);
    }
  
    constructor(getHash) {
      const _index = {};
      let _length = 0;
  
      getHash = jet.isRunnable(getHash) ? getHash : (...a)=>a.join(":");
  
      const factory = f=>(...a)=>f(getHash(...a));
  
      const has = h=>!!_index[h];
      const set = h=>{
        console.log("set", h);
        const r = (result, ifLast)=>{
          if (r.ok) { delete _index[h]; _length --; }
          if (!_length && ifLast) { ifLast(); }
          console.log("unset", h);
          return result;
        }
  
        if (r.ok = !has(h)) {
          _index[h] = true;
          r.id = _length ++;
        }
        
        return r;
      };
  
      super(factory(set));
  
      Object.defineProperty(this, "has", {value:factory(has)});
    }
  }