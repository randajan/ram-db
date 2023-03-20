import jet from "@randajan/jet-core";
import Collection from "./parts/Collection.js";
import Column from "./Column.js";

const columnTraits = {
  isPrimary:Boolean,
  isLabel:Boolean,
  isReadonly:Function,
  resetIf:Function,
  init:Function,
  formula:Function,
  ref:Function,
  separator:String,
  isVirtual:Boolean
};

const privateTraits = {
  isPrimary:"primary",
  isLabel:"label"
}

export default class Columns extends Collection {

    constructor(table, builder) {
      const _p = {};
      let _b; //bundle will be set by calling super

      const setPrivateTrait = (scheme, key, trait, val)=>{
        const prop = privateTraits[trait];
        Object.defineProperty(scheme, trait, {enumerable:true, get:_=>_p[prop] === key});
        if (!val) { return; }
        if (_p[prop]) { throw Error(this.msg(`${prop} column is allready set as '${_p[prop]}'`, key)); }
        _p[prop] = key;
      }

      const createMask = (key, getScheme)=>new Column(this, key, getScheme, columnTraits);
      const createScheme = (key, traits)=>{
        const scheme = {};
        traits = {...Object.jet.to(traits)};

        jet.forEach(columnTraits, (type, name)=>{
          const raw = traits[name];
          const val = (type !== Function || raw != null) ? type.jet.to(raw) : undefined;

          if (privateTraits[name]) { setPrivateTrait(scheme, key, name, val); }
          else { scheme[name] = val; }
          
          delete traits[name];
        });

        if (scheme.isVirtual && !scheme.formula) {
          throw Error(this.msg("virtual column require formula to be set", key));
        }

        const unknownTraits = Object.keys(traits);

        if (unknownTraits.length) {
          throw Error(this.msg(`unknown trait${unknownTraits.length > 1 ? "s" : ""} '${unknownTraits.join("', '")}'`, key));
        }

        return scheme;
      };

      const onInit = (key, traits)=>{

        const isArray = !Object.jet.is(key);
        
        jet.map(key, (value, id)=>{
          const objInArray = (isArray && Object.jet.is(value));
          const colKey = String.jet.to(objInArray ? (value.key || id) : isArray ? value : id);

          delete value.key;

          const colTraits = (isArray && !objInArray) ? traits : value;

          _b.set(colKey, colTraits);

        });

        if (!_b.count) { throw Error(this.msg("at least one column is required")); }
        if (!_p.primary) { _p.primary = _b.list[0].key; }
        if (!_p.label) { _p.label = _b.list[0].key; }

        return this;
      };

      const enumerable = true;

      super({
        isSync:true,
        createMask,
        createScheme,
        builder,
        onInit,
        bundleHook:bundle=>_b=bundle,
        getErrMsg:(type, key)=>this.msg(type === "isMissing" ? "is missing!" : "columns builder couldn't be asynchronous", key),
      },
      {
        table:{value:table},
        primary:{enumerable, get:_=>{ this.init(); return this.get(_p.primary); }},
        label:{enumerable, get:_=>{ this.init(); return this.get(_p.label); }},
      });
      
    }

    msg(text, key) {
      key = String.jet.to(key);
      return this.table.msg((key ? " column '"+key+"' " : "") + text);
    }
  
  }