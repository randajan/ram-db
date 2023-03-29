import jet from "@randajan/jet-core";

const { solid, virtual } = jet.prop;

export class WrapAsync extends jet.types.Plex {

    static is(any) { return any instanceof WrapAsync; }

    static create(step) { return new WrapAsync(step); }
  
    constructor(step) {
      const { cols } = step.table;

      const get = async (col, opt={ missingError:true })=>step.get(col, opt);

      super(get);

      solid.all(this, { get }, false);

      virtual.all(this, {
        key:async _=>step.key,
        label:async _=>step.label,
        before:_=>step.before.wrap,
        isExist:async _=>step.isExist,
        isDirty:async _=>step.isDirty,
        isRemoved:_=>step.isRemoved,
        raws:_=>({...step.raws}),
        vals:async _=>cols.map(true, async col=>await step.pull(col, true)),
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