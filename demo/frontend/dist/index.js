(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res2) => function __init() {
    return fn && (res2 = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res2;
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
    prom.result = new Promise((res2, rej) => {
      prom.resolve = res2;
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
    return new Promise((res2, rej) => {
      socket2.emit(_bifrostEvent, { channel, body }, (ok, response) => {
        if (ok) {
          return res2(response);
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
  var unregisterExe = (list, exe) => {
    const x = list.indexOf(exe);
    if (x < 0) {
      return false;
    }
    list.splice(x, 1);
    return true;
  };
  var registerExe = (list, exe) => {
    list.unshift(exe);
    return (_) => unregisterExe(list, exe);
  };
  var mapList = async (map, list, ...args) => {
    for (let i = list.length - 1; i >= 0; i--) {
      try {
        const res2 = await list[i](...args);
        if (map && typeof res2 === "function") {
          map.push(res2);
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
      const propagate2 = (state, args) => {
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
        propagate2(stateExtract(localStateProp, local), args);
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
      const pull = !pullRaw ? async (args) => propagate2(await get(...args), args) : async (args) => set(await pullRaw(...args), args);
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

  // dist/v3/index.js
  init_define_slib_info();

  // dist/chunk-SG7V4B56.js
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
    const list = byPrototype.get(prototype);
    return list ? list[0] : void 0;
  };
  var getByInst = (any, def, withDef = true) => {
    if (!def.is || def.is(any)) {
      return withDef ? def : def.name;
    }
  };
  var findByProto = (any, proto2, withDef = true) => {
    const list = byPrototype.get(proto2);
    if (!list) {
      return;
    }
    if (list.length === 1) {
      return getByInst(any, list[0], withDef);
    }
    for (const def of list) {
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
    const list = byPrototype.get(def.prototype);
    if (list) {
      list.unshift(def);
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
    const exe = (ctx22, skipDeep = false) => {
      const { parent, path, def } = ctx22;
      const de = def?.entries;
      if (!de || !deep && parent) {
        fce(ctx22);
      } else if (dprun && !skipDeep) {
        deep(ctx22, (_) => {
          exe(ctx22, true);
        });
      } else {
        for (let [key, val] of de(ctx22.val)) {
          exe({
            parent: ctx22,
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
      return ctx22.result;
    };
    const ctx2 = { val: any, stop, def: getDefByInst(any) };
    if (init) {
      init(ctx2);
    }
    return exe(ctx2, true);
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
    const res2 = [];
    const flat = deflate(a);
    each(b, ({ val, path, stop }) => {
      if (flat[path] !== val) {
        res2.push(path);
      }
      delete flat[path];
      if (!diffList && res2.length) {
        stop();
      }
    }, true);
    for (let path in flat) {
      if (!diffList && res2.length) {
        break;
      }
      res2.push(path);
    }
    return diffList ? res2 : !res2.length;
  };
  var copy = (any, deep = false, copyUnmapable = false) => {
    return each(any, (ctx2) => {
      const { parent, val, key, def } = ctx2;
      if (!parent) {
        return;
      }
      parent.def.set(parent.result, key, ctx2.result = copyUnmapable ? def.copy(val) : val);
    }, !deep ? false : (ctx2, next) => {
      const { parent, key, def } = ctx2;
      parent.def.set(parent.result, key, ctx2.result = def.create());
      next();
    }, (ctx2) => {
      const { val, def } = ctx2;
      ctx2.result = def.entries ? def.create() : def.copy(val);
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
    const res2 = [];
    each(any, ({ val }) => {
      res2.push(base_default.isRunnable(val) ? val(...args) : void 0);
    }, true);
    return res2;
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
      Function: (map) => (_) => map
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
      Function: (map) => (_) => map
    }
  });
  var src_default = defs_default;

  // dist/chunk-SG7V4B56.js
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
  var fcePass = (v) => v;
  var fceTrue = (_) => true;

  // dist/chunk-QH2HNO5N.js
  init_define_slib_info();
  var __defProp3 = Object.defineProperty;
  var __export3 = (target, all) => {
    for (var name in all)
      __defProp3(target, name, { get: all[name], enumerable: true });
  };
  var define_slib_info_default2 = { isBuild: true, name: "@randajan/ram-db", description: "Realtime database", version: "2.8.4", author: { name: "Jan Randa", email: "jnranda@gmail.com", url: "https://www.linkedin.com/in/randajan/" }, env: "development", mode: "web", port: 3005, dir: { root: "C:\\dev\\lib\\ram-db", dist: "dist" } };

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
  var virtual2 = (obj, name, get, enumerable5 = true, configurable = false) => {
    return Object.defineProperty(obj, name, { enumerable: enumerable5, get, configurable });
  };
  var virtuals = (obj, namedGets, enumerable5 = true, configurable = false) => {
    for (const name in namedGets) {
      const get = namedGets[name];
      virtual2(obj, name, get, enumerable5, configurable);
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
  var parseArgs = (args, to3 = []) => {
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
        to3.push(a);
      }
    }
    return to3;
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
  var fromStr = (str, injectScope) => {
    const f = split2(str);
    const args = parseArgs(f[0]);
    const body = f[1];
    const origin = new Function(args, body);
    if (!injectScope) {
      return origin;
    }
    const keys = Object.keys(injectScope);
    const vals = Object.values(injectScope);
    const injected = new Function([...keys, ...args], body);
    const binded = (...a) => injected(...vals, ...a);
    return Object.defineProperty(binded, "toString", (_) => origin.toString());
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
  var anyToFn = (any, injectScope) => {
    const type = typeof any;
    return type !== "string" || any.startsWith("'") ? fromAny(any, type) : fromStr(any, injectScope);
  };

  // dist/v3/index.js
  var import_regex_parser = __toESM(require_lib(), 1);
  var enumerable4 = true;
  var lockObject2 = (o) => {
    if (typeof o !== "object") {
      return o;
    }
    const r = {};
    for (const i in o) {
      const descriptor = { enumerable: enumerable4 };
      let val = o[i];
      if (val instanceof Array) {
        descriptor.get = (_) => [...val];
      } else {
        descriptor.value = lockObject2(val);
      }
      Object.defineProperty(r, i, descriptor);
    }
    return r;
  };
  var info2 = lockObject2(define_slib_info_default2);
  var info_default = info2;
  var isNull = (v) => v == null || typeof v === "number" && isNaN(v);
  var isFce = (fce) => typeof fce === "function";
  var toFce = (fce, defReturn) => isFce(fce) ? fce : () => defReturn;
  var wrapFce = (wrap, what) => (...args) => wrap(what(...args));
  var toStr = (any, def) => isNull(any) ? def : String(any);
  var toArr = (any) => any instanceof Array ? any : [any];
  var reArray = (val, trait) => {
    const res2 = [];
    if (isNull(val)) {
      return res2;
    }
    if (!Array.isArray(val)) {
      res2.push(trait(val));
      return res2;
    }
    for (const v of val) {
      const r = trait(v);
      if (!isNull(r)) {
        res2.push(r);
      }
    }
    return res2;
  };
  var uni_exports = {};
  __export3(uni_exports, {
    isEmpty: () => isEmpty,
    join: () => join,
    throwMajor: () => throwMajor2,
    throwMinor: () => throwMinor,
    toId: () => toId
  });
  var Fail = class extends Error {
    constructor(severity, reason, details) {
      super(reason);
      solids(this, { severity, reason, details });
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
  var _toFail = (err) => {
    if (err instanceof Fail) {
      return err;
    }
    if (err instanceof Error) {
      return Critical.fail(err.message, err.stack);
    }
    return Critical.fail("Unknown error", err);
  };
  var toFail = (err, colName) => solid3(_toFail(err), "column", colName);
  var strings_exports = {};
  __export3(strings_exports, {
    toString: () => toString3
  });
  var toString3 = (any, opt = {}) => {
    const t = typeof any;
    let str;
    if (any == null) {
      str = "";
    } else if (t === "string") {
      str = any;
    } else if (t === "function") {
      str = fnToStr(any);
    } else {
      str = String(any);
    }
    if (str === "[object Object]") {
      try {
        str = JSON.stringify(any);
      } catch (e) {
        throwMajor2("unparseable");
      }
    }
    const { min, max } = opt;
    if (min != null && str.length < min) {
      throwMajor2("too short", min);
    }
    if (max != null && str.length > max) {
      str = str.substring(0, max);
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
      for (let i in any) {
        return false;
      }
      return true;
    }
    return false;
  };
  var join = (separator, ...vals) => {
    let s = "";
    for (let v of vals) {
      v = toString3(v);
      if (!v) {
        continue;
      }
      s += (!s ? "" : separator) + v;
    }
    return s;
  };
  var throwMajor2 = (reason, details) => {
    throw Major.fail(reason, details);
  };
  var throwMinor = (reason, details) => {
    throw Minor.fail(reason, details);
  };
  var _chopGetAllRecs = (chop) => vault.get(chop).bundle.byRec;
  var _chopGetRecs = (chop, groupId) => vault.get(chop).bundle.byGroup.getAll(groupId);
  var _chopGetRec = (chop, groupId, recId) => vault.get(chop).bundle.byGroup.get(groupId, recId);
  var propagate = (chop, process2, rec, inc, befs, afts) => {
    const { bundle, childs, befores, afters } = vault.get(chop);
    const isChange = bundle.sync(rec, inc);
    if (isChange) {
      for (const child of childs) {
        propagate(child, process2, rec, inc, hands);
      }
      if (befs && befores.length) {
        befs.push(befores);
      }
      if (afts && afters.length) {
        afts.push(afters);
      }
    }
    return isChange;
  };
  var _sync = (inc, process2, rec, isBatch = false) => {
    solid3(process2, "isBatch", isBatch);
    if (isBatch) {
      return propagate(process2.chop, process2, rec, inc);
    }
    const befs = [], afts = [];
    solid3(process2, "record", rec);
    propagate(process2.chop, process2, rec, inc, befs, afts);
    for (const b of befs) {
      runEvent(process2, b);
    }
    for (const a of afts) {
      runEvent(process2, a, false);
    }
  };
  var syncIn = (process2, rec, isBatch = false) => _sync(true, process2, rec, isBatch);
  var syncOut = (process2, rec, isBatch = false) => _sync(false, process2, rec, isBatch);
  var runEvent = (process2, handlers, throwErrors = true) => {
    for (let i = handlers.length - 1; i >= 0; i--) {
      if (!handlers[i]) {
        return;
      }
      try {
        handlers[i](process2);
      } catch (err) {
        if (throwErrors) {
          throw err;
        }
        console.warn(err);
      }
    }
  };
  var onEvent = (chop, isBefore, callback) => {
    if (!isFce(callback)) {
      throwMajor2(`on(...) require function`);
    }
    const { befores, afters } = vault.get(chop);
    const handlers = isBefore ? befores : afters;
    handlers.unshift(callback);
    return (_) => {
      const x2 = handlers.indexOf(callback);
      if (x2 >= 0) {
        handlers.splice(x2, 1);
      }
      return callback;
    };
  };
  var chopReset = (process2) => {
    solid3(process2, "action", "reset");
    const _p = vault.get(process2.chop);
    if (!_p) {
      throwMajor2("not a chop");
    }
    const { bundle, init, befores, afters, childs } = _p;
    bundle.clear();
    _p.state = "init";
    init(process2);
    _p.state = "ready";
    if (childs.size) {
      for (const child of childs) {
        child.reset(process2.context);
      }
    }
    runEvent(process2, befores);
    runEvent(process2, afters, false);
  };
  var chopResetRollback = (process2) => {
    const _p = vault.get(process2.chop);
    if (!_p) {
      return;
    }
    _p.bundle.clear();
    _p.state = "pending";
  };
  var booleans_exports = {};
  __export3(booleans_exports, {
    toBoolean: () => toBoolean
  });
  var _bols = /^(0|f|n|no|not|off|false)$/i;
  var toBoolean = (any) => typeof any !== "string" ? !!any : !_bols.test(any);
  var SuperMap = class extends Map {
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
  var syncSingleGroup = (bundle, id, rec, from, to3) => {
    const { byRec, byGroup } = bundle;
    if (from == to3) {
      return;
    }
    if (to3 == null) {
      byRec.delete(rec);
    } else {
      const current = byGroup.get(to3, id);
      if (current && current !== rec) {
        throwMajor2(`Duplicate index '${id}' at '${to3}'`);
      }
      byGroup.set(to3, id, rec);
      byRec.set(rec, to3);
    }
    byGroup.delete(from, id);
  };
  var syncMultiGroup = (bundle, id, rec, from, to3) => {
    const { byRec, byGroup } = bundle;
    let hasNew, toGroups;
    if (to3 == null) {
      byRec.delete(rec);
    } else {
      to3 = toArr(to3);
      toGroups = /* @__PURE__ */ new Set();
      for (const groupId of to3) {
        if (toGroups.has(groupId)) {
          continue;
        }
        toGroups.add(groupId);
        if (from?.has(groupId)) {
          from.delete(groupId);
          continue;
        }
        hasNew = true;
        const current = byGroup.get(groupId, id);
        if (current && current !== rec) {
          throwMajor2(`Duplicate index '${id}' at '${groupId}'`);
        }
        byGroup.set(groupId, id, rec);
        byRec.set(rec, toGroups);
      }
    }
    if (!hasNew && from?.size === toGroups?.size) {
      return;
    }
    if (from != null) {
      for (const groupId of from) {
        byGroup.delete(groupId, id);
      }
    }
  };
  var Bundle = class {
    constructor(opt = {}) {
      const isMultiGroup = toBoolean(opt.isMultiGroup);
      const filter2 = toFce(opt.filter, true);
      const getId = isFce(opt.getId) ? opt.getId : (r) => r.id;
      const getGroup = !isMultiGroup ? toFce(opt.getGroup) : wrapFce(toArr, toFce(opt.getGroup, [void 0]));
      solids(this, {
        byRec: /* @__PURE__ */ new Map(),
        byGroup: new SuperMap(),
        getId,
        getGroup,
        filter: filter2,
        isMultiGroup
      });
    }
    isInGroup(groupId, rec) {
      const group = this.getGroup(rec);
      return this.isMultiGroup ? group.includes(groupId) : group === groupId;
    }
    clear() {
      this.byRec.clear();
      this.byGroup.clear();
    }
    sync(rec, inc = true) {
      const { byRec, getId, getGroup, filter: filter2, isMultiGroup } = this;
      inc = inc && filter2(rec);
      const has = byRec.has(rec);
      if (!inc && !has) {
        return false;
      }
      const id = getId(rec);
      const to3 = inc ? getGroup(rec) : null;
      const from = byRec.get(rec);
      if (isMultiGroup) {
        syncMultiGroup(this, id, rec, from, to3);
      } else if (to3 != from) {
        syncSingleGroup(this, id, rec, from, to3);
      }
      return true;
    }
    syncIn(rec) {
      this.sync(rec, true);
    }
    syncOut(rec) {
      this.sync(rec, false);
    }
  };
  var _priv = /* @__PURE__ */ new WeakMap();
  var Process = class {
    constructor(db, chop, context, parent) {
      const _p = {
        isOk: true,
        isDone: false,
        childs: !parent ? [] : void 0
      };
      solids(this, {
        db,
        chop,
        parent
      }, false);
      solids(this, {
        context
      });
      virtuals(this, {
        isOk: (_) => _p.isOk,
        isDone: (_) => _p.isDone,
        fails: (_) => !_p.fails ? void 0 : [..._p.fails],
        childs: (_) => !_p.childs.length ? void 0 : [..._p.childs]
      });
      _priv.set(this, _p);
    }
  };
  var processFail = (process2, err, colName) => {
    const _p = _priv.get(process2);
    const fail = toFail(err, colName);
    if (fail.severity !== "minor") {
      if (colName) {
        throw fail;
      }
      _p.isOk = false;
      if (process2.parent) {
        _priv.get(process2.parent).isOk = false;
      }
    }
    if (!_p.fails) {
      _p.fails = [fail];
    } else {
      _p.fails.push(fail);
    }
  };
  var processRun = (chop, context, args, exe, rollback) => {
    const db = chop.db;
    const _pdb = vault.get(db);
    const parent = _pdb.process;
    const process2 = new Process(db, chop, context, parent);
    if (!parent) {
      _pdb.process = process2;
    } else {
      _priv.get(parent).push(process2);
    }
    const _p = _priv.get(process2);
    _p.args = args;
    _p.rollback = rollback;
    try {
      exe(process2, ...args);
    } catch (err) {
      processFail(process2, err);
    }
    delete _pdb.process;
    _p.isDone = true;
    if (parent) {
      return process2;
    }
    if (!_p.isOk) {
      rollback(process2, ...args);
    }
    for (const child of _p.childs) {
      if (!_p.isOk) {
        const _pc = _priv.get(child);
        _pc.rollback(..._pc.args);
      }
      _priv.delete(child);
    }
    _priv.delete(process2);
    return process2;
  };
  var Chop = class {
    constructor(id, opt = {}) {
      id = toStr(id);
      if (!id) {
        throwMajor2("missing id");
      }
      const { parent, init } = opt;
      const _p = {
        state: "pending",
        befores: [],
        afters: [],
        childs: /* @__PURE__ */ new Set(),
        init: toFce(init),
        bundle: new Bundle(opt)
      };
      solids(this, {
        id,
        db: parent?.db || this,
        parent
      }, false);
      virtuals(this, {
        state: (_) => _p.state,
        size: (_) => _p.bundle.byRec.size,
        childs: (_) => [..._p.childs],
        isMultiGroup: (_) => _p.bundle.isMultiGroup
      });
      if (!info_default.isBuild) {
        virtual2(this, "bundle", (_) => _p.bundle);
      }
      vault.set(this, _p);
    }
    on(isBefore, callback) {
      return onEvent(this, isBefore, callback);
    }
    before(callback) {
      return onEvent(this, true, callback);
    }
    after(callback) {
      return onEvent(this, false, callback);
    }
    get(groupId, recId, throwError2 = false) {
      return _chopGetRec(this, groupId, recId, throwError2);
    }
    getMap(groupId, throwError2 = false) {
      const recs = _chopGetRecs(this, groupId, throwError2);
      return recs ? new Map(recs) : /* @__PURE__ */ new Map();
    }
    getList(groupId, throwError2 = false) {
      const recs = _chopGetRecs(this, groupId, throwError2);
      return recs ? Array.from(recs.values()) : [];
    }
    getSize(groupId, throwError2 = false) {
      return _chopGetRecs(this, groupId, throwError2)?.size || 0;
    }
    reset(context) {
      return processRun(this, context, arguments, chopReset, chopResetRollback);
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
    export(rec) {
      const res2 = {};
      for (const i in rec) {
        const v = rec[i];
      }
      return res2;
    }
    exportAll() {
      return this.map(this.export);
    }
    chop(id, opt = {}, context) {
      const { state, bundle, childs } = vault.get(this);
      const filter2 = toFce(opt.filter, true);
      opt.parent = this;
      opt.filter = (rec) => bundle.isInGroup(id, rec) && filter2(rec);
      opt.init = (process2) => {
        for (const [rec] of bundle.byRec) {
          syncIn(process2, rec, true);
        }
      };
      const child = new Chop(id, opt);
      childs.add(child);
      if (state !== "init") {
        $reset(child, context);
      }
      return child;
    }
  };
  var functions_exports = {};
  __export3(functions_exports, {
    toFunction: () => toFunction
  });
  var dates_exports = {};
  __export3(dates_exports, {
    toDate: () => toDate
  });
  var toDate = (any, opt = {}) => {
    let date = any instanceof Date ? any : new Date(any);
    let num = date.getTime();
    if (isNaN(num)) {
      throwMajor2("not a date");
    }
    const { min, max } = opt;
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
  var numbers_exports = {};
  __export3(numbers_exports, {
    toNumber: () => toNumber
  });
  var _nums = /-?(\d+(\s+\d+)*)*[,.]?\d+/;
  var strToNum = (str) => {
    const match = String(str).replace(/\u00A0/g, " ").match(_nums);
    if (!match || !match[0]) {
      return NaN;
    }
    const res2 = Number(match[0].replaceAll(" ", "").replace(",", "."));
    return res2;
  };
  var toNumber = (any, opt = {}) => {
    const t = typeof any;
    let num;
    if (t === "number") {
      num = any;
    }
    if (t === "string") {
      num = strToNum(any);
    } else {
      num = Number(any);
    }
    const { min, max, dec } = opt;
    if (isNaN(num)) {
      throwMajor2("not a number");
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
  __export3(objects_exports, {
    toObject: () => toObject
  });
  var toObject = (obj) => {
    const t = typeof obj;
    if (t === "object") {
      return obj;
    }
    if (t !== "string") {
      throwMajor2("unparseable");
    }
    try {
      return JSON.parse(obj);
    } catch (e) {
      throwMajor2("unparseable");
    }
  };
  var regexp_exports = {};
  __export3(regexp_exports, {
    toRegExp: () => toRegExp
  });
  var toRegExp = (any) => {
    if (any instanceof RegExp) {
      return any;
    }
    if (typeof any != "string") {
      throwMajor("not a regexp");
    }
    try {
      return (0, import_regex_parser.default)(any);
    } catch (err) {
      throwMajor("unparseable");
    }
  };
  var modules = [booleans_exports, dates_exports, functions_exports, numbers_exports, objects_exports, regexp_exports, strings_exports, uni_exports];
  var __default = modules;
  var tools = {};
  for (const file of __default) {
    solids(tools, file);
  }
  var toFunction = (any) => typeof any === "function" ? any : anyToFn(any, tools);
  var getter = fcePass;
  var setter = fcePass;
  var isRequired = fceTrue;
  var isReadonly = fceTrue;
  var isMetaEnt = (v) => metaData.hasOwnProperty(v);
  var metaData = {
    "_ents": {
      "_ents": { meta: "numb" },
      "_cols": { meta: "numb" },
      "_types": { meta: "numb" }
    },
    "_types": {
      "string": { meta: "numb", setter: (v, c) => toString3(v, c), getter },
      "boolean": { meta: "numb", setter: (v, c) => toBoolean(v, c), getter },
      "number": { meta: "numb", setter: (v, c) => toNumber(v, c), getter },
      "datetime": { meta: "numb", setter: (v, c) => toDate(v, c), getter },
      "duration": { meta: "numb", setter: (v, c) => toNumber(v, c), getter },
      "function": { meta: "numb", setter: (v, c) => toFunction(v, c), getter, saver: (v) => toString3(v) },
      "regexp": { meta: "numb", setter: (v, c) => toRegExp(v, c), getter },
      "object": { meta: "numb", setter: (v, c) => toObject(v, c), getter, saver: (v) => toString3(v) },
      "ref": { meta: "numb", setter: (v, c) => toId(v, c), getter },
      "nref": { meta: "numb", setter, getter }
    },
    "_cols": {
      "_ents-_ent": { meta: "numb", ent: "_ents", name: "_ent", type: "ref", ref: "_ents", isReadonly, isRequired },
      "_ents-id": { meta: "numb", ent: "_ents", name: "id", type: "string", isReadonly, isRequired },
      "_ents-meta": { meta: "numb", ent: "_ents", name: "meta", type: "string", isReadonly },
      // "_ents-cols":{
      //     meta:"numb", ent:"_ents", name:"cols", type:"ref", ref:"_cols", parent:"_cols-ent", isList:true, noCache:true,
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
      //     meta:"numb", ent:"_ents", name:"size", type:"number", noCache:true,
      //     store:(c, db)=>db,
      //     formula:(r, b, s)=>s.getSize(r.id, false)
      // },
      //_types
      "_types-_ent": { meta: "numb", ent: "_types", name: "_ent", type: "ref", ref: "_ents", isReadonly, isRequired },
      "_types-id": { meta: "numb", ent: "_types", name: "id", type: "string", isReadonly, isRequired },
      "_types-meta": { meta: "numb", ent: "_types", name: "meta", type: "string", isReadonly },
      "_types-setter": { meta: "numb", ent: "_types", name: "setter", type: "function", isReadonly, fallback: (_) => (v) => v },
      "_types-getter": { meta: "numb", ent: "_types", name: "getter", type: "function", isReadonly, fallback: (_) => (v) => v },
      "_types-saver": { meta: "numb", ent: "_types", name: "saver", type: "function", isReadonly },
      "_types-loader": { meta: "numb", ent: "_types", name: "loader", type: "function", isReadonly },
      //_cols
      "_cols-_ent": { meta: "numb", ent: "_cols", name: "_ent", type: "ref", ref: "_ents", isReadonly, isRequired },
      "_cols-id": { meta: "numb", ent: "_cols", name: "id", type: "string", isReadonly, isRequired, formula: (r) => join("-", r.ent?.id, r.name) },
      "_cols-meta": { meta: "numb", ent: "_cols", name: "meta", type: "string", isReadonly },
      "_cols-ent": { meta: "numb", ent: "_cols", name: "ent", type: "ref", ref: "_ents", isReadonly, isRequired },
      "_cols-name": { meta: "numb", ent: "_cols", name: "name", type: "string", isReadonly, isRequired },
      "_cols-type": { meta: "numb", ent: "_cols", name: "type", type: "ref", ref: "_types", fallback: (_) => "string" },
      "_cols-ref": { meta: "numb", ent: "_cols", name: "ref", type: "ref", ref: "_ents" },
      "_cols-parent": { meta: "numb", ent: "_cols", name: "parent", type: "ref", ref: "_cols" },
      "_cols-store": { meta: "numb", ent: "_cols", name: "store", type: "function" },
      "_cols-isList": { meta: "numb", ent: "_cols", name: "isList", type: "boolean" },
      "_cols-isReadonly": { meta: "numb", ent: "_cols", name: "isReadonly", type: "function" },
      "_cols-isRequired": { meta: "numb", ent: "_cols", name: "isRequired", type: "function" },
      "_cols-resetIf": { meta: "numb", ent: "_cols", name: "resetIf", type: "function" },
      "_cols-init": { meta: "hard", ent: "_cols", name: "init", type: "function" },
      //Type should be defined as a function
      "_cols-fallback": { meta: "hard", ent: "_cols", name: "fallback", type: "function" },
      //Type should be defined as a function
      "_cols-validator": { meta: "hard", ent: "_cols", name: "validator", type: "function" },
      "_cols-decimal": { meta: "hard", ent: "_cols", name: "decimal", type: "number", decimal: 0, min: 0 },
      "_cols-min": { meta: "hard", ent: "_cols", name: "min", type: "number" },
      //decimal should be defined as a function
      "_cols-max": { meta: "hard", ent: "_cols", name: "max", type: "number" },
      //decimal:_=>r.decimal //decimal should be defined as a function
      "_cols-formula": { meta: "hard", ent: "_cols", name: "formula", type: "function" },
      "_cols-noCache": { meta: "numb", ent: "_cols", name: "noCache", type: "boolean" },
      "_cols-omitChange": { meta: "numb", ent: "_cols", name: "omitChange", type: "boolean" }
    }
  };
  var nregCol = (db, entId, _col, action) => {
    const colsByEnt = vault.get(db)?.colsByEnt;
    if (!colsByEnt) {
      throwMajor2("columns not found");
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
            throwMino(`is readonly`);
          }
        } else {
          to3 = output[name] = n(to3);
          if (validator && !validator(current, before, stored)) {
            throwMajor2("is invalid");
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
        throwMajor2("is required");
      }
      return output[name];
    };
  };
  var createTraits = (_col) => {
    return cacheds({}, {}, {
      getter: (_) => createGetter(_col),
      setter: (_) => createSetter(_col)
    });
  };
  var colSet = (_rec) => {
    const { db, values: { _ent, ent } } = _rec;
    if (_ent !== "_cols") {
      return;
    }
    nregCol(db, ent, _rec, true);
    solid3(_rec, "traits", createTraits(_rec), true, true);
    const rows = _chopGetRecs(db, ent);
    if (rows) {
      for (const [_, row] of rows) {
        recGetPriv(db, row).colAdd(_rec);
      }
    }
  };
  var colRem = (_rec) => {
    const { db, values: values2 } = _rec;
    if (values2._ent !== "_cols") {
      return;
    }
    nregCol(db, values2.ent, _rec, false);
    const rows = _chopGetRecs(db, values2.ent);
    if (rows) {
      for (const [_, row] of rows) {
        recGetPriv(db, row).colRem(values2.name);
      }
    }
  };
  var Turn = class {
    static attach(process2, _rec, input, force = false) {
      return _rec.turn = new Turn(process2, _rec, input, force);
    }
    constructor(process2, _rec, input, force = false) {
      this.process = process2;
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
      const { _rec, process: process2 } = this;
      const { db, values: values2, state } = _rec;
      if (!values2._ent) {
        throw Major.fail("is required").setCol("_ent");
      }
      const _cols = getColsPriv(db, values2._ent);
      if (!_cols) {
        throw Major.fail("invalid").setCol("_ent");
      }
      for (const _col of _cols) {
        try {
          this._prepareCol(_col);
        } catch (err) {
          processFail(err, _col.values.name);
        }
      }
      if (state === "ready") {
        throwMajor2("blank");
      }
    }
    _prepareCol(_col) {
      const { _rec, force, input, output, pendings } = this;
      const { meta: metaRec, values: values2, state } = _rec;
      const { meta: metaCol, values: { name, formula, resetIf, noCache } } = _col;
      const isReal = input.hasOwnProperty(name);
      const isMeta = metaRec && metaCol && (metaCol === "numb" || metaRec !== "soft");
      output[name] = values2[name];
      if (isReal && state === "ready") {
        if (isMeta) {
          throwMinor("is meta");
        }
        if (formula) {
          throwMinor(`has formula`);
        }
      }
      if (formula && noCache) {
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
      const { process: process2, _rec, pendings, isChange } = this;
      for (const _col of pendings) {
        this.pull(_col);
      }
      return process2.isOk && isChange ? this.output : _rec.values;
    }
    pull(_col) {
      const { process: process2, _rec, pendings, output, input, changes } = this;
      const { state, current, before } = _rec;
      const { name, omitChange } = _col.values;
      if (pendings.has(_col)) {
        const { setter: setter2 } = _col.traits;
        pendings.delete(_col);
        try {
          setter2(current, output, input[name], state === "ready" ? before : void 0);
        } catch (err) {
          processFail(err, name);
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
    detach() {
      const { _rec } = this;
      delete this._rec;
      delete _rec.turn;
    }
  };
  var Record = class {
    constructor(values2) {
      Object.assign(this, values2);
    }
    toString() {
      return this.id;
    }
    toJSON() {
      return this.id;
    }
  };
  var RecordPrivate = class {
    constructor(db, values2) {
      this.state = "pending";
      const v = this.values = Object.assign({}, values2);
      v._ent = toId(v._ent);
      if (v._ent === "_cols") {
        v.ent = toId(v.ent);
      }
      this.meta = isMetaEnt(v._ent) ? v.meta : void 0;
      solids(this, {
        db,
        current: new Record(v),
        before: new Record()
      });
      recReg(this);
    }
    colAdd(_col) {
      const { db, current, before, state } = this;
      const { name, formula, noCache } = _col.current;
      const t = _col.traits;
      const isVirtual = formula && noCache;
      const prop = {
        enumerable: true,
        configurable: true,
        set: (_) => {
          throw Major.fail("For update use db.update(...) interface").setCol(name);
        }
      };
      if (isVirtual) {
        prop.get = (_) => t.getter(t.setter(current, this.values, this.values[name], this.state === "ready" ? before : void 0), this.state === "ready");
      } else {
        prop.get = (_) => t.getter(this.turn ? this.turn.pull(_col) : this.values[name], this);
      }
      Object.defineProperty(current, name, prop);
      if (!isVirtual) {
        prop.get = (_) => t.getter(this.values[name], this);
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
      const { db, state, values: values2 } = this;
      if (state !== "pending") {
        throwMajor2("record is not pending");
      }
      const cols = getColsPriv(db, values2._ent);
      if (cols) {
        for (const _col of cols) {
          this.colAdd(_col);
        }
      }
      return this;
    }
    init(process2) {
      const { state, values: values2 } = this;
      if (state !== "pending") {
        throwMajor2("record is not pending");
      }
      Turn.attach(process2, this, values2, true);
      this.state = "init";
      return this;
    }
    ready() {
      const { state, turn } = this;
      if (state !== "init") {
        throwMajor2("record is not init");
      }
      this.values = turn.execute();
      this.turn.detach();
      this.state = "ready";
      return this;
    }
    update(process2, values2, force = false) {
      if (this.state !== "ready") {
        throwMajor2("record is not ready");
      }
      this.values = Turn.attach(process2, this, values2, force).execute();
      if (this.turn.isChange) {
        colSet(this);
        syncIn(process2, this.current);
      }
      this.turn.detach();
    }
    remove(process2, force = false) {
      const { db, meta, current } = this;
      if (!force && meta) {
        throwMajor2("is meta");
      }
      this.state = "removed";
      syncOut(db, current, process2);
      recUnreg(this);
    }
  };
  var _records = /* @__PURE__ */ new WeakMap();
  var recReg = (_rec) => _records.set(_rec.current, _rec);
  var recUnreg = (_rec) => _records.delete(_rec.current);
  var recGetPriv = (db, any, throwError2 = true) => {
    const _p = _records.get(any);
    if (_p && _p.db === db) {
      return _p;
    }
    if (throwError2) {
      throwMajor2("is not record");
    }
    ;
  };
  var recAdd = (process2, values2) => {
    solid3(process2, "action", "add");
    const _rec = new RecordPrivate(process2.db, values2);
    _rec.colsInit().init(process2).ready();
    syncIn(process2, _rec.current);
  };
  var recRemove = (process2, record) => {
    solid3(process2, "action", "remove");
    recGetPriv(process2.db, record).remove(process2, false);
  };
  var _recUpdate = (process2, record, force = false) => {
    solid3(process2, "action", "update");
    recGetPriv(process2.db, record).update(process2, values, force);
  };
  var recSet = (process2, record, values2) => _recUpdate(process2, record, values2, true);
  var recUpdate = (process2, record, values2) => _recUpdate(process2, record, values2, false);
  var _recAddOrUpdate = (process2, values2, force = false) => {
    const { db } = process2;
    process2.action = "addOrUpdate";
    const _rec = new RecordPrivate(db, values2).colsInit().init(process2);
    const { _ent, id } = _rec.current;
    const brother = _chopGetRec(db, toId(_ent), id);
    if (brother) {
      solid3(process2, "action", "update");
      recGetPriv(db, brother).update(values2, ctx, force);
    } else {
      solid3(process2, "action", "add");
      _rec.ready();
      syncIn(process2, _rec.current);
    }
  };
  var recAddOrSet = (process2, values2) => _recAddOrUpdate(process2, values2, true);
  var recAddOrUpdate = (process2, values2) => _recAddOrUpdate(process2, values2, false);
  var entAdd = (process2, _rec) => {
    const { db, values: { _ent, id } } = _rec;
    if (_ent !== "_ents") {
      return;
    }
    db.add({ _ent: "_cols", ent: id, name: "_ent", type: "ref", ref: "_ents", meta: "numb", isReadonly: fceTrue, isRequired: fceTrue }, process2.context);
    db.add({ _ent: "_cols", ent: id, name: "id", type: "string", meta: "soft", isReadonly: fceTrue, isRequired: fceTrue }, process2.context);
  };
  var entRem = (_rec) => {
    const { db, values: values2 } = _rec;
    if (values2._ent !== "_ents") {
      return;
    }
    for (const _col of getColsPriv(db, values2.id)) {
      _col.remove(process.context, true);
    }
    ;
  };
  var DB = class extends Chop {
    constructor(id, opt = {}) {
      const { init } = opt;
      super(id, {
        getId: (rec) => toId(rec.id),
        getGroup: (rec) => toId(rec._ent),
        init: (process2) => {
          for (const _ent in metaData) {
            for (const id2 in metaData[_ent]) {
              const _rec = new RecordPrivate(this, { _ent, id: id2, ...metaData[_ent][id2] });
              syncIn(process2, _rec.current, true);
            }
            ;
          }
          for (const [_, rec] of _chopGetRecs(this, "_cols")) {
            const _rec = recGetPriv(this, rec);
            colSet(_rec);
          }
          const _recs = [];
          for (const [rec] of _chopGetAllRecs(this)) {
            const _rec = recGetPriv(this, rec);
            if (_rec.state === "pending") {
              _recs.push(_rec.init(process2));
            }
          }
          for (const _rec of _recs) {
            _rec.ready();
          }
        }
      });
      this.before((process2) => {
        const { action, record, isBatch } = process2;
        if (isBatch) {
          return;
        }
        const _rec = recGetPriv(this, record);
        const { _ent } = _rec.values;
        if (_ent == "_ents") {
          if (action === "remove") {
            entRem(process2, _rec);
          } else if (action === "add") {
            entAdd(process2, _rec);
          }
        } else if (_ent === "_cols") {
          if (action === "add" || action === "update") {
            colSet(_rec);
          } else if (action === "remove") {
            colRem(_rec);
          }
        }
      });
      const _p = vault.get(this);
      _p.colsByEnt = /* @__PURE__ */ new Map();
    }
    isRecord(any, throwError2 = false) {
      return !!recGetPriv(any, throwError2);
    }
    add(values2, context) {
      return processRun(this, context, arguments, recAdd);
    }
    addOrSet(values2, context) {
      return processRun(this, context, arguments, recAddOrSet);
    }
    addOrUpdate(values2, context) {
      return processRun(this, context, arguments, recAddOrUpdate);
    }
    set(record, values2, context) {
      return processRun(this, context, arguments, recSet);
    }
    update(record, values2, context) {
      return processRun(this, context, arguments, recUpdate);
    }
    remove(record, context) {
      return processRun(this, context, arguments, recRemove);
    }
  };

  // demo/frontend/src/index.js
  var socket = lookup2(`localhost:${info.port + 1}`);
  var bifrost = new ClientRouter(socket);
  var beam = window.beam = bifrost.createBeam("data");
  beam.get().then((records) => {
    const db = window.db = new DB("db", {
      init: (load, ctx2) => {
        for (const rec of records) {
          load(rec, ctx2);
        }
      }
    });
    console.log(db.reset("test"));
    db.after((process2) => {
      if (res) {
      }
    });
  });
})();
//# sourceMappingURL=index.js.map
