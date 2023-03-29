import jet from "@randajan/jet-core";
import { chopEvents } from "../../uni/helpers/consts";
import { formatKey } from "../../uni/helpers/tools";
import vault from "../../uni/helpers/vault";
import { asyncMap } from "../helpers/map";

const { solid, virtual } = jet.prop;

const run = async (handlers, ...args) => {
  if (!handlers) { return; }
  for (const cb of handlers) {
    await cb(...args);
  }
}

export class ChopAsync extends jet.types.Plex {

  constructor(name, config = {}) {
    const { stream, loader, parent, childName } = Object.jet.to(config);
    const [uid, _p] = vault.set({
      state: "waiting",
      index: {},
      list: [],
      loader,
      stream: jet.isRunnable(stream) ? stream : _ => stream,
      handlers: {},
      chops: {}
    });

    _p.set = async (child, key, throwError = true) => {
      key = this.validateKey(key || child?.key, "set");

      if (_p.index.hasOwnProperty(key)) {
        if (throwError) { throw Error(this.msg(`set(...) failed - duplicate`, key)); }
        return;
      }

      await run(_p.handlers.beforeSet, this, child, key, throwError);
      _p.list.push(_p.index[key] = child);

      try { await run(_p.handlers.afterSet, this, child, key, throwError); }
      catch (err) {
        const id = _p.list.indexOf(child);
        if (id >= 0) {
          _p.list.splice(id, 1);
          delete _p.index[key];
          throw err;
        }
      }

      return child;
    }

    _p.remove = async (child, throwError = true) => {
      const key = this.validateKey(child?.key, "remove");
      const id = _p.list.indexOf(child);

      if (id < 0) {
        if (throwError) { throw Error(this.msg(`remove(...) failed - missing`, key)); }
        return false;
      }

      await run(_p.handlers.beforeRemove, this, child, throwError);
      _p.list.splice(id, 1);
      delete _p.index[key];
      try { await run(_p.handlers.afterRemove, this, child, throwError); } catch (err) {
        _p.list.push(_p.index[key] = child);
        throw err;
      }

      return true;
    }

    super((...args) => this.get(...args));

    solid.all(this, {
      uid,
      parent
    }, false);

    solid.all(this, {
      name,
      childName: String.jet.to(childName) || String.jet.to(parent?.childName) || "key"
    })

    virtual.all(this, {
      state: _ => _p.state,
      count: this.afterInit(_ => _p.list.length)
    });

    virtual.all(this, {
      index: this.afterInit(_ => ({ ..._p.index })),
      list: this.afterInit(_ => ([..._p.list])),
    }, false);

  }

  msg(text, key) {
    key = formatKey(key);
    return this.name + (key ? ` ${this.childName} '${key}' ` : " ") + text;
  }

  validateKey(key, action = "format") {
    if (key = formatKey(key)) { return key; }
    throw Error(this.msg(`${action}(...) failed - key undefined`));
  }

  on(event, callback) {
    if (!chopEvents.includes(event)) { throw Error(this.msg(`on(...) require one of event '${chopEvents.join(", ")}' but '${event}' provided`)); }
    if (!jet.isRunnable(callback)) { throw Error(this.msg(`on(...) require callback`)); }

    const { handlers } = vault.get(this.uid);
    const list = (handlers[event] || (handlers[event] = []));
    list.push(callback);

    return _ => {
      const x = list.indexOf(callback);
      if (x >= 0) { list.splice(x, 1); };
    }
  }

  async init(streamError = true) {
    const _p = vault.get(this.uid);
    if (_p.state === "waiting") {
      _p.build = (async _=>{
        _p.state = "pending";
        try {
          await run(_p.handlers.beforeInit, this, streamError);
          const data = await _p.stream();
          //if (Promise.jet.is(data)) { throw Error(this.msg(`init failed - promise found at sync`)); }
          await _p.loader(this, data, _p.set);
          await run(_p.handlers.afterInit, this, streamError);
          _p.state = "ready";
        } catch(error) {
          _p.errorAt = new Date();
          _p.error = error;
          _p.state = "error";
        }
        return this;
      })();
    }
    if (_p.state === "error") { throw _p.error; }

    return _p.build;
  }

  afterInit(execute) {
    return async (...args) => {
      await this.init();
      return execute(...args);
    }
  }

  async exist(key, missingError = false) {
    await this.init();
    key = formatKey(key);
    const { index } = vault.get(this.uid);
    if (index.hasOwnProperty(key)) { return true; }
    if (missingError) { throw Error(this.msg(`exist failed - missing key`, key)); }
    return false;
  }

  async get(key, missingError = true) {
    await this.init();
    key = formatKey(key);
    const { index } = vault.get(this.uid);
    const child = index[key];
    if (child) { return child; }
    if (missingError) { throw Error(this.msg(`get failed - missing key`, key)); }
  }

  addChop(name, checker) {
    const _p = vault.get(this.uid);
    name = formatKey(name);
    if (!name) { throw Error(this.msg(`addChop(...) failed - missing name`)); }

    return _p.chops[name] = new ChopAsync(name, {
      parent: this,
      loader: async (chop, data, set) => {
        await this.map(false, async child => await checker(child) && await set(child));
        this.on("afterSet", async (self, child, key, throwError) => await checker(child) && await set(child, key, throwError));
      }
    });

  }

  getChop(name, missingError = true) {
    name = formatKey(name);
    if (!name) { throw Error(this.msg(`getChop(...) failed - missing name`)); }
    const { chops } = vault.get(this.uid);
    const chop = chops[name];
    if (chop) { return chop; }
    if (missingError) { throw Error(this.msg(`getChop('${name}') failed - not found`)); }
  }

  async map(byIndex, callback, sort) {
    await this.init();
    return asyncMap(vault.get(this.uid).list, byIndex, callback, sort);
  }

  async filter(byIndex, checker, sort) {
    return this.map(byIndex, (child, i, count, stop) => {
      if (checker(child, i, count, stop)) { return child; }
    }, sort);
  }

  async find(checker, sort) {
    return this.map(false, (child, i, count, stop) => {
      if (checker(child, i, count, stop)) { return stop(child); }
    }, sort)[0];
  }

}

export default ChopAsync;