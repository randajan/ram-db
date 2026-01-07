(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value2) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value: value2 }) : obj[key] = value2;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value2) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value2);
    return value2;
  };

  // <define:__slib_info>
  var define_slib_info_default;
  var init_define_slib_info = __esm({
    "<define:__slib_info>"() {
      define_slib_info_default = { isServer: false, isBuild: false, name: "@randajan/ram-db", description: "Realtime database", version: "2.8.12", author: { name: "Jan Randa", email: "jnranda@gmail.com", url: "https://www.linkedin.com/in/randajan/" }, env: "development", mode: "web", port: 3005, dir: { root: "C:\\dev\\lib\\ram-db", dist: "demo/frontend/dist" } };
    }
  });

  // node_modules/regex-parser/lib/index.js
  var require_lib = __commonJS({
    "node_modules/regex-parser/lib/index.js"(exports, module) {
      "use strict";
      init_define_slib_info();
      var RegexParser = module.exports = function(input) {
        if (typeof input !== "string") {
          throw new Error("Invalid input. Input must be a string");
        }
        var m = input.match(/(\/?)(.+)\1([a-z]*)/i);
        if (!m) {
          throw new Error("Invalid regular expression format.");
        }
        var validFlags = Array.from(new Set(m[3])).filter(function(flag) {
          return "gimsuy".includes(flag);
        }).join("");
        return new RegExp(m[2], validFlags);
      };
    }
  });

  // demo/frontend/src/index.js
  init_define_slib_info();

  // node_modules/@randajan/simple-lib/dist/web/index.js
  init_define_slib_info();

  // node_modules/@randajan/simple-lib/dist/chunk-JLCKRPTS.js
  init_define_slib_info();

  // node_modules/chalk/source/index.js
  init_define_slib_info();

  // node_modules/chalk/source/vendor/ansi-styles/index.js
  init_define_slib_info();
  var ANSI_BACKGROUND_OFFSET = 10;
  var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
  var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
  var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
  var styles = {
    modifier: {
      reset: [0, 0],
      // 21 isn't widely supported and 22 does the same thing
      bold: [1, 22],
      dim: [2, 22],
      italic: [3, 23],
      underline: [4, 24],
      overline: [53, 55],
      inverse: [7, 27],
      hidden: [8, 28],
      strikethrough: [9, 29]
    },
    color: {
      black: [30, 39],
      red: [31, 39],
      green: [32, 39],
      yellow: [33, 39],
      blue: [34, 39],
      magenta: [35, 39],
      cyan: [36, 39],
      white: [37, 39],
      // Bright color
      blackBright: [90, 39],
      gray: [90, 39],
      // Alias of `blackBright`
      grey: [90, 39],
      // Alias of `blackBright`
      redBright: [91, 39],
      greenBright: [92, 39],
      yellowBright: [93, 39],
      blueBright: [94, 39],
      magentaBright: [95, 39],
      cyanBright: [96, 39],
      whiteBright: [97, 39]
    },
    bgColor: {
      bgBlack: [40, 49],
      bgRed: [41, 49],
      bgGreen: [42, 49],
      bgYellow: [43, 49],
      bgBlue: [44, 49],
      bgMagenta: [45, 49],
      bgCyan: [46, 49],
      bgWhite: [47, 49],
      // Bright color
      bgBlackBright: [100, 49],
      bgGray: [100, 49],
      // Alias of `bgBlackBright`
      bgGrey: [100, 49],
      // Alias of `bgBlackBright`
      bgRedBright: [101, 49],
      bgGreenBright: [102, 49],
      bgYellowBright: [103, 49],
      bgBlueBright: [104, 49],
      bgMagentaBright: [105, 49],
      bgCyanBright: [106, 49],
      bgWhiteBright: [107, 49]
    }
  };
  var modifierNames = Object.keys(styles.modifier);
  var foregroundColorNames = Object.keys(styles.color);
  var backgroundColorNames = Object.keys(styles.bgColor);
  var colorNames = [...foregroundColorNames, ...backgroundColorNames];
  function assembleStyles() {
    const codes = /* @__PURE__ */ new Map();
    for (const [groupName, group] of Object.entries(styles)) {
      for (const [styleName, style] of Object.entries(group)) {
        styles[styleName] = {
          open: `\x1B[${style[0]}m`,
          close: `\x1B[${style[1]}m`
        };
        group[styleName] = styles[styleName];
        codes.set(style[0], style[1]);
      }
      Object.defineProperty(styles, groupName, {
        value: group,
        enumerable: false
      });
    }
    Object.defineProperty(styles, "codes", {
      value: codes,
      enumerable: false
    });
    styles.color.close = "\x1B[39m";
    styles.bgColor.close = "\x1B[49m";
    styles.color.ansi = wrapAnsi16();
    styles.color.ansi256 = wrapAnsi256();
    styles.color.ansi16m = wrapAnsi16m();
    styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
    styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
    styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
    Object.defineProperties(styles, {
      rgbToAnsi256: {
        value(red, green, blue) {
          if (red === green && green === blue) {
            if (red < 8) {
              return 16;
            }
            if (red > 248) {
              return 231;
            }
            return Math.round((red - 8) / 247 * 24) + 232;
          }
          return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
        },
        enumerable: false
      },
      hexToRgb: {
        value(hex) {
          const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
          if (!matches) {
            return [0, 0, 0];
          }
          let [colorString] = matches;
          if (colorString.length === 3) {
            colorString = [...colorString].map((character) => character + character).join("");
          }
          const integer = Number.parseInt(colorString, 16);
          return [
            /* eslint-disable no-bitwise */
            integer >> 16 & 255,
            integer >> 8 & 255,
            integer & 255
            /* eslint-enable no-bitwise */
          ];
        },
        enumerable: false
      },
      hexToAnsi256: {
        value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
        enumerable: false
      },
      ansi256ToAnsi: {
        value(code) {
          if (code < 8) {
            return 30 + code;
          }
          if (code < 16) {
            return 90 + (code - 8);
          }
          let red;
          let green;
          let blue;
          if (code >= 232) {
            red = ((code - 232) * 10 + 8) / 255;
            green = red;
            blue = red;
          } else {
            code -= 16;
            const remainder = code % 36;
            red = Math.floor(code / 36) / 5;
            green = Math.floor(remainder / 6) / 5;
            blue = remainder % 6 / 5;
          }
          const value2 = Math.max(red, green, blue) * 2;
          if (value2 === 0) {
            return 30;
          }
          let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
          if (value2 === 2) {
            result += 60;
          }
          return result;
        },
        enumerable: false
      },
      rgbToAnsi: {
        value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
        enumerable: false
      },
      hexToAnsi: {
        value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
        enumerable: false
      }
    });
    return styles;
  }
  var ansiStyles = assembleStyles();
  var ansi_styles_default = ansiStyles;

  // node_modules/chalk/source/vendor/supports-color/browser.js
  init_define_slib_info();
  var level = (() => {
    if (navigator.userAgentData) {
      const brand = navigator.userAgentData.brands.find(({ brand: brand2 }) => brand2 === "Chromium");
      if (brand && brand.version > 93) {
        return 3;
      }
    }
    if (/\b(Chrome|Chromium)\//.test(navigator.userAgent)) {
      return 1;
    }
    return 0;
  })();
  var colorSupport = level !== 0 && {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
  var supportsColor = {
    stdout: colorSupport,
    stderr: colorSupport
  };
  var browser_default = supportsColor;

  // node_modules/chalk/source/utilities.js
  init_define_slib_info();
  function stringReplaceAll(string, substring, replacer) {
    let index = string.indexOf(substring);
    if (index === -1) {
      return string;
    }
    const substringLength = substring.length;
    let endIndex = 0;
    let returnValue = "";
    do {
      returnValue += string.slice(endIndex, index) + substring + replacer;
      endIndex = index + substringLength;
      index = string.indexOf(substring, endIndex);
    } while (index !== -1);
    returnValue += string.slice(endIndex);
    return returnValue;
  }
  function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
    let endIndex = 0;
    let returnValue = "";
    do {
      const gotCR = string[index - 1] === "\r";
      returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
      endIndex = index + 1;
      index = string.indexOf("\n", endIndex);
    } while (index !== -1);
    returnValue += string.slice(endIndex);
    return returnValue;
  }

  // node_modules/chalk/source/index.js
  var { stdout: stdoutColor, stderr: stderrColor } = browser_default;
  var GENERATOR = Symbol("GENERATOR");
  var STYLER = Symbol("STYLER");
  var IS_EMPTY = Symbol("IS_EMPTY");
  var levelMapping = [
    "ansi",
    "ansi",
    "ansi256",
    "ansi16m"
  ];
  var styles2 = /* @__PURE__ */ Object.create(null);
  var applyOptions = (object, options = {}) => {
    if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
      throw new Error("The `level` option should be an integer from 0 to 3");
    }
    const colorLevel = stdoutColor ? stdoutColor.level : 0;
    object.level = options.level === void 0 ? colorLevel : options.level;
  };
  var chalkFactory = (options) => {
    const chalk2 = (...strings) => strings.join(" ");
    applyOptions(chalk2, options);
    Object.setPrototypeOf(chalk2, createChalk.prototype);
    return chalk2;
  };
  function createChalk(options) {
    return chalkFactory(options);
  }
  Object.setPrototypeOf(createChalk.prototype, Function.prototype);
  for (const [styleName, style] of Object.entries(ansi_styles_default)) {
    styles2[styleName] = {
      get() {
        const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
        Object.defineProperty(this, styleName, { value: builder });
        return builder;
      }
    };
  }
  styles2.visible = {
    get() {
      const builder = createBuilder(this, this[STYLER], true);
      Object.defineProperty(this, "visible", { value: builder });
      return builder;
    }
  };
  var getModelAnsi = (model, level2, type, ...arguments_) => {
    if (model === "rgb") {
      if (level2 === "ansi16m") {
        return ansi_styles_default[type].ansi16m(...arguments_);
      }
      if (level2 === "ansi256") {
        return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
      }
      return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
    }
    if (model === "hex") {
      return getModelAnsi("rgb", level2, type, ...ansi_styles_default.hexToRgb(...arguments_));
    }
    return ansi_styles_default[type][model](...arguments_);
  };
  var usedModels = ["rgb", "hex", "ansi256"];
  for (const model of usedModels) {
    styles2[model] = {
      get() {
        const { level: level2 } = this;
        return function(...arguments_) {
          const styler = createStyler(getModelAnsi(model, levelMapping[level2], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
          return createBuilder(this, styler, this[IS_EMPTY]);
        };
      }
    };
    const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
    styles2[bgModel] = {
      get() {
        const { level: level2 } = this;
        return function(...arguments_) {
          const styler = createStyler(getModelAnsi(model, levelMapping[level2], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
          return createBuilder(this, styler, this[IS_EMPTY]);
        };
      }
    };
  }
  var proto = Object.defineProperties(() => {
  }, {
    ...styles2,
    level: {
      enumerable: true,
      get() {
        return this[GENERATOR].level;
      },
      set(level2) {
        this[GENERATOR].level = level2;
      }
    }
  });
  var createStyler = (open, close, parent) => {
    let openAll;
    let closeAll;
    if (parent === void 0) {
      openAll = open;
      closeAll = close;
    } else {
      openAll = parent.openAll + open;
      closeAll = close + parent.closeAll;
    }
    return {
      open,
      close,
      openAll,
      closeAll,
      parent
    };
  };
  var createBuilder = (self2, _styler, _isEmpty) => {
    const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
    Object.setPrototypeOf(builder, proto);
    builder[GENERATOR] = self2;
    builder[STYLER] = _styler;
    builder[IS_EMPTY] = _isEmpty;
    return builder;
  };
  var applyStyle = (self2, string) => {
    if (self2.level <= 0 || !string) {
      return self2[IS_EMPTY] ? "" : string;
    }
    let styler = self2[STYLER];
    if (styler === void 0) {
      return string;
    }
    const { openAll, closeAll } = styler;
    if (string.includes("\x1B")) {
      while (styler !== void 0) {
        string = stringReplaceAll(string, styler.close, styler.open);
        styler = styler.parent;
      }
    }
    const lfIndex = string.indexOf("\n");
    if (lfIndex !== -1) {
      string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
    }
    return openAll + string + closeAll;
  };
  Object.defineProperties(createChalk.prototype, styles2);
  var chalk = createChalk();
  var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
  var source_default = chalk;

  // node_modules/@randajan/simple-lib/dist/chunk-JLCKRPTS.js
  var chalkProps = Object.getOwnPropertyNames(Object.getPrototypeOf(source_default)).filter((v) => v !== "constructor");
  var Logger = class extends Function {
    constructor(formater, chalkInit) {
      super();
      const chalk2 = chalkInit || source_default;
      const log2 = (...msgs) => {
        console.log(chalk2(formater(msgs)));
      };
      const self2 = Object.setPrototypeOf(log2.bind(), new.target.prototype);
      for (const prop of chalkProps) {
        Object.defineProperty(self2, prop, { get: (_) => new Logger(formater, chalk2[prop]), enumerable: false });
      }
      return self2;
    }
  };
  var logger = (...prefixes) => {
    const now = (_) => new Date().toLocaleTimeString("cs-CZ");
    prefixes = prefixes.filter((v) => !!v).join(" ");
    return new Logger((msgs) => `${prefixes} | ${now()} | ${msgs.join(" ")}`);
  };

  // node_modules/@randajan/simple-lib/dist/chunk-XM4YD4K6.js
  init_define_slib_info();
  var enumerable = true;
  var lockObject = (o) => {
    if (typeof o !== "object") {
      return o;
    }
    const r = {};
    for (const i2 in o) {
      const descriptor = { enumerable };
      let val = o[i2];
      if (val instanceof Array) {
        descriptor.get = (_) => [...val];
      } else {
        descriptor.value = lockObject(val);
      }
      Object.defineProperty(r, i2, descriptor);
    }
    return r;
  };
  var info = lockObject(define_slib_info_default);

  // node_modules/@randajan/simple-lib/dist/web/index.js
  var log = logger(info.name, info.version, info.env);

  // node_modules/socket.io-client/build/esm/index.js
  init_define_slib_info();

  // node_modules/socket.io-client/build/esm/url.js
  init_define_slib_info();

  // node_modules/engine.io-client/build/esm/index.js
  init_define_slib_info();

  // node_modules/engine.io-client/build/esm/socket.js
  init_define_slib_info();

  // node_modules/engine.io-client/build/esm/transports/index.js
  init_define_slib_info();

  // node_modules/engine.io-client/build/esm/transports/polling-xhr.js
  init_define_slib_info();

  // node_modules/engine.io-client/build/esm/transports/polling.js
  init_define_slib_info();

  // node_modules/engine.io-client/build/esm/transport.js
  init_define_slib_info();

  // node_modules/engine.io-parser/build/esm/index.js
  init_define_slib_info();

  // node_modules/engine.io-parser/build/esm/encodePacket.browser.js
  init_define_slib_info();

  // node_modules/engine.io-parser/build/esm/commons.js
  init_define_slib_info();
  var PACKET_TYPES = /* @__PURE__ */ Object.create(null);
  PACKET_TYPES["open"] = "0";
  PACKET_TYPES["close"] = "1";
  PACKET_TYPES["ping"] = "2";
  PACKET_TYPES["pong"] = "3";
  PACKET_TYPES["message"] = "4";
  PACKET_TYPES["upgrade"] = "5";
  PACKET_TYPES["noop"] = "6";
  var PACKET_TYPES_REVERSE = /* @__PURE__ */ Object.create(null);
  Object.keys(PACKET_TYPES).forEach((key) => {
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
  });
  var ERROR_PACKET = { type: "error", data: "parser error" };

  // node_modules/engine.io-parser/build/esm/encodePacket.browser.js
  var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
  var withNativeArrayBuffer = typeof ArrayBuffer === "function";
  var isView = (obj) => {
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
  };
  var encodePacket = ({ type, data }, supportsBinary, callback) => {
    if (withNativeBlob && data instanceof Blob) {
      if (supportsBinary) {
        return callback(data);
      } else {
        return encodeBlobAsBase64(data, callback);
      }
    } else if (withNativeArrayBuffer && (data instanceof ArrayBuffer || isView(data))) {
      if (supportsBinary) {
        return callback(data);
      } else {
        return encodeBlobAsBase64(new Blob([data]), callback);
      }
    }
    return callback(PACKET_TYPES[type] + (data || ""));
  };
  var encodeBlobAsBase64 = (data, callback) => {
    const fileReader = new FileReader();
    fileReader.onload = function() {
      const content = fileReader.result.split(",")[1];
      callback("b" + (content || ""));
    };
    return fileReader.readAsDataURL(data);
  };
  function toArray(data) {
    if (data instanceof Uint8Array) {
      return data;
    } else if (data instanceof ArrayBuffer) {
      return new Uint8Array(data);
    } else {
      return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    }
  }
  var TEXT_ENCODER;
  function encodePacketToBinary(packet, callback) {
    if (withNativeBlob && packet.data instanceof Blob) {
      return packet.data.arrayBuffer().then(toArray).then(callback);
    } else if (withNativeArrayBuffer && (packet.data instanceof ArrayBuffer || isView(packet.data))) {
      return callback(toArray(packet.data));
    }
    encodePacket(packet, false, (encoded) => {
      if (!TEXT_ENCODER) {
        TEXT_ENCODER = new TextEncoder();
      }
      callback(TEXT_ENCODER.encode(encoded));
    });
  }

  // node_modules/engine.io-parser/build/esm/decodePacket.browser.js
  init_define_slib_info();

  // node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js
  init_define_slib_info();
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
  for (let i2 = 0; i2 < chars.length; i2++) {
    lookup[chars.charCodeAt(i2)] = i2;
  }
  var decode = (base64) => {
    let bufferLength = base64.length * 0.75, len = base64.length, i2, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }
    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for (i2 = 0; i2 < len; i2 += 4) {
      encoded1 = lookup[base64.charCodeAt(i2)];
      encoded2 = lookup[base64.charCodeAt(i2 + 1)];
      encoded3 = lookup[base64.charCodeAt(i2 + 2)];
      encoded4 = lookup[base64.charCodeAt(i2 + 3)];
      bytes[p++] = encoded1 << 2 | encoded2 >> 4;
      bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
      bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return arraybuffer;
  };

  // node_modules/engine.io-parser/build/esm/decodePacket.browser.js
  var withNativeArrayBuffer2 = typeof ArrayBuffer === "function";
  var decodePacket = (encodedPacket, binaryType) => {
    if (typeof encodedPacket !== "string") {
      return {
        type: "message",
        data: mapBinary(encodedPacket, binaryType)
      };
    }
    const type = encodedPacket.charAt(0);
    if (type === "b") {
      return {
        type: "message",
        data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
      };
    }
    const packetType = PACKET_TYPES_REVERSE[type];
    if (!packetType) {
      return ERROR_PACKET;
    }
    return encodedPacket.length > 1 ? {
      type: PACKET_TYPES_REVERSE[type],
      data: encodedPacket.substring(1)
    } : {
      type: PACKET_TYPES_REVERSE[type]
    };
  };
  var decodeBase64Packet = (data, binaryType) => {
    if (withNativeArrayBuffer2) {
      const decoded = decode(data);
      return mapBinary(decoded, binaryType);
    } else {
      return { base64: true, data };
    }
  };
  var mapBinary = (data, binaryType) => {
    switch (binaryType) {
      case "blob":
        if (data instanceof Blob) {
          return data;
        } else {
          return new Blob([data]);
        }
      case "arraybuffer":
      default:
        if (data instanceof ArrayBuffer) {
          return data;
        } else {
          return data.buffer;
        }
    }
  };

  // node_modules/engine.io-parser/build/esm/index.js
  var SEPARATOR = String.fromCharCode(30);
  var encodePayload = (packets, callback) => {
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;
    packets.forEach((packet, i2) => {
      encodePacket(packet, false, (encodedPacket) => {
        encodedPackets[i2] = encodedPacket;
        if (++count === length) {
          callback(encodedPackets.join(SEPARATOR));
        }
      });
    });
  };
  var decodePayload = (encodedPayload, binaryType) => {
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for (let i2 = 0; i2 < encodedPackets.length; i2++) {
      const decodedPacket = decodePacket(encodedPackets[i2], binaryType);
      packets.push(decodedPacket);
      if (decodedPacket.type === "error") {
        break;
      }
    }
    return packets;
  };
  function createPacketEncoderStream() {
    return new TransformStream({
      transform(packet, controller) {
        encodePacketToBinary(packet, (encodedPacket) => {
          const payloadLength = encodedPacket.length;
          let header;
          if (payloadLength < 126) {
            header = new Uint8Array(1);
            new DataView(header.buffer).setUint8(0, payloadLength);
          } else if (payloadLength < 65536) {
            header = new Uint8Array(3);
            const view = new DataView(header.buffer);
            view.setUint8(0, 126);
            view.setUint16(1, payloadLength);
          } else {
            header = new Uint8Array(9);
            const view = new DataView(header.buffer);
            view.setUint8(0, 127);
            view.setBigUint64(1, BigInt(payloadLength));
          }
          if (packet.data && typeof packet.data !== "string") {
            header[0] |= 128;
          }
          controller.enqueue(header);
          controller.enqueue(encodedPacket);
        });
      }
    });
  }
  var TEXT_DECODER;
  function totalLength(chunks) {
    return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  }
  function concatChunks(chunks, size) {
    if (chunks[0].length === size) {
      return chunks.shift();
    }
    const buffer = new Uint8Array(size);
    let j = 0;
    for (let i2 = 0; i2 < size; i2++) {
      buffer[i2] = chunks[0][j++];
      if (j === chunks[0].length) {
        chunks.shift();
        j = 0;
      }
    }
    if (chunks.length && j < chunks[0].length) {
      chunks[0] = chunks[0].slice(j);
    }
    return buffer;
  }
  function createPacketDecoderStream(maxPayload, binaryType) {
    if (!TEXT_DECODER) {
      TEXT_DECODER = new TextDecoder();
    }
    const chunks = [];
    let state = 0;
    let expectedLength = -1;
    let isBinary2 = false;
    return new TransformStream({
      transform(chunk, controller) {
        chunks.push(chunk);
        while (true) {
          if (state === 0) {
            if (totalLength(chunks) < 1) {
              break;
            }
            const header = concatChunks(chunks, 1);
            isBinary2 = (header[0] & 128) === 128;
            expectedLength = header[0] & 127;
            if (expectedLength < 126) {
              state = 3;
            } else if (expectedLength === 126) {
              state = 1;
            } else {
              state = 2;
            }
          } else if (state === 1) {
            if (totalLength(chunks) < 2) {
              break;
            }
            const headerArray = concatChunks(chunks, 2);
            expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
            state = 3;
          } else if (state === 2) {
            if (totalLength(chunks) < 8) {
              break;
            }
            const headerArray = concatChunks(chunks, 8);
            const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
            const n = view.getUint32(0);
            if (n > Math.pow(2, 53 - 32) - 1) {
              controller.enqueue(ERROR_PACKET);
              break;
            }
            expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
            state = 3;
          } else {
            if (totalLength(chunks) < expectedLength) {
              break;
            }
            const data = concatChunks(chunks, expectedLength);
            controller.enqueue(decodePacket(isBinary2 ? data : TEXT_DECODER.decode(data), binaryType));
            state = 0;
          }
          if (expectedLength === 0 || expectedLength > maxPayload) {
            controller.enqueue(ERROR_PACKET);
            break;
          }
        }
      }
    });
  }
  var protocol = 4;

  // node_modules/@socket.io/component-emitter/lib/esm/index.js
  init_define_slib_info();
  function Emitter(obj) {
    if (obj)
      return mixin(obj);
  }
  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }
    return obj;
  }
  Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
    return this;
  };
  Emitter.prototype.once = function(event, fn) {
    function on2() {
      this.off(event, on2);
      fn.apply(this, arguments);
    }
    on2.fn = fn;
    this.on(event, on2);
    return this;
  };
  Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    }
    var callbacks = this._callbacks["$" + event];
    if (!callbacks)
      return this;
    if (1 == arguments.length) {
      delete this._callbacks["$" + event];
      return this;
    }
    var cb;
    for (var i2 = 0; i2 < callbacks.length; i2++) {
      cb = callbacks[i2];
      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i2, 1);
        break;
      }
    }
    if (callbacks.length === 0) {
      delete this._callbacks["$" + event];
    }
    return this;
  };
  Emitter.prototype.emit = function(event) {
    this._callbacks = this._callbacks || {};
    var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
    for (var i2 = 1; i2 < arguments.length; i2++) {
      args[i2 - 1] = arguments[i2];
    }
    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i2 = 0, len = callbacks.length; i2 < len; ++i2) {
        callbacks[i2].apply(this, args);
      }
    }
    return this;
  };
  Emitter.prototype.emitReserved = Emitter.prototype.emit;
  Emitter.prototype.listeners = function(event) {
    this._callbacks = this._callbacks || {};
    return this._callbacks["$" + event] || [];
  };
  Emitter.prototype.hasListeners = function(event) {
    return !!this.listeners(event).length;
  };

  // node_modules/engine.io-client/build/esm/util.js
  init_define_slib_info();

  // node_modules/engine.io-client/build/esm/globals.js
  init_define_slib_info();
  var nextTick = (() => {
    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) {
      return (cb) => Promise.resolve().then(cb);
    } else {
      return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
    }
  })();
  var globalThisShim = (() => {
    if (typeof self !== "undefined") {
      return self;
    } else if (typeof window !== "undefined") {
      return window;
    } else {
      return Function("return this")();
    }
  })();
  var defaultBinaryType = "arraybuffer";
  function createCookieJar() {
  }

  // node_modules/engine.io-client/build/esm/util.js
  function pick(obj, ...attr) {
    return attr.reduce((acc, k) => {
      if (obj.hasOwnProperty(k)) {
        acc[k] = obj[k];
      }
      return acc;
    }, {});
  }
  var NATIVE_SET_TIMEOUT = globalThisShim.setTimeout;
  var NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
  function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
      obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
      obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
    } else {
      obj.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim);
      obj.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim);
    }
  }
  var BASE64_OVERHEAD = 1.33;
  function byteLength(obj) {
    if (typeof obj === "string") {
      return utf8Length(obj);
    }
    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
  }
  function utf8Length(str) {
    let c = 0, length = 0;
    for (let i2 = 0, l = str.length; i2 < l; i2++) {
      c = str.charCodeAt(i2);
      if (c < 128) {
        length += 1;
      } else if (c < 2048) {
        length += 2;
      } else if (c < 55296 || c >= 57344) {
        length += 3;
      } else {
        i2++;
        length += 4;
      }
    }
    return length;
  }
  function randomString() {
    return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
  }

  // node_modules/engine.io-client/build/esm/contrib/parseqs.js
  init_define_slib_info();
  function encode(obj) {
    let str = "";
    for (let i2 in obj) {
      if (obj.hasOwnProperty(i2)) {
        if (str.length)
          str += "&";
        str += encodeURIComponent(i2) + "=" + encodeURIComponent(obj[i2]);
      }
    }
    return str;
  }
  function decode2(qs) {
    let qry = {};
    let pairs = qs.split("&");
    for (let i2 = 0, l = pairs.length; i2 < l; i2++) {
      let pair = pairs[i2].split("=");
      qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
  }

  // node_modules/engine.io-client/build/esm/transport.js
  var TransportError = class extends Error {
    constructor(reason, description, context) {
      super(reason);
      this.description = description;
      this.context = context;
      this.type = "TransportError";
    }
  };
  var Transport = class extends Emitter {
    /**
     * Transport abstract constructor.
     *
     * @param {Object} opts - options
     * @protected
     */
    constructor(opts) {
      super();
      this.writable = false;
      installTimerFunctions(this, opts);
      this.opts = opts;
      this.query = opts.query;
      this.socket = opts.socket;
      this.supportsBinary = !opts.forceBase64;
    }
    /**
     * Emits an error.
     *
     * @param {String} reason
     * @param description
     * @param context - the error context
     * @return {Transport} for chaining
     * @protected
     */
    onError(reason, description, context) {
      super.emitReserved("error", new TransportError(reason, description, context));
      return this;
    }
    /**
     * Opens the transport.
     */
    open() {
      this.readyState = "opening";
      this.doOpen();
      return this;
    }
    /**
     * Closes the transport.
     */
    close() {
      if (this.readyState === "opening" || this.readyState === "open") {
        this.doClose();
        this.onClose();
      }
      return this;
    }
    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     */
    send(packets) {
      if (this.readyState === "open") {
        this.write(packets);
      } else {
      }
    }
    /**
     * Called upon open
     *
     * @protected
     */
    onOpen() {
      this.readyState = "open";
      this.writable = true;
      super.emitReserved("open");
    }
    /**
     * Called with data.
     *
     * @param {String} data
     * @protected
     */
    onData(data) {
      const packet = decodePacket(data, this.socket.binaryType);
      this.onPacket(packet);
    }
    /**
     * Called with a decoded packet.
     *
     * @protected
     */
    onPacket(packet) {
      super.emitReserved("packet", packet);
    }
    /**
     * Called upon close.
     *
     * @protected
     */
    onClose(details) {
      this.readyState = "closed";
      super.emitReserved("close", details);
    }
    /**
     * Pauses the transport, in order not to lose packets during an upgrade.
     *
     * @param onPause
     */
    pause(onPause) {
    }
    createUri(schema, query = {}) {
      return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
    }
    _hostname() {
      const hostname = this.opts.hostname;
      return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
    }
    _port() {
      if (this.opts.port && (this.opts.secure && Number(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80)) {
        return ":" + this.opts.port;
      } else {
        return "";
      }
    }
    _query(query) {
      const encodedQuery = encode(query);
      return encodedQuery.length ? "?" + encodedQuery : "";
    }
  };

  // node_modules/engine.io-client/build/esm/transports/polling.js
  var Polling = class extends Transport {
    constructor() {
      super(...arguments);
      this._polling = false;
    }
    get name() {
      return "polling";
    }
    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @protected
     */
    doOpen() {
      this._poll();
    }
    /**
     * Pauses polling.
     *
     * @param {Function} onPause - callback upon buffers are flushed and transport is paused
     * @package
     */
    pause(onPause) {
      this.readyState = "pausing";
      const pause = () => {
        this.readyState = "paused";
        onPause();
      };
      if (this._polling || !this.writable) {
        let total = 0;
        if (this._polling) {
          total++;
          this.once("pollComplete", function() {
            --total || pause();
          });
        }
        if (!this.writable) {
          total++;
          this.once("drain", function() {
            --total || pause();
          });
        }
      } else {
        pause();
      }
    }
    /**
     * Starts polling cycle.
     *
     * @private
     */
    _poll() {
      this._polling = true;
      this.doPoll();
      this.emitReserved("poll");
    }
    /**
     * Overloads onData to detect payloads.
     *
     * @protected
     */
    onData(data) {
      const callback = (packet) => {
        if ("opening" === this.readyState && packet.type === "open") {
          this.onOpen();
        }
        if ("close" === packet.type) {
          this.onClose({ description: "transport closed by the server" });
          return false;
        }
        this.onPacket(packet);
      };
      decodePayload(data, this.socket.binaryType).forEach(callback);
      if ("closed" !== this.readyState) {
        this._polling = false;
        this.emitReserved("pollComplete");
        if ("open" === this.readyState) {
          this._poll();
        } else {
        }
      }
    }
    /**
     * For polling, send a close packet.
     *
     * @protected
     */
    doClose() {
      const close = () => {
        this.write([{ type: "close" }]);
      };
      if ("open" === this.readyState) {
        close();
      } else {
        this.once("open", close);
      }
    }
    /**
     * Writes a packets payload.
     *
     * @param {Array} packets - data packets
     * @protected
     */
    write(packets) {
      this.writable = false;
      encodePayload(packets, (data) => {
        this.doWrite(data, () => {
          this.writable = true;
          this.emitReserved("drain");
        });
      });
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */
    uri() {
      const schema = this.opts.secure ? "https" : "http";
      const query = this.query || {};
      if (false !== this.opts.timestampRequests) {
        query[this.opts.timestampParam] = randomString();
      }
      if (!this.supportsBinary && !query.sid) {
        query.b64 = 1;
      }
      return this.createUri(schema, query);
    }
  };

  // node_modules/engine.io-client/build/esm/contrib/has-cors.js
  init_define_slib_info();
  var value = false;
  try {
    value = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
  } catch (err) {
  }
  var hasCORS = value;

  // node_modules/engine.io-client/build/esm/transports/polling-xhr.js
  function empty() {
  }
  var BaseXHR = class extends Polling {
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @package
     */
    constructor(opts) {
      super(opts);
      if (typeof location !== "undefined") {
        const isSSL = "https:" === location.protocol;
        let port = location.port;
        if (!port) {
          port = isSSL ? "443" : "80";
        }
        this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
      }
    }
    /**
     * Sends data.
     *
     * @param {String} data to send.
     * @param {Function} called upon flush.
     * @private
     */
    doWrite(data, fn) {
      const req = this.request({
        method: "POST",
        data
      });
      req.on("success", fn);
      req.on("error", (xhrStatus, context) => {
        this.onError("xhr post error", xhrStatus, context);
      });
    }
    /**
     * Starts a poll cycle.
     *
     * @private
     */
    doPoll() {
      const req = this.request();
      req.on("data", this.onData.bind(this));
      req.on("error", (xhrStatus, context) => {
        this.onError("xhr poll error", xhrStatus, context);
      });
      this.pollXhr = req;
    }
  };
  var Request = class extends Emitter {
    /**
     * Request constructor
     *
     * @param {Object} options
     * @package
     */
    constructor(createRequest, uri, opts) {
      super();
      this.createRequest = createRequest;
      installTimerFunctions(this, opts);
      this._opts = opts;
      this._method = opts.method || "GET";
      this._uri = uri;
      this._data = void 0 !== opts.data ? opts.data : null;
      this._create();
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @private
     */
    _create() {
      var _a4;
      const opts = pick(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
      opts.xdomain = !!this._opts.xd;
      const xhr = this._xhr = this.createRequest(opts);
      try {
        xhr.open(this._method, this._uri, true);
        try {
          if (this._opts.extraHeaders) {
            xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
            for (let i2 in this._opts.extraHeaders) {
              if (this._opts.extraHeaders.hasOwnProperty(i2)) {
                xhr.setRequestHeader(i2, this._opts.extraHeaders[i2]);
              }
            }
          }
        } catch (e) {
        }
        if ("POST" === this._method) {
          try {
            xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
          } catch (e) {
          }
        }
        try {
          xhr.setRequestHeader("Accept", "*/*");
        } catch (e) {
        }
        (_a4 = this._opts.cookieJar) === null || _a4 === void 0 ? void 0 : _a4.addCookies(xhr);
        if ("withCredentials" in xhr) {
          xhr.withCredentials = this._opts.withCredentials;
        }
        if (this._opts.requestTimeout) {
          xhr.timeout = this._opts.requestTimeout;
        }
        xhr.onreadystatechange = () => {
          var _a5;
          if (xhr.readyState === 3) {
            (_a5 = this._opts.cookieJar) === null || _a5 === void 0 ? void 0 : _a5.parseCookies(
              // @ts-ignore
              xhr.getResponseHeader("set-cookie")
            );
          }
          if (4 !== xhr.readyState)
            return;
          if (200 === xhr.status || 1223 === xhr.status) {
            this._onLoad();
          } else {
            this.setTimeoutFn(() => {
              this._onError(typeof xhr.status === "number" ? xhr.status : 0);
            }, 0);
          }
        };
        xhr.send(this._data);
      } catch (e) {
        this.setTimeoutFn(() => {
          this._onError(e);
        }, 0);
        return;
      }
      if (typeof document !== "undefined") {
        this._index = Request.requestsCount++;
        Request.requests[this._index] = this;
      }
    }
    /**
     * Called upon error.
     *
     * @private
     */
    _onError(err) {
      this.emitReserved("error", err, this._xhr);
      this._cleanup(true);
    }
    /**
     * Cleans up house.
     *
     * @private
     */
    _cleanup(fromError) {
      if ("undefined" === typeof this._xhr || null === this._xhr) {
        return;
      }
      this._xhr.onreadystatechange = empty;
      if (fromError) {
        try {
          this._xhr.abort();
        } catch (e) {
        }
      }
      if (typeof document !== "undefined") {
        delete Request.requests[this._index];
      }
      this._xhr = null;
    }
    /**
     * Called upon load.
     *
     * @private
     */
    _onLoad() {
      const data = this._xhr.responseText;
      if (data !== null) {
        this.emitReserved("data", data);
        this.emitReserved("success");
        this._cleanup();
      }
    }
    /**
     * Aborts the request.
     *
     * @package
     */
    abort() {
      this._cleanup();
    }
  };
  Request.requestsCount = 0;
  Request.requests = {};
  if (typeof document !== "undefined") {
    if (typeof attachEvent === "function") {
      attachEvent("onunload", unloadHandler);
    } else if (typeof addEventListener === "function") {
      const terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
      addEventListener(terminationEvent, unloadHandler, false);
    }
  }
  function unloadHandler() {
    for (let i2 in Request.requests) {
      if (Request.requests.hasOwnProperty(i2)) {
        Request.requests[i2].abort();
      }
    }
  }
  var hasXHR2 = function() {
    const xhr = newRequest({
      xdomain: false
    });
    return xhr && xhr.responseType !== null;
  }();
  var XHR = class extends BaseXHR {
    constructor(opts) {
      super(opts);
      const forceBase64 = opts && opts.forceBase64;
      this.supportsBinary = hasXHR2 && !forceBase64;
    }
    request(opts = {}) {
      Object.assign(opts, { xd: this.xd }, this.opts);
      return new Request(newRequest, this.uri(), opts);
    }
  };
  function newRequest(opts) {
    const xdomain = opts.xdomain;
    try {
      if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
        return new XMLHttpRequest();
      }
    } catch (e) {
    }
    if (!xdomain) {
      try {
        return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
      } catch (e) {
      }
    }
  }

  // node_modules/engine.io-client/build/esm/transports/websocket.js
  init_define_slib_info();
  var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
  var BaseWS = class extends Transport {
    get name() {
      return "websocket";
    }
    doOpen() {
      const uri = this.uri();
      const protocols = this.opts.protocols;
      const opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
      if (this.opts.extraHeaders) {
        opts.headers = this.opts.extraHeaders;
      }
      try {
        this.ws = this.createSocket(uri, protocols, opts);
      } catch (err) {
        return this.emitReserved("error", err);
      }
      this.ws.binaryType = this.socket.binaryType;
      this.addEventListeners();
    }
    /**
     * Adds event listeners to the socket
     *
     * @private
     */
    addEventListeners() {
      this.ws.onopen = () => {
        if (this.opts.autoUnref) {
          this.ws._socket.unref();
        }
        this.onOpen();
      };
      this.ws.onclose = (closeEvent) => this.onClose({
        description: "websocket connection closed",
        context: closeEvent
      });
      this.ws.onmessage = (ev) => this.onData(ev.data);
      this.ws.onerror = (e) => this.onError("websocket error", e);
    }
    write(packets) {
      this.writable = false;
      for (let i2 = 0; i2 < packets.length; i2++) {
        const packet = packets[i2];
        const lastPacket = i2 === packets.length - 1;
        encodePacket(packet, this.supportsBinary, (data) => {
          try {
            this.doWrite(packet, data);
          } catch (e) {
          }
          if (lastPacket) {
            nextTick(() => {
              this.writable = true;
              this.emitReserved("drain");
            }, this.setTimeoutFn);
          }
        });
      }
    }
    doClose() {
      if (typeof this.ws !== "undefined") {
        this.ws.onerror = () => {
        };
        this.ws.close();
        this.ws = null;
      }
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */
    uri() {
      const schema = this.opts.secure ? "wss" : "ws";
      const query = this.query || {};
      if (this.opts.timestampRequests) {
        query[this.opts.timestampParam] = randomString();
      }
      if (!this.supportsBinary) {
        query.b64 = 1;
      }
      return this.createUri(schema, query);
    }
  };
  var WebSocketCtor = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
  var WS = class extends BaseWS {
    createSocket(uri, protocols, opts) {
      return !isReactNative ? protocols ? new WebSocketCtor(uri, protocols) : new WebSocketCtor(uri) : new WebSocketCtor(uri, protocols, opts);
    }
    doWrite(_packet, data) {
      this.ws.send(data);
    }
  };

  // node_modules/engine.io-client/build/esm/transports/webtransport.js
  init_define_slib_info();
  var WT = class extends Transport {
    get name() {
      return "webtransport";
    }
    doOpen() {
      try {
        this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
      } catch (err) {
        return this.emitReserved("error", err);
      }
      this._transport.closed.then(() => {
        this.onClose();
      }).catch((err) => {
        this.onError("webtransport error", err);
      });
      this._transport.ready.then(() => {
        this._transport.createBidirectionalStream().then((stream) => {
          const decoderStream = createPacketDecoderStream(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
          const reader = stream.readable.pipeThrough(decoderStream).getReader();
          const encoderStream = createPacketEncoderStream();
          encoderStream.readable.pipeTo(stream.writable);
          this._writer = encoderStream.writable.getWriter();
          const read = () => {
            reader.read().then(({ done, value: value2 }) => {
              if (done) {
                return;
              }
              this.onPacket(value2);
              read();
            }).catch((err) => {
            });
          };
          read();
          const packet = { type: "open" };
          if (this.query.sid) {
            packet.data = `{"sid":"${this.query.sid}"}`;
          }
          this._writer.write(packet).then(() => this.onOpen());
        });
      });
    }
    write(packets) {
      this.writable = false;
      for (let i2 = 0; i2 < packets.length; i2++) {
        const packet = packets[i2];
        const lastPacket = i2 === packets.length - 1;
        this._writer.write(packet).then(() => {
          if (lastPacket) {
            nextTick(() => {
              this.writable = true;
              this.emitReserved("drain");
            }, this.setTimeoutFn);
          }
        });
      }
    }
    doClose() {
      var _a4;
      (_a4 = this._transport) === null || _a4 === void 0 ? void 0 : _a4.close();
    }
  };

  // node_modules/engine.io-client/build/esm/transports/index.js
  var transports = {
    websocket: WS,
    webtransport: WT,
    polling: XHR
  };

  // node_modules/engine.io-client/build/esm/contrib/parseuri.js
  init_define_slib_info();
  var re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
  var parts = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "anchor"
  ];
  function parse(str) {
    if (str.length > 8e3) {
      throw "URI too long";
    }
    const src = str, b = str.indexOf("["), e = str.indexOf("]");
    if (b != -1 && e != -1) {
      str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
    }
    let m = re.exec(str || ""), uri = {}, i2 = 14;
    while (i2--) {
      uri[parts[i2]] = m[i2] || "";
    }
    if (b != -1 && e != -1) {
      uri.source = src;
      uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
      uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
      uri.ipv6uri = true;
    }
    uri.pathNames = pathNames(uri, uri["path"]);
    uri.queryKey = queryKey(uri, uri["query"]);
    return uri;
  }
  function pathNames(obj, path) {
    const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
    if (path.slice(0, 1) == "/" || path.length === 0) {
      names.splice(0, 1);
    }
    if (path.slice(-1) == "/") {
      names.splice(names.length - 1, 1);
    }
    return names;
  }
  function queryKey(uri, query) {
    const data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
      if ($1) {
        data[$1] = $2;
      }
    });
    return data;
  }

  // node_modules/engine.io-client/build/esm/socket.js
  var withEventListeners = typeof addEventListener === "function" && typeof removeEventListener === "function";
  var OFFLINE_EVENT_LISTENERS = [];
  if (withEventListeners) {
    addEventListener("offline", () => {
      OFFLINE_EVENT_LISTENERS.forEach((listener) => listener());
    }, false);
  }
  var SocketWithoutUpgrade = class extends Emitter {
    /**
     * Socket constructor.
     *
     * @param {String|Object} uri - uri or options
     * @param {Object} opts - options
     */
    constructor(uri, opts) {
      super();
      this.binaryType = defaultBinaryType;
      this.writeBuffer = [];
      this._prevBufferLen = 0;
      this._pingInterval = -1;
      this._pingTimeout = -1;
      this._maxPayload = -1;
      this._pingTimeoutTime = Infinity;
      if (uri && "object" === typeof uri) {
        opts = uri;
        uri = null;
      }
      if (uri) {
        const parsedUri = parse(uri);
        opts.hostname = parsedUri.host;
        opts.secure = parsedUri.protocol === "https" || parsedUri.protocol === "wss";
        opts.port = parsedUri.port;
        if (parsedUri.query)
          opts.query = parsedUri.query;
      } else if (opts.host) {
        opts.hostname = parse(opts.host).host;
      }
      installTimerFunctions(this, opts);
      this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
      if (opts.hostname && !opts.port) {
        opts.port = this.secure ? "443" : "80";
      }
      this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
      this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
      this.transports = [];
      this._transportsByName = {};
      opts.transports.forEach((t) => {
        const transportName = t.prototype.name;
        this.transports.push(transportName);
        this._transportsByName[transportName] = t;
      });
      this.opts = Object.assign({
        path: "/engine.io",
        agent: false,
        withCredentials: false,
        upgrade: true,
        timestampParam: "t",
        rememberUpgrade: false,
        addTrailingSlash: true,
        rejectUnauthorized: true,
        perMessageDeflate: {
          threshold: 1024
        },
        transportOptions: {},
        closeOnBeforeunload: false
      }, opts);
      this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "");
      if (typeof this.opts.query === "string") {
        this.opts.query = decode2(this.opts.query);
      }
      if (withEventListeners) {
        if (this.opts.closeOnBeforeunload) {
          this._beforeunloadEventListener = () => {
            if (this.transport) {
              this.transport.removeAllListeners();
              this.transport.close();
            }
          };
          addEventListener("beforeunload", this._beforeunloadEventListener, false);
        }
        if (this.hostname !== "localhost") {
          this._offlineEventListener = () => {
            this._onClose("transport close", {
              description: "network connection lost"
            });
          };
          OFFLINE_EVENT_LISTENERS.push(this._offlineEventListener);
        }
      }
      if (this.opts.withCredentials) {
        this._cookieJar = createCookieJar();
      }
      this._open();
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} name - transport name
     * @return {Transport}
     * @private
     */
    createTransport(name) {
      const query = Object.assign({}, this.opts.query);
      query.EIO = protocol;
      query.transport = name;
      if (this.id)
        query.sid = this.id;
      const opts = Object.assign({}, this.opts, {
        query,
        socket: this,
        hostname: this.hostname,
        secure: this.secure,
        port: this.port
      }, this.opts.transportOptions[name]);
      return new this._transportsByName[name](opts);
    }
    /**
     * Initializes transport to use and starts probe.
     *
     * @private
     */
    _open() {
      if (this.transports.length === 0) {
        this.setTimeoutFn(() => {
          this.emitReserved("error", "No transports available");
        }, 0);
        return;
      }
      const transportName = this.opts.rememberUpgrade && SocketWithoutUpgrade.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
      this.readyState = "opening";
      const transport = this.createTransport(transportName);
      transport.open();
      this.setTransport(transport);
    }
    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @private
     */
    setTransport(transport) {
      if (this.transport) {
        this.transport.removeAllListeners();
      }
      this.transport = transport;
      transport.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", (reason) => this._onClose("transport close", reason));
    }
    /**
     * Called when connection is deemed open.
     *
     * @private
     */
    onOpen() {
      this.readyState = "open";
      SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === this.transport.name;
      this.emitReserved("open");
      this.flush();
    }
    /**
     * Handles a packet.
     *
     * @private
     */
    _onPacket(packet) {
      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
        this.emitReserved("packet", packet);
        this.emitReserved("heartbeat");
        switch (packet.type) {
          case "open":
            this.onHandshake(JSON.parse(packet.data));
            break;
          case "ping":
            this._sendPacket("pong");
            this.emitReserved("ping");
            this.emitReserved("pong");
            this._resetPingTimeout();
            break;
          case "error":
            const err = new Error("server error");
            err.code = packet.data;
            this._onError(err);
            break;
          case "message":
            this.emitReserved("data", packet.data);
            this.emitReserved("message", packet.data);
            break;
        }
      } else {
      }
    }
    /**
     * Called upon handshake completion.
     *
     * @param {Object} data - handshake obj
     * @private
     */
    onHandshake(data) {
      this.emitReserved("handshake", data);
      this.id = data.sid;
      this.transport.query.sid = data.sid;
      this._pingInterval = data.pingInterval;
      this._pingTimeout = data.pingTimeout;
      this._maxPayload = data.maxPayload;
      this.onOpen();
      if ("closed" === this.readyState)
        return;
      this._resetPingTimeout();
    }
    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @private
     */
    _resetPingTimeout() {
      this.clearTimeoutFn(this._pingTimeoutTimer);
      const delay = this._pingInterval + this._pingTimeout;
      this._pingTimeoutTime = Date.now() + delay;
      this._pingTimeoutTimer = this.setTimeoutFn(() => {
        this._onClose("ping timeout");
      }, delay);
      if (this.opts.autoUnref) {
        this._pingTimeoutTimer.unref();
      }
    }
    /**
     * Called on `drain` event
     *
     * @private
     */
    _onDrain() {
      this.writeBuffer.splice(0, this._prevBufferLen);
      this._prevBufferLen = 0;
      if (0 === this.writeBuffer.length) {
        this.emitReserved("drain");
      } else {
        this.flush();
      }
    }
    /**
     * Flush write buffers.
     *
     * @private
     */
    flush() {
      if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
        const packets = this._getWritablePackets();
        this.transport.send(packets);
        this._prevBufferLen = packets.length;
        this.emitReserved("flush");
      }
    }
    /**
     * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
     * long-polling)
     *
     * @private
     */
    _getWritablePackets() {
      const shouldCheckPayloadSize = this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
      if (!shouldCheckPayloadSize) {
        return this.writeBuffer;
      }
      let payloadSize = 1;
      for (let i2 = 0; i2 < this.writeBuffer.length; i2++) {
        const data = this.writeBuffer[i2].data;
        if (data) {
          payloadSize += byteLength(data);
        }
        if (i2 > 0 && payloadSize > this._maxPayload) {
          return this.writeBuffer.slice(0, i2);
        }
        payloadSize += 2;
      }
      return this.writeBuffer;
    }
    /**
     * Checks whether the heartbeat timer has expired but the socket has not yet been notified.
     *
     * Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
     * `write()` method then the message would not be buffered by the Socket.IO client.
     *
     * @return {boolean}
     * @private
     */
    /* private */
    _hasPingExpired() {
      if (!this._pingTimeoutTime)
        return true;
      const hasExpired = Date.now() > this._pingTimeoutTime;
      if (hasExpired) {
        this._pingTimeoutTime = 0;
        nextTick(() => {
          this._onClose("ping timeout");
        }, this.setTimeoutFn);
      }
      return hasExpired;
    }
    /**
     * Sends a message.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @return {Socket} for chaining.
     */
    write(msg2, options, fn) {
      this._sendPacket("message", msg2, options, fn);
      return this;
    }
    /**
     * Sends a message. Alias of {@link Socket#write}.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @return {Socket} for chaining.
     */
    send(msg2, options, fn) {
      this._sendPacket("message", msg2, options, fn);
      return this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} type: packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @private
     */
    _sendPacket(type, data, options, fn) {
      if ("function" === typeof data) {
        fn = data;
        data = void 0;
      }
      if ("function" === typeof options) {
        fn = options;
        options = null;
      }
      if ("closing" === this.readyState || "closed" === this.readyState) {
        return;
      }
      options = options || {};
      options.compress = false !== options.compress;
      const packet = {
        type,
        data,
        options
      };
      this.emitReserved("packetCreate", packet);
      this.writeBuffer.push(packet);
      if (fn)
        this.once("flush", fn);
      this.flush();
    }
    /**
     * Closes the connection.
     */
    close() {
      const close = () => {
        this._onClose("forced close");
        this.transport.close();
      };
      const cleanupAndClose = () => {
        this.off("upgrade", cleanupAndClose);
        this.off("upgradeError", cleanupAndClose);
        close();
      };
      const waitForUpgrade = () => {
        this.once("upgrade", cleanupAndClose);
        this.once("upgradeError", cleanupAndClose);
      };
      if ("opening" === this.readyState || "open" === this.readyState) {
        this.readyState = "closing";
        if (this.writeBuffer.length) {
          this.once("drain", () => {
            if (this.upgrading) {
              waitForUpgrade();
            } else {
              close();
            }
          });
        } else if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      }
      return this;
    }
    /**
     * Called upon transport error
     *
     * @private
     */
    _onError(err) {
      SocketWithoutUpgrade.priorWebsocketSuccess = false;
      if (this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening") {
        this.transports.shift();
        return this._open();
      }
      this.emitReserved("error", err);
      this._onClose("transport error", err);
    }
    /**
     * Called upon transport close.
     *
     * @private
     */
    _onClose(reason, description) {
      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
        this.clearTimeoutFn(this._pingTimeoutTimer);
        this.transport.removeAllListeners("close");
        this.transport.close();
        this.transport.removeAllListeners();
        if (withEventListeners) {
          if (this._beforeunloadEventListener) {
            removeEventListener("beforeunload", this._beforeunloadEventListener, false);
          }
          if (this._offlineEventListener) {
            const i2 = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
            if (i2 !== -1) {
              OFFLINE_EVENT_LISTENERS.splice(i2, 1);
            }
          }
        }
        this.readyState = "closed";
        this.id = null;
        this.emitReserved("close", reason, description);
        this.writeBuffer = [];
        this._prevBufferLen = 0;
      }
    }
  };
  SocketWithoutUpgrade.protocol = protocol;
  var SocketWithUpgrade = class extends SocketWithoutUpgrade {
    constructor() {
      super(...arguments);
      this._upgrades = [];
    }
    onOpen() {
      super.onOpen();
      if ("open" === this.readyState && this.opts.upgrade) {
        for (let i2 = 0; i2 < this._upgrades.length; i2++) {
          this._probe(this._upgrades[i2]);
        }
      }
    }
    /**
     * Probes a transport.
     *
     * @param {String} name - transport name
     * @private
     */
    _probe(name) {
      let transport = this.createTransport(name);
      let failed = false;
      SocketWithoutUpgrade.priorWebsocketSuccess = false;
      const onTransportOpen = () => {
        if (failed)
          return;
        transport.send([{ type: "ping", data: "probe" }]);
        transport.once("packet", (msg2) => {
          if (failed)
            return;
          if ("pong" === msg2.type && "probe" === msg2.data) {
            this.upgrading = true;
            this.emitReserved("upgrading", transport);
            if (!transport)
              return;
            SocketWithoutUpgrade.priorWebsocketSuccess = "websocket" === transport.name;
            this.transport.pause(() => {
              if (failed)
                return;
              if ("closed" === this.readyState)
                return;
              cleanup();
              this.setTransport(transport);
              transport.send([{ type: "upgrade" }]);
              this.emitReserved("upgrade", transport);
              transport = null;
              this.upgrading = false;
              this.flush();
            });
          } else {
            const err = new Error("probe error");
            err.transport = transport.name;
            this.emitReserved("upgradeError", err);
          }
        });
      };
      function freezeTransport() {
        if (failed)
          return;
        failed = true;
        cleanup();
        transport.close();
        transport = null;
      }
      const onerror = (err) => {
        const error = new Error("probe error: " + err);
        error.transport = transport.name;
        freezeTransport();
        this.emitReserved("upgradeError", error);
      };
      function onTransportClose() {
        onerror("transport closed");
      }
      function onclose() {
        onerror("socket closed");
      }
      function onupgrade(to) {
        if (transport && to.name !== transport.name) {
          freezeTransport();
        }
      }
      const cleanup = () => {
        transport.removeListener("open", onTransportOpen);
        transport.removeListener("error", onerror);
        transport.removeListener("close", onTransportClose);
        this.off("close", onclose);
        this.off("upgrading", onupgrade);
      };
      transport.once("open", onTransportOpen);
      transport.once("error", onerror);
      transport.once("close", onTransportClose);
      this.once("close", onclose);
      this.once("upgrading", onupgrade);
      if (this._upgrades.indexOf("webtransport") !== -1 && name !== "webtransport") {
        this.setTimeoutFn(() => {
          if (!failed) {
            transport.open();
          }
        }, 200);
      } else {
        transport.open();
      }
    }
    onHandshake(data) {
      this._upgrades = this._filterUpgrades(data.upgrades);
      super.onHandshake(data);
    }
    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} upgrades - server upgrades
     * @private
     */
    _filterUpgrades(upgrades) {
      const filteredUpgrades = [];
      for (let i2 = 0; i2 < upgrades.length; i2++) {
        if (~this.transports.indexOf(upgrades[i2]))
          filteredUpgrades.push(upgrades[i2]);
      }
      return filteredUpgrades;
    }
  };
  var Socket = class extends SocketWithUpgrade {
    constructor(uri, opts = {}) {
      const o = typeof uri === "object" ? uri : opts;
      if (!o.transports || o.transports && typeof o.transports[0] === "string") {
        o.transports = (o.transports || ["polling", "websocket", "webtransport"]).map((transportName) => transports[transportName]).filter((t) => !!t);
      }
      super(uri, o);
    }
  };

  // node_modules/engine.io-client/build/esm/transports/polling-fetch.js
  init_define_slib_info();

  // node_modules/engine.io-client/build/esm/index.js
  var protocol2 = Socket.protocol;

  // node_modules/socket.io-client/build/esm/url.js
  function url(uri, path = "", loc) {
    let obj = uri;
    loc = loc || typeof location !== "undefined" && location;
    if (null == uri)
      uri = loc.protocol + "//" + loc.host;
    if (typeof uri === "string") {
      if ("/" === uri.charAt(0)) {
        if ("/" === uri.charAt(1)) {
          uri = loc.protocol + uri;
        } else {
          uri = loc.host + uri;
        }
      }
      if (!/^(https?|wss?):\/\//.test(uri)) {
        if ("undefined" !== typeof loc) {
          uri = loc.protocol + "//" + uri;
        } else {
          uri = "https://" + uri;
        }
      }
      obj = parse(uri);
    }
    if (!obj.port) {
      if (/^(http|ws)$/.test(obj.protocol)) {
        obj.port = "80";
      } else if (/^(http|ws)s$/.test(obj.protocol)) {
        obj.port = "443";
      }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
  }

  // node_modules/socket.io-client/build/esm/manager.js
  init_define_slib_info();

  // node_modules/socket.io-client/build/esm/socket.js
  init_define_slib_info();

  // node_modules/socket.io-parser/build/esm/index.js
  var esm_exports = {};
  __export(esm_exports, {
    Decoder: () => Decoder,
    Encoder: () => Encoder,
    PacketType: () => PacketType,
    protocol: () => protocol3
  });
  init_define_slib_info();

  // node_modules/socket.io-parser/build/esm/binary.js
  init_define_slib_info();

  // node_modules/socket.io-parser/build/esm/is-binary.js
  init_define_slib_info();
  var withNativeArrayBuffer3 = typeof ArrayBuffer === "function";
  var isView2 = (obj) => {
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
  };
  var toString = Object.prototype.toString;
  var withNativeBlob2 = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
  var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
  function isBinary(obj) {
    return withNativeArrayBuffer3 && (obj instanceof ArrayBuffer || isView2(obj)) || withNativeBlob2 && obj instanceof Blob || withNativeFile && obj instanceof File;
  }
  function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
      return false;
    }
    if (Array.isArray(obj)) {
      for (let i2 = 0, l = obj.length; i2 < l; i2++) {
        if (hasBinary(obj[i2])) {
          return true;
        }
      }
      return false;
    }
    if (isBinary(obj)) {
      return true;
    }
    if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
      return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
        return true;
      }
    }
    return false;
  }

  // node_modules/socket.io-parser/build/esm/binary.js
  function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length;
    return { packet: pack, buffers };
  }
  function _deconstructPacket(data, buffers) {
    if (!data)
      return data;
    if (isBinary(data)) {
      const placeholder = { _placeholder: true, num: buffers.length };
      buffers.push(data);
      return placeholder;
    } else if (Array.isArray(data)) {
      const newData = new Array(data.length);
      for (let i2 = 0; i2 < data.length; i2++) {
        newData[i2] = _deconstructPacket(data[i2], buffers);
      }
      return newData;
    } else if (typeof data === "object" && !(data instanceof Date)) {
      const newData = {};
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          newData[key] = _deconstructPacket(data[key], buffers);
        }
      }
      return newData;
    }
    return data;
  }
  function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    delete packet.attachments;
    return packet;
  }
  function _reconstructPacket(data, buffers) {
    if (!data)
      return data;
    if (data && data._placeholder === true) {
      const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
      if (isIndexValid) {
        return buffers[data.num];
      } else {
        throw new Error("illegal attachments");
      }
    } else if (Array.isArray(data)) {
      for (let i2 = 0; i2 < data.length; i2++) {
        data[i2] = _reconstructPacket(data[i2], buffers);
      }
    } else if (typeof data === "object") {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          data[key] = _reconstructPacket(data[key], buffers);
        }
      }
    }
    return data;
  }

  // node_modules/socket.io-parser/build/esm/index.js
  var RESERVED_EVENTS = [
    "connect",
    "connect_error",
    "disconnect",
    "disconnecting",
    "newListener",
    "removeListener"
    // used by the Node.js EventEmitter
  ];
  var protocol3 = 5;
  var PacketType;
  (function(PacketType2) {
    PacketType2[PacketType2["CONNECT"] = 0] = "CONNECT";
    PacketType2[PacketType2["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType2[PacketType2["EVENT"] = 2] = "EVENT";
    PacketType2[PacketType2["ACK"] = 3] = "ACK";
    PacketType2[PacketType2["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType2[PacketType2["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType2[PacketType2["BINARY_ACK"] = 6] = "BINARY_ACK";
  })(PacketType || (PacketType = {}));
  var Encoder = class {
    /**
     * Encoder constructor
     *
     * @param {function} replacer - custom replacer to pass down to JSON.parse
     */
    constructor(replacer) {
      this.replacer = replacer;
    }
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    encode(obj) {
      if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
        if (hasBinary(obj)) {
          return this.encodeAsBinary({
            type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
            nsp: obj.nsp,
            data: obj.data,
            id: obj.id
          });
        }
      }
      return [this.encodeAsString(obj)];
    }
    /**
     * Encode packet as string.
     */
    encodeAsString(obj) {
      let str = "" + obj.type;
      if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
        str += obj.attachments + "-";
      }
      if (obj.nsp && "/" !== obj.nsp) {
        str += obj.nsp + ",";
      }
      if (null != obj.id) {
        str += obj.id;
      }
      if (null != obj.data) {
        str += JSON.stringify(obj.data, this.replacer);
      }
      return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */
    encodeAsBinary(obj) {
      const deconstruction = deconstructPacket(obj);
      const pack = this.encodeAsString(deconstruction.packet);
      const buffers = deconstruction.buffers;
      buffers.unshift(pack);
      return buffers;
    }
  };
  function isObject(value2) {
    return Object.prototype.toString.call(value2) === "[object Object]";
  }
  var Decoder = class extends Emitter {
    /**
     * Decoder constructor
     *
     * @param {function} reviver - custom reviver to pass down to JSON.stringify
     */
    constructor(reviver) {
      super();
      this.reviver = reviver;
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    add(obj) {
      let packet;
      if (typeof obj === "string") {
        if (this.reconstructor) {
          throw new Error("got plaintext data when reconstructing a packet");
        }
        packet = this.decodeString(obj);
        const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
        if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
          packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
          this.reconstructor = new BinaryReconstructor(packet);
          if (packet.attachments === 0) {
            super.emitReserved("decoded", packet);
          }
        } else {
          super.emitReserved("decoded", packet);
        }
      } else if (isBinary(obj) || obj.base64) {
        if (!this.reconstructor) {
          throw new Error("got binary data when not reconstructing a packet");
        } else {
          packet = this.reconstructor.takeBinaryData(obj);
          if (packet) {
            this.reconstructor = null;
            super.emitReserved("decoded", packet);
          }
        }
      } else {
        throw new Error("Unknown type: " + obj);
      }
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */
    decodeString(str) {
      let i2 = 0;
      const p = {
        type: Number(str.charAt(0))
      };
      if (PacketType[p.type] === void 0) {
        throw new Error("unknown packet type " + p.type);
      }
      if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
        const start = i2 + 1;
        while (str.charAt(++i2) !== "-" && i2 != str.length) {
        }
        const buf = str.substring(start, i2);
        if (buf != Number(buf) || str.charAt(i2) !== "-") {
          throw new Error("Illegal attachments");
        }
        p.attachments = Number(buf);
      }
      if ("/" === str.charAt(i2 + 1)) {
        const start = i2 + 1;
        while (++i2) {
          const c = str.charAt(i2);
          if ("," === c)
            break;
          if (i2 === str.length)
            break;
        }
        p.nsp = str.substring(start, i2);
      } else {
        p.nsp = "/";
      }
      const next = str.charAt(i2 + 1);
      if ("" !== next && Number(next) == next) {
        const start = i2 + 1;
        while (++i2) {
          const c = str.charAt(i2);
          if (null == c || Number(c) != c) {
            --i2;
            break;
          }
          if (i2 === str.length)
            break;
        }
        p.id = Number(str.substring(start, i2 + 1));
      }
      if (str.charAt(++i2)) {
        const payload = this.tryParse(str.substr(i2));
        if (Decoder.isPayloadValid(p.type, payload)) {
          p.data = payload;
        } else {
          throw new Error("invalid payload");
        }
      }
      return p;
    }
    tryParse(str) {
      try {
        return JSON.parse(str, this.reviver);
      } catch (e) {
        return false;
      }
    }
    static isPayloadValid(type, payload) {
      switch (type) {
        case PacketType.CONNECT:
          return isObject(payload);
        case PacketType.DISCONNECT:
          return payload === void 0;
        case PacketType.CONNECT_ERROR:
          return typeof payload === "string" || isObject(payload);
        case PacketType.EVENT:
        case PacketType.BINARY_EVENT:
          return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS.indexOf(payload[0]) === -1);
        case PacketType.ACK:
        case PacketType.BINARY_ACK:
          return Array.isArray(payload);
      }
    }
    /**
     * Deallocates a parser's resources
     */
    destroy() {
      if (this.reconstructor) {
        this.reconstructor.finishedReconstruction();
        this.reconstructor = null;
      }
    }
  };
  var BinaryReconstructor = class {
    constructor(packet) {
      this.packet = packet;
      this.buffers = [];
      this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    takeBinaryData(binData) {
      this.buffers.push(binData);
      if (this.buffers.length === this.reconPack.attachments) {
        const packet = reconstructPacket(this.reconPack, this.buffers);
        this.finishedReconstruction();
        return packet;
      }
      return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */
    finishedReconstruction() {
      this.reconPack = null;
      this.buffers = [];
    }
  };

  // node_modules/socket.io-client/build/esm/on.js
  init_define_slib_info();
  function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
      obj.off(ev, fn);
    };
  }

  // node_modules/socket.io-client/build/esm/socket.js
  var RESERVED_EVENTS2 = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1
  });
  var Socket2 = class extends Emitter {
    /**
     * `Socket` constructor.
     */
    constructor(io, nsp, opts) {
      super();
      this.connected = false;
      this.recovered = false;
      this.receiveBuffer = [];
      this.sendBuffer = [];
      this._queue = [];
      this._queueSeq = 0;
      this.ids = 0;
      this.acks = {};
      this.flags = {};
      this.io = io;
      this.nsp = nsp;
      if (opts && opts.auth) {
        this.auth = opts.auth;
      }
      this._opts = Object.assign({}, opts);
      if (this.io._autoConnect)
        this.open();
    }
    /**
     * Whether the socket is currently disconnected
     *
     * @example
     * const socket = io();
     *
     * socket.on("connect", () => {
     *   console.log(socket.disconnected); // false
     * });
     *
     * socket.on("disconnect", () => {
     *   console.log(socket.disconnected); // true
     * });
     */
    get disconnected() {
      return !this.connected;
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */
    subEvents() {
      if (this.subs)
        return;
      const io = this.io;
      this.subs = [
        on(io, "open", this.onopen.bind(this)),
        on(io, "packet", this.onpacket.bind(this)),
        on(io, "error", this.onerror.bind(this)),
        on(io, "close", this.onclose.bind(this))
      ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects.
     *
     * @example
     * const socket = io();
     *
     * console.log(socket.active); // true
     *
     * socket.on("disconnect", (reason) => {
     *   if (reason === "io server disconnect") {
     *     // the disconnection was initiated by the server, you need to manually reconnect
     *     console.log(socket.active); // false
     *   }
     *   // else the socket will automatically try to reconnect
     *   console.log(socket.active); // true
     * });
     */
    get active() {
      return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @example
     * const socket = io({
     *   autoConnect: false
     * });
     *
     * socket.connect();
     */
    connect() {
      if (this.connected)
        return this;
      this.subEvents();
      if (!this.io["_reconnecting"])
        this.io.open();
      if ("open" === this.io._readyState)
        this.onopen();
      return this;
    }
    /**
     * Alias for {@link connect()}.
     */
    open() {
      return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * This method mimics the WebSocket.send() method.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     *
     * @example
     * socket.send("hello");
     *
     * // this is equivalent to
     * socket.emit("message", "hello");
     *
     * @return self
     */
    send(...args) {
      args.unshift("message");
      this.emit.apply(this, args);
      return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @example
     * socket.emit("hello", "world");
     *
     * // all serializable datastructures are supported (no need to call JSON.stringify)
     * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
     *
     * // with an acknowledgement from the server
     * socket.emit("hello", "world", (val) => {
     *   // ...
     * });
     *
     * @return self
     */
    emit(ev, ...args) {
      var _a4, _b, _c;
      if (RESERVED_EVENTS2.hasOwnProperty(ev)) {
        throw new Error('"' + ev.toString() + '" is a reserved event name');
      }
      args.unshift(ev);
      if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
        this._addToQueue(args);
        return this;
      }
      const packet = {
        type: PacketType.EVENT,
        data: args
      };
      packet.options = {};
      packet.options.compress = this.flags.compress !== false;
      if ("function" === typeof args[args.length - 1]) {
        const id = this.ids++;
        const ack = args.pop();
        this._registerAckCallback(id, ack);
        packet.id = id;
      }
      const isTransportWritable = (_b = (_a4 = this.io.engine) === null || _a4 === void 0 ? void 0 : _a4.transport) === null || _b === void 0 ? void 0 : _b.writable;
      const isConnected = this.connected && !((_c = this.io.engine) === null || _c === void 0 ? void 0 : _c._hasPingExpired());
      const discardPacket = this.flags.volatile && !isTransportWritable;
      if (discardPacket) {
      } else if (isConnected) {
        this.notifyOutgoingListeners(packet);
        this.packet(packet);
      } else {
        this.sendBuffer.push(packet);
      }
      this.flags = {};
      return this;
    }
    /**
     * @private
     */
    _registerAckCallback(id, ack) {
      var _a4;
      const timeout = (_a4 = this.flags.timeout) !== null && _a4 !== void 0 ? _a4 : this._opts.ackTimeout;
      if (timeout === void 0) {
        this.acks[id] = ack;
        return;
      }
      const timer = this.io.setTimeoutFn(() => {
        delete this.acks[id];
        for (let i2 = 0; i2 < this.sendBuffer.length; i2++) {
          if (this.sendBuffer[i2].id === id) {
            this.sendBuffer.splice(i2, 1);
          }
        }
        ack.call(this, new Error("operation has timed out"));
      }, timeout);
      const fn = (...args) => {
        this.io.clearTimeoutFn(timer);
        ack.apply(this, args);
      };
      fn.withError = true;
      this.acks[id] = fn;
    }
    /**
     * Emits an event and waits for an acknowledgement
     *
     * @example
     * // without timeout
     * const response = await socket.emitWithAck("hello", "world");
     *
     * // with a specific timeout
     * try {
     *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
     * } catch (err) {
     *   // the server did not acknowledge the event in the given delay
     * }
     *
     * @return a Promise that will be fulfilled when the server acknowledges the event
     */
    emitWithAck(ev, ...args) {
      return new Promise((resolve, reject) => {
        const fn = (arg1, arg2) => {
          return arg1 ? reject(arg1) : resolve(arg2);
        };
        fn.withError = true;
        args.push(fn);
        this.emit(ev, ...args);
      });
    }
    /**
     * Add the packet to the queue.
     * @param args
     * @private
     */
    _addToQueue(args) {
      let ack;
      if (typeof args[args.length - 1] === "function") {
        ack = args.pop();
      }
      const packet = {
        id: this._queueSeq++,
        tryCount: 0,
        pending: false,
        args,
        flags: Object.assign({ fromQueue: true }, this.flags)
      };
      args.push((err, ...responseArgs) => {
        if (packet !== this._queue[0]) {
          return;
        }
        const hasError = err !== null;
        if (hasError) {
          if (packet.tryCount > this._opts.retries) {
            this._queue.shift();
            if (ack) {
              ack(err);
            }
          }
        } else {
          this._queue.shift();
          if (ack) {
            ack(null, ...responseArgs);
          }
        }
        packet.pending = false;
        return this._drainQueue();
      });
      this._queue.push(packet);
      this._drainQueue();
    }
    /**
     * Send the first packet of the queue, and wait for an acknowledgement from the server.
     * @param force - whether to resend a packet that has not been acknowledged yet
     *
     * @private
     */
    _drainQueue(force = false) {
      if (!this.connected || this._queue.length === 0) {
        return;
      }
      const packet = this._queue[0];
      if (packet.pending && !force) {
        return;
      }
      packet.pending = true;
      packet.tryCount++;
      this.flags = packet.flags;
      this.emit.apply(this, packet.args);
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */
    packet(packet) {
      packet.nsp = this.nsp;
      this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */
    onopen() {
      if (typeof this.auth == "function") {
        this.auth((data) => {
          this._sendConnectPacket(data);
        });
      } else {
        this._sendConnectPacket(this.auth);
      }
    }
    /**
     * Sends a CONNECT packet to initiate the Socket.IO session.
     *
     * @param data
     * @private
     */
    _sendConnectPacket(data) {
      this.packet({
        type: PacketType.CONNECT,
        data: this._pid ? Object.assign({ pid: this._pid, offset: this._lastOffset }, data) : data
      });
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */
    onerror(err) {
      if (!this.connected) {
        this.emitReserved("connect_error", err);
      }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @param description
     * @private
     */
    onclose(reason, description) {
      this.connected = false;
      delete this.id;
      this.emitReserved("disconnect", reason, description);
      this._clearAcks();
    }
    /**
     * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
     * the server.
     *
     * @private
     */
    _clearAcks() {
      Object.keys(this.acks).forEach((id) => {
        const isBuffered = this.sendBuffer.some((packet) => String(packet.id) === id);
        if (!isBuffered) {
          const ack = this.acks[id];
          delete this.acks[id];
          if (ack.withError) {
            ack.call(this, new Error("socket has been disconnected"));
          }
        }
      });
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */
    onpacket(packet) {
      const sameNamespace = packet.nsp === this.nsp;
      if (!sameNamespace)
        return;
      switch (packet.type) {
        case PacketType.CONNECT:
          if (packet.data && packet.data.sid) {
            this.onconnect(packet.data.sid, packet.data.pid);
          } else {
            this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          }
          break;
        case PacketType.EVENT:
        case PacketType.BINARY_EVENT:
          this.onevent(packet);
          break;
        case PacketType.ACK:
        case PacketType.BINARY_ACK:
          this.onack(packet);
          break;
        case PacketType.DISCONNECT:
          this.ondisconnect();
          break;
        case PacketType.CONNECT_ERROR:
          this.destroy();
          const err = new Error(packet.data.message);
          err.data = packet.data.data;
          this.emitReserved("connect_error", err);
          break;
      }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */
    onevent(packet) {
      const args = packet.data || [];
      if (null != packet.id) {
        args.push(this.ack(packet.id));
      }
      if (this.connected) {
        this.emitEvent(args);
      } else {
        this.receiveBuffer.push(Object.freeze(args));
      }
    }
    emitEvent(args) {
      if (this._anyListeners && this._anyListeners.length) {
        const listeners = this._anyListeners.slice();
        for (const listener of listeners) {
          listener.apply(this, args);
        }
      }
      super.emit.apply(this, args);
      if (this._pid && args.length && typeof args[args.length - 1] === "string") {
        this._lastOffset = args[args.length - 1];
      }
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */
    ack(id) {
      const self2 = this;
      let sent = false;
      return function(...args) {
        if (sent)
          return;
        sent = true;
        self2.packet({
          type: PacketType.ACK,
          id,
          data: args
        });
      };
    }
    /**
     * Called upon a server acknowledgement.
     *
     * @param packet
     * @private
     */
    onack(packet) {
      const ack = this.acks[packet.id];
      if (typeof ack !== "function") {
        return;
      }
      delete this.acks[packet.id];
      if (ack.withError) {
        packet.data.unshift(null);
      }
      ack.apply(this, packet.data);
    }
    /**
     * Called upon server connect.
     *
     * @private
     */
    onconnect(id, pid) {
      this.id = id;
      this.recovered = pid && this._pid === pid;
      this._pid = pid;
      this.connected = true;
      this.emitBuffered();
      this.emitReserved("connect");
      this._drainQueue(true);
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */
    emitBuffered() {
      this.receiveBuffer.forEach((args) => this.emitEvent(args));
      this.receiveBuffer = [];
      this.sendBuffer.forEach((packet) => {
        this.notifyOutgoingListeners(packet);
        this.packet(packet);
      });
      this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */
    ondisconnect() {
      this.destroy();
      this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */
    destroy() {
      if (this.subs) {
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs = void 0;
      }
      this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually. In that case, the socket will not try to reconnect.
     *
     * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
     *
     * @example
     * const socket = io();
     *
     * socket.on("disconnect", (reason) => {
     *   // console.log(reason); prints "io client disconnect"
     * });
     *
     * socket.disconnect();
     *
     * @return self
     */
    disconnect() {
      if (this.connected) {
        this.packet({ type: PacketType.DISCONNECT });
      }
      this.destroy();
      if (this.connected) {
        this.onclose("io client disconnect");
      }
      return this;
    }
    /**
     * Alias for {@link disconnect()}.
     *
     * @return self
     */
    close() {
      return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * socket.compress(false).emit("hello");
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     */
    compress(compress) {
      this.flags.compress = compress;
      return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @example
     * socket.volatile.emit("hello"); // the server may or may not receive it
     *
     * @returns self
     */
    get volatile() {
      this.flags.volatile = true;
      return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * @example
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     *
     * @returns self
     */
    timeout(timeout) {
      this.flags.timeout = timeout;
      return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @example
     * socket.onAny((event, ...args) => {
     *   console.log(`got ${event}`);
     * });
     *
     * @param listener
     */
    onAny(listener) {
      this._anyListeners = this._anyListeners || [];
      this._anyListeners.push(listener);
      return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @example
     * socket.prependAny((event, ...args) => {
     *   console.log(`got event ${event}`);
     * });
     *
     * @param listener
     */
    prependAny(listener) {
      this._anyListeners = this._anyListeners || [];
      this._anyListeners.unshift(listener);
      return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`got event ${event}`);
     * }
     *
     * socket.onAny(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAny(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAny();
     *
     * @param listener
     */
    offAny(listener) {
      if (!this._anyListeners) {
        return this;
      }
      if (listener) {
        const listeners = this._anyListeners;
        for (let i2 = 0; i2 < listeners.length; i2++) {
          if (listener === listeners[i2]) {
            listeners.splice(i2, 1);
            return this;
          }
        }
      } else {
        this._anyListeners = [];
      }
      return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAny() {
      return this._anyListeners || [];
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.onAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */
    onAnyOutgoing(listener) {
      this._anyOutgoingListeners = this._anyOutgoingListeners || [];
      this._anyOutgoingListeners.push(listener);
      return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.prependAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */
    prependAnyOutgoing(listener) {
      this._anyOutgoingListeners = this._anyOutgoingListeners || [];
      this._anyOutgoingListeners.unshift(listener);
      return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`sent event ${event}`);
     * }
     *
     * socket.onAnyOutgoing(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAnyOutgoing(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAnyOutgoing();
     *
     * @param [listener] - the catch-all listener (optional)
     */
    offAnyOutgoing(listener) {
      if (!this._anyOutgoingListeners) {
        return this;
      }
      if (listener) {
        const listeners = this._anyOutgoingListeners;
        for (let i2 = 0; i2 < listeners.length; i2++) {
          if (listener === listeners[i2]) {
            listeners.splice(i2, 1);
            return this;
          }
        }
      } else {
        this._anyOutgoingListeners = [];
      }
      return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAnyOutgoing() {
      return this._anyOutgoingListeners || [];
    }
    /**
     * Notify the listeners for each packet sent
     *
     * @param packet
     *
     * @private
     */
    notifyOutgoingListeners(packet) {
      if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
        const listeners = this._anyOutgoingListeners.slice();
        for (const listener of listeners) {
          listener.apply(this, packet.data);
        }
      }
    }
  };

  // node_modules/socket.io-client/build/esm/contrib/backo2.js
  init_define_slib_info();
  function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 1e4;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
  }
  Backoff.prototype.duration = function() {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
      var rand = Math.random();
      var deviation = Math.floor(rand * this.jitter * ms);
      ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
  };
  Backoff.prototype.reset = function() {
    this.attempts = 0;
  };
  Backoff.prototype.setMin = function(min) {
    this.ms = min;
  };
  Backoff.prototype.setMax = function(max) {
    this.max = max;
  };
  Backoff.prototype.setJitter = function(jitter) {
    this.jitter = jitter;
  };

  // node_modules/socket.io-client/build/esm/manager.js
  var Manager = class extends Emitter {
    constructor(uri, opts) {
      var _a4;
      super();
      this.nsps = {};
      this.subs = [];
      if (uri && "object" === typeof uri) {
        opts = uri;
        uri = void 0;
      }
      opts = opts || {};
      opts.path = opts.path || "/socket.io";
      this.opts = opts;
      installTimerFunctions(this, opts);
      this.reconnection(opts.reconnection !== false);
      this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
      this.reconnectionDelay(opts.reconnectionDelay || 1e3);
      this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
      this.randomizationFactor((_a4 = opts.randomizationFactor) !== null && _a4 !== void 0 ? _a4 : 0.5);
      this.backoff = new Backoff({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor()
      });
      this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
      this._readyState = "closed";
      this.uri = uri;
      const _parser = opts.parser || esm_exports;
      this.encoder = new _parser.Encoder();
      this.decoder = new _parser.Decoder();
      this._autoConnect = opts.autoConnect !== false;
      if (this._autoConnect)
        this.open();
    }
    reconnection(v) {
      if (!arguments.length)
        return this._reconnection;
      this._reconnection = !!v;
      if (!v) {
        this.skipReconnect = true;
      }
      return this;
    }
    reconnectionAttempts(v) {
      if (v === void 0)
        return this._reconnectionAttempts;
      this._reconnectionAttempts = v;
      return this;
    }
    reconnectionDelay(v) {
      var _a4;
      if (v === void 0)
        return this._reconnectionDelay;
      this._reconnectionDelay = v;
      (_a4 = this.backoff) === null || _a4 === void 0 ? void 0 : _a4.setMin(v);
      return this;
    }
    randomizationFactor(v) {
      var _a4;
      if (v === void 0)
        return this._randomizationFactor;
      this._randomizationFactor = v;
      (_a4 = this.backoff) === null || _a4 === void 0 ? void 0 : _a4.setJitter(v);
      return this;
    }
    reconnectionDelayMax(v) {
      var _a4;
      if (v === void 0)
        return this._reconnectionDelayMax;
      this._reconnectionDelayMax = v;
      (_a4 = this.backoff) === null || _a4 === void 0 ? void 0 : _a4.setMax(v);
      return this;
    }
    timeout(v) {
      if (!arguments.length)
        return this._timeout;
      this._timeout = v;
      return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */
    maybeReconnectOnOpen() {
      if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
        this.reconnect();
      }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */
    open(fn) {
      if (~this._readyState.indexOf("open"))
        return this;
      this.engine = new Socket(this.uri, this.opts);
      const socket2 = this.engine;
      const self2 = this;
      this._readyState = "opening";
      this.skipReconnect = false;
      const openSubDestroy = on(socket2, "open", function() {
        self2.onopen();
        fn && fn();
      });
      const onError = (err) => {
        this.cleanup();
        this._readyState = "closed";
        this.emitReserved("error", err);
        if (fn) {
          fn(err);
        } else {
          this.maybeReconnectOnOpen();
        }
      };
      const errorSub = on(socket2, "error", onError);
      if (false !== this._timeout) {
        const timeout = this._timeout;
        const timer = this.setTimeoutFn(() => {
          openSubDestroy();
          onError(new Error("timeout"));
          socket2.close();
        }, timeout);
        if (this.opts.autoUnref) {
          timer.unref();
        }
        this.subs.push(() => {
          this.clearTimeoutFn(timer);
        });
      }
      this.subs.push(openSubDestroy);
      this.subs.push(errorSub);
      return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */
    connect(fn) {
      return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */
    onopen() {
      this.cleanup();
      this._readyState = "open";
      this.emitReserved("open");
      const socket2 = this.engine;
      this.subs.push(
        on(socket2, "ping", this.onping.bind(this)),
        on(socket2, "data", this.ondata.bind(this)),
        on(socket2, "error", this.onerror.bind(this)),
        on(socket2, "close", this.onclose.bind(this)),
        // @ts-ignore
        on(this.decoder, "decoded", this.ondecoded.bind(this))
      );
    }
    /**
     * Called upon a ping.
     *
     * @private
     */
    onping() {
      this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */
    ondata(data) {
      try {
        this.decoder.add(data);
      } catch (e) {
        this.onclose("parse error", e);
      }
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(packet) {
      nextTick(() => {
        this.emitReserved("packet", packet);
      }, this.setTimeoutFn);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */
    onerror(err) {
      this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */
    socket(nsp, opts) {
      let socket2 = this.nsps[nsp];
      if (!socket2) {
        socket2 = new Socket2(this, nsp, opts);
        this.nsps[nsp] = socket2;
      } else if (this._autoConnect && !socket2.active) {
        socket2.connect();
      }
      return socket2;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */
    _destroy(socket2) {
      const nsps = Object.keys(this.nsps);
      for (const nsp of nsps) {
        const socket3 = this.nsps[nsp];
        if (socket3.active) {
          return;
        }
      }
      this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */
    _packet(packet) {
      const encodedPackets = this.encoder.encode(packet);
      for (let i2 = 0; i2 < encodedPackets.length; i2++) {
        this.engine.write(encodedPackets[i2], packet.options);
      }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */
    cleanup() {
      this.subs.forEach((subDestroy) => subDestroy());
      this.subs.length = 0;
      this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */
    _close() {
      this.skipReconnect = true;
      this._reconnecting = false;
      this.onclose("forced close");
    }
    /**
     * Alias for close()
     *
     * @private
     */
    disconnect() {
      return this._close();
    }
    /**
     * Called when:
     *
     * - the low-level engine is closed
     * - the parser encountered a badly formatted packet
     * - all sockets are disconnected
     *
     * @private
     */
    onclose(reason, description) {
      var _a4;
      this.cleanup();
      (_a4 = this.engine) === null || _a4 === void 0 ? void 0 : _a4.close();
      this.backoff.reset();
      this._readyState = "closed";
      this.emitReserved("close", reason, description);
      if (this._reconnection && !this.skipReconnect) {
        this.reconnect();
      }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */
    reconnect() {
      if (this._reconnecting || this.skipReconnect)
        return this;
      const self2 = this;
      if (this.backoff.attempts >= this._reconnectionAttempts) {
        this.backoff.reset();
        this.emitReserved("reconnect_failed");
        this._reconnecting = false;
      } else {
        const delay = this.backoff.duration();
        this._reconnecting = true;
        const timer = this.setTimeoutFn(() => {
          if (self2.skipReconnect)
            return;
          this.emitReserved("reconnect_attempt", self2.backoff.attempts);
          if (self2.skipReconnect)
            return;
          self2.open((err) => {
            if (err) {
              self2._reconnecting = false;
              self2.reconnect();
              this.emitReserved("reconnect_error", err);
            } else {
              self2.onreconnect();
            }
          });
        }, delay);
        if (this.opts.autoUnref) {
          timer.unref();
        }
        this.subs.push(() => {
          this.clearTimeoutFn(timer);
        });
      }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */
    onreconnect() {
      const attempt = this.backoff.attempts;
      this._reconnecting = false;
      this.backoff.reset();
      this.emitReserved("reconnect", attempt);
    }
  };

  // node_modules/socket.io-client/build/esm/index.js
  var cache = {};
  function lookup2(uri, opts) {
    if (typeof uri === "object") {
      opts = uri;
      uri = void 0;
    }
    opts = opts || {};
    const parsed = url(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
    let io;
    if (newConnection) {
      io = new Manager(source, opts);
    } else {
      if (!cache[id]) {
        cache[id] = new Manager(source, opts);
      }
      io = cache[id];
    }
    if (parsed.query && !opts.query) {
      opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
  }
  Object.assign(lookup2, {
    Manager,
    Socket: Socket2,
    io: lookup2,
    connect: lookup2
  });

  // node_modules/@randajan/bifrost/dist/client/index.js
  init_define_slib_info();

  // node_modules/@randajan/bifrost/dist/chunk-SYVCEPMC.js
  init_define_slib_info();

  // node_modules/@randajan/queue/dist/index.js
  init_define_slib_info();
  var numOrZero = (num2) => {
    const n = Number(num2);
    return isNaN(n) ? 0 : Math.max(0, n);
  };
  var toArray2 = (any) => {
    if (any == null) {
      return [];
    }
    if (Array.isArray(any)) {
      return any;
    }
    return [any];
  };
  var _pass = ["all", "first", "last"];
  var fakePromise = () => {
    const prom = {};
    prom.result = new Promise((res, rej) => {
      prom.resolve = res;
      prom.reject = rej;
    });
    return prom;
  };
  var Queue = class extends Function {
    constructor(processTasks, opt = {}) {
      super();
      opt = typeof opt === "object" ? opt : {};
      if (typeof processTasks !== "function") {
        throw Error("Queue(...) expect first argument to be function");
      }
      const onInit = opt.onInit;
      if (onInit && typeof onInit !== "function") {
        throw Error("Queue(...) expect opt.onInit to be function");
      }
      const pass2 = opt.pass != null ? opt.pass : "all";
      if (!_pass.includes(pass2)) {
        throw Error(`Queue(...) expect opt.pass to be one of: '${_pass.join("|")}'`);
      }
      const args = toArray2(opt.args);
      const softMs = numOrZero(opt.softMs);
      const hardMs = numOrZero(opt.hardMs);
      const maxSize = numOrZero(opt.maxSize);
      const hardMsActive = hardMs > softMs;
      let pcq, intA, intB, startAt, prom, tasks = [];
      if (pass2 === "all") {
        pcq = async (q) => processTasks(...args, q);
      } else if (pass2 === "first") {
        pcq = async (q) => processTasks(...args, ...q[0]);
      } else if (pass2 === "last") {
        pcq = async (q) => processTasks(...args, ...q[q.length - 1]);
      }
      const init = (_) => {
        startAt = Date.now();
        prom = fakePromise();
        if (onInit) {
          onInit();
        }
        if (hardMsActive) {
          intB = setTimeout(execute, hardMs);
        }
      };
      const execute = async (_) => {
        clearTimeout(intA);
        clearTimeout(intB);
        const q = tasks;
        tasks = [];
        startAt = void 0;
        pcq(q).then(prom.resolve).catch(prom.reject);
      };
      const call = async (...args2) => {
        clearTimeout(intA);
        tasks.push(args2);
        if (tasks.length === 1) {
          init();
        }
        if (maxSize && tasks.length >= maxSize) {
          execute();
        } else {
          intA = setTimeout(execute, softMs);
        }
        if (opt.returnResult) {
          return prom.result;
        }
      };
      const self2 = Object.setPrototypeOf(call, new.target.prototype);
      Object.defineProperties(self2, {
        isPending: { enumerable: true, get: (_) => !!startAt },
        size: { enumerable: true, get: (_) => tasks.length },
        startAt: { enumerable: true, get: (_) => startAt },
        softEndAt: { enumerable: true, get: (_) => !startAt ? void 0 : startAt + softMs },
        hardEndAt: { enumerable: true, get: (_) => !startAt || !hardMsActive ? void 0 : startAt + hardMs }
      });
      return self2;
    }
  };
  var createQueue = (processTasks, opt = {}) => new Queue(processTasks, opt);

  // node_modules/@randajan/bifrost/dist/chunk-SYVCEPMC.js
  var _bifrostEvent = "__$$BifrostDataChannel__";
  var msg = (method, text, descObj = {}) => {
    let desc = "";
    for (let i2 in descObj) {
      desc += (desc ? ", " : "") + ` ${i2} '${descObj[i2]}'`;
    }
    return `Bifrost${method}${desc} ${text}`;
  };
  var packError = (err) => {
    if (!(err instanceof Error)) {
      return err;
    }
    const e = {};
    for (let prop in Object.getOwnPropertyDescriptors(err)) {
      e[prop] = err[prop];
    }
    const { channel } = err;
    const extend = msg("", "remote", { channel });
    e.message = extend + " " + e.message;
    e.stack = extend + " " + e.stack;
    return e;
  };
  var unpackError = (err) => {
    if (!err?.message) {
      return err;
    }
    const e = new Error(err.message);
    for (let prop in err) {
      e[prop] = err[prop];
    }
    return e;
  };
  var validateOnError = (onError) => {
    if (typeof onError === "function") {
      return onError;
    }
    return () => {
    };
  };
  var emit = async (socket2, channel, body, onError) => {
    return new Promise((res, rej) => {
      socket2.emit(_bifrostEvent, { channel, body }, (ok, response) => {
        if (ok) {
          return res(response);
        }
        const err = unpackError(response);
        rej(err);
        onError(err);
      });
    });
  };
  var hear = (socket2, getChannel, onError) => {
    const listener = async ({ channel, body }, ack) => {
      const receiver = getChannel(channel);
      try {
        await ack(true, !receiver ? void 0 : await receiver(socket2, body));
      } catch (err) {
        err.channel = channel;
        await ack(false, packError(err));
        onError(err);
      }
    };
    socket2.on(_bifrostEvent, listener);
    return (_) => socket2.off(_bifrostEvent, listener);
  };
  var unregisterExe = (list, exe5) => {
    const x2 = list.indexOf(exe5);
    if (x2 < 0) {
      return false;
    }
    list.splice(x2, 1);
    return true;
  };
  var registerExe = (list, exe5) => {
    list.unshift(exe5);
    return (_) => unregisterExe(list, exe5);
  };
  var mapList = async (map, list, ...args) => {
    for (let i2 = list.length - 1; i2 >= 0; i2--) {
      try {
        const res = await list[i2](...args);
        if (map && typeof res === "function") {
          map.push(res);
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  var wrapWithQueue = (exe5, queue) => !queue ? exe5 : createQueue(exe5, queue);
  var wrapWithTrait = (exe5, trait) => !trait ? exe5 : async (s, ...a) => exe5(await trait(s, ...a), ...a);
  var stateExtract = (stateProperty, reply) => {
    if (stateProperty == null) {
      return reply;
    }
    if (reply != null) {
      return reply[stateProperty];
    }
  };
  var stateAttach = (stateProperty, reply, state) => {
    if (stateProperty == null) {
      return state;
    }
    if (reply == null) {
      return { [stateProperty]: state };
    }
    reply[stateProperty] = state;
    return reply;
  };
  var defaultStateAdapter = (opt) => {
    let state;
    opt.get = (_) => state;
    opt.set = (newState) => state = newState;
  };
  var defaultStatesAdapter = (opt) => {
    const states = /* @__PURE__ */ new Map();
    opt.get = (groupId) => states.get(groupId);
    opt.set = (state, groupId) => {
      if (state == null) {
        states.delete(groupId);
      } else {
        states.set(groupId, state);
      }
      return state;
    };
  };
  var formatReact = (reactions) => {
    if (!reactions) {
      return;
    }
    return (state, args) => {
      const { action, actionArguments } = state || {};
      if (!action) {
        throw Error(msg(".Beam", `undefined action`));
      }
      if (!reactions[action]) {
        throw Error(msg(".Beam", `unknown action '${action}'`));
      }
      return reactions[action](...actionArguments || [], ...args);
    };
  };
  var formatOpt = (channel, opt, isMultiState) => {
    if (!opt) {
      opt = {};
    }
    if (!opt.set) {
      if (opt.get) {
        opt.allowChanges = "none";
      }
      opt.set = opt.get;
    }
    if (!opt.get) {
      if (opt.set) {
        throw Error(msg(".Beam(opt)", "contain set property without get", { channel }));
      }
      if (!isMultiState) {
        defaultStateAdapter(opt);
      } else {
        defaultStatesAdapter(opt);
      }
    }
    if (opt.queue) {
      opt.queue.pass = "last";
      opt.queue.returnResult = true;
    }
    if (!opt.actions) {
      opt.actions = [];
    }
    opt.react = formatReact(opt.reactions);
    opt.set = wrapWithTrait(opt.set, opt.trait);
    return opt;
  };
  var enumerable2 = true;
  var _privates = /* @__PURE__ */ new WeakMap();
  var Beam = class {
    constructor(router, channel, routerAdapter, opt = {}) {
      const { pull: pullRaw, push: pushRaw, register: register2, isMultiState } = routerAdapter;
      const {
        get: get2,
        set: setRaw,
        remoteStateProp,
        localStateProp,
        allowChanges: ac,
        queue,
        actions,
        react,
        onError
      } = formatOpt(channel, opt, isMultiState);
      const _p = {
        channel,
        status: "init",
        // ["init", "error", "push", "pull", "ready"]
        watchers: [],
        error: null,
        pending: null,
        remoteStateProp,
        localStateProp,
        get: get2,
        actions
      };
      const propagate = (state, args) => {
        mapList(void 0, _p.watchers, state, ...args);
      };
      const set2 = async (state, args) => {
        let local;
        try {
          if (react) {
            state = await react(state, args);
          }
          local = await setRaw(state, ...args);
        } catch (error) {
          if (!onError) {
            throw error;
          }
          local = await onError(error, ...args);
        }
        propagate(stateExtract(localStateProp, local), args);
        return local;
      };
      const setRx = async (state, ...args) => {
        if (ac && ac != "remote") {
          throw Error(msg(".Beam", "doesn't allow remote changes", { channel }));
        }
        return set2(state, args);
      };
      const push = async (state, args) => {
        if (ac && ac != "local") {
          throw Error(msg(".Beam", "doesn't allow local changes", { channel }));
        }
        if (!pushRaw) {
          return set2(state, args);
        }
        const remote = await pushRaw(state, ...args);
        const local = await set2(stateExtract(remoteStateProp, remote), args);
        return stateAttach(remoteStateProp, remote, stateExtract(localStateProp, local));
      };
      const pull = !pullRaw ? async (args) => propagate(await get2(...args), args) : async (args) => set2(await pullRaw(...args), args);
      const processWithStatus = async (status, pending) => {
        let state;
        _p.status = status;
        _p.pending = pending;
        try {
          state = await _p.pending;
          _p.status = "ready";
        } catch (err) {
          console.error(err);
          _p.error = err;
          _p.status = "error";
        }
        delete _p.pending;
        return state;
      };
      _p.pull = (args) => processWithStatus("pull", pull(args));
      _p.push = wrapWithQueue((state, args) => processWithStatus("push", push(state, args)), queue);
      Object.defineProperties(this, {
        router: { value: router },
        channel: { enumerable: enumerable2, value: channel },
        isPending: { enumerable: enumerable2, get: (_) => !!_p.pending },
        isDone: { enumerable: enumerable2, get: (_) => _p.status === "ready" || _p.status === "error" },
        status: { enumerable: enumerable2, get: (_) => _p.status },
        allowChanges: { enumerable: enumerable2, value: ac }
      });
      _privates.set(this, _p);
      this.applyActions(this.set.bind(this), this);
      register2(this, setRx);
    }
    async refresh(...args) {
      const { pending, pull } = _privates.get(this);
      if (pending) {
        await pending;
      } else {
        await pull(args);
      }
    }
    getRaw(...args) {
      const { status, pull, get: get2 } = _privates.get(this);
      if (status === "init") {
        pull(args);
      }
      return get2(...args);
    }
    async get(...args) {
      const { pending, status, pull, get: get2 } = _privates.get(this);
      if (pending) {
        await pending;
      } else if (status === "init") {
        await pull(args);
      }
      return get2(...args);
    }
    async set(state, ...args) {
      const { pending, push } = _privates.get(this);
      if (pending) {
        await pending;
      }
      return push(state, args);
    }
    watch(watcher) {
      const { channel, watchers } = _privates.get(this);
      if (typeof watcher !== "function") {
        throw Error(msg(".Beam.watch(...)", "expect function", { channel }));
      }
      return registerExe(watchers, watcher);
    }
    extractRemoteState(reply) {
      const { remoteStateProp } = _privates.get(this);
      return stateExtract(remoteStateProp, reply);
    }
    extractLocalState(reply) {
      const { localStateProp } = _privates.get(this);
      return stateExtract(localStateProp, reply);
    }
    applyActions(setMethod, target = {}) {
      const { actions } = _privates.get(this);
      for (let action of actions) {
        const act = (...a) => setMethod({ action, actionArguments: a });
        Object.defineProperty(target, action, { value: act });
      }
      return target;
    }
  };

  // node_modules/@randajan/bifrost/dist/client/index.js
  var _privates2 = /* @__PURE__ */ new WeakMap();
  var ClientRouter = class {
    constructor(socket2, onError) {
      onError = validateOnError(onError);
      const _p = {
        socket: socket2,
        channels: /* @__PURE__ */ new Map(),
        onError
      };
      Object.defineProperties(this, {
        socket: { value: socket2 }
      });
      hear(socket2, (channel) => _p.channels.get(channel), onError);
      _privates2.set(this, _p);
    }
    async tx(channel, transceiver) {
      const { socket: socket2, onError } = _privates2.get(this);
      const rnbl = typeof transceiver === "function";
      if (!rnbl) {
        return emit(socket2, channel, transceiver, onError);
      }
      return transceiver((body) => emit(socket2, channel, body, onError));
    }
    rx(channel, receiver) {
      const { channels } = _privates2.get(this);
      if (channels.has(channel)) {
        throw Error(msg("Router", `allready exist!`, { channel }));
      }
      channels.set(channel, receiver);
      return (_) => {
        if (!channels.has(channel)) {
          return false;
        }
        channels.delete(channel);
        return true;
      };
    }
    createBeam(channel, opt = {}) {
      return new Beam(this, channel, {
        pull: async (_) => {
          return this.tx(channel, { isSet: false });
        },
        push: (state) => {
          return this.tx(channel, { isSet: true, state });
        },
        register: (beam2, set2) => {
          this.rx(channel, (socket2, state) => set2(state));
        }
      }, opt);
    }
  };

  // dist/index.js
  init_define_slib_info();

  // node_modules/@randajan/props/dist/esm/index.mjs
  init_define_slib_info();
  var solid = (obj, name, value2, enumerable3 = true, configurable = false) => {
    return Object.defineProperty(obj, name, { enumerable: enumerable3, value: value2, configurable });
  };
  var solids = (obj, namedValues, enumerable3 = true, configurable = false) => {
    for (const name in namedValues) {
      const value2 = namedValues[name];
      solid(obj, name, value2, enumerable3, configurable);
    }
    return obj;
  };
  var virtual = (obj, name, get2, enumerable3 = true, configurable = false) => {
    return Object.defineProperty(obj, name, { enumerable: enumerable3, get: get2, configurable });
  };
  var virtuals = (obj, namedGets, enumerable3 = true, configurable = false) => {
    for (const name in namedGets) {
      const get2 = namedGets[name];
      virtual(obj, name, get2, enumerable3, configurable);
    }
    return obj;
  };
  var safe = (obj, priv, name, set2, get2, enumerable3 = true, configurable = false) => {
    return Object.defineProperty(obj, name, {
      set: set2 ? (v) => priv[name] = set2(v, priv[name], name) : void 0,
      get: get2 ? (_) => get2(priv[name], name) : (_) => priv[name],
      enumerable: enumerable3,
      configurable
    });
  };
  var cached = (obj, priv, name, reset, get2, enumerable3 = true, configurable = false) => {
    const setAndGet = (v) => {
      if (!priv.hasOwnProperty(name)) {
        v = priv[name] = reset(name);
      }
      return get2 ? get2(v, name) : v;
    };
    return safe(obj, priv, name, null, setAndGet, enumerable3, configurable);
  };
  var cacheds = (obj, priv, namedResetsAndGets, enumerable3 = true) => {
    for (const name in namedResetsAndGets) {
      const resetGet = namedResetsAndGets[name];
      let reset, get2;
      if (typeof resetGet !== "object") {
        reset = resetGet;
      } else {
        reset = resetGet.reset || resetGet[0];
        get2 = resetGet.get || resetGet[1];
      }
      cached(obj, priv, name, reset, get2, enumerable3);
    }
    return obj;
  };

  // node_modules/@randajan/function-parser/dist/index.js
  init_define_slib_info();

  // node_modules/@randajan/jet/dist/esm/index.mjs
  init_define_slib_info();

  // node_modules/@randajan/jet/dist/esm/chunk-FP6FYSIB.js
  init_define_slib_info();

  // node_modules/@randajan/jet/node_modules/@randajan/function-parser/dist/index.js
  init_define_slib_info();

  // node_modules/@randajan/regex-parser/dist/esm/index.mjs
  init_define_slib_info();
  var _regex = /^\/((?:\\.|[^\\/])+)\/([a-z]*)$/i;
  var _regexEsc = /[.*+?^${}()|[\]\\]/g;
  var _unsafeSlash = /(^|[^\\])\//g;
  var rgxToStr = (rgx) => {
    if (!(rgx instanceof RegExp))
      throw new TypeError("Expected RegExp");
    const pattern = rgx.source.replace(_unsafeSlash, "$1\\/");
    return `/${pattern}/${rgx.flags}`;
  };
  var strToRgx = (str, strict = false) => {
    if (typeof str !== "string")
      throw new TypeError("Expected string");
    const m = str.match(_regex);
    if (m)
      return new RegExp(m[1], m[2]);
    if (strict)
      throw new SyntaxError("Invalid regex string");
    return new RegExp(str.replace(_regexEsc, "\\$&"));
  };

  // node_modules/@randajan/jet/node_modules/@randajan/function-parser/dist/index.js
  var unbracket = (str, br = "()") => {
    if (!str) {
      return str;
    }
    if (!str.startsWith(br[0])) {
      return str;
    }
    if (!str.endsWith(br[1])) {
      return;
    }
    return str.slice(1, -1).trim();
  };
  var splitCommon = (fstr) => {
    const lba = fstr.indexOf("(");
    if (lba < 0) {
      throw Error("Parsing common function - arguments are missing left bracket '('");
    }
    fstr = fstr.slice(lba);
    const rba = fstr.indexOf(")") + 1;
    if (rba <= 0) {
      throw Error("Parsing common function - arguments are missing right bracket ')'");
    }
    const args = fstr.slice(0, rba).trim();
    const body = fstr.slice(rba).trim();
    if (!body.startsWith("{") || !body.endsWith("}")) {
      throw Error("Parsing common function - body missing brackets '{...}'");
    }
    return [args, body.slice(1, -1).trim()];
  };
  var splitArrow = (fstr) => {
    const frags = fstr.split("=>");
    if (frags.length <= 1) {
      throw Error("Parsing arrow function - missing the arrow '=>'");
    }
    const args = frags.shift().trim();
    let body = frags.join("=>").trim();
    if (!body.startsWith("{")) {
      body = `return ${body}`;
    } else if (!body.endsWith("}")) {
      throw Error("Parsing arrow function - body missing right bracket '}'");
    } else {
      body = body.slice(1, -1).trim();
    }
    return [args, body];
  };
  var split = (fstr) => {
    fstr = fstr.trim().replace(/\s+/g, " ");
    return fstr.startsWith("function") ? splitCommon(fstr) : splitArrow(fstr);
  };
  var argRegExp = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
  var parseArgs = (args, to = []) => {
    if (args == null) {
      throw Error("Parsing arguments - missing");
    }
    args = unbracket(args.trim());
    if (args) {
      for (let a of args.split(",")) {
        a = a.trim();
        if (!argRegExp.test(a)) {
          throw Error("Parsing arguments - malformatted");
        }
        to.push(a);
      }
    }
    return to;
  };
  var fnToStr = (fn) => {
    const t = typeof fn;
    if (t !== "function") {
      throw Error("Stringify function - not a function");
    }
    const f = split(fn.toString());
    let args = unbracket(f[0]);
    if (!args || !argRegExp.test(args)) {
      args = `(${args})`;
    }
    let body = f[1];
    if (!body.startsWith("return")) {
      body = `{${body}}`;
    } else {
      body = body.slice(6).trim().replace(/;[\s\S]*$/, "");
      if (!body) {
        body = "{}";
      } else if (body.startsWith("{")) {
        body = "(" + body + ")";
      }
    }
    return `${args}=>${body}`;
  };
  var fromStr = (str, injectScope) => {
    const f = split(str);
    const args = parseArgs(f[0]);
    const body = f[1];
    const origin = new Function(args, body);
    if (!injectScope) {
      return origin;
    }
    const keys2 = Object.keys(injectScope);
    const vals = Object.values(injectScope);
    const injected = new Function([...keys2, ...args], body);
    const binded = (...a) => injected(...vals, ...a);
    return Object.defineProperty(binded, "toString", { value: (_) => origin.toString() });
  };
  var fromAny = (any, type = "string") => {
    let body;
    if (any === void 0) {
      return new Function();
    }
    if (type === "string" || type === "number" || type === "boolean" || type === "bigint") {
      body = `${any}`;
    } else if (type === "symbol") {
      throw Error("Creating function - symbol is not supported");
    } else if (any instanceof Date) {
      body = `new Date('${any}')`;
    } else if (any instanceof RegExp) {
      body = rgxToStr(any);
    } else if (type === "object") {
      let isMap = any instanceof Map;
      if (isMap) {
        any = Object.fromEntries(any);
      }
      try {
        body = `(${JSON.stringify(any)})`;
      } catch (e) {
        throw Error("Creating function - object replication failed");
      }
      if (isMap) {
        body = `new Map(Object.entries(${body}))`;
        console.log(body);
      }
    }
    if (!body) {
      throw Error("Creating function - unknown input");
    }
    return new Function(`return ${body}`);
  };
  var _quoted = /^['"`]/;
  var anyToFn = (any, injectScope) => {
    const type = typeof any;
    return type !== "string" || _quoted.test(any) ? fromAny(any, type) : fromStr(any, injectScope);
  };

  // node_modules/@randajan/jet/dist/esm/chunk-FP6FYSIB.js
  var solids2 = (target, vals, enumerable3 = true) => {
    for (const k in vals) {
      Object.defineProperty(target, k, { value: vals[k], enumerable: enumerable3 });
    }
    return target;
  };
  var FnProxy = class extends Function {
    constructor(fce) {
      super();
      return Object.setPrototypeOf(fce ? fce.bind() : this, new.target.prototype);
    }
  };
  var _a;
  var NoType = (_a = class extends FnProxy {
    constructor(def, name) {
      super((...a) => this.create(...a));
      const { isIterable: isIterable2 } = this.constructor;
      solids2(this, {
        name,
        isIterable: isIterable2,
        create: this.create.bind(def),
        rnd: this.rnd.bind(def),
        is: this.is.bind(def),
        convert: this.convert.bind(def),
        convertDbg: this.convertDbg.bind(def),
        to: this.to.bind(def),
        tor: this.tor.bind(def),
        copy: this.copy.bind(def),
        isFilled: this.isFilled.bind(def),
        isBlank: this.isBlank.bind(def),
        defineFrom: this.defineFrom.bind(def),
        extend: this.extend.bind(def)
      });
    }
    create() {
    }
    rnd() {
    }
    is(any) {
      return false;
    }
    convert() {
    }
    convertDbg(any) {
    }
    to(any, ...args) {
    }
    tor(any, ...args) {
    }
    copy(any) {
      fail2("unknown type copy failed");
    }
    isFilled(any) {
      return isFilled(any);
    }
    isBlank(any) {
      return !isFilled(any);
    }
    defineFrom(from, exe5) {
      const tf = typeof from;
      if (Array.isArray(from)) {
        for (let f of from) {
          this.from.set(f, exe5);
        }
      } else if (tf === "object") {
        for (let i2 in from) {
          this.from.set(i2, from[i2]);
        }
      } else if (tt === "string") {
        this.from.set(i, exe5);
      } else {
        fail2(`from must be typeof string, array or object`, this.name);
      }
      resetConvPaths();
      return this.type;
    }
    addTools(tools2 = {}) {
      if (typeof tools2 !== "object") {
        fail2(`tools must be typeof object`, this.name);
      }
      solids2(this, tools2);
      return this;
    }
    extend(name, opt = {}) {
      return this.constructor.createType(name, opt, this);
    }
  }, __publicField(_a, "isIterable", false), _a);
  var NoDefinition = class {
    constructor() {
      this.type = new NoType();
      this.to = /* @__PURE__ */ new Map([
        ["obj", (any) => ({ ...any })],
        ["str", (any) => any == null ? "" : String(any)]
      ]);
    }
  };
  var byName = /* @__PURE__ */ new Map();
  var byPrototype = /* @__PURE__ */ new Map();
  var _msg = (msg2, name) => `jet${name ? ` type '${name}'` : ""} ${msg2}`;
  var fail2 = (msg2, name, cause) => {
    throw new Error(_msg(msg2, name), { cause });
  };
  var warn = (msg2, name) => {
    console.warn(_msg(msg2, name));
  };
  var getDefByName = (name, throwError = false) => {
    const type = byName.get(name);
    if (type) {
      return type;
    }
    if (throwError) {
      fail2(`undefined type '${name}'`);
    }
  };
  var getTypesList = () => [...byName.keys()];
  var getByInst = (any, def) => {
    if (def.is(any)) {
      return def;
    }
  };
  var _undefined = new NoDefinition();
  var getDefByInst = (any) => {
    if (any == null) {
      return _undefined;
    }
    const list = byPrototype.get(any.__proto__);
    if (!list || !list.length) {
      return _undefined;
    }
    if (list.length === 1) {
      const r = getByInst(any, list[0]);
      if (r) {
        return r;
      }
    } else {
      for (const def of list) {
        const r = getByInst(any, def);
        if (r) {
          return r;
        }
      }
    }
    return _undefined;
  };
  var getTypeByInst = (any) => getDefByInst(any).type;
  var register = (def) => {
    const { name, self: self2 } = def.type;
    const prot = self2.prototype;
    byName.set(name, def);
    const list = byPrototype.get(prot);
    if (list) {
      list.unshift(def);
    } else {
      byPrototype.set(prot, [def]);
    }
    resetConvPaths();
  };
  var factory = (type, mm, ...args) => {
    for (const a of args) {
      const d = getDefByInst(a);
      if (type && type !== d.type) {
        continue;
      }
      if (mm === 0 && !d.isFilled(a)) {
        continue;
      }
      return mm === 3 ? d.copy(a) : a;
    }
    if (type && mm > 1) {
      return type.create();
    }
  };
  var isFilled = (any) => any === false || any === 0 || !!any;
  var isFilleds = (obj) => {
    for (let i2 in obj) {
      if (isFilled(obj[i2])) {
        return true;
      }
    }
    return false;
  };
  var convPaths = /* @__PURE__ */ new Map();
  var resetConvPaths = () => {
    convPaths.clear();
  };
  var _findConvPath = (fromDef, toDef) => {
    const ancestors = [];
    for (let cur = fromDef; cur; ) {
      ancestors.push(cur);
      cur = cur.parent;
    }
    for (const anc of ancestors) {
      const direct = toDef.from.get(anc.name);
      if (!direct) {
        continue;
      }
      const steps = [];
      for (let cDef = fromDef; cDef !== anc; ) {
        const pDef = cDef?.parent;
        if (!pDef) {
          return;
        }
        steps.push({ from: cDef.name, to: pDef.name, kind: "lift", fn: pDef.from.get(cDef.name) });
        cDef = pDef;
      }
      steps.push({ from: anc.name, to: toDef.name, kind: "direct", fn: direct });
      return steps;
    }
    return;
  };
  var findConvPath = (fromDef, toDef) => {
    if (fromDef === toDef) {
      return [];
    }
    const key = fromDef.name + "\u2192" + toDef.name;
    if (convPaths.has(key)) {
      return convPaths.get(key);
    }
    const steps = _findConvPath(fromDef, toDef);
    if (!steps) {
      fail2(`conversion to '${toDef.name}' not defined`, fromDef.name);
    }
    convPaths.set(key, steps);
    return steps;
  };
  var jet2 = new Proxy(getTypeByInst, {
    get: (_, name) => getDefByName(name, true).type,
    has: (_, name) => !!getDefByName(name),
    set: (_, name) => fail2(`types can't be defined this way. Use define('${name}', ...) instead`),
    deleteProperty: (_) => fail2(`types can't be deleted`),
    ownKeys: getTypesList,
    getOwnPropertyDescriptor: (_, name) => ({
      enumerable: true,
      configurable: true,
      value: getDefByName(name).type
    })
  });
  var _cryptonit;
  var createGenerator = () => {
    if (typeof crypto !== "undefined") {
      if (crypto.getRandomValues) {
        return (_) => {
          const a = new Uint32Array(1);
          crypto.getRandomValues(a);
          return a[0] / 2 ** 32;
        };
      } else if (crypto.randomBytes) {
        return (_) => crypto.randomBytes(4).readUInt32LE() / 2 ** 32;
      }
    }
    warn("missing crypto module = weaker random number generator");
    return (_) => Math.random();
  };
  var numRnd = () => {
    return (_cryptonit || (_cryptonit = createGenerator()))();
  };
  var bolRnd = (ratio = 0.5) => numRnd() >= ratio;
  var _a2;
  var Primitive = (_a2 = class extends NoType {
    constructor(def, name, opt) {
      super(def, name);
      const { self: self2, fallback } = opt;
      solids2(this, { self: self2, fallback });
    }
    create(...a) {
      return this.create(...a);
    }
    rnd(...a) {
      return this.rnd(...a);
    }
    is(any) {
      const { self: self2 } = this.type;
      if (any == null) {
        return false;
      }
      if (any.constructor !== self2 && !(any instanceof self2)) {
        return false;
      }
      return this.type === getTypeByInst(any);
    }
    isFilled(any) {
      const { type: { is }, isFilled: isFilled3 } = this;
      return is(any) && !!isFilled3(any);
    }
    isBlank(any) {
      const { type: { is }, isFilled: isFilled3 } = this;
      return is(any) && !isFilled3(any);
    }
    convert(any, opt = {}) {
      const dTo = this;
      const dFrom = getDefByInst(any, false);
      const convPath = findConvPath(dFrom, dTo);
      if (typeof opt === "string") {
        opt = { glue: opt };
      }
      try {
        return convPath.reduce((v, step) => step.fn(v, opt), any);
      } catch (err) {
        fail2(`conversion to '${dTo.name}' failed`, dFrom.name, err);
      }
    }
    convertDbg(any) {
      const dTo = this;
      const dFrom = getDefByInst(any, false);
      const convPath = findConvPath(dFrom, dTo);
      return convPath.map((p) => ({ ...p }));
    }
    to(any, opt = {}) {
      return any == null ? any : this.type.convert(any, opt);
    }
    tor(any, opt = {}) {
      return any == null ? this.type.create() : this.type.convert(any, opt);
    }
    copy(any) {
      const { name, is } = this.type;
      if (is(any)) {
        return this.copy(any);
      }
      fail2(`copy failed - type mismatch`, name);
    }
    filled(...a) {
      return factory(this, 0, ...a);
    }
    only(...a) {
      return factory(this, 1, ...a);
    }
    ensure(...a) {
      return factory(this, 2, ...a);
    }
    ensureCopy(...a) {
      return factory(this, 3, ...a);
    }
  }, __publicField(_a2, "isIterable", false), _a2);
  var _a3;
  var Iterable = (_a3 = class extends Primitive {
    constructor(def, name, opt) {
      const { keys: keys2, values: values2, entries: entries2, get: get2, set: set2, del: del2 } = opt;
      super(def, name, opt);
      const enumerable3 = true;
      Object.defineProperties(this, {
        keys: { enumerable: enumerable3, value: keys2 },
        values: { enumerable: enumerable3, value: values2 }
      });
      solids2(this, {
        keys: keys2,
        values: values2,
        entries: entries2,
        get: get2 || ((x2, k) => x2[k]),
        set: set2 || ((x2, k, v) => x2[k] = v),
        del: del2 || ((x2, k) => delete x2[k])
      });
    }
  }, __publicField(_a3, "isIterable", true), _a3);
  var _options = ["self", "fromParent", "toParent", "create", "is", "isFilled", "copy", "rnd", "keys", "values", "entries", "get", "set", "del"];
  var Definition = class _Definition {
    static create(name, opt = {}, parent = null) {
      return new _Definition(name, opt, parent);
    }
    static createType(name, opt = {}, parent = null) {
      return _Definition.create(name, opt, parent).type;
    }
    constructor(name, opt = {}, parent = null) {
      if (getDefByName(name)) {
        fail2("is allready defined", name);
      }
      const { self: self2, create, rnd, is, isFilled: isFilled3, copy: copy2, keys: keys2, values: values2, entries: entries2, fromParent, toParent } = opt;
      if (!self2) {
        fail2("opt.self (constructor) missing", name);
      }
      if (parent && (!toParent || !fromParent)) {
        fail2("opt.fromParent or opt.toParent missing", name);
      }
      if ((keys2 || values2 || entries2) && !(keys2 && values2 && entries2)) {
        fail2("opt.keys, opt.values or opt.entries missing", name);
      }
      const unknownOpt = Object.keys(opt).filter((p) => !_options.includes(p));
      if (unknownOpt.length) {
        warn(`unknown definition: '${unknownOpt.join("', '")}'`, name);
      }
      this.parent = parent;
      this.name = name;
      this.create = create || ((...a) => new self2(...a));
      this.rnd = rnd || this.create;
      this.is = is || ((_) => true);
      this.copy = copy2 || ((_) => fail2("copy method not defined", name));
      this.from = /* @__PURE__ */ new Map();
      this.isFilled = isFilled3 || (!entries2 ? isFilled : (any) => isFilleds(values2(any)));
      this.type = entries2 ? new Iterable(this, name, opt) : new Primitive(this, name, opt);
      if (parent) {
        this.from.set(parent.name, fromParent);
        parent.from.set(name, toParent);
      }
      register(this);
    }
  };
  var rgxLib = {
    line: /[^\n\r]+/g,
    number: /-?(\d+(\s+\d+)*)*[,.]?\d+/,
    word: /[^\s\n\r]+/g,
    num: /-?[0-9]*[.,]?[0-9]+/,
    email: /(?:[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
    ip: /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))/i,
    domain: /([a-z0-9]+\.)+(cz|de|sk|au|com|eu|info|org|[a-z]+)/i,
    hexadecimal: /[0-9a-fA-F]{6,6}/
  };
  var strToNum = (str) => {
    if (!str) {
      return;
    }
    const match = str.replace(/\u00A0/g, " ").match(rgxLib.number);
    if (!match || !match[0]) {
      return;
    }
    const n = Number(match[0].replaceAll(" ", "").replace(",", "."));
    if (!isNaN(n)) {
      return n;
    }
  };
  var symToStr = (sym) => String(sym).slice(7, -1);
  var errToObj = (err) => {
    const plain = {};
    for (const key of Object.getOwnPropertyNames(err)) {
      plain[key] = err[key];
    }
    return plain;
  };
  var numToDt = (num2) => {
    const dt = /* @__PURE__ */ new Date();
    dt.setTime(num2);
    return dt;
  };
  var mapToObj = (map) => Object.fromEntries(map.entries());
  var objToMap = (obj) => new Map(Object.entries(obj));
  var arrToStr = (arr, { glue }) => arr.join(glue ?? "");
  var hidePats = {
    point: "\u2022",
    cross: "\xD7",
    flake: "\u2600",
    draft: "\u232D",
    power: "\u26A1",
    star: "\u2605",
    skull: "\u2620",
    card: "\u2660\u2665\u2666\u2663",
    notes: "\u2669\u266A\u266B\u266C\u266D\u266E\u266F",
    chess: "\u2654\u2655\u2656\u2657\u2658\u2659\u265A\u265B\u265C\u265D\u265E\u265F",
    block: "\u2596\u2597\u2598\u2599\u259A\u259B\u259C\u259D\u259E\u259F",
    bar: "\u2502\u2551 \u258C\u2590\u2588",
    iting: "\u2630\u2631\u2632\u2633\u2634\u2635\u2636\u2637",
    astro: "\u2648\u2649\u264A\u264B\u264C\u264D\u264E\u264F\u2650\u2651\u2652\u2653",
    die: "\u2680\u2681\u2682\u2683\u2684\u2685",
    runic: "\u16A0\u16A1\u16A2\u16A3\u16A4\u16A5\u16A6\u16A7\u16A8\u16A9\u16AA\u16AB\u16AC\u16AD\u16AE\u16AF\u16B0\u16B1\u16B3\u16B4\u16B5\u16B6\u16B7\u16B8\u16B9\u16BA\u16BB\u16BC\u16BD\u16BE\u16BF\u16C0\u16C1\u16C2\u16C3\u16C4\u16C5\u16C6\u16C7\u16C8\u16C9\u16CA\u16CB\u16CF\u16D0\u16D1\u16D2\u16D3\u16D4\u16D5\u16D6\u16D7\u16D8\u16D9\u16DA\u16DB\u16DC\u16DD\u16DE\u16DF\u16E0\u16E1\u16E2\u16E3\u16E4\u16E5\u16E6\u16E8\u16E9\u16EA\u16EE\u16EF\u16F0",
    dots: "\u2801\u2802\u2803\u2804\u2805\u2806\u2807\u2808\u2809\u280A\u280B\u280C\u280D\u280E\u280F\u2810\u2811\u2812\u2813\u2814\u2815\u2816\u2817\u2818\u2819\u281A\u281B\u281C\u281D\u281E\u281F\u2820\u2821\u2822\u2823\u2824\u2825\u2826\u2827\u2828\u2829\u282A\u282B\u282C\u282D\u282E\u282F\u2830\u2831\u2832\u2833\u2834\u2835\u2836\u2837\u2838\u2839\u283A\u283B\u283C\u283D\u283E\u283F\u2840\u2841\u2842\u2843\u2844\u2845\u2846\u2847\u2848\u2849\u284A\u284B\u284C\u284D\u284E\u284F\u2850\u2851\u2852\u2853\u2854\u2855\u2856\u2857\u2858\u2859\u285A\u285B\u285C\u285D\u285E\u285F\u2860\u2861\u2862\u2863\u2864\u2865\u2866\u2867\u2868\u2869\u286A\u286B\u286C\u286D\u286E\u286F\u2870\u2871\u2872\u2873\u2874\u2875\u2876\u2877\u2878\u2879\u287A\u287B\u287C\u287D\u287E\u287F\u2880\u2881\u2882\u2883\u2884\u2885\u2886\u2887\u2888\u2889\u288A\u288B\u288C\u288D\u288E\u288F\u2890\u2891\u2892\u2893\u2894\u2895\u2896\u2897\u2898\u2899\u289A\u289B\u289C\u289D\u289E\u289F\u28A0\u28A1\u28A2\u28A3\u28A4\u28A5\u28A6\u28A7\u28A8\u28A9\u28AA\u28AB\u28AC\u28AD\u28AE\u28AF\u28B0\u28B1\u28B2\u28B3\u28B4\u28B5\u28B6\u28B7\u28B8\u28B9\u28BA\u28BB\u28BC\u28BD\u28BE\u28BF\u28C0\u28C1\u28C2\u28C3\u28C4\u28C5\u28C6\u28C7\u28C8\u28C9\u28CA\u28CB\u28CC\u28CD\u28CE\u28CF\u28D0\u28D1\u28D2\u28D3\u28D4\u28D5\u28D6\u28D7\u28D8\u28D9\u28DA\u28DB\u28DC\u28DD\u28DE\u28DF\u28E0\u28E1\u28E2\u28E3\u28E4\u28E5\u28E6\u28E7\u28E8\u28E9\u28EA\u28EB\u28EC\u28ED\u28EE\u28EF\u28F0\u28F1\u28F2\u28F3\u28F4\u28F5\u28F6\u28F7\u28F8\u28F9\u28FA\u28FB\u28FC\u28FD\u28FE\u28FF"
  };
  var deloneMap = {
    to: "aaccdeeillnooorstuuuyrzzAACCDEEILLNOOORSTUUUYRZZ",
    from: "\xE1\xE4\u010D\u0107\u010F\xE9\u011B\xED\u013A\u013E\u0148\xF3\xF4\xF6\u0155\u0161\u0165\xFA\u016F\xFC\xFD\u0159\u017E\u017A\xC1\xC4\u010C\u0106\u010E\xC9\u011A\xCD\u0139\u013D\u0147\xD3\xD4\xD6\u0154\u0160\u0164\xDA\u016E\xDC\xDD\u0158\u017D\u0179"
  };
  var fight = (str1, str2) => {
    str1 = _str.to(str1), str2 = _str.to(str2);
    if (str1 === str2) {
      return;
    }
    for (let i2 = 0; true; i2++) {
      const s1 = str1[i2], s2 = str2[i2];
      if (!s1 || !s2) {
        return !s1;
      } else if (s1 === s2) {
        continue;
      }
      const d1 = _str.delone(s1), d2 = _str.delone(s2);
      if (d1 === d2) {
        return (s1.charCodeAt(0) || 0) < (s2.charCodeAt(0) || 0);
      }
      const l1 = d1.toLowerCase(), l2 = d2.toLowerCase();
      if (l1 === l2) {
        return (d1.charCodeAt(0) || 0) < (d2.charCodeAt(0) || 0);
      }
      return (l1.charCodeAt(0) || 0) < (l2.charCodeAt(0) || 0);
    }
  };
  var _str = Definition.createType("str", {
    self: String,
    isFilled: (x2) => !!x2,
    create: (any) => any == null ? "" : String(any),
    copy: (str) => str,
    rnd: (min, max, sqr) => {
      const c = ["bcdfghjklmnpqrstvwxz", "aeiouy"], p = c[0].length / (c[0].length + c[1].length);
      const l = _num.rnd(Math.max(min, 2), max, sqr);
      let s = bolRnd(p), r = "";
      while (r.length < l) {
        r += _getRnd(c[+(s = !s)]);
      }
      return r;
    }
  }).defineFrom({
    arr: arrToStr,
    bol: (bol) => String(bol),
    dt: (dt) => dt.toLocaleString(),
    //err,
    fn: (fn) => fnToStr(fn),
    //map,
    num: (num2) => String(num2),
    //obj,
    //rgx,
    //set,
    //str,
    sym: symToStr
  }).addTools({
    isNumeric: (str) => !isNaN(Number(str)),
    capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
    camelCase: (str) => str.replace(/[^a-zA-Z0-9]+/g, " ").trim().split(" ").map((s, i2) => i2 ? _str.capitalize(s) : s).join(""),
    pascalCase: (str) => str.replace(/[^a-zA-Z0-9]+/g, " ").trim().split(" ").map((s) => _str.capitalize(s)).join(""),
    snakeCase: (str) => str.replace(/[^a-zA-Z0-9]+/g, " ").trim().replaceAll(" ", "_"),
    delone: (str) => {
      let r = "";
      for (let v of str) {
        let x2 = deloneMap.from.indexOf(v);
        r += x2 >= 0 ? deloneMap.to[x2] : v;
      }
      return r;
    },
    efface: (str, remove) => str.replaceAll(remove, "").replace(/[\s\n\r]+/g, " ").trim(),
    simplify: (str, remove) => _str.delone(_str.efface(str, remove)).toLowerCase(),
    fight: (str1, str2, asc = true) => asc ? fight(str1, str2) : fight(str2, str1),
    sort: (str1, str2, asc = true) => _str.fight(str1, str2, asc) ? -1 : 1,
    sortAsc: (str1, str2) => _str.sort(str1, str2, true),
    sortDsc: (str1, str2) => _str.sort(str1, str2, false),
    carret: (str, pos) => _num.frame(_num.ensure(pos, str.length), 0, str.length),
    quote: (str, quoteLeft = "'", quoteRight = "'") => str ? quoteLeft + str + quoteRight : "",
    splice: (str, index, howmany, ...strs) => {
      const s = _str.carret(str, index), m = _num.frame(howmany, 0, str.length - s);
      return str.slice(0, s) + _str.to(strs, "") + str.slice(s + m);
    },
    hide: (str, pat, whitespace) => {
      if (!str) {
        return str;
      }
      var r = "", s = str, p = hidePats[pat] || pat || "\u2022", w = whitespace === false;
      for (var i2 = 0; i2 < str.length; i2++) {
        r += w && (s[i2] === "\n" || s[i2] === " ") ? s[i2] : p.length - 1 ? _getRnd(p) : p;
      }
      return r;
    },
    hidePatterns: hidePats,
    bite: (str, separator) => {
      const x2 = str.indexOf(separator);
      return x2 <= 0 ? ["", str] : [str.slice(0, x2), str.slice(x2 + separator.length)];
    },
    uid: (length = 12, pattern = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890") => {
      let r = "";
      pattern = _str.to(pattern) || "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      while (r.length < length) {
        r += _getRnd(pattern);
      }
      return r;
    },
    levenshtein: (s0, s1, blend) => {
      var s = blend === false ? [s0, s1] : [_str.simplify(s0, blend), _str.simplify(s1, blend)];
      if (s[0] === s[1]) {
        return 1;
      } else if (!s[0] || !s[1]) {
        return 0;
      }
      var l = [s[0].length, s[1].length], c = [];
      if (l[1] > l[0]) {
        l.reverse();
        s.reverse();
      }
      for (var i2 = 0; i2 <= l[0]; i2++) {
        var oV = i2;
        for (var j = 0; j <= l[1]; j++) {
          if (i2 === 0) {
            c[j] = j;
          } else if (j > 0) {
            var nV = c[j - 1];
            if (s[0].charAt(i2 - 1) !== s[1].charAt(j - 1)) {
              nV = Math.min(Math.min(nV, oV), c[j]) + 1;
            }
            c[j - 1] = oV;
            oV = nV;
          }
        }
        if (i2 > 0) {
          c[l[1]] = oV;
        }
      }
      return (l[0] - c[l[1]]) / parseFloat(l[0]);
    },
    mutate: (str, factor) => {
      var r = [], n = str.length / 2, m = str.length * 2, f = Math.abs(1e3 * (factor || 1));
      while (r.length < f) {
        var s = _str.rnd(n, m);
        r.push([s, _str.levenshtein(s, str)]);
      }
      return r.sort((a, b) => b[1] - a[1])[0][0];
    }
  });
  var _num = Definition.createType("num", {
    self: Number,
    create: Number,
    isFilled: (x2) => !!x2,
    copy: (num2) => num2,
    rnd: (min, max, sqr) => {
      let r = numRnd();
      sqr = sqr === true ? 2 : sqr === false ? -2 : _num.is(sqr) ? sqr : 0;
      if (sqr) {
        r = Math.pow(r, sqr < 0 ? -sqr : 1 / sqr);
      }
      return _num.fromRatio(r, min || 0, max || min || 1);
    }
  }).defineFrom({
    //arr,
    //fn,
    //obj,
    str: strToNum,
    bol: (v) => +v,
    dt: (v) => v.getTime()
    //err,
    //map,
    //rgx,
    //set,
    //sym
  }).addTools({
    x: (num1, symbol, num2) => {
      const s = symbol, nums = _num.zoomIn(num1, num2), [n, m] = nums;
      if (s === "/") {
        return n / m;
      }
      if (s === "*") {
        return n * m / Math.pow(nums.zoom, 2);
      }
      return (s === "+" ? n + m : s === "-" ? n - m : s === "%" ? n % m : NaN) / nums.zoom;
    },
    frame: (num2, min, max) => {
      num2 = max == null ? num2 : Math.min(num2, max);
      return min == null ? num2 : Math.max(num2, min);
    },
    round: (num2, dec, kind) => {
      const k = Math.pow(10, dec || 0);
      return Math[kind == null ? "round" : kind ? "ceil" : "floor"](num2 * k) / k;
    },
    len: (num2, bol) => {
      const b = bol, s = _str.to(num2), l = s.length, i2 = s.indexOf("."), p = i2 >= 0;
      return b === false ? p ? l - i2 - 1 : 0 : !p || !b ? l : i2;
    },
    period: (val, min, max) => {
      const m = max - min;
      return (m + (val - min) % m) % m + min;
    },
    toRatio: (num2, min, max) => {
      const m = max - min;
      return m ? (num2 - min) / m : 0;
    },
    fromRatio: (num2, min, max) => {
      const m = max - min;
      return num2 * m + min;
    },
    zoomIn: (...nums) => {
      const zoom = Math.pow(10, Math.max(...nums.map((num2) => _num.len(num2, false))));
      const res = nums.map((num2) => Math.round(num2 * zoom));
      return Object.defineProperty(res, "zoom", { value: zoom });
    },
    zoomOut: (...nums) => nums.map((num2) => num2 / nums.zoom),
    diffusion: (num2, min, max, diffusion) => {
      const d = num2 * diffusion;
      return _num.rnd(Math.max(min, num2 - d), Math.min(max, num2 + d));
    },
    snap: (num2, step, min, max, ceil, frame = true) => {
      var v = num2, s = step, n = min, m = max, ni = n != null, mi = m != null, c = ceil;
      if (v == null || s == null || s <= 0 || !(ni || mi)) {
        return v;
      } else if (frame) {
        v = _num.frame(v, n, m);
      }
      var r = ni ? v - n : m - v;
      v = r % s ? (ni ? n : m) + _num.round(r / s, 0, c == null ? null : c === ni) * s * (ni * 2 - 1) : v;
      return frame ? _num.frame(v, n, m) : v;
    },
    whatpow: (num2, base) => Math.log(num2) / Math.log(_num.to(base)),
    toHex: (num2) => {
      var r = Math.round(num2).toString(16);
      return r.length === 1 ? "0" + r : r;
    },
    toLetter: (num2, letters) => {
      letters = _str.to(letters) || "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const len = letters.length;
      return (num2 >= len ? _num.toLetter(Math.floor(num2 / len) - 1) : "") + letters[num2 % len];
    }
  });
  Definition.createType("nan", {
    self: Number,
    create: (_) => NaN,
    is: isNaN
  });
  var _getRnd = (arr, min, max, sqr) => {
    if (!arr?.length) {
      return;
    }
    const l = arr.length;
    return arr[Math.floor(_num.rnd(_num.frame(min || 0, 0, l), _num.frame(max || l, 0, l), sqr))];
  };
  var isRunnable = (any) => typeof any === "function";
  var _fn = Definition.createType("fn", {
    self: Function,
    create: Function,
    copy: (x2) => Object.defineProperties({ [x2.name]: (...a) => x2(...a) }[x2.name], Object.getOwnPropertyDescriptors(x2))
  }).defineFrom({
    arr: anyToFn,
    bol: anyToFn,
    dt: anyToFn,
    err: anyToFn,
    //fn:,
    map: anyToFn,
    num: anyToFn,
    obj: anyToFn,
    rgx: anyToFn,
    set: anyToFn,
    str: anyToFn
    //sym
  }).addTools({
    benchmark: (fces, inputs, iterations = 100) => {
      const results = [];
      const args = [];
      for (let i2 = 0; i2 < iterations; i2++) {
        args[i2] = inputs.map((f) => f());
      }
      for (const key in fces) {
        const fce = fces[key];
        if (typeof fce !== "function") {
          continue;
        }
        const log2 = [];
        const startTime = performance.now();
        for (let i2 = 0; i2 < iterations; i2++) {
          log2.push({ inputs: args[i2], output: fce(...args[i2]) });
        }
        const endTime = performance.now();
        const duration = endTime - startTime;
        results.push({ name: fce.name || key, duration, log: log2 });
      }
      return results.sort((a, b) => a.duration - b.duration);
    }
  });
  var _arr = Definition.createType("arr", {
    self: Array,
    create: Array,
    isFilled: (x2) => !!x2?.length,
    copy: (x2) => Array.from(x2),
    keys: (x2) => [...x2.keys()],
    values: (x2) => [...x2.values()],
    entries: (x2) => [...x2.entries()]
  }).defineFrom({
    //arr,
    //bol,
    //dt,
    //err,
    //fn,
    //num,
    //obj,
    //rgx,
    //set,
    str: (v, { glue }) => v.split(glue)
  }).addTools({
    wrap: (any) => Array.isArray(any) ? any : [any],
    swap: (arr, to, from) => {
      [arr[to], arr[from]] = [arr[from], arr[to]];
      return arr;
    },
    shuffle: (arr) => {
      for (let i2 = arr.length - 1; i2 > 0; i2--) {
        _arr.swap(arr, Math.floor(numRnd() * (i2 + 1)), i2);
      }
      return arr;
    },
    clean: (arr, rekey, handler) => {
      handler = _fn.ensure(handler, (v) => v != null);
      return rekey !== false ? arr.filter(handler) : arr.map((v) => handler(v) ? v : void 0);
    },
    compare: (a, b, sameIndex = false) => {
      if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) {
        return false;
      }
      const m = /* @__PURE__ */ new Map();
      const wr = (v, dir) => {
        const c = (m.get(v) || 0) + dir;
        if (!c) {
          m.delete(v);
        } else {
          m.set(v, c);
        }
      };
      for (let i2 = 0; i2 < a.length; i2++) {
        if (a[i2] === b[i2]) {
          continue;
        }
        if (sameIndex) {
          return false;
        }
        wr(a[i2], 1);
        wr(b[i2], -1);
      }
      return !m.size;
    },
    sliceMap: (arr, size, callback) => {
      if (!isRunnable(callback)) {
        callback = (_) => _;
      }
      size = Math.max(1, size) || 1;
      const r = [];
      if (!Array.isArray(arr)) {
        return r;
      }
      for (let k = 0; k < arr.length; k += size) {
        r.push(callback(arr.slice(k, k + size), r.length, size, arr.length));
      }
      return r;
    }
  });
  var boolPats = /^(y(es|eah)?|t(rue)?|on|ok(ay)?|enable(d)?|(allow|accept)(ed)?|active|\d*[1-9]+\d*([,.]\d+)?|\d*[,.]\d*[1-9]+\d*)$/i;
  var _bol = Definition.createType("bol", {
    self: Boolean,
    create: Boolean,
    isFilled: (_) => true,
    copy: (bol) => bol,
    rnd: bolRnd
  }).defineFrom({
    arr: (v) => true,
    //    bol: arr => !!arr.length,
    //bol:,
    dt: (v) => !!v.getTime(),
    err: (v) => true,
    fn: (v) => true,
    num: (v) => !!v,
    obj: (v) => true,
    rgx: (v) => true,
    set: (v) => true,
    str: (str) => _bol.strPattern.test(str.trim())
  }).addTools({
    strPattern: boolPats
  });
  var _date = Definition.createType("dt", {
    self: Date,
    create: (x2) => !x2 ? /* @__PURE__ */ new Date() : new Date(x2),
    copy: (dt) => new Date(dt),
    isFilled: (dt) => !isNaN(dt.getTime()),
    rnd: (from, to) => new Date(_num.rnd(new Date(from).getTime(), to ? new Date(to).getTime() : Date.now() * 2))
  }).defineFrom({
    //arr:,
    //bol:,
    //dt:,
    //err:,
    //fn:,
    num: numToDt,
    //obj:,
    //rgx:,
    //set:,
    str: (v) => new Date(Date.parse(v))
  });
  var _err = _str.extend("err", {
    self: Error,
    create: Error,
    rnd: (...a) => new Error(_str.rnd(...a)),
    toParent: (err) => err.message,
    fromParent: (str, opt) => new Error(str, opt)
  }).defineFrom({
    arr: (arr, opt) => new Error(arr.join(opt.glue ?? " ")),
    bol: (bol, opt) => new Error(String(bol), opt),
    dt: (dt, opt) => new Error(dt.toLocaleString(), opt),
    //err:,
    //fn:,
    //map,
    num: (num2, opt) => new Error(num2, opt)
    //obj,
    //rgx,
    //set,
    //str,
    //sym
  });
  var filter = (obj, callback) => {
    const r = {};
    for (let i2 in obj) {
      if (callback(obj[i2], i2)) {
        r[i2] = obj[i2];
      }
    }
    return r;
  };
  var _obj = Definition.createType("obj", {
    self: Object,
    create: Object,
    copy: (x2) => Object.defineProperties({}, Object.getOwnPropertyDescriptors(x2)),
    keys: (x2) => Object.keys(x2),
    values: (x2) => Object.values(x2),
    entries: (x2) => Object.entries(x2)
  }).defineFrom({
    //arr,
    //fn,
    //num,
    //obj,
    //str,
    //bol,
    //dt,
    err: errToObj
    //map,
    //rgx,
    //set,
    //sym
  }).addTools({
    filter,
    exclude: (obj, mask = []) => filter(obj, (v, k) => !mask.includes(k)),
    extract: (obj, mask = []) => filter(obj, (v, k) => mask.includes(k))
  });
  var _map = _obj.extend("map", {
    self: Map,
    isFilled: (x2) => !!x2.size,
    copy: (x2) => new Map(x2),
    keys: (x2) => [...x2.keys()],
    values: (x2) => [...x2.values()],
    entries: (x2) => [...x2.entries()],
    get: (x2, k) => x2.get(k),
    set: (x2, k, v) => x2.set(k, v),
    del: (x2, k) => x2.del(k),
    toParent: mapToObj,
    fromParent: objToMap
  });
  var _rgx = _str.extend("rgx", {
    self: RegExp,
    create: RegExp,
    copy: (x2) => RegExp(x2.source),
    toParent: (rgx) => rgxToStr(rgx),
    fromParent: (str) => strToRgx(str)
  }).defineFrom({
    arr: (arr, opt) => new RegExp(arr.join(opt.glue ?? "|"), opt.flags)
    //bol:,
    //dt:,
    //err:,
    //fn:,
    //map:,
    //num:,
    //obj:,
    //rgx:,
    //set:,
    //str:,
    //sym:
  }).addTools({
    lib: rgxLib
  });
  var _set = _arr.extend("set", {
    self: Set,
    isFilled: (x2) => !!x2.size,
    copy: (x2) => new Set(x2),
    keys: (x2) => [...x2.keys()],
    values: (x2) => [...x2.values()],
    entries: (x2) => [...x2.entries()],
    get: (x2, k) => x2.has(k) ? k : void 0,
    set: (x2, k, v) => x2.add(v) ? v : void 0,
    del: (x2, k) => x2.del(k),
    toParent: (set2) => [...set2],
    fromParent: (arr) => new Set(arr)
  }).defineFrom({
    //arr:,
    //bol:,
    //dt:,
    //err:,
    //fn:,
    //map:,
    //num:,
    //obj:,
    //rgx:,
    //set:,
    //str:,
    //sym:
  });
  var _sym = _str.extend("sym", {
    self: Symbol,
    create: Symbol,
    isFilled: (_) => true,
    copy: (x2) => Symbol(symToStr(x2)),
    rnd: (...a) => Symbol(_str.rnd(...a)),
    toParent: symToStr,
    fromParent: (str) => Symbol(str)
  });
  Iterable.prototype.getRnd = function(any, min, max, sqr) {
    return _getRnd(this.values(any), min, max, sqr);
  };

  // node_modules/@randajan/jet/dist/esm/index.mjs
  var pass = async (v) => v;
  var Promise_default = Definition.createType("prom", {
    self: Promise,
    copy: async (prom) => await prom,
    create: (x2) => new Promise(_fn.only(x2, (e) => e()))
  }).defineFrom({
    arr: pass,
    bol: pass,
    dt: pass,
    err: async (err) => {
      throw err;
    },
    fn: async (fn, ...args) => await fn(...args),
    map: pass,
    num: pass,
    obj: pass,
    rgx: pass,
    set: pass,
    str: pass,
    sym: pass
  });

  // dist/index.js
  var import_regex_parser5 = __toESM(require_lib(), 1);
  var __defProp2 = Object.defineProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var vault = /* @__PURE__ */ new WeakMap();
  var fcePass = (v) => v;
  var fceTrue = (_) => true;
  var propNameBlacklist = [
    "constructor",
    // Object konstruktor
    "__proto__",
    // přímý přístup k prototype chain
    "hasOwnProperty",
    // důležitá metoda pro práci s vlastnostmi
    "isPrototypeOf",
    // používá se v dědičnosti
    "propertyIsEnumerable",
    // zjišťuje, zda je vlastnost výčtová
    "toLocaleString",
    // převod pro lokalizaci
    "toString",
    // převod na řetězec
    "valueOf",
    // převod na primitivní hodnotu
    "toJSON"
    // výstup při JSON.stringify()
  ];
  var isNull2 = (v) => v == null || typeof v === "number" && isNaN(v);
  var isFce = (fce) => typeof fce === "function";
  var isArr = Array.isArray;
  var isSet = (any) => any instanceof Set;
  var toFce = (fce, defReturn) => isFce(fce) ? fce : () => defReturn;
  var wrapFce = (wrap, what) => (...args) => wrap(what(...args));
  var toStr = (any, def) => isNull2(any) ? def : String(any);
  var toSet = (any) => isSet(any) ? any : new Set(any);
  var reArray = (val, trait) => {
    if (isNull2(val)) {
      return;
    }
    if (!Array.isArray(val)) {
      const r = trait(val);
      return !isNull2(r) ? [r] : void 0;
    }
    const res = [];
    for (const v of val) {
      const r = trait(v);
      if (!isNull2(r)) {
        res.push(r);
      }
    }
    if (res.length) {
      return res;
    }
  };
  var uni_exports = {};
  __export2(uni_exports, {
    fail: () => fail22,
    isEmpty: () => isEmpty,
    join: () => join,
    toId: () => toId,
    warn: () => warn2
  });
  var Fail = class extends Error {
    constructor(severity, reason, cause) {
      super(void 0, { cause });
      this.name = this.constructor.name;
      this.reason = reason;
      this.severity = severity;
    }
    addInfo(key, value2) {
      const info2 = this.info || (this.info = []);
      info2.unshift([key, value2]);
      return this;
    }
    addInfos(keyValuePairs = []) {
      for (let [key, value2] of keyValuePairs) {
        this.addInfo(key, value2);
      }
      return this;
    }
    get message() {
      let msg2 = `${this.reason}`;
      if (this.info) {
        const metaStr = this.info.map(([k, v]) => `${k} ${JSON.stringify(v)}`).join(", ");
        msg2 += ` ${metaStr}`;
      }
      if (this.cause?.message) {
        msg2 += ` | cause: ${this.cause.message}`;
      }
      return msg2;
    }
  };
  var Minor = class extends Fail {
    static fail(reason, cause) {
      return new Minor(reason, cause);
    }
    constructor(reason, cause) {
      super("minor", reason, cause);
    }
  };
  var Major = class extends Fail {
    static fail(reason, cause) {
      return new Major(reason, cause);
    }
    constructor(reason, cause) {
      super("major", reason, cause);
    }
  };
  var Critical = class extends Fail {
    static fail(reason, cause) {
      return new Critical(reason, cause);
    }
    constructor(reason, cause) {
      super("critical", reason, cause);
    }
  };
  var toFail = (err, infos = []) => {
    let fail3;
    if (err instanceof Fail) {
      fail3 = err;
    } else if (err instanceof Error) {
      fail3 = Critical.fail(err.constructor.name, err);
    } else {
      fail3 = Critical.fail(err);
    }
    return fail3.addInfos(infos);
  };
  var strings_exports = {};
  __export2(strings_exports, {
    toString: () => toString2
  });
  var toString2 = (any, opt = {}) => {
    const { comma, min, max } = opt;
    const str = jet2.str.to(any, { comma });
    if (min != null && str.length < min) {
      fail22("too short", ["min", min]);
    }
    if (max != null && str.length > max) {
      fail22("too long", ["max", max]);
    }
    return str;
  };
  var toId = (ref) => typeof ref !== "string" ? ref?.id : ref;
  var isEmpty = (any) => {
    if (any == null) {
      return true;
    }
    const t = typeof any;
    if (t === "string") {
      return !any;
    }
    if (t === "number") {
      return isNaN(any);
    }
    if (t === "object") {
      if (any instanceof Date) {
        return isNaN(any.getTime());
      }
      if (any instanceof Array) {
        return !any.length;
      }
      if (any instanceof Set || any instanceof Map) {
        return !any.size;
      }
      for (let i2 in any) {
        return false;
      }
      return true;
    }
    return false;
  };
  var join = (separator, ...vals) => {
    let s = "";
    for (let v of vals) {
      v = toString2(v);
      if (!v) {
        continue;
      }
      s += (!s ? "" : separator) + v;
    }
    return s;
  };
  var fail22 = (message, ...infos) => {
    throw Major.fail(message).addInfos(infos);
  };
  var warn2 = (message, ...infos) => {
    throw Minor.fail(message).addInfos(infos);
  };
  var _chopGetAllRecs = (chop) => vault.get(chop).byRec;
  var _chopGetRecs = (chop, groupId) => vault.get(chop).byGroup.getAll(groupId);
  var _chopGetRec = (chop, groupId, recId) => vault.get(chop).byGroup.get(groupId, recId);
  var pushSingleGroup = (_chop, rec, id, from, to) => {
    const { byRec, byGroup } = _chop;
    if (from === to) {
      return;
    }
    if (to == null) {
      byRec.delete(rec);
    } else {
      const current = byGroup.get(to, id);
      if (current && current !== rec) {
        fail22(`Duplicate index '${id}' at '${to}'`);
      }
      byGroup.set(to, id, rec);
      byRec.set(rec, to);
    }
    byGroup.delete(from, id);
  };
  var pushMultiGroup = (_chop, rec, id, from, to) => {
    const { byRec, byGroup } = _chop;
    if (from === to) {
      return;
    }
    if (to == null) {
      byRec.delete(rec);
    } else {
      let isChange;
      to = toSet(to);
      for (const groupId of to) {
        if (from?.has(groupId)) {
          from.delete(groupId);
          continue;
        }
        isChange = true;
        const current = byGroup.get(groupId, id);
        if (current && current !== rec) {
          fail22(`Duplicate index '${id}' at '${groupId}'`);
        }
        byGroup.set(groupId, id, rec);
      }
      if (!isChange) {
        return;
      }
      byRec.set(rec, to);
    }
    if (from != null) {
      for (const groupId of from) {
        byGroup.delete(groupId, id);
      }
    }
  };
  var pushRecursive = (inc, chop, rec, task) => {
    const _chop = vault.get(chop);
    const { byRec, childs, getId, getGroup, filter: filter2, fits, effects, isMultiGroup } = _chop;
    inc = inc && filter2(rec);
    const has = byRec.has(rec);
    if (!inc && !has) {
      return;
    }
    const id = getId(rec);
    const from = byRec.get(rec);
    const to = inc ? getGroup(rec) : null;
    const event = !has ? "add" : !inc ? "remove" : "update";
    const push = isMultiGroup ? pushMultiGroup : pushSingleGroup;
    if (!task) {
      push(_chop, rec, id, from, to);
    } else {
      fits.run((_) => push(_chop, rec, id, from, to), event, task.echo);
    }
    for (const child of childs) {
      pushRecursive(inc, child, rec, task);
    }
    if (task) {
      task.effect((_) => effects.run(event, task.echo));
    }
  };
  var pushInit = (inc, chop, record, task) => {
    if (task) {
      task.assign({ record });
    }
    pushRecursive(inc, chop, record, task);
  };
  var _chopSyncIn = (chop, record, task) => pushInit(true, chop, record, task);
  var _chopSyncOut2 = (chop, record, task) => pushInit(false, chop, record, task);
  var SuperMap = class extends Map {
    keys(groupId) {
      return super.get(groupId)?.keys();
    }
    values(groupId) {
      return super.get(groupId)?.values();
    }
    getAll(groupId) {
      return super.get(groupId);
    }
    get(groupId, keyId) {
      return super.get(groupId)?.get(keyId);
    }
    has(groupId, keyId) {
      const sub = super.get(groupId);
      return sub && sub.has(keyId);
    }
    set(groupId, keyId, obj) {
      let sub = super.get(groupId);
      if (!sub) {
        super.set(groupId, sub = /* @__PURE__ */ new Map());
      }
      sub.set(keyId, obj);
    }
    delete(groupId, keyId) {
      const sub = super.get(groupId);
      if (!sub) {
        return;
      } else if (sub.size <= 1) {
        super.delete(groupId);
      } else {
        sub.delete(keyId);
      }
    }
  };
  var Effects = class extends Array {
    constructor(onError) {
      super();
      solid(this, "onError", isFce(onError) ? onError : console.warn);
    }
    remove(callback) {
      const x2 = this.indexOf(callback);
      if (x2 >= 0) {
        this.splice(x2, 1);
      }
      return callback;
    }
    add(callback) {
      if (!isFce(callback)) {
        fail22(`callback must be a function`);
      }
      this.unshift(callback);
      return (_) => this.remove(callback);
    }
    run(...args) {
      for (let i2 = this.length - 1; i2 >= 0; i2--) {
        if (!this[i2]) {
          return;
        }
        try {
          this[i2](...args);
        } catch (err) {
          this.onError(err);
        }
      }
    }
    clear() {
      this.length = 0;
    }
  };
  var Fits = class extends Effects {
    run(zenit, ...args) {
      let i2 = this.length - 1, res;
      const next = () => {
        const fit = this[i2--];
        if (fit) {
          fit(next, ...args);
        } else if (zenit) {
          res = zenit();
        }
        return res;
      };
      return next();
    }
  };
  var Chop = class {
    constructor(id, opt = {}) {
      id = toStr(id);
      if (!id) {
        fail22("missing id");
      }
      const { parent } = opt;
      const isMultiGroup = jet2.bol.tor(opt.isMultiGroup);
      const filter2 = toFce(opt.filter, true);
      const getId = isFce(opt.getId) ? opt.getId : (r) => r.id;
      const getGroup = !isMultiGroup ? toFce(opt.getGroup) : wrapFce(toArr, toFce(opt.getGroup, [void 0]));
      const _p = {
        getId,
        getGroup,
        isMultiGroup,
        fits: new Fits(),
        effects: new Effects(),
        childs: /* @__PURE__ */ new Set(),
        byRec: /* @__PURE__ */ new Map(),
        byGroup: new SuperMap(),
        filter: filter2
      };
      solids(this, {
        id,
        db: parent?.db || this,
        parent
      }, false);
      virtuals(this, {
        size: (_) => _p.byRec.size,
        childs: (_) => [..._p.childs],
        isMultiGroup: (_) => _p.isMultiGroup
      });
      vault.set(this, _p);
    }
    fit(callback) {
      return vault.get(this).fits.add(callback);
    }
    effect(callback) {
      return vault.get(this).effects.add(callback);
    }
    has(groupId, rec) {
      const { getGroup, isMultiGroup } = vault.get(this);
      const group = getGroup(rec);
      return isMultiGroup ? group.includes(groupId) : group === groupId;
    }
    get(groupId, recId, throwError = false) {
      return _chopGetRec(this, groupId, recId, throwError);
    }
    getMap(groupId, throwError = false) {
      const recs = _chopGetRecs(this, groupId, throwError);
      return recs ? new Map(recs) : /* @__PURE__ */ new Map();
    }
    getList(groupId, throwError = false) {
      const recs = _chopGetRecs(this, groupId, throwError);
      return recs ? Array.from(recs.values()) : [];
    }
    getSize(groupId, throwError = false) {
      return _chopGetRecs(this, groupId, throwError)?.size || 0;
    }
    map(callback) {
      const result = [];
      const recs = _chopGetAllRecs(this);
      for (const [rec] of recs) {
        const r = callback(rec);
        if (r !== void 0) {
          result.push(r);
        }
      }
      return result;
    }
    chop(id, opt = {}) {
      const { byRec, childs } = vault.get(this);
      const filter2 = toFce(opt.filter, true);
      opt.parent = this;
      opt.filter = (rec) => this.has(id, rec) && filter2(rec);
      const child = new Chop(id, opt);
      for (const [rec] of byRec) {
        _chopSyncIn(child, rec);
      }
      childs.add(child);
      return child;
    }
  };
  var Task = class {
    constructor(db2, context, roll5, rollback5) {
      this.db = db2;
      const _db = this._db = vault.get(db2);
      const parent = this.parent = _db.task;
      if (parent) {
        parent.subs.push(this);
      } else {
        _db.task = this;
        this.subs = [];
        this.effects = new Effects();
      }
      this.isDone = false;
      this.isOk = true;
      this.context = context;
      this.roll = roll5;
      this.rollback = rollback5;
      this.echo = {};
      virtuals(this.echo, {
        isOk: (_) => this.isOk,
        isDone: (_) => this.isDone,
        error: (_) => this.error,
        warnings: (_) => !this.warnings ? void 0 : [...this.warnings],
        subs: (_) => !this.subs ? void 0 : this.subs.map((c) => c.echo),
        context: (_) => this.context,
        record: (_) => this.record,
        changes: (_) => !this.changes ? void 0 : new Set(this.changes)
      });
    }
    assign(obj) {
      Object.assign(this, obj);
      return this;
    }
    unsign(...props) {
      for (const prop of props) {
        delete this[prop];
      }
    }
    effect(callback) {
      const { parent, effects } = this;
      if (effects) {
        return effects.add(callback);
      }
      return parent.effect(callback);
    }
    catch(err, nonMinorThrow = false, infos = []) {
      const fail3 = toFail(err, infos);
      if (fail3.severity === "minor") {
        (this.warnings || (this.warnings = [])).push(fail3);
      } else {
        const { parent } = this;
        this.isOk = false;
        this.error = fail3;
        if (parent) {
          parent.isOk = false;
          parent.error = fail3;
        }
        if (nonMinorThrow) {
          throw fail3;
        }
      }
      return fail3;
    }
    catchAll(err, infos = []) {
      return this.catch(err, false, infos);
    }
    catchMinor(err, infos = []) {
      return this.catch(err, true, infos);
    }
    doRoll() {
      const { effects, roll: roll5, subs, result } = this;
      this.isOk = true;
      if (subs) {
        for (let i2 = subs.length - 1; i2 >= 0; i2--) {
          subs[i2].doRoll();
        }
      }
      if (roll5) {
        roll5(this, result);
      }
      effects?.run();
    }
    doRollback() {
      const { subs, rollback: rollback5, result } = this;
      this.isOk = false;
      if (subs) {
        for (let i2 = subs.length - 1; i2 >= 0; i2--) {
          subs[i2].doRollback();
        }
      }
      if (rollback5) {
        rollback5(this, result);
      }
    }
    finish(throwError = false) {
      const { _db, parent, isOk, error, echo } = this;
      this.isDone = true;
      if (parent) {
        return echo;
      }
      delete _db.task;
      if (isOk) {
        this.doRoll();
      } else {
        this.doRollback();
      }
      if (throwError && !isOk) {
        throw error;
      }
      return echo;
    }
  };
  var taskWrap = (exe5, roll5, rollback5) => {
    return (db2, args, throwError = false, context = null) => {
      const task = new Task(db2, context, roll5, rollback5);
      try {
        task.result = exe5(task, ...args);
      } catch (err) {
        task.catch(err);
      }
      return task.finish(throwError);
    };
  };
  var Turn = class {
    static attach(task, _rec, input, force = false) {
      return _rec.turn = new Turn(task, _rec, input, force);
    }
    constructor(task, _rec, input, force = false) {
      this.task = task;
      this._rec = _rec;
      this.isChange = _rec.state === "pending";
      solids(this, {
        force,
        input,
        output: {},
        changes: /* @__PURE__ */ new Set(),
        pendings: /* @__PURE__ */ new Set()
      });
      this._prepare();
    }
    _prepare() {
      const { _rec, task, pendings } = this;
      const { values: values2, state } = _rec;
      if (!values2._ent) {
        throw _rec.fail("required", ["column", "_ent"]);
      }
      const _cols = _rec.getCols();
      if (!_cols) {
        throw _rec.fail("invalid", ["column", "_ent"]);
      }
      for (const _col of _cols) {
        try {
          this._prepareCol(_col);
        } catch (err) {
          task.catchMinor(err, [["column", _col.values.name]]);
        }
      }
      if (state !== "ready" || pendings.size > 0) {
        return;
      }
      _rec.fail("blank", ["values", values2]);
    }
    _prepareCol(_col) {
      const { _rec, force, input, output, pendings } = this;
      const { meta: metaRec, values: values2, state } = _rec;
      const { meta: metaCol, values: { name, formula, resetIf, isVirtual } } = _col;
      const isReal = input.hasOwnProperty(name);
      const isMeta = metaRec + metaCol > 3;
      output[name] = values2[name];
      if (isReal && state === "ready") {
        if (isMeta) {
          warn2("meta");
        }
        if (formula) {
          warn2(`formula`);
        }
      }
      if (isVirtual) {
        return;
      }
      if (formula) {
        pendings.add(_col);
        return;
      }
      if (isMeta && state === "pending") {
        return;
      }
      if (force || isReal) {
        pendings.add(_col);
        return;
      }
      if (resetIf) {
        input[name] = values2[name];
        pendings.add(_col);
        return;
      }
    }
    execute() {
      const { pendings } = this;
      for (const _col of pendings) {
        this.pull(_col);
      }
      return this;
    }
    pull(_col) {
      const { task, _rec, pendings, input, output, changes } = this;
      const { name, omitChange } = _col.values;
      if (pendings.has(_col)) {
        const { setter: setter2 } = _col.traits;
        pendings.delete(_col);
        try {
          setter2(_rec, input[name], output);
        } catch (err) {
          task.catchMinor(err, [["column", name]]);
        }
        if (output[name] !== _rec.values[name]) {
          changes.add(name);
          if (!omitChange) {
            this.isChange = true;
          }
        }
      }
      return output[name];
    }
    detach(isOk) {
      const { _rec, output } = this;
      if (isOk) {
        _rec.values = output;
      }
      delete this._rec;
      delete _rec.turn;
    }
  };
  var _recToJSON = (_rec) => {
    const r = {};
    for (const _col of _rec.getCols()) {
      const { name, type: { saver } } = _col.current;
      let value2 = _rec.getCol(name, true);
      if (isNull(value2)) {
        continue;
      }
      r[name] = saver ? saver(value2) : value2;
    }
    return r;
  };
  var Record = class {
    constructor(_rec, isCurrent) {
      const get2 = (p) => _rec.getCol(p, isCurrent);
      const id = () => get2("id");
      const json = () => _recToJSON(_rec);
      const proxy = new Proxy(this, {
        get: (_, p) => {
          if (p === "toString") {
            return id;
          }
          if (p === "toJSON") {
            return json;
          }
          return get2(p);
        },
        has: (_, p) => _rec.hasCol(p),
        set: (_, p, value2) => _rec.db.update(proxy, { [p]: value2 }),
        deleteProperty: (_, p) => _rec.db.update(proxy, { [p]: null }),
        ownKeys: (_) => [..._rec.getColsNames()],
        getOwnPropertyDescriptor: (_, p) => ({
          enumerable: true,
          configurable: true,
          value: get2(p)
        })
      });
      return proxy;
    }
  };
  var _Record = class {
    constructor(db2, values2) {
      this.db = db2;
      this._db = vault.get(db2);
      this.meta = 0;
      this.state = "pending";
      const v = this.values = Object.assign({}, values2);
      v._ent = toId(v._ent);
      this.current = new Record(this, true);
      this._db.records.set(this.current, this);
    }
    fail(reason, ...infos) {
      const { id, _ent } = this.values;
      return fail22(reason, ["entity", _ent], ["record", id], ...infos);
    }
    init(task) {
      const { state, values: values2 } = this;
      if (state !== "pending") {
        this.fail("not pending");
      }
      Turn.attach(task, this, values2, true);
      this.state = "init";
      return this;
    }
    ready(task) {
      const { db: db2, state, current, turn } = this;
      if (state !== "init") {
        this.fail("not init");
      }
      turn.execute();
      this.before = new Record(this, false);
      this.state = "ready";
      _chopSyncIn(db2, current, task);
      return this;
    }
    update(task, values2, isSet2 = false) {
      const { state, db: db2, current } = this;
      if (state !== "ready") {
        this.fail("not ready");
      }
      Turn.attach(task, this, values2, isSet2).execute();
      _chopSyncIn(db2, current, task);
      return this;
    }
    getColsNames() {
      return this._db.colsByEnt.keys(this.values._ent);
    }
    getCols() {
      return this._db.colsByEnt.values(this.values._ent);
    }
    getCol(colName, isCurrent = true) {
      const { _db, values: values2, state, turn } = this;
      const _col = _db.colsByEnt.get(values2._ent, colName);
      if (!_col) {
        return state === "ready" ? void 0 : values2[colName];
      }
      return _col.traits.getter(this, isCurrent ? void 0 : turn);
    }
    hasCol(colName) {
      const { _db, values: values2 } = this;
      return _db.colsByEnt.has(values2._ent, colName);
    }
    fit(next, event, task) {
      next();
    }
    roll() {
      this.turn?.detach(true);
    }
    rollback() {
      this.turn?.detach(false);
    }
    unreg() {
      this._db.records.delete(this.current);
    }
  };
  var functions_exports = {};
  __export2(functions_exports, {
    toFunction: () => toFunction
  });
  var dates_exports = {};
  __export2(dates_exports, {
    toDate: () => toDate
  });
  var toDate = (any, opt = {}) => {
    const { min, max } = opt;
    const date = jet2.dt.to(any);
    const nn = isNull2(min), nm = isNull2(max);
    let n = date.getTime();
    if (isNaN(n)) {
      fail22("not a date");
    }
    if (nn && nm) {
      return date;
    }
    if (!nm) {
      n = Math.min(n, max);
    }
    if (!nn) {
      n = Math.max(n, min);
    }
    return new Date(n);
  };
  var numbers_exports = {};
  __export2(numbers_exports, {
    toNumber: () => toNumber
  });
  var toNumber = (any, opt = {}) => {
    const { min, max, dec } = opt;
    let n = jet2.num.to(any);
    if (isNaN(num)) {
      fail22("not a number");
    }
    if (max != null) {
      num = Math.min(num, max);
    }
    if (min != null) {
      num = Math.max(num, min);
    }
    if (dec == 0) {
      num = Math.round(num);
    } else if (dec > 0) {
      const pow = Math.pow(10, dec);
      num = Math.round(num * pow) / pow;
    }
    return num;
  };
  var objects_exports = {};
  __export2(objects_exports, {
    toObject: () => toObject
  });
  var toObject = (obj) => {
    const t = typeof obj;
    if (t === "object") {
      return obj;
    }
    if (t !== "string") {
      fail22("unparseable");
    }
    try {
      return JSON.parse(obj);
    } catch (e) {
      fail22("unparseable");
    }
  };
  var regexp_exports = {};
  __export2(regexp_exports, {
    toRegExp: () => toRegExp
  });
  var toRegExp = (any) => {
    if (any instanceof RegExp) {
      return any;
    }
    if (typeof any != "string") {
      fail("not a regexp");
    }
    try {
      return (0, import_regex_parser5.default)(any);
    } catch (err) {
      fail("unparseable");
    }
  };
  var modules = [dates_exports, functions_exports, numbers_exports, objects_exports, regexp_exports, strings_exports, uni_exports];
  var __default = modules;
  var tools = {};
  for (const file of __default) {
    solids(tools, file);
  }
  var toFunction = (any, tls = {}) => jet2.fn.to(any, { ...tools, tls });
  var getter = fcePass;
  var setter = fcePass;
  var isRequired = fceTrue;
  var isReadonly = fceTrue;
  var metaEnts = ["_ents", "_types", "_cols"];
  var metaData = {
    "_ents": {
      "_ents": { meta: 3 },
      "_cols": { meta: 3 },
      "_types": { meta: 3 }
    },
    "_types": {
      "string": { meta: 3, setter: (v, c) => toString2(v, c), getter },
      "boolean": { meta: 3, setter: (v, c) => jet.bol.to(v, c), getter },
      "number": { meta: 3, setter: (v, c) => toNumber(v, c), getter },
      "datetime": { meta: 3, setter: (v, c) => toDate(v, c), getter },
      "duration": { meta: 3, setter: (v, c) => toNumber(v, c), getter },
      "function": { meta: 3, setter: (v, c) => toFunction(v, c), getter, saver: (v) => toString2(v) },
      "regexp": { meta: 3, setter: (v, c) => toRegExp(v, c), getter },
      "object": { meta: 3, setter: (v, c) => toObject(v, c), getter, saver: (v) => toString2(v) },
      "ref": { meta: 3, setter: (v, c) => toId(v, c), getter: (v, c, db2) => db2.get(c.ref?.id, x, false), saver: (v) => toId(v) },
      "nref": { meta: 3, setter, getter }
    },
    "_cols": {
      "_ents-_ent": { meta: 3, ent: "_ents", name: "_ent", type: "ref", ref: "_ents", isReadonly, isRequired },
      "_ents-id": { meta: 3, ent: "_ents", name: "id", type: "string", isReadonly, isRequired },
      "_ents-meta": { meta: 3, ent: "_ents", name: "meta", type: "number", isReadonly },
      // "_ents-cols":{
      //     meta:3, ent:"_ents", name:"cols", type:"ref", ref:"_cols", parent:"_cols-ent", isList:true, noCache:true,
      //     store:(c, db)=>{
      //         const { ref, parent:{ name, isList }} = c;
      //         return db.chop(ref.id, {
      //             group:r=>r[name],
      //             isMultiGroup:isList
      //         })
      //     },
      //     formula:(r, b, s)=>s.getList(r, false)
      // },
      // "_ents-size":{
      //     meta:3, ent:"_ents", name:"size", type:"number", noCache:true,
      //     store:(c, db)=>db,
      //     formula:(r, b, s)=>s.getSize(r.id, false)
      // },
      //_types
      "_types-_ent": { meta: 3, ent: "_types", name: "_ent", type: "ref", ref: "_ents", isReadonly, isRequired },
      "_types-id": { meta: 3, ent: "_types", name: "id", type: "string", isReadonly, isRequired },
      "_types-meta": { meta: 3, ent: "_types", name: "meta", type: "number", isReadonly },
      "_types-setter": { meta: 3, ent: "_types", name: "setter", type: "function", isReadonly },
      "_types-getter": { meta: 3, ent: "_types", name: "getter", type: "function", isReadonly },
      "_types-saver": { meta: 3, ent: "_types", name: "saver", type: "function", isReadonly },
      "_types-loader": { meta: 3, ent: "_types", name: "loader", type: "function", isReadonly },
      //_cols
      "_cols-_ent": { meta: 3, ent: "_cols", name: "_ent", type: "ref", ref: "_ents", isReadonly, isRequired },
      "_cols-id": { meta: 3, ent: "_cols", name: "id", type: "string", isReadonly, isRequired, formula: (r) => join("-", r.ent?.id, r.name) },
      "_cols-meta": { meta: 3, ent: "_cols", name: "meta", type: "number", isReadonly },
      "_cols-ent": { meta: 3, ent: "_cols", name: "ent", type: "ref", ref: "_ents", isReadonly, isRequired },
      "_cols-name": { meta: 3, ent: "_cols", name: "name", type: "string", isReadonly, isRequired },
      "_cols-type": { meta: 3, ent: "_cols", name: "type", type: "ref", ref: "_types", init: (_) => "string", isRequired },
      "_cols-ref": { meta: 3, ent: "_cols", name: "ref", type: "ref", ref: "_ents" },
      "_cols-parent": { meta: 3, ent: "_cols", name: "parent", type: "ref", ref: "_cols" },
      "_cols-store": { meta: 3, ent: "_cols", name: "store", type: "function" },
      "_cols-isList": { meta: 3, ent: "_cols", name: "isList", type: "boolean" },
      "_cols-isReadonly": { meta: 3, ent: "_cols", name: "isReadonly", type: "function" },
      "_cols-isRequired": { meta: 3, ent: "_cols", name: "isRequired", type: "function" },
      "_cols-resetIf": { meta: 3, ent: "_cols", name: "resetIf", type: "function" },
      "_cols-init": { meta: 2, ent: "_cols", name: "init", type: "function" },
      //_Type should be defined as a function
      "_cols-fallback": { meta: 2, ent: "_cols", name: "fallback", type: "function" },
      //_Type should be defined as a function
      "_cols-validator": { meta: 2, ent: "_cols", name: "validator", type: "function" },
      "_cols-decimal": { meta: 2, ent: "_cols", name: "decimal", type: "number", decimal: 0, min: 0 },
      "_cols-min": { meta: 2, ent: "_cols", name: "min", type: "number" },
      //decimal should be defined as a function
      "_cols-max": { meta: 2, ent: "_cols", name: "max", type: "number" },
      //decimal:_=>r.decimal //decimal should be defined as a function
      "_cols-formula": { meta: 2, ent: "_cols", name: "formula", type: "function" },
      "_cols-isVirtual": { meta: 3, ent: "_cols", name: "isVirtual", type: "boolean" },
      "_cols-omitChange": { meta: 3, ent: "_cols", name: "omitChange", type: "boolean" }
    }
  };
  var _colCreateStored = (_col) => {
    const { db: db2, current: col } = _col;
    const { store } = col;
    return store ? store(col, db2) : null;
  };
  var _colCreateGetter = (_col) => {
    const { db: db2, current: col, values: v, traits } = _col;
    const { isList, name, ref, type, fallback, isVirtual } = v;
    const { getter: getter2 } = metaData._types[v.type] || col.type;
    const typize = type == "ref" ? (x2) => db2.get(ref, x2, false) : (x2) => getter2(x2, col, db2);
    const n = !isList ? typize : (x2) => reArray(x2, typize);
    return (_rec, turn) => {
      const { current, before, values: values2 } = _rec;
      let val = n(isVirtual ? traits.setter(_rec) : turn ? turn.pull(_col) : values2[name]);
      if (fallback && isNull2(val)) {
        val = n(fallback(current, before, traits.stored));
      }
      return val;
    };
  };
  var _colCreateSetter = (_col) => {
    const { db: db2, current: col, values: v, traits } = _col;
    const { isList, name, formula, validator, isReadonly: isReadonly2, resetIf, init, isRequired: isRequired2 } = v;
    const { setter: setter2 } = metaData._types[v.type] || col.type;
    const typize = (x2) => isNull2(x2) ? void 0 : setter2(x2, col, db2);
    const n = !isList ? typize : (x2) => reArray(x2, typize);
    return (_rec, val, values2 = {}) => {
      const { current, before } = _rec;
      const stored = traits.stored;
      if (formula) {
        val = values2[name] = n(formula(current, before, stored));
      } else {
        if (isReadonly2 && isReadonly2(current, before, stored)) {
          if (before) {
            warn2(`readonly`, ["valueFrom", before], ["value", val]);
          }
        } else {
          val = values2[name] = n(val);
          if (validator && !validator(current, before, stored)) {
            _rec.fail("invalid", ["value", val]);
          }
        }
        if (!before && isNull2(val) || resetIf && resetIf(current, before, stored)) {
          val = values2[name] = !init ? void 0 : n(init(current, before, stored));
        }
      }
      if (isRequired2 && isNull2(val) && isRequired2(current, before, stored)) {
        _rec.fail("required");
      }
      return values2[name];
    };
  };
  var _Column = class extends _Record {
    constructor(db2, values2) {
      super(db2, values2);
      const v = this.values;
      v.ent = toId(v.ent);
      v.name = toString2(v.name);
      v.id = join("-", v.ent, v.name);
      if (propNameBlacklist.includes(v.name)) {
        throw this.fail(`blacklist`, ["column", "name"], ["value", v.name]);
      }
      const metaRec = metaData._cols[v.id];
      if (metaRec) {
        this.meta = v.meta = metaRec.meta;
      } else if (v.name === "_ent") {
        this.meta = 2;
      } else if (v.name === "id") {
        this.meta = 1;
      } else {
        this.meta = 0;
      }
      this._traits = {};
      this.traits = cacheds({}, this._traits, {
        stored: (_) => _colCreateStored(this),
        getter: (_) => _colCreateGetter(this),
        setter: (_) => _colCreateSetter(this)
      });
      this._db.colsByEnt.set(v.ent, v.name, this);
    }
    resetTraits() {
      const { _traits } = this;
      delete _traits.stored;
      delete _traits.getter;
      delete _traits.setter;
    }
    fit(next, event, task) {
      next();
      this.resetTraits();
    }
    unreg() {
      super.unreg();
      const { _db, values: { ent, name } } = this;
      _db.colsByEnt.delete(ent, name);
    }
  };
  var exe = (task, record, force = false) => {
    const { db: db2, _db } = task;
    const _rec = _db.records.get(record);
    if (!_rec) {
      throw fail22("not a record");
    }
    if (!force && _rec.meta) {
      throw _rec.fail("is meta");
    }
    _chopSyncOut2(db2, record, task);
    return _rec;
  };
  var roll = (task, _rec) => {
    _rec.unreg();
  };
  var rollback = (task, _rec) => {
    const { db: db2 } = task;
    if (!_rec) {
      return;
    }
    _chopSyncIn(db2, _rec.current);
  };
  var exeRemoveForce = (task, record) => exe(task, record, true);
  var exeRemove = (task, record) => exe(task, record, false);
  var _recRemove = taskWrap(exeRemove, roll, rollback);
  var _recRemoveForce = taskWrap(exeRemoveForce, roll, rollback);
  var _Entity = class extends _Record {
    constructor(db2, values2) {
      super(db2, values2);
      const v = this.values;
      v.id = toString2(v.id);
      const metaRec = metaData._ents[v.id];
      if (metaRec) {
        this.meta = v.meta = metaRec.meta;
      } else {
        this.meta = v.meta = 0;
      }
    }
    fit(next, event, task) {
      next();
      const { _db, db: db2, values: { id } } = this;
      if (event === "add") {
        const temp = { _ent: "_cols", ent: id, isReadonly: fceTrue, isRequired: fceTrue };
        db2.add({ ...temp, name: "_ent", type: "ref", ref: "_ents", meta: 2 }, task?.context);
        db2.add({ ...temp, name: "id", type: "string", meta: 1 }, task?.context);
      } else if (event === "remove") {
        for (const _col of _db.colsByEnt.values(id)) {
          _recRemoveForce(db2, [_col.current], task?.context);
        }
        ;
      }
    }
  };
  var _Type = class extends _Record {
    constructor(db2, values2) {
      super(db2, values2);
      const v = this.values;
      v.id = toString2(v.id);
      const metaRec = metaData._types[v.id];
      if (metaRec) {
        this.meta = v.meta = metaRec.meta;
        v.setter = metaRec.setter;
        v.getter = metaRec.getter;
        v.saver = metaRec.saver;
        v.loader = metaRec.loader;
      } else {
        this.meta = v.meta = 0;
        v.setter = isNull2(v.setter) ? void 0 : toFunction(v.setter);
      }
      this._db.typesById.set(v.id, this);
    }
    unreg() {
      super.unreg();
      const { _db, values: { id } } = this;
      _db.typesById.delete(id);
    }
  };
  var createRecord2 = (db2, values2) => {
    values2 = Object.assign({}, values2);
    const _ent = values2._ent = toId(values2._ent);
    if (_ent === "_ents") {
      return new _Entity(db2, values2);
    }
    if (_ent === "_types") {
      return new _Type(db2, values2);
    }
    if (_ent === "_cols") {
      return new _Column(db2, values2);
    }
    return new _Record(db2, values2);
  };
  var exe2 = (task, values2) => {
    const { db: db2 } = task;
    const _rec = createRecord2(db2, values2);
    _rec.init(task).ready(task);
    return _rec;
  };
  var roll2 = (task, _rec) => {
    const { changes } = _rec.turn;
    task.assign({ changes });
    _rec.roll();
  };
  var rollback2 = (task, _rec) => {
    const { db: db2 } = task;
    if (!_rec) {
      return;
    }
    _chopSyncOut(db2, _rec.current);
    _rec.rollback();
    _rec.unreg();
    task.unsign("record");
  };
  var _recAdd = taskWrap(exe2, roll2, rollback2);
  var exe3 = (isSet2, task, values2) => {
    const { db: db2, _db } = task;
    let _rec = createRecord(db2, values2).init(task);
    const { _ent, id } = _rec.current;
    const brother = _chopGetRec(db2, toId(_ent), id);
    if (!brother) {
      _rec.ready(task);
      return [_rec, true];
    } else {
      _rec.unreg();
      _rec = _db.records.get(brother);
      _rec.update(task, values2, isSet2);
      return [_rec, false];
    }
  };
  var roll3 = (task, [_rec, isAdd]) => {
    const { changes } = _rec.turn;
    task.assign({ changes });
    _rec.roll();
  };
  var rollback3 = (task, res) => {
    if (!res) {
      return;
    }
    const [_rec, isAdd] = res;
    if (isAdd) {
      _chopSyncOut(db, _rec.current);
    }
    _rec.rollback();
    task.unsign("record");
    if (isAdd) {
      _rec.unreg();
    } else {
      _chopSyncIn(db, _rec.current);
    }
  };
  var exeSet = (...a) => exe3(true, ...a);
  var exeUpdate = (...a) => exe3(false, ...a);
  var _recAddOrSet = taskWrap(exeSet, roll3, rollback3);
  var _recAddOrUpdate = taskWrap(exeUpdate, roll3, rollback3);
  var exe4 = (isSet2, task, record, values2) => {
    const { _db } = task;
    const _rec = _db.records.get(record);
    if (!_rec) {
      throw fail22("not a record");
    }
    _rec.update(task, values2, isSet2);
    return _rec;
  };
  var roll4 = (task, _rec) => {
    const { changes } = _rec.turn;
    task.assign({ changes });
    _rec.roll();
  };
  var rollback4 = (task, _rec) => {
    const { db: db2 } = task;
    if (!_rec) {
      return;
    }
    _rec.rollback();
    task.unsign("record");
    _chopSyncIn(db2, _rec.current);
  };
  var exeUpdate2 = (...a) => exe4(false, ...a);
  var exeSet2 = (...a) => exe4(true, ...a);
  var _recSet = taskWrap(exeSet2, roll4, rollback4);
  var _recUpdate = taskWrap(exeUpdate2, roll4, rollback4);
  var isMetaEnt = (_ent) => metaEnts.includes(_ent);
  var getMetaRow = (_ent, id) => {
    if (isMetaEnt(_ent)) {
      return metaData[_ent][id];
    }
  };
  var rowMetaMerge = (_ent, id, rawRow) => {
    const meta = getMetaRow(_ent, id);
    const _rec = { ...rawRow, _ent, id };
    if (!meta) {
      return _rec;
    }
    for (const colName in metaData._cols) {
      const col = metaData._cols[colName];
      if (col._ent !== _ent) {
        continue;
      }
      if (col.meta < 2 && _rec.hasOwnProperty(colName)) {
        continue;
      }
      _rec[colName] = meta[colName];
    }
    return _rec;
  };
  var _dbInit = (task, data, save) => {
    const { db: db2, _db } = task;
    const loaded = /* @__PURE__ */ new Set();
    const loadRecs = (_ent, recsRaw) => {
      loaded.add(_ent);
      for (const id in recsRaw) {
        const _rec = createRecord2(db2, rowMetaMerge(_ent, id, recsRaw[id]));
        _chopSyncIn(db2, _rec.current);
      }
      ;
    };
    loadRecs("_ents", { ...metaData._ents, ...data._ents || {} });
    loadRecs("_types", { ...metaData._types, ...data._types || {} });
    loadRecs("_cols", { ...metaData._cols, ...data._cols || {} });
    for (const [_ent] of _chopGetRecs(db2, "_ents")) {
      if (!loaded.has(_ent)) {
        loadRecs(_ent, data[_ent]);
      }
    }
    const _recs = [];
    for (const [rec, _rec] of _db.records) {
      if (_rec.state === "pending") {
        _recs.push(_rec.init(task));
      }
    }
    for (const _rec of _recs) {
      _rec.ready();
    }
    db2.fit((next, event, task2) => {
      const { record } = task2;
      if (!record) {
        return next();
      }
      const _rec = _db.records.get(record);
      if (!_rec) {
        return next();
      }
      _rec.fit(next, event, task2);
    });
    db2.effect((event, task2) => {
      const { record } = task2;
      const ex = record.toJSON();
      const { _ent, id } = ex;
      delete ex._ent;
      delete ex.id;
      save(_ent, id, event === "remove" ? void 0 : ex);
    });
  };
  var DB = class extends Chop {
    constructor(id, opt = {}) {
      const { data, save } = opt;
      super(id, {
        getId: (rec) => toId(rec.id),
        getGroup: (rec) => toId(rec._ent)
      });
      const _p = vault.get(this);
      _p.records = /* @__PURE__ */ new Map();
      _p.typesById = /* @__PURE__ */ new Map();
      _p.colsByEnt = new SuperMap();
      _dbInit(new Task(this), data, save);
    }
    isRecord(any) {
      return vault.get(this).records.has(any);
    }
    add(values2, throwError = false, context = null) {
      return _recAdd(this, arguments, throwError, context);
    }
    addOrSet(values2, throwError = false, context = null) {
      return _recAddOrSet(this, arguments, throwError, context);
    }
    addOrUpdate(values2, throwError = false, context = null) {
      return _recAddOrUpdate(this, arguments, throwError, context);
    }
    set(record, values2, throwError = false, context = null) {
      return _recSet(this, arguments, throwError, context);
    }
    update(record, values2, throwError = false, context = null) {
      return _recUpdate(this, arguments, throwError, context);
    }
    remove(record, throwError = false, context = null) {
      return _recRemove(this, arguments, throwError, context);
    }
    setBy(groupId, recId, values2, throwError = false, context = null) {
      return this.set(this.get(groupId, recId, throwError), values2, throwError, context);
    }
    updateBy(groupId, recId, values2, throwError = false, context = null) {
      return this.update(this.get(groupId, recId, throwError), values2, throwError, context);
    }
    removeBy(groupId, recId, throwError = false, context = null) {
      return this.remove(this.get(groupId, recId, throwError), throwError, context);
    }
  };

  // demo/frontend/src/index.js
  var socket = lookup2(`localhost:${info.port + 1}`);
  var bifrost = new ClientRouter(socket);
  var beam = window.beam = bifrost.createBeam("data");
  beam.get().then((data) => {
    const db2 = window.db = new DB("db", {
      data,
      save: (entName, recId, rec) => {
        if (rec) {
          const ent = data[entName] || (data[entName] = {});
          ent[recId] = rec;
        } else if (data[entName]) {
          const ent = data[entName];
          delete ent[recId];
        }
        console.log(data);
        beam.set(data);
      }
    });
    db2.fit((next, event, process) => {
      console.log("FIT", event, process);
      return next();
    });
  });
})();
//# sourceMappingURL=index.js.map
