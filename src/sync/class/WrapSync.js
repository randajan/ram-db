import jet from "@randajan/jet-core";

const { solid, virtual } = jet.prop;

export class WrapSync extends jet.types.Plex {

    static is(any) { return any instanceof WrapSync; }

    static create(step) { return new WrapSync(step); }
  
    constructor(step) {
      const { rows, cols } = step.table;

      const get = (col, opt={ autoRef:true, missingError:true })=>step.get(col, opt);

      super(get);

      solid.all(this, { get }, false);

      virtual.all(this, {
        key:_=>step.key,
        label:_=>step.pull(cols.label, false),
        before:_=>step.before.wrap,
        isExist:_=>rows.exist(step.key),
        isDirty:_=>!!step.changes.length,
        raws:_=>({...step.raws}),
        vals:_=>cols.map(col=>step.pull(col, true)),
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
  
  
  export default WrapSync;