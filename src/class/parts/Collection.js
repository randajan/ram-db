import jet from "@randajan/jet-core";
import Bundle from "./Bundle.js";

export default class Collection extends jet.types.Plex {

    constructor({ isSync, createMask, createScheme, builder, onInit, getErrMsg, bundleHook }, customDescriptors) {
      const _p = {
        state:"waiting",
        masks:{},
        scheme:{}
      };

      const init = isSync ? _=>{
        if (_p.state !== "waiting") { return; }
        _p.state = "pending";
        const buildResult = jet.isRunnable(builder) ? builder(this, onInit) : onInit(builder);
        if (Promise.jet.is(buildResult)) { throw Error(getErrMsg("isAssync")); }
        _p.state = "ready";
      } : async _=>{
        if (_p.state === "ready") { return }
        if (_p.state === "waiting") {
          _p.state = "pending";
          _p.buildProcess = (async _=>{
            if (!jet.isRunnable(builder)) { await onInit(builder); }
            else { await builder(this, onInit); }
            _p.state = "ready";
          })();
        };
        await _p.buildProcess;
      }

      const _getScheme = (key, missingError=true, autoCreate=false)=>{
        if (!_p.scheme[key] && autoCreate) { _b.set(key); }
        if (_p.scheme[key]) { return _p.scheme[key]; }
        if (missingError) { throw Error(getErrMsg("isMissing", key)); }
      }

      const getScheme = isSync ? (key, missingError=true, autoCreate=false)=>{
        init(); return _getScheme(key, missingError, autoCreate);
      } : async (key, missingError=true, autoCreate=false)=>{
        await init(); return _getScheme(key, missingError, autoCreate);
      }

      const getMask = key=>{
        key = String.jet.to(key);
        if (_p.masks[key]) { return _p.masks[key]; }
        const mask = createMask(key, getScheme);
        if (key) { _p.masks[key] = mask; }
        return mask;
      };

      const map = isSync ? (byIndex, callback, sort)=>{
        init();
        return _b.mapSync(byIndex, callback, sort);
      } : async (byIndex, callback, sort)=>{
        await init();
        return _b.mapSync(byIndex, callback, sort);
      }

      const find = isSync ? (checker, sort)=>{
        return _b.findSync(checker, sort);
      } : async (checker, sort)=>{
        return _b.findAsync(checker, sort);
      };

      super(getMask);

      const _b = new Bundle(getMask, (_b, event, key, ...args)=>{
        if (event === "remove") { delete _p.scheme[key]; }
        else if (event === "set") { _p.scheme[key] = createScheme(key, ...args); }
      });
      
      const enumerable = true;
      Object.defineProperties(this, {
        ...customDescriptors,
        get:{value:getMask},

        state:{enumerable, get:_=>_p.state},
        init:{enumerable, value:init},

        index:{enumerable, get:isSync ? _=>{ init(); return {..._b.index}; } : async _=>{ await init(); return {..._b.index}; }},
        list:{enumerable, get:isSync ? _=>{ init(); return [..._b.list]; } : async _=>{ await init(); return [..._b.list]; }},
        count:{enumerable, get:isSync ? _=>{ init(); return _b.count; } : async _=>{ await init(); return _b.count; }},

        exist:{value:isSync ? key=>{ init(); return _b.exist(key); } : async key=>{ await init(); return _b.exist(key); }},
        map:{value: (callback, sort)=>map(true, callback, sort)},
        forEach:{value: (callback, sort)=>map(false, callback, sort)},
        find:{ value:find },
        findAsync:{ value:_b.findAsync.bind(_b) }
      });

      bundleHook(_b);
      
    }
  
  }