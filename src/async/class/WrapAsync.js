import jet from "@randajan/jet-core";

const { solid, virtual } = jet.prop;

export class WrapAsync extends jet.types.Plex {

    static is(any) { return any instanceof WrapAsync; }

    static create(step) { return new WrapAsync(step); }
  
    constructor(step) {
      const { cols } = step.table;

      const get = (col, opt={ missingError:true })=>step.get(col, opt);

      super(get);

      solid.all(this, { get }, false);

      virtual.all(this, {
        key:_=>step.key,
        label:_=>step.label,
        before:_=>step.before.wrap,
        isExist:_=>step.isExist,
        isDirty:_=>step.isDirty,
        isRemoved:_=>step.isRemoved,
        raws:_=>({...step.raws}),
        vals:_=>cols.map(true, col=>step.pull(col, true)),
        changes:_=>([...step.changes])
      });
  
    }
  
    toJSON() {
      return this.key;
    }
  
    toString() {
      return this.key;
    }
  
  }
  
  
  export default WrapAsync;