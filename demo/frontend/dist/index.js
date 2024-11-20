(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
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
  var __copyProps = (to3, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to3, key) && key !== except)
          __defProp(to3, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to3;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // <define:__slib_info>
  var define_slib_info_default;
  var init_define_slib_info = __esm({
    "<define:__slib_info>"() {
      define_slib_info_default = { isBuild: true, name: "@randajan/ram-db", description: "Realtime database", version: "2.8.4", author: { name: "Jan Randa", email: "jnranda@gmail.com", url: "https://www.linkedin.com/in/randajan/" }, env: "development", mode: "web", port: 3005, dir: { root: "C:\\dev\\lib\\ram-db", dist: "demo/frontend/dist" } };
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
    for (const i in o) {
      const descriptor = { enumerable };
      let val = o[i];
      if (val instanceof Array) {
        descriptor.get = (_) => [...val];
      } else {
        descriptor.value = lockObject(val);
      }
      Object.defineProperty(r, i, descriptor);
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
  for (let i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }
  var decode = (base64) => {
    let bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }
    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for (i = 0; i < len; i += 4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i + 1)];
      encoded3 = lookup[base64.charCodeAt(i + 2)];
      encoded4 = lookup[base64.charCodeAt(i + 3)];
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
    packets.forEach((packet, i) => {
      encodePacket(packet, false, (encodedPacket) => {
        encodedPackets[i] = encodedPacket;
        if (++count === length) {
          callback(encodedPackets.join(SEPARATOR));
        }
      });
    });
  };
  var decodePayload = (encodedPayload, binaryType) => {
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for (let i = 0; i < encodedPackets.length; i++) {
      const decodedPacket = decodePacket(encodedPackets[i], binaryType);
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
    for (let i = 0; i < size; i++) {
      buffer[i] = chunks[0][j++];
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
    for (var i = 0; i < callbacks.length; i++) {
      cb = callbacks[i];
      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
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
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
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
    for (let i = 0, l = str.length; i < l; i++) {
      c = str.charCodeAt(i);
      if (c < 128) {
        length += 1;
      } else if (c < 2048) {
        length += 2;
      } else if (c < 55296 || c >= 57344) {
        length += 3;
      } else {
        i++;
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
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (str.length)
          str += "&";
        str += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]);
      }
    }
    return str;
  }
  function decode2(qs) {
    let qry = {};
    let pairs = qs.split("&");
    for (let i = 0, l = pairs.length; i < l; i++) {
      let pair = pairs[i].split("=");
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
      var _a;
      const opts = pick(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
      opts.xdomain = !!this._opts.xd;
      const xhr = this._xhr = this.createRequest(opts);
      try {
        xhr.open(this._method, this._uri, true);
        try {
          if (this._opts.extraHeaders) {
            xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
            for (let i in this._opts.extraHeaders) {
              if (this._opts.extraHeaders.hasOwnProperty(i)) {
                xhr.setRequestHeader(i, this._opts.extraHeaders[i]);
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
        (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
        if ("withCredentials" in xhr) {
          xhr.withCredentials = this._opts.withCredentials;
        }
        if (this._opts.requestTimeout) {
          xhr.timeout = this._opts.requestTimeout;
        }
        xhr.onreadystatechange = () => {
          var _a2;
          if (xhr.readyState === 3) {
            (_a2 = this._opts.cookieJar) === null || _a2 === void 0 ? void 0 : _a2.parseCookies(
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
    for (let i in Request.requests) {
      if (Request.requests.hasOwnProperty(i)) {
        Request.requests[i].abort();
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
      for (let i = 0; i < packets.length; i++) {
        const packet = packets[i];
        const lastPacket = i === packets.length - 1;
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
      for (let i = 0; i < packets.length; i++) {
        const packet = packets[i];
        const lastPacket = i === packets.length - 1;
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
      var _a;
      (_a = this._transport) === null || _a === void 0 ? void 0 : _a.close();
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
    let m = re.exec(str || ""), uri = {}, i = 14;
    while (i--) {
      uri[parts[i]] = m[i] || "";
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
      for (let i = 0; i < this.writeBuffer.length; i++) {
        const data = this.writeBuffer[i].data;
        if (data) {
          payloadSize += byteLength(data);
        }
        if (i > 0 && payloadSize > this._maxPayload) {
          return this.writeBuffer.slice(0, i);
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
            const i = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
            if (i !== -1) {
              OFFLINE_EVENT_LISTENERS.splice(i, 1);
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
        for (let i = 0; i < this._upgrades.length; i++) {
          this._probe(this._upgrades[i]);
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
      function onupgrade(to3) {
        if (transport && to3.name !== transport.name) {
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
      for (let i = 0; i < upgrades.length; i++) {
        if (~this.transports.indexOf(upgrades[i]))
          filteredUpgrades.push(upgrades[i]);
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
      for (let i = 0, l = obj.length; i < l; i++) {
        if (hasBinary(obj[i])) {
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
      for (let i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i], buffers);
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
      for (let i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i], buffers);
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
      let i = 0;
      const p = {
        type: Number(str.charAt(0))
      };
      if (PacketType[p.type] === void 0) {
        throw new Error("unknown packet type " + p.type);
      }
      if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
        const start = i + 1;
        while (str.charAt(++i) !== "-" && i != str.length) {
        }
        const buf = str.substring(start, i);
        if (buf != Number(buf) || str.charAt(i) !== "-") {
          throw new Error("Illegal attachments");
        }
        p.attachments = Number(buf);
      }
      if ("/" === str.charAt(i + 1)) {
        const start = i + 1;
        while (++i) {
          const c = str.charAt(i);
          if ("," === c)
            break;
          if (i === str.length)
            break;
        }
        p.nsp = str.substring(start, i);
      } else {
        p.nsp = "/";
      }
      const next = str.charAt(i + 1);
      if ("" !== next && Number(next) == next) {
        const start = i + 1;
        while (++i) {
          const c = str.charAt(i);
          if (null == c || Number(c) != c) {
            --i;
            break;
          }
          if (i === str.length)
            break;
        }
        p.id = Number(str.substring(start, i + 1));
      }
      if (str.charAt(++i)) {
        const payload = this.tryParse(str.substr(i));
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
      var _a, _b, _c;
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
      const isTransportWritable = (_b = (_a = this.io.engine) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.writable;
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
      var _a;
      const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
      if (timeout === void 0) {
        this.acks[id] = ack;
        return;
      }
      const timer = this.io.setTimeoutFn(() => {
        delete this.acks[id];
        for (let i = 0; i < this.sendBuffer.length; i++) {
          if (this.sendBuffer[i].id === id) {
            this.sendBuffer.splice(i, 1);
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
        for (let i = 0; i < listeners.length; i++) {
          if (listener === listeners[i]) {
            listeners.splice(i, 1);
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
        for (let i = 0; i < listeners.length; i++) {
          if (listener === listeners[i]) {
            listeners.splice(i, 1);
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
      var _a;
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
      this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
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
      var _a;
      if (v === void 0)
        return this._reconnectionDelay;
      this._reconnectionDelay = v;
      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
      return this;
    }
    randomizationFactor(v) {
      var _a;
      if (v === void 0)
        return this._randomizationFactor;
      this._randomizationFactor = v;
      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
      return this;
    }
    reconnectionDelayMax(v) {
      var _a;
      if (v === void 0)
        return this._reconnectionDelayMax;
      this._reconnectionDelayMax = v;
      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
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
      for (let i = 0; i < encodedPackets.length; i++) {
        this.engine.write(encodedPackets[i], packet.options);
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
      var _a;
      this.cleanup();
      (_a = this.engine) === null || _a === void 0 ? void 0 : _a.close();
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
  var numOrZero = (num) => {
    const n = Number(num);
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
      const pass = opt.pass != null ? opt.pass : "all";
      if (!_pass.includes(pass)) {
        throw Error(`Queue(...) expect opt.pass to be one of: '${_pass.join("|")}'`);
      }
      const args = toArray2(opt.args);
      const softMs = numOrZero(opt.softMs);
      const hardMs = numOrZero(opt.hardMs);
      const maxSize = numOrZero(opt.maxSize);
      const hardMsActive = hardMs > softMs;
      let pcq, intA, intB, startAt, prom, tasks = [];
      if (pass === "all") {
        pcq = async (q) => processTasks(...args, q);
      } else if (pass === "first") {
        pcq = async (q) => processTasks(...args, ...q[0]);
      } else if (pass === "last") {
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
    for (let i in descObj) {
      desc += (desc ? ", " : "") + ` ${i} '${descObj[i]}'`;
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
    const extend2 = msg("", "remote", { channel });
    e.message = extend2 + " " + e.message;
    e.stack = extend2 + " " + e.stack;
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
  var unregisterExe = (list2, exe) => {
    const x = list2.indexOf(exe);
    if (x < 0) {
      return false;
    }
    list2.splice(x, 1);
    return true;
  };
  var registerExe = (list2, exe) => {
    list2.unshift(exe);
    return (_) => unregisterExe(list2, exe);
  };
  var mapList = async (map2, list2, ...args) => {
    for (let i = list2.length - 1; i >= 0; i--) {
      try {
        const res = await list2[i](...args);
        if (map2 && typeof res === "function") {
          map2.push(res);
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  var wrapWithQueue = (exe, queue) => !queue ? exe : createQueue(exe, queue);
  var wrapWithTrait = (exe, trait) => !trait ? exe : async (s, ...a) => exe(await trait(s, ...a), ...a);
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
        get,
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
        get,
        actions
      };
      const propagate = (state, args) => {
        mapList(void 0, _p.watchers, state, ...args);
      };
      const set = async (state, args) => {
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
        return set(state, args);
      };
      const push = async (state, args) => {
        if (ac && ac != "local") {
          throw Error(msg(".Beam", "doesn't allow local changes", { channel }));
        }
        if (!pushRaw) {
          return set(state, args);
        }
        const remote = await pushRaw(state, ...args);
        const local = await set(stateExtract(remoteStateProp, remote), args);
        return stateAttach(remoteStateProp, remote, stateExtract(localStateProp, local));
      };
      const pull = !pullRaw ? async (args) => propagate(await get(...args), args) : async (args) => set(await pullRaw(...args), args);
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
      const { status, pull, get } = _privates.get(this);
      if (status === "init") {
        pull(args);
      }
      return get(...args);
    }
    async get(...args) {
      const { pending, status, pull, get } = _privates.get(this);
      if (pending) {
        await pending;
      } else if (status === "init") {
        await pull(args);
      }
      return get(...args);
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
        register: (beam2, set) => {
          this.rx(channel, (socket2, state) => set(state));
        }
      }, opt);
    }
  };

  // dist/index.js
  init_define_slib_info();

  // dist/chunk-ANX6F3ON.js
  init_define_slib_info();

  // node_modules/@randajan/jet-core/dist/index.js
  init_define_slib_info();

  // node_modules/@randajan/jet-core/dist/chunk-UOVKGED6.js
  init_define_slib_info();

  // node_modules/@randajan/jet-core/dist/chunk-MQZZBFQG.js
  init_define_slib_info();

  // node_modules/@randajan/jet-core/dist/chunk-C7UZX2AX.js
  init_define_slib_info();
  var __defProp2 = Object.defineProperty;
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var Plex = class extends Function {
    static extend(self2, props = {}) {
      for (let i in props) {
        Object.defineProperty(self2, i, { value: props[i], enumerable: true });
      }
      return self2;
    }
    constructor(fce, props = {}) {
      super();
      return Plex.extend(Object.setPrototypeOf(fce ? fce.bind() : this, new.target.prototype), props);
    }
  };
  var Plex_default = Plex;

  // node_modules/@randajan/jet-core/dist/chunk-MQZZBFQG.js
  var byName = {};
  var byPrototype = /* @__PURE__ */ new Map();
  var constructorByName = {};
  var defaultThrow = (msg2, name) => `jet${name ? ` type '${name}'` : ""} ${msg2}`;
  var throwError = (msg2, name) => {
    throw defaultThrow(msg2, name);
  };
  var throwWarn = (msg2, name) => {
    console.warn(defaultThrow(msg2, name));
  };
  var getDefByName = (name) => byName[name];
  var getDefByProto = (prototype) => {
    const list2 = byPrototype.get(prototype);
    return list2 ? list2[0] : void 0;
  };
  var getByInst = (any, def, withDef = true) => {
    if (!def.is || def.is(any)) {
      return withDef ? def : def.name;
    }
  };
  var findByProto = (any, proto2, withDef = true) => {
    const list2 = byPrototype.get(proto2);
    if (!list2) {
      return;
    }
    if (list2.length === 1) {
      return getByInst(any, list2[0], withDef);
    }
    for (const def of list2) {
      const r = getByInst(any, def, withDef);
      if (r) {
        return r;
      }
    }
  };
  var findByInst = (any, strict, withDef = true) => {
    if (any == null) {
      return;
    }
    if (strict) {
      return findByProto(any, any.__proto__, withDef);
    }
    let r, p = any;
    do {
      r = findByProto(any, p = p.__proto__, withDef);
    } while (p && r === void 0);
    return r;
  };
  var getDefByInst = (any, strict = true) => findByInst(any, strict, true);
  var getNameByInst = (any, strict = true) => findByInst(any, strict, false);
  var register = (def) => {
    byName[def.name] = def;
    Object.defineProperty(constructorByName, def.name, { enumerable: true, value: def.constructor });
    const list2 = byPrototype.get(def.prototype);
    if (list2) {
      list2.unshift(def);
    } else {
      byPrototype.set(def.prototype, [def]);
    }
  };
  var base_default = new Plex_default(getNameByInst, {
    types: constructorByName
  });
  var enumerable3 = true;
  var _magic = ["only", "full", "tap", "pull", "is", "to", "copy", "rnd"];
  var isInstance = (any) => {
    const t = typeof any;
    return any != null && (t === "function" || t === "object");
  };
  var isInstanceOf = (constructor, any) => any instanceof constructor;
  var is = (name, any, strict = true) => {
    if (!name) {
      return false;
    }
    const def = getDefByName(name);
    if (def) {
      if (any == null) {
        return false;
      }
      if (strict && any.__proto__ !== def.prototype) {
        return false;
      }
      if (!strict && !(any instanceof def.constructor)) {
        return false;
      }
      return !def.is || def.is(any);
    }
    const nt = typeof name;
    if (nt === "string") {
      return typeof any === name;
    }
    if (any == null || nt !== "function" && nt !== "object") {
      return false;
    }
    return strict ? any.constructor === name : any instanceof name;
  };
  var isFull = (any, vals) => {
    if (!vals) {
      return any === false || any === 0 || !!any;
    }
    for (let v of vals(any)) {
      if (v != null) {
        return true;
      }
    }
    return false;
  };
  var _touch = (def, op, err, ...args) => {
    if (def[op]) {
      return def[op](...args);
    }
    if (err) {
      throwError(`undefined operation '${op}' - unavailable for this type`, def.name);
    }
  };
  var touch = (name, op, err, ...args) => {
    const def = getDefByName(name);
    if (def) {
      return _touch(def, op, err, ...args);
    }
    if (err) {
      throwError(`unable execute '${op}' - type unknown`, name);
    }
  };
  var touchBy = (any, op, err, ...args) => {
    const def = getDefByInst(any, false);
    if (def) {
      return _touch(def, op, err, any, ...args);
    }
    if (err) {
      throwError(`unable execute '${op}' - missing type of '${any}'`);
    }
  };
  var factory = (name, mm, ...args) => {
    const def = getDefByName(name);
    const n = isInstance(name);
    if (n && mm > 0) {
      throwError(`unable execute '${_magic[mm]}' - unavailable for plain constructors`);
    }
    if (name && !n && !def) {
      throwError(`unable execute '${_magic[mm]}' - type unknown`, name);
    }
    if (!name && mm !== 1) {
      throwError(`unable execute '${_magic[mm]}' - type missing`);
    }
    for (const a of args) {
      if (!n) {
        const at = getDefByInst(a);
        if ((!name || at && at.name === name) && (mm !== 1 || (at && at.isFull(a) || !at && isFull(a)))) {
          return mm === 3 ? at.copy(a) : a;
        }
      } else if (isInstanceOf(name, a)) {
        return a;
      }
    }
    if (mm > 1) {
      return def.create();
    }
  };
  var to = (name, any, ...args) => {
    const def = getDefByName(name);
    if (!def) {
      throwError(`unable execute 'to' - type unknown`, name);
    }
    const at = getDefByInst(any, false);
    if (!at) {
      return def.create();
    }
    if (def.name === at.name) {
      return any;
    }
    const exe = at.to[name] || at.to["*"];
    return exe ? to(name, exe(any, ...args), ...args) : def.create(any);
  };
  var defineTo = (from, to22, exe) => {
    const tt = typeof to22;
    const def = getDefByName(from);
    if (!def) {
      throwError(`unable define 'to' - type unknown`, from);
    }
    const conv = def.to;
    if (tt === "function") {
      conv["*"] = to22;
    } else if (tt === "object" && Array.isArray(to22)) {
      for (let i in to22) {
        conv[to22[i]] = exe;
      }
    } else if (tt === "object") {
      for (let i in to22) {
        conv[i] = to22[i];
      }
    } else {
      conv[to22] = exe;
    }
  };
  var getRND = (arr, min, max, sqr) => {
    if (!arr) {
      return;
    }
    arr = Array.from(arr);
    const l = arr.length;
    return arr[Math.floor(Number.jet.rnd(Number.jet.frame(min || 0, 0, l), Number.jet.frame(max || l, 0, l), sqr))];
  };
  var extend = (def, extender, isNative = false) => {
    const { name, constructor } = def;
    for (const key in extender) {
      const value2 = extender[key];
      Object.defineProperty(constructor.jet, key, { enumerable: enumerable3, value: value2 });
      if (isNative && base_default[key]) {
        Object.defineProperty(base_default[key], name, { enumerable: enumerable3, value: value2 });
      }
    }
    return true;
  };
  var defineExtend = (name, extender = {}) => {
    const def = getDefByName(name);
    if (!def) {
      throwError(`unable define 'extend' - type unknown`, name);
    }
    if (typeof extender !== "object") {
      throwError(`unable define 'extend' - require object`, name);
    }
    if (!def.constructor.jet) {
      Object.defineProperty(def.constructor, "jet", { value: {}, writable: true });
    }
    return extend(def, extender, false);
  };
  var accepts = ["create", "is", "isFull", "copy", "rnd", "keys", "vals", "entries", "get", "set", "rem", "to", "extend"];
  var define = (name, constructor, options = {}) => {
    if (getDefByName(name)) {
      throwError("is allready defined", name);
    }
    if (!constructor) {
      throwError("constructor missing", name);
    }
    let { create, is: is2, isFull: isFull2, copy: copy2, rnd, keys, vals, entries, get, set, rem, to: to22, extend: extend2 } = options;
    const unknownOptions = Object.keys(options).filter((opt) => !accepts.includes(opt));
    if (unknownOptions.length) {
      throwWarn(`unknown options appeared at definition. '${unknownOptions.join("', '")}'`, name);
    }
    if ((keys || vals || entries) && !(keys && vals && entries)) {
      throwError("keys, vals or entries missing", name);
    }
    const prototype = constructor.prototype;
    const ancestor = getDefByProto(prototype);
    create = create || ((...a) => new constructor(...a));
    copy2 = copy2 || ((any) => any);
    rnd = rnd || create;
    isFull2 = isFull2 || ((any) => isFull(any, vals));
    if (entries) {
      get = get || ((x, k) => x[k]);
      set = set || ((x, k, v) => x[k] = v);
      rem = rem || ((x, k) => delete x[k]);
    }
    const def = { name, constructor, prototype, is: is2, create, isFull: isFull2, copy: copy2, rnd, keys, vals, entries, get, set, rem, to: {} };
    register(def);
    defineTo(name, to22);
    if (extend2 !== false) {
      if (ancestor) {
        throwWarn(`constructor allready extended as '${ancestor.name}'. Use option 'extend:false'`, name);
      }
      Object.defineProperty(constructor, "jet", { value: {}, writable: true });
      extend(def, {
        create,
        rnd,
        isFull: isFull2,
        is: (any, strict = true) => is(name, any, strict),
        to: (any, ...a) => to(name, any, ...a),
        only: (...a) => factory(name, 0, ...a),
        full: (...a) => factory(name, 1, ...a),
        tap: (...a) => factory(name, 2, ...a),
        pull: (...a) => factory(name, 3, ...a)
      }, true);
      if (entries) {
        extend(def, {
          keys,
          vals,
          entries,
          get,
          set,
          rem,
          getRND: (any, min, max, sqr) => getRND(vals(any), min, max, sqr)
        }, true);
      }
      if (typeof extend2 === "object") {
        extend(def, extend2);
      }
    }
    return constructor;
  };
  var define_default = define;
  var props_exports = {};
  __export2(props_exports, {
    cached: () => cached,
    safe: () => safe,
    solid: () => solid,
    virtual: () => virtual
  });
  var solid = new Plex_default(
    (obj, name, value2, enumerable22 = true) => Object.defineProperty(obj, name, { enumerable: enumerable22, value: value2 }),
    {
      all: (obj, namedValues, enumerable22 = true) => {
        for (const [name, value2] of Object.entries(namedValues)) {
          solid(obj, name, value2, enumerable22);
        }
        return obj;
      }
    }
  );
  var virtual = new Plex_default(
    (obj, name, get, enumerable22 = true) => Object.defineProperty(obj, name, { enumerable: enumerable22, get }),
    {
      all: (obj, namedGets, enumerable22 = true) => {
        for (const [name, get] of Object.entries(namedGets)) {
          virtual(obj, name, get, enumerable22);
        }
        return obj;
      }
    }
  );
  var safe = new Plex_default(
    (obj, priv, name, set, get, enumerable22 = true) => {
      return Object.defineProperty(obj, name, {
        set: set ? (v) => priv[name] = set(v, priv[name], name) : void 0,
        get: get ? (_) => get(priv[name], name) : (_) => priv[name],
        enumerable: enumerable22
      });
    },
    {
      all: (obj, priv, namedSetsAndGets, enumerable22 = true) => {
        for (const [name, { set, get }] of Object.entries(namedSetsAndGets)) {
          safe(obj, priv, name, set, get, enumerable22);
        }
        return obj;
      }
    }
  );
  var cached = new Plex_default(
    (obj, priv, name, set, enumerable22 = true) => {
      return safe(obj, priv, name, null, (v) => v != null ? v : priv[name] = set(name), enumerable22);
    },
    {
      all: (obj, priv, namedSets, enumerable22 = true) => {
        for (const [name, set] of Object.entries(namedSets)) {
          cached(obj, priv, name, set, enumerable22);
        }
        return obj;
      }
    }
  );
  var pile_exports = {};
  __export2(pile_exports, {
    assign: () => assign,
    compare: () => compare,
    copy: () => copy,
    deflate: () => deflate,
    dig: () => dig,
    digIn: () => digIn,
    digOut: () => digOut,
    enumFactory: () => enumFactory,
    inflate: () => inflate,
    json: () => json,
    melt: () => melt,
    merge: () => merge,
    reducer: () => reducer,
    run: () => run
  });
  var dot_exports = {};
  __export2(dot_exports, {
    bite: () => bite,
    biteLeft: () => biteLeft,
    biteRight: () => biteRight,
    escape: () => escape,
    glue: () => glue,
    split: () => split,
    toArray: () => toArray3,
    toString: () => toString2,
    unescape: () => unescape
  });
  var isBlank = (str) => str == null || str === "";
  var noBlank = (str) => isBlank(str) ? "" : str;
  var escape = (str) => typeof str !== "string" ? str : str.replaceAll(".", "\\.");
  var unescape = (str) => typeof str !== "string" ? str : str.replaceAll("\\.", ".");
  var split = (str) => (str.match(/(?:\\.|[^.])+/g) || []).map(unescape);
  var bite = (str, direction, position) => {
    const dir = direction !== false;
    const x = dir ? str.indexOf(".", position) : str.lastIndexOf(".", position);
    if (x <= 0) {
      return [str, ""];
    }
    if (x > 1 && str.charAt(x - 1) === "\\") {
      return bite(str, dir, x + (dir * 2 - 1));
    }
    return direction ? [str.slice(0, x), str.slice(x + 1)] : [str.slice(x + 1), str.slice(0, x)];
  };
  var biteLeft = (str, position) => bite(str, true, position);
  var biteRight = (str, position) => bite(str, false, position);
  var glue = (strA, strB) => {
    if (isBlank(strA)) {
      return noBlank(strB);
    }
    if (isBlank(strB)) {
      return noBlank(strA);
    }
    return strA + "." + strB;
  };
  var toString2 = (any) => base_default.melt(any, ".");
  var toArray3 = (any) => split(toString2(any));
  var each = (any, fce, deep, init) => {
    let isPending = true;
    const stop = (_) => {
      isPending = false;
    };
    const dprun = base_default.isRunnable(deep);
    const exe = (ctx2, skipDeep = false) => {
      const { parent, path, def } = ctx2;
      const de = def?.entries;
      if (!de || !deep && parent) {
        fce(ctx2);
      } else if (dprun && !skipDeep) {
        deep(ctx2, (_) => {
          exe(ctx2, true);
        });
      } else {
        for (let [key, val] of de(ctx2.val)) {
          exe({
            parent: ctx2,
            val,
            key,
            stop,
            def: getDefByInst(val),
            path: glue(path, escape(String(key)))
          });
          if (!isPending) {
            break;
          }
        }
        ;
      }
      return ctx2.result;
    };
    const ctx = { val: any, stop, def: getDefByInst(any) };
    if (init) {
      init(ctx);
    }
    return exe(ctx, true);
  };
  var reducer = (reductor) => {
    let i = 0, next;
    return next = (...input) => reductor(next, i++, ...input);
  };
  var dig = (any, path, reductor) => {
    path = toArray3(path);
    const end = path.length - 1;
    return reducer((next, index, parent) => {
      return reductor(next, parent, path[index], index === end);
    })(any);
  };
  var digOut = (any, path, def) => {
    path = toArray3(path);
    for (let p of path) {
      if (null == (any = base_default.get(any, p, false))) {
        return def;
      }
    }
    return any;
  };
  var digIn = (any, path, val, force = true) => {
    const step = (next, parent, key, isEnd) => {
      let df = getDefByInst(parent);
      if (!df || !df.entries) {
        if (!force) {
          return parent;
        }
        parent = String.jet.isNumeric(key) ? [] : {};
        df = getDefByInst(parent);
      }
      const v = isEnd ? val : next(df.get(parent, key, false));
      if (v != null) {
        df.set(parent, key, v, false);
        return parent;
      }
      df.rem(parent, key);
      if (df.isFull(parent)) {
        return parent;
      }
    };
    return dig(any, path, step);
  };
  var deflate = (any, includeMapable = false) => {
    const flat = {};
    const add = ({ val, path }, next) => {
      flat[path] = val;
      if (next) {
        next();
      }
    };
    each(any, add, includeMapable ? add : true);
    if (includeMapable) {
      flat[""] = any;
    }
    return flat;
  };
  var inflate = (flat, includeMapable = true) => {
    const r = {};
    for (const e of Object.keys(flat).sort()) {
      if (!includeMapable && base_default.isMapable(flat[e])) {
        continue;
      }
      digIn(r, "to." + e, flat[e], true);
    }
    return r.to;
  };
  var _assign = (overwriteArray, to22, ...any) => {
    const flat = deflate(to22, true);
    const add = ({ val, path }) => {
      to22 = digIn(to22, path, val);
    };
    const acumulate = ({ val, path, def }, next) => {
      if (!flat[path]) {
        add(flat[path] = def.create(), path);
      }
      if (Array.isArray(val) && Array.isArray(flat[path])) {
        flat[path].push(...val);
      } else {
        next(val);
      }
    };
    for (const a of any) {
      each(a, add, !!overwriteArray || acumulate);
    }
    return to22;
  };
  var assign = (to22, from, overwriteArray = true) => _assign(overwriteArray, to22, from);
  var merge = (...any) => _assign(false, {}, ...any);
  var compare = (a, b, diffList = false) => {
    if (a === b) {
      return changeList ? [] : true;
    }
    const res = [];
    const flat = deflate(a);
    each(b, ({ val, path, stop }) => {
      if (flat[path] !== val) {
        res.push(path);
      }
      delete flat[path];
      if (!diffList && res.length) {
        stop();
      }
    }, true);
    for (let path in flat) {
      if (!diffList && res.length) {
        break;
      }
      res.push(path);
    }
    return diffList ? res : !res.length;
  };
  var copy = (any, deep = false, copyUnmapable = false) => {
    return each(any, (ctx) => {
      const { parent, val, key, def } = ctx;
      if (!parent) {
        return;
      }
      parent.def.set(parent.result, key, ctx.result = copyUnmapable ? def.copy(val) : val);
    }, !deep ? false : (ctx, next) => {
      const { parent, key, def } = ctx;
      parent.def.set(parent.result, key, ctx.result = def.create());
      next();
    }, (ctx) => {
      const { val, def } = ctx;
      ctx.result = def.entries ? def.create() : def.copy(val);
    });
  };
  var melt = (any, comma, trait) => {
    if (any == null) {
      return "";
    }
    if (typeof any === "string") {
      return any;
    }
    let j = "", c = String.jet.to(comma);
    if (!base_default.isMapable(any)) {
      return String.jet.to(any, c);
    }
    if (!base_default.isRunnable(trait)) {
      trait = String.jet.to;
    }
    each(any, ({ val }) => {
      val = trait(val, c);
      if (val) {
        j += (j ? c : "") + val;
      }
    }, true);
    return j;
  };
  var run = (any, ...args) => {
    if (base_default.isRunnable(any)) {
      return any(...args);
    }
    if (!base_default.isMapable(any)) {
      return void 0;
    }
    const res = [];
    each(any, ({ val }) => {
      res.push(base_default.isRunnable(val) ? val(...args) : void 0);
    }, true);
    return res;
  };
  var enumFactory = (enums, { before, after, def } = {}) => (raw, ...args) => {
    const input = before ? before(raw, ...args) : raw;
    const output = enums.includes(input) ? input : def;
    return after ? after(output, ...args) : output;
  };
  var json = {
    from: (json2, throwErr = false) => {
      if (base_default.isMapable(json2)) {
        return json2;
      }
      try {
        return JSON.parse(String.jet.to(json2));
      } catch (e) {
        if (throwErr === true) {
          throw e;
        }
      }
    },
    to: (obj, prettyPrint = false) => {
      const spacing = Number.jet.only(prettyPrint === true ? 2 : prettyPrint);
      return JSON.stringify(base_default.isMapable(obj) ? obj : {}, null, spacing);
    }
  };
  var defs_default = Plex_default.extend(base_default, {
    is,
    to,
    isFull: (any) => {
      const def = getDefByInst(any, false);
      return def ? def.isFull(any) : isFull(any);
    },
    isMapable: (any, strict = true) => {
      const def = getDefByInst(any, strict);
      return def ? !!def.entries : false;
    },
    isRunnable: (any) => typeof any === "function",
    full: (...a) => factory(null, 1, ...a),
    only: (name, ...a) => factory(name, 0, ...a),
    tap: (name, ...a) => factory(name, 2, ...a),
    pull: (name, ...a) => factory(name, 3, ...a),
    create: (name, ...a) => touch(name, "create", true, ...a),
    rnd: (name, ...a) => touch(name, "rnd", true, ...a),
    keys: (any, throwError2 = false) => touchBy(any, "keys", throwError2) || [],
    vals: (any, throwError2 = false) => touchBy(any, "vals", throwError2) || [],
    entries: (any, throwError2 = false) => touchBy(any, "entries", throwError2) || [],
    get: (any, key, throwError2 = false) => touchBy(any, "get", throwError2, key),
    set: (any, key, val, throwError2 = false) => touchBy(any, "set", throwError2, key, val),
    rem: (any, key, throwError2 = true) => touchBy(any, "rem", throwError2, key),
    uid: (length = 12, pattern = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890") => {
      let r = "";
      pattern = String.jet.to(pattern) || "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      while (r.length < length) {
        r += base_default.getRND(pattern);
      }
      return r;
    },
    getRND: (any, min, max, sqr) => {
      const def = getDefByInst(any);
      if (def && def.vals) {
        any = def.vals(any);
      } else if (typeof any === "string") {
        return getRND(any, min, max, sqr);
      }
    },
    prop: props_exports,
    ...pile_exports,
    dot: dot_exports,
    define: new Plex_default(define_default, { to: defineTo, extend: defineExtend })
  });
  define_default("Plex", Plex_default, {
    copy: (x) => Object.defineProperties({}, Object.getOwnPropertyDescriptors(x)),
    keys: (x) => Object.keys(x),
    vals: (x) => Object.values(x),
    entries: (x) => Object.entries(x)
  });

  // node_modules/@randajan/jet-core/dist/chunk-UOVKGED6.js
  defs_default.define("Number", Number, {
    create: Number,
    rnd: (min, max, sqr) => {
      let r = Math.random();
      sqr = sqr === true ? 2 : sqr === false ? -2 : Number.jet.is(sqr) ? sqr : 0;
      if (sqr) {
        r = Math.pow(r, sqr < 0 ? -sqr : 1 / sqr);
      }
      return Number.jet.fromRatio(r, min || 0, max || min || 1);
    },
    to: {
      Function: (num) => (_) => num,
      Boolean: (num) => !!num,
      Array: (num, comma) => comma ? [num] : Array(num),
      Promise: async (num) => num,
      String: (num) => String(num)
    },
    extend: {
      x: (num1, symbol, num2) => {
        const s = symbol, nums = Number.jet.zoomIn(num1, num2), [n, m] = nums;
        if (s === "/") {
          return n / m;
        }
        if (s === "*") {
          return n * m / Math.pow(nums.zoom, 2);
        }
        return (s === "+" ? n + m : s === "-" ? n - m : s === "%" ? n % m : NaN) / nums.zoom;
      },
      frame: (num, min, max) => {
        num = max == null ? num : Math.min(num, max);
        return min == null ? num : Math.max(num, min);
      },
      round: (num, dec, kind) => {
        const k = Math.pow(10, dec || 0);
        return Math[kind == null ? "round" : kind ? "ceil" : "floor"](num * k) / k;
      },
      len: (num, bol) => {
        const b = bol, s = String.jet.to(num), l = s.length, i = s.indexOf("."), p = i >= 0;
        return b === false ? p ? l - i - 1 : 0 : !p || !b ? l : i;
      },
      period: (val, min, max) => {
        const m = max - min;
        return (m + (val - min) % m) % m + min;
      },
      toRatio: (num, min, max) => {
        const m = max - min;
        return m ? (num - min) / m : 0;
      },
      fromRatio: (num, min, max) => {
        const m = max - min;
        return num * m + min;
      },
      zoomIn: (...nums) => {
        const zoom = Math.pow(10, Math.max(...nums.map((num) => Number.jet.len(num, false))));
        return defs_default.prop.solid(nums.map((num) => Math.round(num * zoom)), "zoom", zoom);
      },
      zoomOut: (...nums) => nums.map((num) => num / nums.zoom),
      diffusion: (num, min, max, diffusion) => {
        const d = num * diffusion;
        return Number.jet.rnd(Math.max(min, num - d), Math.min(max, num + d));
      },
      snap: (num, step, min, max, ceil, frame = true) => {
        var v = num, s = step, n = min, m = max, ni = n != null, mi = m != null, c = ceil;
        if (v == null || s == null || s <= 0 || !(ni || mi)) {
          return v;
        } else if (frame) {
          v = Number.jet.frame(v, n, m);
        }
        var r = ni ? v - n : m - v;
        v = r % s ? (ni ? n : m) + Number.jet.round(r / s, 0, c == null ? null : c === ni) * s * (ni * 2 - 1) : v;
        return frame ? Number.jet.frame(v, n, m) : v;
      },
      whatpow: (num, base) => Math.log(num) / Math.log(Number.jet.to(base)),
      toHex: (num) => {
        var r = Math.round(num).toString(16);
        return r.length === 1 ? "0" + r : r;
      },
      toLetter: (num, letters) => {
        letters = String.jet.to(letters) || "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const len = letters.length;
        return (num >= len ? Number.jet.toLetter(Math.floor(num / len) - 1) : "") + letters[num % len];
      }
    }
  });
  defs_default.define("Array", Array, {
    create: Array,
    copy: (x) => Array.from(x),
    keys: (x) => [...x.keys()],
    vals: (x) => [...x.values()],
    entries: (x) => [...x.entries()],
    to: {
      Function: (arr) => (_) => arr,
      Boolean: (arr) => Array.jet.isFull(arr),
      Number: (arr) => arr.length,
      String: (arr, comma) => defs_default.melt(arr, comma),
      Object: (arr) => Object.assign({}, arr),
      Promise: async (arr) => arr,
      Error: (arr, comma) => defs_default.melt(arr, comma != null ? comma : " "),
      RegExp: (arr, comma) => defs_default.melt(arr, comma != null ? comma : "|")
    },
    extend: {
      swap: (arr, to22, from) => {
        [arr[to22], arr[from]] = [arr[from], arr[to22]];
        return arr;
      },
      shuffle: (arr) => {
        for (let i = arr.length - 1; i > 0; i--) {
          Array.jet.swap(arr, Math.floor(Math.random() * (i + 1)), i);
        }
        return arr;
      },
      clean: (arr, rekey, handler) => {
        handler = Function.jet.tap(handler, (v) => v != null);
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
        for (let i = 0; i < a.length; i++) {
          if (a[i] === b[i]) {
            continue;
          }
          if (sameIndex) {
            return false;
          }
          wr(a[i], 1);
          wr(b[i], -1);
        }
        return !m.size;
      },
      sliceMap: (arr, size, callback) => {
        if (!defs_default.isRunnable(callback)) {
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
    }
  });
  defs_default.define("Boolean", Boolean, {
    create: Boolean,
    rnd: (trueRatio = 0.5) => Math.random() < trueRatio,
    to: {
      Function: (bol) => (_) => bol
    }
  });
  defs_default.define("Date", Date, {
    create: (x) => !x ? new Date() : new Date(x),
    rnd: (from, to22) => new Date(Number.jet.rnd(new Date(from).getTime(), to22 ? new Date(to22).getTime() : Date.now() * 2)),
    to: {
      Function: (date) => (_) => date
    }
  });
  defs_default.define("Error", Error, {
    create: Error,
    rnd: (...a) => new Error(defs_default.rnd.String(...a)),
    to: {
      Function: (err) => (_) => err
    }
  });
  defs_default.define("Function", Function, {
    create: Function,
    copy: (x) => Object.defineProperties({ [x.name]: (...a) => x(...a) }[x.name], Object.getOwnPropertyDescriptors(x)),
    extend: {
      benchmark: (fces, inputs, iterations = 100) => {
        const results = [];
        const args = [];
        for (let i = 0; i < iterations; i++) {
          args[i] = inputs.map((f) => f());
        }
        for (const key in fces) {
          const fce = fces[key];
          if (typeof fce !== "function") {
            continue;
          }
          const log2 = [];
          const startTime = performance.now();
          for (let i = 0; i < iterations; i++) {
            log2.push({ inputs: args[i], output: fce(...args[i]) });
          }
          const endTime = performance.now();
          const duration = endTime - startTime;
          results.push({ name: fce.name || key, duration, log: log2 });
        }
        return results.sort((a, b) => a.duration - b.duration);
      }
    },
    to: {
      "*": (fce, ...args) => fce(...args),
      Promise: async (fce, ...args) => await fce(...args)
    }
  });
  defs_default.define("Map", Map, {
    copy: (x) => new Map(x),
    keys: (x) => [...x.keys()],
    vals: (x) => [...x.values()],
    entries: (x) => [...x.entries()],
    get: (x, k) => x.get(k),
    set: (x, k, v) => x.set(k, v),
    rem: (x, k) => x.delete(k),
    to: {
      Function: (map2) => (_) => map2
    }
  });
  defs_default.define("NaN", Number, {
    create: (_) => NaN,
    is: isNaN,
    extend: false,
    to: (_) => void 0
  });
  var filter = (obj, callback) => {
    const r = {};
    for (let i in obj) {
      if (callback(obj[i], i)) {
        r[i] = obj[i];
      }
    }
    return r;
  };
  defs_default.define("Object", Object, {
    create: Object,
    copy: (x) => Object.defineProperties({}, Object.getOwnPropertyDescriptors(x)),
    keys: (x) => Object.keys(x),
    vals: (x) => Object.values(x),
    entries: (x) => Object.entries(x),
    extend: {
      filter,
      exclude: (obj, mask = []) => filter(obj, (v, k) => !mask.includes(k)),
      extract: (obj, mask = []) => filter(obj, (v, k) => mask.includes(k))
    },
    to: {
      Function: (obj) => (_) => obj,
      Symbol: (obj) => Symbol(defs_default.json.to(obj)),
      Boolean: (obj) => defs_default.isFull.Object(obj),
      Number: (obj) => Object.values(obj),
      Array: (obj) => Object.values(obj),
      String: (obj) => obj.toString && obj.toString !== Object.prototype.toString ? obj.toString() : defs_default.json.to(obj),
      Promise: async (obj) => obj,
      Error: (obj) => defs_default.json.to(obj),
      RegExp: (obj, comma) => defs_default.melt(obj, comma != null ? comma : "|")
    }
  });
  defs_default.define("Promise", Promise, {
    create: (x) => new Promise(defs_default.only.Function(x, (e) => e()))
  });
  defs_default.define("RegExp", RegExp, {
    create: RegExp,
    copy: (x) => RegExp(x.source),
    extend: {
      lib: {
        line: /[^\n\r]+/g,
        number: /-?(\d+(\s+\d+)*)*[,.]?\d+/,
        word: /[^\s\n\r]+/g,
        num: /-?[0-9]*[.,]?[0-9]+/,
        email: /(?:[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,
        ip: /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))/i,
        domain: /([a-z0-9]+\.)+(cz|de|sk|au|com|eu|info|org|[a-z]+)/i,
        hexadecimal: /[0-9a-fA-F]{6,6}/
      }
    },
    to: {
      Function: (regex) => (_) => regex,
      String: (regex) => regex.source
    }
  });
  defs_default.define("Set", Set, {
    copy: (x) => new Set(x),
    keys: (x) => [...x.keys()],
    vals: (x) => [...x.values()],
    entries: (x) => [...x.entries()],
    get: (x, k) => x.has(k) ? k : void 0,
    set: (x, k, v) => x.add(v) ? v : void 0,
    rem: (x, k) => x.delete(k),
    to: {
      "*": (set) => Array.from(set),
      Function: (set) => (_) => set,
      Boolean: (set) => Set.jet.isFull(set),
      Object: (set) => defs_default.merge(set),
      Promise: async (set) => set
    }
  });
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
    dots: "\u2800\u2801\u2802\u2803\u2804\u2805\u2806\u2807\u2808\u2809\u280A\u280B\u280C\u280D\u280E\u280F\u2810\u2811\u2812\u2813\u2814\u2815\u2816\u2817\u2818\u2819\u281A\u281B\u281C\u281D\u281E\u281F\u2820\u2821\u2822\u2823\u2824\u2825\u2826\u2827\u2828\u2829\u282A\u282B\u282C\u282D\u282E\u282F\u2830\u2831\u2832\u2833\u2834\u2835\u2836\u2837\u2838\u2839\u283A\u283B\u283C\u283D\u283E\u283F\u2840\u2841\u2842\u2843\u2844\u2845\u2846\u2847\u2848\u2849\u284A\u284B\u284C\u284D\u284E\u284F\u2850\u2851\u2852\u2853\u2854\u2855\u2856\u2857\u2858\u2859\u285A\u285B\u285C\u285D\u285E\u285F\u2860\u2861\u2862\u2863\u2864\u2865\u2866\u2867\u2868\u2869\u286A\u286B\u286C\u286D\u286E\u286F\u2870\u2871\u2872\u2873\u2874\u2875\u2876\u2877\u2878\u2879\u287A\u287B\u287C\u287D\u287E\u287F\u2880\u2881\u2882\u2883\u2884\u2885\u2886\u2887\u2888\u2889\u288A\u288B\u288C\u288D\u288E\u288F\u2890\u2891\u2892\u2893\u2894\u2895\u2896\u2897\u2898\u2899\u289A\u289B\u289C\u289D\u289E\u289F\u28A0\u28A1\u28A2\u28A3\u28A4\u28A5\u28A6\u28A7\u28A8\u28A9\u28AA\u28AB\u28AC\u28AD\u28AE\u28AF\u28B0\u28B1\u28B2\u28B3\u28B4\u28B5\u28B6\u28B7\u28B8\u28B9\u28BA\u28BB\u28BC\u28BD\u28BE\u28BF\u28C0\u28C1\u28C2\u28C3\u28C4\u28C5\u28C6\u28C7\u28C8\u28C9\u28CA\u28CB\u28CC\u28CD\u28CE\u28CF\u28D0\u28D1\u28D2\u28D3\u28D4\u28D5\u28D6\u28D7\u28D8\u28D9\u28DA\u28DB\u28DC\u28DD\u28DE\u28DF\u28E0\u28E1\u28E2\u28E3\u28E4\u28E5\u28E6\u28E7\u28E8\u28E9\u28EA\u28EB\u28EC\u28ED\u28EE\u28EF\u28F0\u28F1\u28F2\u28F3\u28F4\u28F5\u28F6\u28F7\u28F8\u28F9\u28FA\u28FB\u28FC\u28FD\u28FE\u28FF"
  };
  var deloneMap = {
    to: "aaccdeeillnooorstuuuyrzzAACCDEEILLNOOORSTUUUYRZZ",
    from: "\xE1\xE4\u010D\u0107\u010F\xE9\u011B\xED\u013A\u013E\u0148\xF3\xF4\xF6\u0155\u0161\u0165\xFA\u016F\xFC\xFD\u0159\u017E\u017A\xC1\xC4\u010C\u0106\u010E\xC9\u011A\xCD\u0139\u013D\u0147\xD3\xD4\xD6\u0154\u0160\u0164\xDA\u016E\xDC\xDD\u0158\u017D\u0179"
  };
  var fight = (str1, str2) => {
    str1 = str1 == null ? "" : String(str1), str2 = str2 == null ? "" : String(str2);
    for (let i = 0; true; i++) {
      const s1 = str1[i], s2 = str2[i];
      if (!s1 || !s2) {
        return !s1;
      } else if (s1 === s2) {
        continue;
      }
      const d1 = String.jet.delone(s1), d2 = String.jet.delone(s2);
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
  defs_default.define("String", String, {
    create: (any) => any == null ? "" : String(any),
    rnd: (min, max, sqr) => {
      const c = ["bcdfghjklmnpqrstvwxz", "aeiouy"], p = c[0].length / (c[0].length + c[1].length);
      const l = Number.jet.rnd(Math.max(min, 2), max, sqr);
      let s = Boolean.jet.rnd(p), r = "";
      while (r.length < l) {
        r += defs_default.getRND(c[+(s = !s)]);
      }
      return r;
    },
    to: {
      Function: (str) => (_) => str,
      Boolean: (str) => !["0", "false", "null", "undefined", "NaN"].includes(str.toLowerCase()),
      Array: (str, comma) => str ? str.split(comma) : [],
      Object: (str) => defs_default.json.from(str),
      Promise: async (str) => str,
      Number: (str, strict) => {
        if (!str) {
          return 0;
        } else if (strict) {
          return Number(str);
        }
        const match = String(str).replace(/\u00A0/g, " ").match(RegExp.jet.lib.number);
        if (!match || !match[0]) {
          return 0;
        }
        return Number(match[0].replaceAll(" ", "").replace(",", ".")) || 0;
      }
    },
    extend: {
      isNumeric: (str) => !isNaN(Number(str)),
      lower: (str) => str.toLowerCase(),
      upper: (str) => str.toUpperCase(),
      capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
      camelCase: (str) => str.replace(/[^a-zA-Z0-9]+/g, " ").trim().split(" ").map((s, i) => i ? String.jet.capitalize(s) : s).join(""),
      pascalCase: (str) => str.replace(/[^a-zA-Z0-9]+/g, " ").trim().split(" ").map((s) => String.jet.capitalize(s)).join(""),
      snakeCase: (str) => str.replace(/[^a-zA-Z0-9]+/g, " ").trim().replaceAll(" ", "_"),
      delone: (str) => {
        let r = "";
        for (let v of str) {
          let x = deloneMap.from.indexOf(v);
          r += x >= 0 ? deloneMap.to[x] : v;
        }
        return r;
      },
      efface: (str, remove) => str.replaceAll(remove, "").replace(/[\s\n\r]+/g, " ").trim(),
      simplify: (str, remove) => String.jet.delone(String.jet.efface(str, remove)).toLowerCase(),
      fight: (str1, str2, asc = true) => fight(str1, str2) === asc ? str1 : str2,
      carret: (str, pos) => Number.jet.frame(Number.jet.tap(pos, str.length), 0, str.length),
      quote: (str, quoteLeft = "'", quoteRight = "'") => str ? quoteLeft + str + quoteRight : "",
      splice: (str, index, howmany, ...strs) => {
        const s = String.jet.carret(str, index), m = Number.jet.frame(howmany, 0, str.length - s);
        return str.slice(0, s) + String.jet.to(strs, "") + str.slice(s + m);
      },
      hide: (str, pat, whitespace) => {
        if (!str) {
          return str;
        }
        var r = "", s = str, p = hidePats[pat] || pat || "\u2022", w = whitespace === false;
        for (var i = 0; i < str.length; i++) {
          r += w && (s[i] === "\n" || s[i] === " ") ? s[i] : p.length - 1 ? defs_default.getRND(p) : p;
        }
        return r;
      },
      bite: (str, separator) => {
        const x = str.indexOf(separator);
        return x <= 0 ? ["", str] : [str.slice(0, x), str.slice(x + separator.length)];
      },
      levenshtein: (s0, s1, blend) => {
        var s = blend === false ? [s0, s1] : [String.jet.simplify(s0, blend), String.jet.simplify(s1, blend)];
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
        for (var i = 0; i <= l[0]; i++) {
          var oV = i;
          for (var j = 0; j <= l[1]; j++) {
            if (i === 0) {
              c[j] = j;
            } else if (j > 0) {
              var nV = c[j - 1];
              if (s[0].charAt(i - 1) !== s[1].charAt(j - 1)) {
                nV = Math.min(Math.min(nV, oV), c[j]) + 1;
              }
              c[j - 1] = oV;
              oV = nV;
            }
          }
          if (i > 0) {
            c[l[1]] = oV;
          }
        }
        return (l[0] - c[l[1]]) / parseFloat(l[0]);
      },
      mutate: (str, factor) => {
        var r = [], n = str.length / 2, m = str.length * 2, f = Math.abs(1e3 * (factor || 1));
        while (r.length < f) {
          var s = String.jet.rnd(n, m);
          r.push([s, String.jet.levenshtein(s, str)]);
        }
        return r.sort((a, b) => b[1] - a[1])[0][0];
      }
    }
  });
  var to2 = (sym) => String(sym).slice(7, -1);
  defs_default.define("Symbol", Symbol, {
    create: Symbol,
    copy: (x) => Symbol(to2(x)),
    rnd: (...a) => Symbol(defs_default.rnd.String(...a)),
    to: {
      Function: (sym) => (_) => sym
    }
  });
  defs_default.define("WeakMap", WeakMap, {
    copy: (x) => /* @__PURE__ */ new WeakMap(),
    get: (x, k) => x.get(k),
    set: (x, k, v) => x.set(k, v),
    rem: (x, k) => x.delete(k),
    to: {
      Function: (map2) => (_) => map2
    }
  });
  var src_default = defs_default;

  // dist/chunk-ANX6F3ON.js
  var breachSelector = (selector, onOne, onMany) => {
    let alias, path;
    const isArray = Array.isArray(selector);
    if (!isArray) {
      [path, selector] = String.jet.bite(selector, ".");
    }
    if (path) {
      [alias, path] = String.jet.bite(path, ":");
    } else if (!isArray && !selector.includes(",")) {
      [alias, selector] = String.jet.bite(selector, ":");
    } else {
      return onMany(isArray ? selector : selector.split(","));
    }
    return onOne(alias, path, selector);
  };
  var { solid: solid2, cached: cached2 } = src_default.prop;
  var vault = /* @__PURE__ */ new WeakMap();
  var eventsWhen = ["before", "after"];
  var events = cached2.all({}, {}, {
    primitive: (_) => [].concat(
      ...eventsWhen.map((w) => ["set", "update", "remove"].map((c) => [w, c, w + String.jet.capitalize(c)]))
    ),
    extra: (_) => [].concat(
      ...eventsWhen.map((w) => ["change", "save"].map((c) => [w, c, w + String.jet.capitalize(c)]))
    )
  });
  var formatKey = (key, def) => key != null ? String(key) : def;
  var numberPositive = (num, def = 0) => num == null ? def : Math.max(0, Number.jet.to(num));
  var functionOrNull = (val) => val == null ? void 0 : Function.jet.to(val);
  var fcePass = (v) => v;
  var fceTrue = (_) => true;
  var { solid: solid22, cached: cached22, virtual: virtual2 } = src_default.prop;

  // node_modules/@randajan/jet-core/dist/each/eachSync.js
  init_define_slib_info();

  // node_modules/@randajan/jet-core/dist/chunk-VW6NT76J.js
  init_define_slib_info();
  var enumerable4 = true;
  var initContext = (value2, { root, stopable, init }) => {
    let path, def, brk, onStop;
    const ctx = Object.defineProperties({}, {
      isRoot: { enumerable: enumerable4, value: true },
      root: { get: (_) => ctx },
      value: { enumerable: enumerable4, value: value2 },
      depth: { enumerable: enumerable4, value: !root ? 0 : root.length },
      pending: { enumerable: enumerable4, get: (_) => !brk },
      path: { enumerable: enumerable4, get: (_) => path != null ? path : path = src_default.dot.toString(root) },
      fullpath: { enumerable: enumerable4, get: (_) => ctx.path },
      def: { enumerable: enumerable4, get: (_) => def || (def = getDefByInst(value2)) }
    });
    ctx.result = init;
    return !stopable ? ctx : Object.defineProperties(ctx, {
      stop: { value: (_) => {
        if (brk) {
          return false;
        }
        brk = true;
        if (onStop) {
          for (const f of onStop) {
            f(ctx);
          }
        }
        return true;
      } },
      onStop: { value: (cb) => {
        if (!onStop) {
          onStop = [cb];
        } else {
          onStop.push(cb);
        }
      } }
    });
  };
  var createContext = (parent, key, value2) => {
    let def, fullpath;
    const ctx = Object.defineProperties({}, {
      isRoot: { enumerable: enumerable4, value: false },
      root: { value: parent.root },
      parent: { value: parent },
      key: { enumerable: enumerable4, get: (_) => key, set: (k) => {
        key = k;
        fullpath = void 0;
      } },
      value: { enumerable: enumerable4, get: (_) => value2, set: (v) => {
        value2 = v;
        def = void 0;
      } },
      depth: { enumerable: enumerable4, value: parent.depth + 1 },
      pending: { enumerable: enumerable4, get: (_) => parent.pending },
      stop: { enumerable: enumerable4, value: parent.stop },
      path: { enumerable: enumerable4, get: (_) => parent.fullpath },
      fullpath: { enumerable: enumerable4, get: (_) => fullpath || (fullpath = src_default.dot.glue(ctx.path, src_default.dot.escape(key))) },
      def: { enumerable: enumerable4, get: (_) => def || (def = getDefByInst(value2)) },
      update: { enumerable: enumerable4, value: (...a) => {
        if (a.length > 0) {
          ctx.value = a[0];
        }
        if (a.length > 1) {
          ctx.key = a[1];
        }
        return ctx;
      } }
    });
    return ctx;
  };
  var fight2 = (a, b) => {
    if (a == b) {
      return;
    }
    if (a == null) {
      return true;
    } else if (b == null) {
      return false;
    }
    if (typeof a === "string" || typeof b === "string") {
      return a === String.jet.fight(a, b);
    }
    if (isNaN(a)) {
      return true;
    } else if (isNaN(b)) {
      return false;
    }
    return a < b;
  };
  var formatOrderBy = (orderBy) => {
    if (!Array.isArray(orderBy)) {
      return [[orderBy, true]];
    }
    const obs = [];
    for (let i = 0; i < orderBy.length; i++) {
      const ob = orderBy[i];
      if (Array.isArray(ob)) {
        obs.push(ob);
        continue;
      }
      if (!src_default.isRunnable(ob)) {
        continue;
      }
      const asc = typeof orderBy[i + 1] === "boolean" ? orderBy[i = i + 1] : true;
      obs.push([ob, asc]);
    }
    return obs;
  };

  // node_modules/@randajan/jet-core/dist/each/eachSync.js
  var _filter = (entries, fce) => {
    const res = [];
    entries.forEach((en) => {
      if (fce(en[1], en[0])) {
        res.push(en);
      }
    });
    return;
  };
  var _refine = (entries, { filter: filter2, orderBy }) => {
    if (!filter2 && !orderBy) {
      return entries;
    }
    entries = filter2 ? _filter(entries, filter2) : [...entries];
    if (!orderBy) {
      return entries;
    }
    const obs = formatOrderBy(orderBy);
    const expand = entries.map(([key, value2]) => [key, value2, obs.map((ob) => ob[0](value2, key))]);
    return expand.sort(([aK, aV, aO], [bK, bV, bO]) => {
      for (const k in obs) {
        const dir = fight2(aO[k], bO[k]);
        if (dir == null) {
          continue;
        }
        const asc = obs[k][1];
        return (asc == null ? !dir : dir != asc) * 2 - 1;
      }
      return 0;
    });
  };
  var _eachSerial = (parent, exe, options) => {
    const entries = parent.def.entries(parent.value);
    const refined = !parent.isRoot ? entries : _refine(entries, options);
    for (let [key, val] of refined) {
      const ctx = createContext(parent, key, val);
      if (ctx.pending) {
        exe(ctx);
      }
      if (!ctx.pending) {
        break;
      }
    }
    ;
  };
  var each2 = (any, fce, options = {}) => {
    if (!src_default.isRunnable(fce)) {
      throw new Error(`fce expect an Function`);
    }
    const root = initContext(any, options);
    const deep = options.deep;
    const dprun = src_default.isRunnable(deep);
    const _each = _eachSerial;
    const exe = (ctx, skipDeep = false) => {
      const de = ctx.def?.entries;
      if (!de || !deep && !ctx.isRoot) {
        fce(ctx.value, ctx);
      } else if (dprun && !skipDeep) {
        deep(ctx.value, ctx, (...a) => {
          exe(ctx.update(...a), true);
        });
      } else {
        _each(ctx, exe, options);
      }
      return ctx.result;
    };
    return exe(root, true);
  };
  var find = (any, fce, options = {}) => {
    options.stopable = true;
    return each2(any, (val, ctx) => {
      val = fce(val, ctx);
      if (val !== void 0 && ctx.pending) {
        ctx.root.result = val;
        ctx.stop();
      }
    }, options);
  };
  var list = (any, fce, options = {}) => {
    if (!Array.isArray(options.init)) {
      options.init = [];
    }
    return each2(any, (val, ctx) => {
      val = fce(val, ctx);
      if (val !== void 0 && ctx.pending) {
        ctx.root.result.push(val);
      }
    }, options);
  };
  var map = (any, fce, options = {}) => {
    delete options.init;
    const set = (ctx, key, val) => {
      if (!ctx) {
        return;
      }
      if (!ctx.result) {
        set(ctx.parent, ctx.key, ctx.result = ctx.def.create());
      }
      if (!options.strictArray && ctx.def.name === "Array") {
        ctx.result.push(val);
      } else {
        ctx.def.set(ctx.result, key, val);
      }
    };
    return each2(any, (val, ctx) => {
      val = fce(val, ctx);
      if (val !== void 0 && ctx.pending) {
        set(ctx.parent, ctx.key, val);
      }
    }, options);
  };

  // node_modules/@randajan/props/dist/index.js
  init_define_slib_info();
  var solid3 = (obj, name, value2, enumerable5 = true, configurable = false) => {
    return Object.defineProperty(obj, name, { enumerable: enumerable5, value: value2, configurable });
  };
  var solids = (obj, namedValues, enumerable5 = true, configurable = false) => {
    for (const name in namedValues) {
      const value2 = namedValues[name];
      solid3(obj, name, value2, enumerable5, configurable);
    }
    return obj;
  };
  var virtual3 = (obj, name, get, enumerable5 = true, configurable = false) => {
    return Object.defineProperty(obj, name, { enumerable: enumerable5, get, configurable });
  };
  var virtuals = (obj, namedGets, enumerable5 = true, configurable = false) => {
    for (const name in namedGets) {
      const get = namedGets[name];
      virtual3(obj, name, get, enumerable5, configurable);
    }
    return obj;
  };
  var safe2 = (obj, priv, name, set, get, enumerable5 = true, configurable = false) => {
    return Object.defineProperty(obj, name, {
      set: set ? (v) => priv[name] = set(v, priv[name], name) : void 0,
      get: get ? (_) => get(priv[name], name) : (_) => priv[name],
      enumerable: enumerable5,
      configurable
    });
  };
  var cached3 = (obj, priv, name, reset, get, enumerable5 = true, configurable = false) => {
    const setAndGet = (v) => {
      if (!priv.hasOwnProperty(name)) {
        v = priv[name] = reset(name);
      }
      return get ? get(v, name) : v;
    };
    return safe2(obj, priv, name, null, setAndGet, enumerable5, configurable);
  };
  var cacheds = (obj, priv, namedResetsAndGets, enumerable5 = true) => {
    for (const name in namedResetsAndGets) {
      const resetGet = namedResetsAndGets[name];
      let reset, get;
      if (typeof resetGet !== "object") {
        reset = resetGet;
      } else {
        reset = resetGet.reset || resetGet[0];
        get = resetGet.get || resetGet[1];
      }
      cached3(obj, priv, name, reset, get, enumerable5);
    }
    return obj;
  };

  // node_modules/@randajan/function-parser/dist/index.js
  init_define_slib_info();
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
  var split2 = (fstr) => {
    fstr = fstr.trim().replace(/\s+/g, " ");
    return fstr.startsWith("function") ? splitCommon(fstr) : splitArrow(fstr);
  };
  var argRegExp = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
  var parseArgs = (args) => {
    if (args == null) {
      throw Error("Parsing arguments - missing");
    }
    args = unbracket(args.trim());
    let result = [];
    if (args) {
      for (let a of args.split(",")) {
        a = a.trim();
        if (!argRegExp.test(a)) {
          throw Error("Parsing arguments - malformatted");
        }
        result.push(a);
      }
    }
    return result;
  };
  var fnToStr = (fn) => {
    const t = typeof fn;
    if (t !== "function") {
      throw Error("Stringify function - not a function");
    }
    const f = split2(fn.toString());
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
  var fromStr = (str) => {
    const f = split2(str);
    return new Function(parseArgs(f[0]), f[1]);
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
    } else if (type === "object") {
      try {
        body = `(${JSON.stringify(any)})`;
      } catch (e) {
        throw Error("Creating function - object replication failed");
      }
    }
    if (!body) {
      throw Error("Creating function - unknown input");
    }
    return new Function(`return ${body}`);
  };
  var anyToFn = (any) => {
    const type = typeof any;
    return type !== "string" || any.startsWith("'") ? fromAny(any, type) : fromStr(any);
  };

  // dist/index.js
  var import_regex_parser = __toESM(require_lib(), 1);
  var remap = (arr, onItem, byKey = false) => {
    const rk = byKey ? {} : null;
    const rl = arr.map((item) => onItem(item, rk));
    return rk || rl;
  };
  var evaluate = (base, selector, opt, to3, forceAlias) => {
    if (!base?.get) {
      return;
    }
    const { byKey, throwError: throwError2 } = opt;
    return breachSelector(
      selector,
      (alias, path, selector2) => {
        let res;
        if (!path) {
          res = base.get(selector2, throwError2 !== false);
        } else if (path !== "*") {
          const ref = base.get(path, throwError2 !== false);
          if (!ref?.eval) {
            return;
          }
          res = ref.eval(selector2, opt);
        } else {
          if (!base.getList) {
            return;
          }
          const arr = base.getList();
          return remap(arr, (item, rk) => {
            const r = item?.eval(selector2, opt);
            return rk ? rk[item] = r : r;
          }, byKey);
        }
        if (!byKey) {
          return res;
        }
        const key = forceAlias || alias || path || selector2;
        if (!to3) {
          return { [key]: res };
        }
        if (to3.hasOwnProperty(key)) {
          throw Error(`selector collision at ${key}, please use alias`);
        }
        to3[key] = res;
        return to3;
      },
      (arr) => remap(arr, (item, rk) => evaluate(base, item, opt, to3 || rk), byKey)
    );
  };
  var { solid: solid4, virtual: virtual4 } = src_default.prop;
  var Bundle = class {
    constructor(parentName, name, childName, getContext, def) {
      name = formatKey(name, "Bundle");
      solid4.all(this, {
        name,
        fullName: parentName && name ? parentName + "." + name : parentName ? parentName : name ? name : "",
        childName: formatKey(childName, "key"),
        data: {},
        handlers: {},
        getContext: src_default.isRunnable(getContext) ? getContext : (_2) => null,
        def: formatKey(def, "undefined")
      });
      if (!this.name) {
        throw Error(this.msg("critical error - missing name"));
      }
    }
    msg(text, key, context) {
      const { fullName, childName, def } = this;
      key = formatKey(key);
      context = formatKey(context, def);
      let msg2 = fullName || "";
      if (context !== def) {
        msg2 += ` context('${context}')`;
      }
      if (key) {
        msg2 += ` ${childName}('${key}')`;
      }
      if (text) {
        msg2 += " " + text;
      }
      return msg2.trim();
    }
    getData(context, throwError2 = true, autoCreate = false) {
      const { data, def } = this;
      context = formatKey(context, def);
      if (data[context]) {
        return data[context];
      }
      if (autoCreate || context === def) {
        return data[context] = { context, index: {}, list: [] };
      }
      if (throwError2) {
        throw Error(this.msg(`not found`, void 0, context));
      }
      return { context, index: {}, list: [] };
    }
    validateKey(key, action = "validateKey", throwError2 = true) {
      if (key = key = formatKey(key)) {
        return key;
      }
      if (throwError2) {
        throw Error(this.msg(`${action}(...) failed - key undefined`));
      }
    }
    on(event, callback, opt = {}) {
      if (!src_default.isRunnable(callback)) {
        throw Error(this.msg(`on(...) require callback`));
      }
      const { once, bufferMs, maxQueueMs, maxQueueSize } = opt;
      const { handlers } = this;
      const list2 = handlers[event] || (handlers[event] = []);
      let remove;
      let cb = once ? (...args) => {
        callback(...args);
        remove();
      } : callback;
      cb = bufferMs ? src_default.buffer(cb, bufferMs, maxQueueMs, maxQueueSize) : cb;
      if (event.startsWith("before")) {
        list2.push(cb);
      } else {
        list2.unshift(cb);
      }
      return remove = (_2) => {
        const id = list2.indexOf(cb);
        if (id >= 0) {
          list2.splice(id, 1);
        }
        return callback;
      };
    }
    run(event, args = [], opt = {}) {
      const throwError2 = opt.throwError !== false;
      const handlers = this.handlers[event];
      if (!handlers?.length) {
        return true;
      }
      const isBefore = event.startsWith("before");
      for (let i = handlers.length - 1; i >= 0; i--) {
        const cb = handlers[i];
        if (!cb) {
          continue;
        }
        try {
          cb(...args, opt);
        } catch (err) {
          if (isBefore && throwError2) {
            throw err;
          } else if (isBefore) {
            return false;
          } else if (throwError2) {
            console.warn(this.msg(err?.message || "unknown error"), err?.stack);
          }
        }
      }
      return true;
    }
    reset(throwError2 = true) {
      const opt = { throwError: throwError2 };
      if (!this.run("beforeReset", [], opt)) {
        return false;
      }
      for (let i in this.data) {
        delete this.data[i];
      }
      return this.run("afterReset", [], opt);
    }
    _set(context, key, child, opt = {}, afterEffect) {
      const { context: ctx, index, list: list2 } = this.getData(context, opt.throwError, true);
      if (index.hasOwnProperty(key)) {
        if (opt.throwError !== false) {
          throw Error(this.msg(`set(...) failed - duplicate`, key, ctx));
        }
        return false;
      }
      if (!this.run("beforeSet", [child, ctx], opt)) {
        return false;
      }
      list2.push(index[key] = child);
      if (afterEffect) {
        afterEffect(child, ctx, opt);
      }
      return this.run("afterSet", [child, ctx], opt);
    }
    set(child, opt = {}, afterEffect) {
      const context = this.getContext(child, true);
      const key = this.validateKey(child.getKey(true), "set", opt.throwError);
      if (!Array.isArray(context)) {
        return this._set(context, key, child, opt, afterEffect);
      }
      let ok = true;
      for (const ctx of context) {
        ok = this._set(ctx, key, child, opt, afterEffect) && ok;
      }
      return ok;
    }
    _remove(context, key, child, opt = {}, afterEffect) {
      const { context: ctx, index, list: list2 } = this.getData(context, opt.throwError);
      const id = list2.indexOf(child);
      if (id < 0) {
        if (opt.throwError !== false) {
          throw Error(this.msg(`remove(...) failed - missing`, key, ctx));
        }
        return false;
      }
      if (!this.run("beforeRemove", [child, ctx], opt)) {
        return false;
      }
      if (list2.length === 1) {
        delete this.data[ctx];
      } else {
        list2.splice(id, 1);
        delete index[key];
      }
      if (afterEffect) {
        afterEffect(child, ctx, opt);
      }
      return this.run("afterRemove", [child, ctx], opt);
    }
    remove(child, opt = {}, afterEffect) {
      const context = this.getContext(child, false);
      const key = this.validateKey(child.getKey(false), "remove", opt.throwError);
      if (!Array.isArray(context)) {
        return this._remove(context, key, child, opt, afterEffect);
      }
      let ok = true;
      for (const ctx of context) {
        ok = this._remove(ctx, key, child, opt, afterEffect) && ok;
      }
      return ok;
    }
    exist(key, context, throwError2 = false) {
      const { context: ctx, index } = this.getData(context, throwError2);
      key = this.validateKey(key, "exist", throwError2);
      if (index.hasOwnProperty(key)) {
        return true;
      }
      if (throwError2) {
        throw Error(this.msg(`exist failed - not exist`, key, ctx));
      }
      return false;
    }
    get(key, context, throwError2 = true) {
      const { context: ctx, index } = this.getData(context, throwError2);
      key = this.validateKey(key, "get", throwError2);
      const child = index[key];
      if (child) {
        return child;
      }
      if (throwError2) {
        throw Error(this.msg(`get failed - not exist`, key, ctx));
      }
    }
    map(callback, opt = {}) {
      const { context, throwError: throwError2, filter: filter2, orderBy, stopable, byKey } = opt;
      const { list: list2, index } = this.getData(context, throwError2);
      const optPass = { filter: filter2, orderBy, stopable };
      return byKey ? map(index, callback, optPass) : list(list2, callback, optPass);
    }
    find(checker, opt = {}) {
      const { context, throwError: throwError2, filter: filter2, orderBy, stopable } = opt;
      const { list: list2 } = this.getData(context, throwError2);
      return find(list2, checker, { filter: filter2, orderBy, stopable });
    }
  };
  var Transactions = class {
    constructor(onError) {
      this.ticks = 0;
      this.state = "ready";
      this.queue = [];
      this.onError = src_default.isRunnable(onError) ? onError : () => {
      };
    }
    execute(name, execution, opt = { stopOnError: false, throwError: true }) {
      const exe = (last) => {
        try {
          last;
        } catch (e) {
        }
        if (this.queue[0] === exe) {
          return false;
        } else {
          this.queue.shift();
        }
        let isErr = this.state === "error";
        let err = this.error;
        if (!isErr) {
          this.state = name;
          try {
            execution(this.ticks++);
          } catch (e) {
            isErr = true;
            err = e;
          }
          this.state = isErr || opt.stopOnError === false ? "ready" : "error";
          if (this.state === "error") {
            this.onError(this.error = err);
          }
        }
        if (isErr && opt.throwError !== false) {
          throw err;
        }
        return !isErr;
      };
      return this.last = exe(this.last);
    }
    reset() {
      this.state = "ready";
      this.queue = [];
    }
  };
  var { solid: solid23, virtual: virtual22 } = src_default.prop;
  var Chop = class extends src_default.types.Plex {
    constructor(name, config = {}) {
      const { stream, loader: loader2, parent, childName, getContext, defaultContext, maxAge, maxAgeError, extra } = Object.jet.to(config);
      super((...args) => this.get(...args));
      const _p = {
        isLoaded: false,
        loader: loader2,
        stream: src_default.isRunnable(stream) ? stream : (_2) => stream,
        transactions: new Transactions((_2) => {
          if (!this.maxAgeError) {
            return;
          }
          clearTimeout(_p.intError);
          _p.intError = setTimeout((_3) => this.reset(), this.maxAgeError);
        }),
        bundle: new Bundle(
          parent?.name,
          name,
          childName,
          getContext,
          defaultContext
        ),
        subs: {}
      };
      vault.set(this, _p);
      solid23.all(this, {
        parent,
        maxAge: Math.max(0, Number.jet.to(maxAge)),
        maxAgeError: Math.max(0, Number.jet.to(maxAgeError)),
        extra: solid23.all({}, Object.jet.to(extra))
      }, false);
      virtual22.all(this, {
        state: (_2) => !_p.isLoaded && _p.transactions.state === "ready" ? "concept" : _p.transactions.state,
        name: (_2) => _p.bundle.name,
        fullName: (_2) => _p.bundle.fullName,
        childName: (_2) => _p.bundle.childName,
        isLoading: (_2) => _p.transactions.state === "loading"
      });
      _p.bundle.on("afterReset", (_2) => {
        clearTimeout(_p.intError);
        clearTimeout(_p.intAge);
        _p.isLoaded = false;
        _p.transactions.reset();
      });
      _p.bundle.on("afterLoad", (_2) => {
        if (this.maxAge) {
          clearTimeout(_p.intAge);
          _p.intAge = setTimeout((_3) => this.reset(), this.maxAge);
        }
      });
    }
    on(event, callback, opt = {}) {
      return vault.get(this).bundle.on(event, callback, opt);
    }
    msg(text, key, context) {
      return vault.get(this).bundle.msg(text, key, context);
    }
    exist(key, context, throwError2 = false) {
      this.untilLoaded();
      return vault.get(this).bundle.exist(key, context, throwError2);
    }
    get(key, context, throwError2 = true) {
      this.untilLoaded();
      return vault.get(this).bundle.get(key, context, throwError2);
    }
    eval(selector, opt = {}) {
      return evaluate(this, selector, opt);
    }
    count(context, throwError2 = false) {
      this.untilLoaded();
      return vault.get(this).bundle.getData(context, throwError2).list.length;
    }
    getList(context, throwError2 = false) {
      this.untilLoaded();
      return [...vault.get(this).bundle.getData(context, throwError2).list];
    }
    getIndex(context, throwError2 = false) {
      this.untilLoaded();
      return { ...vault.get(this).bundle.getData(context, throwError2).index };
    }
    getContextList() {
      this.untilLoaded();
      return Object.keys(vault.get(this).bundle.data);
    }
    map(callback, opt = {}) {
      this.untilLoaded();
      return vault.get(this).bundle.map(callback, opt);
    }
    find(checker, opt = {}) {
      this.untilLoaded();
      return vault.get(this).bundle.find(checker, opt);
    }
    reset(throwError2 = true) {
      return vault.get(this).bundle.reset(throwError2);
    }
    untilLoaded(throwError2 = true) {
      const _p = vault.get(this);
      if (_p.isLoaded) {
        return true;
      }
      const { state, last } = _p.transactions;
      if (state === "error") {
        return throwError2 ? last : false;
      }
      if (state === "loading") {
        return last;
      }
      return _p.transactions.execute("loading", (_2) => {
        if (_p.isLoaded) {
          return;
        }
        _p.bundle.run("beforeLoad", [this]);
        const data = _p.stream(this);
        _p.loader(this, _p.bundle, data);
        _p.isLoaded = true;
        _p.bundle.run("afterLoad", [this]);
      }, { stopOnError: false });
    }
    withUntilLoaded(execute) {
      return (...args) => {
        this.untilLoaded();
        return execute(...args);
      };
    }
    addChop(name, config = {}) {
      const subs = vault.get(this).subs;
      const { useCache, throwError: throwError2, getContext, defaultContext, loader: loader2, extra } = config;
      name = formatKey(name);
      if (useCache !== false && subs[name]) {
        if (throwError2 !== false) {
          throw Error(this.msg(`chop '${name}' allready exist`));
        }
        return subs[name];
      }
      const sub = new Chop(name, {
        parent: this,
        childName: this.childName,
        maxAge: 0,
        maxAgeError: this.maxAgeError,
        getContext,
        defaultContext,
        loader: (chop, bundle) => {
          this.map((child) => bundle.set(child));
          chop.on("afterReset", this.on("afterSet", (child) => bundle.set(child)), { once: true });
          chop.on("afterReset", this.on("afterRemove", (child) => bundle.remove(child)), { once: true });
          this.on("afterReset", (_2) => chop.reset(), { once: true });
          if (loader2) {
            loader2(chop, bundle);
          }
        },
        extra
      });
      return useCache !== false ? subs[name] = sub : sub;
    }
    getChop(name, throwError2 = true) {
      const subs = vault.get(this).subs;
      if (subs[name]) {
        return subs[name];
      }
      if (throwError2) {
        throw Error(this.msg(`chop '${name}' doesn't exist`));
      }
    }
  };
  var { solid: solid32, virtual: virtual32 } = src_default.prop;
  var Wrap = class extends src_default.types.Plex {
    static is(any) {
      return any instanceof Wrap;
    }
    static create(table, step) {
      return new Wrap(table, step);
    }
    constructor(table, step) {
      const { db, rows, cols } = table;
      const get = (col, throwError2 = true) => step.get(col, throwError2);
      super(get);
      solid32.all(this, {
        db,
        table,
        rows,
        get,
        getRaw: (col, throwError2 = true) => step.getRaw(col, throwError2),
        eval: (selector, opt = {}) => step.eval(selector, opt),
        getRaws: (filter2) => step.extract(true, filter2),
        getVals: (filter2) => step.extract(false, filter2)
      }, false);
      virtual32.all(this, {
        key: (_2) => step.key,
        label: (_2) => step.label,
        before: (_2) => step.before?.wrap,
        isExist: (_2) => step.isExist,
        isDirty: (_2) => step.isDirty,
        isRemoved: (_2) => step.isRemoved,
        raws: (_2) => ({ ...step.raws }),
        vals: (_2) => cols.map((col) => step.pull(col), { byKey: true }),
        changeList: (_2) => [...step.changeList],
        changes: (_2) => ({ ...step.changes })
      });
    }
    chopByRef(tableName, colName, filter2, cacheAs = true, morphSeparator = "$$") {
      const table = this.db.get(tableName);
      const chop = table.rows.chopByCol(colName, filter2, cacheAs, morphSeparator);
      if (chop.extra.isRef) {
        return chop;
      }
      throw Error(this.table.msg(`chopByRef table('${tableName}') column('${colName}') failed because column is not ref`));
    }
    refs(tableName, colName, filter2, cache2 = {}) {
      const chop = cache2.current || (cache2.current = this.chopByRef(tableName, colName, filter2, false));
      return chop.getList((chop.extra.isMorph ? this.table.name + chop.extra.morphSeparator : "") + this.key, false);
    }
    getKey() {
      return this.key;
    }
    toJSON() {
      return this.key || null;
    }
    toString() {
      return this.key || "";
    }
  };
  var { solid: solid42, virtual: virtual42 } = src_default.prop;
  var Step = class {
    static is(any) {
      return any instanceof Step;
    }
    static create(table, before) {
      return new Step(table, before);
    }
    constructor(table, before) {
      this.key = before?.key;
      let state = "ready";
      solid42.all(this, {
        db: table.db,
        table,
        wrap: Wrap.create(table, this),
        lock: (_2) => state !== "ready" ? false : (state = "locked") && true,
        unlock: (_2) => state !== "locked" ? false : (state = "ready") && true,
        retire: (_2) => {
          before = null;
          state = "retired";
        }
      }, false);
      virtual42.all(this, {
        before: (_2) => before,
        state: (_2) => state,
        label: (_2) => this.pull(table.cols.label),
        isExist: (_2) => !this.isRemoved && table.rows.exist(this.key),
        isDirty: (_2) => !!this.changeList.length || this.key !== before?.key || !this.isRemoved !== !before?.isRemoved
      });
      this.reset();
    }
    getKey() {
      return this.key;
    }
    pull(col) {
      if (!col) {
        return;
      }
      const { vals, raws, vStamp, vSolid, before, wrap } = this;
      const { isVirtual, init, resetIf, formula, isReadonly: isReadonly2, separator } = col;
      const cacheStamp = col.getCacheStamp();
      if (vals.hasOwnProperty(col) && (!isVirtual || vStamp[col] === cacheStamp)) {
        const cval = vals[col];
        return separator && cval ? [...cval] : cval;
      }
      let raw = raws[col];
      const self2 = (_2) => col.toVal(raw, wrap);
      if (!vSolid[col]) {
        vSolid[col] = !isVirtual;
        if (formula) {
          raw = formula(wrap);
        } else {
          const bew = before ? before.raws[col] : raw;
          if (raw !== bew && isReadonly2 && isReadonly2(wrap, self2)) {
            raw = bew;
          }
          if (!before ? init && raw == null : resetIf && resetIf(wrap, self2)) {
            raw = init ? init(wrap) : void 0;
          }
        }
      }
      const val = self2();
      if (cacheStamp) {
        vals[col] = val;
        vStamp[col] = cacheStamp;
      }
      if (!isVirtual || col.isPrimary) {
        raws[col] = col.toRaw(val);
      }
      return val;
    }
    push(vals, force = true) {
      if (this.state !== "ready") {
        return false;
      }
      const { table: { rows: { isLoading }, cols }, raws, before } = this;
      const reals = cols.virtuals.getList(false);
      const changeList2 = this.changeList = [];
      const changes = this.changes = {};
      this.vals = {};
      this.vStamp = {};
      this.vSolid = {};
      for (const col of reals) {
        this.vSolid[col] = isLoading;
        const raw = col.fetch(vals);
        if (raw !== void 0) {
          raws[col] = col.toRaw(raw);
        } else if (force) {
          delete raws[col];
        }
        if (isLoading) {
          changeList2.push(col);
          changes[col] = raws[col];
        }
      }
      if (!isLoading) {
        for (const col of reals) {
          this.pull(col);
          if (before && raws[col] !== before.raws[col]) {
            changeList2.push(col);
            changes[col] = raws[col];
          }
        }
        ;
      }
      this.key = this.pull(cols.primary);
      return !!changeList2.length;
    }
    get(col, throwError2 = true) {
      const { table: { cols } } = this;
      if (!Array.isArray(col)) {
        return this.pull(cols.get(col, throwError2 !== false));
      }
      let row;
      for (const c of col) {
        if (c === col[0]) {
          row = this.pull(cols.get(c, throwError2 !== false));
        } else if (row?.get) {
          row = row.get(c, throwError2);
        } else {
          return;
        }
      }
      return row;
    }
    getRaw(col, throwError2 = true) {
      const { table: { cols } } = this;
      if (this.raws.hasOwnProperty(col)) {
        return this.raws[col];
      }
      const c = cols(col, throwError2);
      if (c && c.isVirtual) {
        return c.toRaw(this.pull(c));
      }
    }
    eval(selector, opt = {}) {
      return evaluate(this, selector, opt);
    }
    extract(noVals, filter2) {
      const { table: { cols } } = this;
      return cols.map((c) => {
        if (filter2 && !filter2(c)) {
          return;
        }
        return !noVals ? this.pull(c) : !c.isVirtual ? this.raws[c] : c.toRaw(this.pull(c));
      }, { byKey: true });
    }
    remove() {
      if (this.state !== "ready") {
        return false;
      }
      return this.isRemoved = true;
    }
    reset() {
      if (this.state !== "ready") {
        return false;
      }
      const { before } = this;
      this.isRemoved = before?.isRemoved || false;
      this.raws = before ? { ...before.raws } : {};
      this.vals = before ? { ...before.vals } : {};
      this.vStamp = before ? { ...before.vStamp } : {};
      this.vSolid = before ? { ...before.vSolid } : {};
      this.changeList = [];
      this.changes = {};
      return true;
    }
  };
  var { solid: solid5, virtual: virtual5 } = src_default.prop;
  var Row = class extends src_default.types.Plex {
    static create(rows, onSave, iniStep) {
      return new Row(rows, onSave, iniStep);
    }
    constructor(rows, onSave, iniStep) {
      const { db, table } = rows;
      const _p = {};
      const get = (col, throwError2 = true) => _p.live.get(col, throwError2);
      const push = (vals, force, opt = { autoSave: true, resetOnError: true, throwError: true, silentSave: false }) => {
        return _p.live.push(vals, force) && (opt.autoSave === false || this.save(opt));
      };
      const markAsSaved = (_2) => {
        _p.live = Step.create(table, _p.saved = _p.live);
      };
      super(get);
      solid5.all(this, {
        db,
        table,
        rows,
        get,
        getRaw: (col, throwError2 = true) => _p.live.getRaw(col, throwError2),
        eval: (selector, opt = {}) => _p.live.eval(selector, opt),
        set: (vals, opt = { autoSave: true, resetOnError: true, throwError: true }) => push(vals, true, opt),
        update: (vals, opt = { autoSave: true, resetOnError: true, throwError: true }) => push(vals, false, opt),
        reset: (_2) => !this.isDirty || _p.live.reset(),
        remove: (opt = { autoSave: true, resetOnError: true, throwError: true }) => {
          return _p.live.remove() && (opt.autoSave === false || this.save(opt));
        },
        save: (opt = { resetOnError: true, throwError: true, silentSave: false }) => {
          if (!this.isDirty) {
            return true;
          }
          const live = _p.live;
          try {
            live.lock();
            onSave(this, { throwError: true, silentSave: opt.silentSave === true }, markAsSaved);
            live.retire();
            return true;
          } catch (err) {
            live.unlock();
            if (opt.resetOnError !== false) {
              this.reset();
            }
            if (opt.throwError !== false) {
              throw err;
            }
            console.warn(this.msg(err?.message || "unknown error"), err?.stack);
            return false;
          }
        }
      }, false);
      virtual5.all(this, {
        key: (_2) => _p.saved?.key,
        label: (_2) => _p.saved?.label,
        isRemoved: (_2) => !_p.saved || _p.saved.isRemoved,
        isExist: (_2) => !!_p.saved?.isExist,
        isDirty: (_2) => _p.live.isDirty,
        live: (_2) => _p.live.wrap,
        saved: (_2) => _p.saved?.wrap
      });
      _p.live = iniStep || Step.create(table);
    }
    msg(text) {
      return this.rows.msg(text, this.key || JSON.stringify(this.raws));
    }
    getKey(isSet) {
      return isSet ? this.live.key : this.key;
    }
    toJSON() {
      return this.key;
    }
    toString() {
      return this.key || "";
    }
  };
  var { solid: solid6 } = src_default.prop;
  var _scopes = ["global", "db", "table", "self"];
  var functionWithCacheOrNull = (trait, col) => {
    const selector = col.selector;
    const formula = functionOrNull(trait);
    if (!formula) {
      return selector ? (row) => row.eval(selector) : null;
    }
    const cache2 = {};
    if (!selector) {
      return (row) => formula(row, cache2);
    }
    return (row) => formula(row.eval(selector), row, cache2);
  };
  var colTo = map({
    boolean: { val: Boolean.jet.to },
    string: { val: (v, c) => String.jet.to(v).substr(0, c.max) },
    ref: { val: String, raw: (v) => v.key || v },
    number: { val: (v, c) => Number.jet.round(Number.jet.frame(Number.jet.to(v), c.min, c.max), c.dec) },
    datetime: { val: (v) => v == null ? new Date() : new Date(v) },
    duration: { val: (v) => Math.max(0, Math.round(Number.jet.to(v))) },
    object: { val: (v) => src_default.json.from(v) }
  }, (t) => t.raw ? t : { ...t, raw: t.val });
  var colTraits = {
    type: src_default.enumFactory(Object.keys(colTo), {
      before: (raw) => String.jet.simplify(String.jet.to(raw)),
      after: (output, col) => col.ref ? "ref" : output != null ? output : "string"
    }),
    isReadonly: functionOrNull,
    resetIf: functionOrNull,
    init: functionOrNull,
    selector: (val) => Array.isArray(val) || typeof val === "string" ? val : null,
    formula: functionWithCacheOrNull,
    ref: functionOrNull,
    display: (val, col) => numberPositive(val, col.db.displayDefault),
    separator: String.jet.to,
    isVirtual: Boolean.jet.to,
    isTrusted: Boolean.jet.to,
    isMorph: (val, col) => typeof col._ref === "function",
    dec: (val, col) => Math.round(numberPositive(val, col.db.decimalDefault)),
    min: (val) => val == null ? void 0 : Number.jet.to(val),
    max: (val) => val == null ? void 0 : Number.jet.to(val),
    noNull: Boolean.jet.to,
    extra: Object.jet.to,
    scope: (raw, col) => {
      if (!col.isVirtual) {
        return (_2) => "self";
      }
      if (typeof raw === "string") {
        raw = String.jet.simplify(String.jet.to(raw));
        return _scopes.includes(raw) ? (_2) => raw : (_2) => raw.split(",");
      }
      if (Array.isArray(raw)) {
        return (_2) => [...raw];
      }
      if (!col.selector) {
        return (_2) => "self";
      }
      let ready, pending;
      const tables = /* @__PURE__ */ new Set(), scopes = /* @__PURE__ */ new Set();
      return (_2) => {
        if (pending) {
          pending;
        } else if (!ready) {
          pending = collectDeps(col.cols, col.selector, tables, scopes);
          ready = true;
          pending = null;
        }
        if (scopes.has("global")) {
          return "global";
        }
        if (scopes.has("db")) {
          return "db";
        }
        if (!tables.size) {
          return "self";
        }
        return [...tables];
      };
    }
  };
  var collectDeps = (cols, selector, tables, scopes) => {
    if (!cols) {
      return;
    }
    if (scopes.has("global") || scopes.has("db")) {
      return;
    }
    breachSelector(
      selector,
      (alias, path, selector2) => {
        if (path === "*") {
          return;
        }
        const c = cols(path || selector2);
        const s = c.scope();
        if (!Array.isArray(s)) {
          scopes.add(s);
        } else {
          for (const t of s) {
            tables.add(t);
          }
        }
        if (!c._ref) {
          return;
        }
        if (c.isMorph) {
          scopes.add("db");
          return;
        }
        if (!path) {
          return;
        }
        tables.add(c._ref);
        const tbl = cols.db(c._ref);
        return collectDeps(tbl.cols, selector2, tables, scopes);
      },
      (arr) => arr.map((selector2) => collectDeps(cols, selector2, tables, scopes))
    );
  };
  var { solid: solid7, virtual: virtual6, cached: cached4 } = src_default.prop;
  var { solid: solid8, virtual: virtual7 } = src_default.prop;
  var { solid: solid9, virtual: virtual8 } = src_default.prop;
  var toRefId = (ref) => typeof ref !== "string" ? ref?.id : ref;
  var isNull = (v) => v == null || typeof v === "number" && isNaN(v);
  var isFce = (fce) => typeof fce === "function";
  var toFce = (fce, defReturn) => isFce(fce) ? fce : () => defReturn;
  var wrapFce = (wrap, what) => (...args) => wrap(what(...args));
  var toStr = (any, def) => isNull(any) ? def : String(any);
  var toArr = (any) => any instanceof Array ? any : [any];
  var reArray = (val, trait) => {
    const res = [];
    if (isNull(val)) {
      return res;
    }
    if (!Array.isArray(val)) {
      res.push(trait(val));
      return res;
    }
    for (const v of val) {
      const r = trait(v);
      if (!isNull(r)) {
        res.push(r);
      }
    }
    return res;
  };
  var join = (separator, ...vals) => {
    let s = "";
    for (let v of vals) {
      v = toStr(v);
      if (!v) {
        return;
      }
      s += (!s ? "" : separator) + v;
    }
    return s;
  };
  var prepareRecs = (chop, recsByGroupId, groupId, throwError2 = true, autoCreate = false) => {
    let recs = recsByGroupId.get(groupId);
    if (recs) {
      return recs;
    }
    if (autoCreate) {
      recsByGroupId.set(groupId, recs = /* @__PURE__ */ new Map());
    } else if (throwError2) {
      throw Error(chop.msg(`not found`, { group: groupId }));
    }
    return recs;
  };
  var deleteRec = (chop, recsByGroupId, groupId, rec) => {
    const recs = prepareRecs(chop, recsByGroupId, groupId, true, false);
    if (!recs?.has(rec.id)) {
      throw Error(chop.msg(`delete(...) critical error - inconsistency`, { group: groupId, row: rec.id }));
    }
    if (recs.size <= 1) {
      recsByGroupId.delete(groupId);
    } else {
      recs.delete(rec.id);
    }
  };
  var setRec = (chop, recsByGroupId, groupId, rec) => {
    const recs = prepareRecs(chop, recsByGroupId, groupId, false, true);
    const current = recs.get(rec.id);
    if (!current) {
      recs.set(rec.id, rec);
      return;
    }
    if (current === rec) {
      return;
    }
    throw Error(chop.msg(`add(...) failed - duplicate`, { group: groupId, row: rec.id }));
  };
  var getRec = (chop, groupId, recId, throwError2 = false) => {
    if (!recId) {
      if (throwError2) {
        throw Error(chop.msg(`get(...) failed - id undefined`, { group: groupId }));
      }
      return;
    }
    const { recsByGroupId } = vault.get(chop);
    const recs = prepareRecs(chop, recsByGroupId, groupId, throwError2, false);
    return recs?.get(recId);
  };
  var getRecs = (chop, groupId, throwError2 = false) => {
    const { recsByGroupId } = vault.get(chop);
    return prepareRecs(chop, recsByGroupId, groupId, throwError2, false);
  };
  var getAllRecs = (chop) => vault.get(chop).groupIdsByRec;
  var afterRemove = (chop, rec, ctx) => {
    const { isMultiGroup, recsByGroupId, groupIdsByRec, filter: filter2, handlers, childs, state } = vault.get(chop);
    const current = groupIdsByRec.get(rec);
    if (!current) {
      if (filter2(rec)) {
        throw Error(chop.msg(`remove(...) failed - missing`, { row: rec.id }));
      }
      return false;
    }
    if (isMultiGroup) {
      for (const groupId of current) {
        deleteRec(chop, recsByGroupId, groupId, rec);
      }
    } else {
      deleteRec(chop, recsByGroupId, current, rec);
    }
    groupIdsByRec.delete(rec);
    return runEvent(handlers, childs, state, "remove", rec, ctx);
  };
  var afterReset = (chop, ctx) => {
    const _p = vault.get(chop);
    const { recsByGroupId, groupIdsByRec, init, handlers, childs, state } = _p;
    groupIdsByRec.clear();
    recsByGroupId.clear();
    _p.state = "init";
    init(chop, ctx);
    _p.state = "reset";
    runEvent(handlers, childs, _p.state, "reset", void 0, ctx);
    _p.state = "ready";
    return true;
  };
  var afterUpdate = (chop, rec, ctx) => {
    const { isMultiGroup, recsByGroupId, groupIdsByRec, filter: filter2, handlers, childs, state } = vault.get(chop);
    const current = groupIdsByRec.get(rec);
    if (!current) {
      if (filter2(rec)) {
        throw Error(chop.msg(`update(...) failed - missing`, { row: rec.id }));
      }
      return false;
    }
    const valid = chop.getGroup(rec);
    if (isMultiGroup) {
      const results = /* @__PURE__ */ new Set();
      for (const groupId of valid) {
        if (results.has(groupId)) {
          continue;
        }
        results.add(groupId);
        if (current.has(groupId)) {
          current.delete(groupId);
          continue;
        }
        setRec(chop, recsByGroupId, groupId, rec);
      }
      for (const groupId of current) {
        deleteRec(chop, recsByGroupId, groupId, rec);
      }
      groupIdsByRec.set(rec, results);
    } else if (valid !== current) {
      setRec(chop, recsByGroupId, valid, rec);
      deleteRec(chop, recsByGroupId, current, rec);
      groupIdsByRec.set(rec, valid);
    }
    return runEvent(handlers, childs, state, "update", rec, ctx);
  };
  var runEvent = (handlers, childs, state, event, rec, ctx) => {
    if (state === "init") {
      return;
    }
    if (childs.size) {
      if (event === "reset") {
        for (const child of childs) {
          afterReset(child, ctx);
        }
      } else if (event === "add") {
        for (const child of childs) {
          afterAdd(child, rec, ctx);
        }
      } else if (event === "remove") {
        for (const child of childs) {
          afterRemove(child, rec, ctx);
        }
      } else if (event === "update") {
        for (const child of childs) {
          afterUpdate(child, rec, ctx);
        }
      }
    }
    if (handlers?.length) {
      for (let i = handlers.length - 1; i >= 0; i--) {
        try {
          if (handlers[i]) {
            handlers[i](event, rec, ctx);
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
    return true;
  };
  var onEvent = (chop, callback, onlyOnce = false) => {
    if (!isFce(callback)) {
      throw Error(chop.msg(`on(...) require callback`));
    }
    const { handlers } = vault.get(chop);
    let remove;
    const cb = onlyOnce ? (...args) => {
      callback(...args);
      remove();
    } : callback;
    handlers.unshift(cb);
    return remove = (_2) => {
      const x2 = handlers.indexOf(cb);
      if (x2 >= 0) {
        handlers.splice(x2, 1);
      }
      return callback;
    };
  };
  var afterAdd = (chop, rec, ctx) => {
    const { isMultiGroup, recsByGroupId, groupIdsByRec, filter: filter2, handlers, childs, state } = vault.get(chop);
    if (!filter2(rec)) {
      return false;
    }
    const valid = chop.getGroup(rec);
    if (isMultiGroup) {
      const results = /* @__PURE__ */ new Set();
      for (const groupId of valid) {
        if (results.has(groupId)) {
          continue;
        }
        setRec(chop, recsByGroupId, groupId, rec);
        results.add(groupId);
      }
      groupIdsByRec.set(rec, results);
    } else {
      setRec(chop, recsByGroupId, valid, rec);
      groupIdsByRec.set(rec, valid);
    }
    return runEvent(handlers, childs, state, "add", rec, ctx);
  };
  var saveFn = (any, col) => anyToFn(any);
  var exportFn = (any) => {
    return typeof any !== "function" ? any : fnToStr(any);
  };
  var Fail = class {
    constructor(severity, reason, details) {
      solids(this, { severity, reason, details });
    }
    setEnt(entId) {
      solid3(this, "ent", entId);
      return this;
    }
    setCol(colId) {
      solid3(this, "col", colId);
      return this;
    }
    setRow(rowId) {
      solid3(this, "row", rowId);
      return this;
    }
  };
  var Minor = class extends Fail {
    static fail(reason, details) {
      return new Minor(reason, details);
    }
    constructor(reason, details) {
      super("minor", reason, details);
    }
  };
  var Major = class extends Fail {
    static fail(reason, details) {
      return new Major(reason, details);
    }
    constructor(reason, details) {
      super("major", reason, details);
    }
  };
  var Critical = class extends Fail {
    static fail(reason, details) {
      return new Critical(reason, details);
    }
    constructor(reason, details) {
      super("critical", reason, details);
    }
  };
  var toFail = (err) => {
    if (err instanceof Fail) {
      return err;
    }
    if (err instanceof Error) {
      return Critical.fail(err.message, err.stack);
    }
    return Critical.fail("Unknown error", err);
  };
  var Chop2 = class {
    constructor(id, opt = {}, parent) {
      id = toStr(id);
      if (!id) {
        throw Major.fail("missing id");
      }
      const { init, group, autoReset = true, isMultiGroup = false } = opt;
      const filter2 = toFce(opt.filter, true);
      const _p = {
        state: "pending",
        handlers: [],
        childs: /* @__PURE__ */ new Set(),
        groupIdsByRec: /* @__PURE__ */ new Map(),
        // rec -> groupIds
        recsByGroupId: /* @__PURE__ */ new Map(),
        // groupId -> recs
        isMultiGroup,
        init: toFce(init),
        filter: parent ? (rec) => parent.getGroup(rec) === id && filter2(rec) : filter2
      };
      solids(this, {
        id,
        db: parent?.db || this,
        parent,
        getGroup: !isMultiGroup ? toFce(group) : wrapFce(toArr, toFce(group, [void 0])),
        isMultiGroup
      }, false);
      virtuals(this, {
        state: (_2) => _p.state,
        size: (_2) => _p.groupIdsByRec.size,
        childs: (_2) => [..._p.childs]
      });
      vault.set(this, _p);
      if (parent) {
        const _pp = vault.get(parent);
        _pp.childs.add(this);
        _p.init = (_2, ctx) => {
          for (const [rec] of _pp.groupIdsByRec) {
            afterAdd(this, rec, ctx);
          }
        };
      }
      if (autoReset) {
        this.reset();
      }
    }
    msg(text, details = {}) {
      let msg2 = this.id;
      for (let i in details) {
        msg2 += ` ${i}[${details[i]}]`;
      }
      if (text) {
        msg2 += " " + text;
      }
      return msg2.trim();
    }
    on(callback, onlyOnce = false) {
      return onEvent(this, callback, onlyOnce);
    }
    reset(ctx) {
      return afterReset(this, ctx);
    }
    get(groupId, recId, throwError2 = false) {
      return getRec(this, groupId, recId, throwError2);
    }
    getMap(groupId, throwError2 = false) {
      const recs = getRecs(this, groupId, throwError2);
      return recs ? new Map(recs) : /* @__PURE__ */ new Map();
    }
    getList(groupId, throwError2 = false) {
      const recs = getRecs(this, groupId, throwError2);
      return recs ? Array.from(recs.values()) : [];
    }
    getSize(groupId, throwError2 = false) {
      return getRecs(this, groupId, throwError2)?.size || 0;
    }
    map(callback) {
      const result = [];
      const recs = getAllRecs(this);
      for (const [rec] of recs) {
        const r = callback(rec);
        if (r !== void 0) {
          result.push(r);
        }
      }
      return result;
    }
    export(rec) {
      const res = {};
      for (const i in rec) {
        const v = rec[i];
        res[i] = Array.isArray(v) ? v.map(exportFn) : exportFn(v);
      }
      return res;
    }
    exportAll() {
      return this.map(this.export);
    }
    chop(id, opt = {}) {
      return new Chop2(id, opt, this);
    }
  };
  var saveRegExp = (any, col) => {
    if (any instanceof RegExp) {
      return any;
    }
    if (typeof any != "string") {
      throw Major.fail("not a regexp");
    }
    try {
      return (0, import_regex_parser.default)(any);
    } catch (err) {
      throw Major.fail("unparseable");
    }
  };
  var _bols = /^(0|n|no|not|off|false)$/i;
  var saveBol = (val, col) => typeof val !== "string" ? !!val : !_bols.test(val);
  var _nums = /-?(\d+(\s+\d+)*)*[,.]?\d+/;
  var strToNum = (str) => {
    const match = String(str).replace(/\u00A0/g, " ").match(_nums);
    if (!match || !match[0]) {
      return NaN;
    }
    const res = Number(match[0].replaceAll(" ", "").replace(",", "."));
    return res;
  };
  var saveNum = (num, col) => {
    const t = typeof num;
    if (t === "string") {
      num = strToNum(num);
    } else if (t !== "number") {
      num = Number(num);
    }
    const { name, min, max, dec } = col;
    if (isNaN(num)) {
      throw Major.fail("not a number");
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
  var saveStr = (str, col) => {
    str = isNull(str) ? "" : String(str);
    if (str === "[object Object]") {
      try {
        str = JSON.stringify(str);
      } catch (e) {
        throw Major.fail("unparseable");
      }
    }
    const { name, min, max } = col;
    if (min != null && str.length < min) {
      throw Major("too short", min);
    }
    if (max != null && str.length > max) {
      str = str.substr(0, max);
    }
    return str;
  };
  var saveObj = (obj, col) => {
    const t = typeof obj;
    if (t === "object") {
      return obj;
    }
    if (t !== "string") {
      throw Major.fail("unparseable");
    }
    try {
      return JSON.parse(obj);
    } catch (e) {
      throw Major.fail("unparseable");
    }
  };
  var saveDate = (date, col) => {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const { name, min, max } = col;
    let num = date.getTime();
    if (isNaN(num)) {
      throw Major.fail("not a date");
    }
    if (min == null && max == null) {
      return date;
    }
    if (max != null) {
      num = Math.min(num, max);
    }
    if (min != null) {
      num = Math.max(num, min);
    }
    return new Date(num);
  };
  var getter = fcePass;
  var setter = fcePass;
  var isRequired = fceTrue;
  var isReadonly = fceTrue;
  var metaSoft = Symbol("soft");
  var metaHard = Symbol("hard");
  var metaNumb = Symbol("numb");
  var metaToStr = (v) => v === metaNumb ? "numb" : v === metaHard ? "hard" : v === metaSoft ? "soft" : void 0;
  var isMetaEnt = (v) => v === "_ents" || v === "_types" || v === "_cols";
  var metaData = {
    "_ents": {
      "_ents": { meta: metaNumb },
      "_cols": { meta: metaNumb },
      "_types": { meta: metaNumb }
    },
    "_types": {
      "meta": { meta: metaNumb, setter: metaToStr, getter },
      "string": { meta: metaNumb, setter: saveStr, getter },
      "boolean": { meta: metaNumb, setter: saveBol, getter },
      "number": { meta: metaNumb, setter: saveNum, getter },
      "datetime": { meta: metaNumb, setter: saveDate, getter },
      "duration": { meta: metaNumb, setter: saveNum, getter },
      "function": { meta: metaNumb, setter: saveFn, getter },
      "regexp": { meta: metaNumb, setter: saveRegExp, getter },
      "object": { meta: metaNumb, setter: saveObj, getter },
      "ref": { meta: metaNumb, setter: toRefId, getter },
      "nref": { meta: metaNumb, setter, getter }
    },
    "_cols": {
      "_ents-meta": {
        meta: metaNumb,
        ent: "_ents",
        name: "meta",
        type: "meta",
        isReadonly
      },
      "_ents-cols": {
        meta: metaNumb,
        ent: "_ents",
        name: "cols",
        type: "ref",
        ref: "_cols",
        parent: "_cols-ent",
        isList: true,
        noCache: true,
        store: (c, db) => {
          const { ref, parent: { name, isList } } = c;
          return db.chop(ref.id, {
            group: (r) => r[name],
            isMultiGroup: isList
          });
        },
        formula: (r, b, s) => s.getList(r, false)
      },
      "_ents-size": {
        meta: metaNumb,
        ent: "_ents",
        name: "size",
        type: "number",
        noCache: true,
        store: (c, db) => db,
        formula: (r, b, s) => s.getSize(r.id, false)
      },
      //_types
      "_types-meta": {
        meta: metaNumb,
        ent: "_types",
        name: "meta",
        type: "meta",
        isReadonly
      },
      "_types-setter": {
        meta: metaNumb,
        ent: "_types",
        name: "setter",
        type: "function",
        isReadonly,
        fallback: (_2) => setter
      },
      "_types-getter": {
        meta: metaNumb,
        ent: "_types",
        name: "getter",
        type: "function",
        isReadonly,
        fallback: (_2) => getter
      },
      //_cols
      "_cols-meta": {
        meta: metaNumb,
        ent: "_cols",
        name: "meta",
        type: "meta",
        isReadonly
      },
      "_cols-ent": {
        meta: metaNumb,
        ent: "_cols",
        name: "ent",
        type: "ref",
        ref: "_ents",
        isReadonly,
        isRequired
      },
      "_cols-name": {
        meta: metaNumb,
        ent: "_cols",
        name: "name",
        type: "string",
        isReadonly,
        isRequired
      },
      "_cols-type": {
        meta: metaNumb,
        ent: "_cols",
        name: "type",
        type: "ref",
        ref: "_types",
        fallback: (_2) => "string"
      },
      "_cols-ref": {
        meta: metaNumb,
        ent: "_cols",
        name: "ref",
        type: "ref",
        ref: "_ents"
      },
      "_cols-parent": {
        meta: metaNumb,
        ent: "_cols",
        name: "parent",
        type: "ref",
        ref: "_cols"
      },
      "_cols-store": {
        meta: metaNumb,
        ent: "_cols",
        name: "store",
        type: "function"
      },
      "_cols-isList": {
        meta: metaNumb,
        ent: "_cols",
        name: "isList",
        type: "boolean"
      },
      "_cols-isReadonly": {
        meta: metaNumb,
        ent: "_cols",
        name: "isReadonly",
        type: "function"
      },
      "_cols-isRequired": {
        meta: metaNumb,
        ent: "_cols",
        name: "isRequired",
        type: "function"
      },
      "_cols-resetIf": {
        meta: metaNumb,
        ent: "_cols",
        name: "resetIf",
        type: "function"
      },
      "_cols-init": {
        meta: metaHard,
        ent: "_cols",
        name: "init",
        type: "function"
        //Type should be defined as a function
      },
      "_cols-fallback": {
        meta: metaHard,
        ent: "_cols",
        name: "fallback",
        type: "function"
        //Type should be defined as a function
      },
      "_cols-validator": {
        meta: metaHard,
        ent: "_cols",
        name: "validator",
        type: "function"
      },
      "_cols-decimal": {
        meta: metaHard,
        ent: "_cols",
        name: "decimal",
        type: "number",
        decimal: 0,
        min: 0
      },
      "_cols-min": {
        meta: metaHard,
        ent: "_cols",
        name: "min",
        type: "number"
        //decimal:_=>r.decimal //decimal should be defined as a function
      },
      "_cols-max": {
        meta: metaHard,
        ent: "_cols",
        name: "max",
        type: "number"
        //decimal:_=>r.decimal, min:_=>r.min //decimal & min should be defined as a function
      },
      "_cols-formula": {
        meta: metaHard,
        ent: "_cols",
        name: "formula",
        type: "function"
      },
      "_cols-noCache": {
        meta: metaNumb,
        ent: "_cols",
        name: "noCache",
        type: "boolean"
      },
      "_cols-omitChange": {
        meta: metaNumb,
        ent: "_cols",
        name: "omitChange",
        type: "boolean"
      }
    }
  };
  var metaDataDynamic = (entId) => {
    return [
      {
        _ent: `_cols`,
        id: `${entId}-_ent`,
        ent: entId,
        name: "_ent",
        type: "ref",
        ref: "_ents",
        isReadonly,
        isRequired,
        meta: metaNumb
      },
      {
        _ent: `_cols`,
        id: `${entId}-id`,
        ent: entId,
        name: "id",
        type: "string",
        isReadonly,
        isRequired,
        meta: isMetaEnt(entId) ? metaNumb : metaSoft,
        formula: entId === "_cols" ? (r) => join("-", r.ent?.id, r.name) : void 0
      }
    ];
  };
  var nregCol = (db, entId, _col, action) => {
    const colsByEnt = vault.get(db)?.colsByEnt;
    if (!colsByEnt) {
      throw Critical.fail("columns not found");
    }
    let cols = colsByEnt.get(entId);
    if (action) {
      if (cols) {
        cols.add(_col);
      } else {
        colsByEnt.set(entId, /* @__PURE__ */ new Set([_col]));
      }
    } else if (cols) {
      if (cols.size > 1) {
        cols.delete(_col);
      } else {
        colsByEnt.delete(entId);
      }
    }
  };
  var getColsPriv = (db, entId) => vault.get(db)?.colsByEnt?.get(entId);
  var createGetter = (_col) => {
    const { db, current: col, values: v } = _col;
    const { getter: getter2 } = metaData._types[v.type] || col.type;
    const typize = v.type == "ref" ? (from) => db.get(v.ref, from, false) : (v2) => getter2(v2, col);
    const n = !v.isList ? typize : (f) => reArray(f, typize);
    return n;
  };
  var createSetter = (_col) => {
    const { db, current: col, values: v } = _col;
    const { name, ref, parent, formula, store, noCache, validator, isReadonly: isReadonly2, resetIf, init, fallback, isRequired: isRequired2, isList } = col;
    const { setter: setter2 } = metaData._types[v.type] || col.type;
    const typize = (t) => isNull(t) ? void 0 : setter2(t, col);
    const n = !isList ? typize : (t) => isNull(t) ? void 0 : reArray(t, typize);
    const stored = !store ? void 0 : store(col, db);
    return (current, output, to3, before) => {
      if (formula) {
        to3 = output[name] = n(formula(current, before, stored));
      } else {
        if (isReadonly2 && isReadonly2(current, before, stored)) {
          if (before) {
            throw Minor.fail(`is readonly`);
          }
        } else {
          to3 = output[name] = n(to3);
          if (validator && !validator(current, before, stored)) {
            throw Major.fail("is invalid");
          }
        }
        if (!before && isNull(to3) || resetIf && resetIf(current, before, stored)) {
          to3 = output[name] = !init ? void 0 : n(init(current, before, stored));
        }
      }
      if (fallback && isNull(to3)) {
        to3 = output[name] = n(fallback(current, before, stored));
      }
      if (isRequired2 && isNull(to3) && isRequired2(current, before, stored)) {
        throw Major.fail("is required");
      }
      return output[name];
    };
  };
  var createTraits = (_col) => {
    return cacheds({}, {}, {
      getter: (_2) => createGetter(_col),
      setter: (_2) => createSetter(_col)
    });
  };
  var setCol = (_rec, ctx) => {
    const { db, values } = _rec;
    if (values._ent !== "_cols") {
      return;
    }
    const ent = values.ent;
    nregCol(db, ent, _rec, true);
    solid3(_rec, "traits", createTraits(_rec), true, true);
    const rows = getRecs(db, ent);
    if (rows) {
      for (const [_2, row] of rows) {
        getRecPriv(db, row).colAdd(_rec);
      }
    }
  };
  var remCol = (_rec, ctx) => {
    const { db, values } = _rec;
    if (values._ent !== "_cols") {
      return;
    }
    nregCol(db, values.ent, _rec, false);
    const rows = getRecs(db, values.ent);
    if (rows) {
      for (const [_2, row] of rows) {
        getRecPriv(db, row).colRem(values.name);
      }
    }
  };
  var addEnt = (_rec, ctx) => {
    const { db, values } = _rec;
    if (values._ent !== "_ents") {
      return;
    }
    for (const mdd of metaDataDynamic(values.id)) {
      addRec(db, mdd, ctx);
    }
  };
  var loadEnt = (_rec, ctx) => {
    const { db, values } = _rec;
    if (values._ent !== "_ents") {
      return;
    }
    for (const mdd of metaDataDynamic(values.id)) {
      loadRec(db, mdd, ctx);
    }
  };
  var remEnt = (_rec, ctx) => {
    const { db, values } = _rec;
    if (values._ent !== "_ents") {
      return;
    }
    for (const _col of getColsPriv(db, values.id)) {
      _col.remove(ctx, true);
    }
    ;
  };
  var Turn = class {
    static attach(_rec, input, isUpdate = false) {
      return _rec.turn = new Turn(_rec, input, isUpdate);
    }
    constructor(_rec, input, isUpdate = false) {
      solids(this, {
        _rec,
        isUpdate,
        input,
        output: {},
        pendings: /* @__PURE__ */ new Set(),
        fails: [],
        changed: /* @__PURE__ */ new Set()
      });
      this.isDone = true;
      this.isPending = false;
      this.isChanged = false;
      try {
        this._prepare();
      } catch (err) {
        this.addFail(toFail(err));
      }
    }
    addFail(fail, nonMinorThrow) {
      const { _rec, fails } = this;
      const { values } = _rec;
      fail.setRow(values.id).setEnt(values._ent);
      if (fail.severity !== "minor") {
        if (nonMinorThrow) {
          throw fail;
        } else {
          this.isDone = false;
        }
      }
      fails.push(fail);
    }
    _prepare() {
      const { _rec } = this;
      const { db, values, state } = _rec;
      if (!values._ent) {
        throw Major.fail("is required").setCol("_ent");
      }
      const _cols = getColsPriv(db, values._ent);
      if (!_cols) {
        throw Major.fail("invalid").setCol("_ent");
      }
      for (const _col of _cols) {
        try {
          this._prepareCol(_col);
        } catch (err) {
          this.addFail(toFail(err).setCol(_col.values.name));
        }
      }
      if (state === "ready" && !this.isPending) {
        throw Major.fail("blank");
      }
    }
    _prepareCol(_col) {
      const { _rec, isUpdate, input, output, pendings } = this;
      const { meta: metaRec, values, state } = _rec;
      const { meta: metaCol, values: { name, formula, resetIf, noCache } } = _col;
      const isReal = input.hasOwnProperty(name);
      const isMeta = metaRec && metaCol && (metaCol === "numb" || metaRec !== "soft");
      output[name] = values[name];
      if (isReal && state === "ready") {
        if (isMeta) {
          throw Minor.fail("is meta");
        }
        if (formula) {
          throw Minor.fail(`has formula`);
        }
      }
      if (formula && noCache) {
        return;
      }
      if (isMeta && state === "pending") {
        return;
      }
      if (formula) {
        pendings.add(_col);
        return;
      }
      if (!isUpdate || isReal) {
        pendings.add(_col);
        this.isPending = true;
        return;
      }
      if (resetIf) {
        input[name] = values[name];
        pendings.add(_col);
        return;
      }
    }
    execute() {
      const { _rec, pendings, changed } = this;
      if (this.isPending) {
        for (const _col of pendings) {
          this.pull(_col);
        }
      }
      if (this.isChanged && this.isDone) {
        return this.output;
      }
      this.isChanged = _rec.state === "pending";
      changed.clear();
      return _rec.values;
    }
    pull(_col) {
      const { _rec, pendings, output, input, changed } = this;
      const { name, omitChange } = _col.values;
      if (pendings.has(_col)) {
        const { setter: setter2 } = _col.traits;
        pendings.delete(_col);
        try {
          setter2(_rec.current, output, input[name], _rec.state === "ready" ? _rec.before : void 0);
        } catch (err) {
          this.addFail(toFail(err).setCol(name));
        }
        if (output[name] !== _rec.values[name]) {
          changed.add(name);
          this.isChanged = this.isChanged || !omitChange;
        }
      }
      return output[name];
    }
    detach() {
      const { _rec, isDone, changed, fails } = this;
      const { current } = _rec;
      delete _rec.turn;
      return solids({}, {
        isDone,
        current,
        changed,
        fails
      });
    }
  };
  var Record = class {
    toString() {
      return this.id;
    }
    toJSON() {
      return this.id;
    }
  };
  var RecordPrivate = class {
    constructor(db) {
      solids(this, {
        db,
        current: new Record(),
        before: new Record()
      });
      this.state = "pending";
      this.values = {};
      regRec(this);
    }
    msg(text, details = {}) {
      return this.db.msg(text, {
        ent: this.values._ent,
        row: this.values.id,
        ...details
      });
    }
    colAdd(_col) {
      const { current, before, state } = this;
      const { name, formula, noCache } = _col.current;
      const t = _col.traits;
      const isVirtual = formula && noCache;
      const prop = {
        enumerable: true,
        configurable: true,
        set: (_2) => {
          throw new Error(this.msg("for update use db.update(...) interface", { column: name }));
        }
      };
      if (isVirtual) {
        prop.get = (_2) => t.getter(t.setter(current, this.values, this.values[name], this.state === "ready" ? before : void 0), this.state === "ready");
      } else {
        prop.get = (_2) => t.getter(this.turn ? this.turn.pull(_col) : this.values[name], this);
      }
      Object.defineProperty(current, name, prop);
      if (!isVirtual) {
        prop.get = (_2) => t.getter(this.values[name], this);
      }
      Object.defineProperty(before, name, prop);
      if (state === "ready") {
        t.setter(current, this.values, this.values[name]);
      }
    }
    colRem(name) {
      const { current, before } = this;
      delete this.values[name];
      delete current[name];
      delete before[name];
    }
    colsInit() {
      const { db, values } = this;
      const cols = getColsPriv(db, values._ent);
      if (cols) {
        for (const _col of cols) {
          this.colAdd(_col);
        }
      }
      return this;
    }
    colsPrepare() {
      const { state, values } = this;
      if (state === "pending") {
        Turn.attach(this, values);
      }
      return this;
    }
    colsFinish() {
      const { state, turn } = this;
      if (state === "pending") {
        this.values = turn.execute();
        this.state = "ready";
      }
      return this.turn.detach();
    }
    valsLoad(values) {
      const { state, current, values: v } = this;
      if (state !== "pending") {
      }
      Object.assign(v, values);
      v._ent = toRefId(v._ent);
      if (v._ent === "_cols") {
        v.ent = toRefId(v.ent);
      }
      this.meta = isMetaEnt(v._ent) ? v.meta = metaToStr(v.meta) : void 0;
      Object.assign(this.current, v);
      return this;
    }
    valsPush(values, ctx, isUpdate = false) {
      const { db, current } = this;
      this.values = Turn.attach(this, values, isUpdate).execute();
      if (this.turn.isChanged) {
        setCol(this, ctx);
        afterUpdate(db, current, ctx);
      }
      return this.turn.detach();
    }
    remove(ctx, force = false) {
      const { db, current, values, meta } = this;
      const fails = [];
      if (!force && meta) {
        fails.push(Major.fail("is meta").setRow(values.id));
      } else {
        this.state = "removed";
        afterRemove(db, current, ctx);
        unregRec(this);
      }
      return solids({}, {
        isDone: !fails.size,
        fails
      });
    }
  };
  var _records = /* @__PURE__ */ new WeakMap();
  var regRec = (_rec) => {
    _records.set(_rec.current, _rec);
    return _rec;
  };
  var unregRec = (_rec) => {
    _records.delete(_rec.current);
    return _rec;
  };
  var createRec = (db, values) => new RecordPrivate(db).valsLoad(values);
  var getRecPriv = (db, any, throwError2 = true) => {
    const _p = _records.get(any);
    if (_p && (!db || db === _p.db)) {
      return _p;
    }
    if (throwError2) {
      throw Error(db.msg("is not record", { row: toRefId(any) }));
    }
    ;
  };
  var loadRec = (db, values, ctx) => {
    const id = toRefId(values);
    const _ent = toRefId(values._ent);
    const brother = getRec(db, _ent, id);
    const _rec = brother ? getRecPriv(db, brother) : createRec(db, values);
    if (brother) {
      _rec.valsLoad(values);
      afterUpdate(db, _rec.current, ctx);
    } else {
      afterAdd(db, _rec.current, ctx);
      loadEnt(_rec, ctx);
    }
    return _rec;
  };
  var addRec = (db, values, ctx) => {
    const _rec = createRec(db, values);
    const res = _rec.colsInit().colsPrepare().colsFinish();
    if (res.isDone) {
      afterAdd(db, _rec.current, ctx);
    }
    return res;
  };
  var addOrSetRec = (db, values, ctx, isUpdate) => {
    const _rec = createRec(db, values).valsLoad(values).colsInit().colsPrepare();
    const { _ent, id } = _rec.current;
    const brother = getRec(db, toRefId(_ent), id);
    if (brother) {
      return getRecPriv(db, brother).valsPush(values, ctx, isUpdate);
    }
    const res = _rec.colsFinish();
    if (res.isDone) {
      afterAdd(db, res.current, ctx);
    }
    return res;
  };
  var removeRec = (db, record, ctx, force) => getRecPriv(db, record).remove(ctx, force);
  var DB2 = class extends Chop2 {
    constructor(id, opt = {}) {
      const { init } = opt;
      super(id, {
        autoReset: false,
        group: (rec) => toRefId(rec._ent),
        init: (self2, ctx) => {
          const load = (values) => loadRec(this, values, ctx);
          init(load, ctx);
          for (const _ent in metaData) {
            for (const id2 in metaData[_ent]) {
              load({ _ent, id: id2, ...metaData[_ent][id2] });
            }
            ;
          }
          for (const [_2, rec] of getRecs(this, "_cols")) {
            const _rec = getRecPriv(this, rec);
            setCol(_rec, ctx);
          }
          const _recs = [];
          for (const [rec] of getAllRecs(this)) {
            const _rec = getRecPriv(this, rec);
            if (_rec.state === "pending") {
              _recs.push(_rec.colsPrepare());
            }
          }
          for (const _rec of _recs) {
            _rec.colsFinish();
          }
          return _recs;
        }
      });
      this.on((event, rec, ctx) => {
        if (!rec) {
          return;
        }
        const _rec = getRecPriv(this, rec);
        const { _ent } = _rec.values;
        if (_ent == "_ents") {
          if (event === "remove") {
            remEnt(_rec, ctx);
          } else if (event === "add") {
            addEnt(_rec, ctx);
          }
        } else if (_ent === "_cols") {
          if (event === "add" || event === "update") {
            setCol(_rec, ctx);
          } else if (event === "remove") {
            remCol(_rec, ctx);
          }
        }
      });
      vault.get(this).colsByEnt = /* @__PURE__ */ new Map();
      this.reset();
    }
    isRecord(any, throwError2 = false) {
      return !!getRecPriv(this, any, throwError2);
    }
    remove(record, ctx) {
      return removeRec(this, record, ctx);
    }
    add(values, ctx) {
      return addRec(this, values, ctx);
    }
    addOrSet(values, ctx) {
      return addOrSetRec(this, values, ctx);
    }
    addOrUpdate(values, ctx) {
      return addOrSetRec(this, values, ctx, true);
    }
    set(record, values, ctx) {
      return getRecPriv(this, record).valsPush(values, ctx);
    }
    update(record, values, ctx) {
      return getRecPriv(this, record).valsPush(values, ctx, true);
    }
    removeBy(groupId, recId, ctx) {
      const rec = this.get(groupId, recId);
      if (rec) {
        return this.remove(rec, ctx);
      }
    }
    setBy(groupId, recId, values, ctx) {
      const rec = this.get(groupId, recId);
      if (rec) {
        return this.set(rec, values, ctx);
      }
    }
    updateBy(groupId, recId, values, ctx) {
      const rec = this.get(groupId, recId);
      if (rec) {
        return this.update(rec, values, ctx);
      }
    }
  };

  // demo/frontend/src/index.js
  var socket = lookup2(`localhost:${info.port + 1}`);
  var bifrost = new ClientRouter(socket);
  var beam = window.beam = bifrost.createBeam("data");
  beam.get().then((records) => {
    const db = window.db = new DB2("db", {
      init: (load, ctx) => {
        for (const rec of records) {
          load(rec, ctx);
        }
      }
    });
    db.on((event, rec, ctx) => {
      if (rec) {
        console.log(event);
      }
    });
  });
})();
//# sourceMappingURL=index.js.map
