var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var _a;
import { S as SvelteComponent, i as init, s as safe_not_equal, k as element, l as claim_element, m as children, h as detach, n as attr, b as insert_hydration, C as noop$3, N as subscribe, q as text, r as claim_text, E as append_hydration, e as empty$1, O as destroy_each, a as space, c as claim_space, P as toggle_class, M as listen, u as set_data, Q as stop_propagation, L as set_input_value, R as update_keyed_each, T as run_all, v as binding_callbacks, U as destroy_block, x as create_component, K as head_selector, y as claim_component, z as mount_component, t as transition_out, d as check_outros, f as transition_in, A as destroy_component, o as onMount, V as globals, g as group_outros, W as is_function } from "./index-b3efc94e.js";
import { _ as __vitePreload } from "./preload-helper-f8376bb0.js";
const classLayout = "";
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var distExports = {};
var dist = {
  get exports() {
    return distExports;
  },
  set exports(v) {
    distExports = v;
  }
};
var Sister;
/**
* @link https://github.com/gajus/sister for the canonical source repository
* @license https://github.com/gajus/sister/blob/master/LICENSE BSD 3-Clause
*/
Sister = function() {
  var sister2 = {}, events = {};
  sister2.on = function(name, handler) {
    var listener = { name, handler };
    events[name] = events[name] || [];
    events[name].unshift(listener);
    return listener;
  };
  sister2.off = function(listener) {
    var index = events[listener.name].indexOf(listener);
    if (index !== -1) {
      events[listener.name].splice(index, 1);
    }
  };
  sister2.trigger = function(name, data) {
    var listeners = events[name], i;
    if (listeners) {
      i = listeners.length;
      while (i--) {
        listeners[i].handler(data);
      }
    }
  };
  return sister2;
};
var sister = Sister;
var loadYouTubeIframeApiExports = {};
var loadYouTubeIframeApi = {
  get exports() {
    return loadYouTubeIframeApiExports;
  },
  set exports(v) {
    loadYouTubeIframeApiExports = v;
  }
};
var loadScript = function load(src, opts, cb) {
  var head = document.head || document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  if (typeof opts === "function") {
    cb = opts;
    opts = {};
  }
  opts = opts || {};
  cb = cb || function() {
  };
  script.type = opts.type || "text/javascript";
  script.charset = opts.charset || "utf8";
  script.async = "async" in opts ? !!opts.async : true;
  script.src = src;
  if (opts.attrs) {
    setAttributes(script, opts.attrs);
  }
  if (opts.text) {
    script.text = "" + opts.text;
  }
  var onend = "onload" in script ? stdOnEnd : ieOnEnd;
  onend(script, cb);
  if (!script.onload) {
    stdOnEnd(script, cb);
  }
  head.appendChild(script);
};
function setAttributes(script, attrs) {
  for (var attr2 in attrs) {
    script.setAttribute(attr2, attrs[attr2]);
  }
}
function stdOnEnd(script, cb) {
  script.onload = function() {
    this.onerror = this.onload = null;
    cb(null, script);
  };
  script.onerror = function() {
    this.onerror = this.onload = null;
    cb(new Error("Failed to load " + this.src), script);
  };
}
function ieOnEnd(script, cb) {
  script.onreadystatechange = function() {
    if (this.readyState != "complete" && this.readyState != "loaded")
      return;
    this.onreadystatechange = null;
    cb(null, script);
  };
}
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _loadScript = loadScript;
  var _loadScript2 = _interopRequireDefault(_loadScript);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = function(emitter) {
    var iframeAPIReady = new Promise(function(resolve) {
      if (window.YT && window.YT.Player && window.YT.Player instanceof Function) {
        resolve(window.YT);
        return;
      } else {
        var protocol = window.location.protocol === "http:" ? "http:" : "https:";
        (0, _loadScript2.default)(protocol + "//www.youtube.com/iframe_api", function(error) {
          if (error) {
            emitter.trigger("error", error);
          }
        });
      }
      var previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function() {
        if (previous) {
          previous();
        }
        resolve(window.YT);
      };
    });
    return iframeAPIReady;
  };
  module.exports = exports["default"];
})(loadYouTubeIframeApi, loadYouTubeIframeApiExports);
var YouTubePlayerExports = {};
var YouTubePlayer = {
  get exports() {
    return YouTubePlayerExports;
  },
  set exports(v) {
    YouTubePlayerExports = v;
  }
};
var browserExports = {};
var browser = {
  get exports() {
    return browserExports;
  },
  set exports(v) {
    browserExports = v;
  }
};
var debugExports = {};
var debug = {
  get exports() {
    return debugExports;
  },
  set exports(v) {
    debugExports = v;
  }
};
var s$1 = 1e3;
var m = s$1 * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;
var ms = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === "string" && val.length > 0) {
    return parse$2(val);
  } else if (type === "number" && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
  );
};
function parse$2(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match2 = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match2) {
    return;
  }
  var n2 = parseFloat(match2[1]);
  var type = (match2[2] || "ms").toLowerCase();
  switch (type) {
    case "years":
    case "year":
    case "yrs":
    case "yr":
    case "y":
      return n2 * y;
    case "days":
    case "day":
    case "d":
      return n2 * d;
    case "hours":
    case "hour":
    case "hrs":
    case "hr":
    case "h":
      return n2 * h;
    case "minutes":
    case "minute":
    case "mins":
    case "min":
    case "m":
      return n2 * m;
    case "seconds":
    case "second":
    case "secs":
    case "sec":
    case "s":
      return n2 * s$1;
    case "milliseconds":
    case "millisecond":
    case "msecs":
    case "msec":
    case "ms":
      return n2;
    default:
      return void 0;
  }
}
function fmtShort(ms2) {
  if (ms2 >= d) {
    return Math.round(ms2 / d) + "d";
  }
  if (ms2 >= h) {
    return Math.round(ms2 / h) + "h";
  }
  if (ms2 >= m) {
    return Math.round(ms2 / m) + "m";
  }
  if (ms2 >= s$1) {
    return Math.round(ms2 / s$1) + "s";
  }
  return ms2 + "ms";
}
function fmtLong(ms2) {
  return plural(ms2, d, "day") || plural(ms2, h, "hour") || plural(ms2, m, "minute") || plural(ms2, s$1, "second") || ms2 + " ms";
}
function plural(ms2, n2, name) {
  if (ms2 < n2) {
    return;
  }
  if (ms2 < n2 * 1.5) {
    return Math.floor(ms2 / n2) + " " + name;
  }
  return Math.ceil(ms2 / n2) + " " + name + "s";
}
(function(module, exports) {
  exports = module.exports = createDebug.debug = createDebug["default"] = createDebug;
  exports.coerce = coerce;
  exports.disable = disable;
  exports.enable = enable;
  exports.enabled = enabled;
  exports.humanize = ms;
  exports.names = [];
  exports.skips = [];
  exports.formatters = {};
  var prevTime;
  function selectColor(namespace) {
    var hash = 0, i;
    for (i in namespace) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0;
    }
    return exports.colors[Math.abs(hash) % exports.colors.length];
  }
  function createDebug(namespace) {
    function debug2() {
      if (!debug2.enabled)
        return;
      var self2 = debug2;
      var curr = +new Date();
      var ms2 = curr - (prevTime || curr);
      self2.diff = ms2;
      self2.prev = prevTime;
      self2.curr = curr;
      prevTime = curr;
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      args[0] = exports.coerce(args[0]);
      if ("string" !== typeof args[0]) {
        args.unshift("%O");
      }
      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match2, format) {
        if (match2 === "%%")
          return match2;
        index++;
        var formatter = exports.formatters[format];
        if ("function" === typeof formatter) {
          var val = args[index];
          match2 = formatter.call(self2, val);
          args.splice(index, 1);
          index--;
        }
        return match2;
      });
      exports.formatArgs.call(self2, args);
      var logFn = debug2.log || exports.log || console.log.bind(console);
      logFn.apply(self2, args);
    }
    debug2.namespace = namespace;
    debug2.enabled = exports.enabled(namespace);
    debug2.useColors = exports.useColors();
    debug2.color = selectColor(namespace);
    if ("function" === typeof exports.init) {
      exports.init(debug2);
    }
    return debug2;
  }
  function enable(namespaces) {
    exports.save(namespaces);
    exports.names = [];
    exports.skips = [];
    var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
    var len = split.length;
    for (var i = 0; i < len; i++) {
      if (!split[i])
        continue;
      namespaces = split[i].replace(/\*/g, ".*?");
      if (namespaces[0] === "-") {
        exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
      } else {
        exports.names.push(new RegExp("^" + namespaces + "$"));
      }
    }
  }
  function disable() {
    exports.enable("");
  }
  function enabled(name) {
    var i, len;
    for (i = 0, len = exports.skips.length; i < len; i++) {
      if (exports.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = exports.names.length; i < len; i++) {
      if (exports.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }
  function coerce(val) {
    if (val instanceof Error)
      return val.stack || val.message;
    return val;
  }
})(debug, debugExports);
(function(module, exports) {
  exports = module.exports = debugExports;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load2;
  exports.useColors = useColors;
  exports.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
  exports.colors = [
    "lightseagreen",
    "forestgreen",
    "goldenrod",
    "dodgerblue",
    "darkorchid",
    "crimson"
  ];
  function useColors() {
    if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
      return true;
    }
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
    typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
    typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  exports.formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (err) {
      return "[UnexpectedJSONParseError]: " + err.message;
    }
  };
  function formatArgs(args) {
    var useColors2 = this.useColors;
    args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports.humanize(this.diff);
    if (!useColors2)
      return;
    var c2 = "color: " + this.color;
    args.splice(1, 0, c2, "color: inherit");
    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function(match2) {
      if ("%%" === match2)
        return;
      index++;
      if ("%c" === match2) {
        lastC = index;
      }
    });
    args.splice(lastC, 0, c2);
  }
  function log() {
    return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
  }
  function save(namespaces) {
    try {
      if (null == namespaces) {
        exports.storage.removeItem("debug");
      } else {
        exports.storage.debug = namespaces;
      }
    } catch (e) {
    }
  }
  function load2() {
    var r;
    try {
      r = exports.storage.debug;
    } catch (e) {
    }
    if (!r && typeof process !== "undefined" && "env" in process) {
      r = {}.DEBUG;
    }
    return r;
  }
  exports.enable(load2());
  function localstorage() {
    try {
      return window.localStorage;
    } catch (e) {
    }
  }
})(browser, browserExports);
var functionNamesExports = {};
var functionNames = {
  get exports() {
    return functionNamesExports;
  },
  set exports(v) {
    functionNamesExports = v;
  }
};
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ["cueVideoById", "loadVideoById", "cueVideoByUrl", "loadVideoByUrl", "playVideo", "pauseVideo", "stopVideo", "getVideoLoadedFraction", "cuePlaylist", "loadPlaylist", "nextVideo", "previousVideo", "playVideoAt", "setShuffle", "setLoop", "getPlaylist", "getPlaylistIndex", "setOption", "mute", "unMute", "isMuted", "setVolume", "getVolume", "seekTo", "getPlayerState", "getPlaybackRate", "setPlaybackRate", "getAvailablePlaybackRates", "getPlaybackQuality", "setPlaybackQuality", "getAvailableQualityLevels", "getCurrentTime", "getDuration", "removeEventListener", "getVideoUrl", "getVideoEmbedCode", "getOptions", "getOption", "addEventListener", "destroy", "setSize", "getIframe"];
  module.exports = exports["default"];
})(functionNames, functionNamesExports);
var eventNamesExports = {};
var eventNames = {
  get exports() {
    return eventNamesExports;
  },
  set exports(v) {
    eventNamesExports = v;
  }
};
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ["ready", "stateChange", "playbackQualityChange", "playbackRateChange", "error", "apiChange", "volumeChange"];
  module.exports = exports["default"];
})(eventNames, eventNamesExports);
var FunctionStateMapExports = {};
var FunctionStateMap = {
  get exports() {
    return FunctionStateMapExports;
  },
  set exports(v) {
    FunctionStateMapExports = v;
  }
};
var PlayerStatesExports = {};
var PlayerStates$1 = {
  get exports() {
    return PlayerStatesExports;
  },
  set exports(v) {
    PlayerStatesExports = v;
  }
};
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    BUFFERING: 3,
    ENDED: 0,
    PAUSED: 2,
    PLAYING: 1,
    UNSTARTED: -1,
    VIDEO_CUED: 5
  };
  module.exports = exports["default"];
})(PlayerStates$1, PlayerStatesExports);
const PlayerStates = /* @__PURE__ */ getDefaultExportFromCjs(PlayerStatesExports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _PlayerStates = PlayerStatesExports;
  var _PlayerStates2 = _interopRequireDefault(_PlayerStates);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports.default = {
    pauseVideo: {
      acceptableStates: [_PlayerStates2.default.ENDED, _PlayerStates2.default.PAUSED],
      stateChangeRequired: false
    },
    playVideo: {
      acceptableStates: [_PlayerStates2.default.ENDED, _PlayerStates2.default.PLAYING],
      stateChangeRequired: false
    },
    seekTo: {
      acceptableStates: [_PlayerStates2.default.ENDED, _PlayerStates2.default.PLAYING, _PlayerStates2.default.PAUSED],
      stateChangeRequired: true,
      // TRICKY: `seekTo` may not cause a state change if no buffering is
      // required.
      timeout: 3e3
    }
  };
  module.exports = exports["default"];
})(FunctionStateMap, FunctionStateMapExports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _debug = browserExports;
  var _debug2 = _interopRequireDefault(_debug);
  var _functionNames = functionNamesExports;
  var _functionNames2 = _interopRequireDefault(_functionNames);
  var _eventNames = eventNamesExports;
  var _eventNames2 = _interopRequireDefault(_eventNames);
  var _FunctionStateMap = FunctionStateMapExports;
  var _FunctionStateMap2 = _interopRequireDefault(_FunctionStateMap);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var debug2 = (0, _debug2.default)("youtube-player");
  var YouTubePlayer2 = {};
  YouTubePlayer2.proxyEvents = function(emitter) {
    var events = {};
    var _loop = function _loop2(eventName2) {
      var onEventName = "on" + eventName2.slice(0, 1).toUpperCase() + eventName2.slice(1);
      events[onEventName] = function(event) {
        debug2('event "%s"', onEventName, event);
        emitter.trigger(eventName2, event);
      };
    };
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = void 0;
    try {
      for (var _iterator = _eventNames2.default[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var eventName = _step.value;
        _loop(eventName);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
    return events;
  };
  YouTubePlayer2.promisifyPlayer = function(playerAPIReady) {
    var strictState = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var functions = {};
    var _loop2 = function _loop22(functionName2) {
      if (strictState && _FunctionStateMap2.default[functionName2]) {
        functions[functionName2] = function() {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return playerAPIReady.then(function(player) {
            var stateInfo = _FunctionStateMap2.default[functionName2];
            var playerState = player.getPlayerState();
            var value = player[functionName2].apply(player, args);
            if (stateInfo.stateChangeRequired || // eslint-disable-next-line no-extra-parens
            Array.isArray(stateInfo.acceptableStates) && stateInfo.acceptableStates.indexOf(playerState) === -1) {
              return new Promise(function(resolve) {
                var onPlayerStateChange = function onPlayerStateChange2() {
                  var playerStateAfterChange = player.getPlayerState();
                  var timeout = void 0;
                  if (typeof stateInfo.timeout === "number") {
                    timeout = setTimeout(function() {
                      player.removeEventListener("onStateChange", onPlayerStateChange2);
                      resolve();
                    }, stateInfo.timeout);
                  }
                  if (Array.isArray(stateInfo.acceptableStates) && stateInfo.acceptableStates.indexOf(playerStateAfterChange) !== -1) {
                    player.removeEventListener("onStateChange", onPlayerStateChange2);
                    clearTimeout(timeout);
                    resolve();
                  }
                };
                player.addEventListener("onStateChange", onPlayerStateChange);
              }).then(function() {
                return value;
              });
            }
            return value;
          });
        };
      } else {
        functions[functionName2] = function() {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          return playerAPIReady.then(function(player) {
            return player[functionName2].apply(player, args);
          });
        };
      }
    };
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = void 0;
    try {
      for (var _iterator2 = _functionNames2.default[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var functionName = _step2.value;
        _loop2(functionName);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
    return functions;
  };
  exports.default = YouTubePlayer2;
  module.exports = exports["default"];
})(YouTubePlayer, YouTubePlayerExports);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
    return typeof obj;
  } : function(obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };
  var _sister = sister;
  var _sister2 = _interopRequireDefault(_sister);
  var _loadYouTubeIframeApi = loadYouTubeIframeApiExports;
  var _loadYouTubeIframeApi2 = _interopRequireDefault(_loadYouTubeIframeApi);
  var _YouTubePlayer = YouTubePlayerExports;
  var _YouTubePlayer2 = _interopRequireDefault(_YouTubePlayer);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var youtubeIframeAPI = void 0;
  exports.default = function(maybeElementId) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var strictState = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    var emitter = (0, _sister2.default)();
    if (!youtubeIframeAPI) {
      youtubeIframeAPI = (0, _loadYouTubeIframeApi2.default)(emitter);
    }
    if (options.events) {
      throw new Error("Event handlers cannot be overwritten.");
    }
    if (typeof maybeElementId === "string" && !document.getElementById(maybeElementId)) {
      throw new Error('Element "' + maybeElementId + '" does not exist.');
    }
    options.events = _YouTubePlayer2.default.proxyEvents(emitter);
    var playerAPIReady = new Promise(function(resolve) {
      if ((typeof maybeElementId === "undefined" ? "undefined" : _typeof(maybeElementId)) === "object" && maybeElementId.playVideo instanceof Function) {
        var player = maybeElementId;
        resolve(player);
      } else {
        youtubeIframeAPI.then(function(YT) {
          var player2 = new YT.Player(maybeElementId, options);
          emitter.on("ready", function() {
            resolve(player2);
          });
          return null;
        });
      }
    });
    var playerApi = _YouTubePlayer2.default.promisifyPlayer(playerAPIReady, strictState);
    playerApi.on = emitter.on;
    playerApi.off = emitter.off;
    return playerApi;
  };
  module.exports = exports["default"];
})(dist, distExports);
const PlayerFactory = /* @__PURE__ */ getDefaultExportFromCjs(distExports);
var extendStatics = function(d2, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
    d3.__proto__ = b2;
  } || function(d3, b2) {
    for (var p in b2)
      if (Object.prototype.hasOwnProperty.call(b2, p))
        d3[p] = b2[p];
  };
  return extendStatics(d2, b);
};
function __extends(d2, b) {
  if (typeof b !== "function" && b !== null)
    throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d2, b);
  function __() {
    this.constructor = d2;
  }
  d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y2, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n2) {
    return function(v) {
      return step([n2, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (g && (g = 0, op[0] && (_ = 0)), _)
      try {
        if (f = 1, y2 && (t = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t = y2["return"]) && t.call(y2), 0) : y2.next) && !(t = t.call(y2, op[1])).done)
          return t;
        if (y2 = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y2 = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y2 = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __values(o) {
  var s2 = typeof Symbol === "function" && Symbol.iterator, m2 = s2 && o[s2], i = 0;
  if (m2)
    return m2.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s2 ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n2) {
  var m2 = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m2)
    return o;
  var i = m2.call(o), r, ar = [], e;
  try {
    while ((n2 === void 0 || n2-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = { error };
  } finally {
    try {
      if (r && !r.done && (m2 = i["return"]))
        m2.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spreadArray(to, from2, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l2 = from2.length, ar; i < l2; i++) {
      if (ar || !(i in from2)) {
        if (!ar)
          ar = Array.prototype.slice.call(from2, 0, i);
        ar[i] = from2[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from2));
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n2) {
    if (g[n2])
      i[n2] = function(v) {
        return new Promise(function(a, b) {
          q.push([n2, v, a, b]) > 1 || resume(n2, v);
        });
      };
  }
  function resume(n2, v) {
    try {
      step(g[n2](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m2 = o[Symbol.asyncIterator], i;
  return m2 ? m2.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n2) {
    i[n2] = o[n2] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n2](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d2, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d2 });
    }, reject);
  }
}
function isFunction(value) {
  return typeof value === "function";
}
function createErrorClass(createImpl) {
  var _super = function(instance2) {
    Error.call(instance2);
    instance2.stack = new Error().stack;
  };
  var ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
}
var UnsubscriptionError = createErrorClass(function(_super) {
  return function UnsubscriptionErrorImpl(errors) {
    _super(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
      return i + 1 + ") " + err.toString();
    }).join("\n  ") : "";
    this.name = "UnsubscriptionError";
    this.errors = errors;
  };
});
function arrRemove(arr, item) {
  if (arr) {
    var index = arr.indexOf(item);
    0 <= index && arr.splice(index, 1);
  }
}
var Subscription = function() {
  function Subscription2(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._finalizers = null;
  }
  Subscription2.prototype.unsubscribe = function() {
    var e_1, _a2, e_2, _b;
    var errors;
    if (!this.closed) {
      this.closed = true;
      var _parentage = this._parentage;
      if (_parentage) {
        this._parentage = null;
        if (Array.isArray(_parentage)) {
          try {
            for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
              var parent_1 = _parentage_1_1.value;
              parent_1.remove(this);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_parentage_1_1 && !_parentage_1_1.done && (_a2 = _parentage_1.return))
                _a2.call(_parentage_1);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        } else {
          _parentage.remove(this);
        }
      }
      var initialFinalizer = this.initialTeardown;
      if (isFunction(initialFinalizer)) {
        try {
          initialFinalizer();
        } catch (e) {
          errors = e instanceof UnsubscriptionError ? e.errors : [e];
        }
      }
      var _finalizers = this._finalizers;
      if (_finalizers) {
        this._finalizers = null;
        try {
          for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
            var finalizer = _finalizers_1_1.value;
            try {
              execFinalizer(finalizer);
            } catch (err) {
              errors = errors !== null && errors !== void 0 ? errors : [];
              if (err instanceof UnsubscriptionError) {
                errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
              } else {
                errors.push(err);
              }
            }
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return))
              _b.call(_finalizers_1);
          } finally {
            if (e_2)
              throw e_2.error;
          }
        }
      }
      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    }
  };
  Subscription2.prototype.add = function(teardown) {
    var _a2;
    if (teardown && teardown !== this) {
      if (this.closed) {
        execFinalizer(teardown);
      } else {
        if (teardown instanceof Subscription2) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }
          teardown._addParent(this);
        }
        (this._finalizers = (_a2 = this._finalizers) !== null && _a2 !== void 0 ? _a2 : []).push(teardown);
      }
    }
  };
  Subscription2.prototype._hasParent = function(parent) {
    var _parentage = this._parentage;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  };
  Subscription2.prototype._addParent = function(parent) {
    var _parentage = this._parentage;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  };
  Subscription2.prototype._removeParent = function(parent) {
    var _parentage = this._parentage;
    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      arrRemove(_parentage, parent);
    }
  };
  Subscription2.prototype.remove = function(teardown) {
    var _finalizers = this._finalizers;
    _finalizers && arrRemove(_finalizers, teardown);
    if (teardown instanceof Subscription2) {
      teardown._removeParent(this);
    }
  };
  Subscription2.EMPTY = function() {
    var empty2 = new Subscription2();
    empty2.closed = true;
    return empty2;
  }();
  return Subscription2;
}();
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
  return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
}
function execFinalizer(finalizer) {
  if (isFunction(finalizer)) {
    finalizer();
  } else {
    finalizer.unsubscribe();
  }
}
var config = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false
};
var timeoutProvider = {
  setTimeout: function(handler, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var delegate = timeoutProvider.delegate;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
      return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
    }
    return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
  },
  clearTimeout: function(handle) {
    var delegate = timeoutProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
  },
  delegate: void 0
};
function reportUnhandledError(err) {
  timeoutProvider.setTimeout(function() {
    var onUnhandledError = config.onUnhandledError;
    if (onUnhandledError) {
      onUnhandledError(err);
    } else {
      throw err;
    }
  });
}
function noop$2() {
}
var COMPLETE_NOTIFICATION = function() {
  return createNotification("C", void 0, void 0);
}();
function errorNotification(error) {
  return createNotification("E", void 0, error);
}
function nextNotification(value) {
  return createNotification("N", value, void 0);
}
function createNotification(kind, value, error) {
  return {
    kind,
    value,
    error
  };
}
var context = null;
function errorContext(cb) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    var isRoot = !context;
    if (isRoot) {
      context = { errorThrown: false, error: null };
    }
    cb();
    if (isRoot) {
      var _a2 = context, errorThrown = _a2.errorThrown, error = _a2.error;
      context = null;
      if (errorThrown) {
        throw error;
      }
    }
  } else {
    cb();
  }
}
function captureError(err) {
  if (config.useDeprecatedSynchronousErrorHandling && context) {
    context.errorThrown = true;
    context.error = err;
  }
}
var Subscriber = function(_super) {
  __extends(Subscriber2, _super);
  function Subscriber2(destination) {
    var _this = _super.call(this) || this;
    _this.isStopped = false;
    if (destination) {
      _this.destination = destination;
      if (isSubscription(destination)) {
        destination.add(_this);
      }
    } else {
      _this.destination = EMPTY_OBSERVER;
    }
    return _this;
  }
  Subscriber2.create = function(next, error, complete) {
    return new SafeSubscriber(next, error, complete);
  };
  Subscriber2.prototype.next = function(value) {
    if (this.isStopped) {
      handleStoppedNotification(nextNotification(value), this);
    } else {
      this._next(value);
    }
  };
  Subscriber2.prototype.error = function(err) {
    if (this.isStopped) {
      handleStoppedNotification(errorNotification(err), this);
    } else {
      this.isStopped = true;
      this._error(err);
    }
  };
  Subscriber2.prototype.complete = function() {
    if (this.isStopped) {
      handleStoppedNotification(COMPLETE_NOTIFICATION, this);
    } else {
      this.isStopped = true;
      this._complete();
    }
  };
  Subscriber2.prototype.unsubscribe = function() {
    if (!this.closed) {
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
      this.destination = null;
    }
  };
  Subscriber2.prototype._next = function(value) {
    this.destination.next(value);
  };
  Subscriber2.prototype._error = function(err) {
    try {
      this.destination.error(err);
    } finally {
      this.unsubscribe();
    }
  };
  Subscriber2.prototype._complete = function() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  };
  return Subscriber2;
}(Subscription);
var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
  return _bind.call(fn, thisArg);
}
var ConsumerObserver = function() {
  function ConsumerObserver2(partialObserver) {
    this.partialObserver = partialObserver;
  }
  ConsumerObserver2.prototype.next = function(value) {
    var partialObserver = this.partialObserver;
    if (partialObserver.next) {
      try {
        partialObserver.next(value);
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  ConsumerObserver2.prototype.error = function(err) {
    var partialObserver = this.partialObserver;
    if (partialObserver.error) {
      try {
        partialObserver.error(err);
      } catch (error) {
        handleUnhandledError(error);
      }
    } else {
      handleUnhandledError(err);
    }
  };
  ConsumerObserver2.prototype.complete = function() {
    var partialObserver = this.partialObserver;
    if (partialObserver.complete) {
      try {
        partialObserver.complete();
      } catch (error) {
        handleUnhandledError(error);
      }
    }
  };
  return ConsumerObserver2;
}();
var SafeSubscriber = function(_super) {
  __extends(SafeSubscriber2, _super);
  function SafeSubscriber2(observerOrNext, error, complete) {
    var _this = _super.call(this) || this;
    var partialObserver;
    if (isFunction(observerOrNext) || !observerOrNext) {
      partialObserver = {
        next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
        error: error !== null && error !== void 0 ? error : void 0,
        complete: complete !== null && complete !== void 0 ? complete : void 0
      };
    } else {
      var context_1;
      if (_this && config.useDeprecatedNextContext) {
        context_1 = Object.create(observerOrNext);
        context_1.unsubscribe = function() {
          return _this.unsubscribe();
        };
        partialObserver = {
          next: observerOrNext.next && bind(observerOrNext.next, context_1),
          error: observerOrNext.error && bind(observerOrNext.error, context_1),
          complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
        };
      } else {
        partialObserver = observerOrNext;
      }
    }
    _this.destination = new ConsumerObserver(partialObserver);
    return _this;
  }
  return SafeSubscriber2;
}(Subscriber);
function handleUnhandledError(error) {
  if (config.useDeprecatedSynchronousErrorHandling) {
    captureError(error);
  } else {
    reportUnhandledError(error);
  }
}
function defaultErrorHandler(err) {
  throw err;
}
function handleStoppedNotification(notification, subscriber) {
  var onStoppedNotification = config.onStoppedNotification;
  onStoppedNotification && timeoutProvider.setTimeout(function() {
    return onStoppedNotification(notification, subscriber);
  });
}
var EMPTY_OBSERVER = {
  closed: true,
  next: noop$2,
  error: defaultErrorHandler,
  complete: noop$2
};
var observable = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();
function identity(x) {
  return x;
}
function pipe() {
  var fns = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    fns[_i] = arguments[_i];
  }
  return pipeFromArray(fns);
}
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return identity;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return function piped(input) {
    return fns.reduce(function(prev, fn) {
      return fn(prev);
    }, input);
  };
}
var Observable = function() {
  function Observable2(subscribe2) {
    if (subscribe2) {
      this._subscribe = subscribe2;
    }
  }
  Observable2.prototype.lift = function(operator) {
    var observable2 = new Observable2();
    observable2.source = this;
    observable2.operator = operator;
    return observable2;
  };
  Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
    var _this = this;
    var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
    errorContext(function() {
      var _a2 = _this, operator = _a2.operator, source = _a2.source;
      subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
    });
    return subscriber;
  };
  Observable2.prototype._trySubscribe = function(sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  };
  Observable2.prototype.forEach = function(next, promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var subscriber = new SafeSubscriber({
        next: function(value) {
          try {
            next(value);
          } catch (err) {
            reject(err);
            subscriber.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
      _this.subscribe(subscriber);
    });
  };
  Observable2.prototype._subscribe = function(subscriber) {
    var _a2;
    return (_a2 = this.source) === null || _a2 === void 0 ? void 0 : _a2.subscribe(subscriber);
  };
  Observable2.prototype[observable] = function() {
    return this;
  };
  Observable2.prototype.pipe = function() {
    var operations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }
    return pipeFromArray(operations)(this);
  };
  Observable2.prototype.toPromise = function(promiseCtor) {
    var _this = this;
    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x) {
        return value = x;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  };
  Observable2.create = function(subscribe2) {
    return new Observable2(subscribe2);
  };
  return Observable2;
}();
function getPromiseCtor(promiseCtor) {
  var _a2;
  return (_a2 = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a2 !== void 0 ? _a2 : Promise;
}
function isObserver(value) {
  return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
  return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
}
function hasLift(source) {
  return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init2) {
  return function(source) {
    if (hasLift(source)) {
      return source.lift(function(liftedSource) {
        try {
          return init2(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
  return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = function(_super) {
  __extends(OperatorSubscriber2, _super);
  function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
    var _this = _super.call(this, destination) || this;
    _this.onFinalize = onFinalize;
    _this.shouldUnsubscribe = shouldUnsubscribe;
    _this._next = onNext ? function(value) {
      try {
        onNext(value);
      } catch (err) {
        destination.error(err);
      }
    } : _super.prototype._next;
    _this._error = onError ? function(err) {
      try {
        onError(err);
      } catch (err2) {
        destination.error(err2);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._error;
    _this._complete = onComplete ? function() {
      try {
        onComplete();
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._complete;
    return _this;
  }
  OperatorSubscriber2.prototype.unsubscribe = function() {
    var _a2;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      var closed_1 = this.closed;
      _super.prototype.unsubscribe.call(this);
      !closed_1 && ((_a2 = this.onFinalize) === null || _a2 === void 0 ? void 0 : _a2.call(this));
    }
  };
  return OperatorSubscriber2;
}(Subscriber);
var ObjectUnsubscribedError = createErrorClass(function(_super) {
  return function ObjectUnsubscribedErrorImpl() {
    _super(this);
    this.name = "ObjectUnsubscribedError";
    this.message = "object unsubscribed";
  };
});
var Subject = function(_super) {
  __extends(Subject2, _super);
  function Subject2() {
    var _this = _super.call(this) || this;
    _this.closed = false;
    _this.currentObservers = null;
    _this.observers = [];
    _this.isStopped = false;
    _this.hasError = false;
    _this.thrownError = null;
    return _this;
  }
  Subject2.prototype.lift = function(operator) {
    var subject = new AnonymousSubject(this, this);
    subject.operator = operator;
    return subject;
  };
  Subject2.prototype._throwIfClosed = function() {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
  };
  Subject2.prototype.next = function(value) {
    var _this = this;
    errorContext(function() {
      var e_1, _a2;
      _this._throwIfClosed();
      if (!_this.isStopped) {
        if (!_this.currentObservers) {
          _this.currentObservers = Array.from(_this.observers);
        }
        try {
          for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
            var observer = _c.value;
            observer.next(value);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a2 = _b.return))
              _a2.call(_b);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
      }
    });
  };
  Subject2.prototype.error = function(err) {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.hasError = _this.isStopped = true;
        _this.thrownError = err;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().error(err);
        }
      }
    });
  };
  Subject2.prototype.complete = function() {
    var _this = this;
    errorContext(function() {
      _this._throwIfClosed();
      if (!_this.isStopped) {
        _this.isStopped = true;
        var observers = _this.observers;
        while (observers.length) {
          observers.shift().complete();
        }
      }
    });
  };
  Subject2.prototype.unsubscribe = function() {
    this.isStopped = this.closed = true;
    this.observers = this.currentObservers = null;
  };
  Object.defineProperty(Subject2.prototype, "observed", {
    get: function() {
      var _a2;
      return ((_a2 = this.observers) === null || _a2 === void 0 ? void 0 : _a2.length) > 0;
    },
    enumerable: false,
    configurable: true
  });
  Subject2.prototype._trySubscribe = function(subscriber) {
    this._throwIfClosed();
    return _super.prototype._trySubscribe.call(this, subscriber);
  };
  Subject2.prototype._subscribe = function(subscriber) {
    this._throwIfClosed();
    this._checkFinalizedStatuses(subscriber);
    return this._innerSubscribe(subscriber);
  };
  Subject2.prototype._innerSubscribe = function(subscriber) {
    var _this = this;
    var _a2 = this, hasError = _a2.hasError, isStopped = _a2.isStopped, observers = _a2.observers;
    if (hasError || isStopped) {
      return EMPTY_SUBSCRIPTION;
    }
    this.currentObservers = null;
    observers.push(subscriber);
    return new Subscription(function() {
      _this.currentObservers = null;
      arrRemove(observers, subscriber);
    });
  };
  Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
    var _a2 = this, hasError = _a2.hasError, thrownError = _a2.thrownError, isStopped = _a2.isStopped;
    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped) {
      subscriber.complete();
    }
  };
  Subject2.prototype.asObservable = function() {
    var observable2 = new Observable();
    observable2.source = this;
    return observable2;
  };
  Subject2.create = function(destination, source) {
    return new AnonymousSubject(destination, source);
  };
  return Subject2;
}(Observable);
var AnonymousSubject = function(_super) {
  __extends(AnonymousSubject2, _super);
  function AnonymousSubject2(destination, source) {
    var _this = _super.call(this) || this;
    _this.destination = destination;
    _this.source = source;
    return _this;
  }
  AnonymousSubject2.prototype.next = function(value) {
    var _a2, _b;
    (_b = (_a2 = this.destination) === null || _a2 === void 0 ? void 0 : _a2.next) === null || _b === void 0 ? void 0 : _b.call(_a2, value);
  };
  AnonymousSubject2.prototype.error = function(err) {
    var _a2, _b;
    (_b = (_a2 = this.destination) === null || _a2 === void 0 ? void 0 : _a2.error) === null || _b === void 0 ? void 0 : _b.call(_a2, err);
  };
  AnonymousSubject2.prototype.complete = function() {
    var _a2, _b;
    (_b = (_a2 = this.destination) === null || _a2 === void 0 ? void 0 : _a2.complete) === null || _b === void 0 ? void 0 : _b.call(_a2);
  };
  AnonymousSubject2.prototype._subscribe = function(subscriber) {
    var _a2, _b;
    return (_b = (_a2 = this.source) === null || _a2 === void 0 ? void 0 : _a2.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
  };
  return AnonymousSubject2;
}(Subject);
var dateTimestampProvider = {
  now: function() {
    return (dateTimestampProvider.delegate || Date).now();
  },
  delegate: void 0
};
var Action = function(_super) {
  __extends(Action2, _super);
  function Action2(scheduler, work) {
    return _super.call(this) || this;
  }
  Action2.prototype.schedule = function(state, delay) {
    return this;
  };
  return Action2;
}(Subscription);
var intervalProvider = {
  setInterval: function(handler, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var delegate = intervalProvider.delegate;
    if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
      return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout], __read(args)));
    }
    return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
  },
  clearInterval: function(handle) {
    var delegate = intervalProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
  },
  delegate: void 0
};
var AsyncAction = function(_super) {
  __extends(AsyncAction2, _super);
  function AsyncAction2(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;
    _this.scheduler = scheduler;
    _this.work = work;
    _this.pending = false;
    return _this;
  }
  AsyncAction2.prototype.schedule = function(state, delay) {
    var _a2;
    if (delay === void 0) {
      delay = 0;
    }
    if (this.closed) {
      return this;
    }
    this.state = state;
    var id = this.id;
    var scheduler = this.scheduler;
    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, delay);
    }
    this.pending = true;
    this.delay = delay;
    this.id = (_a2 = this.id) !== null && _a2 !== void 0 ? _a2 : this.requestAsyncId(scheduler, this.id, delay);
    return this;
  };
  AsyncAction2.prototype.requestAsyncId = function(scheduler, _id, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
  };
  AsyncAction2.prototype.recycleAsyncId = function(_scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    if (delay != null && this.delay === delay && this.pending === false) {
      return id;
    }
    if (id != null) {
      intervalProvider.clearInterval(id);
    }
    return void 0;
  };
  AsyncAction2.prototype.execute = function(state, delay) {
    if (this.closed) {
      return new Error("executing a cancelled action");
    }
    this.pending = false;
    var error = this._execute(state, delay);
    if (error) {
      return error;
    } else if (this.pending === false && this.id != null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
    }
  };
  AsyncAction2.prototype._execute = function(state, _delay) {
    var errored = false;
    var errorValue;
    try {
      this.work(state);
    } catch (e) {
      errored = true;
      errorValue = e ? e : new Error("Scheduled action threw falsy error");
    }
    if (errored) {
      this.unsubscribe();
      return errorValue;
    }
  };
  AsyncAction2.prototype.unsubscribe = function() {
    if (!this.closed) {
      var _a2 = this, id = _a2.id, scheduler = _a2.scheduler;
      var actions = scheduler.actions;
      this.work = this.state = this.scheduler = null;
      this.pending = false;
      arrRemove(actions, this);
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }
      this.delay = null;
      _super.prototype.unsubscribe.call(this);
    }
  };
  return AsyncAction2;
}(Action);
var Scheduler = function() {
  function Scheduler2(schedulerActionCtor, now2) {
    if (now2 === void 0) {
      now2 = Scheduler2.now;
    }
    this.schedulerActionCtor = schedulerActionCtor;
    this.now = now2;
  }
  Scheduler2.prototype.schedule = function(work, delay, state) {
    if (delay === void 0) {
      delay = 0;
    }
    return new this.schedulerActionCtor(this, work).schedule(state, delay);
  };
  Scheduler2.now = dateTimestampProvider.now;
  return Scheduler2;
}();
var AsyncScheduler = function(_super) {
  __extends(AsyncScheduler2, _super);
  function AsyncScheduler2(SchedulerAction, now2) {
    if (now2 === void 0) {
      now2 = Scheduler.now;
    }
    var _this = _super.call(this, SchedulerAction, now2) || this;
    _this.actions = [];
    _this._active = false;
    return _this;
  }
  AsyncScheduler2.prototype.flush = function(action) {
    var actions = this.actions;
    if (this._active) {
      actions.push(action);
      return;
    }
    var error;
    this._active = true;
    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (action = actions.shift());
    this._active = false;
    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  };
  return AsyncScheduler2;
}(Scheduler);
var asyncScheduler = new AsyncScheduler(AsyncAction);
var async = asyncScheduler;
var EMPTY = new Observable(function(subscriber) {
  return subscriber.complete();
});
function empty(scheduler) {
  return scheduler ? emptyScheduled(scheduler) : EMPTY;
}
function emptyScheduled(scheduler) {
  return new Observable(function(subscriber) {
    return scheduler.schedule(function() {
      return subscriber.complete();
    });
  });
}
function isScheduler(value) {
  return value && isFunction(value.schedule);
}
function last(arr) {
  return arr[arr.length - 1];
}
function popResultSelector(args) {
  return isFunction(last(args)) ? args.pop() : void 0;
}
function popScheduler(args) {
  return isScheduler(last(args)) ? args.pop() : void 0;
}
function popNumber(args, defaultValue) {
  return typeof last(args) === "number" ? args.pop() : defaultValue;
}
var isArrayLike = function(x) {
  return x && typeof x.length === "number" && typeof x !== "function";
};
function isPromise(value) {
  return isFunction(value === null || value === void 0 ? void 0 : value.then);
}
function isInteropObservable(input) {
  return isFunction(input[observable]);
}
function isAsyncIterable(obj) {
  return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
function createInvalidObservableTypeError(input) {
  return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
function getSymbolIterator() {
  if (typeof Symbol !== "function" || !Symbol.iterator) {
    return "@@iterator";
  }
  return Symbol.iterator;
}
var iterator = getSymbolIterator();
function isIterable(input) {
  return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}
function readableStreamLikeToAsyncGenerator(readableStream) {
  return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
    var reader, _a2, value, done;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          reader = readableStream.getReader();
          _b.label = 1;
        case 1:
          _b.trys.push([1, , 9, 10]);
          _b.label = 2;
        case 2:
          return [4, __await(reader.read())];
        case 3:
          _a2 = _b.sent(), value = _a2.value, done = _a2.done;
          if (!done)
            return [3, 5];
          return [4, __await(void 0)];
        case 4:
          return [2, _b.sent()];
        case 5:
          return [4, __await(value)];
        case 6:
          return [4, _b.sent()];
        case 7:
          _b.sent();
          return [3, 2];
        case 8:
          return [3, 10];
        case 9:
          reader.releaseLock();
          return [7];
        case 10:
          return [2];
      }
    });
  });
}
function isReadableStreamLike(obj) {
  return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
function innerFrom(input) {
  if (input instanceof Observable) {
    return input;
  }
  if (input != null) {
    if (isInteropObservable(input)) {
      return fromInteropObservable(input);
    }
    if (isArrayLike(input)) {
      return fromArrayLike(input);
    }
    if (isPromise(input)) {
      return fromPromise(input);
    }
    if (isAsyncIterable(input)) {
      return fromAsyncIterable(input);
    }
    if (isIterable(input)) {
      return fromIterable(input);
    }
    if (isReadableStreamLike(input)) {
      return fromReadableStreamLike(input);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
  return new Observable(function(subscriber) {
    var obs = obj[observable]();
    if (isFunction(obs.subscribe)) {
      return obs.subscribe(subscriber);
    }
    throw new TypeError("Provided object does not correctly implement Symbol.observable");
  });
}
function fromArrayLike(array) {
  return new Observable(function(subscriber) {
    for (var i = 0; i < array.length && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }
    subscriber.complete();
  });
}
function fromPromise(promise) {
  return new Observable(function(subscriber) {
    promise.then(function(value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function(err) {
      return subscriber.error(err);
    }).then(null, reportUnhandledError);
  });
}
function fromIterable(iterable) {
  return new Observable(function(subscriber) {
    var e_1, _a2;
    try {
      for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
        var value = iterable_1_1.value;
        subscriber.next(value);
        if (subscriber.closed) {
          return;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (iterable_1_1 && !iterable_1_1.done && (_a2 = iterable_1.return))
          _a2.call(iterable_1);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    subscriber.complete();
  });
}
function fromAsyncIterable(asyncIterable) {
  return new Observable(function(subscriber) {
    process$3(asyncIterable, subscriber).catch(function(err) {
      return subscriber.error(err);
    });
  });
}
function fromReadableStreamLike(readableStream) {
  return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process$3(asyncIterable, subscriber) {
  var asyncIterable_1, asyncIterable_1_1;
  var e_2, _a2;
  return __awaiter(this, void 0, void 0, function() {
    var value, e_2_1;
    return __generator(this, function(_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, 6, 11]);
          asyncIterable_1 = __asyncValues(asyncIterable);
          _b.label = 1;
        case 1:
          return [4, asyncIterable_1.next()];
        case 2:
          if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done))
            return [3, 4];
          value = asyncIterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return [2];
          }
          _b.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          e_2_1 = _b.sent();
          e_2 = { error: e_2_1 };
          return [3, 11];
        case 6:
          _b.trys.push([6, , 9, 10]);
          if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a2 = asyncIterable_1.return)))
            return [3, 8];
          return [4, _a2.call(asyncIterable_1)];
        case 7:
          _b.sent();
          _b.label = 8;
        case 8:
          return [3, 10];
        case 9:
          if (e_2)
            throw e_2.error;
          return [7];
        case 10:
          return [7];
        case 11:
          subscriber.complete();
          return [2];
      }
    });
  });
}
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
  if (delay === void 0) {
    delay = 0;
  }
  if (repeat === void 0) {
    repeat = false;
  }
  var scheduleSubscription = scheduler.schedule(function() {
    work();
    if (repeat) {
      parentSubscription.add(this.schedule(null, delay));
    } else {
      this.unsubscribe();
    }
  }, delay);
  parentSubscription.add(scheduleSubscription);
  if (!repeat) {
    return scheduleSubscription;
  }
}
function observeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return operate(function(source, subscriber) {
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.next(value);
      }, delay);
    }, function() {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.complete();
      }, delay);
    }, function(err) {
      return executeSchedule(subscriber, scheduler, function() {
        return subscriber.error(err);
      }, delay);
    }));
  });
}
function subscribeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }
  return operate(function(source, subscriber) {
    subscriber.add(scheduler.schedule(function() {
      return source.subscribe(subscriber);
    }, delay));
  });
}
function scheduleObservable(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
function schedulePromise(input, scheduler) {
  return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
function scheduleArray(input, scheduler) {
  return new Observable(function(subscriber) {
    var i = 0;
    return scheduler.schedule(function() {
      if (i === input.length) {
        subscriber.complete();
      } else {
        subscriber.next(input[i++]);
        if (!subscriber.closed) {
          this.schedule();
        }
      }
    });
  });
}
function scheduleIterable(input, scheduler) {
  return new Observable(function(subscriber) {
    var iterator$1;
    executeSchedule(subscriber, scheduler, function() {
      iterator$1 = input[iterator]();
      executeSchedule(subscriber, scheduler, function() {
        var _a2;
        var value;
        var done;
        try {
          _a2 = iterator$1.next(), value = _a2.value, done = _a2.done;
        } catch (err) {
          subscriber.error(err);
          return;
        }
        if (done) {
          subscriber.complete();
        } else {
          subscriber.next(value);
        }
      }, 0, true);
    });
    return function() {
      return isFunction(iterator$1 === null || iterator$1 === void 0 ? void 0 : iterator$1.return) && iterator$1.return();
    };
  });
}
function scheduleAsyncIterable(input, scheduler) {
  if (!input) {
    throw new Error("Iterable cannot be null");
  }
  return new Observable(function(subscriber) {
    executeSchedule(subscriber, scheduler, function() {
      var iterator2 = input[Symbol.asyncIterator]();
      executeSchedule(subscriber, scheduler, function() {
        iterator2.next().then(function(result) {
          if (result.done) {
            subscriber.complete();
          } else {
            subscriber.next(result.value);
          }
        });
      }, 0, true);
    });
  });
}
function scheduleReadableStreamLike(input, scheduler) {
  return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}
function scheduled(input, scheduler) {
  if (input != null) {
    if (isInteropObservable(input)) {
      return scheduleObservable(input, scheduler);
    }
    if (isArrayLike(input)) {
      return scheduleArray(input, scheduler);
    }
    if (isPromise(input)) {
      return schedulePromise(input, scheduler);
    }
    if (isAsyncIterable(input)) {
      return scheduleAsyncIterable(input, scheduler);
    }
    if (isIterable(input)) {
      return scheduleIterable(input, scheduler);
    }
    if (isReadableStreamLike(input)) {
      return scheduleReadableStreamLike(input, scheduler);
    }
  }
  throw createInvalidObservableTypeError(input);
}
function from(input, scheduler) {
  return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}
function of() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  var scheduler = popScheduler(args);
  return from(args, scheduler);
}
var EmptyError = createErrorClass(function(_super) {
  return function EmptyErrorImpl() {
    _super(this);
    this.name = "EmptyError";
    this.message = "no elements in sequence";
  };
});
function lastValueFrom(source, config2) {
  var hasConfig = typeof config2 === "object";
  return new Promise(function(resolve, reject) {
    var _hasValue = false;
    var _value;
    source.subscribe({
      next: function(value) {
        _value = value;
        _hasValue = true;
      },
      error: reject,
      complete: function() {
        if (_hasValue) {
          resolve(_value);
        } else if (hasConfig) {
          resolve(config2.defaultValue);
        } else {
          reject(new EmptyError());
        }
      }
    });
  });
}
function isValidDate(value) {
  return value instanceof Date && !isNaN(value);
}
function map$1(project, thisArg) {
  return operate(function(source, subscriber) {
    var index = 0;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      subscriber.next(project.call(thisArg, value, index++));
    }));
  });
}
function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
  var buffer = [];
  var active = 0;
  var index = 0;
  var isComplete = false;
  var checkComplete = function() {
    if (isComplete && !buffer.length && !active) {
      subscriber.complete();
    }
  };
  var outerNext = function(value) {
    return active < concurrent ? doInnerSub(value) : buffer.push(value);
  };
  var doInnerSub = function(value) {
    expand && subscriber.next(value);
    active++;
    var innerComplete = false;
    innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, function(innerValue) {
      onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
      if (expand) {
        outerNext(innerValue);
      } else {
        subscriber.next(innerValue);
      }
    }, function() {
      innerComplete = true;
    }, void 0, function() {
      if (innerComplete) {
        try {
          active--;
          var _loop_1 = function() {
            var bufferedValue = buffer.shift();
            if (innerSubScheduler) {
              executeSchedule(subscriber, innerSubScheduler, function() {
                return doInnerSub(bufferedValue);
              });
            } else {
              doInnerSub(bufferedValue);
            }
          };
          while (buffer.length && active < concurrent) {
            _loop_1();
          }
          checkComplete();
        } catch (err) {
          subscriber.error(err);
        }
      }
    }));
  };
  source.subscribe(createOperatorSubscriber(subscriber, outerNext, function() {
    isComplete = true;
    checkComplete();
  }));
  return function() {
    additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
  };
}
function mergeMap(project, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  if (isFunction(resultSelector)) {
    return mergeMap(function(a, i) {
      return map$1(function(b, ii) {
        return resultSelector(a, b, i, ii);
      })(innerFrom(project(a, i)));
    }, concurrent);
  } else if (typeof resultSelector === "number") {
    concurrent = resultSelector;
  }
  return operate(function(source, subscriber) {
    return mergeInternals(source, subscriber, project, concurrent);
  });
}
function mergeAll(concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }
  return mergeMap(identity, concurrent);
}
function concatAll() {
  return mergeAll(1);
}
function concat() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return concatAll()(from(args, popScheduler(args)));
}
function timer(dueTime, intervalOrScheduler, scheduler) {
  if (dueTime === void 0) {
    dueTime = 0;
  }
  if (scheduler === void 0) {
    scheduler = async;
  }
  var intervalDuration = -1;
  if (intervalOrScheduler != null) {
    if (isScheduler(intervalOrScheduler)) {
      scheduler = intervalOrScheduler;
    } else {
      intervalDuration = intervalOrScheduler;
    }
  }
  return new Observable(function(subscriber) {
    var due = isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
    if (due < 0) {
      due = 0;
    }
    var n2 = 0;
    return scheduler.schedule(function() {
      if (!subscriber.closed) {
        subscriber.next(n2++);
        if (0 <= intervalDuration) {
          this.schedule(void 0, intervalDuration);
        } else {
          subscriber.complete();
        }
      }
    }, due);
  });
}
function distinctUntilChanged(comparator, keySelector) {
  if (keySelector === void 0) {
    keySelector = identity;
  }
  comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
  return operate(function(source, subscriber) {
    var previousKey;
    var first = true;
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      var currentKey = keySelector(value);
      if (first || !comparator(previousKey, currentKey)) {
        first = false;
        previousKey = currentKey;
        subscriber.next(value);
      }
    }));
  });
}
function defaultCompare(a, b) {
  return a === b;
}
function startWith() {
  var values = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    values[_i] = arguments[_i];
  }
  var scheduler = popScheduler(values);
  return operate(function(source, subscriber) {
    (scheduler ? concat(values, source, scheduler) : concat(values, source)).subscribe(subscriber);
  });
}
function switchMap(project, resultSelector) {
  return operate(function(source, subscriber) {
    var innerSubscriber = null;
    var index = 0;
    var isComplete = false;
    var checkComplete = function() {
      return isComplete && !innerSubscriber && subscriber.complete();
    };
    source.subscribe(createOperatorSubscriber(subscriber, function(value) {
      innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
      var innerIndex = 0;
      var outerIndex = index++;
      innerFrom(project(value, outerIndex)).subscribe(innerSubscriber = createOperatorSubscriber(subscriber, function(innerValue) {
        return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue);
      }, function() {
        innerSubscriber = null;
        checkComplete();
      }));
    }, function() {
      isComplete = true;
      checkComplete();
    }));
  });
}
const _YoutubePlaylist = class {
  /**
   * Constructor.
   *
   * @param id The playlist ID.
   * @param startVideoId The video ID from where to start the playlist.
   */
  constructor(id, startVideoId = null) {
    __publicField(this, "videos");
    this.id = id;
    this.startVideoId = startVideoId;
    this.videos = this.getVideos();
  }
  /**
   * Parses a URL from a string.
   *
   * Compatible format(s):
   * - https://www.youtube.com/watch?v=kGK4oAn2rHk&list=PL4ZKZLiSWIFbcbUxMyKyPr_3S67IYoSXa
   * - https://youtube.com/playlist?list=PL4ZKZLiSWIFbcbUxMyKyPr_3S67IYoSXa
   * - https://www.youtube.com/embed/videoseries?list=PL4ZKZLiSWIFbcbUxMyKyPr_3S67IYoSXa
   * @param url - The playlist URL as a string
   *
   * @returns - The parsed URL
   */
  static fromUrl(url) {
    const parsed = new URL(url);
    switch (parsed.host) {
      case "www.youtube.com": {
        const id = parsed.searchParams.get("list");
        if (!id) {
          return null;
        }
        const startVideoId = parsed.searchParams.get("v");
        return new _YoutubePlaylist(id, startVideoId);
      }
      case "youtube.com": {
        const id = parsed.searchParams.get("list");
        if (!id) {
          return null;
        }
        return new _YoutubePlaylist(id);
      }
      default:
        return null;
    }
  }
  /**
   * Transforms to string
   */
  toString() {
    const url = new URL("https://www.youtube.com");
    url.searchParams.set("list", this.id);
    if (this.startVideoId) {
      url.searchParams.set("v", this.startVideoId);
    }
    return url.toString();
  }
  /**
   * Creates a player in the given element
   */
  embedInto(element2) {
    return PlayerFactory(element2, {
      height: "100%",
      width: "100%",
      playerVars: {
        playsinline: 1,
        controls: 1,
        autoplay: 0,
        rel: 0
      }
    });
  }
  async fetch(url) {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch playlist: ${response.statusText}`);
    }
    return response.json();
  }
  /**
   * Gets the playlist title and other metadata
   *
   * @returns - The playlist data
   */
  async getPlaylist() {
    var _a2;
    const url = new URL("https://content-youtube.googleapis.com/youtube/v3/playlists");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("id", this.id);
    url.searchParams.set("key", _YoutubePlaylist.API_KEY);
    const json = await this.fetch(url);
    return ((_a2 = json.items[0]) == null ? void 0 : _a2.snippet) ?? null;
  }
  /**
   * Gets the videos IDs in the playlist
   *
   * @returns - The video IDs
   */
  async getVideos() {
    const url = new URL("https://content-youtube.googleapis.com/youtube/v3/playlistItems");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("playlistId", this.id);
    url.searchParams.set("key", _YoutubePlaylist.API_KEY);
    const json = await this.fetch(url);
    return json.items ?? [];
  }
};
let YoutubePlaylist = _YoutubePlaylist;
__publicField(YoutubePlaylist, "API_KEY", "AIzaSyBzkc2df0YZfIvSQzB_-DvCvLhu35gKdEU");
class CoursePlayer {
  constructor(element2, course, items) {
    __publicField(this, "player");
    __publicField(this, "statusUpdateSignal", new Subject());
    __publicField(this, "currentVideoIndex", -1);
    this.element = element2;
    this.course = course;
    this.items = items;
    this.player = course.playlist.embedInto(element2);
    if (course.playlist.startVideoId) {
      this.currentVideoIndex = items.findIndex((video) => video.snippet.resourceId.videoId === course.playlist.startVideoId);
    }
  }
  static async create(element2, course) {
    const videos = await course.playlist.videos;
    if (!videos || videos.length === 0) {
      return null;
    }
    const items = await course.getAllItems();
    const player = new CoursePlayer(element2, course, items.map((item) => item.data));
    await player.playNext();
    return player;
  }
  isPlaying$() {
    return this.status$().pipe(
      map$1((status) => status === PlayerStates.PLAYING),
      distinctUntilChanged()
    );
  }
  items$() {
    return this.status$().pipe(
      map$1(() => this.items)
    );
  }
  async playNext() {
    const videosIds = this.items.map((v) => v.snippet.resourceId.videoId);
    this.currentVideoIndex = (this.currentVideoIndex + 1) % videosIds.length;
    await this.player.loadVideoById(videosIds[this.currentVideoIndex]);
    this.statusUpdateSignal.next();
  }
  async playPrevious() {
    const videosIds = this.items.map((v) => v.snippet.resourceId.videoId);
    this.currentVideoIndex--;
    if (this.currentVideoIndex < 0) {
      this.currentVideoIndex = videosIds.length - 1;
    }
    await this.player.loadVideoById(videosIds[this.currentVideoIndex]);
    this.statusUpdateSignal.next();
  }
  async playVideo(videoId) {
    this.currentVideoIndex = this.items.findIndex((item) => item.videoId === videoId);
    if (this.currentVideoIndex < 0) {
      this.currentVideoIndex = 0;
    }
    const videosIds = this.items.map((v) => v.snippet.resourceId.videoId);
    await this.player.loadVideoById(videosIds[this.currentVideoIndex]);
    this.statusUpdateSignal.next();
  }
  get currentItem() {
    return this.items[this.currentVideoIndex] ?? null;
  }
  getCurrentTime() {
    return this.player.getCurrentTime();
  }
  async resume() {
    await this.player.playVideo();
    this.statusUpdateSignal.next();
  }
  async pause() {
    await this.player.pauseVideo();
    this.statusUpdateSignal.next();
  }
  currentItem$() {
    return this.statusUpdateSignal.pipe(
      startWith(null),
      switchMap(() => {
        var _a2;
        const id = (_a2 = this.currentItem) == null ? void 0 : _a2.videoId;
        return id ? this.course.watchItem(id) : of(null);
      }),
      map$1((item) => (item == null ? void 0 : item.data) ?? null)
    );
  }
  status$() {
    return this.statusUpdateSignal.pipe(
      startWith(null),
      switchMap(() => timer(10, 100)),
      switchMap(() => this.player.getPlayerState()),
      distinctUntilChanged()
    );
  }
  hasPrevious$() {
    return this.statusUpdateSignal.pipe(
      startWith(null),
      map$1(() => this.currentVideoIndex > 0),
      distinctUntilChanged()
    );
  }
  hasNext$() {
    return this.statusUpdateSignal.pipe(
      startWith(null),
      map$1(() => this.currentVideoIndex < this.items.length - 1),
      distinctUntilChanged()
    );
  }
  async getStatus() {
    return this.player.getPlayerState();
  }
}
function runCallback(callback, data) {
  try {
    callback(data);
  } catch (err) {
    console.error("Error in subscription callback", err);
  }
}
class SimpleEventEmitter {
  constructor() {
    this._subscriptions = [];
    this._oneTimeEvents = /* @__PURE__ */ new Map();
  }
  on(event, callback) {
    if (this._oneTimeEvents.has(event)) {
      return runCallback(callback, this._oneTimeEvents.get(event));
    }
    this._subscriptions.push({ event, callback, once: false });
    return this;
  }
  off(event, callback) {
    this._subscriptions = this._subscriptions.filter((s2) => s2.event !== event || callback && s2.callback !== callback);
    return this;
  }
  once(event, callback) {
    return new Promise((resolve) => {
      const ourCallback = (data) => {
        resolve(data);
        callback == null ? void 0 : callback(data);
      };
      if (this._oneTimeEvents.has(event)) {
        runCallback(ourCallback, this._oneTimeEvents.get(event));
      } else {
        this._subscriptions.push({ event, callback: ourCallback, once: true });
      }
    });
  }
  emit(event, data) {
    if (this._oneTimeEvents.has(event)) {
      throw new Error(`Event "${event}" was supposed to be emitted only once`);
    }
    for (let i = 0; i < this._subscriptions.length; i++) {
      const s2 = this._subscriptions[i];
      if (s2.event !== event) {
        continue;
      }
      runCallback(s2.callback, data);
      if (s2.once) {
        this._subscriptions.splice(i, 1);
        i--;
      }
    }
    return this;
  }
  emitOnce(event, data) {
    if (this._oneTimeEvents.has(event)) {
      throw new Error(`Event "${event}" was supposed to be emitted only once`);
    }
    this.emit(event, data);
    this._oneTimeEvents.set(event, data);
    this.off(event);
    return this;
  }
}
function getPathKeys(path) {
  path = path.replace(/\[/g, "/[").replace(/^\/+/, "").replace(/\/+$/, "");
  if (path.length === 0) {
    return [];
  }
  const keys = path.split("/");
  return keys.map((key) => {
    return key.startsWith("[") ? parseInt(key.slice(1, -1)) : key;
  });
}
class PathInfo {
  constructor(path) {
    if (typeof path === "string") {
      this.keys = getPathKeys(path);
    } else if (path instanceof Array) {
      this.keys = path;
    }
    this.path = this.keys.reduce((path2, key, i) => i === 0 ? `${key}` : typeof key === "string" ? `${path2}/${key}` : `${path2}[${key}]`, "");
  }
  static get(path) {
    return new PathInfo(path);
  }
  static getChildPath(path, childKey) {
    return PathInfo.get(path).child(childKey).path;
  }
  static getPathKeys(path) {
    return getPathKeys(path);
  }
  get key() {
    return this.keys.length === 0 ? null : this.keys.slice(-1)[0];
  }
  get parent() {
    if (this.keys.length == 0) {
      return null;
    }
    const parentKeys = this.keys.slice(0, -1);
    return new PathInfo(parentKeys);
  }
  get parentPath() {
    return this.keys.length === 0 ? null : this.parent.path;
  }
  child(childKey) {
    if (typeof childKey === "string") {
      if (childKey.length === 0) {
        throw new Error(`child key for path "${this.path}" cannot be empty`);
      }
      const keys = getPathKeys(childKey);
      keys.forEach((key) => {
        if (typeof key !== "string") {
          return;
        }
        if (/[\x00-\x08\x0b\x0c\x0e-\x1f/[\]\\]/.test(key)) {
          throw new Error(`Invalid child key "${key}" for path "${this.path}". Keys cannot contain control characters or any of the following characters: \\ / [ ]`);
        }
        if (key.length > 128) {
          throw new Error(`child key "${key}" for path "${this.path}" is too long. Max key length is 128`);
        }
        if (key.length === 0) {
          throw new Error(`child key for path "${this.path}" cannot be empty`);
        }
      });
      childKey = keys;
    }
    return new PathInfo(this.keys.concat(childKey));
  }
  childPath(childKey) {
    return this.child(childKey).path;
  }
  get pathKeys() {
    return this.keys;
  }
  /**
   * If varPath contains variables or wildcards, it will return them with the values found in fullPath
   * @param {string} varPath path containing variables such as * and $name
   * @param {string} fullPath real path to a node
   * @returns {{ [index: number]: string|number, [variable: string]: string|number }} returns an array-like object with all variable values. All named variables are also set on the array by their name (eg vars.uid and vars.$uid)
   * @example
   * PathInfo.extractVariables('users/$uid/posts/$postid', 'users/ewout/posts/post1/title') === {
   *  0: 'ewout',
   *  1: 'post1',
   *  uid: 'ewout', // or $uid
   *  postid: 'post1' // or $postid
   * };
   *
   * PathInfo.extractVariables('users/*\/posts/*\/$property', 'users/ewout/posts/post1/title') === {
   *  0: 'ewout',
   *  1: 'post1',
   *  2: 'title',
   *  property: 'title' // or $property
   * };
   *
   * PathInfo.extractVariables('users/$user/friends[*]/$friend', 'users/dora/friends[4]/diego') === {
   *  0: 'dora',
   *  1: 4,
   *  2: 'diego',
   *  user: 'dora', // or $user
   *  friend: 'diego' // or $friend
   * };
  */
  static extractVariables(varPath, fullPath) {
    if (!varPath.includes("*") && !varPath.includes("$")) {
      return [];
    }
    const keys = getPathKeys(varPath);
    const pathKeys = getPathKeys(fullPath);
    let count = 0;
    const variables = {
      get length() {
        return count;
      }
    };
    keys.forEach((key, index) => {
      const pathKey = pathKeys[index];
      if (key === "*") {
        variables[count++] = pathKey;
      } else if (typeof key === "string" && key[0] === "$") {
        variables[count++] = pathKey;
        variables[key] = pathKey;
        const varName = key.slice(1);
        if (typeof variables[varName] === "undefined") {
          variables[varName] = pathKey;
        }
      }
    });
    return variables;
  }
  /**
   * If varPath contains variables or wildcards, it will return a path with the variables replaced by the keys found in fullPath.
   * @example
   * PathInfo.fillVariables('users/$uid/posts/$postid', 'users/ewout/posts/post1/title') === 'users/ewout/posts/post1'
   */
  static fillVariables(varPath, fullPath) {
    if (varPath.indexOf("*") < 0 && varPath.indexOf("$") < 0) {
      return varPath;
    }
    const keys = getPathKeys(varPath);
    const pathKeys = getPathKeys(fullPath);
    const merged = keys.map((key, index) => {
      if (key === pathKeys[index] || index >= pathKeys.length) {
        return key;
      } else if (typeof key === "string" && (key === "*" || key[0] === "$")) {
        return pathKeys[index];
      } else {
        throw new Error(`Path "${fullPath}" cannot be used to fill variables of path "${varPath}" because they do not match`);
      }
    });
    let mergedPath = "";
    merged.forEach((key) => {
      if (typeof key === "number") {
        mergedPath += `[${key}]`;
      } else {
        if (mergedPath.length > 0) {
          mergedPath += "/";
        }
        mergedPath += key;
      }
    });
    return mergedPath;
  }
  /**
   * Replaces all variables in a path with the values in the vars argument
   * @param varPath path containing variables
   * @param vars variables object such as one gotten from PathInfo.extractVariables
   */
  static fillVariables2(varPath, vars) {
    if (typeof vars !== "object" || Object.keys(vars).length === 0) {
      return varPath;
    }
    const pathKeys = getPathKeys(varPath);
    let n2 = 0;
    const targetPath = pathKeys.reduce((path, key) => {
      if (typeof key === "string" && (key === "*" || key.startsWith("$"))) {
        return PathInfo.getChildPath(path, vars[n2++]);
      } else {
        return PathInfo.getChildPath(path, key);
      }
    }, "");
    return targetPath;
  }
  /**
   * Checks if a given path matches this path, eg "posts/*\/title" matches "posts/12344/title" and "users/123/name" matches "users/$uid/name"
   */
  equals(otherPath) {
    const other = otherPath instanceof PathInfo ? otherPath : new PathInfo(otherPath);
    if (this.path === other.path) {
      return true;
    }
    if (this.keys.length !== other.keys.length) {
      return false;
    }
    return this.keys.every((key, index) => {
      const otherKey = other.keys[index];
      return otherKey === key || typeof otherKey === "string" && (otherKey === "*" || otherKey[0] === "$") || typeof key === "string" && (key === "*" || key[0] === "$");
    });
  }
  /**
   * Checks if a given path is an ancestor, eg "posts" is an ancestor of "posts/12344/title"
   */
  isAncestorOf(descendantPath) {
    const descendant = descendantPath instanceof PathInfo ? descendantPath : new PathInfo(descendantPath);
    if (descendant.path === "" || this.path === descendant.path) {
      return false;
    }
    if (this.path === "") {
      return true;
    }
    if (this.keys.length >= descendant.keys.length) {
      return false;
    }
    return this.keys.every((key, index) => {
      const otherKey = descendant.keys[index];
      return otherKey === key || typeof otherKey === "string" && (otherKey === "*" || otherKey[0] === "$") || typeof key === "string" && (key === "*" || key[0] === "$");
    });
  }
  /**
   * Checks if a given path is a descendant, eg "posts/1234/title" is a descendant of "posts"
   */
  isDescendantOf(ancestorPath) {
    const ancestor = ancestorPath instanceof PathInfo ? ancestorPath : new PathInfo(ancestorPath);
    if (this.path === "" || this.path === ancestor.path) {
      return false;
    }
    if (ancestorPath === "") {
      return true;
    }
    if (ancestor.keys.length >= this.keys.length) {
      return false;
    }
    return ancestor.keys.every((key, index) => {
      const otherKey = this.keys[index];
      return otherKey === key || typeof otherKey === "string" && (otherKey === "*" || otherKey[0] === "$") || typeof key === "string" && (key === "*" || key[0] === "$");
    });
  }
  /**
   * Checks if the other path is on the same trail as this path. Paths on the same trail if they share a
   * common ancestor. Eg: "posts" is on the trail of "posts/1234/title" and vice versa.
   */
  isOnTrailOf(otherPath) {
    const other = otherPath instanceof PathInfo ? otherPath : new PathInfo(otherPath);
    if (this.path.length === 0 || other.path.length === 0) {
      return true;
    }
    if (this.path === other.path) {
      return true;
    }
    return this.pathKeys.every((key, index) => {
      if (index >= other.keys.length) {
        return true;
      }
      const otherKey = other.keys[index];
      return otherKey === key || typeof otherKey === "string" && (otherKey === "*" || otherKey[0] === "$") || typeof key === "string" && (key === "*" || key[0] === "$");
    });
  }
  /**
   * Checks if a given path is a direct child, eg "posts/1234/title" is a child of "posts/1234"
   */
  isChildOf(otherPath) {
    const other = otherPath instanceof PathInfo ? otherPath : new PathInfo(otherPath);
    if (this.path === "") {
      return false;
    }
    return this.parent.equals(other);
  }
  /**
   * Checks if a given path is its parent, eg "posts/1234" is the parent of "posts/1234/title"
   */
  isParentOf(otherPath) {
    const other = otherPath instanceof PathInfo ? otherPath : new PathInfo(otherPath);
    if (other.path === "") {
      return false;
    }
    return this.equals(other.parent);
  }
}
function getChild(snapshot, path, previous = false) {
  if (!snapshot.exists()) {
    return null;
  }
  let child = previous ? snapshot.previous() : snapshot.val();
  if (typeof path === "number") {
    return child[path];
  }
  PathInfo.getPathKeys(path).every((key) => {
    child = child[key];
    return typeof child !== "undefined";
  });
  return child || null;
}
function getChildren(snapshot) {
  if (!snapshot.exists()) {
    return [];
  }
  const value = snapshot.val();
  if (value instanceof Array) {
    return new Array(value.length).map((v, i) => i);
  }
  if (typeof value === "object") {
    return Object.keys(value);
  }
  return [];
}
class DataSnapshot {
  /**
   * Creates a new DataSnapshot instance
   */
  constructor(ref, value, isRemoved = false, prevValue, context2) {
    this.ref = ref;
    this.val = () => {
      return value;
    };
    this.previous = () => {
      return prevValue;
    };
    this.exists = () => {
      if (isRemoved) {
        return false;
      }
      return value !== null && typeof value !== "undefined";
    };
    this.context = () => {
      return context2 || {};
    };
  }
  /**
   * Indicates whether the node exists in the database
   */
  exists() {
    return false;
  }
  /**
   * Creates a `DataSnapshot` instance
   * @internal (for internal use)
   */
  static for(ref, value) {
    return new DataSnapshot(ref, value);
  }
  /**
   * Gets a new snapshot for a child node
   * @param path child key or path
   * @returns Returns a `DataSnapshot` of the child
   */
  child(path) {
    const val = getChild(this, path, false);
    const prev = getChild(this, path, true);
    return new DataSnapshot(this.ref.child(path), val, false, prev);
  }
  /**
   * Checks if the snapshot's value has a child with the given key or path
   * @param path child key or path
   */
  hasChild(path) {
    return getChild(this, path) !== null;
  }
  /**
   * Indicates whether the the snapshot's value has any child nodes
   */
  hasChildren() {
    return getChildren(this).length > 0;
  }
  /**
   * The number of child nodes in this snapshot
   */
  numChildren() {
    return getChildren(this).length;
  }
  /**
   * Runs a callback function for each child node in this snapshot until the callback returns false
   * @param callback function that is called with a snapshot of each child node in this snapshot.
   * Must return a boolean value that indicates whether to continue iterating or not.
   */
  forEach(callback) {
    const value = this.val();
    const prev = this.previous();
    return getChildren(this).every((key) => {
      const snap = new DataSnapshot(this.ref.child(key), value[key], false, prev[key]);
      return callback(snap);
    });
  }
  /**
   * The key of the node's path
   */
  get key() {
    return this.ref.key;
  }
}
class MutationsDataSnapshot extends DataSnapshot {
  constructor(ref, mutations, context2) {
    super(ref, mutations, false, void 0, context2);
    this.previous = () => {
      throw new Error("Iterate values to get previous values for each mutation");
    };
    this.val = (warn = true) => {
      if (warn) {
        console.warn("Unless you know what you are doing, it is best not to use the value of a mutations snapshot directly. Use child methods and forEach to iterate the mutations instead");
      }
      return mutations;
    };
  }
  /**
   * Runs a callback function for each mutation in this snapshot until the callback returns false
   * @param callback function that is called with a snapshot of each mutation in this snapshot. Must return a boolean value that indicates whether to continue iterating or not.
   * @returns Returns whether every child was interated
   */
  forEach(callback) {
    const mutations = this.val();
    return mutations.every((mutation) => {
      const ref = mutation.target.reduce((ref2, key) => ref2.child(key), this.ref);
      const snap = new DataSnapshot(ref, mutation.val, false, mutation.prev);
      return callback(snap);
    });
  }
  /**
   * Gets a snapshot of a mutated node
   * @param index index of the mutation
   * @returns Returns a DataSnapshot of the mutated node
   */
  child(index) {
    if (typeof index !== "number") {
      throw new Error("child index must be a number");
    }
    const mutation = this.val()[index];
    const ref = mutation.target.reduce((ref2, key) => ref2.child(key), this.ref);
    return new DataSnapshot(ref, mutation.val, false, mutation.prev);
  }
}
class EventSubscription {
  /**
   * @param stop function that stops the subscription from receiving future events
   */
  constructor(stop) {
    this.stop = stop;
    this._internal = {
      state: "init",
      activatePromises: []
    };
  }
  /**
   * Notifies when subscription is activated or canceled
   * @param callback optional callback to run each time activation state changes
   * @returns returns a promise that resolves once activated, or rejects when it is denied (and no callback was supplied)
   */
  activated(callback) {
    if (callback) {
      this._internal.activatePromises.push({ callback });
      if (this._internal.state === "active") {
        callback(true);
      } else if (this._internal.state === "canceled") {
        callback(false, this._internal.cancelReason);
      }
    }
    return new Promise((resolve, reject) => {
      if (this._internal.state === "active") {
        return resolve();
      } else if (this._internal.state === "canceled" && !callback) {
        return reject(new Error(this._internal.cancelReason));
      }
      const noop2 = () => {
      };
      this._internal.activatePromises.push({
        resolve,
        reject: callback ? noop2 : reject
        // Don't reject when callback is used: let callback handle this (prevents UnhandledPromiseRejection if only callback is used)
      });
    });
  }
  /** (for internal use) */
  _setActivationState(activated, cancelReason) {
    this._internal.cancelReason = cancelReason;
    this._internal.state = activated ? "active" : "canceled";
    while (this._internal.activatePromises.length > 0) {
      const p = this._internal.activatePromises.shift();
      if (activated) {
        p.callback && p.callback(true);
        p.resolve && p.resolve();
      } else {
        p.callback && p.callback(false, cancelReason);
        p.reject && p.reject(cancelReason);
      }
    }
  }
}
class EventPublisher {
  /**
   *
   * @param publish function that publishes a new value to subscribers, return if there are any active subscribers
   * @param start function that notifies subscribers their subscription is activated
   * @param cancel function that notifies subscribers their subscription has been canceled, removes all subscriptions
   */
  constructor(publish, start, cancel) {
    this.publish = publish;
    this.start = start;
    this.cancel = cancel;
  }
}
class EventStream {
  constructor(eventPublisherCallback) {
    const subscribers = [];
    let noMoreSubscribersCallback;
    let activationState;
    const STATE_STOPPED = "stopped (no more subscribers)";
    this.subscribe = (callback, activationCallback) => {
      if (typeof callback !== "function") {
        throw new TypeError("callback must be a function");
      } else if (activationState === STATE_STOPPED) {
        throw new Error("stream can't be used anymore because all subscribers were stopped");
      }
      const sub = {
        callback,
        activationCallback: function(activated, cancelReason) {
          activationCallback == null ? void 0 : activationCallback(activated, cancelReason);
          this.subscription._setActivationState(activated, cancelReason);
        },
        subscription: new EventSubscription(function stop() {
          subscribers.splice(subscribers.indexOf(this), 1);
          return checkActiveSubscribers();
        })
      };
      subscribers.push(sub);
      if (typeof activationState !== "undefined") {
        if (activationState === true) {
          activationCallback == null ? void 0 : activationCallback(true);
          sub.subscription._setActivationState(true);
        } else if (typeof activationState === "string") {
          activationCallback == null ? void 0 : activationCallback(false, activationState);
          sub.subscription._setActivationState(false, activationState);
        }
      }
      return sub.subscription;
    };
    const checkActiveSubscribers = () => {
      let ret;
      if (subscribers.length === 0) {
        ret = noMoreSubscribersCallback == null ? void 0 : noMoreSubscribersCallback();
        activationState = STATE_STOPPED;
      }
      return Promise.resolve(ret);
    };
    this.unsubscribe = (callback) => {
      const remove = callback ? subscribers.filter((sub) => sub.callback === callback) : subscribers;
      remove.forEach((sub) => {
        const i = subscribers.indexOf(sub);
        subscribers.splice(i, 1);
      });
      checkActiveSubscribers();
    };
    this.stop = () => {
      subscribers.splice(0);
      checkActiveSubscribers();
    };
    const publish = (val) => {
      subscribers.forEach((sub) => {
        try {
          sub.callback(val);
        } catch (err) {
          console.error(`Error running subscriber callback: ${err.message}`);
        }
      });
      if (subscribers.length === 0) {
        checkActiveSubscribers();
      }
      return subscribers.length > 0;
    };
    const start = (allSubscriptionsStoppedCallback) => {
      activationState = true;
      noMoreSubscribersCallback = allSubscriptionsStoppedCallback;
      subscribers.forEach((sub) => {
        var _a2;
        (_a2 = sub.activationCallback) == null ? void 0 : _a2.call(sub, true);
      });
    };
    const cancel = (reason) => {
      activationState = reason;
      subscribers.forEach((sub) => {
        var _a2;
        (_a2 = sub.activationCallback) == null ? void 0 : _a2.call(sub, false, reason || new Error("unknown reason"));
      });
      subscribers.splice(0);
    };
    const publisher = new EventPublisher(publish, start, cancel);
    eventPublisherCallback(publisher);
  }
}
function pad(num, size) {
  const s2 = "000000000" + num;
  return s2.substr(s2.length - size);
}
const env = typeof window === "object" ? window : self, globalCount = Object.keys(env).length, mimeTypesLength = ((_a = navigator.mimeTypes) == null ? void 0 : _a.length) ?? 0, clientId = pad((mimeTypesLength + navigator.userAgent.length).toString(36) + globalCount.toString(36), 4);
function fingerprint() {
  return clientId;
}
let c$1 = 0;
const blockSize = 4, base = 36, discreteValues = Math.pow(base, blockSize);
function randomBlock() {
  return pad((Math.random() * discreteValues << 0).toString(base), blockSize);
}
function safeCounter() {
  c$1 = c$1 < discreteValues ? c$1 : 0;
  c$1++;
  return c$1 - 1;
}
function cuid(timebias = 0) {
  const letter = "c", timestamp = (new Date().getTime() + timebias).toString(base), counter = pad(safeCounter().toString(base), blockSize), print = fingerprint(), random = randomBlock() + randomBlock();
  return letter + timestamp + counter + print + random;
}
let timeBias = 0;
class ID {
  /**
   * (for internal use)
   * bias in milliseconds to adjust generated cuid timestamps with
   */
  static set timeBias(bias) {
    if (typeof bias !== "number") {
      return;
    }
    timeBias = bias;
  }
  static generate() {
    return cuid(timeBias).slice(1);
  }
}
class PathReference {
  /**
   * Creates a reference to a path that can be stored in the database. Use this to create cross-references to other data in your database
   * @param path
   */
  constructor(path) {
    this.path = path;
  }
}
const process$2 = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  nextTick(fn) {
    setTimeout(fn, 0);
  }
};
class PartialArray {
  constructor(sparseArray) {
    if (sparseArray instanceof Array) {
      for (let i = 0; i < sparseArray.length; i++) {
        if (typeof sparseArray[i] !== "undefined") {
          this[i] = sparseArray[i];
        }
      }
    } else if (sparseArray) {
      Object.assign(this, sparseArray);
    }
  }
}
function numberToBytes(number) {
  const bytes = new Uint8Array(8);
  const view = new DataView(bytes.buffer);
  view.setFloat64(0, number);
  return new Array(...bytes);
}
function bytesToNumber(bytes) {
  const length = Array.isArray(bytes) ? bytes.length : bytes.byteLength;
  if (length !== 8) {
    throw new TypeError("must be 8 bytes");
  }
  const bin = new Uint8Array(bytes);
  const view = new DataView(bin.buffer);
  const nr = view.getFloat64(0);
  return nr;
}
const big = {
  zero: BigInt(0),
  one: BigInt(1),
  two: BigInt(2),
  eight: BigInt(8),
  ff: BigInt(255)
};
function bigintToBytes(number) {
  if (typeof number !== "bigint") {
    throw new Error("number must be a bigint");
  }
  const bytes = [];
  const negative = number < big.zero;
  do {
    const byte = Number(number & big.ff);
    bytes.push(byte);
    number = number >> big.eight;
  } while (number !== (negative ? -big.one : big.zero));
  bytes.reverse();
  if (negative ? bytes[0] < 128 : bytes[0] >= 128) {
    bytes.unshift(negative ? 255 : 0);
  }
  return bytes;
}
function bytesToBigint(bytes) {
  const negative = bytes[0] >= 128;
  let number = big.zero;
  for (let b of bytes) {
    if (negative) {
      b = ~b & 255;
    }
    number = (number << big.eight) + BigInt(b);
  }
  if (negative) {
    number = -(number + big.one);
  }
  return number;
}
function encodeString$1(str) {
  if (typeof TextEncoder !== "undefined") {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  } else if (typeof Buffer === "function") {
    const buf = Buffer.from(str, "utf-8");
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  } else {
    const arr = [];
    for (let i = 0; i < str.length; i++) {
      let code = str.charCodeAt(i);
      if (code > 128) {
        if ((code & 55296) === 55296) {
          const nextCode = str.charCodeAt(i + 1);
          if ((nextCode & 56320) !== 56320) {
            throw new Error("follow-up utf-16 character does not start with 0xDC00");
          }
          i++;
          const p1 = code & 1023;
          const p2 = nextCode & 1023;
          code = 65536 | p1 << 10 | p2;
        }
        if (code < 2048) {
          const b1 = 192 | code >> 6 & 31;
          const b2 = 128 | code & 63;
          arr.push(b1, b2);
        } else if (code < 65536) {
          const b1 = 224 | code >> 12 & 15;
          const b2 = 128 | code >> 6 & 63;
          const b3 = 128 | code & 63;
          arr.push(b1, b2, b3);
        } else if (code < 2097152) {
          const b1 = 240 | code >> 18 & 7;
          const b2 = 128 | code >> 12 & 63;
          const b3 = 128 | code >> 6 & 63;
          const b4 = 128 | code & 63;
          arr.push(b1, b2, b3, b4);
        } else {
          throw new Error(`Cannot convert character ${str.charAt(i)} (code ${code}) to utf-8`);
        }
      } else {
        arr.push(code < 128 ? code : 63);
      }
    }
    return new Uint8Array(arr);
  }
}
function decodeString(buffer) {
  if (typeof TextDecoder !== "undefined") {
    const decoder = new TextDecoder();
    if (buffer instanceof Uint8Array) {
      return decoder.decode(buffer);
    }
    const buf = Uint8Array.from(buffer);
    return decoder.decode(buf);
  } else if (typeof Buffer === "function") {
    if (buffer instanceof Array) {
      buffer = Uint8Array.from(buffer);
    }
    if (!(buffer instanceof Buffer) && "buffer" in buffer && buffer.buffer instanceof ArrayBuffer) {
      const typedArray = buffer;
      buffer = Buffer.from(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
    }
    if (!(buffer instanceof Buffer)) {
      throw new Error("Unsupported buffer argument");
    }
    return buffer.toString("utf-8");
  } else {
    if (!(buffer instanceof Uint8Array) && "buffer" in buffer && buffer["buffer"] instanceof ArrayBuffer) {
      const typedArray = buffer;
      buffer = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
    }
    if (buffer instanceof Buffer || buffer instanceof Array || buffer instanceof Uint8Array) {
      let str = "";
      for (let i = 0; i < buffer.length; i++) {
        let code = buffer[i];
        if (code > 128) {
          if ((code & 240) === 240) {
            const b1 = code, b2 = buffer[i + 1], b3 = buffer[i + 2], b4 = buffer[i + 3];
            code = (b1 & 7) << 18 | (b2 & 63) << 12 | (b3 & 63) << 6 | b4 & 63;
            i += 3;
          } else if ((code & 224) === 224) {
            const b1 = code, b2 = buffer[i + 1], b3 = buffer[i + 2];
            code = (b1 & 15) << 12 | (b2 & 63) << 6 | b3 & 63;
            i += 2;
          } else if ((code & 192) === 192) {
            const b1 = code, b2 = buffer[i + 1];
            code = (b1 & 31) << 6 | b2 & 63;
            i++;
          } else {
            throw new Error("invalid utf-8 data");
          }
        }
        if (code >= 65536) {
          code ^= 65536;
          const p1 = 55296 | code >> 10;
          const p2 = 56320 | code & 1023;
          str += String.fromCharCode(p1);
          str += String.fromCharCode(p2);
        } else {
          str += String.fromCharCode(code);
        }
      }
      return str;
    } else {
      throw new Error("Unsupported buffer argument");
    }
  }
}
function concatTypedArrays(a, b) {
  const c2 = new a.constructor(a.length + b.length);
  c2.set(a);
  c2.set(b, a.length);
  return c2;
}
function cloneObject(original, stack) {
  var _a2;
  if (((_a2 = original == null ? void 0 : original.constructor) == null ? void 0 : _a2.name) === "DataSnapshot") {
    throw new TypeError(`Object to clone is a DataSnapshot (path "${original.ref.path}")`);
  }
  const checkAndFixTypedArray = (obj) => {
    if (obj !== null && typeof obj === "object" && typeof obj.constructor === "function" && typeof obj.constructor.name === "string" && ["Buffer", "Uint8Array", "Int8Array", "Uint16Array", "Int16Array", "Uint32Array", "Int32Array", "BigUint64Array", "BigInt64Array"].includes(obj.constructor.name)) {
      obj = obj.buffer.slice(obj.byteOffset, obj.byteOffset + obj.byteLength);
    }
    return obj;
  };
  original = checkAndFixTypedArray(original);
  if (typeof original !== "object" || original === null || original instanceof Date || original instanceof ArrayBuffer || original instanceof PathReference || original instanceof RegExp) {
    return original;
  }
  const cloneValue = (val) => {
    if (stack.indexOf(val) >= 0) {
      throw new ReferenceError("object contains a circular reference");
    }
    val = checkAndFixTypedArray(val);
    if (val === null || val instanceof Date || val instanceof ArrayBuffer || val instanceof PathReference || val instanceof RegExp) {
      return val;
    } else if (typeof val === "object") {
      stack.push(val);
      val = cloneObject(val, stack);
      stack.pop();
      return val;
    } else {
      return val;
    }
  };
  if (typeof stack === "undefined") {
    stack = [original];
  }
  const clone2 = original instanceof Array ? [] : original instanceof PartialArray ? new PartialArray() : {};
  Object.keys(original).forEach((key) => {
    const val = original[key];
    if (typeof val === "function") {
      return;
    }
    clone2[key] = cloneValue(val);
  });
  return clone2;
}
const isTypedArray = (val) => typeof val === "object" && ["ArrayBuffer", "Buffer", "Uint8Array", "Uint16Array", "Uint32Array", "Int8Array", "Int16Array", "Int32Array"].includes(val.constructor.name);
function valuesAreEqual(val1, val2) {
  if (val1 === val2) {
    return true;
  }
  if (typeof val1 !== typeof val2) {
    return false;
  }
  if (typeof val1 === "object" || typeof val2 === "object") {
    if (val1 === null || val2 === null) {
      return false;
    }
    if (val1 instanceof PathReference || val2 instanceof PathReference) {
      return val1 instanceof PathReference && val2 instanceof PathReference && val1.path === val2.path;
    }
    if (val1 instanceof Date || val2 instanceof Date) {
      return val1 instanceof Date && val2 instanceof Date && val1.getTime() === val2.getTime();
    }
    if (val1 instanceof Array || val2 instanceof Array) {
      return val1 instanceof Array && val2 instanceof Array && val1.length === val2.length && val1.every((item, i) => valuesAreEqual(val1[i], val2[i]));
    }
    if (isTypedArray(val1) || isTypedArray(val2)) {
      if (!isTypedArray(val1) || !isTypedArray(val2) || val1.byteLength === val2.byteLength) {
        return false;
      }
      const typed1 = val1 instanceof ArrayBuffer ? new Uint8Array(val1) : new Uint8Array(val1.buffer, val1.byteOffset, val1.byteLength), typed2 = val2 instanceof ArrayBuffer ? new Uint8Array(val2) : new Uint8Array(val2.buffer, val2.byteOffset, val2.byteLength);
      return typed1.every((val, i) => typed2[i] === val);
    }
    const keys1 = Object.keys(val1), keys2 = Object.keys(val2);
    return keys1.length === keys2.length && keys1.every((key) => keys2.includes(key)) && keys1.every((key) => valuesAreEqual(val1[key], val2[key]));
  }
  return false;
}
class ObjectDifferences {
  constructor(added, removed, changed) {
    this.added = added;
    this.removed = removed;
    this.changed = changed;
  }
  forChild(key) {
    if (this.added.includes(key)) {
      return "added";
    }
    if (this.removed.includes(key)) {
      return "removed";
    }
    const changed = this.changed.find((ch) => ch.key === key);
    return changed ? changed.change : "identical";
  }
}
function compareValues$2(oldVal, newVal, sortedResults = false) {
  const voids = [void 0, null];
  if (oldVal === newVal) {
    return "identical";
  } else if (voids.indexOf(oldVal) >= 0 && voids.indexOf(newVal) < 0) {
    return "added";
  } else if (voids.indexOf(oldVal) < 0 && voids.indexOf(newVal) >= 0) {
    return "removed";
  } else if (typeof oldVal !== typeof newVal) {
    return "changed";
  } else if (isTypedArray(oldVal) || isTypedArray(newVal)) {
    if (!isTypedArray(oldVal) || !isTypedArray(newVal)) {
      return "changed";
    }
    const typed1 = oldVal instanceof Uint8Array ? oldVal : oldVal instanceof ArrayBuffer ? new Uint8Array(oldVal) : new Uint8Array(oldVal.buffer, oldVal.byteOffset, oldVal.byteLength);
    const typed2 = newVal instanceof Uint8Array ? newVal : newVal instanceof ArrayBuffer ? new Uint8Array(newVal) : new Uint8Array(newVal.buffer, newVal.byteOffset, newVal.byteLength);
    return typed1.byteLength === typed2.byteLength && typed1.every((val, i) => typed2[i] === val) ? "identical" : "changed";
  } else if (oldVal instanceof Date || newVal instanceof Date) {
    return oldVal instanceof Date && newVal instanceof Date && oldVal.getTime() === newVal.getTime() ? "identical" : "changed";
  } else if (oldVal instanceof PathReference || newVal instanceof PathReference) {
    return oldVal instanceof PathReference && newVal instanceof PathReference && oldVal.path === newVal.path ? "identical" : "changed";
  } else if (typeof oldVal === "object") {
    const isArray = oldVal instanceof Array;
    const getKeys = (obj) => {
      let keys = Object.keys(obj).filter((key) => !voids.includes(obj[key]));
      if (isArray) {
        keys = keys.map((v) => parseInt(v));
      }
      return keys;
    };
    const oldKeys = getKeys(oldVal);
    const newKeys = getKeys(newVal);
    const removedKeys = oldKeys.filter((key) => !newKeys.includes(key));
    const addedKeys = newKeys.filter((key) => !oldKeys.includes(key));
    const changedKeys = newKeys.reduce((changed, key) => {
      if (oldKeys.includes(key)) {
        const val1 = oldVal[key];
        const val2 = newVal[key];
        const c2 = compareValues$2(val1, val2);
        if (c2 !== "identical") {
          changed.push({ key, change: c2 });
        }
      }
      return changed;
    }, []);
    if (addedKeys.length === 0 && removedKeys.length === 0 && changedKeys.length === 0) {
      return "identical";
    } else {
      return new ObjectDifferences(addedKeys, removedKeys, sortedResults ? changedKeys.sort((a, b) => a.key < b.key ? -1 : 1) : changedKeys);
    }
  }
  return "changed";
}
function getMutations(oldVal, newVal, sortedResults = false) {
  const process2 = (target, compareResult2, prev, val) => {
    switch (compareResult2) {
      case "identical":
        return [];
      case "changed":
        return [{ target, prev, val }];
      case "added":
        return [{ target, prev: null, val }];
      case "removed":
        return [{ target, prev, val: null }];
      default: {
        let changes = [];
        compareResult2.added.forEach((key) => changes.push({ target: target.concat(key), prev: null, val: val[key] }));
        compareResult2.removed.forEach((key) => changes.push({ target: target.concat(key), prev: prev[key], val: null }));
        compareResult2.changed.forEach((item) => {
          const childChanges = process2(target.concat(item.key), item.change, prev[item.key], val[item.key]);
          changes = changes.concat(childChanges);
        });
        return changes;
      }
    }
  };
  const compareResult = compareValues$2(oldVal, newVal, sortedResults);
  return process2([], compareResult, oldVal, newVal);
}
function getChildValues$1(childKey, oldValue, newValue) {
  oldValue = oldValue === null ? null : oldValue[childKey];
  if (typeof oldValue === "undefined") {
    oldValue = null;
  }
  newValue = newValue === null ? null : newValue[childKey];
  if (typeof newValue === "undefined") {
    newValue = null;
  }
  return { oldValue, newValue };
}
function defer$1(fn) {
  process$2.nextTick(fn);
}
function getGlobalObject() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  return function() {
    return this;
  }() ?? Function("return this")();
}
const Utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ObjectDifferences,
  bigintToBytes,
  bytesToBigint,
  bytesToNumber,
  cloneObject,
  compareValues: compareValues$2,
  concatTypedArrays,
  decodeString,
  defer: defer$1,
  encodeString: encodeString$1,
  getChildValues: getChildValues$1,
  getGlobalObject,
  getMutations,
  numberToBytes,
  valuesAreEqual
}, Symbol.toStringTag, { value: "Module" }));
let _shimRequested = false;
let _observable;
(async () => {
  const global2 = getGlobalObject();
  if (typeof global2.Observable !== "undefined") {
    _observable = global2.Observable;
    return;
  }
  try {
    const { Observable: Observable2 } = await __vitePreload(() => import("./index-cca0f97f.js"), true ? [] : void 0, import.meta.url);
    _observable = Observable2;
  } catch {
    _observable = SimpleObservable;
  }
})();
function getObservable() {
  if (_observable === SimpleObservable && !_shimRequested) {
    console.warn(`Using AceBase's simple Observable implementation because rxjs is not available. Add it to your project with "npm install rxjs", add it to AceBase using db.setObservable(Observable), or call db.setObservable("shim") to suppress this warning`);
  }
  if (_observable) {
    return _observable;
  }
  throw new Error("RxJS Observable could not be loaded. ");
}
function setObservable(Observable2) {
  if (Observable2 === "shim") {
    _observable = SimpleObservable;
    _shimRequested = true;
  } else {
    _observable = Observable2;
  }
}
class SimpleObservable {
  constructor(create) {
    this._active = false;
    this._subscribers = [];
    this._create = create;
  }
  subscribe(subscriber) {
    if (!this._active) {
      const next = (value) => {
        this._subscribers.forEach((s2) => {
          try {
            s2(value);
          } catch (err) {
            console.error("Error in subscriber callback:", err);
          }
        });
      };
      const observer = { next };
      this._cleanup = this._create(observer);
      this._active = true;
    }
    this._subscribers.push(subscriber);
    const unsubscribe = () => {
      this._subscribers.splice(this._subscribers.indexOf(subscriber), 1);
      if (this._subscribers.length === 0) {
        this._active = false;
        this._cleanup();
      }
    };
    const subscription = {
      unsubscribe
    };
    return subscription;
  }
}
class RelativeNodeTarget extends Array {
  static areEqual(t1, t2) {
    return t1.length === t2.length && t1.every((key, i) => t2[i] === key);
  }
  static isAncestor(ancestor, other) {
    return ancestor.length < other.length && ancestor.every((key, i) => other[i] === key);
  }
  static isDescendant(descendant, other) {
    return descendant.length > other.length && other.every((key, i) => descendant[i] === key);
  }
}
const isProxy = Symbol("isProxy");
class LiveDataProxy {
  /**
   * Creates a live data proxy for the given reference. The data of the reference's path will be loaded, and kept in-sync
   * with live data by listening for 'mutations' events. Any changes made to the value by the client will be synced back
   * to the database.
   * @param ref DataReference to create proxy for.
   * @param options proxy initialization options
   * be written to the database.
   */
  static async create(ref, options) {
    ref = new DataReference(ref.db, ref.path);
    let cache, loaded = false;
    let latestCursor = options == null ? void 0 : options.cursor;
    let proxy;
    const proxyId = ID.generate();
    const clientSubscriptions = [];
    const clientEventEmitter = new SimpleEventEmitter();
    clientEventEmitter.on("cursor", (cursor) => latestCursor = cursor);
    clientEventEmitter.on("error", (err) => {
      console.error(err.message, err.details);
    });
    const applyChange = (keys, newValue) => {
      if (keys.length === 0) {
        cache = newValue;
        return true;
      }
      let target = cache;
      const trailKeys = keys.slice();
      while (trailKeys.length > 1) {
        const key = trailKeys.shift();
        if (!(key in target)) {
          {
            return false;
          }
        }
        target = target[key];
      }
      const prop = trailKeys.shift();
      if (newValue === null) {
        target instanceof Array ? target.splice(prop, 1) : delete target[prop];
      } else {
        target[prop] = newValue;
      }
      return true;
    };
    const syncFallback = async () => {
      if (!loaded) {
        return;
      }
      await reload();
    };
    const subscription = ref.on("mutations", { syncFallback }).subscribe(async (snap2) => {
      var _a2;
      if (!loaded) {
        return;
      }
      const context2 = snap2.context();
      const isRemote = ((_a2 = context2.acebase_proxy) == null ? void 0 : _a2.id) !== proxyId;
      if (!isRemote) {
        return;
      }
      const mutations = snap2.val(false);
      const proceed = mutations.every((mutation) => {
        if (!applyChange(mutation.target, mutation.val)) {
          return false;
        }
        const changeRef = mutation.target.reduce((ref2, key) => ref2.child(key), ref);
        const changeSnap = new DataSnapshot(changeRef, mutation.val, false, mutation.prev, snap2.context());
        clientEventEmitter.emit("mutation", { snapshot: changeSnap, isRemote });
        return true;
      });
      if (proceed) {
        clientEventEmitter.emit("cursor", context2.acebase_cursor);
        localMutationsEmitter.emit("mutations", { origin: "remote", snap: snap2 });
      } else {
        console.warn(`Cached value of live data proxy on "${ref.path}" appears outdated, will be reloaded`);
        await reload();
      }
    });
    let processPromise = Promise.resolve();
    const mutationQueue = [];
    const transactions = [];
    const pushLocalMutations = async () => {
      const mutations = [];
      for (let i = 0, m2 = mutationQueue[0]; i < mutationQueue.length; i++, m2 = mutationQueue[i]) {
        if (!transactions.find((t) => RelativeNodeTarget.areEqual(t.target, m2.target) || RelativeNodeTarget.isAncestor(t.target, m2.target))) {
          mutationQueue.splice(i, 1);
          i--;
          mutations.push(m2);
        }
      }
      if (mutations.length === 0) {
        return;
      }
      mutations.forEach((mutation) => {
        mutation.value = cloneObject(getTargetValue(cache, mutation.target));
      });
      process$2.nextTick(() => {
        const context2 = { acebase_proxy: { id: proxyId, source: "update" } };
        mutations.forEach((mutation) => {
          const mutationRef = mutation.target.reduce((ref2, key) => ref2.child(key), ref);
          const mutationSnap = new DataSnapshot(mutationRef, mutation.value, false, mutation.previous, context2);
          clientEventEmitter.emit("mutation", { snapshot: mutationSnap, isRemote: false });
        });
        const snap2 = new MutationsDataSnapshot(ref, mutations.map((m2) => ({ target: m2.target, val: m2.value, prev: m2.previous })), context2);
        localMutationsEmitter.emit("mutations", { origin: "local", snap: snap2 });
      });
      processPromise = mutations.reduce((mutations2, m2, i, arr) => {
        if (!arr.some((other) => RelativeNodeTarget.isAncestor(other.target, m2.target))) {
          mutations2.push(m2);
        }
        return mutations2;
      }, []).reduce((updates, m2) => {
        const target = m2.target;
        if (target.length === 0) {
          updates.push({ ref, target, value: cache, type: "set", previous: m2.previous });
        } else {
          const parentTarget = target.slice(0, -1);
          const key = target.slice(-1)[0];
          const parentRef = parentTarget.reduce((ref2, key2) => ref2.child(key2), ref);
          const parentUpdate = updates.find((update) => update.ref.path === parentRef.path);
          const cacheValue = getTargetValue(cache, target);
          const prevValue = m2.previous;
          if (parentUpdate) {
            parentUpdate.value[key] = cacheValue;
            parentUpdate.previous[key] = prevValue;
          } else {
            updates.push({ ref: parentRef, target: parentTarget, value: { [key]: cacheValue }, type: "update", previous: { [key]: prevValue } });
          }
        }
        return updates;
      }, []).reduce(async (promise, update) => {
        const context2 = {
          acebase_proxy: {
            id: proxyId,
            source: update.type
            // update_id: ID.generate(),
            // batch_id: batchId,
            // batch_updates: updates.length
          }
        };
        await promise;
        await update.ref.context(context2)[update.type](update.value).catch((err) => {
          clientEventEmitter.emit("error", { source: "update", message: `Error processing update of "/${ref.path}"`, details: err });
          const context3 = { acebase_proxy: { id: proxyId, source: "update-rollback" } };
          const mutations2 = [];
          if (update.type === "set") {
            setTargetValue(cache, update.target, update.previous);
            const mutationSnap = new DataSnapshot(update.ref, update.previous, false, update.value, context3);
            clientEventEmitter.emit("mutation", { snapshot: mutationSnap, isRemote: false });
            mutations2.push({ target: update.target, val: update.previous, prev: update.value });
          } else {
            Object.keys(update.previous).forEach((key) => {
              setTargetValue(cache, update.target.concat(key), update.previous[key]);
              const mutationSnap = new DataSnapshot(update.ref.child(key), update.previous[key], false, update.value[key], context3);
              clientEventEmitter.emit("mutation", { snapshot: mutationSnap, isRemote: false });
              mutations2.push({ target: update.target.concat(key), val: update.previous[key], prev: update.value[key] });
            });
          }
          mutations2.forEach((m2) => {
            const mutationRef = m2.target.reduce((ref2, key) => ref2.child(key), ref);
            const mutationSnap = new DataSnapshot(mutationRef, m2.val, false, m2.prev, context3);
            clientEventEmitter.emit("mutation", { snapshot: mutationSnap, isRemote: false });
          });
          const snap2 = new MutationsDataSnapshot(update.ref, mutations2, context3);
          localMutationsEmitter.emit("mutations", { origin: "local", snap: snap2 });
        });
        if (update.ref.cursor) {
          clientEventEmitter.emit("cursor", update.ref.cursor);
        }
      }, processPromise);
      await processPromise;
    };
    let syncInProgress = false;
    const syncPromises = [];
    const syncCompleted = () => {
      let resolve;
      const promise = new Promise((rs) => resolve = rs);
      syncPromises.push({ resolve });
      return promise;
    };
    let processQueueTimeout = null;
    const scheduleSync = () => {
      if (!processQueueTimeout) {
        processQueueTimeout = setTimeout(async () => {
          syncInProgress = true;
          processQueueTimeout = null;
          await pushLocalMutations();
          syncInProgress = false;
          syncPromises.splice(0).forEach((p) => p.resolve());
        }, 0);
      }
    };
    const flagOverwritten = (target) => {
      if (!mutationQueue.find((m2) => RelativeNodeTarget.areEqual(m2.target, target))) {
        mutationQueue.push({ target, previous: cloneObject(getTargetValue(cache, target)) });
      }
      scheduleSync();
    };
    const localMutationsEmitter = new SimpleEventEmitter();
    const addOnChangeHandler = (target, callback) => {
      const isObject = (val) => val !== null && typeof val === "object";
      const mutationsHandler = async (details) => {
        var _a2;
        const { snap: snap2, origin } = details;
        const context2 = snap2.context();
        const causedByOurProxy = ((_a2 = context2.acebase_proxy) == null ? void 0 : _a2.id) === proxyId;
        if (details.origin === "remote" && causedByOurProxy) {
          console.error("DEV ISSUE: mutationsHandler was called from remote event originating from our own proxy");
          return;
        }
        const mutations = snap2.val(false).filter((mutation) => {
          return mutation.target.slice(0, target.length).every((key, i) => target[i] === key);
        });
        if (mutations.length === 0) {
          return;
        }
        let newValue, previousValue;
        const singleMutation = mutations.find((m2) => m2.target.length <= target.length);
        if (singleMutation) {
          const trailKeys = target.slice(singleMutation.target.length);
          newValue = trailKeys.reduce((val, key) => !isObject(val) || !(key in val) ? null : val[key], singleMutation.val);
          previousValue = trailKeys.reduce((val, key) => !isObject(val) || !(key in val) ? null : val[key], singleMutation.prev);
        } else {
          const currentValue = getTargetValue(cache, target);
          newValue = cloneObject(currentValue);
          previousValue = cloneObject(newValue);
          mutations.forEach((mutation) => {
            const trailKeys = mutation.target.slice(target.length);
            for (let i = 0, val = newValue, prev = previousValue; i < trailKeys.length; i++) {
              const last2 = i + 1 === trailKeys.length, key = trailKeys[i];
              if (last2) {
                val[key] = mutation.val;
                if (val[key] === null) {
                  delete val[key];
                }
                prev[key] = mutation.prev;
                if (prev[key] === null) {
                  delete prev[key];
                }
              } else {
                val = val[key] = key in val ? val[key] : {};
                prev = prev[key] = key in prev ? prev[key] : {};
              }
            }
          });
        }
        process$2.nextTick(() => {
          let keepSubscription = true;
          try {
            keepSubscription = false !== callback(Object.freeze(newValue), Object.freeze(previousValue), !causedByOurProxy, context2);
          } catch (err) {
            clientEventEmitter.emit("error", { source: origin === "remote" ? "remote_update" : "local_update", message: "Error running subscription callback", details: err });
          }
          if (keepSubscription === false) {
            stop();
          }
        });
      };
      localMutationsEmitter.on("mutations", mutationsHandler);
      const stop = () => {
        localMutationsEmitter.off("mutations", mutationsHandler);
        clientSubscriptions.splice(clientSubscriptions.findIndex((cs) => cs.stop === stop), 1);
      };
      clientSubscriptions.push({ target, stop });
      return { stop };
    };
    const handleFlag = (flag, target, args) => {
      if (flag === "write") {
        return flagOverwritten(target);
      } else if (flag === "onChange") {
        return addOnChangeHandler(target, args.callback);
      } else if (flag === "subscribe" || flag === "observe") {
        const subscribe2 = (subscriber) => {
          const currentValue = getTargetValue(cache, target);
          subscriber.next(currentValue);
          const subscription2 = addOnChangeHandler(target, (value) => {
            subscriber.next(value);
          });
          return function unsubscribe() {
            subscription2.stop();
          };
        };
        if (flag === "subscribe") {
          return subscribe2;
        }
        const Observable2 = getObservable();
        return new Observable2(subscribe2);
      } else if (flag === "transaction") {
        const hasConflictingTransaction = transactions.some((t) => RelativeNodeTarget.areEqual(target, t.target) || RelativeNodeTarget.isAncestor(target, t.target) || RelativeNodeTarget.isDescendant(target, t.target));
        if (hasConflictingTransaction) {
          return Promise.reject(new Error("Cannot start transaction because it conflicts with another transaction"));
        }
        return new Promise(async (resolve) => {
          const hasPendingMutations = mutationQueue.some((m2) => RelativeNodeTarget.areEqual(target, m2.target) || RelativeNodeTarget.isAncestor(target, m2.target));
          if (hasPendingMutations) {
            if (!syncInProgress) {
              scheduleSync();
            }
            await syncCompleted();
          }
          const tx = { target, status: "started", transaction: null };
          transactions.push(tx);
          tx.transaction = {
            get status() {
              return tx.status;
            },
            get completed() {
              return tx.status !== "started";
            },
            get mutations() {
              return mutationQueue.filter((m2) => RelativeNodeTarget.areEqual(tx.target, m2.target) || RelativeNodeTarget.isAncestor(tx.target, m2.target));
            },
            get hasMutations() {
              return this.mutations.length > 0;
            },
            async commit() {
              if (this.completed) {
                throw new Error(`Transaction has completed already (status '${tx.status}')`);
              }
              tx.status = "finished";
              transactions.splice(transactions.indexOf(tx), 1);
              if (syncInProgress) {
                await syncCompleted();
              }
              scheduleSync();
              await syncCompleted();
            },
            rollback() {
              if (this.completed) {
                throw new Error(`Transaction has completed already (status '${tx.status}')`);
              }
              tx.status = "canceled";
              const mutations = [];
              for (let i = 0; i < mutationQueue.length; i++) {
                const m2 = mutationQueue[i];
                if (RelativeNodeTarget.areEqual(tx.target, m2.target) || RelativeNodeTarget.isAncestor(tx.target, m2.target)) {
                  mutationQueue.splice(i, 1);
                  i--;
                  mutations.push(m2);
                }
              }
              mutations.reverse().forEach((m2) => {
                if (m2.target.length === 0) {
                  cache = m2.previous;
                } else {
                  setTargetValue(cache, m2.target, m2.previous);
                }
              });
              transactions.splice(transactions.indexOf(tx), 1);
            }
          };
          resolve(tx.transaction);
        });
      }
    };
    const snap = await ref.get({ cache_mode: "allow", cache_cursor: options == null ? void 0 : options.cursor });
    if (snap.context().acebase_origin !== "cache") {
      clientEventEmitter.emit("cursor", ref.cursor ?? null);
    }
    loaded = true;
    cache = snap.val();
    if (cache === null && typeof (options == null ? void 0 : options.defaultValue) !== "undefined") {
      cache = options.defaultValue;
      const context2 = {
        acebase_proxy: {
          id: proxyId,
          source: "default"
          // update_id: ID.generate()
        }
      };
      await ref.context(context2).set(cache);
    }
    proxy = createProxy({ root: { ref, get cache() {
      return cache;
    } }, target: [], id: proxyId, flag: handleFlag });
    const assertProxyAvailable = () => {
      if (proxy === null) {
        throw new Error("Proxy was destroyed");
      }
    };
    const reload = async () => {
      assertProxyAvailable();
      mutationQueue.splice(0);
      const snap2 = await ref.get({ allow_cache: false });
      const oldVal = cache, newVal = snap2.val();
      cache = newVal;
      const mutations = getMutations(oldVal, newVal);
      if (mutations.length === 0) {
        return;
      }
      const context2 = snap2.context();
      context2.acebase_proxy = { id: proxyId, source: "reload" };
      mutations.forEach((m2) => {
        const targetRef = getTargetRef(ref, m2.target);
        const newSnap = new DataSnapshot(targetRef, m2.val, m2.val === null, m2.prev, context2);
        clientEventEmitter.emit("mutation", { snapshot: newSnap, isRemote: true });
      });
      const mutationsSnap = new MutationsDataSnapshot(ref, mutations, context2);
      localMutationsEmitter.emit("mutations", { origin: "local", snap: mutationsSnap });
    };
    return {
      async destroy() {
        await processPromise;
        const promises = [
          subscription.stop(),
          ...clientSubscriptions.map((cs) => cs.stop())
        ];
        await Promise.all(promises);
        ["cursor", "mutation", "error"].forEach((event) => clientEventEmitter.off(event));
        cache = null;
        proxy = null;
      },
      stop() {
        this.destroy();
      },
      get value() {
        assertProxyAvailable();
        return proxy;
      },
      get hasValue() {
        assertProxyAvailable();
        return cache !== null;
      },
      set value(val) {
        assertProxyAvailable();
        if (val !== null && typeof val === "object" && val[isProxy]) {
          val = val.valueOf();
        }
        flagOverwritten([]);
        cache = val;
      },
      get ref() {
        return ref;
      },
      get cursor() {
        return latestCursor;
      },
      reload,
      onMutation(callback) {
        assertProxyAvailable();
        clientEventEmitter.off("mutation");
        clientEventEmitter.on("mutation", ({ snapshot, isRemote }) => {
          try {
            callback(snapshot, isRemote);
          } catch (err) {
            clientEventEmitter.emit("error", { source: "mutation_callback", message: "Error in dataproxy onMutation callback", details: err });
          }
        });
      },
      onError(callback) {
        assertProxyAvailable();
        clientEventEmitter.off("error");
        clientEventEmitter.on("error", (err) => {
          try {
            callback(err);
          } catch (err2) {
            console.error(`Error in dataproxy onError callback: ${err2.message}`);
          }
        });
      },
      on(event, callback) {
        clientEventEmitter.on(event, callback);
      },
      off(event, callback) {
        clientEventEmitter.off(event, callback);
      }
    };
  }
}
function getTargetValue(obj, target) {
  let val = obj;
  for (const key of target) {
    val = typeof val === "object" && val !== null && key in val ? val[key] : null;
  }
  return val;
}
function setTargetValue(obj, target, value) {
  if (target.length === 0) {
    throw new Error("Cannot update root target, caller must do that itself!");
  }
  const targetObject = target.slice(0, -1).reduce((obj2, key) => obj2[key], obj);
  const prop = target.slice(-1)[0];
  if (value === null || typeof value === "undefined") {
    targetObject instanceof Array ? targetObject.splice(prop, 1) : delete targetObject[prop];
  } else {
    targetObject[prop] = value;
  }
}
function getTargetRef(ref, target) {
  const path = PathInfo.get(ref.path).childPath(target);
  return new DataReference(ref.db, path);
}
function createProxy(context2) {
  const targetRef = getTargetRef(context2.root.ref, context2.target);
  const childProxies = [];
  const handler = {
    get(target, prop, receiver) {
      target = getTargetValue(context2.root.cache, context2.target);
      if (typeof prop === "symbol") {
        if (prop.toString() === Symbol.iterator.toString()) {
          prop = "values";
        } else if (prop.toString() === isProxy.toString()) {
          return true;
        } else {
          return Reflect.get(target, prop, receiver);
        }
      }
      if (prop === "valueOf") {
        return function valueOf() {
          return target;
        };
      }
      if (target === null || typeof target !== "object") {
        throw new Error(`Cannot read property "${prop}" of ${target}. Value of path "/${targetRef.path}" is not an object (anymore)`);
      }
      if (target instanceof Array && typeof prop === "string" && /^[0-9]+$/.test(prop)) {
        prop = parseInt(prop);
      }
      const value = target[prop];
      if (value === null) {
        delete target[prop];
        return;
      }
      const childProxy = childProxies.find((proxy2) => proxy2.prop === prop);
      if (childProxy) {
        if (childProxy.typeof === typeof value) {
          return childProxy.value;
        }
        childProxies.splice(childProxies.indexOf(childProxy), 1);
      }
      const proxifyChildValue = (prop2) => {
        const value2 = target[prop2];
        const childProxy2 = childProxies.find((child) => child.prop === prop2);
        if (childProxy2) {
          if (childProxy2.typeof === typeof value2) {
            return childProxy2.value;
          }
          childProxies.splice(childProxies.indexOf(childProxy2), 1);
        }
        if (typeof value2 !== "object") {
          return value2;
        }
        const newChildProxy = createProxy({ root: context2.root, target: context2.target.concat(prop2), id: context2.id, flag: context2.flag });
        childProxies.push({ typeof: typeof value2, prop: prop2, value: newChildProxy });
        return newChildProxy;
      };
      const unproxyValue = (value2) => {
        return value2 !== null && typeof value2 === "object" && value2[isProxy] ? value2.getTarget() : value2;
      };
      if (["string", "number", "boolean"].includes(typeof value) || value instanceof Date || value instanceof PathReference || value instanceof ArrayBuffer || typeof value === "object" && "buffer" in value) {
        return value;
      }
      const isArray = target instanceof Array;
      if (prop === "toString") {
        return function toString() {
          return `[LiveDataProxy for "${targetRef.path}"]`;
        };
      }
      if (typeof value === "undefined") {
        if (prop === "push") {
          return function push(item) {
            const childRef = targetRef.push();
            context2.flag("write", context2.target.concat(childRef.key));
            target[childRef.key] = item;
            return childRef.key;
          };
        }
        if (prop === "getTarget") {
          return function(warn = true) {
            warn && console.warn("Use getTarget with caution - any changes will not be synchronized!");
            return target;
          };
        }
        if (prop === "getRef") {
          return function getRef() {
            const ref = getTargetRef(context2.root.ref, context2.target);
            return ref;
          };
        }
        if (prop === "forEach") {
          return function forEach(callback) {
            const keys = Object.keys(target);
            let stop = false;
            for (let i = 0; !stop && i < keys.length; i++) {
              const key = keys[i];
              const value2 = proxifyChildValue(key);
              stop = callback(value2, key, i) === false;
            }
          };
        }
        if (["values", "entries", "keys"].includes(prop)) {
          return function* generator() {
            const keys = Object.keys(target);
            for (const key of keys) {
              if (prop === "keys") {
                yield key;
              } else {
                const value2 = proxifyChildValue(key);
                if (prop === "entries") {
                  yield [key, value2];
                } else {
                  yield value2;
                }
              }
            }
          };
        }
        if (prop === "toArray") {
          return function toArray(sortFn) {
            const arr = Object.keys(target).map((key) => proxifyChildValue(key));
            if (sortFn) {
              arr.sort(sortFn);
            }
            return arr;
          };
        }
        if (prop === "onChanged") {
          return function onChanged(callback) {
            return context2.flag("onChange", context2.target, { callback });
          };
        }
        if (prop === "subscribe") {
          return function subscribe2() {
            return context2.flag("subscribe", context2.target);
          };
        }
        if (prop === "getObservable") {
          return function getObservable2() {
            return context2.flag("observe", context2.target);
          };
        }
        if (prop === "getOrderedCollection") {
          return function getOrderedCollection(orderProperty, orderIncrement) {
            return new OrderedCollectionProxy(this, orderProperty, orderIncrement);
          };
        }
        if (prop === "startTransaction") {
          return function startTransaction() {
            return context2.flag("transaction", context2.target);
          };
        }
        if (prop === "remove" && !isArray) {
          return function remove() {
            if (context2.target.length === 0) {
              throw new Error("Can't remove proxy root value");
            }
            const parent = getTargetValue(context2.root.cache, context2.target.slice(0, -1));
            const key = context2.target.slice(-1)[0];
            context2.flag("write", context2.target);
            delete parent[key];
          };
        }
        return;
      } else if (typeof value === "function") {
        if (isArray) {
          const writeArray = (action) => {
            context2.flag("write", context2.target);
            return action();
          };
          const cleanArrayValues = (values) => values.map((value2) => {
            value2 = unproxyValue(value2);
            removeVoidProperties(value2);
            return value2;
          });
          if (prop === "push") {
            return function push(...items) {
              items = cleanArrayValues(items);
              return writeArray(() => target.push(...items));
            };
          }
          if (prop === "pop") {
            return function pop() {
              return writeArray(() => target.pop());
            };
          }
          if (prop === "splice") {
            return function splice(start, deleteCount, ...items) {
              items = cleanArrayValues(items);
              return writeArray(() => target.splice(start, deleteCount, ...items));
            };
          }
          if (prop === "shift") {
            return function shift() {
              return writeArray(() => target.shift());
            };
          }
          if (prop === "unshift") {
            return function unshift(...items) {
              items = cleanArrayValues(items);
              return writeArray(() => target.unshift(...items));
            };
          }
          if (prop === "sort") {
            return function sort(compareFn) {
              return writeArray(() => target.sort(compareFn));
            };
          }
          if (prop === "reverse") {
            return function reverse() {
              return writeArray(() => target.reverse());
            };
          }
          if (["indexOf", "lastIndexOf"].includes(prop)) {
            return function indexOf(item, start) {
              if (item !== null && typeof item === "object" && item[isProxy]) {
                item = item.getTarget(false);
              }
              return target[prop](item, start);
            };
          }
          if (["forEach", "every", "some", "filter", "map"].includes(prop)) {
            return function iterate(callback) {
              return target[prop]((value2, i) => {
                return callback(proxifyChildValue(i), i, proxy);
              });
            };
          }
          if (["reduce", "reduceRight"].includes(prop)) {
            return function reduce(callback, initialValue) {
              return target[prop]((prev, value2, i) => {
                return callback(prev, proxifyChildValue(i), i, proxy);
              }, initialValue);
            };
          }
          if (["find", "findIndex"].includes(prop)) {
            return function find(callback) {
              let value2 = target[prop]((value3, i) => {
                return callback(proxifyChildValue(i), i, proxy);
              });
              if (prop === "find" && value2) {
                const index = target.indexOf(value2);
                value2 = proxifyChildValue(index);
              }
              return value2;
            };
          }
          if (["values", "entries", "keys"].includes(prop)) {
            return function* generator() {
              for (let i = 0; i < target.length; i++) {
                if (prop === "keys") {
                  yield i;
                } else {
                  const value2 = proxifyChildValue(i);
                  if (prop === "entries") {
                    yield [i, value2];
                  } else {
                    yield value2;
                  }
                }
              }
            };
          }
        }
        return value;
      }
      return proxifyChildValue(prop);
    },
    set(target, prop, value, receiver) {
      target = getTargetValue(context2.root.cache, context2.target);
      if (typeof prop === "symbol") {
        return Reflect.set(target, prop, value, receiver);
      }
      if (target === null || typeof target !== "object") {
        throw new Error(`Cannot set property "${prop}" of ${target}. Value of path "/${targetRef.path}" is not an object`);
      }
      if (target instanceof Array && typeof prop === "string") {
        if (!/^[0-9]+$/.test(prop)) {
          throw new Error(`Cannot set property "${prop}" on array value of path "/${targetRef.path}"`);
        }
        prop = parseInt(prop);
      }
      if (value !== null) {
        if (typeof value === "object") {
          if (value[isProxy]) {
            value = value.valueOf();
          }
          value = cloneObject(value);
        }
        if (valuesAreEqual(value, target[prop])) {
          return true;
        }
      }
      if (context2.target.some((key) => typeof key === "number")) {
        context2.flag("write", context2.target.slice(0, context2.target.findIndex((key) => typeof key === "number")));
      } else if (target instanceof Array) {
        context2.flag("write", context2.target);
      } else {
        context2.flag("write", context2.target.concat(prop));
      }
      if (value === null) {
        delete target[prop];
      } else {
        removeVoidProperties(value);
        target[prop] = value;
      }
      return true;
    },
    deleteProperty(target, prop) {
      target = getTargetValue(context2.root.cache, context2.target);
      if (target === null) {
        throw new Error(`Cannot delete property ${prop.toString()} of null`);
      }
      if (typeof prop === "symbol") {
        return Reflect.deleteProperty(target, prop);
      }
      if (!(prop in target)) {
        return true;
      }
      context2.flag("write", context2.target.concat(prop));
      delete target[prop];
      return true;
    },
    ownKeys(target) {
      target = getTargetValue(context2.root.cache, context2.target);
      return Reflect.ownKeys(target);
    },
    has(target, prop) {
      target = getTargetValue(context2.root.cache, context2.target);
      return Reflect.has(target, prop);
    },
    getOwnPropertyDescriptor(target, prop) {
      target = getTargetValue(context2.root.cache, context2.target);
      const descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
      if (descriptor) {
        descriptor.configurable = true;
      }
      return descriptor;
    },
    getPrototypeOf(target) {
      target = getTargetValue(context2.root.cache, context2.target);
      return Reflect.getPrototypeOf(target);
    }
  };
  const proxy = new Proxy({}, handler);
  return proxy;
}
function removeVoidProperties(obj) {
  if (typeof obj !== "object") {
    return;
  }
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (val === null || typeof val === "undefined") {
      delete obj[key];
    } else if (typeof val === "object") {
      removeVoidProperties(val);
    }
  });
}
function proxyAccess(proxiedValue) {
  if (typeof proxiedValue !== "object" || !proxiedValue[isProxy]) {
    throw new Error("Given value is not proxied. Make sure you are referencing the value through the live data proxy.");
  }
  return proxiedValue;
}
class OrderedCollectionProxy {
  constructor(collection, orderProperty = "order", orderIncrement = 10) {
    this.collection = collection;
    this.orderProperty = orderProperty;
    this.orderIncrement = orderIncrement;
    if (typeof collection !== "object" || !collection[isProxy]) {
      throw new Error("Collection is not proxied");
    }
    if (collection.valueOf() instanceof Array) {
      throw new Error("Collection is an array, not an object collection");
    }
    if (!Object.keys(collection).every((key) => typeof collection[key] === "object")) {
      throw new Error("Collection has non-object children");
    }
    const ok = Object.keys(collection).every((key) => typeof collection[key][orderProperty] === "number");
    if (!ok) {
      const keys = Object.keys(collection);
      for (let i = 0; i < keys.length; i++) {
        const item = collection[keys[i]];
        item[orderProperty] = i * orderIncrement;
      }
    }
  }
  /**
   * Gets an observable for the target object collection. Same as calling `collection.getObservable()`
   * @returns
   */
  getObservable() {
    return proxyAccess(this.collection).getObservable();
  }
  /**
   * Gets an observable that emits a new ordered array representation of the object collection each time
   * the unlaying data is changed. Same as calling `getArray()` in a `getObservable().subscribe` callback
   * @returns
   */
  getArrayObservable() {
    const Observable2 = getObservable();
    return new Observable2((subscriber) => {
      const subscription = this.getObservable().subscribe(() => {
        const newArray = this.getArray();
        subscriber.next(newArray);
      });
      return function unsubscribe() {
        subscription.unsubscribe();
      };
    });
  }
  /**
   * Gets an ordered array representation of the items in your object collection. The items in the array
   * are proxied values, changes will be in sync with the database. Note that the array itself
   * is not mutable: adding or removing items to it will NOT update the collection in the
   * the database and vice versa. Use `add`, `delete`, `sort` and `move` methods to make changes
   * that impact the collection's sorting order
   * @returns order array
   */
  getArray() {
    const arr = proxyAccess(this.collection).toArray((a, b) => a[this.orderProperty] - b[this.orderProperty]);
    return arr;
  }
  /**
   * Adds or moves an item to/within the object collection and takes care of the proper sorting order.
   * @param item Item to add or move
   * @param index Optional target index in the sorted representation, appends if not specified.
   * @param from If the item is being moved
   * @returns
   */
  add(item, index, from2) {
    const arr = this.getArray();
    let minOrder = Number.POSITIVE_INFINITY, maxOrder = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < arr.length; i++) {
      const order = arr[i][this.orderProperty];
      minOrder = Math.min(order, minOrder);
      maxOrder = Math.max(order, maxOrder);
    }
    let fromKey;
    if (typeof from2 === "number") {
      fromKey = Object.keys(this.collection).find((key2) => this.collection[key2] === item);
      if (!fromKey) {
        throw new Error("item not found in collection");
      }
      if (from2 === index) {
        return { key: fromKey, index };
      }
      if (Math.abs(from2 - index) === 1) {
        const otherItem = arr[index];
        const otherOrder = otherItem[this.orderProperty];
        otherItem[this.orderProperty] = item[this.orderProperty];
        item[this.orderProperty] = otherOrder;
        return { key: fromKey, index };
      } else {
        arr.splice(from2, 1);
      }
    }
    if (typeof index !== "number" || index >= arr.length) {
      index = arr.length;
      item[this.orderProperty] = arr.length == 0 ? 0 : maxOrder + this.orderIncrement;
    } else if (index === 0) {
      item[this.orderProperty] = arr.length == 0 ? 0 : minOrder - this.orderIncrement;
    } else {
      const orders = arr.map((item2) => item2[this.orderProperty]);
      const gap = orders[index] - orders[index - 1];
      if (gap > 1) {
        item[this.orderProperty] = orders[index] - Math.floor(gap / 2);
      } else {
        arr.splice(index, 0, item);
        for (let i = 0; i < arr.length; i++) {
          arr[i][this.orderProperty] = i * this.orderIncrement;
        }
      }
    }
    const key = typeof fromKey === "string" ? fromKey : proxyAccess(this.collection).push(item);
    return { key, index };
  }
  /**
   * Deletes an item from the object collection using the their index in the sorted array representation
   * @param index
   * @returns the key of the collection's child that was deleted
   */
  delete(index) {
    const arr = this.getArray();
    const item = arr[index];
    if (!item) {
      throw new Error(`Item at index ${index} not found`);
    }
    const key = Object.keys(this.collection).find((key2) => this.collection[key2] === item);
    if (!key) {
      throw new Error("Cannot find target object to delete");
    }
    this.collection[key] = null;
    return { key, index };
  }
  /**
   * Moves an item in the object collection by reordering it
   * @param fromIndex Current index in the array (the ordered representation of the object collection)
   * @param toIndex Target index in the array
   * @returns
   */
  move(fromIndex, toIndex) {
    const arr = this.getArray();
    return this.add(arr[fromIndex], toIndex, fromIndex);
  }
  /**
   * Reorders the object collection using given sort function. Allows quick reordering of the collection which is persisted in the database
   * @param sortFn
   */
  sort(sortFn) {
    const arr = this.getArray();
    arr.sort(sortFn);
    for (let i = 0; i < arr.length; i++) {
      arr[i][this.orderProperty] = i * this.orderIncrement;
    }
  }
}
class DataRetrievalOptions {
  /**
   * Options for data retrieval, allows selective loading of object properties
   */
  constructor(options) {
    if (!options) {
      options = {};
    }
    if (typeof options.include !== "undefined" && !(options.include instanceof Array)) {
      throw new TypeError("options.include must be an array");
    }
    if (typeof options.exclude !== "undefined" && !(options.exclude instanceof Array)) {
      throw new TypeError("options.exclude must be an array");
    }
    if (typeof options.child_objects !== "undefined" && typeof options.child_objects !== "boolean") {
      throw new TypeError("options.child_objects must be a boolean");
    }
    if (typeof options.cache_mode === "string" && !["allow", "bypass", "force"].includes(options.cache_mode)) {
      throw new TypeError("invalid value for options.cache_mode");
    }
    this.include = options.include || void 0;
    this.exclude = options.exclude || void 0;
    this.child_objects = typeof options.child_objects === "boolean" ? options.child_objects : void 0;
    this.cache_mode = typeof options.cache_mode === "string" ? options.cache_mode : typeof options.allow_cache === "boolean" ? options.allow_cache ? "allow" : "bypass" : "allow";
    this.cache_cursor = typeof options.cache_cursor === "string" ? options.cache_cursor : void 0;
  }
}
class QueryDataRetrievalOptions extends DataRetrievalOptions {
  /**
   * @param options Options for data retrieval, allows selective loading of object properties
   */
  constructor(options) {
    super(options);
    if (!["undefined", "boolean"].includes(typeof options.snapshots)) {
      throw new TypeError("options.snapshots must be a boolean");
    }
    this.snapshots = typeof options.snapshots === "boolean" ? options.snapshots : true;
  }
}
const _private = Symbol("private");
class DataReference {
  /**
   * Creates a reference to a node
   */
  constructor(db, path, vars) {
    this.db = db;
    if (!path) {
      path = "";
    }
    path = path.replace(/^\/|\/$/g, "");
    const pathInfo = PathInfo.get(path);
    const key = pathInfo.key;
    const callbacks = [];
    this[_private] = {
      get path() {
        return path;
      },
      get key() {
        return key;
      },
      get callbacks() {
        return callbacks;
      },
      vars: vars || {},
      context: {},
      pushed: false,
      cursor: null
    };
  }
  context(context2, merge = false) {
    const currentContext = this[_private].context;
    if (typeof context2 === "object") {
      const newContext = context2 ? merge ? currentContext || {} : context2 : {};
      if (context2) {
        Object.keys(context2).forEach((key) => {
          newContext[key] = context2[key];
        });
      }
      this[_private].context = newContext;
      return this;
    } else if (typeof context2 === "undefined") {
      console.warn("Use snap.context() instead of snap.ref.context() to get updating context in event callbacks");
      return currentContext;
    } else {
      throw new Error("Invalid context argument");
    }
  }
  /**
   * Contains the last received cursor for this referenced path (if the connected database has transaction logging enabled).
   * If you want to be notified if this value changes, add a handler with `ref.onCursor(callback)`
   */
  get cursor() {
    return this[_private].cursor;
  }
  set cursor(value) {
    var _a2;
    this[_private].cursor = value;
    (_a2 = this.onCursor) == null ? void 0 : _a2.call(this, value);
  }
  /**
  * The path this instance was created with
  */
  get path() {
    return this[_private].path;
  }
  /**
   * The key or index of this node
   */
  get key() {
    const key = this[_private].key;
    return typeof key === "number" ? `[${key}]` : key;
  }
  /**
   * If the "key" is a number, it is an index!
   */
  get index() {
    const key = this[_private].key;
    if (typeof key !== "number") {
      throw new Error(`"${key}" is not a number`);
    }
    return key;
  }
  /**
   * Returns a new reference to this node's parent
   */
  get parent() {
    const currentPath = PathInfo.fillVariables2(this.path, this.vars);
    const info = PathInfo.get(currentPath);
    if (info.parentPath === null) {
      return null;
    }
    return new DataReference(this.db, info.parentPath).context(this[_private].context);
  }
  /**
   * Contains values of the variables/wildcards used in a subscription path if this reference was
   * created by an event ("value", "child_added" etc), or in a type mapping path when serializing / instantiating typed objects
   */
  get vars() {
    return this[_private].vars;
  }
  /**
   * Returns a new reference to a child node
   * @param childPath Child key, index or path
   * @returns reference to the child
   */
  child(childPath) {
    childPath = typeof childPath === "number" ? childPath : childPath.replace(/^\/|\/$/g, "");
    const currentPath = PathInfo.fillVariables2(this.path, this.vars);
    const targetPath = PathInfo.getChildPath(currentPath, childPath);
    return new DataReference(this.db, targetPath).context(this[_private].context);
  }
  /**
   * Sets or overwrites the stored value
   * @param value value to store in database
   * @param onComplete optional completion callback to use instead of returning promise
   * @returns promise that resolves with this reference when completed
   */
  async set(value, onComplete) {
    try {
      if (this.isWildcardPath) {
        throw new Error(`Cannot set the value of wildcard path "/${this.path}"`);
      }
      if (this.parent === null) {
        throw new Error("Cannot set the root object. Use update, or set individual child properties");
      }
      if (typeof value === "undefined") {
        throw new TypeError(`Cannot store undefined value in "/${this.path}"`);
      }
      if (!this.db.isReady) {
        await this.db.ready();
      }
      value = this.db.types.serialize(this.path, value);
      const { cursor } = await this.db.api.set(this.path, value, { context: this[_private].context });
      this.cursor = cursor;
      if (typeof onComplete === "function") {
        try {
          onComplete(null, this);
        } catch (err) {
          console.error("Error in onComplete callback:", err);
        }
      }
    } catch (err) {
      if (typeof onComplete === "function") {
        try {
          onComplete(err, this);
        } catch (err2) {
          console.error("Error in onComplete callback:", err2);
        }
      } else {
        throw err;
      }
    }
    return this;
  }
  /**
   * Updates properties of the referenced node
   * @param updates object containing the properties to update
   * @param onComplete optional completion callback to use instead of returning promise
   * @return returns promise that resolves with this reference once completed
   */
  async update(updates, onComplete) {
    try {
      if (this.isWildcardPath) {
        throw new Error(`Cannot update the value of wildcard path "/${this.path}"`);
      }
      if (!this.db.isReady) {
        await this.db.ready();
      }
      if (typeof updates !== "object" || updates instanceof Array || updates instanceof ArrayBuffer || updates instanceof Date) {
        await this.set(updates);
      } else if (Object.keys(updates).length === 0) {
        console.warn(`update called on path "/${this.path}", but there is nothing to update`);
      } else {
        updates = this.db.types.serialize(this.path, updates);
        const { cursor } = await this.db.api.update(this.path, updates, { context: this[_private].context });
        this.cursor = cursor;
      }
      if (typeof onComplete === "function") {
        try {
          onComplete(null, this);
        } catch (err) {
          console.error("Error in onComplete callback:", err);
        }
      }
    } catch (err) {
      if (typeof onComplete === "function") {
        try {
          onComplete(err, this);
        } catch (err2) {
          console.error("Error in onComplete callback:", err2);
        }
      } else {
        throw err;
      }
    }
    return this;
  }
  /**
   * Sets the value a node using a transaction: it runs your callback function with the current value, uses its return value as the new value to store.
   * The transaction is canceled if your callback returns undefined, or throws an error. If your callback returns null, the target node will be removed.
   * @param callback - callback function that performs the transaction on the node's current value. It must return the new value to store (or promise with new value), undefined to cancel the transaction, or null to remove the node.
   * @returns returns a promise that resolves with the DataReference once the transaction has been processed
   */
  async transaction(callback) {
    if (this.isWildcardPath) {
      throw new Error(`Cannot start a transaction on wildcard path "/${this.path}"`);
    }
    if (!this.db.isReady) {
      await this.db.ready();
    }
    let throwError;
    const cb = (currentValue) => {
      currentValue = this.db.types.deserialize(this.path, currentValue);
      const snap = new DataSnapshot(this, currentValue);
      let newValue;
      try {
        newValue = callback(snap);
      } catch (err) {
        throwError = err;
        return;
      }
      if (newValue instanceof Promise) {
        return newValue.then((val) => {
          return this.db.types.serialize(this.path, val);
        }).catch((err) => {
          throwError = err;
          return;
        });
      } else {
        return this.db.types.serialize(this.path, newValue);
      }
    };
    const { cursor } = await this.db.api.transaction(this.path, cb, { context: this[_private].context });
    this.cursor = cursor;
    if (throwError) {
      throw throwError;
    }
    return this;
  }
  on(event, callback, cancelCallback) {
    if (this.path === "" && ["value", "child_changed"].includes(event)) {
      console.warn("WARNING: Listening for value and child_changed events on the root node is a bad practice. These events require loading of all data (value event), or potentially lots of data (child_changed event) each time they are fired");
    }
    let eventPublisher = null;
    const eventStream = new EventStream((publisher) => {
      eventPublisher = publisher;
    });
    const cb = {
      event,
      stream: eventStream,
      userCallback: typeof callback === "function" && callback,
      ourCallback: (err, path, newValue, oldValue, eventContext) => {
        if (err) {
          this.db.debug.error(`Error getting data for event ${event} on path "${path}"`, err);
          return;
        }
        const ref = this.db.ref(path);
        ref[_private].vars = PathInfo.extractVariables(this.path, path);
        let callbackObject;
        if (event.startsWith("notify_")) {
          callbackObject = ref.context(eventContext || {});
        } else {
          const values = {
            previous: this.db.types.deserialize(path, oldValue),
            current: this.db.types.deserialize(path, newValue)
          };
          if (event === "child_removed") {
            callbackObject = new DataSnapshot(ref, values.previous, true, values.previous, eventContext);
          } else if (event === "mutations") {
            callbackObject = new MutationsDataSnapshot(ref, values.current, eventContext);
          } else {
            const isRemoved = event === "mutated" && values.current === null;
            callbackObject = new DataSnapshot(ref, values.current, isRemoved, values.previous, eventContext);
          }
        }
        eventPublisher.publish(callbackObject);
        if (eventContext == null ? void 0 : eventContext.acebase_cursor) {
          this.cursor = eventContext.acebase_cursor;
        }
      }
    };
    this[_private].callbacks.push(cb);
    const subscribe2 = () => {
      if (typeof callback === "function") {
        eventStream.subscribe(callback, (activated, cancelReason) => {
          if (!activated) {
            cancelCallback && cancelCallback(cancelReason);
          }
        });
      }
      const advancedOptions = typeof callback === "object" ? callback : { newOnly: !callback };
      if (typeof advancedOptions.newOnly !== "boolean") {
        advancedOptions.newOnly = false;
      }
      if (this.isWildcardPath) {
        advancedOptions.newOnly = true;
      }
      const cancelSubscription = (err) => {
        const callbacks = this[_private].callbacks;
        callbacks.splice(callbacks.indexOf(cb), 1);
        this.db.api.unsubscribe(this.path, event, cb.ourCallback);
        this.db.debug.error(`Subscription "${event}" on path "/${this.path}" canceled because of an error: ${err.message}`);
        eventPublisher.cancel(err.message);
      };
      const authorized = this.db.api.subscribe(this.path, event, cb.ourCallback, { newOnly: advancedOptions.newOnly, cancelCallback: cancelSubscription, syncFallback: advancedOptions.syncFallback });
      const allSubscriptionsStoppedCallback = () => {
        const callbacks = this[_private].callbacks;
        callbacks.splice(callbacks.indexOf(cb), 1);
        return this.db.api.unsubscribe(this.path, event, cb.ourCallback);
      };
      if (authorized instanceof Promise) {
        authorized.then(() => {
          eventPublisher.start(allSubscriptionsStoppedCallback);
        }).catch(cancelSubscription);
      } else {
        eventPublisher.start(allSubscriptionsStoppedCallback);
      }
      if (!advancedOptions.newOnly) {
        if (event === "value") {
          this.get((snap) => {
            eventPublisher.publish(snap);
          });
        } else if (event === "child_added") {
          this.get((snap) => {
            const val = snap.val();
            if (val === null || typeof val !== "object") {
              return;
            }
            Object.keys(val).forEach((key) => {
              const childSnap = new DataSnapshot(this.child(key), val[key]);
              eventPublisher.publish(childSnap);
            });
          });
        } else if (event === "notify_child_added") {
          const step = 100, limit = step;
          let skip = 0;
          const more = async () => {
            const children2 = await this.db.api.reflect(this.path, "children", { limit, skip });
            children2.list.forEach((child) => {
              const childRef = this.child(child.key);
              eventPublisher.publish(childRef);
            });
            if (children2.more) {
              skip += step;
              more();
            }
          };
          more();
        }
      }
    };
    if (this.db.isReady) {
      subscribe2();
    } else {
      this.db.ready(subscribe2);
    }
    return eventStream;
  }
  off(event, callback) {
    const subscriptions = this[_private].callbacks;
    const stopSubs = subscriptions.filter((sub) => (!event || sub.event === event) && (!callback || sub.userCallback === callback));
    if (stopSubs.length === 0) {
      this.db.debug.warn(`Can't find event subscriptions to stop (path: "${this.path}", event: ${event || "(any)"}, callback: ${callback})`);
    }
    stopSubs.forEach((sub) => {
      sub.stream.stop();
    });
    return this;
  }
  get(optionsOrCallback, callback) {
    if (!this.db.isReady) {
      const promise2 = this.db.ready().then(() => this.get(optionsOrCallback, callback));
      return typeof optionsOrCallback !== "function" && typeof callback !== "function" ? promise2 : void 0;
    }
    callback = typeof optionsOrCallback === "function" ? optionsOrCallback : typeof callback === "function" ? callback : void 0;
    if (this.isWildcardPath) {
      const error = new Error(`Cannot get value of wildcard path "/${this.path}". Use .query() instead`);
      if (typeof callback === "function") {
        throw error;
      }
      return Promise.reject(error);
    }
    const options = new DataRetrievalOptions(typeof optionsOrCallback === "object" ? optionsOrCallback : { cache_mode: "allow" });
    const promise = this.db.api.get(this.path, options).then((result) => {
      var _a2;
      const isNewApiResult = "context" in result && "value" in result;
      if (!isNewApiResult) {
        console.warn("AceBase api.get method returned an old response value. Update your acebase or acebase-client package");
        result = { value: result, context: {} };
      }
      const value = this.db.types.deserialize(this.path, result.value);
      const snapshot = new DataSnapshot(this, value, void 0, void 0, result.context);
      if ((_a2 = result.context) == null ? void 0 : _a2.acebase_cursor) {
        this.cursor = result.context.acebase_cursor;
      }
      return snapshot;
    });
    if (callback) {
      promise.then(callback).catch((err) => {
        console.error("Uncaught error:", err);
      });
      return;
    } else {
      return promise;
    }
  }
  /**
   * Waits for an event to occur
   * @param event Name of the event, eg "value", "child_added", "child_changed", "child_removed"
   * @param options data retrieval options, to include or exclude specific child keys
   * @returns returns promise that resolves with a snapshot of the data
   */
  once(event, options) {
    if (event === "value" && !this.isWildcardPath) {
      return this.get(options);
    }
    return new Promise((resolve) => {
      const callback = (snap) => {
        this.off(event, callback);
        resolve(snap);
      };
      this.on(event, callback);
    });
  }
  /**
   * @param value optional value to store into the database right away
   * @param onComplete optional callback function to run once value has been stored
   * @returns returns promise that resolves with the reference after the passed value has been stored
   */
  push(value, onComplete) {
    if (this.isWildcardPath) {
      const error = new Error(`Cannot push to wildcard path "/${this.path}"`);
      if (typeof value === "undefined" || typeof onComplete === "function") {
        throw error;
      }
      return Promise.reject(error);
    }
    const id = ID.generate();
    const ref = this.child(id);
    ref[_private].pushed = true;
    if (typeof value !== "undefined") {
      return ref.set(value, onComplete).then(() => ref);
    } else {
      return ref;
    }
  }
  /**
   * Removes this node and all children
   */
  async remove() {
    if (this.isWildcardPath) {
      throw new Error(`Cannot remove wildcard path "/${this.path}". Use query().remove instead`);
    }
    if (this.parent === null) {
      throw new Error("Cannot remove the root node");
    }
    return this.set(null);
  }
  /**
   * Quickly checks if this reference has a value in the database, without returning its data
   * @returns returns a promise that resolves with a boolean value
   */
  async exists() {
    if (this.isWildcardPath) {
      throw new Error(`Cannot check wildcard path "/${this.path}" existence`);
    }
    if (!this.db.isReady) {
      await this.db.ready();
    }
    return this.db.api.exists(this.path);
  }
  get isWildcardPath() {
    return this.path.indexOf("*") >= 0 || this.path.indexOf("$") >= 0;
  }
  /**
   * Creates a query object for current node
   */
  query() {
    return new DataReferenceQuery(this);
  }
  /**
   * Gets the number of children this node has, uses reflection
   */
  async count() {
    const info = await this.reflect("info", { child_count: true });
    return info.children.count;
  }
  async reflect(type, args) {
    if (this.isWildcardPath) {
      throw new Error(`Cannot reflect on wildcard path "/${this.path}"`);
    }
    if (!this.db.isReady) {
      await this.db.ready();
    }
    return this.db.api.reflect(this.path, type, args);
  }
  async export(write, options = { format: "json", type_safe: true }) {
    if (this.isWildcardPath) {
      throw new Error(`Cannot export wildcard path "/${this.path}"`);
    }
    if (!this.db.isReady) {
      await this.db.ready();
    }
    const writeFn = typeof write === "function" ? write : write.write.bind(write);
    return this.db.api.export(this.path, writeFn, options);
  }
  /**
   * Imports the value of this node and all children
   * @param read Function that reads data from your stream
   * @param options Only supported format currently is json
   * @returns returns a promise that resolves once all data is imported
   */
  async import(read, options = { format: "json", suppress_events: false }) {
    if (this.isWildcardPath) {
      throw new Error(`Cannot import to wildcard path "/${this.path}"`);
    }
    if (!this.db.isReady) {
      await this.db.ready();
    }
    return this.db.api.import(this.path, read, options);
  }
  proxy(options) {
    const isOptionsArg = typeof options === "object" && (typeof options.cursor !== "undefined" || typeof options.defaultValue !== "undefined");
    if (typeof options !== "undefined" && !isOptionsArg) {
      this.db.debug.warn("Warning: live data proxy is being initialized with a deprecated method signature. Use ref.proxy(options) instead of ref.proxy(defaultValue)");
      options = { defaultValue: options };
    }
    return LiveDataProxy.create(this, options);
  }
  /**
    * @param options optional initial data retrieval options.
    * Not recommended to use yet - given includes/excludes are not applied to received mutations,
    * or sync actions when using an AceBaseClient with cache db.
    */
  observe(options) {
    if (options) {
      throw new Error("observe does not support data retrieval options yet");
    }
    if (this.isWildcardPath) {
      throw new Error(`Cannot observe wildcard path "/${this.path}"`);
    }
    const Observable2 = getObservable();
    return new Observable2((observer) => {
      let cache, resolved = false;
      let promise = this.get(options).then((snap) => {
        resolved = true;
        cache = snap.val();
        observer.next(cache);
      });
      const updateCache = (snap) => {
        if (!resolved) {
          promise = promise.then(() => updateCache(snap));
          return;
        }
        const mutatedPath = snap.ref.path;
        if (mutatedPath === this.path) {
          cache = snap.val();
          return observer.next(cache);
        }
        const trailKeys = PathInfo.getPathKeys(mutatedPath).slice(PathInfo.getPathKeys(this.path).length);
        let target = cache;
        while (trailKeys.length > 1) {
          const key = trailKeys.shift();
          if (!(key in target)) {
            target[key] = typeof trailKeys[0] === "number" ? [] : {};
          }
          target = target[key];
        }
        const prop = trailKeys.shift();
        const newValue = snap.val();
        if (newValue === null) {
          target instanceof Array && typeof prop === "number" ? target.splice(prop, 1) : delete target[prop];
        } else {
          target[prop] = newValue;
        }
        observer.next(cache);
      };
      this.on("mutated", updateCache);
      return () => {
        this.off("mutated", updateCache);
      };
    });
  }
  async forEach(callbackOrOptions, callback) {
    let options;
    if (typeof callbackOrOptions === "function") {
      callback = callbackOrOptions;
    } else {
      options = callbackOrOptions;
    }
    if (typeof callback !== "function") {
      throw new TypeError("No callback function given");
    }
    const info = await this.reflect("children", { limit: 0, skip: 0 });
    const summary = {
      canceled: false,
      total: info.list.length,
      processed: 0
    };
    for (let i = 0; i < info.list.length; i++) {
      const key = info.list[i].key;
      const snapshot = await this.child(key).get(options);
      summary.processed++;
      if (!snapshot.exists()) {
        continue;
      }
      const result = await callback(snapshot);
      if (result === false) {
        summary.canceled = true;
        break;
      }
    }
    return summary;
  }
  async getMutations(cursorOrDate) {
    const cursor = typeof cursorOrDate === "string" ? cursorOrDate : void 0;
    const timestamp = cursorOrDate === null || typeof cursorOrDate === "undefined" ? 0 : cursorOrDate instanceof Date ? cursorOrDate.getTime() : void 0;
    return this.db.api.getMutations({ path: this.path, cursor, timestamp });
  }
  async getChanges(cursorOrDate) {
    const cursor = typeof cursorOrDate === "string" ? cursorOrDate : void 0;
    const timestamp = cursorOrDate === null || typeof cursorOrDate === "undefined" ? 0 : cursorOrDate instanceof Date ? cursorOrDate.getTime() : void 0;
    return this.db.api.getChanges({ path: this.path, cursor, timestamp });
  }
}
class DataReferenceQuery {
  /**
   * Creates a query on a reference
   */
  constructor(ref) {
    this.ref = ref;
    this[_private] = {
      filters: [],
      skip: 0,
      take: 0,
      order: [],
      events: {}
    };
  }
  /**
   * Applies a filter to the children of the refence being queried.
   * If there is an index on the property key being queried, it will be used
   * to speed up the query
   * @param key property to test value of
   * @param op operator to use
   * @param compare value to compare with
   */
  filter(key, op, compare) {
    if ((op === "in" || op === "!in") && (!(compare instanceof Array) || compare.length === 0)) {
      throw new Error(`${op} filter for ${key} must supply an Array compare argument containing at least 1 value`);
    }
    if ((op === "between" || op === "!between") && (!(compare instanceof Array) || compare.length !== 2)) {
      throw new Error(`${op} filter for ${key} must supply an Array compare argument containing 2 values`);
    }
    if ((op === "matches" || op === "!matches") && !(compare instanceof RegExp)) {
      throw new Error(`${op} filter for ${key} must supply a RegExp compare argument`);
    }
    this[_private].filters.push({ key, op, compare });
    return this;
  }
  /**
   * @deprecated use `.filter` instead
   */
  where(key, op, compare) {
    return this.filter(key, op, compare);
  }
  /**
   * Limits the number of query results
   */
  take(n2) {
    this[_private].take = n2;
    return this;
  }
  /**
   * Skips the first n query results
   */
  skip(n2) {
    this[_private].skip = n2;
    return this;
  }
  sort(key, ascending = true) {
    if (!["string", "number"].includes(typeof key)) {
      throw "key must be a string or number";
    }
    this[_private].order.push({ key, ascending });
    return this;
  }
  /**
   * @deprecated use `.sort` instead
   */
  order(key, ascending = true) {
    return this.sort(key, ascending);
  }
  get(optionsOrCallback, callback) {
    if (!this.ref.db.isReady) {
      const promise = this.ref.db.ready().then(() => this.get(optionsOrCallback, callback));
      return typeof optionsOrCallback !== "function" && typeof callback !== "function" ? promise : void 0;
    }
    callback = typeof optionsOrCallback === "function" ? optionsOrCallback : typeof callback === "function" ? callback : void 0;
    const options = new QueryDataRetrievalOptions(typeof optionsOrCallback === "object" ? optionsOrCallback : { snapshots: true, cache_mode: "allow" });
    options.allow_cache = options.cache_mode !== "bypass";
    options.eventHandler = (ev) => {
      if (!this[_private].events[ev.name]) {
        return false;
      }
      const listeners = this[_private].events[ev.name];
      if (typeof listeners !== "object" || listeners.length === 0) {
        return false;
      }
      if (["add", "change", "remove"].includes(ev.name)) {
        const eventData = {
          name: ev.name,
          ref: new DataReference(this.ref.db, ev.path)
        };
        if (options.snapshots && ev.name !== "remove") {
          const val = db.types.deserialize(ev.path, ev.value);
          eventData.snapshot = new DataSnapshot(eventData.ref, val, false);
        }
        ev = eventData;
      }
      listeners.forEach((callback2) => {
        try {
          callback2(ev);
        } catch (e) {
        }
      });
    };
    options.monitor = { add: false, change: false, remove: false };
    if (this[_private].events) {
      if (this[_private].events["add"] && this[_private].events["add"].length > 0) {
        options.monitor.add = true;
      }
      if (this[_private].events["change"] && this[_private].events["change"].length > 0) {
        options.monitor.change = true;
      }
      if (this[_private].events["remove"] && this[_private].events["remove"].length > 0) {
        options.monitor.remove = true;
      }
    }
    this.stop();
    const db = this.ref.db;
    return db.api.query(this.ref.path, this[_private], options).catch((err) => {
      throw new Error(err);
    }).then((res) => {
      const { stop } = res;
      let { results, context: context2 } = res;
      this.stop = async () => {
        await stop();
      };
      if (!("results" in res && "context" in res)) {
        console.warn("Query results missing context. Update your acebase and/or acebase-client packages");
        results = res, context2 = {};
      }
      if (options.snapshots) {
        const snaps = results.map((result) => {
          const val = db.types.deserialize(result.path, result.val);
          return new DataSnapshot(db.ref(result.path), val, false, void 0, context2);
        });
        return DataSnapshotsArray.from(snaps);
      } else {
        const refs = results.map((path) => db.ref(path));
        return DataReferencesArray.from(refs);
      }
    }).then((results) => {
      callback && callback(results);
      return results;
    });
  }
  /**
   * Stops a realtime query, no more notifications will be received.
   */
  async stop() {
  }
  /**
   * Executes the query and returns references. Short for `.get({ snapshots: false })`
   * @param callback callback to use instead of returning a promise
   * @returns returns an Promise that resolves with an array of DataReferences, or void when using a callback
   * @deprecated Use `find` instead
   */
  getRefs(callback) {
    return this.get({ snapshots: false }, callback);
  }
  /**
   * Executes the query and returns an array of references. Short for `.get({ snapshots: false })`
   */
  find() {
    return this.get({ snapshots: false });
  }
  /**
   * Executes the query and returns the number of results
   */
  async count() {
    const refs = await this.find();
    return refs.length;
  }
  /**
   * Executes the query and returns if there are any results
   */
  async exists() {
    const originalTake = this[_private].take;
    const p = this.take(1).find();
    this.take(originalTake);
    const refs = await p;
    return refs.length !== 0;
  }
  /**
   * Executes the query, removes all matches from the database
   * @returns returns a Promise that resolves once all matches have been removed
   */
  async remove(callback) {
    const refs = await this.find();
    const parentUpdates = refs.reduce((parents, ref) => {
      const parent = parents[ref.parent.path];
      if (!parent) {
        parents[ref.parent.path] = [ref];
      } else {
        parent.push(ref);
      }
      return parents;
    }, {});
    const db = this.ref.db;
    const promises = Object.keys(parentUpdates).map(async (parentPath) => {
      const updates = refs.reduce((updates2, ref2) => {
        updates2[ref2.key] = null;
        return updates2;
      }, {});
      const ref = db.ref(parentPath);
      try {
        await ref.update(updates);
        return { ref, success: true };
      } catch (error) {
        return { ref, success: false, error };
      }
    });
    const results = await Promise.all(promises);
    callback && callback(results);
    return results;
  }
  on(event, callback) {
    if (!this[_private].events[event]) {
      this[_private].events[event] = [];
    }
    this[_private].events[event].push(callback);
    return this;
  }
  /**
   * Unsubscribes from (a) previously added event(s)
   * @param event Name of the event
   * @param callback callback function to remove
   * @returns returns reference to this query
   */
  off(event, callback) {
    if (typeof event === "undefined") {
      this[_private].events = {};
      return this;
    }
    if (!this[_private].events[event]) {
      return this;
    }
    if (typeof callback === "undefined") {
      delete this[_private].events[event];
      return this;
    }
    const index = this[_private].events[event].indexOf(callback);
    if (!~index) {
      return this;
    }
    this[_private].events[event].splice(index, 1);
    return this;
  }
  async forEach(callbackOrOptions, callback) {
    let options;
    if (typeof callbackOrOptions === "function") {
      callback = callbackOrOptions;
    } else {
      options = callbackOrOptions;
    }
    if (typeof callback !== "function") {
      throw new TypeError("No callback function given");
    }
    const refs = await this.find();
    const summary = {
      canceled: false,
      total: refs.length,
      processed: 0
    };
    for (let i = 0; i < refs.length; i++) {
      const ref = refs[i];
      const snapshot = await ref.get(options);
      summary.processed++;
      if (!snapshot.exists()) {
        continue;
      }
      const result = await callback(snapshot);
      if (result === false) {
        summary.canceled = true;
        break;
      }
    }
    return summary;
  }
}
class DataSnapshotsArray extends Array {
  static from(snaps) {
    const arr = new DataSnapshotsArray(snaps.length);
    snaps.forEach((snap, i) => arr[i] = snap);
    return arr;
  }
  getValues() {
    return this.map((snap) => snap.val());
  }
}
class DataReferencesArray extends Array {
  static from(refs) {
    const arr = new DataReferencesArray(refs.length);
    refs.forEach((ref, i) => arr[i] = ref);
    return arr;
  }
  getPaths() {
    return this.map((ref) => ref.path);
  }
}
function get(mappings, path) {
  path = path.replace(/^\/|\/$/g, "");
  const keys = PathInfo.getPathKeys(path);
  const mappedPath = Object.keys(mappings).find((mpath) => {
    const mkeys = PathInfo.getPathKeys(mpath);
    if (mkeys.length !== keys.length) {
      return false;
    }
    return mkeys.every((mkey, index) => {
      if (mkey === "*" || typeof mkey === "string" && mkey[0] === "$") {
        return true;
      }
      return mkey === keys[index];
    });
  });
  const mapping = mappings[mappedPath];
  return mapping;
}
function map(mappings, path) {
  const targetPath = PathInfo.get(path).parentPath;
  if (targetPath === null) {
    return;
  }
  return get(mappings, targetPath);
}
function mapDeep(mappings, entryPath) {
  entryPath = entryPath.replace(/^\/|\/$/g, "");
  const pathInfo = PathInfo.get(entryPath);
  const startPath = pathInfo.parentPath;
  const keys = startPath ? PathInfo.getPathKeys(startPath) : [];
  const matches = Object.keys(mappings).reduce((m2, mpath) => {
    const mkeys = PathInfo.getPathKeys(mpath);
    if (mkeys.length < keys.length) {
      return m2;
    }
    let isMatch = true;
    if (keys.length === 0 && startPath !== null) {
      isMatch = mkeys.length === 1 && (mkeys[0] === "*" || typeof mkeys[0] === "string" && mkeys[0][0] === "$");
    } else {
      mkeys.every((mkey, index) => {
        if (index >= keys.length) {
          return false;
        } else if (mkey === "*" || typeof mkey === "string" && mkey[0] === "$" || mkey === keys[index]) {
          return true;
        } else {
          isMatch = false;
          return false;
        }
      });
    }
    if (isMatch) {
      const mapping = mappings[mpath];
      m2.push({ path: mpath, type: mapping });
    }
    return m2;
  }, []);
  return matches;
}
function process$1(db, mappings, path, obj, action) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  const keys = PathInfo.getPathKeys(path);
  const m2 = mapDeep(mappings, path);
  const changes = [];
  m2.sort((a, b) => PathInfo.getPathKeys(a.path).length > PathInfo.getPathKeys(b.path).length ? -1 : 1);
  m2.forEach((mapping) => {
    const mkeys = PathInfo.getPathKeys(mapping.path);
    mkeys.push("*");
    const mTrailKeys = mkeys.slice(keys.length);
    if (mTrailKeys.length === 0) {
      const vars = PathInfo.extractVariables(mapping.path, path);
      const ref = new DataReference(db, path, vars);
      if (action === "serialize") {
        obj = mapping.type.serialize(obj, ref);
      } else if (action === "deserialize") {
        const snap = new DataSnapshot(ref, obj);
        obj = mapping.type.deserialize(snap);
      }
      return;
    }
    const process2 = (parentPath, parent, keys2) => {
      if (obj === null || typeof obj !== "object") {
        return obj;
      }
      const key = keys2[0];
      let children2 = [];
      if (key === "*" || typeof key === "string" && key[0] === "$") {
        if (parent instanceof Array) {
          children2 = parent.map((val, index) => ({ key: index, val }));
        } else {
          children2 = Object.keys(parent).map((k) => ({ key: k, val: parent[k] }));
        }
      } else {
        const child = parent[key];
        if (typeof child === "object") {
          children2.push({ key, val: child });
        }
      }
      children2.forEach((child) => {
        const childPath = PathInfo.getChildPath(parentPath, child.key);
        const vars = PathInfo.extractVariables(mapping.path, childPath);
        const ref = new DataReference(db, childPath, vars);
        if (keys2.length === 1) {
          if (action === "serialize") {
            changes.push({ parent, key: child.key, original: parent[child.key] });
            parent[child.key] = mapping.type.serialize(child.val, ref);
          } else if (action === "deserialize") {
            const snap = new DataSnapshot(ref, child.val);
            parent[child.key] = mapping.type.deserialize(snap);
          }
        } else {
          process2(childPath, child.val, keys2.slice(1));
        }
      });
    };
    process2(path, obj, mTrailKeys);
  });
  if (action === "serialize") {
    obj = cloneObject(obj);
    if (changes.length > 0) {
      changes.forEach((change) => {
        change.parent[change.key] = change.original;
      });
    }
  }
  return obj;
}
const _mappings = Symbol("mappings");
class TypeMappings {
  constructor(db) {
    this.db = db;
    this[_mappings] = {};
  }
  /** (for internal use) */
  get mappings() {
    return this[_mappings];
  }
  /** (for internal use) */
  map(path) {
    return map(this[_mappings], path);
  }
  /**
   * Maps objects that are stored in a specific path to a class, so they can automatically be
   * serialized when stored to, and deserialized (instantiated) when loaded from the database.
   * @param path path to an object container, eg "users" or "users/*\/posts"
   * @param type class to bind all child objects of path to
   * Best practice is to implement 2 methods for instantiation and serializing of your objects:
   * 1) `static create(snap: DataSnapshot)` and 2) `serialize(ref: DataReference)`. See example
   * @param options (optional) You can specify the functions to use to
   * serialize and/or instantiate your class. If you do not specificy a creator (constructor) method,
   * AceBase will call `YourClass.create(snapshot)` method if it exists, or create an instance of
   * YourClass with `new YourClass(snapshot)`.
   * If you do not specifiy a serializer method, AceBase will call `YourClass.prototype.serialize(ref)`
   * if it exists, or tries storing your object's fields unaltered. NOTE: `this` in your creator
   * function will point to `YourClass`, and `this` in your serializer function will point to the
   * `instance` of `YourClass`.
   * @example
   * class User {
   *    static create(snap: DataSnapshot): User {
   *        // Deserialize (instantiate) User from plain database object
   *        let user = new User();
   *        Object.assign(user, snap.val()); // Copy all properties to user
   *        user.id = snap.ref.key; // Add the key as id
   *        return user;
   *    }
   *    serialize(ref: DataReference) {
   *        // Serialize user for database storage
   *        return {
   *            name: this.name
   *            email: this.email
   *        };
   *    }
   * }
   * db.types.bind('users', User); // Automatically uses serialize and static create methods
   */
  bind(path, type, options = {}) {
    if (typeof path !== "string") {
      throw new TypeError("path must be a string");
    }
    if (typeof type !== "function") {
      throw new TypeError("constructor must be a function");
    }
    if (typeof options.serializer === "undefined")
      ;
    else if (typeof options.serializer === "string") {
      if (typeof type.prototype[options.serializer] === "function") {
        options.serializer = type.prototype[options.serializer];
      } else {
        throw new TypeError(`${type.name}.prototype.${options.serializer} is not a function, cannot use it as serializer`);
      }
    } else if (typeof options.serializer !== "function") {
      throw new TypeError(`serializer for class ${type.name} must be a function, or the name of a prototype method`);
    }
    if (typeof options.creator === "undefined") {
      if (typeof type.create === "function") {
        options.creator = type.create;
      }
    } else if (typeof options.creator === "string") {
      if (typeof type[options.creator] === "function") {
        options.creator = type[options.creator];
      } else {
        throw new TypeError(`${type.name}.${options.creator} is not a function, cannot use it as creator`);
      }
    } else if (typeof options.creator !== "function") {
      throw new TypeError(`creator for class ${type.name} must be a function, or the name of a static method`);
    }
    path = path.replace(/^\/|\/$/g, "");
    this[_mappings][path] = {
      db: this.db,
      type,
      creator: options.creator,
      serializer: options.serializer,
      deserialize(snap) {
        let obj;
        if (this.creator) {
          obj = this.creator.call(this.type, snap);
        } else {
          obj = new this.type(snap);
        }
        return obj;
      },
      serialize(obj, ref) {
        if (this.serializer) {
          obj = this.serializer.call(obj, ref, obj);
        } else if (obj && typeof obj.serialize === "function") {
          obj = obj.serialize(ref, obj);
        }
        return obj;
      }
    };
  }
  /**
   * @internal (for internal use)
   * Serializes any child in given object that has a type mapping
   * @param path | path to the object's location
   * @param obj object to serialize
   */
  serialize(path, obj) {
    return process$1(this.db, this[_mappings], path, obj, "serialize");
  }
  /**
   * @internal (for internal use)
   * Deserialzes any child in given object that has a type mapping
   * @param path path to the object's location
   * @param obj object to deserialize
   */
  deserialize(path, obj) {
    return process$1(this.db, this[_mappings], path, obj, "deserialize");
  }
}
const noop$1 = () => {
};
class DebugLogger {
  constructor(level = "log", prefix = "") {
    this.level = level;
    this.prefix = prefix;
    this.setLevel(level);
  }
  setLevel(level) {
    const prefix = this.prefix ? this.prefix + " %s" : "";
    this.verbose = ["verbose"].includes(level) ? prefix ? console.log.bind(console, prefix) : console.log.bind(console) : noop$1;
    this.log = ["verbose", "log"].includes(level) ? prefix ? console.log.bind(console, prefix) : console.log.bind(console) : noop$1;
    this.warn = ["verbose", "log", "warn"].includes(level) ? prefix ? console.warn.bind(console, prefix) : console.warn.bind(console) : noop$1;
    this.error = ["verbose", "log", "warn", "error"].includes(level) ? prefix ? console.error.bind(console, prefix) : console.error.bind(console) : noop$1;
    this.write = (text2) => {
      const isRunKit = typeof process$2 !== "undefined" && process$2.env && typeof {}.RUNKIT_ENDPOINT_PATH === "string";
      if (text2 && isRunKit) {
        text2.split("\n").forEach((line) => console.log(line));
      } else {
        console.log(text2);
      }
    };
  }
}
const FontCode = {
  bold: 1,
  dim: 2,
  italic: 3,
  underline: 4,
  inverse: 7,
  hidden: 8,
  strikethrough: 94
};
const ColorCode = {
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
  grey: 90,
  // Bright colors:
  brightRed: 91
  // TODO, other bright colors
};
const BgColorCode = {
  bgBlack: 40,
  bgRed: 41,
  bgGreen: 42,
  bgYellow: 43,
  bgBlue: 44,
  bgMagenta: 45,
  bgCyan: 46,
  bgWhite: 47,
  bgGrey: 100,
  bgBrightRed: 101
  // TODO, other bright colors
};
const ResetCode = {
  all: 0,
  color: 39,
  background: 49,
  bold: 22,
  dim: 22,
  italic: 23,
  underline: 24,
  inverse: 27,
  hidden: 28,
  strikethrough: 29
};
var ColorStyle;
(function(ColorStyle2) {
  ColorStyle2["reset"] = "reset";
  ColorStyle2["bold"] = "bold";
  ColorStyle2["dim"] = "dim";
  ColorStyle2["italic"] = "italic";
  ColorStyle2["underline"] = "underline";
  ColorStyle2["inverse"] = "inverse";
  ColorStyle2["hidden"] = "hidden";
  ColorStyle2["strikethrough"] = "strikethrough";
  ColorStyle2["black"] = "black";
  ColorStyle2["red"] = "red";
  ColorStyle2["green"] = "green";
  ColorStyle2["yellow"] = "yellow";
  ColorStyle2["blue"] = "blue";
  ColorStyle2["magenta"] = "magenta";
  ColorStyle2["cyan"] = "cyan";
  ColorStyle2["grey"] = "grey";
  ColorStyle2["bgBlack"] = "bgBlack";
  ColorStyle2["bgRed"] = "bgRed";
  ColorStyle2["bgGreen"] = "bgGreen";
  ColorStyle2["bgYellow"] = "bgYellow";
  ColorStyle2["bgBlue"] = "bgBlue";
  ColorStyle2["bgMagenta"] = "bgMagenta";
  ColorStyle2["bgCyan"] = "bgCyan";
  ColorStyle2["bgWhite"] = "bgWhite";
  ColorStyle2["bgGrey"] = "bgGrey";
})(ColorStyle || (ColorStyle = {}));
function ColorsSupported() {
  if (typeof process$2 === "undefined" || !process$2.stdout || !process$2.env || !process$2.platform || process$2.platform === "browser") {
    return false;
  }
  if (process$2.platform === "win32") {
    return true;
  }
  const env2 = process$2.env;
  if (env2.COLORTERM) {
    return true;
  }
  if (env2.TERM === "dumb") {
    return false;
  }
  if (env2.CI || env2.TEAMCITY_VERSION) {
    return !!env2.TRAVIS;
  }
  if (["iTerm.app", "HyperTerm", "Hyper", "MacTerm", "Apple_Terminal", "vscode"].includes(env2.TERM_PROGRAM)) {
    return true;
  }
  if (/^xterm-256|^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(env2.TERM)) {
    return true;
  }
  return false;
}
let _enabled = ColorsSupported();
function SetColorsEnabled(enabled) {
  _enabled = ColorsSupported() && enabled;
}
function Colorize(str, style) {
  if (!_enabled) {
    return str;
  }
  const openCodes = [], closeCodes = [];
  const addStyle = (style2) => {
    if (style2 === ColorStyle.reset) {
      openCodes.push(ResetCode.all);
    } else if (style2 in FontCode) {
      openCodes.push(FontCode[style2]);
      closeCodes.push(ResetCode[style2]);
    } else if (style2 in ColorCode) {
      openCodes.push(ColorCode[style2]);
      closeCodes.push(ResetCode.color);
    } else if (style2 in BgColorCode) {
      openCodes.push(BgColorCode[style2]);
      closeCodes.push(ResetCode.background);
    }
  };
  if (style instanceof Array) {
    style.forEach(addStyle);
  } else {
    addStyle(style);
  }
  const open = openCodes.map((code) => "\x1B[" + code + "m").join("");
  const close = closeCodes.map((code) => "\x1B[" + code + "m").join("");
  return str.split("\n").map((line) => open + line + close).join("\n");
}
String.prototype.colorize = function(style) {
  return Colorize(this, style);
};
class AceBaseBaseSettings {
  constructor(options) {
    this.logLevel = "log";
    this.logColors = true;
    this.info = "realtime database";
    this.sponsor = false;
    if (typeof options !== "object") {
      options = {};
    }
    if (typeof options.logLevel === "string") {
      this.logLevel = options.logLevel;
    }
    if (typeof options.logColors === "boolean") {
      this.logColors = options.logColors;
    }
    if (typeof options.info === "string") {
      this.info = options.info;
    }
    if (typeof options.sponsor === "boolean") {
      this.sponsor = options.sponsor;
    }
  }
}
class AceBaseBase extends SimpleEventEmitter {
  /**
   * @param dbname Name of the database to open or create
   */
  constructor(dbname, options = {}) {
    super();
    this._ready = false;
    options = new AceBaseBaseSettings(options);
    this.name = dbname;
    this.debug = new DebugLogger(options.logLevel, `[${dbname}]`);
    SetColorsEnabled(options.logColors);
    const logoStyle = [ColorStyle.magenta, ColorStyle.bold];
    const logo = "     ___          ______                \n    / _ \\         | ___ \\               \n   / /_\\ \\ ___ ___| |_/ / __ _ ___  ___ \n   |  _  |/ __/ _ \\ ___ \\/ _` / __|/ _ \\\n   | | | | (_|  __/ |_/ / (_| \\__ \\  __/\n   \\_| |_/\\___\\___\\____/ \\__,_|___/\\___|";
    const info = options.info ? "".padStart(40 - options.info.length, " ") + options.info + "\n" : "";
    if (!options.sponsor) {
      this.debug.write(logo.colorize(logoStyle));
      info && this.debug.write(info.colorize(ColorStyle.magenta));
    }
    this.types = new TypeMappings(this);
    this.once("ready", () => {
      this._ready = true;
    });
  }
  /**
   * Waits for the database to be ready before running your callback.
   * @param callback (optional) callback function that is called when the database is ready to be used. You can also use the returned promise.
   * @returns returns a promise that resolves when ready
   */
  async ready(callback) {
    if (!this._ready) {
      await new Promise((resolve) => this.on("ready", resolve));
    }
    callback == null ? void 0 : callback();
  }
  get isReady() {
    return this._ready;
  }
  /**
   * Allow specific observable implementation to be used
   * @param ObservableImpl Implementation to use
   */
  setObservable(ObservableImpl) {
    setObservable(ObservableImpl);
  }
  /**
   * Creates a reference to a node
   * @param path
   * @returns reference to the requested node
   */
  ref(path) {
    return new DataReference(this, path);
  }
  /**
   * Get a reference to the root database node
   * @returns reference to root node
   */
  get root() {
    return this.ref("");
  }
  /**
   * Creates a query on the requested node
   * @param path
   * @returns query for the requested node
   */
  query(path) {
    const ref = new DataReference(this, path);
    return new DataReferenceQuery(ref);
  }
  get indexes() {
    return {
      /**
       * Gets all indexes
       */
      get: () => {
        return this.api.getIndexes();
      },
      /**
       * Creates an index on "key" for all child nodes at "path". If the index already exists, nothing happens.
       * Example: creating an index on all "name" keys of child objects of path "system/users",
       * will index "system/users/user1/name", "system/users/user2/name" etc.
       * You can also use wildcard paths to enable indexing and quering of fragmented data.
       * Example: path "users/*\/posts", key "title": will index all "title" keys in all posts of all users.
       * @param path path to the container node
       * @param key name of the key to index every container child node
       * @param options any additional options
       */
      create: (path, key, options) => {
        return this.api.createIndex(path, key, options);
      },
      /**
       * Deletes an existing index from the database
       */
      delete: async (filePath) => {
        return this.api.deleteIndex(filePath);
      }
    };
  }
  get schema() {
    return {
      get: (path) => {
        return this.api.getSchema(path);
      },
      set: (path, schema) => {
        return this.api.setSchema(path, schema);
      },
      all: () => {
        return this.api.getSchemas();
      },
      check: (path, value, isUpdate) => {
        return this.api.validateSchema(path, value, isUpdate);
      }
    };
  }
}
class NotImplementedError extends Error {
  constructor(name) {
    super(`${name} is not implemented`);
  }
}
class Api {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
  }
  /**
   * Provides statistics
   * @param options
   */
  stats(options) {
    throw new NotImplementedError("stats");
  }
  /**
   * @param path
   * @param event event to subscribe to ("value", "child_added" etc)
   * @param callback callback function
   */
  subscribe(path, event, callback, settings) {
    throw new NotImplementedError("subscribe");
  }
  unsubscribe(path, event, callback) {
    throw new NotImplementedError("unsubscribe");
  }
  update(path, updates, options) {
    throw new NotImplementedError("update");
  }
  set(path, value, options) {
    throw new NotImplementedError("set");
  }
  get(path, options) {
    throw new NotImplementedError("get");
  }
  transaction(path, callback, options) {
    throw new NotImplementedError("transaction");
  }
  exists(path) {
    throw new NotImplementedError("exists");
  }
  query(path, query2, options) {
    throw new NotImplementedError("query");
  }
  reflect(path, type, args) {
    throw new NotImplementedError("reflect");
  }
  export(path, write, options) {
    throw new NotImplementedError("export");
  }
  import(path, read, options) {
    throw new NotImplementedError("import");
  }
  /** Creates an index on key for all child nodes at path */
  createIndex(path, key, options) {
    throw new NotImplementedError("createIndex");
  }
  getIndexes() {
    throw new NotImplementedError("getIndexes");
  }
  deleteIndex(filePath) {
    throw new NotImplementedError("deleteIndex");
  }
  setSchema(path, schema) {
    throw new NotImplementedError("setSchema");
  }
  getSchema(path) {
    throw new NotImplementedError("getSchema");
  }
  getSchemas() {
    throw new NotImplementedError("getSchemas");
  }
  validateSchema(path, value, isUpdate) {
    throw new NotImplementedError("validateSchema");
  }
  getMutations(filter) {
    throw new NotImplementedError("getMutations");
  }
  getChanges(filter) {
    throw new NotImplementedError("getChanges");
  }
}
function c(input, length, result) {
  const b = [0, 0, 0, 0, 0];
  for (let i = 0; i < length; i += 4) {
    let n2 = ((input[i] * 256 + input[i + 1]) * 256 + input[i + 2]) * 256 + input[i + 3];
    if (!n2) {
      result.push("z");
    } else {
      for (let j = 0; j < 5; b[j++] = n2 % 85 + 33, n2 = Math.floor(n2 / 85)) {
      }
      result.push(String.fromCharCode(b[4], b[3], b[2], b[1], b[0]));
    }
  }
}
function encode(arr) {
  const input = arr, result = [], remainder = input.length % 4, length = input.length - remainder;
  c(input, length, result);
  if (remainder) {
    const t = new Uint8Array(4);
    t.set(input.slice(length), 0);
    c(t, 4, result);
    let x = result.pop();
    if (x == "z") {
      x = "!!!!!";
    }
    result.push(x.substr(0, remainder + 1));
  }
  let ret = result.join("");
  ret = "<~" + ret + "~>";
  return ret;
}
const ascii85 = {
  encode: function(arr) {
    if (arr instanceof ArrayBuffer) {
      arr = new Uint8Array(arr, 0, arr.byteLength);
    }
    return encode(arr);
  },
  decode: function(input) {
    if (!input.startsWith("<~") || !input.endsWith("~>")) {
      throw new Error("Invalid input string");
    }
    input = input.substr(2, input.length - 4);
    const n2 = input.length, r = [], b = [0, 0, 0, 0, 0];
    let t, x, y2, d2;
    for (let i = 0; i < n2; ++i) {
      if (input.charAt(i) == "z") {
        r.push(0, 0, 0, 0);
        continue;
      }
      for (let j = 0; j < 5; ++j) {
        b[j] = input.charCodeAt(i + j) - 33;
      }
      d2 = n2 - i;
      if (d2 < 5) {
        for (let j = d2; j < 4; b[++j] = 0) {
        }
        b[d2] = 85;
      }
      t = (((b[0] * 85 + b[1]) * 85 + b[2]) * 85 + b[3]) * 85 + b[4];
      x = t & 255;
      t >>>= 8;
      y2 = t & 255;
      t >>>= 8;
      r.push(t >>> 8, t & 255, y2, x);
      for (let j = d2; j < 5; ++j, r.pop()) {
      }
      i += 4;
    }
    const data = new Uint8Array(r);
    return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  }
};
const deserialize = (data) => {
  if (data.map === null || typeof data.map === "undefined") {
    if (typeof data.val === "undefined") {
      throw new Error("serialized value must have a val property");
    }
    return data.val;
  }
  const deserializeValue = (type, val) => {
    if (type === "date") {
      return new Date(val);
    } else if (type === "binary") {
      return ascii85.decode(val);
    } else if (type === "reference") {
      return new PathReference(val);
    } else if (type === "regexp") {
      return new RegExp(val.pattern, val.flags);
    } else if (type === "array") {
      return new PartialArray(val);
    } else if (type === "bigint") {
      return BigInt(val);
    }
    return val;
  };
  if (typeof data.map === "string") {
    return deserializeValue(data.map, data.val);
  }
  Object.keys(data.map).forEach((path) => {
    const type = data.map[path];
    const keys = PathInfo.getPathKeys(path);
    let parent = data;
    let key = "val";
    let val = data.val;
    keys.forEach((k) => {
      key = k;
      parent = val;
      val = val[key];
    });
    parent[key] = deserializeValue(type, val);
  });
  return data.val;
};
const serialize = (obj) => {
  var _a2;
  if (obj === null || typeof obj !== "object" || obj instanceof Date || obj instanceof ArrayBuffer || obj instanceof PathReference || obj instanceof RegExp) {
    const ser = serialize({ value: obj });
    return {
      map: (_a2 = ser.map) == null ? void 0 : _a2.value,
      val: ser.val.value
    };
  }
  obj = cloneObject(obj);
  const process2 = (obj2, mappings2, prefix) => {
    if (obj2 instanceof PartialArray) {
      mappings2[prefix] = "array";
    }
    Object.keys(obj2).forEach((key) => {
      const val = obj2[key];
      const path = prefix.length === 0 ? key : `${prefix}/${key}`;
      if (typeof val === "bigint") {
        obj2[key] = val.toString();
        mappings2[path] = "bigint";
      } else if (val instanceof Date) {
        obj2[key] = val.toISOString();
        mappings2[path] = "date";
      } else if (val instanceof ArrayBuffer) {
        obj2[key] = ascii85.encode(val);
        mappings2[path] = "binary";
      } else if (val instanceof PathReference) {
        obj2[key] = val.path;
        mappings2[path] = "reference";
      } else if (val instanceof RegExp) {
        obj2[key] = { pattern: val.source, flags: val.flags };
        mappings2[path] = "regexp";
      } else if (typeof val === "object" && val !== null) {
        process2(val, mappings2, path);
      }
    });
  };
  const mappings = {};
  process2(obj, mappings, "");
  const serialized = { val: obj };
  if (Object.keys(mappings).length > 0) {
    serialized.map = mappings;
  }
  return serialized;
};
const calculateExpiryTime = (expirySeconds) => expirySeconds > 0 ? Date.now() + expirySeconds * 1e3 : Infinity;
class SimpleCache {
  constructor(options) {
    var _a2;
    this.enabled = true;
    if (typeof options === "number") {
      options = { expirySeconds: options };
    }
    options.cloneValues = options.cloneValues !== false;
    if (typeof options.expirySeconds !== "number" && typeof options.maxEntries !== "number") {
      throw new Error("Either expirySeconds or maxEntries must be specified");
    }
    this.options = options;
    this.cache = /* @__PURE__ */ new Map();
    const interval = setInterval(() => {
      this.cleanUp();
    }, 60 * 1e3);
    (_a2 = interval.unref) == null ? void 0 : _a2.call(interval);
  }
  get size() {
    return this.cache.size;
  }
  has(key) {
    if (!this.enabled) {
      return false;
    }
    return this.cache.has(key);
  }
  get(key) {
    if (!this.enabled) {
      return null;
    }
    const entry = this.cache.get(key);
    if (!entry) {
      return null;
    }
    entry.expires = calculateExpiryTime(this.options.expirySeconds);
    entry.accessed = Date.now();
    return this.options.cloneValues ? cloneObject(entry.value) : entry.value;
  }
  set(key, value) {
    if (this.options.maxEntries > 0 && this.cache.size >= this.options.maxEntries && !this.cache.has(key)) {
      let oldest = null;
      const now2 = Date.now();
      for (const [key2, entry] of this.cache.entries()) {
        if (entry.expires <= now2) {
          this.cache.delete(key2);
          oldest = null;
          break;
        }
        if (!oldest || entry.accessed < oldest.accessed) {
          oldest = { key: key2, accessed: entry.accessed };
        }
      }
      if (oldest !== null) {
        this.cache.delete(oldest.key);
      }
    }
    this.cache.set(key, { value: this.options.cloneValues ? cloneObject(value) : value, added: Date.now(), accessed: Date.now(), expires: calculateExpiryTime(this.options.expirySeconds) });
  }
  remove(key) {
    this.cache.delete(key);
  }
  cleanUp() {
    const now2 = Date.now();
    this.cache.forEach((entry, key) => {
      if (entry.expires <= now2) {
        this.cache.delete(key);
      }
    });
  }
}
function parse$1(definition) {
  let pos = 0;
  function consumeSpaces() {
    let c2;
    while (c2 = definition[pos], [" ", "\r", "\n", "	"].includes(c2)) {
      pos++;
    }
  }
  function consumeCharacter(c2) {
    if (definition[pos] !== c2) {
      throw new Error(`Unexpected character at position ${pos}. Expected: '${c2}', found '${definition[pos]}'`);
    }
    pos++;
  }
  function readProperty() {
    consumeSpaces();
    const prop = { name: "", optional: false, wildcard: false };
    let c2;
    while (c2 = definition[pos], c2 === "_" || c2 === "$" || c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || prop.name.length > 0 && c2 >= "0" && c2 <= "9" || prop.name.length === 0 && c2 === "*") {
      prop.name += c2;
      pos++;
    }
    if (prop.name.length === 0) {
      throw new Error(`Property name expected at position ${pos}, found: ${definition.slice(pos, pos + 10)}..`);
    }
    if (definition[pos] === "?") {
      prop.optional = true;
      pos++;
    }
    if (prop.name === "*" || prop.name[0] === "$") {
      prop.optional = true;
      prop.wildcard = true;
    }
    consumeSpaces();
    consumeCharacter(":");
    return prop;
  }
  function readType() {
    consumeSpaces();
    let type = { typeOf: "any" }, c2;
    let name = "";
    while (c2 = definition[pos], c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z") {
      name += c2;
      pos++;
    }
    if (name.length === 0) {
      if (definition[pos] === "*") {
        consumeCharacter("*");
        type.typeOf = "any";
      } else if (["'", '"', "`"].includes(definition[pos])) {
        type.typeOf = "string";
        type.value = "";
        const quote = definition[pos];
        consumeCharacter(quote);
        while (c2 = definition[pos], c2 && c2 !== quote) {
          type.value += c2;
          pos++;
        }
        consumeCharacter(quote);
      } else if (definition[pos] >= "0" && definition[pos] <= "9") {
        type.typeOf = "number";
        let nr = "";
        while (c2 = definition[pos], c2 === "." || c2 === "n" || c2 >= "0" && c2 <= "9") {
          nr += c2;
          pos++;
        }
        if (nr.endsWith("n")) {
          type.value = BigInt(nr);
        } else if (nr.includes(".")) {
          type.value = parseFloat(nr);
        } else {
          type.value = parseInt(nr);
        }
      } else if (definition[pos] === "{") {
        consumeCharacter("{");
        type.typeOf = "object";
        type.instanceOf = Object;
        type.children = [];
        while (true) {
          const prop = readProperty();
          const types = readTypes();
          type.children.push({ name: prop.name, optional: prop.optional, wildcard: prop.wildcard, types });
          consumeSpaces();
          if (definition[pos] === "}") {
            break;
          }
          consumeCharacter(",");
        }
        consumeCharacter("}");
      } else if (definition[pos] === "/") {
        consumeCharacter("/");
        let pattern = "", flags = "";
        while (c2 = definition[pos], c2 !== "/" || pattern.endsWith("\\")) {
          pattern += c2;
          pos++;
        }
        consumeCharacter("/");
        while (c2 = definition[pos], ["g", "i", "m", "s", "u", "y", "d"].includes(c2)) {
          flags += c2;
          pos++;
        }
        type.typeOf = "string";
        type.matches = new RegExp(pattern, flags);
      } else {
        throw new Error(`Expected a type definition at position ${pos}, found character '${definition[pos]}'`);
      }
    } else if (["string", "number", "boolean", "bigint", "undefined", "String", "Number", "Boolean", "BigInt"].includes(name)) {
      type.typeOf = name.toLowerCase();
    } else if (name === "Object" || name === "object") {
      type.typeOf = "object";
      type.instanceOf = Object;
    } else if (name === "Date") {
      type.typeOf = "object";
      type.instanceOf = Date;
    } else if (name === "Binary" || name === "binary") {
      type.typeOf = "object";
      type.instanceOf = ArrayBuffer;
    } else if (name === "any") {
      type.typeOf = "any";
    } else if (name === "null") {
      type.typeOf = "object";
      type.value = null;
    } else if (name === "Array") {
      consumeCharacter("<");
      type.typeOf = "object";
      type.instanceOf = Array;
      type.genericTypes = readTypes();
      consumeCharacter(">");
    } else if (["true", "false"].includes(name)) {
      type.typeOf = "boolean";
      type.value = name === "true";
    } else {
      throw new Error(`Unknown type at position ${pos}: "${type}"`);
    }
    consumeSpaces();
    while (definition[pos] === "[") {
      consumeCharacter("[");
      consumeCharacter("]");
      type = { typeOf: "object", instanceOf: Array, genericTypes: [type] };
    }
    return type;
  }
  function readTypes() {
    consumeSpaces();
    const types = [readType()];
    while (definition[pos] === "|") {
      consumeCharacter("|");
      types.push(readType());
      consumeSpaces();
    }
    return types;
  }
  return readType();
}
function checkObject(path, properties, obj, partial) {
  const invalidProperties = properties.find((prop) => prop.name === "*" || prop.name[0] === "$") ? [] : Object.keys(obj).filter((key) => ![null, void 0].includes(obj[key]) && !properties.find((prop) => prop.name === key));
  if (invalidProperties.length > 0) {
    return { ok: false, reason: `Object at path "${path}" cannot have propert${invalidProperties.length === 1 ? "y" : "ies"} ${invalidProperties.map((p) => `"${p}"`).join(", ")}` };
  }
  function checkProperty(property) {
    const hasValue = ![null, void 0].includes(obj[property.name]);
    if (!property.optional && (partial ? obj[property.name] === null : !hasValue)) {
      return { ok: false, reason: `Property at path "${path}/${property.name}" is not optional` };
    }
    if (hasValue && property.types.length === 1) {
      return checkType(`${path}/${property.name}`, property.types[0], obj[property.name], false);
    }
    if (hasValue && !property.types.some((type) => checkType(`${path}/${property.name}`, type, obj[property.name], false).ok)) {
      return { ok: false, reason: `Property at path "${path}/${property.name}" does not match any of ${property.types.length} allowed types` };
    }
    return { ok: true };
  }
  const namedProperties = properties.filter((prop) => !prop.wildcard);
  const failedProperty = namedProperties.find((prop) => !checkProperty(prop).ok);
  if (failedProperty) {
    const reason = checkProperty(failedProperty).reason;
    return { ok: false, reason };
  }
  const wildcardProperty = properties.find((prop) => prop.wildcard);
  if (!wildcardProperty) {
    return { ok: true };
  }
  const wildcardChildKeys = Object.keys(obj).filter((key) => !namedProperties.find((prop) => prop.name === key));
  let result = { ok: true };
  for (let i = 0; i < wildcardChildKeys.length && result.ok; i++) {
    const childKey = wildcardChildKeys[i];
    result = checkProperty({ name: childKey, types: wildcardProperty.types, optional: true, wildcard: true });
  }
  return result;
}
function checkType(path, type, value, partial, trailKeys) {
  const ok = { ok: true };
  if (type.typeOf === "any") {
    return ok;
  }
  if (trailKeys instanceof Array && trailKeys.length > 0) {
    if (type.typeOf !== "object") {
      return { ok: false, reason: `path "${path}" must be typeof ${type.typeOf}` };
    }
    if (!type.children) {
      return ok;
    }
    const childKey = trailKeys[0];
    let property = type.children.find((prop) => prop.name === childKey);
    if (!property) {
      property = type.children.find((prop) => prop.name === "*" || prop.name[0] === "$");
    }
    if (!property) {
      return { ok: false, reason: `Object at path "${path}" cannot have property "${childKey}"` };
    }
    if (property.optional && value === null && trailKeys.length === 1) {
      return ok;
    }
    let result;
    property.types.some((type2) => {
      const childPath = typeof childKey === "number" ? `${path}[${childKey}]` : `${path}/${childKey}`;
      result = checkType(childPath, type2, value, partial, trailKeys.slice(1));
      return result.ok;
    });
    return result;
  }
  if (value === null) {
    return ok;
  }
  if (type.instanceOf === Object && (typeof value !== "object" || value instanceof Array || value instanceof Date)) {
    return { ok: false, reason: `path "${path}" must be an object collection` };
  }
  if (type.instanceOf && (typeof value !== "object" || value.constructor !== type.instanceOf)) {
    return { ok: false, reason: `path "${path}" must be an instance of ${type.instanceOf.name}` };
  }
  if ("value" in type && value !== type.value) {
    return { ok: false, reason: `path "${path}" must be value: ${type.value}` };
  }
  if (typeof value !== type.typeOf) {
    return { ok: false, reason: `path "${path}" must be typeof ${type.typeOf}` };
  }
  if (type.instanceOf === Array && type.genericTypes && !value.every((v) => type.genericTypes.some((t) => checkType(path, t, v, false).ok))) {
    return { ok: false, reason: `every array value of path "${path}" must match one of the specified types` };
  }
  if (type.typeOf === "object" && type.children) {
    return checkObject(path, type.children, value, partial);
  }
  if (type.matches && !type.matches.test(value)) {
    return { ok: false, reason: `path "${path}" must match regular expression /${type.matches.source}/${type.matches.flags}` };
  }
  return ok;
}
function getConstructorType(val) {
  switch (val) {
    case String:
      return "string";
    case Number:
      return "number";
    case Boolean:
      return "boolean";
    case Date:
      return "Date";
    case BigInt:
      return "bigint";
    case Array:
      throw new Error("Schema error: Array cannot be used without a type. Use string[] or Array<string> instead");
    default:
      throw new Error(`Schema error: unknown type used: ${val.name}`);
  }
}
class SchemaDefinition {
  constructor(definition) {
    this.source = definition;
    if (typeof definition === "object") {
      const toTS = (obj) => {
        return "{" + Object.keys(obj).map((key) => {
          let val = obj[key];
          if (val === void 0) {
            val = "undefined";
          } else if (val instanceof RegExp) {
            val = `/${val.source}/${val.flags}`;
          } else if (typeof val === "object") {
            val = toTS(val);
          } else if (typeof val === "function") {
            val = getConstructorType(val);
          } else if (!["string", "number", "boolean", "bigint"].includes(typeof val)) {
            throw new Error(`Type definition for key "${key}" must be a string, number, boolean, bigint, object, regular expression, or one of these classes: String, Number, Boolean, Date, BigInt`);
          }
          return `${key}:${val}`;
        }).join(",") + "}";
      };
      this.text = toTS(definition);
    } else if (typeof definition === "string") {
      this.text = definition;
    } else {
      throw new Error("Type definiton must be a string or an object");
    }
    this.type = parse$1(this.text);
  }
  check(path, value, partial, trailKeys) {
    return checkType(path, this.type, value, partial, trailKeys);
  }
}
class NotSupported {
  constructor(context2 = "browser") {
    throw new Error(`This feature is not supported in ${context2} context`);
  }
}
class AceBaseStorageSettings extends NotSupported {
}
class AceBaseStorage extends NotSupported {
}
class SQLiteStorageSettings extends NotSupported {
}
class SQLiteStorage extends NotSupported {
}
class MSSQLStorageSettings extends NotSupported {
}
class MSSQLStorage extends NotSupported {
}
const VALUE_TYPES = Object.freeze({
  // Native types:
  OBJECT: 1,
  ARRAY: 2,
  NUMBER: 3,
  BOOLEAN: 4,
  STRING: 5,
  BIGINT: 7,
  // Custom types:
  DATETIME: 6,
  BINARY: 8,
  REFERENCE: 9
  // Absolute or relative path to other node
  // Future:
  // DOCUMENT: 10,     // JSON/XML documents that are contained entirely within the stored node
});
function getValueTypeName(valueType) {
  switch (valueType) {
    case VALUE_TYPES.ARRAY:
      return "array";
    case VALUE_TYPES.BINARY:
      return "binary";
    case VALUE_TYPES.BOOLEAN:
      return "boolean";
    case VALUE_TYPES.DATETIME:
      return "date";
    case VALUE_TYPES.NUMBER:
      return "number";
    case VALUE_TYPES.OBJECT:
      return "object";
    case VALUE_TYPES.REFERENCE:
      return "reference";
    case VALUE_TYPES.STRING:
      return "string";
    case VALUE_TYPES.BIGINT:
      return "bigint";
  }
}
class NodeInfo {
  constructor(info) {
    this.path = info.path;
    this.type = info.type;
    this.index = info.index;
    this.key = info.key;
    this.exists = info.exists;
    this.address = info.address;
    this.value = info.value;
    this.childCount = info.childCount;
    if (typeof this.path === "string" && (typeof this.key === "undefined" && typeof this.index === "undefined")) {
      const pathInfo = PathInfo.get(this.path);
      if (typeof pathInfo.key === "number") {
        this.index = pathInfo.key;
      } else {
        this.key = pathInfo.key;
      }
    }
    if (typeof this.exists === "undefined") {
      this.exists = true;
    }
  }
  get valueType() {
    return this.type;
  }
  get valueTypeName() {
    return getValueTypeName(this.valueType);
  }
  toString() {
    if (!this.exists) {
      return `"${this.path}" doesn't exist`;
    }
    if (this.address) {
      return `"${this.path}" is ${this.valueTypeName} stored at ${this.address.toString()}`;
    } else {
      return `"${this.path}" is ${this.valueTypeName} with value ${this.value}`;
    }
  }
}
function assert(condition, error) {
  if (!condition) {
    throw new Error(`Assertion failed: ${error ?? "check your code"}`);
  }
}
const DEFAULT_LOCK_TIMEOUT = 120;
const LOCK_STATE = {
  PENDING: "pending",
  LOCKED: "locked",
  EXPIRED: "expired",
  DONE: "done"
};
class NodeLocker {
  /**
   * Provides locking mechanism for nodes, ensures no simultanious read and writes happen to overlapping paths
   */
  constructor(debug2, lockTimeout = DEFAULT_LOCK_TIMEOUT) {
    this._locks = [];
    this._lastTid = 0;
    this.debug = debug2;
    this.timeout = lockTimeout * 1e3;
  }
  setTimeout(timeout) {
    this.timeout = timeout * 1e3;
  }
  createTid() {
    return ID.generate();
  }
  _allowLock(path, tid, forWriting) {
    const conflict = this._locks.find((otherLock) => {
      return otherLock.tid !== tid && otherLock.state === LOCK_STATE.LOCKED && (forWriting || otherLock.forWriting);
    });
    return { allow: !conflict, conflict };
  }
  quit() {
    return new Promise((resolve) => {
      if (this._locks.length === 0) {
        return resolve();
      }
      this._quit = resolve;
    });
  }
  /**
   * Safely reject a pending lock, catching any unhandled promise rejections (that should not happen in the first place, obviously)
   * @param lock
   */
  _rejectLock(lock, err) {
    this._locks.splice(this._locks.indexOf(lock), 1);
    clearTimeout(lock.timeout);
    try {
      lock.reject(err);
    } catch (err2) {
      console.error(`Unhandled promise rejection:`, err2);
    }
  }
  _processLockQueue() {
    if (this._quit) {
      const quitError = new Error("Quitting");
      this._locks.filter((lock) => lock.state === LOCK_STATE.PENDING).forEach((lock) => this._rejectLock(lock, quitError));
      if (this._locks.length === 0) {
        this._quit();
      }
    }
    const pending = this._locks.filter((lock) => lock.state === LOCK_STATE.PENDING).sort((a, b) => {
      if (a.priority && !b.priority) {
        return -1;
      } else if (!a.priority && b.priority) {
        return 1;
      }
      return a.requested - b.requested;
    });
    pending.forEach((lock) => {
      const check = this._allowLock(lock.path, lock.tid, lock.forWriting);
      lock.waitingFor = check.conflict || null;
      if (check.allow) {
        this.lock(lock).then(lock.resolve).catch((err) => this._rejectLock(lock, err));
      }
    });
  }
  async lock(path, tid, forWriting = true, comment = "", options = { withPriority: false, noTimeout: false }) {
    let lock, proceed;
    if (path instanceof NodeLock) {
      lock = path;
      proceed = true;
    } else if (this._locks.findIndex((l2) => l2.tid === tid && l2.state === LOCK_STATE.EXPIRED) >= 0) {
      throw new Error(`lock on tid ${tid} has expired, not allowed to continue`);
    } else if (this._quit && !options.withPriority) {
      throw new Error(`Quitting`);
    } else {
      lock = new NodeLock(this, path, tid, forWriting, options.withPriority === true);
      lock.comment = comment;
      this._locks.push(lock);
      const check = this._allowLock(path, tid, forWriting);
      lock.waitingFor = check.conflict || null;
      proceed = check.allow;
    }
    if (proceed) {
      lock.state = LOCK_STATE.LOCKED;
      if (typeof lock.granted === "number")
        ;
      else {
        lock.granted = Date.now();
        if (options.noTimeout !== true) {
          lock.expires = Date.now() + this.timeout;
          let timeoutCount = 0;
          const timeoutHandler = () => {
            if (lock.state !== LOCK_STATE.LOCKED) {
              return;
            }
            timeoutCount++;
            if (timeoutCount <= 3) {
              this.debug.warn(`${lock.forWriting ? "write" : "read"} lock on path "/${lock.path}" by tid ${lock.tid} (${lock.comment}) is taking a long time to complete [${timeoutCount}]`);
              lock.timeout = setTimeout(timeoutHandler, this.timeout / 4);
              return;
            }
            this.debug.error(`lock :: ${lock.forWriting ? "write" : "read"} lock on path "/${lock.path}" by tid ${lock.tid} (${lock.comment}) took too long`);
            lock.state = LOCK_STATE.EXPIRED;
            this._processLockQueue();
          };
          lock.timeout = setTimeout(timeoutHandler, this.timeout / 4);
        }
      }
      return lock;
    } else {
      assert(lock.state === LOCK_STATE.PENDING);
      return new Promise((resolve, reject) => {
        lock.resolve = resolve;
        lock.reject = reject;
      });
    }
  }
  unlock(lockOrId, comment, processQueue = true) {
    let lock, i;
    if (lockOrId instanceof NodeLock) {
      lock = lockOrId;
      i = this._locks.indexOf(lock);
    } else {
      const id = lockOrId;
      i = this._locks.findIndex((l2) => l2.id === id);
      lock = this._locks[i];
    }
    if (i < 0) {
      const msg = `lock on "/${lock.path}" for tid ${lock.tid} wasn't found; ${comment}`;
      throw new Error(msg);
    }
    lock.state = LOCK_STATE.DONE;
    clearTimeout(lock.timeout);
    this._locks.splice(i, 1);
    processQueue && this._processLockQueue();
    return lock;
  }
  list() {
    return this._locks || [];
  }
  isAllowed(path, tid, forWriting) {
    return this._allowLock(path, tid, forWriting).allow;
  }
}
let lastid = 0;
class NodeLock {
  /**
   * Constructor for a record lock
   * @param {NodeLocker} locker
   * @param {string} path
   * @param {string} tid
   * @param {boolean} forWriting
   * @param {boolean} priority
   */
  constructor(locker, path, tid, forWriting, priority = false) {
    this.locker = locker;
    this.path = path;
    this.tid = tid;
    this.forWriting = forWriting;
    this.priority = priority;
    this.state = LOCK_STATE.PENDING;
    this.requested = Date.now();
    this.comment = "";
    this.waitingFor = null;
    this.id = ++lastid;
    this.history = [];
  }
  static get LOCK_STATE() {
    return LOCK_STATE;
  }
  async release(comment) {
    this.history.push({ action: "release", path: this.path, forWriting: this.forWriting, comment });
    return this.locker.unlock(this, comment || this.comment);
  }
  async moveToParent() {
    const parentPath = PathInfo.get(this.path).parentPath;
    const allowed = this.locker.isAllowed(parentPath, this.tid, this.forWriting);
    if (allowed) {
      this.history.push({ path: this.path, forWriting: this.forWriting, action: "moving to parent" });
      this.waitingFor = null;
      this.path = parentPath;
      return this;
    } else {
      this.locker.unlock(this, `moveLockToParent: ${this.comment}`, false);
      const newLock = await this.locker.lock(parentPath, this.tid, this.forWriting, this.comment, { withPriority: true });
      newLock.history = this.history;
      newLock.history.push({ path: this.path, forWriting: this.forWriting, action: "moving to parent through queue (priority)" });
      return newLock;
    }
  }
}
class NodeNotFoundError extends Error {
}
class NodeRevisionError extends Error {
}
class AceBaseIPCPeerExitingError extends Error {
  constructor(message) {
    super(`Exiting: ${message}`);
  }
}
class AceBaseIPCPeer extends SimpleEventEmitter {
  constructor(storage, id, dbname = storage.name) {
    super();
    this.storage = storage;
    this.id = id;
    this.dbname = dbname;
    this.ipcType = "ipc";
    this.ourSubscriptions = [];
    this.remoteSubscriptions = [];
    this.peers = [];
    this._exiting = false;
    this._locks = [];
    this._requests = /* @__PURE__ */ new Map();
    this._eventsEnabled = true;
    this._nodeLocker = new NodeLocker(storage.debug, storage.settings.lockTimeout);
    storage.on("subscribe", (subscription) => {
      storage.debug.verbose(`database subscription being added on peer ${this.id}`);
      const remoteSubscription = this.remoteSubscriptions.find((sub) => sub.callback === subscription.callback);
      if (remoteSubscription) {
        return;
      }
      const othersAlreadyNotifying = this.ourSubscriptions.some((sub) => sub.event === subscription.event && sub.path === subscription.path);
      this.ourSubscriptions.push(subscription);
      if (othersAlreadyNotifying) {
        return;
      }
      const message = { type: "subscribe", from: this.id, data: { path: subscription.path, event: subscription.event } };
      this.sendMessage(message);
    });
    storage.on("unsubscribe", (subscription) => {
      const remoteSubscription = this.remoteSubscriptions.find((sub) => sub.callback === subscription.callback);
      if (remoteSubscription) {
        this.remoteSubscriptions.splice(this.remoteSubscriptions.indexOf(remoteSubscription), 1);
        return;
      }
      this.ourSubscriptions.filter((sub) => sub.path === subscription.path && (!subscription.event || sub.event === subscription.event) && (!subscription.callback || sub.callback === subscription.callback)).forEach((sub) => {
        this.ourSubscriptions.splice(this.ourSubscriptions.indexOf(sub), 1);
        const message = { type: "unsubscribe", from: this.id, data: { path: sub.path, event: sub.event } };
        this.sendMessage(message);
      });
    });
  }
  get isMaster() {
    return this.masterPeerId === this.id;
  }
  /**
   * Requests the peer to shut down. Resolves once its locks are cleared and 'exit' event has been emitted.
   * Has to be overridden by the IPC implementation to perform custom shutdown tasks
   * @param code optional exit code (eg one provided by SIGINT event)
   */
  async exit(code = 0) {
    if (this._exiting) {
      return this.once("exit");
    }
    this._exiting = true;
    this.storage.debug.warn(`Received ${this.isMaster ? "master" : "worker " + this.id} process exit request`);
    if (this._locks.length > 0) {
      this.storage.debug.warn(`Waiting for ${this.isMaster ? "master" : "worker"} ${this.id} locks to clear`);
      await this.once("locks-cleared");
    }
    this.sayGoodbye(this.id);
    this.storage.debug.warn(`${this.isMaster ? "Master" : "Worker " + this.id} will now exit`);
    this.emitOnce("exit", code);
  }
  sayGoodbye(forPeerId) {
    const bye = { type: "bye", from: forPeerId, data: void 0 };
    this.sendMessage(bye);
  }
  addPeer(id, sendReply = true) {
    if (this._exiting) {
      return;
    }
    const peer = this.peers.find((w) => w.id === id);
    if (!peer) {
      this.peers.push({ id, lastSeen: Date.now() });
    }
    if (sendReply) {
      const helloMessage = { type: "hello", from: this.id, to: id, data: void 0 };
      this.sendMessage(helloMessage);
      this.ourSubscriptions.forEach((sub) => {
        const message = { type: "subscribe", from: this.id, to: id, data: { path: sub.path, event: sub.event } };
        this.sendMessage(message);
      });
    }
  }
  removePeer(id, ignoreUnknown = false) {
    if (this._exiting) {
      return;
    }
    const peer = this.peers.find((peer2) => peer2.id === id);
    if (!peer) {
      if (!ignoreUnknown) {
        throw new Error(`We are supposed to know this peer!`);
      }
      return;
    }
    this.peers.splice(this.peers.indexOf(peer), 1);
    const subscriptions = this.remoteSubscriptions.filter((sub) => sub.for === id);
    subscriptions.forEach((sub) => {
      this.remoteSubscriptions.splice(this.remoteSubscriptions.indexOf(sub), 1);
      this.storage.subscriptions.remove(sub.path, sub.event, sub.callback);
    });
  }
  addRemoteSubscription(peerId, details) {
    if (this._exiting) {
      return;
    }
    if (this.remoteSubscriptions.some((sub) => sub.for === peerId && sub.event === details.event && sub.path === details.path)) {
      return;
    }
    const subscribeCallback = (err, path, val, previous, context2) => {
      const eventMessage = {
        type: "event",
        from: this.id,
        to: peerId,
        path: details.path,
        event: details.event,
        data: {
          path,
          val,
          previous,
          context: context2
        }
      };
      this.sendMessage(eventMessage);
    };
    this.remoteSubscriptions.push({ for: peerId, event: details.event, path: details.path, callback: subscribeCallback });
    this.storage.subscriptions.add(details.path, details.event, subscribeCallback);
  }
  cancelRemoteSubscription(peerId, details) {
    const sub = this.remoteSubscriptions.find((sub2) => sub2.for === peerId && sub2.event === details.event && sub2.path === details.event);
    if (!sub) {
      return;
    }
    this.storage.subscriptions.remove(details.path, details.event, sub.callback);
  }
  async handleMessage(message) {
    switch (message.type) {
      case "hello":
        return this.addPeer(message.from, message.to !== this.id);
      case "bye":
        return this.removePeer(message.from, true);
      case "subscribe":
        return this.addRemoteSubscription(message.from, message.data);
      case "unsubscribe":
        return this.cancelRemoteSubscription(message.from, message.data);
      case "event": {
        if (!this._eventsEnabled) {
          break;
        }
        const eventMessage = message;
        const context2 = eventMessage.data.context || {};
        context2.acebase_ipc = { type: this.ipcType, origin: eventMessage.from };
        const subscriptions = this.ourSubscriptions.filter((sub) => sub.event === eventMessage.event && sub.path === eventMessage.path);
        subscriptions.forEach((sub) => {
          sub.callback(null, eventMessage.data.path, eventMessage.data.val, eventMessage.data.previous, context2);
        });
        break;
      }
      case "lock-request": {
        if (!this.isMaster) {
          throw new Error(`Workers are not supposed to receive lock requests!`);
        }
        const request = message;
        const result = { type: "lock-result", id: request.id, from: this.id, to: request.from, ok: true, data: void 0 };
        try {
          const lock = await this.lock(request.data);
          result.data = {
            id: lock.id,
            path: lock.path,
            tid: lock.tid,
            write: lock.forWriting,
            expires: lock.expires,
            comment: lock.comment
          };
        } catch (err) {
          result.ok = false;
          result.reason = err.stack || err.message || err;
        }
        return this.sendMessage(result);
      }
      case "lock-result": {
        if (this.isMaster) {
          throw new Error(`Masters are not supposed to receive results for lock requests!`);
        }
        const result = message;
        const request = this._requests.get(result.id);
        if (typeof request !== "object") {
          throw new Error(`The request must be known to us!`);
        }
        if (result.ok) {
          request.resolve(result.data);
        } else {
          request.reject(new Error(result.reason));
        }
        return;
      }
      case "unlock-request": {
        if (!this.isMaster) {
          throw new Error(`Workers are not supposed to receive unlock requests!`);
        }
        const request = message;
        const result = { type: "unlock-result", id: request.id, from: this.id, to: request.from, ok: true, data: { id: request.data.id } };
        try {
          const lockInfo = this._locks.find((l2) => {
            var _a2;
            return ((_a2 = l2.lock) == null ? void 0 : _a2.id) === request.data.id;
          });
          await lockInfo.lock.release();
        } catch (err) {
          result.ok = false;
          result.reason = err.stack || err.message || err;
        }
        return this.sendMessage(result);
      }
      case "unlock-result": {
        if (this.isMaster) {
          throw new Error(`Masters are not supposed to receive results for unlock requests!`);
        }
        const result = message;
        const request = this._requests.get(result.id);
        if (typeof request !== "object") {
          throw new Error(`The request must be known to us!`);
        }
        if (result.ok) {
          request.resolve(result.data);
        } else {
          request.reject(new Error(result.reason));
        }
        return;
      }
      case "move-lock-request": {
        if (!this.isMaster) {
          throw new Error(`Workers are not supposed to receive move lock requests!`);
        }
        const request = message;
        const result = { type: "lock-result", id: request.id, from: this.id, to: request.from, ok: true, data: void 0 };
        try {
          let movedLock;
          const lockRequest = this._locks.find((r) => {
            var _a2;
            return ((_a2 = r.lock) == null ? void 0 : _a2.id) === request.data.id;
          });
          if (request.data.move_to === "parent") {
            movedLock = await lockRequest.lock.moveToParent();
          } else {
            throw new Error(`Unknown lock move_to "${request.data.move_to}"`);
          }
          lockRequest.lock = movedLock;
          result.data = {
            id: movedLock.id,
            path: movedLock.path,
            tid: movedLock.tid,
            write: movedLock.forWriting,
            expires: movedLock.expires,
            comment: movedLock.comment
          };
        } catch (err) {
          result.ok = false;
          result.reason = err.stack || err.message || err;
        }
        return this.sendMessage(result);
      }
      case "notification": {
        return this.emit("notification", message);
      }
      case "request": {
        return this.emit("request", message);
      }
      case "result": {
        const result = message;
        const request = this._requests.get(result.id);
        if (typeof request !== "object") {
          throw new Error(`Result of unknown request received`);
        }
        if (result.ok) {
          request.resolve(result.data);
        } else {
          request.reject(new Error(result.reason));
        }
      }
    }
  }
  /**
   * Acquires a lock. If this peer is a worker, it will request the lock from the master
   * @param details
   */
  async lock(details) {
    if (this._exiting) {
      const tidApproved = this._locks.find((l2) => l2.tid === details.tid && l2.granted);
      if (!tidApproved) {
        throw new AceBaseIPCPeerExitingError("new transaction lock denied because the IPC peer is exiting");
      }
    }
    const removeLock = (lockDetails) => {
      this._locks.splice(this._locks.indexOf(lockDetails), 1);
      if (this._locks.length === 0) {
        this.emit("locks-cleared");
      }
    };
    if (this.isMaster) {
      const lockInfo = { tid: details.tid, granted: false, request: details, lock: null };
      this._locks.push(lockInfo);
      const lock = await this._nodeLocker.lock(details.path, details.tid, details.write, details.comment);
      lockInfo.tid = lock.tid;
      lockInfo.granted = true;
      const createIPCLock = (lock2) => {
        return {
          get id() {
            return lock2.id;
          },
          get tid() {
            return lock2.tid;
          },
          get path() {
            return lock2.path;
          },
          get forWriting() {
            return lock2.forWriting;
          },
          get expires() {
            return lock2.expires;
          },
          get comment() {
            return lock2.comment;
          },
          get state() {
            return lock2.state;
          },
          release: async () => {
            await lock2.release();
            removeLock(lockInfo);
          },
          moveToParent: async () => {
            const parentLock = await lock2.moveToParent();
            lockInfo.lock = createIPCLock(parentLock);
            return lockInfo.lock;
          }
        };
      };
      lockInfo.lock = createIPCLock(lock);
      return lockInfo.lock;
    } else {
      const lockInfo = { tid: details.tid, granted: false, request: details, lock: null };
      this._locks.push(lockInfo);
      const createIPCLock = (result2) => {
        lockInfo.granted = true;
        lockInfo.tid = result2.tid;
        lockInfo.lock = {
          id: result2.id,
          tid: result2.tid,
          path: result2.path,
          forWriting: result2.write,
          state: LOCK_STATE.LOCKED,
          expires: result2.expires,
          comment: result2.comment,
          release: async () => {
            const req2 = { type: "unlock-request", id: ID.generate(), from: this.id, to: this.masterPeerId, data: { id: lockInfo.lock.id } };
            await this.request(req2);
            lockInfo.lock.state = LOCK_STATE.DONE;
            this.storage.debug.verbose(`Worker ${this.id} released lock ${lockInfo.lock.id} (tid ${lockInfo.lock.tid}, ${lockInfo.lock.comment}, "/${lockInfo.lock.path}", ${lockInfo.lock.forWriting ? "write" : "read"})`);
            removeLock(lockInfo);
          },
          moveToParent: async () => {
            const req2 = { type: "move-lock-request", id: ID.generate(), from: this.id, to: this.masterPeerId, data: { id: lockInfo.lock.id, move_to: "parent" } };
            let result3;
            try {
              result3 = await this.request(req2);
            } catch (err2) {
              lockInfo.lock.state = LOCK_STATE.DONE;
              removeLock(lockInfo);
              throw err2;
            }
            lockInfo.lock = createIPCLock(result3);
            return lockInfo.lock;
          }
        };
        return lockInfo.lock;
      };
      const req = { type: "lock-request", id: ID.generate(), from: this.id, to: this.masterPeerId, data: details };
      let result, err;
      try {
        result = await this.request(req);
      } catch (e) {
        err = e;
        result = null;
      }
      if (err) {
        removeLock(lockInfo);
        throw err;
      }
      return createIPCLock(result);
    }
  }
  async request(req) {
    let resolve, reject;
    const promise = new Promise((rs, rj) => {
      resolve = (result) => {
        this._requests.delete(req.id);
        rs(result);
      };
      reject = (err) => {
        this._requests.delete(req.id);
        rj(err);
      };
    });
    this._requests.set(req.id, { resolve, reject, request: req });
    this.sendMessage(req);
    return promise;
  }
  /**
   * Sends a custom request to the IPC master
   * @param request
   * @returns
   */
  sendRequest(request) {
    const req = { type: "request", from: this.id, to: this.masterPeerId, id: ID.generate(), data: request };
    return this.request(req).catch((err) => {
      this.storage.debug.error(err);
      throw err;
    });
  }
  replyRequest(requestMessage, result) {
    const reply = { type: "result", id: requestMessage.id, ok: true, from: this.id, to: requestMessage.from, data: result };
    this.sendMessage(reply);
  }
  /**
   * Sends a custom notification to all IPC peers
   * @param notification
   * @returns
   */
  sendNotification(notification) {
    const msg = { type: "notification", from: this.id, data: notification };
    this.sendMessage(msg);
  }
  /**
   * If ipc event handling is currently enabled
   */
  get eventsEnabled() {
    return this._eventsEnabled;
  }
  /**
   * Enables or disables ipc event handling. When disabled, incoming event messages will be ignored.
   */
  set eventsEnabled(enabled) {
    this.storage.debug.log(`ipc events ${enabled ? "enabled" : "disabled"}`);
    this._eventsEnabled = enabled;
  }
}
class IPCPeer extends AceBaseIPCPeer {
  constructor(storage) {
    super(storage, ID.generate());
    this.masterPeerId = this.id;
    this.ipcType = "browser.bcc";
    window.addEventListener("beforeunload", () => {
      this.exit();
    });
    if (typeof window.BroadcastChannel !== "undefined") {
      this.channel = new BroadcastChannel(`acebase:${storage.name}`);
    } else {
      const listeners = [null];
      const notImplemented = () => {
        throw new Error("Not implemented");
      };
      this.channel = {
        name: `acebase:${storage.name}`,
        postMessage: (message) => {
          const messageId = ID.generate(), key = `acebase:${storage.name}:${this.id}:${messageId}`, payload = JSON.stringify(serialize(message));
          localStorage.setItem(key, payload);
          setTimeout(() => localStorage.removeItem(key), 10);
        },
        set onmessage(handler) {
          listeners[0] = handler;
        },
        set onmessageerror(handler) {
          notImplemented();
        },
        close() {
          notImplemented();
        },
        addEventListener(event, callback) {
          if (event !== "message") {
            notImplemented();
          }
          listeners.push(callback);
        },
        removeEventListener(event, callback) {
          const i = listeners.indexOf(callback);
          i >= 1 && listeners.splice(i, 1);
        },
        dispatchEvent(event) {
          listeners.forEach((callback) => {
            try {
              callback && callback(event);
            } catch (err) {
              console.error(err);
            }
          });
          return true;
        }
      };
      window.addEventListener("storage", (event) => {
        const [acebase2, dbname, peerId, messageId] = event.key.split(":");
        if (acebase2 !== "acebase" || dbname !== storage.name || peerId === this.id || event.newValue === null) {
          return;
        }
        const message = deserialize(JSON.parse(event.newValue));
        this.channel.dispatchEvent({ data: message });
      });
    }
    this.channel.addEventListener("message", async (event) => {
      const message = event.data;
      if (message.to && message.to !== this.id) {
        return;
      }
      storage.debug.verbose(`[BroadcastChannel] received: `, message);
      if (message.type === "hello" && message.from < this.masterPeerId) {
        this.masterPeerId = message.from;
        storage.debug.log(`[BroadcastChannel] Tab ${this.masterPeerId} is the master.`);
      } else if (message.type === "bye" && message.from === this.masterPeerId) {
        storage.debug.log(`[BroadcastChannel] Master tab ${this.masterPeerId} is leaving`);
        const allPeerIds = this.peers.map((peer) => peer.id).concat(this.id).filter((id) => id !== this.masterPeerId);
        this.masterPeerId = allPeerIds.sort()[0];
        storage.debug.log(`[BroadcastChannel] ${this.masterPeerId === this.id ? "We are" : `tab ${this.masterPeerId} is`} the new master. Requesting ${this._locks.length} locks (${this._locks.filter((r) => !r.granted).length} pending)`);
        const requests = this._locks.splice(0);
        await Promise.all(requests.filter((req) => req.granted).map(async (req) => {
          let released, movedToParent;
          req.lock.release = () => {
            return new Promise((resolve) => released = resolve);
          };
          req.lock.moveToParent = () => {
            return new Promise((resolve) => movedToParent = resolve);
          };
          const lock = await this.lock({ path: req.lock.path, write: req.lock.forWriting, tid: req.lock.tid, comment: req.lock.comment });
          if (movedToParent) {
            const newLock = await lock.moveToParent();
            movedToParent(newLock);
          }
          if (released) {
            await lock.release();
            released();
          }
        }));
        await Promise.all(requests.filter((req) => !req.granted).map(async (req) => {
          await this.lock(req.request);
        }));
      }
      return this.handleMessage(message);
    });
    const helloMsg = { type: "hello", from: this.id, data: void 0 };
    this.sendMessage(helloMsg);
  }
  sendMessage(message) {
    this.storage.debug.verbose(`[BroadcastChannel] sending: `, message);
    this.channel.postMessage(message);
  }
}
class RemoteIPCPeer extends NotSupported {
}
class pfs {
  static get hasFileSystem() {
    return false;
  }
  static get fs() {
    return null;
  }
}
class DataIndex extends NotSupported {
}
class FullTextIndex extends NotSupported {
}
class GeoIndex extends NotSupported {
}
class ArrayIndex extends NotSupported {
}
async function createIndex(context2, path, key, options) {
  if (!context2.storage.indexes.supported) {
    throw new Error("Indexes are not supported in current environment because it requires Node.js fs");
  }
  const { ipc, debug: debug2, indexes, storage } = context2;
  const rebuild = options && options.rebuild === true;
  const indexType = options && options.type || "normal";
  let includeKeys = options && options.include || [];
  if (typeof includeKeys === "string") {
    includeKeys = [includeKeys];
  }
  const existingIndex = indexes.find((index2) => index2.path === path && index2.key === key && index2.type === indexType && index2.includeKeys.length === includeKeys.length && index2.includeKeys.every((key2, index3) => includeKeys[index3] === key2));
  if (existingIndex && options.config) {
    existingIndex.config = options.config;
  }
  if (existingIndex && rebuild !== true) {
    debug2.log(`Index on "/${path}/*/${key}" already exists`.colorize(ColorStyle.inverse));
    return existingIndex;
  }
  if (!ipc.isMaster) {
    const result = await ipc.sendRequest({ type: "index.create", path, key, options });
    if (result.ok) {
      return this.add(result.fileName);
    }
    throw new Error(result.reason);
  }
  await pfs.mkdir(`${storage.settings.path}/${storage.name}.acebase`).catch((err) => {
    if (err.code !== "EEXIST") {
      throw err;
    }
  });
  const index = existingIndex || (() => {
    const { include, caseSensitive, textLocale, textLocaleKey } = options;
    const indexOptions = { include, caseSensitive, textLocale, textLocaleKey };
    switch (indexType) {
      case "array":
        return new ArrayIndex(storage, path, key, { ...indexOptions });
      case "fulltext":
        return new FullTextIndex(storage, path, key, { ...indexOptions, config: options.config });
      case "geo":
        return new GeoIndex(storage, path, key, { ...indexOptions });
      default:
        return new DataIndex(storage, path, key, { ...indexOptions });
    }
  })();
  if (!existingIndex) {
    indexes.push(index);
  }
  try {
    await index.build();
  } catch (err) {
    context2.debug.error(`Index build on "/${path}/*/${key}" failed: ${err.message} (code: ${err.code})`.colorize(ColorStyle.red));
    if (!existingIndex) {
      indexes.splice(indexes.indexOf(index), 1);
    }
    throw err;
  }
  ipc.sendNotification({ type: "index.created", fileName: index.fileName, path, key, options });
  return index;
}
const { compareValues: compareValues$1, getChildValues, encodeString, defer } = Utils;
const SUPPORTED_EVENTS = ["value", "child_added", "child_changed", "child_removed", "mutated", "mutations"];
SUPPORTED_EVENTS.push(...SUPPORTED_EVENTS.map((event) => `notify_${event}`));
const NOOP = () => {
};
class SchemaValidationError extends Error {
  constructor(reason) {
    super(`Schema validation failed: ${reason}`);
    this.reason = reason;
  }
}
class StorageSettings {
  constructor(settings = {}) {
    this.maxInlineValueSize = 50;
    this.removeVoidProperties = false;
    this.path = ".";
    this.lockTimeout = 120;
    this.type = "data";
    this.readOnly = false;
    if (typeof settings.maxInlineValueSize === "number") {
      this.maxInlineValueSize = settings.maxInlineValueSize;
    }
    if (typeof settings.removeVoidProperties === "boolean") {
      this.removeVoidProperties = settings.removeVoidProperties;
    }
    if (typeof settings.path === "string") {
      this.path = settings.path;
    }
    if (this.path.endsWith("/")) {
      this.path = this.path.slice(0, -1);
    }
    if (typeof settings.lockTimeout === "number") {
      this.lockTimeout = settings.lockTimeout;
    }
    if (typeof settings.type === "string") {
      this.type = settings.type;
    }
    if (typeof settings.readOnly === "boolean") {
      this.readOnly = settings.readOnly;
    }
    if (typeof settings.ipc === "object") {
      this.ipc = settings.ipc;
    }
  }
}
class Storage extends SimpleEventEmitter {
  /**
   * Base class for database storage, must be extended by back-end specific methods.
   * Currently implemented back-ends are AceBaseStorage, SQLiteStorage, MSSQLStorage, CustomStorage
   * @param name name of the database
   * @param settings instance of AceBaseStorageSettings or SQLiteStorageSettings
   */
  constructor(name, settings, env2) {
    super();
    this.name = name;
    this.settings = settings;
    this._schemas = [];
    this._indexes = [];
    this.indexes = {
      /**
       * Tests if (the default storage implementation of) indexes are supported in the environment.
       * They are currently only supported when running in Node.js because they use the fs filesystem.
       * TODO: Implement storage specific indexes (eg in SQLite, MySQL, MSSQL, in-memory)
       */
      get supported() {
        return pfs == null ? void 0 : pfs.hasFileSystem;
      },
      create: (path, key, options = {
        rebuild: false
      }) => {
        const context2 = { storage: this, debug: this.debug, indexes: this._indexes, ipc: this.ipc };
        return createIndex(context2, path, key, options);
      },
      /**
       * Returns indexes at a path, or a specific index on a key in that path
       */
      get: (path, key = null) => {
        if (path.includes("$")) {
          const pathKeys = PathInfo.getPathKeys(path).map((key2) => typeof key2 === "string" && key2.startsWith("$") ? "*" : key2);
          path = new PathInfo(pathKeys).path;
        }
        return this._indexes.filter((index) => index.path === path && (key === null || key === index.key));
      },
      /**
       * Returns all indexes on a target path, optionally includes indexes on child and parent paths
       */
      getAll: (targetPath, options = { parentPaths: true, childPaths: true }) => {
        const pathKeys = PathInfo.getPathKeys(targetPath);
        return this._indexes.filter((index) => {
          const indexKeys = PathInfo.getPathKeys(index.path + "/*");
          if (options.parentPaths && indexKeys.every((key, i) => {
            return key === "*" || pathKeys[i] === key;
          }) && [index.key].concat(...index.includeKeys).includes(pathKeys[indexKeys.length])) {
            return true;
          } else if (indexKeys.length < pathKeys.length) {
            return false;
          } else if (!options.childPaths && indexKeys.length !== pathKeys.length) {
            return false;
          }
          return pathKeys.every((key, i) => {
            return [key, "*"].includes(indexKeys[i]);
          });
        });
      },
      /**
       * Returns all indexes
       */
      list: () => {
        return this._indexes.slice();
      },
      /**
       * Discovers and populates all created indexes
       */
      load: async () => {
        this._indexes.splice(0);
        if (!pfs.hasFileSystem) {
          return;
        }
        let files = [];
        try {
          files = await pfs.readdir(`${this.settings.path}/${this.name}.acebase`);
        } catch (err) {
          if (err.code !== "ENOENT") {
            this.debug.error(err);
          }
        }
        const promises = [];
        files.forEach((fileName) => {
          if (!fileName.endsWith(".idx")) {
            return;
          }
          const needsStoragePrefix = this.settings.type !== "data";
          const hasStoragePrefix = /^\[[a-z]+\]-/.test(fileName);
          if (!needsStoragePrefix && !hasStoragePrefix || needsStoragePrefix && fileName.startsWith(`[${this.settings.type}]-`)) {
            const p = this.indexes.add(fileName);
            promises.push(p);
          }
        });
        await Promise.all(promises);
      },
      add: async (fileName) => {
        try {
          const index = await DataIndex.readFromFile(this, fileName);
          this._indexes.push(index);
          return index;
        } catch (err) {
          this.debug.error(err);
          return null;
        }
      },
      /**
       * Deletes an index from the database
       */
      delete: async (fileName) => {
        const index = await this.indexes.remove(fileName);
        await index.delete();
        this.ipc.sendNotification({ type: "index.deleted", fileName: index.fileName, path: index.path, keys: index.key });
      },
      /**
       * Removes an index from the list. Does not delete the actual file, `delete` does that!
       * @returns returns the removed index
       */
      remove: async (fileName) => {
        const index = this._indexes.find((index2) => index2.fileName === fileName);
        if (!index) {
          throw new Error(`Index ${fileName} not found`);
        }
        this._indexes.splice(this._indexes.indexOf(index), 1);
        return index;
      },
      close: async () => {
        const promises = this.indexes.list().map((index) => index.close().catch((err) => this.debug.error(err)));
        await Promise.all(promises);
      }
    };
    this._eventSubscriptions = {};
    this.subscriptions = {
      /**
       * Adds a subscription to a node
       * @param path Path to the node to add subscription to
       * @param type Type of the subscription
       * @param callback Subscription callback function
       */
      add: (path, type, callback) => {
        if (SUPPORTED_EVENTS.indexOf(type) < 0) {
          throw new TypeError(`Invalid event type "${type}"`);
        }
        let pathSubs = this._eventSubscriptions[path];
        if (!pathSubs) {
          pathSubs = this._eventSubscriptions[path] = [];
        }
        pathSubs.push({ created: Date.now(), type, callback });
        this.emit("subscribe", { path, event: type, callback });
      },
      /**
       * Removes 1 or more subscriptions from a node
       * @param path Path to the node to remove the subscription from
       * @param type Type of subscription(s) to remove (optional: if omitted all types will be removed)
       * @param callback Callback to remove (optional: if omitted all of the same type will be removed)
       */
      remove: (path, type, callback) => {
        const pathSubs = this._eventSubscriptions[path];
        if (!pathSubs) {
          return;
        }
        const next = () => pathSubs.findIndex((ps) => (type ? ps.type === type : true) && (callback ? ps.callback === callback : true));
        let i;
        while ((i = next()) >= 0) {
          pathSubs.splice(i, 1);
        }
        this.emit("unsubscribe", { path, event: type, callback });
      },
      /**
       * Checks if there are any subscribers at given path that need the node's previous value when a change is triggered
       * @param path
       */
      hasValueSubscribersForPath(path) {
        const valueNeeded = this.getValueSubscribersForPath(path);
        return !!valueNeeded;
      },
      /**
       * Gets all subscribers at given path that need the node's previous value when a change is triggered
       * @param path
       */
      getValueSubscribersForPath: (path) => {
        const pathInfo = new PathInfo(path);
        const valueSubscribers = [];
        Object.keys(this._eventSubscriptions).forEach((subscriptionPath) => {
          if (pathInfo.equals(subscriptionPath) || pathInfo.isDescendantOf(subscriptionPath)) {
            const pathSubs = this._eventSubscriptions[subscriptionPath];
            const eventPath = PathInfo.fillVariables(subscriptionPath, path);
            pathSubs.filter((sub) => !sub.type.startsWith("notify_")).forEach((sub) => {
              let dataPath = null;
              if (sub.type === "value") {
                dataPath = eventPath;
              } else if (["mutated", "mutations"].includes(sub.type) && pathInfo.isDescendantOf(eventPath)) {
                dataPath = path;
              } else if (sub.type === "child_changed" && path !== eventPath) {
                const childKey = PathInfo.getPathKeys(path.slice(eventPath.length).replace(/^\//, ""))[0];
                dataPath = PathInfo.getChildPath(eventPath, childKey);
              } else if (["child_added", "child_removed"].includes(sub.type) && pathInfo.isChildOf(eventPath)) {
                const childKey = PathInfo.getPathKeys(path.slice(eventPath.length).replace(/^\//, ""))[0];
                dataPath = PathInfo.getChildPath(eventPath, childKey);
              }
              if (dataPath !== null && !valueSubscribers.some((s2) => s2.type === sub.type && s2.eventPath === eventPath)) {
                valueSubscribers.push({ type: sub.type, eventPath, dataPath, subscriptionPath });
              }
            });
          }
        });
        return valueSubscribers;
      },
      /**
       * Gets all subscribers at given path that could possibly be invoked after a node is updated
       */
      getAllSubscribersForPath: (path) => {
        const pathInfo = PathInfo.get(path);
        const subscribers = [];
        Object.keys(this._eventSubscriptions).forEach((subscriptionPath) => {
          if (pathInfo.isOnTrailOf(subscriptionPath)) {
            const pathSubs = this._eventSubscriptions[subscriptionPath];
            const eventPath = PathInfo.fillVariables(subscriptionPath, path);
            pathSubs.forEach((sub) => {
              let dataPath = null;
              if (sub.type === "value" || sub.type === "notify_value") {
                dataPath = eventPath;
              } else if (["child_changed", "notify_child_changed"].includes(sub.type)) {
                const childKey = path === eventPath || pathInfo.isAncestorOf(eventPath) ? "*" : PathInfo.getPathKeys(path.slice(eventPath.length).replace(/^\//, ""))[0];
                dataPath = PathInfo.getChildPath(eventPath, childKey);
              } else if (["mutated", "mutations", "notify_mutated", "notify_mutations"].includes(sub.type)) {
                dataPath = path;
              } else if (["child_added", "child_removed", "notify_child_added", "notify_child_removed"].includes(sub.type) && (pathInfo.isChildOf(eventPath) || path === eventPath || pathInfo.isAncestorOf(eventPath))) {
                const childKey = path === eventPath || pathInfo.isAncestorOf(eventPath) ? "*" : PathInfo.getPathKeys(path.slice(eventPath.length).replace(/^\//, ""))[0];
                dataPath = PathInfo.getChildPath(eventPath, childKey);
              }
              if (dataPath !== null && !subscribers.some((s2) => s2.type === sub.type && s2.eventPath === eventPath && s2.subscriptionPath === subscriptionPath)) {
                subscribers.push({ type: sub.type, eventPath, dataPath, subscriptionPath });
              }
            });
          }
        });
        return subscribers;
      },
      /**
       * Triggers subscription events to run on relevant nodes
       * @param event Event type: "value", "child_added", "child_changed", "child_removed"
       * @param path Path to the node the subscription is on
       * @param dataPath path to the node the value is stored
       * @param oldValue old value
       * @param newValue new value
       * @param context context used by the client that updated this data
       */
      trigger: (event, path, dataPath, oldValue, newValue, context2) => {
        const pathSubscriptions = this._eventSubscriptions[path] || [];
        pathSubscriptions.filter((sub) => sub.type === event).forEach((sub) => {
          sub.callback(null, dataPath, newValue, oldValue, context2);
        });
      }
    };
    this.debug = new DebugLogger(env2.logLevel, `[${name}${typeof settings.type === "string" && settings.type !== "data" ? `:${settings.type}` : ""}]`);
    const ipcName = name + (typeof settings.type === "string" ? `_${settings.type}` : "");
    if (settings.ipc) {
      if (typeof settings.ipc.port !== "number") {
        throw new Error("IPC port number must be a number");
      }
      if (!["master", "worker"].includes(settings.ipc.role)) {
        throw new Error(`IPC client role must be either "master" or "worker", not "${settings.ipc.role}"`);
      }
      const ipcSettings = Object.assign({ dbname: ipcName }, settings.ipc);
      this.ipc = new RemoteIPCPeer(this, ipcSettings);
    } else {
      this.ipc = new IPCPeer(this, ipcName);
    }
    this.ipc.once("exit", (code) => {
      if (this.indexes.supported) {
        this.indexes.close();
      }
    });
    this.nodeLocker = {
      lock: (path, tid, write, comment) => {
        return this.ipc.lock({ path, tid, write, comment });
      }
    };
    this._lastTid = 0;
  }
  // end of constructor
  createTid() {
    return ID.generate();
  }
  async close() {
    await this.ipc.exit();
  }
  get path() {
    return `${this.settings.path}/${this.name}.acebase`;
  }
  /**
   * Checks if a value can be stored in a parent object, or if it should
   * move to a dedicated record. Uses settings.maxInlineValueSize
   * @param value
   */
  valueFitsInline(value) {
    if (typeof value === "number" || typeof value === "boolean" || value instanceof Date) {
      return true;
    } else if (typeof value === "string") {
      if (value.length > this.settings.maxInlineValueSize) {
        return false;
      }
      const encoded = encodeString(value);
      return encoded.length < this.settings.maxInlineValueSize;
    } else if (value instanceof PathReference) {
      if (value.path.length > this.settings.maxInlineValueSize) {
        return false;
      }
      const encoded = encodeString(value.path);
      return encoded.length < this.settings.maxInlineValueSize;
    } else if (value instanceof ArrayBuffer) {
      return value.byteLength < this.settings.maxInlineValueSize;
    } else if (value instanceof Array) {
      return value.length === 0;
    } else if (typeof value === "object") {
      return Object.keys(value).length === 0;
    } else {
      throw new TypeError("What else is there?");
    }
  }
  /**
   * Creates or updates a node in its own record. DOES NOT CHECK if path exists in parent node, or if parent paths exist! Calling code needs to do this
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _writeNode(path, value, options) {
    throw new Error("This method must be implemented by subclass");
  }
  getUpdateImpact(path, suppressEvents) {
    let topEventPath = path;
    let hasValueSubscribers = false;
    const eventSubscriptions = suppressEvents ? [] : this.subscriptions.getAllSubscribersForPath(path);
    const valueSubscribers = suppressEvents ? [] : this.subscriptions.getValueSubscribersForPath(path);
    if (valueSubscribers.length > 0) {
      hasValueSubscribers = true;
      const eventPaths = valueSubscribers.map((sub) => {
        return { path: sub.dataPath, keys: PathInfo.getPathKeys(sub.dataPath) };
      }).sort((a, b) => {
        if (a.keys.length < b.keys.length) {
          return -1;
        } else if (a.keys.length > b.keys.length) {
          return 1;
        }
        return 0;
      });
      const first = eventPaths[0];
      topEventPath = first.path;
      if (valueSubscribers.filter((sub) => sub.dataPath === topEventPath).every((sub) => sub.type === "mutated" || sub.type.startsWith("notify_"))) {
        hasValueSubscribers = false;
      }
      topEventPath = PathInfo.fillVariables(topEventPath, path);
    }
    const indexes = this.indexes.getAll(path, { childPaths: true, parentPaths: true }).map((index) => ({ index, keys: PathInfo.getPathKeys(index.path) })).sort((a, b) => {
      if (a.keys.length < b.keys.length) {
        return -1;
      } else if (a.keys.length > b.keys.length) {
        return 1;
      }
      return 0;
    }).map((obj) => obj.index);
    const keysFilter = [];
    if (indexes.length > 0) {
      indexes.sort((a, b) => {
        if (typeof a._pathKeys === "undefined") {
          a._pathKeys = PathInfo.getPathKeys(a.path);
        }
        if (typeof b._pathKeys === "undefined") {
          b._pathKeys = PathInfo.getPathKeys(b.path);
        }
        if (a._pathKeys.length < b._pathKeys.length) {
          return -1;
        } else if (a._pathKeys.length > b._pathKeys.length) {
          return 1;
        }
        return 0;
      });
      const topIndex = indexes[0];
      const topIndexPath = topIndex.path === path ? path : PathInfo.fillVariables(`${topIndex.path}/*`, path);
      if (topIndexPath.length < topEventPath.length) {
        topEventPath = topIndexPath;
        indexes.filter((index) => index.path === topIndex.path).forEach((index) => {
          const keys = [index.key].concat(index.includeKeys);
          keys.forEach((key) => !keysFilter.includes(key) && keysFilter.push(key));
        });
      }
    }
    return { topEventPath, eventSubscriptions, valueSubscribers, hasValueSubscribers, indexes, keysFilter };
  }
  /**
   * Wrapper for _writeNode, handles triggering change events, index updating.
   * @returns Returns a promise that resolves with an object that contains storage specific details,
   * plus the applied mutations if transaction logging is enabled
   */
  async _writeNodeWithTracking(path, value, options = {
    merge: false,
    waitForIndexUpdates: true,
    suppress_events: false,
    context: null,
    impact: null
  }) {
    options = options || {};
    if (!options.tid && !options.transaction) {
      throw new Error("_writeNodeWithTracking MUST be executed with a tid OR transaction!");
    }
    options.merge = options.merge === true;
    const validation = this.validateSchema(path, value, { updates: options.merge });
    if (!validation.ok) {
      throw new SchemaValidationError(validation.reason);
    }
    const tid = options.tid;
    const transaction = options.transaction;
    let topEventData = null;
    const updateImpact = options.impact ? options.impact : this.getUpdateImpact(path, options.suppress_events);
    const { topEventPath, eventSubscriptions, hasValueSubscribers, indexes } = updateImpact;
    let { keysFilter } = updateImpact;
    const writeNode = () => {
      if (typeof options._customWriteFunction === "function") {
        return options._customWriteFunction();
      }
      if (topEventData) {
        const pathKeys = PathInfo.getPathKeys(path);
        const eventPathKeys = PathInfo.getPathKeys(topEventPath);
        const trailKeys = pathKeys.slice(eventPathKeys.length);
        let currentValue2 = topEventData;
        while (trailKeys.length > 0 && currentValue2 !== null) {
          const childKey = trailKeys.shift();
          currentValue2 = typeof currentValue2 === "object" && childKey in currentValue2 ? currentValue2[childKey] : null;
        }
        options.currentValue = currentValue2;
      }
      return this._writeNode(path, value, options);
    };
    const transactionLoggingEnabled = this.settings.transactions && this.settings.transactions.log === true;
    if (eventSubscriptions.length === 0 && indexes.length === 0 && !transactionLoggingEnabled) {
      return writeNode();
    }
    if (!hasValueSubscribers && options.merge === true && keysFilter.length === 0) {
      keysFilter = Object.keys(value);
      if (topEventPath !== path) {
        const trailPath = path.slice(topEventPath.length);
        keysFilter = keysFilter.map((key) => `${trailPath}/${key}`);
      }
    }
    const eventNodeInfo = await this.getNodeInfo(topEventPath, { transaction, tid });
    let currentValue = null;
    if (eventNodeInfo.exists) {
      const valueOptions = { transaction, tid };
      if (keysFilter.length > 0) {
        valueOptions.include = keysFilter;
      }
      if (topEventPath === "" && typeof valueOptions.include === "undefined") {
        this.debug.warn('WARNING: One or more value event listeners on the root node are causing the entire database value to be read to facilitate change tracking. Using "value", "notify_value", "child_changed" and "notify_child_changed" events on the root node are a bad practice because of the significant performance impact. Use "mutated" or "mutations" events instead');
      }
      const node = await this.getNode(topEventPath, valueOptions);
      currentValue = node.value;
    }
    topEventData = currentValue;
    const result = await writeNode() || {};
    let newTopEventData, modifiedData;
    if (path === topEventPath) {
      if (options.merge) {
        if (topEventData === null) {
          newTopEventData = value instanceof Array ? [] : {};
        } else {
          newTopEventData = topEventData instanceof Array ? [] : {};
          Object.keys(topEventData).forEach((key) => {
            newTopEventData[key] = topEventData[key];
          });
        }
      } else {
        newTopEventData = value;
      }
      modifiedData = newTopEventData;
    } else {
      const trailPath = path.slice(topEventPath.length).replace(/^\//, "");
      const trailKeys = PathInfo.getPathKeys(trailPath);
      if (topEventData === null) {
        newTopEventData = typeof trailKeys[0] === "number" ? [] : {};
      } else {
        newTopEventData = topEventData instanceof Array ? [] : {};
        Object.keys(topEventData).forEach((key) => {
          newTopEventData[key] = topEventData[key];
        });
      }
      modifiedData = newTopEventData;
      while (trailKeys.length > 0) {
        const childKey = trailKeys.shift();
        if (!options.merge && trailKeys.length === 0) {
          modifiedData[childKey] = value;
        } else {
          const original = modifiedData[childKey];
          const shallowCopy = typeof childKey === "number" ? [...original] : { ...original };
          modifiedData[childKey] = shallowCopy;
        }
        modifiedData = modifiedData[childKey];
      }
    }
    if (options.merge) {
      Object.keys(value).forEach((key) => {
        modifiedData[key] = value[key];
      });
    }
    const dataChanges = compareValues$1(topEventData, newTopEventData);
    if (dataChanges === "identical") {
      result.mutations = [];
      return result;
    }
    function removeNulls(obj) {
      if (obj === null || typeof obj !== "object") {
        return obj;
      }
      Object.keys(obj).forEach((prop) => {
        const val = obj[prop];
        if (val === null) {
          delete obj[prop];
          if (obj instanceof Array) {
            obj.length--;
          }
        }
        if (typeof val === "object") {
          removeNulls(val);
        }
      });
    }
    removeNulls(newTopEventData);
    const indexUpdates = [];
    indexes.map((index) => ({ index, keys: PathInfo.getPathKeys(index.path) })).sort((a, b) => {
      if (a.keys.length < b.keys.length) {
        return 1;
      } else if (a.keys.length > b.keys.length) {
        return -1;
      }
      return 0;
    }).forEach(({ index }) => {
      const pathKeys = PathInfo.getPathKeys(topEventPath);
      const indexPathKeys = PathInfo.getPathKeys(index.path + "/*");
      const trailKeys = indexPathKeys.slice(pathKeys.length);
      const oldValue = topEventData;
      const newValue = newTopEventData;
      if (trailKeys.length === 0) {
        assert(pathKeys.length === indexPathKeys.length, "check logic");
        const p = this.ipc.isMaster ? index.handleRecordUpdate(topEventPath, oldValue, newValue) : this.ipc.sendRequest({ type: "index.update", path: topEventPath, oldValue, newValue });
        indexUpdates.push(p);
        return;
      }
      const getAllIndexUpdates = (path2, oldValue2, newValue2) => {
        if (oldValue2 === null && newValue2 === null) {
          return [];
        }
        const pathKeys2 = PathInfo.getPathKeys(path2);
        const indexPathKeys2 = PathInfo.getPathKeys(index.path + "/*");
        const trailKeys2 = indexPathKeys2.slice(pathKeys2.length);
        if (trailKeys2.length === 0) {
          assert(pathKeys2.length === indexPathKeys2.length, "check logic");
          return [{ path: path2, oldValue: oldValue2, newValue: newValue2 }];
        }
        let results2 = [];
        let trailPath = "";
        while (trailKeys2.length > 0) {
          const subKey = trailKeys2.shift();
          if (typeof subKey === "string" && (subKey === "*" || subKey.startsWith("$"))) {
            const allKeys = oldValue2 === null ? [] : Object.keys(oldValue2);
            newValue2 !== null && Object.keys(newValue2).forEach((key) => {
              if (allKeys.indexOf(key) < 0) {
                allKeys.push(key);
              }
            });
            allKeys.forEach((key) => {
              const childPath = PathInfo.getChildPath(trailPath, key);
              const childValues = getChildValues(key, oldValue2, newValue2);
              const subTrailPath = PathInfo.getChildPath(path2, childPath);
              const childResults = getAllIndexUpdates(subTrailPath, childValues.oldValue, childValues.newValue);
              results2 = results2.concat(childResults);
            });
            break;
          } else {
            const values = getChildValues(subKey, oldValue2, newValue2);
            oldValue2 = values.oldValue;
            newValue2 = values.newValue;
            if (oldValue2 === null && newValue2 === null) {
              break;
            }
            trailPath = PathInfo.getChildPath(trailPath, subKey);
          }
        }
        return results2;
      };
      const results = getAllIndexUpdates(topEventPath, oldValue, newValue);
      results.forEach((result2) => {
        const p = this.ipc.isMaster ? index.handleRecordUpdate(result2.path, result2.oldValue, result2.newValue) : this.ipc.sendRequest({ type: "index.update", path: result2.path, oldValue: result2.oldValue, newValue: result2.newValue });
        indexUpdates.push(p);
      });
    });
    const callSubscriberWithValues = (sub, oldValue, newValue, variables = []) => {
      let trigger = true;
      let type = sub.type;
      if (type.startsWith("notify_")) {
        type = type.slice("notify_".length);
      }
      if (type === "mutated") {
        return;
      } else if (type === "child_changed" && (oldValue === null || newValue === null)) {
        trigger = false;
      } else if (type === "value" || type === "child_changed") {
        const changes = compareValues$1(oldValue, newValue);
        trigger = changes !== "identical";
      } else if (type === "child_added") {
        trigger = oldValue === null && newValue !== null;
      } else if (type === "child_removed") {
        trigger = oldValue !== null && newValue === null;
      }
      const pathKeys = PathInfo.getPathKeys(sub.dataPath);
      variables.forEach((variable) => {
        const index = pathKeys.indexOf(variable.name);
        assert(index >= 0, `Variable "${variable.name}" not found in subscription dataPath "${sub.dataPath}"`);
        pathKeys[index] = variable.value;
      });
      const dataPath = pathKeys.reduce((path2, key) => PathInfo.getChildPath(path2, key), "");
      trigger && this.subscriptions.trigger(sub.type, sub.subscriptionPath, dataPath, oldValue, newValue, options.context);
    };
    const prepareMutationEvents = (currentPath, oldValue, newValue, compareResult) => {
      const batch = [];
      const result2 = compareResult || compareValues$1(oldValue, newValue);
      if (result2 === "identical") {
        return batch;
      } else if (typeof result2 === "string") {
        batch.push({ path: currentPath, oldValue, newValue });
      } else {
        result2.changed.forEach((info) => {
          const childPath = PathInfo.getChildPath(currentPath, info.key);
          const childValues = getChildValues(info.key, oldValue, newValue);
          const childBatch = prepareMutationEvents(childPath, childValues.oldValue, childValues.newValue, info.change);
          batch.push(...childBatch);
        });
        result2.added.forEach((key) => {
          const childPath = PathInfo.getChildPath(currentPath, key);
          batch.push({ path: childPath, oldValue: null, newValue: newValue[key] });
        });
        if (oldValue instanceof Array && newValue instanceof Array) {
          result2.removed.sort((a, b) => a < b ? 1 : -1);
        }
        result2.removed.forEach((key) => {
          const childPath = PathInfo.getChildPath(currentPath, key);
          batch.push({ path: childPath, oldValue: oldValue[key], newValue: null });
        });
      }
      return batch;
    };
    if (transactionLoggingEnabled && this.settings.type !== "transaction") {
      result.mutations = (() => {
        const trailPath = path.slice(topEventPath.length).replace(/^\//, "");
        const trailKeys = PathInfo.getPathKeys(trailPath);
        let oldValue = topEventData, newValue = newTopEventData;
        while (trailKeys.length > 0) {
          const key = trailKeys.shift();
          ({ oldValue, newValue } = getChildValues(key, oldValue, newValue));
        }
        const compareResults = compareValues$1(oldValue, newValue);
        const batch = prepareMutationEvents(path, oldValue, newValue, compareResults);
        const mutations = batch.map((m2) => ({ target: PathInfo.getPathKeys(m2.path.slice(path.length)), prev: m2.oldValue, val: m2.newValue }));
        return mutations;
      })();
    }
    const triggerAllEvents = () => {
      eventSubscriptions.filter((sub) => !["mutated", "mutations", "notify_mutated", "notify_mutations"].includes(sub.type)).map((sub) => {
        const keys = PathInfo.getPathKeys(sub.dataPath);
        return {
          sub,
          keys
        };
      }).sort((a, b) => {
        if (a.keys.length < b.keys.length) {
          return 1;
        } else if (a.keys.length > b.keys.length) {
          return -1;
        }
        return 0;
      }).forEach(({ sub }) => {
        const process2 = (currentPath, oldValue, newValue, variables = []) => {
          const trailPath = sub.dataPath.slice(currentPath.length).replace(/^\//, "");
          const trailKeys = PathInfo.getPathKeys(trailPath);
          while (trailKeys.length > 0) {
            const subKey = trailKeys.shift();
            if (typeof subKey === "string" && (subKey === "*" || subKey[0] === "$")) {
              const allKeys = oldValue === null ? [] : Object.keys(oldValue).map((key) => oldValue instanceof Array ? parseInt(key) : key);
              newValue !== null && Object.keys(newValue).forEach((key) => {
                const keyOrIndex = newValue instanceof Array ? parseInt(key) : key;
                !allKeys.includes(keyOrIndex) && allKeys.push(key);
              });
              allKeys.forEach((key) => {
                const childValues = getChildValues(key, oldValue, newValue);
                const vars = variables.concat({ name: subKey, value: key });
                if (trailKeys.length === 0) {
                  callSubscriberWithValues(sub, childValues.oldValue, childValues.newValue, vars);
                } else {
                  process2(PathInfo.getChildPath(currentPath, subKey), childValues.oldValue, childValues.newValue, vars);
                }
              });
              return;
            } else {
              currentPath = PathInfo.getChildPath(currentPath, subKey);
              const childValues = getChildValues(subKey, oldValue, newValue);
              oldValue = childValues.oldValue;
              newValue = childValues.newValue;
            }
          }
          callSubscriberWithValues(sub, oldValue, newValue, variables);
        };
        if (sub.type.startsWith("notify_") && PathInfo.get(sub.eventPath).isAncestorOf(topEventPath)) {
          const isOnParentPath = PathInfo.get(sub.eventPath).isParentOf(topEventPath);
          const trigger = sub.type === "notify_value" || sub.type === "notify_child_changed" && (!isOnParentPath || !["added", "removed"].includes(dataChanges)) || sub.type === "notify_child_removed" && dataChanges === "removed" && isOnParentPath || sub.type === "notify_child_added" && dataChanges === "added" && isOnParentPath;
          trigger && this.subscriptions.trigger(sub.type, sub.subscriptionPath, sub.dataPath, null, null, options.context);
        } else {
          process2(topEventPath, topEventData, newTopEventData);
        }
      });
      const mutationEvents = eventSubscriptions.filter((sub) => ["mutated", "mutations", "notify_mutated", "notify_mutations"].includes(sub.type));
      mutationEvents.forEach((sub) => {
        let currentPath = topEventPath;
        const trailPath = sub.eventPath.slice(currentPath.length).replace(/^\//, "");
        const trailKeys = PathInfo.getPathKeys(trailPath);
        let oldValue = topEventData, newValue = newTopEventData;
        while (trailKeys.length > 0) {
          const subKey = trailKeys.shift();
          currentPath = PathInfo.getChildPath(currentPath, subKey);
          const childValues = getChildValues(subKey, oldValue, newValue);
          oldValue = childValues.oldValue;
          newValue = childValues.newValue;
        }
        const batch = prepareMutationEvents(currentPath, oldValue, newValue);
        if (batch.length === 0) {
          return;
        }
        const isNotifyEvent = sub.type.startsWith("notify_");
        if (["mutated", "notify_mutated"].includes(sub.type)) {
          batch.forEach((mutation, index) => {
            const context2 = options.context;
            const prevVal = isNotifyEvent ? null : mutation.oldValue;
            const newVal = isNotifyEvent ? null : mutation.newValue;
            this.subscriptions.trigger(sub.type, sub.subscriptionPath, mutation.path, prevVal, newVal, context2);
          });
        } else if (["mutations", "notify_mutations"].includes(sub.type)) {
          const values = isNotifyEvent ? null : batch.map((m2) => ({ target: PathInfo.getPathKeys(m2.path.slice(sub.subscriptionPath.length)), prev: m2.oldValue, val: m2.newValue }));
          this.subscriptions.trigger(sub.type, sub.subscriptionPath, sub.subscriptionPath, null, values, options.context);
        }
      });
    };
    if (options.waitForIndexUpdates === false) {
      indexUpdates.splice(0);
    }
    await Promise.all(indexUpdates);
    defer(triggerAllEvents);
    return result;
  }
  /**
   * Enumerates all children of a given Node for reflection purposes
   * @param path
   * @param options optional options used by implementation for recursive calls
   * @returns returns a generator object that calls .next for each child until the .next callback returns false
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getChildren(path, options) {
    throw new Error("This method must be implemented by subclass");
  }
  /**
   * @deprecated Use `getNode` instead
   * Gets a node's value by delegating to getNode, returning only the value
   * @param path
   * @param options optional options that can limit the amount of (sub)data being loaded, and any other implementation specific options for recusrsive calls
   */
  async getNodeValue(path, options = {}) {
    const node = await this.getNode(path, options);
    return node.value;
  }
  /**
   * Gets a node's value and (if supported) revision
   * @param path
   * @param options optional options that can limit the amount of (sub)data being loaded, and any other implementation specific options for recusrsive calls
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getNode(path, options) {
    throw new Error("This method must be implemented by subclass");
  }
  /**
   * Retrieves info about a node (existence, wherabouts etc)
   * @param {string} path
   * @param {object} [options] optional options used by implementation for recursive calls
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getNodeInfo(path, options) {
    throw new Error("This method must be implemented by subclass");
  }
  /**
   * Creates or overwrites a node. Delegates to updateNode on a parent if
   * path is not the root.
   * @param path
   * @param value
   * @param options optional options used by implementation for recursive calls
   * @returns Returns a new cursor if transaction logging is enabled
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setNode(path, value, options) {
    throw new Error("This method must be implemented by subclass");
  }
  /**
   * Updates a node by merging an existing node with passed updates object,
   * or creates it by delegating to updateNode on the parent path.
   * @param path
   * @param updates object with key/value pairs
   * @returns Returns a new cursor if transaction logging is enabled
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateNode(path, updates, options) {
    throw new Error("This method must be implemented by subclass");
  }
  /**
   * Updates a node by getting its value, running a callback function that transforms
   * the current value and returns the new value to be stored. Assures the read value
   * does not change while the callback runs, or runs the callback again if it did.
   * @param path
   * @param callback function that transforms current value and returns the new value to be stored. Can return a Promise
   * @param options optional options used by implementation for recursive calls
   * @returns Returns a new cursor if transaction logging is enabled
   */
  async transactNode(path, callback, options = { no_lock: false, suppress_events: false, context: null }) {
    const useFakeLock = options && options.no_lock === true;
    const tid = this.createTid();
    const lock = useFakeLock ? { tid, release: NOOP } : await this.nodeLocker.lock(path, tid, true, "transactNode");
    try {
      let changed = false;
      const changeCallback = () => {
        changed = true;
      };
      if (useFakeLock) {
        this.subscriptions.add(path, "notify_value", changeCallback);
      }
      const node = await this.getNode(path, { tid });
      const checkRevision = node.revision;
      let newValue;
      try {
        newValue = callback(node.value);
        if (newValue instanceof Promise) {
          newValue = await newValue.catch((err) => {
            this.debug.error(`Error in transaction callback: ${err.message}`);
          });
        }
      } catch (err) {
        this.debug.error(`Error in transaction callback: ${err.message}`);
      }
      if (typeof newValue === "undefined") {
        return;
      }
      if (useFakeLock) {
        this.subscriptions.remove(path, "notify_value", changeCallback);
      }
      if (changed) {
        throw new NodeRevisionError("Node changed");
      }
      const cursor = await this.setNode(path, newValue, { assert_revision: checkRevision, tid: lock.tid, suppress_events: options.suppress_events, context: options.context });
      return cursor;
    } catch (err) {
      if (err instanceof NodeRevisionError) {
        console.warn(`node value changed, running again. Error: ${err.message}`);
        return this.transactNode(path, callback, options);
      } else {
        throw err;
      }
    } finally {
      lock.release();
    }
  }
  /**
   * Checks if a node's value matches the passed criteria
   * @param path
   * @param criteria criteria to test
   * @param options optional options used by implementation for recursive calls
   * @returns returns a promise that resolves with a boolean indicating if it matched the criteria
   */
  async matchNode(path, criteria, options) {
    const tid = (options == null ? void 0 : options.tid) ?? ID.generate();
    const checkNode = async (path2, criteria2) => {
      if (criteria2.length === 0) {
        return Promise.resolve(true);
      }
      const criteriaKeys = criteria2.reduce((keys, cr) => {
        let key = cr.key;
        if (typeof key === "string" && key.includes("/")) {
          key = key.slice(0, key.indexOf("/"));
        }
        if (keys.indexOf(key) < 0) {
          keys.push(key);
        }
        return keys;
      }, []);
      const unseenKeys = criteriaKeys.slice();
      let isMatch = true;
      const delayedMatchPromises = [];
      try {
        await this.getChildren(path2, { tid, keyFilter: criteriaKeys }).next((childInfo) => {
          const keyOrIndex = childInfo.key ?? childInfo.index;
          unseenKeys.includes(keyOrIndex) && unseenKeys.splice(unseenKeys.indexOf(childInfo.key), 1);
          const keyCriteria = criteria2.filter((cr) => cr.key === keyOrIndex).map((cr) => ({ op: cr.op, compare: cr.compare }));
          const keyResult = keyCriteria.length > 0 ? checkChild(childInfo, keyCriteria) : { isMatch: true, promises: [] };
          isMatch = keyResult.isMatch;
          if (isMatch) {
            delayedMatchPromises.push(...keyResult.promises);
            const childCriteria = criteria2.filter((cr) => typeof cr.key === "string" && cr.key.startsWith(`${typeof keyOrIndex === "number" ? `[${keyOrIndex}]` : keyOrIndex}/`)).map((cr) => {
              const key = cr.key.slice(cr.key.indexOf("/") + 1);
              return { key, op: cr.op, compare: cr.compare };
            });
            if (childCriteria.length > 0) {
              const childPath = PathInfo.getChildPath(path2, childInfo.key);
              const childPromise = checkNode(childPath, childCriteria).then((isMatch2) => ({ isMatch: isMatch2 }));
              delayedMatchPromises.push(childPromise);
            }
          }
          if (!isMatch || unseenKeys.length === 0) {
            return false;
          }
        });
        if (isMatch) {
          const results = await Promise.all(delayedMatchPromises);
          isMatch = results.every((res) => res.isMatch);
        }
        if (!isMatch) {
          return false;
        }
        isMatch = unseenKeys.every((keyOrIndex) => {
          const childInfo = new NodeInfo({
            ...typeof keyOrIndex === "number" && { index: keyOrIndex },
            ...typeof keyOrIndex === "string" && { key: keyOrIndex },
            exists: false
          });
          const childCriteria = criteria2.filter((cr) => typeof cr.key === "string" && cr.key.startsWith(`${typeof keyOrIndex === "number" ? `[${keyOrIndex}]` : keyOrIndex}/`)).map((cr) => ({ op: cr.op, compare: cr.compare }));
          if (childCriteria.length > 0 && !checkChild(childInfo, childCriteria).isMatch) {
            return false;
          }
          const keyCriteria = criteria2.filter((cr) => cr.key === keyOrIndex).map((cr) => ({ op: cr.op, compare: cr.compare }));
          if (keyCriteria.length === 0) {
            return true;
          }
          const result = checkChild(childInfo, keyCriteria);
          return result.isMatch;
        });
        return isMatch;
      } catch (err) {
        this.debug.error(`Error matching on "${path2}": `, err);
        throw err;
      }
    };
    const checkChild = (child, criteria2) => {
      const promises = [];
      const isMatch = criteria2.every((f) => {
        let proceed = true;
        if (f.op === "!exists" || f.op === "==" && (typeof f.compare === "undefined" || f.compare === null)) {
          proceed = !child.exists;
        } else if (f.op === "exists" || f.op === "!=" && (typeof f.compare === "undefined" || f.compare === null)) {
          proceed = child.exists;
        } else if ((f.op === "contains" || f.op === "!contains") && f.compare instanceof Array && f.compare.length === 0) {
          proceed = true;
        } else if (!child.exists) {
          proceed = false;
        } else {
          if (child.address) {
            if (child.valueType === VALUE_TYPES.OBJECT && ["has", "!has"].indexOf(f.op) >= 0) {
              const op = f.op === "has" ? "exists" : "!exists";
              const p = checkNode(child.path, [{ key: f.compare, op }]).then((isMatch2) => {
                return { key: child.key, isMatch: isMatch2 };
              });
              promises.push(p);
              proceed = true;
            } else if (child.valueType === VALUE_TYPES.ARRAY && ["contains", "!contains"].indexOf(f.op) >= 0) {
              const p = this.getNode(child.path, { tid }).then(({ value: arr }) => {
                const isMatch2 = f.op === "contains" ? f.compare instanceof Array ? f.compare.every((val) => arr.includes(val)) : arr.includes(f.compare) : f.compare instanceof Array ? !f.compare.some((val) => arr.includes(val)) : !arr.includes(f.compare);
                return { key: child.key, isMatch: isMatch2 };
              });
              promises.push(p);
              proceed = true;
            } else if (child.valueType === VALUE_TYPES.STRING) {
              const p = this.getNode(child.path, { tid }).then((node) => {
                return { key: child.key, isMatch: this.test(node.value, f.op, f.compare) };
              });
              promises.push(p);
              proceed = true;
            } else {
              proceed = false;
            }
          } else if (child.type === VALUE_TYPES.OBJECT && ["has", "!has"].indexOf(f.op) >= 0) {
            const has = f.compare in child.value;
            proceed = has && f.op === "has" || !has && f.op === "!has";
          } else if (child.type === VALUE_TYPES.ARRAY && ["contains", "!contains"].indexOf(f.op) >= 0) {
            const contains = child.value.indexOf(f.compare) >= 0;
            proceed = contains && f.op === "contains" || !contains && f.op === "!contains";
          } else {
            let ret = this.test(child.value, f.op, f.compare);
            if (ret instanceof Promise) {
              promises.push(ret);
              ret = true;
            }
            proceed = ret;
          }
        }
        return proceed;
      });
      return { isMatch, promises };
    };
    return checkNode(path, criteria);
  }
  test(val, op, compare) {
    if (op === "<") {
      return val < compare;
    }
    if (op === "<=") {
      return val <= compare;
    }
    if (op === "==") {
      return val === compare;
    }
    if (op === "!=") {
      return val !== compare;
    }
    if (op === ">") {
      return val > compare;
    }
    if (op === ">=") {
      return val >= compare;
    }
    if (op === "in") {
      return compare.indexOf(val) >= 0;
    }
    if (op === "!in") {
      return compare.indexOf(val) < 0;
    }
    if (op === "like" || op === "!like") {
      const pattern = "^" + compare.replace(/[-[\]{}()+.,\\^$|#\s]/g, "\\$&").replace(/\?/g, ".").replace(/\*/g, ".*?") + "$";
      const re = new RegExp(pattern, "i");
      const isMatch = re.test(val.toString());
      return op === "like" ? isMatch : !isMatch;
    }
    if (op === "matches") {
      return compare.test(val.toString());
    }
    if (op === "!matches") {
      return !compare.test(val.toString());
    }
    if (op === "between") {
      return val >= compare[0] && val <= compare[1];
    }
    if (op === "!between") {
      return val < compare[0] || val > compare[1];
    }
    if (op === "has" || op === "!has") {
      const has = typeof val === "object" && compare in val;
      return op === "has" ? has : !has;
    }
    if (op === "contains" || op === "!contains") {
      const includes = typeof val === "object" && val instanceof Array && val.includes(compare);
      return op === "contains" ? includes : !includes;
    }
    return false;
  }
  /**
   * Export a specific path's data to a stream
   * @param path
   * @param write function that writes to a stream, or stream object that has a write method that (optionally) returns a promise the export needs to wait for before continuing
   * @returns returns a promise that resolves once all data is exported
   */
  async exportNode(path, writeFn, options = { format: "json", type_safe: true }) {
    if ((options == null ? void 0 : options.format) !== "json") {
      throw new Error("Only json output is currently supported");
    }
    const write = typeof writeFn !== "function" ? writeFn.write.bind(writeFn) : writeFn;
    const stringifyValue = (type, val) => {
      const escape = (str) => str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(
        /[\u0000-\u001f]/g,
        // other control characters
        // other control characters
        (ch) => `\\u${ch.charCodeAt(0).toString(16).padStart(4, "0")}`
      );
      if (type === VALUE_TYPES.DATETIME) {
        val = `"${val.toISOString()}"`;
        if (options.type_safe) {
          val = `{".type":"date",".val":${val}}`;
        }
      } else if (type === VALUE_TYPES.STRING) {
        val = `"${escape(val)}"`;
      } else if (type === VALUE_TYPES.ARRAY) {
        val = "[]";
      } else if (type === VALUE_TYPES.OBJECT) {
        val = "{}";
      } else if (type === VALUE_TYPES.BINARY) {
        val = `"${escape(ascii85.encode(val))}"`;
        if (options.type_safe) {
          val = `{".type":"binary",".val":${val}}`;
        }
      } else if (type === VALUE_TYPES.REFERENCE) {
        val = `"${val.path}"`;
        if (options.type_safe) {
          val = `{".type":"reference",".val":${val}}`;
        }
      } else if (type === VALUE_TYPES.BIGINT) {
        val = `"${val}"`;
        if (options.type_safe) {
          val = `{".type":"bigint",".val":${val}}`;
        }
      }
      return val;
    };
    let objStart = "", objEnd = "";
    const nodeInfo = await this.getNodeInfo(path);
    if (!nodeInfo.exists) {
      return write("null");
    } else if (nodeInfo.type === VALUE_TYPES.OBJECT) {
      objStart = "{";
      objEnd = "}";
    } else if (nodeInfo.type === VALUE_TYPES.ARRAY) {
      objStart = "[";
      objEnd = "]";
    } else {
      const node = await this.getNode(path);
      const val = stringifyValue(nodeInfo.type, node.value);
      return write(val);
    }
    if (objStart) {
      const p = write(objStart);
      if (p instanceof Promise) {
        await p;
      }
    }
    let output = "", outputCount = 0;
    const pending = [];
    await this.getChildren(path).next((childInfo) => {
      if (childInfo.address) {
        pending.push(childInfo);
      } else {
        if (outputCount++ > 0) {
          output += ",";
        }
        if (typeof childInfo.key === "string") {
          output += `"${childInfo.key}":`;
        }
        output += stringifyValue(childInfo.type, childInfo.value);
      }
    });
    if (output) {
      const p = write(output);
      if (p instanceof Promise) {
        await p;
      }
    }
    while (pending.length > 0) {
      const childInfo = pending.shift();
      let output2 = outputCount++ > 0 ? "," : "";
      const key = typeof childInfo.index === "number" ? childInfo.index : childInfo.key;
      if (typeof key === "string") {
        output2 += `"${key}":`;
      }
      if (output2) {
        const p = write(output2);
        if (p instanceof Promise) {
          await p;
        }
      }
      await this.exportNode(PathInfo.getChildPath(path, key), write, options);
    }
    if (objEnd) {
      const p = write(objEnd);
      if (p instanceof Promise) {
        await p;
      }
    }
  }
  /**
   * Import a specific path's data from a stream
   * @param path
   * @param read read function that streams a new chunk of data
   * @returns returns a promise that resolves once all data is imported
   */
  async importNode(path, read, options = { format: "json", method: "set" }) {
    const chunkSize = 256 * 1024;
    const state = {
      data: "",
      index: 0,
      offset: 0,
      queue: [],
      queueStartByte: 0,
      timesFlushed: 0,
      get processedBytes() {
        return this.offset + this.index;
      }
    };
    const readNextChunk = async (append = false) => {
      let data = await read(chunkSize);
      if (data === null) {
        if (state.data) {
          throw new Error(`Unexpected EOF at index ${state.offset + state.data.length}`);
        } else {
          throw new Error("Unable to read data from stream");
        }
      } else if (typeof data === "object") {
        data = decodeString(data);
      }
      if (append) {
        state.data += data;
      } else {
        state.offset += state.data.length;
        state.data = data;
        state.index = 0;
      }
    };
    const readBytes = async (length) => {
      let str = "";
      if (state.index + length >= state.data.length) {
        str = state.data.slice(state.index);
        length -= str.length;
        await readNextChunk();
      }
      str += state.data.slice(state.index, state.index + length);
      state.index += length;
      return str;
    };
    const assertBytes = async (length) => {
      if (state.index + length > state.data.length) {
        await readNextChunk(true);
      }
      if (state.index + length > state.data.length) {
        throw new Error("Not enough data available from stream");
      }
    };
    const consumeToken = async (token) => {
      const str = await readBytes(token.length);
      if (str !== token) {
        throw new Error(`Unexpected character "${str[0]}" at index ${state.offset + state.index}, expected "${token}"`);
      }
    };
    const consumeSpaces = async () => {
      const spaces = [" ", "	", "\r", "\n"];
      while (true) {
        if (state.index >= state.data.length) {
          await readNextChunk();
        }
        if (spaces.includes(state.data[state.index])) {
          state.index++;
        } else {
          break;
        }
      }
    };
    const peekBytes = async (length) => {
      await assertBytes(length);
      const index = state.index;
      return state.data.slice(index, index + length);
    };
    const peekValueType = async () => {
      await consumeSpaces();
      const ch = await peekBytes(1);
      switch (ch) {
        case '"':
          return "string";
        case "{":
          return "object";
        case "[":
          return "array";
        case "n":
          return "null";
        case "u":
          return "undefined";
        case "t":
        case "f":
          return "boolean";
        default: {
          if (ch === "-" || ch >= "0" && ch <= "9") {
            return "number";
          }
          throw new Error(`Unknown value at index ${state.offset + state.index}`);
        }
      }
    };
    const readString = async () => {
      await consumeToken('"');
      let str = "";
      let i = state.index;
      while (state.data[i] !== '"' || state.data[i - 1] === "\\") {
        i++;
        if (i >= state.data.length) {
          str += state.data.slice(state.index);
          await readNextChunk();
          i = 0;
        }
      }
      str += state.data.slice(state.index, i);
      state.index = i + 1;
      return unescape(str);
    };
    const readBoolean = async () => {
      if (state.data[state.index] === "t") {
        await consumeToken("true");
      } else if (state.data[state.index] === "f") {
        await consumeToken("false");
      }
      throw new Error(`Expected true or false at index ${state.offset + state.index}`);
    };
    const readNumber = async () => {
      let str = "";
      let i = state.index;
      const nrChars = ["-", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "e", "b", "f", "x", "o", "n"];
      while (nrChars.includes(state.data[i])) {
        i++;
        if (i >= state.data.length) {
          str += state.data.slice(state.index);
          await readNextChunk();
          i = 0;
        }
      }
      str += state.data.slice(state.index, i);
      state.index = i;
      const nr = str.endsWith("n") ? BigInt(str.slice(0, -1)) : str.includes(".") ? parseFloat(str) : parseInt(str);
      return nr;
    };
    const readValue = async () => {
      await consumeSpaces();
      const type = await peekValueType();
      const value = await (() => {
        switch (type) {
          case "string":
            return readString();
          case "object":
            return {};
          case "array":
            return [];
          case "number":
            return readNumber();
          case "null":
            return null;
          case "undefined":
            return void 0;
          case "boolean":
            return readBoolean();
        }
      })();
      return { type, value };
    };
    const unescape = (str) => str.replace(/\\n/g, "\n").replace(/\\"/g, '"');
    const getTypeSafeValue = (path2, obj) => {
      const type = obj[".type"];
      let val = obj[".val"];
      switch (type) {
        case "Date":
        case "date": {
          val = new Date(val);
          break;
        }
        case "Buffer":
        case "binary": {
          val = unescape(val);
          if (val.startsWith("<~")) {
            val = ascii85.decode(val);
          } else {
            throw new Error(`Import error: Unexpected encoding for value for value at path "/${path2}"`);
          }
          break;
        }
        case "PathReference":
        case "reference": {
          val = new PathReference(val);
          break;
        }
        case "bigint": {
          val = BigInt(val);
          break;
        }
        default:
          throw new Error(`Import error: Unsupported type "${type}" for value at path "/${path2}"`);
      }
      return val;
    };
    const context2 = { acebase_import_id: ID.generate() };
    const childOptions = { suppress_events: options.suppress_events, context: context2 };
    const importObject = async (target) => {
      await consumeToken("{");
      await consumeSpaces();
      const nextChar = await peekBytes(1);
      if (nextChar === "}") {
        state.index++;
        return this.setNode(target.path, {}, childOptions);
      }
      let childCount = 0;
      let obj = {};
      let flushedBefore = false;
      const flushObject = async () => {
        let p;
        if (!flushedBefore) {
          flushedBefore = true;
          p = this.setNode(target.path, obj, childOptions);
        } else if (Object.keys(obj).length > 0) {
          p = this.updateNode(target.path, obj, childOptions);
        }
        obj = {};
        if (p) {
          await p;
        }
      };
      const promises = [];
      while (true) {
        await consumeSpaces();
        const property = await readString();
        await consumeSpaces();
        await consumeToken(":");
        await consumeSpaces();
        const { value, type } = await readValue();
        obj[property] = value;
        childCount++;
        if (["object", "array"].includes(type)) {
          promises.push(flushObject());
          if (type === "object") {
            await importObject(target.child(property));
          } else {
            await importArray(target.child(property));
          }
        }
        await consumeSpaces();
        const nextChar2 = await peekBytes(1);
        if (nextChar2 === "}") {
          state.index++;
          break;
        }
        await consumeToken(",");
      }
      const isTypedValue = childCount === 2 && ".type" in obj && ".val" in obj;
      if (isTypedValue) {
        const val = getTypeSafeValue(target.path, obj);
        return this.setNode(target.path, val, childOptions);
      }
      promises.push(flushObject());
      await Promise.all(promises);
    };
    const importArray = async (target) => {
      await consumeToken("[");
      await consumeSpaces();
      const nextChar = await peekBytes(1);
      if (nextChar === "]") {
        state.index++;
        return this.setNode(target.path, [], childOptions);
      }
      let flushedBefore = false;
      let arr = [];
      let updates = {};
      const flushArray = async () => {
        let p;
        if (!flushedBefore) {
          flushedBefore = true;
          p = this.setNode(target.path, arr, childOptions);
          arr = null;
        } else if (Object.keys(updates).length > 0) {
          p = this.updateNode(target.path, updates, childOptions);
          updates = {};
        }
        if (p) {
          await p;
        }
      };
      const pushChild = (value, index2) => {
        if (flushedBefore) {
          updates[index2] = value;
        } else {
          arr.push(value);
        }
      };
      const promises = [];
      let index = 0;
      while (true) {
        await consumeSpaces();
        const { value, type } = await readValue();
        pushChild(value, index);
        if (["object", "array"].includes(type)) {
          promises.push(flushArray());
          if (type === "object") {
            await importObject(target.child(index));
          } else {
            await importArray(target.child(index));
          }
        }
        await consumeSpaces();
        const nextChar2 = await peekBytes(1);
        if (nextChar2 === "]") {
          state.index++;
          break;
        }
        await consumeToken(",");
        index++;
      }
      promises.push(flushArray());
      await Promise.all(promises);
    };
    const start = async () => {
      const { value, type } = await readValue();
      if (["object", "array"].includes(type)) {
        const target = PathInfo.get(path);
        if (type === "object") {
          await importObject(target);
        } else {
          await importArray(target);
        }
      } else {
        await this.setNode(path, value, childOptions);
      }
    };
    return start();
  }
  /**
   * Adds, updates or removes a schema definition to validate node values before they are stored at the specified path
   * @param path target path to enforce the schema on, can include wildcards. Eg: 'users/*\/posts/*' or 'users/$uid/posts/$postid'
   * @param schema schema type definitions. When null value is passed, a previously set schema is removed.
   */
  setSchema(path, schema) {
    if (typeof schema === "undefined") {
      throw new TypeError("schema argument must be given");
    }
    if (schema === null) {
      const i = this._schemas.findIndex((s2) => s2.path === path);
      i >= 0 && this._schemas.splice(i, 1);
      return;
    }
    const definition = new SchemaDefinition(schema);
    const item = this._schemas.find((s2) => s2.path === path);
    if (item) {
      item.schema = definition;
    } else {
      this._schemas.push({ path, schema: definition });
      this._schemas.sort((a, b) => {
        const ka = PathInfo.getPathKeys(a.path), kb = PathInfo.getPathKeys(b.path);
        if (ka.length === kb.length) {
          return 0;
        }
        return ka.length < kb.length ? -1 : 1;
      });
    }
  }
  /**
   * Gets currently active schema definition for the specified path
   */
  getSchema(path) {
    const item = this._schemas.find((item2) => item2.path === path);
    return item ? { path, schema: item.schema.source, text: item.schema.text } : null;
  }
  /**
   * Gets all currently active schema definitions
   */
  getSchemas() {
    return this._schemas.map((item) => ({ path: item.path, schema: item.schema.source, text: item.schema.text }));
  }
  /**
   * Validates the schemas of the node being updated and its children
   * @param path path being written to
   * @param value the new value, or updates to current value
   * @example
   * // define schema for each tag of each user post:
   * db.schema.set(
   *  'users/$uid/posts/$postId/tags/$tagId',
   *  { name: 'string', 'link_id?': 'number' }
   * );
   *
   * // Insert that will fail:
   * db.ref('users/352352/posts/572245').set({
   *  text: 'this is my post',
   *  tags: { sometag: 'deny this' } // <-- sometag must be typeof object
   * });
   *
   * // Insert that will fail:
   * db.ref('users/352352/posts/572245').set({
   *  text: 'this is my post',
   *  tags: {
   *      tag1: { name: 'firstpost', link_id: 234 },
   *      tag2: { name: 'newbie' },
   *      tag3: { title: 'Not allowed' } // <-- title property not allowed
   *  }
   * });
   *
   * // Update that fails if post does not exist:
   * db.ref('users/352352/posts/572245/tags/tag1').update({
   *  name: 'firstpost'
   * }); // <-- post is missing property text
   */
  validateSchema(path, value, options = { updates: false }) {
    let result = { ok: true };
    const pathInfo = PathInfo.get(path);
    this._schemas.filter((s2) => pathInfo.isOnTrailOf(s2.path)).every((s2) => {
      if (pathInfo.isDescendantOf(s2.path)) {
        const ancestorPath = PathInfo.fillVariables(s2.path, path);
        const trailKeys2 = pathInfo.keys.slice(PathInfo.getPathKeys(s2.path).length);
        result = s2.schema.check(ancestorPath, value, options.updates, trailKeys2);
        return result.ok;
      }
      const trailKeys = PathInfo.getPathKeys(s2.path).slice(pathInfo.keys.length);
      const partial = options.updates === true && trailKeys.length === 0;
      const check = (path2, value2, trailKeys2) => {
        if (trailKeys2.length === 0) {
          return s2.schema.check(path2, value2, partial);
        } else if (value2 === null) {
          return { ok: true };
        }
        const key = trailKeys2[0];
        if (typeof key === "string" && (key === "*" || key[0] === "$")) {
          if (value2 === null || typeof value2 !== "object") {
            return { ok: true };
          }
          let result2;
          Object.keys(value2).every((childKey) => {
            const childPath = PathInfo.getChildPath(path2, childKey);
            const childValue = value2[childKey];
            result2 = check(childPath, childValue, trailKeys2.slice(1));
            return result2.ok;
          });
          return result2;
        } else {
          const childPath = PathInfo.getChildPath(path2, key);
          const childValue = value2[key];
          return check(childPath, childValue, trailKeys2.slice(1));
        }
      };
      result = check(path, value, trailKeys);
      return result.ok;
    });
    return result;
  }
}
class CustomStorageHelpers {
  /**
   * Helper function that returns a SQL where clause for all children of given path
   * @param path Path to get children of
   * @param columnName Name of the Path column in your SQL db, default is 'path'
   * @returns Returns the SQL where clause
   */
  static ChildPathsSql(path, columnName = "path") {
    const where = path === "" ? `${columnName} <> '' AND ${columnName} NOT LIKE '%/%'` : `(${columnName} LIKE '${path}/%' OR ${columnName} LIKE '${path}[%') AND ${columnName} NOT LIKE '${path}/%/%' AND ${columnName} NOT LIKE '${path}[%]/%' AND ${columnName} NOT LIKE '${path}[%][%'`;
    return where;
  }
  /**
   * Helper function that returns a regular expression to test if paths are children of the given path
   * @param path Path to test children of
   * @returns Returns regular expression to test paths with
   */
  static ChildPathsRegex(path) {
    return new RegExp(`^${path}(?:/[^/[]+|\\[[0-9]+\\])$`);
  }
  /**
   * Helper function that returns a SQL where clause for all descendants of given path
   * @param path Path to get descendants of
   * @param columnName Name of the Path column in your SQL db, default is 'path'
   * @returns Returns the SQL where clause
   */
  static DescendantPathsSql(path, columnName = "path") {
    const where = path === "" ? `${columnName} <> ''` : `${columnName} LIKE '${path}/%' OR ${columnName} LIKE '${path}[%'`;
    return where;
  }
  /**
   * Helper function that returns a regular expression to test if paths are descendants of the given path
   * @param path Path to test descendants of
   * @returns Returns regular expression to test paths with
   */
  static DescendantPathsRegex(path) {
    return new RegExp(`^${path}(?:/[^/[]+|\\[[0-9]+\\])`);
  }
  /**
   * PathInfo helper class. Can be used to extract keys from a given path, get parent paths, check if a path is a child or descendant of other path etc
   * @example
   * var pathInfo = CustomStorage.PathInfo.get('my/path/to/data');
   * pathInfo.key === 'data';
   * pathInfo.parentPath === 'my/path/to';
   * pathInfo.pathKeys; // ['my','path','to','data'];
   * pathInfo.isChildOf('my/path/to') === true;
   * pathInfo.isDescendantOf('my/path') === true;
   * pathInfo.isParentOf('my/path/to/data/child') === true;
   * pathInfo.isAncestorOf('my/path/to/data/child/grandchild') === true;
   * pathInfo.childPath('child') === 'my/path/to/data/child';
   * pathInfo.childPath(0) === 'my/path/to/data[0]';
   */
  static get PathInfo() {
    return PathInfo;
  }
}
class NodeAddress {
  constructor(path) {
    this.path = path;
  }
  toString() {
    return `"/${this.path}"`;
  }
  /**
   * Compares this address to another address
   */
  equals(address) {
    return this.path === address.path;
  }
}
const { compareValues } = Utils;
class CustomStorageTransaction {
  /**
   * @param target Which path the transaction is taking place on, and whether it is a read or read/write lock. If your storage backend does not support transactions, is synchronous, or if you are able to lock resources based on path: use storage.nodeLocker to ensure threadsafe transactions
   */
  constructor(target) {
    this.production = false;
    this.target = {
      get originalPath() {
        return target.path;
      },
      path: target.path,
      get write() {
        return target.write;
      }
    };
    this.id = ID.generate();
  }
  /**
   * Returns the number of children stored in their own records. This implementation uses `childrenOf` to count, override if storage supports a quicker way.
   * Eg: For SQL databases, you can implement this with a single query like `SELECT count(*) FROM nodes WHERE ${CustomStorageHelpers.ChildPathsSql(path)}`
   * @param path
   * @returns Returns a promise that resolves with the number of children
   */
  async getChildCount(path) {
    let childCount = 0;
    await this.childrenOf(path, { metadata: false, value: false }, () => {
      childCount++;
      return false;
    });
    return childCount;
  }
  /**
   * NOT USED YET
   * Default implementation of getMultiple that executes .get for each given path. Override for custom logic
   * @param paths
   * @returns Returns promise with a Map of paths to nodes
   */
  async getMultiple(paths) {
    const map2 = /* @__PURE__ */ new Map();
    await Promise.all(paths.map((path) => this.get(path).then((val) => map2.set(path, val))));
    return map2;
  }
  /**
   * NOT USED YET
   * Default implementation of setMultiple that executes .set for each given path. Override for custom logic
   * @param nodes
   */
  async setMultiple(nodes) {
    await Promise.all(nodes.map(({ path, node }) => this.set(path, node)));
  }
  /**
   * Default implementation of removeMultiple that executes .remove for each given path. Override for custom logic
   * @param paths
   */
  async removeMultiple(paths) {
    await Promise.all(paths.map((path) => this.remove(path)));
  }
  /**
   * @returns {Promise<any>}
   */
  async commit() {
    throw new Error(`CustomStorageTransaction.rollback must be overridden by subclass`);
  }
  /**
   * Moves the transaction path to the parent node. If node locking is used, it will request a new lock
   * Used internally, must not be overridden unless custom locking mechanism is required
   * @param targetPath
   */
  async moveToParentPath(targetPath) {
    const currentPath = this._lock && this._lock.path || this.target.path;
    if (currentPath === targetPath) {
      return targetPath;
    }
    const pathInfo = CustomStorageHelpers.PathInfo.get(targetPath);
    if (pathInfo.isParentOf(currentPath)) {
      if (this._lock) {
        this._lock = await this._lock.moveToParent();
      }
    } else {
      throw new Error(`Locking issue. Locked path "${this._lock.path}" is not a child/descendant of "${targetPath}"`);
    }
    this.target.path = targetPath;
    return targetPath;
  }
}
class CustomStorageSettings extends StorageSettings {
  constructor(settings) {
    super(settings);
    this.locking = true;
    if (typeof settings !== "object") {
      throw new Error("settings missing");
    }
    if (typeof settings.ready !== "function") {
      throw new Error(`ready must be a function`);
    }
    if (typeof settings.getTransaction !== "function") {
      throw new Error(`getTransaction must be a function`);
    }
    this.name = settings.name;
    this.locking = settings.locking !== false;
    if (this.locking) {
      this.lockTimeout = typeof settings.lockTimeout === "number" ? settings.lockTimeout : 120;
    }
    this.ready = settings.ready;
    const useLocking = this.locking;
    const nodeLocker = useLocking ? new NodeLocker(console, this.lockTimeout) : null;
    this.getTransaction = async ({ path, write }) => {
      const transaction = await settings.getTransaction({ path, write });
      assert(typeof transaction.id === "string", `transaction id not set`);
      const rollback = transaction.rollback;
      const commit = transaction.commit;
      transaction.commit = async () => {
        const ret = await commit.call(transaction);
        if (useLocking) {
          await transaction._lock.release("commit");
        }
        return ret;
      };
      transaction.rollback = async (reason) => {
        const ret = await rollback.call(transaction, reason);
        if (useLocking) {
          await transaction._lock.release("rollback");
        }
        return ret;
      };
      if (useLocking) {
        transaction._lock = await nodeLocker.lock(path, transaction.id, write, `${this.name}::getTransaction`);
      }
      return transaction;
    };
  }
}
class CustomStorageNodeInfo extends NodeInfo {
  constructor(info) {
    super(info);
    this.revision = info.revision;
    this.revision_nr = info.revision_nr;
    this.created = info.created;
    this.modified = info.modified;
  }
}
class CustomStorage extends Storage {
  constructor(dbname, settings, env2) {
    super(dbname, settings, env2);
    this._customImplementation = settings;
    this._init();
  }
  async _init() {
    this.debug.log(`Database "${this.name}" details:`.colorize(ColorStyle.dim));
    this.debug.log(`- Type: CustomStorage`.colorize(ColorStyle.dim));
    this.debug.log(`- Path: ${this.settings.path}`.colorize(ColorStyle.dim));
    this.debug.log(`- Max inline value size: ${this.settings.maxInlineValueSize}`.colorize(ColorStyle.dim));
    this.debug.log(`- Autoremove undefined props: ${this.settings.removeVoidProperties}`.colorize(ColorStyle.dim));
    await this._customImplementation.ready();
    const transaction = await this._customImplementation.getTransaction({ path: "", write: true });
    const info = await this.getNodeInfo("", { transaction });
    if (!info.exists) {
      await this._writeNode("", {}, { transaction });
    }
    await transaction.commit();
    if (this.indexes.supported) {
      await this.indexes.load();
    }
    this.emit("ready");
  }
  throwImplementationError(message) {
    throw new Error(`CustomStorage "${this._customImplementation.name}" ${message}`);
  }
  _storeNode(path, node, options) {
    const getTypedChildValue = (val) => {
      if (val === null) {
        throw new Error(`Not allowed to store null values. remove the property`);
      } else if (["string", "number", "boolean"].includes(typeof val)) {
        return val;
      } else if (val instanceof Date) {
        return { type: VALUE_TYPES.DATETIME, value: val.getTime() };
      } else if (val instanceof PathReference) {
        return { type: VALUE_TYPES.REFERENCE, value: val.path };
      } else if (val instanceof ArrayBuffer) {
        return { type: VALUE_TYPES.BINARY, value: ascii85.encode(val) };
      } else if (typeof val === "object") {
        assert(Object.keys(val).length === 0, "child object stored in parent can only be empty");
        return val;
      }
    };
    const unprocessed = `Caller should have pre-processed the value by converting it to a string`;
    if (node.type === VALUE_TYPES.ARRAY && node.value instanceof Array) {
      console.warn(`Unprocessed array. ${unprocessed}`);
      const obj = {};
      for (let i = 0; i < node.value.length; i++) {
        obj[i] = node.value[i];
      }
      node.value = obj;
    }
    if (node.type === VALUE_TYPES.BINARY && typeof node.value !== "string") {
      console.warn(`Unprocessed binary value. ${unprocessed}`);
      node.value = ascii85.encode(node.value);
    }
    if (node.type === VALUE_TYPES.REFERENCE && node.value instanceof PathReference) {
      console.warn(`Unprocessed path reference. ${unprocessed}`);
      node.value = node.value.path;
    }
    if ([VALUE_TYPES.OBJECT, VALUE_TYPES.ARRAY].includes(node.type)) {
      const original = node.value;
      node.value = {};
      Object.keys(original).forEach((key) => {
        node.value[key] = getTypedChildValue(original[key]);
      });
    }
    return options.transaction.set(path, node);
  }
  _processReadNodeValue(node) {
    const getTypedChildValue = (val) => {
      if (val.type === VALUE_TYPES.BINARY) {
        return ascii85.decode(val.value);
      } else if (val.type === VALUE_TYPES.DATETIME) {
        return new Date(val.value);
      } else if (val.type === VALUE_TYPES.REFERENCE) {
        return new PathReference(val.value);
      } else {
        throw new Error(`Unhandled child value type ${val.type}`);
      }
    };
    switch (node.type) {
      case VALUE_TYPES.ARRAY:
      case VALUE_TYPES.OBJECT: {
        const obj = node.value;
        Object.keys(obj).forEach((key) => {
          const item = obj[key];
          if (typeof item === "object" && "type" in item) {
            obj[key] = getTypedChildValue(item);
          }
        });
        node.value = obj;
        break;
      }
      case VALUE_TYPES.BINARY: {
        node.value = ascii85.decode(node.value);
        break;
      }
      case VALUE_TYPES.REFERENCE: {
        node.value = new PathReference(node.value);
        break;
      }
      case VALUE_TYPES.STRING: {
        break;
      }
      default:
        throw new Error(`Invalid standalone record value type`);
    }
  }
  async _readNode(path, options) {
    const node = await options.transaction.get(path);
    if (node === null) {
      return null;
    }
    if (typeof node !== "object") {
      this.throwImplementationError(`transaction.get must return an ICustomStorageNode object. Use JSON.parse if your set function stored it as a string`);
    }
    this._processReadNodeValue(node);
    return node;
  }
  _getTypeFromStoredValue(val) {
    let type;
    if (typeof val === "string") {
      type = VALUE_TYPES.STRING;
    } else if (typeof val === "number") {
      type = VALUE_TYPES.NUMBER;
    } else if (typeof val === "boolean") {
      type = VALUE_TYPES.BOOLEAN;
    } else if (val instanceof Array) {
      type = VALUE_TYPES.ARRAY;
    } else if (typeof val === "object") {
      if ("type" in val) {
        const serialized = val;
        type = serialized.type;
        val = serialized.value;
        if (type === VALUE_TYPES.DATETIME) {
          val = new Date(val);
        } else if (type === VALUE_TYPES.REFERENCE) {
          val = new PathReference(val);
        }
      } else {
        type = VALUE_TYPES.OBJECT;
      }
    } else {
      throw new Error(`Unknown value type`);
    }
    return { type, value: val };
  }
  /**
   * Creates or updates a node in its own record. DOES NOT CHECK if path exists in parent node, or if parent paths exist! Calling code needs to do this
   */
  async _writeNode(path, value, options) {
    if (!options.merge && this.valueFitsInline(value) && path !== "") {
      throw new Error(`invalid value to store in its own node`);
    } else if (path === "" && (typeof value !== "object" || value instanceof Array)) {
      throw new Error(`Invalid root node value. Must be an object`);
    }
    if (typeof options.diff === "undefined" && typeof options.currentValue !== "undefined") {
      const diff2 = compareValues(options.currentValue, value);
      if (options.merge && typeof diff2 === "object") {
        diff2.removed = diff2.removed.filter((key) => value[key] === null);
      }
      options.diff = diff2;
    }
    if (options.diff === "identical") {
      return;
    }
    const transaction = options.transaction;
    const currentRow = options.currentValue === null ? null : await this._readNode(path, { transaction });
    if (options.merge && currentRow) {
      if (currentRow.type === VALUE_TYPES.ARRAY && !(value instanceof Array) && typeof value === "object" && Object.keys(value).some((key) => isNaN(parseInt(key)))) {
        throw new Error(`Cannot merge existing array of path "${path}" with an object`);
      }
      if (value instanceof Array && currentRow.type !== VALUE_TYPES.ARRAY) {
        throw new Error(`Cannot merge existing object of path "${path}" with an array`);
      }
    }
    const revision = options.revision || ID.generate();
    const mainNode = {
      type: currentRow && currentRow.type === VALUE_TYPES.ARRAY ? VALUE_TYPES.ARRAY : VALUE_TYPES.OBJECT,
      value: {}
    };
    const childNodeValues = {};
    if (value instanceof Array) {
      mainNode.type = VALUE_TYPES.ARRAY;
      const obj = {};
      for (let i = 0; i < value.length; i++) {
        obj[i] = value[i];
      }
      value = obj;
    } else if (value instanceof PathReference) {
      mainNode.type = VALUE_TYPES.REFERENCE;
      mainNode.value = value.path;
    } else if (value instanceof ArrayBuffer) {
      mainNode.type = VALUE_TYPES.BINARY;
      mainNode.value = ascii85.encode(value);
    } else if (typeof value === "string") {
      mainNode.type = VALUE_TYPES.STRING;
      mainNode.value = value;
    }
    const currentIsObjectOrArray = currentRow ? [VALUE_TYPES.OBJECT, VALUE_TYPES.ARRAY].includes(currentRow.type) : false;
    const newIsObjectOrArray = [VALUE_TYPES.OBJECT, VALUE_TYPES.ARRAY].includes(mainNode.type);
    const children2 = {
      current: [],
      new: []
    };
    let currentObject = null;
    if (currentIsObjectOrArray) {
      currentObject = currentRow.value;
      children2.current = Object.keys(currentObject);
      if (newIsObjectOrArray) {
        mainNode.value = currentObject;
      }
    }
    if (newIsObjectOrArray) {
      if (!options.merge) {
        Object.keys(mainNode.value).forEach((key) => {
          if (!(key in value)) {
            value[key] = null;
          }
        });
      }
      Object.keys(value).forEach((key) => {
        const val = value[key];
        delete mainNode.value[key];
        if (val === null) {
          return;
        } else if (typeof val === "undefined") {
          if (this.settings.removeVoidProperties === true) {
            delete value[key];
            return;
          } else {
            throw new Error(`Property "${key}" has invalid value. Cannot store undefined values. Set removeVoidProperties option to true to automatically remove undefined properties`);
          }
        }
        if (this.valueFitsInline(val)) {
          mainNode.value[key] = val;
        } else {
          childNodeValues[key] = val;
        }
      });
    }
    const isArray = mainNode.type === VALUE_TYPES.ARRAY;
    if (currentRow) {
      this.debug.log(`Node "/${path}" is being ${options.merge ? "updated" : "overwritten"}`.colorize(ColorStyle.cyan));
      if (currentIsObjectOrArray || newIsObjectOrArray) {
        const pathInfo = PathInfo.get(path);
        const keys = [];
        let checkExecuted = false;
        const includeChildCheck = (childPath) => {
          checkExecuted = true;
          if (!transaction.production && !pathInfo.isParentOf(childPath)) {
            this.throwImplementationError(`"${childPath}" is not a child of "${path}" - childrenOf must only check and return paths that are children`);
          }
          return true;
        };
        const addChildPath = (childPath) => {
          if (!checkExecuted) {
            this.throwImplementationError(`childrenOf did not call checkCallback before addCallback`);
          }
          const key = PathInfo.get(childPath).key;
          keys.push(key.toString());
          return true;
        };
        await transaction.childrenOf(path, { metadata: false, value: false }, includeChildCheck, addChildPath);
        children2.current = children2.current.concat(keys);
        if (newIsObjectOrArray) {
          if (options && options.merge) {
            children2.new = children2.current.slice();
          }
          Object.keys(value).forEach((key) => {
            if (!children2.new.includes(key)) {
              children2.new.push(key);
            }
          });
        }
        const changes = {
          insert: children2.new.filter((key) => !children2.current.includes(key)),
          update: [],
          delete: options && options.merge ? Object.keys(value).filter((key) => value[key] === null) : children2.current.filter((key) => !children2.new.includes(key))
        };
        changes.update = children2.new.filter((key) => children2.current.includes(key) && !changes.delete.includes(key));
        if (isArray && options.merge && (changes.insert.length > 0 || changes.delete.length > 0)) {
          const newArrayKeys = changes.update.concat(changes.insert);
          const isExhaustive = newArrayKeys.every((k, index, arr) => arr.includes(index.toString()));
          if (!isExhaustive) {
            throw new Error(`Elements cannot be inserted beyond, or removed before the end of an array. Rewrite the whole array at path "${path}" or change your schema to use an object collection instead`);
          }
        }
        const writePromises = Object.keys(childNodeValues).map((key) => {
          const keyOrIndex = isArray ? parseInt(key) : key;
          const childDiff = typeof options.diff === "object" ? options.diff.forChild(keyOrIndex) : void 0;
          if (childDiff === "identical") {
            return;
          }
          const childPath = pathInfo.childPath(keyOrIndex);
          const childValue = childNodeValues[keyOrIndex];
          const currentChildValue = typeof options.currentValue === "undefined" ? void 0 : options.currentValue !== null && typeof options.currentValue === "object" && keyOrIndex in options.currentValue ? options.currentValue[keyOrIndex] : null;
          return this._writeNode(childPath, childValue, { transaction, revision, merge: false, currentValue: currentChildValue, diff: childDiff });
        });
        const movingNodes = newIsObjectOrArray ? keys.filter((key) => key in mainNode.value) : [];
        const deleteDedicatedKeys = changes.delete.concat(movingNodes);
        const deletePromises = deleteDedicatedKeys.map((key) => {
          const keyOrIndex = isArray ? parseInt(key) : key;
          const childPath = pathInfo.childPath(keyOrIndex);
          return this._deleteNode(childPath, { transaction });
        });
        const promises = writePromises.concat(deletePromises);
        await Promise.all(promises);
      }
      const p = this._storeNode(path, {
        type: mainNode.type,
        value: mainNode.value,
        revision: currentRow.revision,
        revision_nr: currentRow.revision_nr + 1,
        created: currentRow.created,
        modified: Date.now()
      }, {
        transaction
      });
      if (p instanceof Promise) {
        return await p;
      }
    } else {
      this.debug.log(`Node "/${path}" is being created`.colorize(ColorStyle.cyan));
      if (isArray) {
        const arrayKeys = Object.keys(mainNode.value).concat(Object.keys(childNodeValues));
        const isExhaustive = arrayKeys.every((k, index, arr) => arr.includes(index.toString()));
        if (!isExhaustive) {
          throw new Error(`Cannot store arrays with missing entries`);
        }
      }
      const promises = Object.keys(childNodeValues).map((key) => {
        const keyOrIndex = isArray ? parseInt(key) : key;
        const childPath = PathInfo.getChildPath(path, keyOrIndex);
        const childValue = childNodeValues[keyOrIndex];
        return this._writeNode(childPath, childValue, { transaction, revision, merge: false, currentValue: null });
      });
      const p = this._storeNode(path, {
        type: mainNode.type,
        value: mainNode.value,
        revision,
        revision_nr: 1,
        created: Date.now(),
        modified: Date.now()
      }, {
        transaction
      });
      if (p instanceof Promise) {
        promises.push(p);
      }
      await Promise.all(promises);
    }
  }
  /**
   * Deletes (dedicated) node and all subnodes without checking for existence. Use with care - all removed nodes will lose their revision stats! DOES NOT REMOVE INLINE CHILD NODES!
   */
  async _deleteNode(path, options) {
    const pathInfo = PathInfo.get(path);
    this.debug.log(`Node "/${path}" is being deleted`.colorize(ColorStyle.cyan));
    const deletePaths = [path];
    let checkExecuted = false;
    const includeDescendantCheck = (descPath) => {
      checkExecuted = true;
      if (!transaction.production && !pathInfo.isAncestorOf(descPath)) {
        this.throwImplementationError(`"${descPath}" is not a descendant of "${path}" - descendantsOf must only check and return paths that are descendants`);
      }
      return true;
    };
    const addDescendant = (descPath) => {
      if (!checkExecuted) {
        this.throwImplementationError(`descendantsOf did not call checkCallback before addCallback`);
      }
      deletePaths.push(descPath);
      return true;
    };
    const transaction = options.transaction;
    await transaction.descendantsOf(path, { metadata: false, value: false }, includeDescendantCheck, addDescendant);
    this.debug.log(`Nodes ${deletePaths.map((p) => `"/${p}"`).join(",")} are being deleted`.colorize(ColorStyle.cyan));
    return transaction.removeMultiple(deletePaths);
  }
  /**
   * Enumerates all children of a given Node for reflection purposes
   */
  getChildren(path, options = {}) {
    let callback;
    const generator = {
      /**
       *
       * @param valueCallback callback function to run for each child. Return false to stop iterating
       * @returns returns a promise that resolves with a boolean indicating if all children have been enumerated, or was canceled by the valueCallback function
       */
      next(valueCallback) {
        callback = valueCallback;
        return start();
      }
    };
    const start = async () => {
      const transaction = options.transaction || await this._customImplementation.getTransaction({ path, write: false });
      try {
        let canceled = false;
        await (async () => {
          const node = await this._readNode(path, { transaction });
          if (!node) {
            throw new NodeNotFoundError(`Node "/${path}" does not exist`);
          }
          if (![VALUE_TYPES.OBJECT, VALUE_TYPES.ARRAY].includes(node.type)) {
            return;
          }
          const isArray = node.type === VALUE_TYPES.ARRAY;
          const value = node.value;
          let keys = Object.keys(value).map((key) => isArray ? parseInt(key) : key);
          if (options.keyFilter) {
            keys = keys.filter((key) => options.keyFilter.includes(key));
          }
          const pathInfo = PathInfo.get(path);
          keys.length > 0 && keys.every((key) => {
            const child = this._getTypeFromStoredValue(value[key]);
            const info = new CustomStorageNodeInfo({
              path: pathInfo.childPath(key),
              key: isArray ? null : key,
              index: isArray ? key : null,
              type: child.type,
              address: null,
              exists: true,
              value: child.value,
              revision: node.revision,
              revision_nr: node.revision_nr,
              created: new Date(node.created),
              modified: new Date(node.modified)
            });
            canceled = callback(info) === false;
            return !canceled;
          });
          if (canceled) {
            return;
          }
          let checkExecuted = false;
          const includeChildCheck = (childPath) => {
            checkExecuted = true;
            if (!transaction.production && !pathInfo.isParentOf(childPath)) {
              this.throwImplementationError(`"${childPath}" is not a child of "${path}" - childrenOf must only check and return paths that are children`);
            }
            if (options.keyFilter) {
              const key = PathInfo.get(childPath).key;
              return options.keyFilter.includes(key);
            }
            return true;
          };
          const addChildNode = (childPath, node2) => {
            if (!checkExecuted) {
              this.throwImplementationError(`childrenOf did not call checkCallback before addCallback`);
            }
            const key = PathInfo.get(childPath).key;
            const info = new CustomStorageNodeInfo({
              path: childPath,
              type: node2.type,
              key: isArray ? null : key,
              index: isArray ? key : null,
              address: new NodeAddress(childPath),
              exists: true,
              value: null,
              revision: node2.revision,
              revision_nr: node2.revision_nr,
              created: new Date(node2.created),
              modified: new Date(node2.modified)
            });
            canceled = callback(info) === false;
            return !canceled;
          };
          await transaction.childrenOf(path, { metadata: true, value: false }, includeChildCheck, addChildNode);
        })();
        if (!options.transaction) {
          await transaction.commit();
        }
        return canceled;
      } catch (err) {
        if (!options.transaction) {
          await transaction.rollback(err);
        }
        throw err;
      }
    };
    return generator;
  }
  async getNode(path, options) {
    options = options || {};
    const transaction = options.transaction || await this._customImplementation.getTransaction({ path, write: false });
    try {
      const node = await (async () => {
        const filtered = options.include && options.include.length > 0 || options.exclude && options.exclude.length > 0 || options.child_objects === false;
        const pathInfo = PathInfo.get(path);
        const targetNode = await this._readNode(path, { transaction });
        if (!targetNode) {
          if (path === "") {
            return { value: null };
          }
          const lockPath = await transaction.moveToParentPath(pathInfo.parentPath);
          assert(lockPath === pathInfo.parentPath, `transaction.moveToParentPath() did not move to the right parent path of "${path}"`);
          const parentNode = await this._readNode(pathInfo.parentPath, { transaction });
          if (parentNode && [VALUE_TYPES.OBJECT, VALUE_TYPES.ARRAY].includes(parentNode.type) && pathInfo.key in parentNode.value) {
            const childValueInfo = this._getTypeFromStoredValue(parentNode.value[pathInfo.key]);
            return {
              revision: parentNode.revision,
              revision_nr: parentNode.revision_nr,
              created: parentNode.created,
              modified: parentNode.modified,
              type: childValueInfo.type,
              value: childValueInfo.value
            };
          }
          return { value: null };
        }
        const isArray = targetNode.type === VALUE_TYPES.ARRAY;
        const convertFilterArray = (arr) => {
          const isNumber2 = (key) => /^[0-9]+$/.test(key);
          return arr.map((path2) => PathInfo.get(isArray && isNumber2(path2) ? `[${path2}]` : path2));
        };
        const includeFilter = options.include ? convertFilterArray(options.include) : [];
        const excludeFilter = options.exclude ? convertFilterArray(options.exclude) : [];
        const applyFiltersOnInlineData = (descPath, node2) => {
          if ([VALUE_TYPES.OBJECT, VALUE_TYPES.ARRAY].includes(node2.type) && includeFilter.length > 0) {
            const trailKeys = PathInfo.getPathKeys(descPath).slice(pathInfo.keys.length);
            const checkPathInfo = new PathInfo(trailKeys);
            const remove = [];
            const includes = includeFilter.filter((info) => info.isDescendantOf(checkPathInfo));
            if (includes.length > 0) {
              const isArray2 = node2.type === VALUE_TYPES.ARRAY;
              remove.push(...Object.keys(node2.value).map((key) => isArray2 ? +key : key));
              for (const info of includes) {
                const targetProp = info.keys[trailKeys.length];
                if (typeof targetProp === "string" && (targetProp === "*" || targetProp.startsWith("$"))) {
                  remove.splice(0);
                  break;
                }
                const index = remove.indexOf(targetProp);
                index >= 0 && remove.splice(index, 1);
              }
            }
            const hasIncludeOnChild = includeFilter.some((info) => info.isChildOf(checkPathInfo));
            const hasExcludeOnChild = excludeFilter.some((info) => info.isChildOf(checkPathInfo));
            if (hasExcludeOnChild && !hasIncludeOnChild) {
              const excludes = excludeFilter.filter((info) => info.isChildOf(checkPathInfo));
              for (let i = 0; i < remove.length; i++) {
                if (!excludes.find((info) => info.equals(remove[i]))) {
                  remove.splice(i, 1);
                  i--;
                }
              }
            }
            for (const key of remove) {
              delete node2.value[key];
            }
          }
        };
        applyFiltersOnInlineData(path, targetNode);
        let checkExecuted = false;
        const includeDescendantCheck = (descPath, metadata) => {
          checkExecuted = true;
          if (!transaction.production && !pathInfo.isAncestorOf(descPath)) {
            this.throwImplementationError(`"${descPath}" is not a descendant of "${path}" - descendantsOf must only check and return paths that are descendants`);
          }
          if (!filtered) {
            return true;
          }
          const descPathKeys = PathInfo.getPathKeys(descPath);
          const trailKeys = descPathKeys.slice(pathInfo.keys.length);
          const checkPathInfo = new PathInfo(trailKeys);
          let include = (includeFilter.length > 0 ? includeFilter.some((info) => checkPathInfo.isOnTrailOf(info)) : true) && (excludeFilter.length > 0 ? !excludeFilter.some((info) => info.equals(checkPathInfo) || info.isAncestorOf(checkPathInfo)) : true);
          if (include && options.child_objects === false && (pathInfo.isParentOf(descPath) && [VALUE_TYPES.OBJECT, VALUE_TYPES.ARRAY].includes(metadata ? metadata.type : -1) || PathInfo.getPathKeys(descPath).length > pathInfo.pathKeys.length + 1)) {
            include = false;
          }
          return include;
        };
        const descRows = [];
        const addDescendant = (descPath, node2) => {
          if (!checkExecuted) {
            this.throwImplementationError("descendantsOf did not call checkCallback before addCallback");
          }
          if (options.child_objects === false && [VALUE_TYPES.OBJECT, VALUE_TYPES.ARRAY].includes(node2.type)) {
            return true;
          }
          applyFiltersOnInlineData(descPath, node2);
          this._processReadNodeValue(node2);
          const row = node2;
          row.path = descPath;
          descRows.push(row);
          return true;
        };
        await transaction.descendantsOf(path, { metadata: true, value: true }, includeDescendantCheck, addDescendant);
        this.debug.log(`Read node "/${path}" and ${filtered ? "(filtered) " : ""}descendants from ${descRows.length + 1} records`.colorize(ColorStyle.magenta));
        const result = targetNode;
        const objectToArray = (obj) => {
          const arr = [];
          Object.keys(obj).forEach((key) => {
            const index = parseInt(key);
            arr[index] = obj[index];
          });
          return arr;
        };
        if (targetNode.type === VALUE_TYPES.ARRAY) {
          result.value = objectToArray(result.value);
        }
        if (targetNode.type === VALUE_TYPES.OBJECT || targetNode.type === VALUE_TYPES.ARRAY) {
          const targetPathKeys = PathInfo.getPathKeys(path);
          const value = targetNode.value;
          for (let i = 0; i < descRows.length; i++) {
            const otherNode = descRows[i];
            const pathKeys = PathInfo.getPathKeys(otherNode.path);
            const trailKeys = pathKeys.slice(targetPathKeys.length);
            let parent = value;
            for (let j = 0; j < trailKeys.length; j++) {
              assert(typeof parent === "object", "parent must be an object/array to have children!!");
              const key = trailKeys[j];
              const isLast = j === trailKeys.length - 1;
              const nodeType = isLast ? otherNode.type : typeof trailKeys[j + 1] === "number" ? VALUE_TYPES.ARRAY : VALUE_TYPES.OBJECT;
              let nodeValue;
              if (!isLast) {
                nodeValue = nodeType === VALUE_TYPES.OBJECT ? {} : [];
              } else {
                nodeValue = otherNode.value;
                if (nodeType === VALUE_TYPES.ARRAY) {
                  nodeValue = objectToArray(nodeValue);
                }
              }
              if (key in parent) {
                const mergePossible = typeof parent[key] === typeof nodeValue && [VALUE_TYPES.OBJECT, VALUE_TYPES.ARRAY].includes(nodeType);
                if (!mergePossible) {
                  this.debug.error(`The value stored in node "${otherNode.path}" cannot be merged with the parent node, value will be ignored. This error should disappear once the target node value is updated. See issue #20 for more information`, { path, parent, key, nodeType, nodeValue });
                } else {
                  Object.keys(nodeValue).forEach((childKey) => {
                    if (childKey in parent[key]) {
                      this.throwImplementationError(`Custom storage merge error: child key "${childKey}" is in parent value already! Make sure the get/childrenOf/descendantsOf methods of the custom storage class return values that can be modified by AceBase without affecting the stored source`);
                    }
                    parent[key][childKey] = nodeValue[childKey];
                  });
                }
              } else {
                parent[key] = nodeValue;
              }
              parent = parent[key];
            }
          }
        } else if (descRows.length > 0) {
          this.throwImplementationError(`multiple records found for non-object value!`);
        }
        if (options.child_objects === false) {
          Object.keys(result.value).forEach((key) => {
            if (typeof result.value[key] === "object" && result.value[key].constructor === Object) {
              assert(Object.keys(result.value[key]).length === 0);
              delete result.value[key];
            }
          });
        }
        if (options.include) {
        }
        if (options.exclude) {
          const process2 = (obj, keys) => {
            if (typeof obj !== "object") {
              return;
            }
            const key = keys[0];
            if (key === "*") {
              Object.keys(obj).forEach((k) => {
                process2(obj[k], keys.slice(1));
              });
            } else if (keys.length > 1) {
              key in obj && process2(obj[key], keys.slice(1));
            } else {
              delete obj[key];
            }
          };
          options.exclude.forEach((path2) => {
            const checkKeys = PathInfo.getPathKeys(path2);
            process2(result.value, checkKeys);
          });
        }
        return result;
      })();
      if (!options.transaction) {
        await transaction.commit();
      }
      return node;
    } catch (err) {
      if (!options.transaction) {
        await transaction.rollback(err);
      }
      throw err;
    }
  }
  async getNodeInfo(path, options = {}) {
    options = options || {};
    const pathInfo = PathInfo.get(path);
    const transaction = options.transaction || await this._customImplementation.getTransaction({ path, write: false });
    try {
      const node = await this._readNode(path, { transaction });
      const info = new CustomStorageNodeInfo({
        path,
        key: typeof pathInfo.key === "string" ? pathInfo.key : null,
        index: typeof pathInfo.key === "number" ? pathInfo.key : null,
        type: node ? node.type : 0,
        exists: node !== null,
        address: node ? new NodeAddress(path) : null,
        created: node ? new Date(node.created) : null,
        modified: node ? new Date(node.modified) : null,
        revision: node ? node.revision : null,
        revision_nr: node ? node.revision_nr : null
      });
      if (!node && path !== "") {
        const lockPath = await transaction.moveToParentPath(pathInfo.parentPath);
        assert(lockPath === pathInfo.parentPath, `transaction.moveToParentPath() did not move to the right parent path of "${path}"`);
        const parent = await this._readNode(pathInfo.parentPath, { transaction });
        if (parent && [VALUE_TYPES.OBJECT, VALUE_TYPES.ARRAY].includes(parent.type) && pathInfo.key in parent.value) {
          info.exists = true;
          info.value = parent.value[pathInfo.key];
          info.address = null;
          info.type = parent.type;
          info.created = new Date(parent.created);
          info.modified = new Date(parent.modified);
          info.revision = parent.revision;
          info.revision_nr = parent.revision_nr;
        } else {
          info.address = null;
        }
      }
      if (options.include_child_count) {
        info.childCount = 0;
        if ([VALUE_TYPES.ARRAY, VALUE_TYPES.OBJECT].includes(info.valueType) && info.address) {
          info.childCount = node.value ? Object.keys(node.value).length : 0;
          info.childCount += await transaction.getChildCount(path);
        }
      }
      if (!options.transaction) {
        await transaction.commit();
      }
      return info;
    } catch (err) {
      if (!options.transaction) {
        await transaction.rollback(err);
      }
      throw err;
    }
  }
  // TODO: Move to Storage base class?
  async setNode(path, value, options = { suppress_events: false, context: null }) {
    if (this.settings.readOnly) {
      throw new Error(`Database is opened in read-only mode`);
    }
    const pathInfo = PathInfo.get(path);
    const transaction = options.transaction || await this._customImplementation.getTransaction({ path, write: true });
    try {
      if (path === "") {
        if (value === null || typeof value !== "object" || value instanceof Array || value instanceof ArrayBuffer || "buffer" in value && value.buffer instanceof ArrayBuffer) {
          throw new Error(`Invalid value for root node: ${value}`);
        }
        await this._writeNodeWithTracking("", value, { merge: false, transaction, suppress_events: options.suppress_events, context: options.context });
      } else if (typeof options.assert_revision !== "undefined") {
        const info = await this.getNodeInfo(path, { transaction });
        if (info.revision !== options.assert_revision) {
          throw new NodeRevisionError(`revision '${info.revision}' does not match requested revision '${options.assert_revision}'`);
        }
        if (info.address && info.address.path === path && value !== null && !this.valueFitsInline(value)) {
          await this._writeNodeWithTracking(path, value, { merge: false, transaction, suppress_events: options.suppress_events, context: options.context });
        } else {
          const lockPath = await transaction.moveToParentPath(pathInfo.parentPath);
          assert(lockPath === pathInfo.parentPath, `transaction.moveToParentPath() did not move to the right parent path of "${path}"`);
          await this._writeNodeWithTracking(pathInfo.parentPath, { [pathInfo.key]: value }, { merge: true, transaction, suppress_events: options.suppress_events, context: options.context });
        }
      } else {
        const lockPath = await transaction.moveToParentPath(pathInfo.parentPath);
        assert(lockPath === pathInfo.parentPath, `transaction.moveToParentPath() did not move to the right parent path of "${path}"`);
        await this.updateNode(pathInfo.parentPath, { [pathInfo.key]: value }, { transaction, suppress_events: options.suppress_events, context: options.context });
      }
      if (!options.transaction) {
        await transaction.commit();
      }
    } catch (err) {
      if (!options.transaction) {
        await transaction.rollback(err);
      }
      throw err;
    }
  }
  // TODO: Move to Storage base class?
  async updateNode(path, updates, options = { suppress_events: false, context: null }) {
    if (this.settings.readOnly) {
      throw new Error(`Database is opened in read-only mode`);
    }
    if (typeof updates !== "object") {
      throw new Error(`invalid updates argument`);
    } else if (Object.keys(updates).length === 0) {
      return;
    }
    const transaction = options.transaction || await this._customImplementation.getTransaction({ path, write: true });
    try {
      const nodeInfo = await this.getNodeInfo(path, { transaction });
      const pathInfo = PathInfo.get(path);
      if (nodeInfo.exists && nodeInfo.address && nodeInfo.address.path === path) {
        await this._writeNodeWithTracking(path, updates, { transaction, merge: true, suppress_events: options.suppress_events, context: options.context });
      } else if (nodeInfo.exists) {
        const pathInfo2 = PathInfo.get(path);
        const lockPath = await transaction.moveToParentPath(pathInfo2.parentPath);
        assert(lockPath === pathInfo2.parentPath, `transaction.moveToParentPath() did not move to the right parent path of "${path}"`);
        await this._writeNodeWithTracking(pathInfo2.parentPath, { [pathInfo2.key]: updates }, { transaction, merge: true, suppress_events: options.suppress_events, context: options.context });
      } else {
        const lockPath = await transaction.moveToParentPath(pathInfo.parentPath);
        assert(lockPath === pathInfo.parentPath, `transaction.moveToParentPath() did not move to the right parent path of "${path}"`);
        await this.updateNode(pathInfo.parentPath, { [pathInfo.key]: updates }, { transaction, suppress_events: options.suppress_events, context: options.context });
      }
      if (!options.transaction) {
        await transaction.commit();
      }
    } catch (err) {
      if (!options.transaction) {
        await transaction.rollback(err);
      }
      throw err;
    }
  }
}
class AsyncTaskBatch {
  /**
   * Creates a new batch: runs a maximum amount of async tasks simultaniously and waits until they are all resolved.
   * If all tasks succeed, returns the results in the same order tasks were added (like `Promise.all` would do), but
   * cancels any waiting tasks upon failure of one task. Note that the execution order of tasks added after the set
   * limit is unknown.
   * @param limit Max amount of async functions to execute simultaniously. Default is `1000`
   * @param options Additional options
   */
  constructor(limit = 1e3, options) {
    this.limit = limit;
    this.options = options;
    this.added = 0;
    this.scheduled = [];
    this.running = 0;
    this.results = [];
    this.done = false;
  }
  async execute(task, index) {
    var _a2, _b;
    try {
      this.running++;
      const result = await task();
      this.results[index] = result;
      this.running--;
      if (this.running === 0 && this.scheduled.length === 0) {
        this.done = true;
        (_a2 = this.doneCallback) == null ? void 0 : _a2.call(this, this.results);
      } else if (this.scheduled.length > 0) {
        const next = this.scheduled.shift();
        this.execute(next.task, next.index);
      }
    } catch (err) {
      this.done = true;
      (_b = this.errorCallback) == null ? void 0 : _b.call(this, err);
    }
  }
  add(task) {
    var _a2;
    if (this.done) {
      throw new Error(`Cannot add to a batch that has already finished. Use wait option and start batch processing manually if you are adding tasks in an async loop`);
    }
    const index = this.added++;
    if (((_a2 = this.options) == null ? void 0 : _a2.wait) !== true && this.running < this.limit) {
      this.execute(task, index);
    } else {
      this.scheduled.push({ task, index });
    }
  }
  /**
   * Manually starts batch processing, mus be done if the `wait` option was used
   */
  start() {
    while (this.running < this.limit) {
      const next = this.scheduled.shift();
      this.execute(next.task, next.index);
    }
  }
  async finish() {
    if (this.running === 0 && this.scheduled.length === 0) {
      return this.results;
    }
    await new Promise((resolve, reject) => {
      this.doneCallback = resolve;
      this.errorCallback = reject;
    });
    return this.results;
  }
}
const noop = () => {
};
function query(api, path, query2, options = { snapshots: false, include: void 0, exclude: void 0, child_objects: void 0, eventHandler: noop }) {
  var _a2;
  if (typeof options !== "object") {
    options = {};
  }
  if (typeof options.snapshots === "undefined") {
    options.snapshots = false;
  }
  const context2 = {};
  if ((_a2 = api.storage.settings.transactions) == null ? void 0 : _a2.log) {
    context2.acebase_cursor = ID.generate();
  }
  const queryFilters = query2.filters.map((f) => ({ ...f }));
  const querySort = query2.order.map((s2) => ({ ...s2 }));
  const sortMatches = (matches) => {
    matches.sort((a, b) => {
      const compare = (i) => {
        const o = querySort[i];
        const trailKeys = PathInfo.getPathKeys(typeof o.key === "number" ? `[${o.key}]` : o.key);
        const left = trailKeys.reduce((val, key) => val !== null && typeof val === "object" && key in val ? val[key] : null, a.val);
        const right = trailKeys.reduce((val, key) => val !== null && typeof val === "object" && key in val ? val[key] : null, b.val);
        if (left === null) {
          return right === null ? 0 : o.ascending ? -1 : 1;
        }
        if (right === null) {
          return o.ascending ? 1 : -1;
        }
        if (left == right) {
          if (i < querySort.length - 1) {
            return compare(i + 1);
          } else {
            return a.path < b.path ? -1 : 1;
          }
        } else if (left < right) {
          return o.ascending ? -1 : 1;
        }
        return o.ascending ? 1 : -1;
      };
      return compare(0);
    });
  };
  const loadResultsData = async (preResults, options2) => {
    if (preResults.length === 0) {
      return [];
    }
    const maxBatchSize = 50;
    const batch = new AsyncTaskBatch(maxBatchSize);
    const results = [];
    preResults.forEach(({ path: path2 }, index) => batch.add(async () => {
      const node = await api.storage.getNode(path2, options2);
      const val = node.value;
      if (val === null) {
        api.storage.debug.warn(`Indexed result "/${path2}" does not have a record!`);
        return;
      }
      const result = { path: path2, val };
      if (stepsExecuted.sorted) {
        results[index] = result;
      } else {
        results.push(result);
        if (!stepsExecuted.skipped && results.length > query2.skip + Math.abs(query2.take)) {
          sortMatches(results);
          results.pop();
        }
      }
    }));
    await batch.finish();
    return results;
  };
  const pathInfo = PathInfo.get(path);
  const isWildcardPath = pathInfo.keys.some((key) => key === "*" || key.toString().startsWith("$"));
  const availableIndexes = api.storage.indexes.get(path);
  const usingIndexes = [];
  if (isWildcardPath) {
    if (availableIndexes.length === 0) {
      const err = new Error(`Query on wildcard path "/${path}" requires an index`);
      return Promise.reject(err);
    }
    if (queryFilters.length === 0) {
      const index = availableIndexes.filter((index2) => index2.type === "normal")[0];
      queryFilters.push({ key: index.key, op: "!=", compare: null });
    }
  }
  queryFilters.forEach((filter) => {
    if (filter.index) {
      return;
    }
    const indexesOnKey = availableIndexes.filter((index) => index.key === filter.key).filter((index) => {
      return index.validOperators.includes(filter.op);
    });
    if (indexesOnKey.length >= 1) {
      const otherFilterKeys = queryFilters.filter((f) => f !== filter).map((f) => f.key);
      const sortKeys = querySort.map((o) => o.key).filter((key) => key !== filter.key);
      const beneficialIndexes = indexesOnKey.map((index) => {
        const availableKeys = index.includeKeys.concat(index.key);
        const forOtherFilters = availableKeys.filter((key) => otherFilterKeys.includes(key));
        const forSorting = availableKeys.filter((key) => sortKeys.includes(key));
        const forBoth = forOtherFilters.concat(forSorting.filter((index2) => !forOtherFilters.includes(index2)));
        const points = {
          filters: forOtherFilters.length,
          sorting: forSorting.length * (query2.take !== 0 ? forSorting.length : 1),
          both: forBoth.length * forBoth.length,
          get total() {
            return this.filters + this.sorting + this.both;
          }
        };
        return { index, points: points.total, filterKeys: forOtherFilters, sortKeys: forSorting };
      });
      beneficialIndexes.sort((a, b) => a.points > b.points ? -1 : 1);
      const bestBenificialIndex = beneficialIndexes[0];
      filter.index = bestBenificialIndex.index;
      bestBenificialIndex.filterKeys.forEach((key) => {
        queryFilters.filter((f) => f !== filter && f.key === key).forEach((f) => {
          if (!DataIndex.validOperators.includes(f.op)) {
            return;
          }
          f.indexUsage = "filter";
          f.index = bestBenificialIndex.index;
        });
      });
      bestBenificialIndex.sortKeys.forEach((key) => {
        querySort.filter((s2) => s2.key === key).forEach((s2) => {
          s2.index = bestBenificialIndex.index;
        });
      });
    }
    if (filter.index) {
      usingIndexes.push({ index: filter.index, description: filter.index.description });
    }
  });
  if (querySort.length > 0 && query2.take !== 0 && queryFilters.length === 0) {
    querySort.forEach((sort) => {
      if (sort.index) {
        return;
      }
      sort.index = availableIndexes.filter((index) => index.key === sort.key).find((index) => index.type === "normal");
    });
  }
  const indexDescriptions = usingIndexes.map((index) => index.description).join(", ");
  usingIndexes.length > 0 && api.storage.debug.log(`Using indexes for query: ${indexDescriptions}`);
  const tableScanFilters = queryFilters.filter((filter) => !filter.index);
  const specialOpsRegex = /^[a-z]+:/i;
  if (tableScanFilters.some((filter) => specialOpsRegex.test(filter.op))) {
    const f = tableScanFilters.find((filter) => specialOpsRegex.test(filter.op));
    const err = new Error(`query contains operator "${f.op}" which requires a special index that was not found on path "${path}", key "${f.key}"`);
    return Promise.reject(err);
  }
  const allowedTableScanOperators = ["<", "<=", "==", "!=", ">=", ">", "like", "!like", "in", "!in", "matches", "!matches", "between", "!between", "has", "!has", "contains", "!contains", "exists", "!exists"];
  for (let i = 0; i < tableScanFilters.length; i++) {
    const f = tableScanFilters[i];
    if (!allowedTableScanOperators.includes(f.op)) {
      return Promise.reject(new Error(`query contains unknown filter operator "${f.op}" on path "${path}", key "${f.key}"`));
    }
  }
  if (isWildcardPath && tableScanFilters.length > 0) {
    const keys = tableScanFilters.reduce((keys2, f) => {
      if (keys2.indexOf(f.key) < 0) {
        keys2.push(f.key);
      }
      return keys2;
    }, []).map((key) => `"${key}"`);
    const err = new Error(`This wildcard path query on "/${path}" requires index(es) on key(s): ${keys.join(", ")}. Create the index(es) and retry`);
    return Promise.reject(err);
  }
  const indexScanPromises = [];
  queryFilters.forEach((filter) => {
    if (filter.index && filter.indexUsage !== "filter") {
      let promise = filter.index.query(filter.op, filter.compare).then((results) => {
        options.eventHandler && options.eventHandler({ name: "stats", type: "index_query", source: filter.index.description, stats: results.stats });
        if (results.hints.length > 0) {
          options.eventHandler && options.eventHandler({ name: "hints", type: "index_query", source: filter.index.description, hints: results.hints });
        }
        return results;
      });
      const resultFilters = queryFilters.filter((f) => f.index === filter.index && f.indexUsage === "filter");
      if (resultFilters.length > 0) {
        promise = promise.then((results) => {
          resultFilters.forEach((filter2) => {
            const { key, op, index } = filter2;
            let { compare } = filter2;
            if (typeof compare === "string" && !index.caseSensitive) {
              compare = compare.toLocaleLowerCase(index.textLocale);
            }
            results = results.filterMetadata(key, op, compare);
          });
          return results;
        });
      }
      indexScanPromises.push(promise);
    }
  });
  const stepsExecuted = {
    filtered: queryFilters.length === 0,
    skipped: query2.skip === 0,
    taken: query2.take === 0,
    sorted: querySort.length === 0,
    preDataLoaded: false,
    dataLoaded: false
  };
  if (queryFilters.length === 0 && query2.take === 0) {
    api.storage.debug.warn(`Filterless queries must use .take to limit the results. Defaulting to 100 for query on path "${path}"`);
    query2.take = 100;
  }
  if (querySort.length > 0 && querySort[0].index) {
    const sortIndex = querySort[0].index;
    const ascending = query2.take < 0 ? !querySort[0].ascending : querySort[0].ascending;
    if (queryFilters.length === 0 && querySort.slice(1).every((s2) => sortIndex.allMetadataKeys.includes(s2.key))) {
      api.storage.debug.log(`Using index for sorting: ${sortIndex.description}`);
      const metadataSort = querySort.slice(1).map((s2) => {
        s2.index = sortIndex;
        return { key: s2.key, ascending: s2.ascending };
      });
      const promise = sortIndex.take(query2.skip, Math.abs(query2.take), { ascending, metadataSort }).then((results) => {
        options.eventHandler && options.eventHandler({ name: "stats", type: "sort_index_take", source: sortIndex.description, stats: results.stats });
        if (results.hints.length > 0) {
          options.eventHandler && options.eventHandler({ name: "hints", type: "sort_index_take", source: sortIndex.description, hints: results.hints });
        }
        return results;
      });
      indexScanPromises.push(promise);
      stepsExecuted.skipped = true;
      stepsExecuted.taken = true;
      stepsExecuted.sorted = true;
    }
  }
  return Promise.all(indexScanPromises).then(async (indexResultSets) => {
    let indexedResults = [];
    if (indexResultSets.length === 1) {
      const resultSet = indexResultSets[0];
      indexedResults = resultSet.map((match2) => {
        const result = { key: match2.key, path: match2.path, val: { [resultSet.filterKey]: match2.value } };
        match2.metadata && Object.assign(result.val, match2.metadata);
        return result;
      });
      stepsExecuted.filtered = true;
    } else if (indexResultSets.length > 1) {
      indexResultSets.sort((a, b) => a.length < b.length ? -1 : 1);
      const shortestSet = indexResultSets[0];
      const otherSets = indexResultSets.slice(1);
      indexedResults = shortestSet.reduce((results, match2) => {
        const result = { key: match2.key, path: match2.path, val: { [shortestSet.filterKey]: match2.value } };
        const matchedInAllSets = otherSets.every((set) => set.findIndex((m2) => m2.path === match2.path) >= 0);
        if (matchedInAllSets) {
          match2.metadata && Object.assign(result.val, match2.metadata);
          otherSets.forEach((set) => {
            const otherResult = set.find((r) => r.path === result.path);
            result.val[set.filterKey] = otherResult.value;
            otherResult.metadata && Object.assign(result.val, otherResult.metadata);
          });
          results.push(result);
        }
        return results;
      }, []);
      stepsExecuted.filtered = true;
    }
    if (isWildcardPath || indexScanPromises.length > 0 && tableScanFilters.length === 0) {
      if (querySort.length === 0 || querySort.every((o) => o.index)) {
        stepsExecuted.preDataLoaded = true;
        if (!stepsExecuted.sorted && querySort.length > 0) {
          sortMatches(indexedResults);
        }
        stepsExecuted.sorted = true;
        if (!stepsExecuted.skipped && query2.skip > 0) {
          indexedResults = query2.take < 0 ? indexedResults.slice(0, -query2.skip) : indexedResults.slice(query2.skip);
        }
        if (!stepsExecuted.taken && query2.take !== 0) {
          indexedResults = query2.take < 0 ? indexedResults.slice(query2.take) : indexedResults.slice(0, query2.take);
        }
        stepsExecuted.skipped = true;
        stepsExecuted.taken = true;
        if (!options.snapshots) {
          return indexedResults;
        }
        const childOptions2 = { include: options.include, exclude: options.exclude, child_objects: options.child_objects };
        return loadResultsData(indexedResults, childOptions2).then((results) => {
          stepsExecuted.dataLoaded = true;
          return results;
        });
      }
      if (options.snapshots || !stepsExecuted.sorted) {
        const loadPartialResults = querySort.length > 0;
        const childOptions2 = loadPartialResults ? { include: querySort.map((order) => order.key) } : { include: options.include, exclude: options.exclude, child_objects: options.child_objects };
        return loadResultsData(indexedResults, childOptions2).then((results) => {
          if (querySort.length > 0) {
            sortMatches(results);
          }
          stepsExecuted.sorted = true;
          if (query2.skip > 0) {
            results = query2.take < 0 ? results.slice(0, -query2.skip) : results.slice(query2.skip);
          }
          if (query2.take !== 0) {
            results = query2.take < 0 ? results.slice(query2.take) : results.slice(0, query2.take);
          }
          stepsExecuted.skipped = true;
          stepsExecuted.taken = true;
          if (options.snapshots && loadPartialResults) {
            return loadResultsData(results, { include: options.include, exclude: options.exclude, child_objects: options.child_objects });
          }
          return results;
        });
      } else {
        return indexedResults;
      }
    }
    let indexKeyFilter;
    if (indexedResults.length > 0) {
      indexKeyFilter = indexedResults.map((result) => result.key);
    }
    let matches = [];
    let preliminaryStop = false;
    const loadPartialData = querySort.length > 0;
    const childOptions = loadPartialData ? { include: querySort.map((order) => order.key) } : { include: options.include, exclude: options.exclude, child_objects: options.child_objects };
    const batch = {
      promises: [],
      add(promise) {
        this.promises.push(promise);
        if (this.promises.length >= 1e3) {
          return Promise.all(this.promises.splice(0)).then((_) => void 0);
        }
      }
    };
    try {
      await api.storage.getChildren(path, { keyFilter: indexKeyFilter, async: true }).next((child) => {
        if (child.type !== VALUE_TYPES.OBJECT) {
          return;
        }
        if (!child.address) {
          return;
        }
        if (preliminaryStop) {
          return false;
        }
        const matchNode = async () => {
          const isMatch = await api.storage.matchNode(child.address.path, tableScanFilters);
          if (!isMatch) {
            return;
          }
          const childPath = child.address.path;
          let result;
          if (options.snapshots || querySort.length > 0) {
            const node = await api.storage.getNode(childPath, childOptions);
            result = { path: childPath, val: node.value };
          } else {
            result = { path: childPath };
          }
          matches.push(result);
          if (query2.take !== 0 && matches.length > Math.abs(query2.take) + query2.skip) {
            if (querySort.length > 0) {
              sortMatches(matches);
            } else if (query2.take > 0) {
              preliminaryStop = true;
            }
            matches.pop();
          }
        };
        const p = batch.add(matchNode());
        if (p instanceof Promise) {
          return p;
        }
      });
    } catch (reason) {
      if (!(reason instanceof NodeNotFoundError)) {
        api.storage.debug.warn(`Error getting child stream: ${reason}`);
      }
      return [];
    }
    await Promise.all(batch.promises);
    stepsExecuted.preDataLoaded = loadPartialData;
    stepsExecuted.dataLoaded = !loadPartialData;
    if (querySort.length > 0) {
      sortMatches(matches);
    }
    stepsExecuted.sorted = true;
    if (query2.skip > 0) {
      matches = query2.take < 0 ? matches.slice(0, -query2.skip) : matches.slice(query2.skip);
    }
    stepsExecuted.skipped = true;
    if (query2.take !== 0) {
      matches = query2.take < 0 ? matches.slice(query2.take) : matches.slice(0, query2.take);
    }
    stepsExecuted.taken = true;
    if (!stepsExecuted.dataLoaded) {
      matches = await loadResultsData(matches, { include: options.include, exclude: options.exclude, child_objects: options.child_objects });
      stepsExecuted.dataLoaded = true;
    }
    return matches;
  }).then((matches) => {
    if (!stepsExecuted.sorted && querySort.length > 0) {
      sortMatches(matches);
    }
    if (!options.snapshots) {
      matches = matches.map((match2) => match2.path);
    }
    if (!stepsExecuted.skipped && query2.skip > 0) {
      matches = query2.take < 0 ? matches.slice(0, -query2.skip) : matches.slice(query2.skip);
    }
    if (!stepsExecuted.taken && query2.take !== 0) {
      matches = query2.take < 0 ? matches.slice(query2.take) : matches.slice(0, query2.take);
    }
    if (options.monitor === true) {
      options.monitor = { add: true, change: true, remove: true };
    }
    let stop = async () => {
    };
    if (typeof options.monitor === "object" && (options.monitor.add || options.monitor.change || options.monitor.remove)) {
      const matchedPaths = options.snapshots ? matches.map((match2) => match2.path) : matches.slice();
      const ref = api.db.ref(path);
      const removeMatch = (path2) => {
        const index = matchedPaths.indexOf(path2);
        if (index < 0) {
          return;
        }
        matchedPaths.splice(index, 1);
      };
      const addMatch = (path2) => {
        if (matchedPaths.includes(path2)) {
          return;
        }
        matchedPaths.push(path2);
      };
      const stopMonitoring = () => {
        api.unsubscribe(ref.path, "child_changed", childChangedCallback);
        api.unsubscribe(ref.path, "child_added", childAddedCallback);
        api.unsubscribe(ref.path, "notify_child_removed", childRemovedCallback);
      };
      stop = async () => {
        stopMonitoring();
      };
      const childChangedCallback = async (err, path2, newValue, oldValue) => {
        const wasMatch = matchedPaths.includes(path2);
        let keepMonitoring = true;
        const checkKeys = [];
        queryFilters.forEach((f) => !checkKeys.includes(f.key) && checkKeys.push(f.key));
        const seenKeys = [];
        typeof oldValue === "object" && Object.keys(oldValue).forEach((key) => !seenKeys.includes(key) && seenKeys.push(key));
        typeof newValue === "object" && Object.keys(newValue).forEach((key) => !seenKeys.includes(key) && seenKeys.push(key));
        const missingKeys = [];
        let isMatch = seenKeys.every((key) => {
          if (!checkKeys.includes(key)) {
            return true;
          }
          const filters = queryFilters.filter((filter) => filter.key === key);
          return filters.every((filter) => {
            var _a3;
            if (((_a3 = filter.index) == null ? void 0 : _a3.textLocaleKey) && !seenKeys.includes(filter.index.textLocaleKey)) {
              missingKeys.push(filter.index.textLocaleKey);
              return true;
            } else if (allowedTableScanOperators.includes(filter.op)) {
              return api.storage.test(newValue[key], filter.op, filter.compare);
            } else {
              return filter.index.test(newValue, filter.op, filter.compare);
            }
          });
        });
        if (isMatch) {
          missingKeys.push(...checkKeys.filter((key) => !seenKeys.includes(key)));
          if (!wasMatch && missingKeys.length > 0) {
            const filterQueue = queryFilters.filter((f) => missingKeys.includes(f.key));
            const simpleFilters = filterQueue.filter((f) => allowedTableScanOperators.includes(f.op));
            const indexFilters = filterQueue.filter((f) => !allowedTableScanOperators.includes(f.op));
            if (simpleFilters.length > 0) {
              isMatch = await api.storage.matchNode(path2, simpleFilters);
            }
            if (isMatch && indexFilters.length > 0) {
              const keysToLoad = indexFilters.reduce((keys, filter) => {
                if (!keys.includes(filter.key)) {
                  keys.push(filter.key);
                }
                if (filter.index instanceof FullTextIndex && filter.index.config.localeKey && !keys.includes(filter.index.config.localeKey)) {
                  keys.push(filter.index.config.localeKey);
                }
                return keys;
              }, []);
              const node = await api.storage.getNode(path2, { include: keysToLoad });
              if (node.value === null) {
                return false;
              }
              isMatch = indexFilters.every((filter) => filter.index.test(node.value, filter.op, filter.compare));
            }
          }
        }
        if (isMatch) {
          if (!wasMatch) {
            addMatch(path2);
          }
          if (options.snapshots) {
            const loadOptions = { include: options.include, exclude: options.exclude, child_objects: options.child_objects };
            const node = await api.storage.getNode(path2, loadOptions);
            newValue = node.value;
          }
          if (wasMatch && options.monitor.change) {
            keepMonitoring = options.eventHandler({ name: "change", path: path2, value: newValue }) !== false;
          } else if (!wasMatch && options.monitor.add) {
            keepMonitoring = options.eventHandler({ name: "add", path: path2, value: newValue }) !== false;
          }
        } else if (wasMatch) {
          removeMatch(path2);
          if (options.monitor.remove) {
            keepMonitoring = options.eventHandler({ name: "remove", path: path2, value: oldValue }) !== false;
          }
        }
        if (keepMonitoring === false) {
          stopMonitoring();
        }
      };
      const childAddedCallback = (err, path2, newValue) => {
        const isMatch = queryFilters.every((filter) => {
          if (allowedTableScanOperators.includes(filter.op)) {
            return api.storage.test(newValue[filter.key], filter.op, filter.compare);
          } else {
            return filter.index.test(newValue, filter.op, filter.compare);
          }
        });
        let keepMonitoring = true;
        if (isMatch) {
          addMatch(path2);
          if (options.monitor.add) {
            keepMonitoring = options.eventHandler({ name: "add", path: path2, value: options.snapshots ? newValue : null }) !== false;
          }
        }
        if (keepMonitoring === false) {
          stopMonitoring();
        }
      };
      const childRemovedCallback = (err, path2, newValue, oldValue) => {
        let keepMonitoring = true;
        removeMatch(path2);
        if (options.monitor.remove) {
          keepMonitoring = options.eventHandler({ name: "remove", path: path2, value: options.snapshots ? oldValue : null }) !== false;
        }
        if (keepMonitoring === false) {
          stopMonitoring();
        }
      };
      if (options.monitor.add || options.monitor.change || options.monitor.remove) {
        api.subscribe(ref.path, "child_changed", childChangedCallback);
      }
      if (options.monitor.remove) {
        api.subscribe(ref.path, "notify_child_removed", childRemovedCallback);
      }
      if (options.monitor.add) {
        api.subscribe(ref.path, "child_added", childAddedCallback);
      }
    }
    return { results: matches, context: context2, stop };
  });
}
class LocalApi extends Api {
  constructor(dbname = "default", init2, readyCallback) {
    super();
    this.db = init2.db;
    const storageEnv = { logLevel: init2.settings.logLevel };
    if (typeof init2.settings.storage === "object") {
      if (SQLiteStorageSettings && init2.settings.storage instanceof SQLiteStorageSettings) {
        this.storage = new SQLiteStorage(dbname, init2.settings.storage, storageEnv);
      } else if (MSSQLStorageSettings && init2.settings.storage instanceof MSSQLStorageSettings) {
        this.storage = new MSSQLStorage(dbname, init2.settings.storage, storageEnv);
      } else if (CustomStorageSettings && init2.settings.storage instanceof CustomStorageSettings) {
        this.storage = new CustomStorage(dbname, init2.settings.storage, storageEnv);
      } else {
        const storageSettings = init2.settings.storage instanceof AceBaseStorageSettings ? init2.settings.storage : new AceBaseStorageSettings(init2.settings.storage);
        this.storage = new AceBaseStorage(dbname, storageSettings, storageEnv);
      }
    } else {
      this.storage = new AceBaseStorage(dbname, new AceBaseStorageSettings(), storageEnv);
    }
    this.storage.on("ready", readyCallback);
  }
  async stats(options) {
    return this.storage.stats;
  }
  subscribe(path, event, callback) {
    this.storage.subscriptions.add(path, event, callback);
  }
  unsubscribe(path, event, callback) {
    this.storage.subscriptions.remove(path, event, callback);
  }
  /**
   * Creates a new node or overwrites an existing node
   * @param path
   * @param value Any value will do. If the value is small enough to be stored in a parent record, it will take care of it
   * @returns returns a promise with the new cursor (if transaction logging is enabled)
   */
  async set(path, value, options = {
    suppress_events: false,
    context: null
  }) {
    const cursor = await this.storage.setNode(path, value, { suppress_events: options.suppress_events, context: options.context });
    return { ...cursor && { cursor } };
  }
  /**
   * Updates an existing node, or creates a new node.
   * @returns returns a promise with the new cursor (if transaction logging is enabled)
   */
  async update(path, updates, options = {
    suppress_events: false,
    context: null
  }) {
    const cursor = await this.storage.updateNode(path, updates, { suppress_events: options.suppress_events, context: options.context });
    return { ...cursor && { cursor } };
  }
  get transactionLoggingEnabled() {
    return this.storage.settings.transactions && this.storage.settings.transactions.log === true;
  }
  /**
   * Gets the value of a node
   * @param options when omitted retrieves all nested data. If `include` is set to an array of keys it will only return those children.
   * If `exclude` is set to an array of keys, those values will not be included
   */
  async get(path, options) {
    if (!options) {
      options = {};
    }
    if (typeof options.include !== "undefined" && !(options.include instanceof Array)) {
      throw new TypeError(`options.include must be an array of key names`);
    }
    if (typeof options.exclude !== "undefined" && !(options.exclude instanceof Array)) {
      throw new TypeError(`options.exclude must be an array of key names`);
    }
    if (["undefined", "boolean"].indexOf(typeof options.child_objects) < 0) {
      throw new TypeError(`options.child_objects must be a boolean`);
    }
    const node = await this.storage.getNode(path, options);
    return { value: node.value, context: { acebase_cursor: node.cursor }, cursor: node.cursor };
  }
  /**
   * Performs a transaction on a Node
   * @param path
   * @param callback callback is called with the current value. The returned value (or promise) will be used as the new value. When the callbacks returns undefined, the transaction will be canceled. When callback returns null, the node will be removed.
   * @returns returns a promise with the new cursor (if transaction logging is enabled)
   */
  async transaction(path, callback, options = {
    suppress_events: false,
    context: null
  }) {
    const cursor = await this.storage.transactNode(path, callback, { suppress_events: options.suppress_events, context: options.context });
    return { ...cursor && { cursor } };
  }
  async exists(path) {
    const nodeInfo = await this.storage.getNodeInfo(path);
    return nodeInfo.exists;
  }
  // query2(path, query, options = { snapshots: false, include: undefined, exclude: undefined, child_objects: undefined }) {
  //     /*
  //     Now that we're using indexes to filter data and order upon, each query requires a different strategy
  //     to get the results the quickest.
  //     So, we'll analyze the query first, build a strategy and then execute the strategy
  //     Analyze stage:
  //     - what path is being queried (wildcard path or single parent)
  //     - which indexes are available for the path
  //     - which indexes can be used for filtering
  //     - which indexes can be used for sorting
  //     - is take/skip used to limit the result set
  //     Strategy stage:
  //     - chain index filtering
  //     - ....
  //     TODO!
  //     */
  // }
  /**
   * @returns Returns a promise that resolves with matching data or paths in `results`
   */
  async query(path, query$1, options = { snapshots: false }) {
    const results = await query(this, path, query$1, options);
    return results;
  }
  /**
   * Creates an index on key for all child nodes at path
   */
  createIndex(path, key, options) {
    return this.storage.indexes.create(path, key, options);
  }
  /**
   * Gets all indexes
   */
  async getIndexes() {
    return this.storage.indexes.list();
  }
  /**
   * Deletes an existing index from the database
   */
  async deleteIndex(filePath) {
    return this.storage.indexes.delete(filePath);
  }
  async reflect(path, type, args) {
    args = args || {};
    const getChildren2 = async (path2, limit = 50, skip = 0, from2 = null) => {
      if (typeof limit === "string") {
        limit = parseInt(limit);
      }
      if (typeof skip === "string") {
        skip = parseInt(skip);
      }
      if (["null", "undefined"].includes(from2)) {
        from2 = null;
      }
      const children2 = [];
      let n2 = 0, stop = false, more = false;
      await this.storage.getChildren(path2).next((childInfo) => {
        if (stop) {
          more = true;
          return false;
        }
        n2++;
        const include = from2 !== null ? childInfo.key > from2 : skip === 0 || n2 > skip;
        if (include) {
          children2.push({
            key: typeof childInfo.key === "string" ? childInfo.key : childInfo.index,
            type: childInfo.valueTypeName,
            value: childInfo.value,
            // address is now only added when storage is acebase. Not when eg sqlite, mssql
            ...typeof childInfo.address === "object" && "pageNr" in childInfo.address && {
              address: {
                pageNr: childInfo.address.pageNr,
                recordNr: childInfo.address.recordNr
              }
            }
          });
        }
        stop = limit > 0 && children2.length === limit;
      }).catch((err) => {
        if (!(err instanceof NodeNotFoundError)) {
          throw err;
        }
      });
      return {
        more,
        list: children2
      };
    };
    switch (type) {
      case "children": {
        const result = await getChildren2(path, args.limit, args.skip, args.from);
        return result;
      }
      case "info": {
        const info = {
          key: "",
          exists: false,
          type: "unknown",
          value: void 0,
          address: void 0,
          children: {
            count: 0,
            more: false,
            list: []
          }
        };
        const nodeInfo = await this.storage.getNodeInfo(path, { include_child_count: args.child_count === true });
        info.key = typeof nodeInfo.key !== "undefined" ? nodeInfo.key : nodeInfo.index;
        info.exists = nodeInfo.exists;
        info.type = nodeInfo.exists ? nodeInfo.valueTypeName : void 0;
        info.value = nodeInfo.value;
        info.address = typeof nodeInfo.address === "object" && "pageNr" in nodeInfo.address ? {
          pageNr: nodeInfo.address.pageNr,
          recordNr: nodeInfo.address.recordNr
        } : void 0;
        const isObjectOrArray = nodeInfo.exists && nodeInfo.address && [VALUE_TYPES.OBJECT, VALUE_TYPES.ARRAY].includes(nodeInfo.type);
        if (args.child_count === true) {
          info.children = { count: isObjectOrArray ? nodeInfo.childCount : 0 };
        } else if (typeof args.child_limit === "number" && args.child_limit > 0) {
          if (isObjectOrArray) {
            info.children = await getChildren2(path, args.child_limit, args.child_skip, args.child_from);
          }
        }
        return info;
      }
    }
  }
  export(path, stream, options = {
    format: "json",
    type_safe: true
  }) {
    return this.storage.exportNode(path, stream, options);
  }
  import(path, read, options = {
    format: "json",
    suppress_events: false,
    method: "set"
  }) {
    return this.storage.importNode(path, read, options);
  }
  async setSchema(path, schema) {
    return this.storage.setSchema(path, schema);
  }
  async getSchema(path) {
    return this.storage.getSchema(path);
  }
  async getSchemas() {
    return this.storage.getSchemas();
  }
  async validateSchema(path, value, isUpdate) {
    return this.storage.validateSchema(path, value, { updates: isUpdate });
  }
  /**
   * Gets all relevant mutations for specific events on a path and since specified cursor
   */
  async getMutations(filter) {
    if (typeof this.storage.getMutations !== "function") {
      throw new Error("Used storage type does not support getMutations");
    }
    if (typeof filter !== "object") {
      throw new Error("No filter specified");
    }
    if (typeof filter.cursor !== "string" && typeof filter.timestamp !== "number") {
      throw new Error("No cursor or timestamp given");
    }
    return this.storage.getMutations(filter);
  }
  /**
   * Gets all relevant effective changes for specific events on a path and since specified cursor
   */
  async getChanges(filter) {
    if (typeof this.storage.getChanges !== "function") {
      throw new Error("Used storage type does not support getChanges");
    }
    if (typeof filter !== "object") {
      throw new Error("No filter specified");
    }
    if (typeof filter.cursor !== "string" && typeof filter.timestamp !== "number") {
      throw new Error("No cursor or timestamp given");
    }
    return this.storage.getChanges(filter);
  }
}
class LocalStorageSettings extends StorageSettings {
  constructor(settings) {
    super(settings);
    this.temp = false;
    this.multipleTabs = false;
    if (typeof settings.temp === "boolean") {
      this.temp = settings.temp;
    }
    if (typeof settings.provider === "object") {
      this.provider = settings.provider;
    }
    if (typeof settings.multipleTabs === "boolean") {
      this.multipleTabs = settings.multipleTabs;
    }
    if (typeof settings.logLevel === "string") {
      this.logLevel = settings.logLevel;
    }
    if (typeof settings.sponsor === "boolean") {
      this.sponsor = settings.sponsor;
    }
    ["type", "ipc", "path"].forEach((prop) => {
      if (prop in settings) {
        console.warn(`${prop} setting is not supported for AceBase LocalStorage`);
      }
    });
  }
}
class LocalStorageTransaction extends CustomStorageTransaction {
  constructor(context2, target) {
    super(target);
    this.context = context2;
    this._storageKeysPrefix = `${this.context.dbname}.acebase::`;
  }
  async commit() {
  }
  async rollback(err) {
  }
  async get(path) {
    const json = this.context.localStorage.getItem(this.getStorageKeyForPath(path));
    const val = JSON.parse(json);
    return val;
  }
  async set(path, val) {
    const json = JSON.stringify(val);
    this.context.localStorage.setItem(this.getStorageKeyForPath(path), json);
  }
  async remove(path) {
    this.context.localStorage.removeItem(this.getStorageKeyForPath(path));
  }
  async childrenOf(path, include, checkCallback, addCallback) {
    const pathInfo = CustomStorageHelpers.PathInfo.get(path);
    for (let i = 0; i < this.context.localStorage.length; i++) {
      const key = this.context.localStorage.key(i);
      if (!key.startsWith(this._storageKeysPrefix)) {
        continue;
      }
      const otherPath = this.getPathFromStorageKey(key);
      if (pathInfo.isParentOf(otherPath) && checkCallback(otherPath)) {
        let node;
        if (include.metadata || include.value) {
          const json = this.context.localStorage.getItem(key);
          node = JSON.parse(json);
        }
        const keepGoing = addCallback(otherPath, node);
        if (!keepGoing) {
          break;
        }
      }
    }
  }
  async descendantsOf(path, include, checkCallback, addCallback) {
    const pathInfo = CustomStorageHelpers.PathInfo.get(path);
    for (let i = 0; i < this.context.localStorage.length; i++) {
      const key = this.context.localStorage.key(i);
      if (!key.startsWith(this._storageKeysPrefix)) {
        continue;
      }
      const otherPath = this.getPathFromStorageKey(key);
      if (pathInfo.isAncestorOf(otherPath) && checkCallback(otherPath)) {
        let node;
        if (include.metadata || include.value) {
          const json = this.context.localStorage.getItem(key);
          node = JSON.parse(json);
        }
        const keepGoing = addCallback(otherPath, node);
        if (!keepGoing) {
          break;
        }
      }
    }
  }
  /**
   * Helper function to get the path from a localStorage key
   */
  getPathFromStorageKey(key) {
    return key.slice(this._storageKeysPrefix.length);
  }
  /**
   * Helper function to get the localStorage key for a path
   */
  getStorageKeyForPath(path) {
    return `${this._storageKeysPrefix}${path}`;
  }
}
function createLocalStorageInstance(dbname, init2 = {}) {
  const settings = new LocalStorageSettings(init2);
  const localStorage2 = settings.provider ? settings.provider : settings.temp ? window.localStorage : window.sessionStorage;
  const storageSettings = new CustomStorageSettings({
    name: "LocalStorage",
    locking: true,
    removeVoidProperties: settings.removeVoidProperties,
    maxInlineValueSize: settings.maxInlineValueSize,
    async ready() {
    },
    async getTransaction(target) {
      const context2 = {
        debug: true,
        dbname,
        localStorage: localStorage2
      };
      const transaction = new LocalStorageTransaction(context2, target);
      return transaction;
    }
  });
  const db = new BrowserAceBase(dbname, { logLevel: settings.logLevel, storage: storageSettings, sponsor: settings.sponsor });
  db.settings.ipcEvents = settings.multipleTabs === true;
  return db;
}
class IndexedDBStorageSettings extends StorageSettings {
  constructor(settings) {
    super(settings);
    this.multipleTabs = false;
    this.cacheSeconds = 60;
    this.sponsor = false;
    if (typeof settings.logLevel === "string") {
      this.logLevel = settings.logLevel;
    }
    if (typeof settings.multipleTabs === "boolean") {
      this.multipleTabs = settings.multipleTabs;
    }
    if (typeof settings.cacheSeconds === "number") {
      this.cacheSeconds = settings.cacheSeconds;
    }
    if (typeof settings.sponsor === "boolean") {
      this.sponsor = settings.sponsor;
    }
    ["type", "ipc", "path"].forEach((prop) => {
      if (prop in settings) {
        console.warn(`${prop} setting is not supported for AceBase IndexedDBStorage`);
      }
    });
  }
}
class AceBaseLocalSettings extends AceBaseBaseSettings {
  constructor(options = {}) {
    super(options);
    if (options.storage) {
      this.storage = options.storage;
      if (options.ipc) {
        this.storage.ipc = options.ipc;
      }
      if (options.transactions) {
        this.storage.transactions = options.transactions;
      }
    }
  }
}
class AceBase extends AceBaseBase {
  /**
   * @param dbname Name of the database to open or create
   */
  constructor(dbname, init2 = {}) {
    const settings = new AceBaseLocalSettings(init2);
    super(dbname, settings);
    this.recovery = {
      /**
       * Repairs a node that cannot be loaded by removing the reference from its parent, or marking it as removed
       */
      repairNode: async (path, options) => {
        await this.ready();
        if (this.api.storage instanceof AceBaseStorage) {
          await this.api.storage.repairNode(path, options);
        } else if (!this.api.storage.repairNode) {
          throw new Error(`repairNode is not supported with chosen storage engine`);
        }
      },
      /**
       * Repairs a node that uses a B+Tree for its keys (100+ children).
       * See https://github.com/appy-one/acebase/issues/183
       * @param path Target path to fix
       */
      repairNodeTree: async (path) => {
        await this.ready();
        const storage = this.api.storage;
        await storage.repairNodeTree(path);
      }
    };
    const apiSettings = {
      db: this,
      settings
    };
    this.api = new LocalApi(dbname, apiSettings, () => {
      this.emit("ready");
    });
  }
  async close() {
    await this.api.storage.close();
  }
  get settings() {
    const ipc = this.api.storage.ipc, debug2 = this.debug;
    return {
      get logLevel() {
        return debug2.level;
      },
      set logLevel(level) {
        debug2.setLevel(level);
      },
      get ipcEvents() {
        return ipc.eventsEnabled;
      },
      set ipcEvents(enabled) {
        ipc.eventsEnabled = enabled;
      }
    };
  }
  /**
   * Creates an AceBase database instance using LocalStorage or SessionStorage as storage engine. When running in non-browser environments, set
   * settings.provider to a custom LocalStorage provider, eg 'node-localstorage'
   * @param dbname Name of the database
   * @param settings optional settings
   */
  static WithLocalStorage(dbname, settings = {}) {
    const db = createLocalStorageInstance(dbname, settings);
    return db;
  }
  /**
   * Creates an AceBase database instance using IndexedDB as storage engine. Only available in browser contexts!
   * @param dbname Name of the database
   * @param settings optional settings
   */
  static WithIndexedDB(dbname, init2 = {}) {
    throw new Error(`IndexedDB storage can only be used in browser contexts`);
  }
}
function _requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = (event) => {
      return resolve(request.result || null);
    };
    request.onerror = reject;
  });
}
class IndexedDBStorageTransaction extends CustomStorageTransaction {
  /**
   * Creates a transaction object for IndexedDB usage. Because IndexedDB automatically commits
   * transactions when they have not been touched for a number of microtasks (eg promises
   * resolving whithout querying data), we will enqueue set and remove operations until commit
   * or rollback. We'll create separate IndexedDB transactions for get operations, caching their
   * values to speed up successive requests for the same data.
   */
  constructor(context2, target) {
    super(target);
    this.context = context2;
    this.production = true;
    this._pending = [];
  }
  _createTransaction(write = false) {
    const tx = this.context.db.transaction(["nodes", "content"], write ? "readwrite" : "readonly");
    return tx;
  }
  _splitMetadata(node) {
    const value = node.value;
    const copy = { ...node };
    delete copy.value;
    const metadata = copy;
    return { metadata, value };
  }
  async commit() {
    if (this._pending.length === 0) {
      return;
    }
    const batch = this._pending.splice(0);
    this.context.ipc.sendNotification({ action: "cache.invalidate", paths: batch.map((op) => op.path) });
    const tx = this._createTransaction(true);
    try {
      await new Promise((resolve, reject) => {
        let stop = false, processed = 0;
        const handleError = (err) => {
          stop = true;
          reject(err);
        };
        const handleSuccess = () => {
          if (++processed === batch.length) {
            resolve();
          }
        };
        batch.forEach((op, i) => {
          if (stop) {
            return;
          }
          let r1, r2;
          const path = op.path;
          if (op.action === "set") {
            const { metadata, value } = this._splitMetadata(op.node);
            const nodeInfo = { path, metadata };
            r1 = tx.objectStore("nodes").put(nodeInfo);
            r2 = tx.objectStore("content").put(value, path);
            this.context.cache.set(path, op.node);
          } else if (op.action === "remove") {
            r1 = tx.objectStore("content").delete(path);
            r2 = tx.objectStore("nodes").delete(path);
            this.context.cache.set(path, null);
          } else {
            handleError(new Error(`Unknown pending operation "${op.action}" on path "${path}" `));
          }
          let succeeded = 0;
          r1.onsuccess = r2.onsuccess = () => {
            if (++succeeded === 2) {
              handleSuccess();
            }
          };
          r1.onerror = r2.onerror = handleError;
        });
      });
      tx.commit && tx.commit();
    } catch (err) {
      console.error(err);
      tx.abort && tx.abort();
      throw err;
    }
  }
  async rollback(err) {
    this._pending = [];
  }
  async get(path) {
    if (this.context.cache.has(path)) {
      const cache = this.context.cache.get(path);
      return cache;
    }
    const tx = this._createTransaction(false);
    const r1 = _requestToPromise(tx.objectStore("nodes").get(path));
    const r2 = _requestToPromise(tx.objectStore("content").get(path));
    try {
      const results = await Promise.all([r1, r2]);
      tx.commit && tx.commit();
      const info = results[0];
      if (!info) {
        this.context.cache.set(path, null);
        return null;
      }
      const node = info.metadata;
      node.value = results[1];
      this.context.cache.set(path, node);
      return node;
    } catch (err) {
      console.error(`IndexedDB get error`, err);
      tx.abort && tx.abort();
      throw err;
    }
  }
  set(path, node) {
    this._pending.push({ action: "set", path, node });
  }
  remove(path) {
    this._pending.push({ action: "remove", path });
  }
  async removeMultiple(paths) {
    paths.forEach((path) => {
      this._pending.push({ action: "remove", path });
    });
  }
  childrenOf(path, include, checkCallback, addCallback) {
    return this._getChildrenOf(path, { ...include, descendants: false }, checkCallback, addCallback);
  }
  descendantsOf(path, include, checkCallback, addCallback) {
    return this._getChildrenOf(path, { ...include, descendants: true }, checkCallback, addCallback);
  }
  _getChildrenOf(path, include, checkCallback, addCallback) {
    return new Promise((resolve, reject) => {
      const pathInfo = CustomStorageHelpers.PathInfo.get(path);
      const tx = this._createTransaction(false);
      const store = tx.objectStore("nodes");
      const query2 = IDBKeyRange.lowerBound(path, true);
      const cursor = include.metadata ? store.openCursor(query2) : store.openKeyCursor(query2);
      cursor.onerror = (e) => {
        var _a2;
        (_a2 = tx.abort) == null ? void 0 : _a2.call(tx);
        reject(e);
      };
      cursor.onsuccess = async (e) => {
        var _a2, _b;
        const otherPath = ((_a2 = cursor.result) == null ? void 0 : _a2.key) ?? null;
        let keepGoing = true;
        if (otherPath === null) {
          keepGoing = false;
        } else if (!pathInfo.isAncestorOf(otherPath)) {
          keepGoing = false;
        } else if (include.descendants || pathInfo.isParentOf(otherPath)) {
          let node;
          if (include.metadata) {
            const valueCursor = cursor;
            const data = valueCursor.result.value;
            node = data.metadata;
          }
          const shouldAdd = checkCallback(otherPath, node);
          if (shouldAdd) {
            if (include.value) {
              if (this.context.cache.has(otherPath)) {
                const cache = this.context.cache.get(otherPath);
                node.value = cache.value;
              } else {
                const req = tx.objectStore("content").get(otherPath);
                node.value = await new Promise((resolve2, reject2) => {
                  req.onerror = (e2) => {
                    resolve2(null);
                  };
                  req.onsuccess = (e2) => {
                    resolve2(req.result);
                  };
                });
                this.context.cache.set(otherPath, node.value === null ? null : node);
              }
            }
            keepGoing = addCallback(otherPath, node);
          }
        }
        if (keepGoing) {
          try {
            cursor.result.continue();
          } catch (err) {
            keepGoing = false;
          }
        }
        if (!keepGoing) {
          (_b = tx.commit) == null ? void 0 : _b.call(tx);
          resolve();
        }
      };
    });
  }
}
function createIndexedDBInstance(dbname, init2 = {}) {
  const settings = new IndexedDBStorageSettings(init2);
  const IndexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  const request = IndexedDB.open(`${dbname}.acebase`, 1);
  request.onupgradeneeded = (e) => {
    const db2 = request.result;
    db2.createObjectStore("nodes", { keyPath: "path" });
    db2.createObjectStore("content");
  };
  let idb;
  const readyPromise = new Promise((resolve, reject) => {
    request.onsuccess = (e) => {
      idb = request.result;
      resolve();
    };
    request.onerror = (e) => {
      reject(e);
    };
  });
  const cache = new SimpleCache(typeof settings.cacheSeconds === "number" ? settings.cacheSeconds : 60);
  const storageSettings = new CustomStorageSettings({
    name: "IndexedDB",
    locking: true,
    removeVoidProperties: settings.removeVoidProperties,
    maxInlineValueSize: settings.maxInlineValueSize,
    lockTimeout: settings.lockTimeout,
    ready() {
      return readyPromise;
    },
    async getTransaction(target) {
      await readyPromise;
      const context2 = {
        debug: false,
        db: idb,
        cache,
        ipc
      };
      return new IndexedDBStorageTransaction(context2, target);
    }
  });
  const db = new BrowserAceBase(dbname, {
    logLevel: settings.logLevel,
    storage: storageSettings,
    sponsor: settings.sponsor
    // isolated: settings.isolated,
  });
  const ipc = db.api.storage.ipc;
  db.settings.ipcEvents = settings.multipleTabs === true;
  ipc.on("notification", async (notification) => {
    const message = notification.data;
    if (typeof message !== "object") {
      return;
    }
    if (message.action === "cache.invalidate") {
      for (const path of message.paths) {
        cache.remove(path);
      }
    }
  });
  return db;
}
const deprecatedConstructorError = `Using AceBase constructor in the browser to use localStorage is deprecated!
Switch to:
IndexedDB implementation (FASTER, MORE RELIABLE):
    let db = AceBase.WithIndexedDB(name, settings)
Or, new LocalStorage implementation:
    let db = AceBase.WithLocalStorage(name, settings)
Or, write your own CustomStorage adapter:
    let myCustomStorage = new CustomStorageSettings({ ... });
    let db = new AceBase(name, { storage: myCustomStorage })`;
class BrowserAceBase extends AceBase {
  /**
   * Constructor that is used in browser context
   * @param name database name
   * @param settings settings
   */
  constructor(name, settings) {
    if (typeof settings !== "object" || typeof settings.storage !== "object") {
      throw new Error(deprecatedConstructorError);
    }
    super(name, settings);
    this.settings.ipcEvents = settings.multipleTabs === true;
  }
  /**
   * Creates an AceBase database instance using IndexedDB as storage engine
   * @param dbname Name of the database
   * @param settings optional settings
   */
  static WithIndexedDB(dbname, init2 = {}) {
    return createIndexedDBInstance(dbname, init2);
  }
}
const acebase = {
  AceBase: BrowserAceBase,
  AceBaseLocalSettings,
  DataReference,
  DataSnapshot,
  EventSubscription,
  PathReference,
  TypeMappings,
  CustomStorageSettings,
  CustomStorageTransaction,
  CustomStorageHelpers,
  ID,
  proxyAccess,
  DataSnapshotsArray
};
window.acebase = acebase;
window.AceBase = BrowserAceBase;
class LuxonError extends Error {
}
class InvalidDateTimeError extends LuxonError {
  constructor(reason) {
    super(`Invalid DateTime: ${reason.toMessage()}`);
  }
}
class InvalidIntervalError extends LuxonError {
  constructor(reason) {
    super(`Invalid Interval: ${reason.toMessage()}`);
  }
}
class InvalidDurationError extends LuxonError {
  constructor(reason) {
    super(`Invalid Duration: ${reason.toMessage()}`);
  }
}
class ConflictingSpecificationError extends LuxonError {
}
class InvalidUnitError extends LuxonError {
  constructor(unit) {
    super(`Invalid unit ${unit}`);
  }
}
class InvalidArgumentError extends LuxonError {
}
class ZoneIsAbstractError extends LuxonError {
  constructor() {
    super("Zone is an abstract class");
  }
}
const n = "numeric", s = "short", l = "long";
const DATE_SHORT = {
  year: n,
  month: n,
  day: n
};
const DATE_MED = {
  year: n,
  month: s,
  day: n
};
const DATE_MED_WITH_WEEKDAY = {
  year: n,
  month: s,
  day: n,
  weekday: s
};
const DATE_FULL = {
  year: n,
  month: l,
  day: n
};
const DATE_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l
};
const TIME_SIMPLE = {
  hour: n,
  minute: n
};
const TIME_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n
};
const TIME_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s
};
const TIME_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l
};
const TIME_24_SIMPLE = {
  hour: n,
  minute: n,
  hourCycle: "h23"
};
const TIME_24_WITH_SECONDS = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23"
};
const TIME_24_WITH_SHORT_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23",
  timeZoneName: s
};
const TIME_24_WITH_LONG_OFFSET = {
  hour: n,
  minute: n,
  second: n,
  hourCycle: "h23",
  timeZoneName: l
};
const DATETIME_SHORT = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n
};
const DATETIME_SHORT_WITH_SECONDS = {
  year: n,
  month: n,
  day: n,
  hour: n,
  minute: n,
  second: n
};
const DATETIME_MED = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n
};
const DATETIME_MED_WITH_SECONDS = {
  year: n,
  month: s,
  day: n,
  hour: n,
  minute: n,
  second: n
};
const DATETIME_MED_WITH_WEEKDAY = {
  year: n,
  month: s,
  day: n,
  weekday: s,
  hour: n,
  minute: n
};
const DATETIME_FULL = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  timeZoneName: s
};
const DATETIME_FULL_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: s
};
const DATETIME_HUGE = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  timeZoneName: l
};
const DATETIME_HUGE_WITH_SECONDS = {
  year: n,
  month: l,
  day: n,
  weekday: l,
  hour: n,
  minute: n,
  second: n,
  timeZoneName: l
};
class Zone {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type() {
    throw new ZoneIsAbstractError();
  }
  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name() {
    throw new ZoneIsAbstractError();
  }
  get ianaName() {
    return this.name;
  }
  /**
   * Returns whether the offset is known to be fixed for the whole year.
   * @abstract
   * @type {boolean}
   */
  get isUniversal() {
    throw new ZoneIsAbstractError();
  }
  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} opts - Options to affect the format
   * @param {string} opts.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} opts.locale - What locale to return the offset name in.
   * @return {string}
   */
  offsetName(ts, opts) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(ts, format) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(ts) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(otherZone) {
    throw new ZoneIsAbstractError();
  }
  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid() {
    throw new ZoneIsAbstractError();
  }
}
let singleton$1 = null;
class SystemZone extends Zone {
  /**
   * Get a singleton instance of the local zone
   * @return {SystemZone}
   */
  static get instance() {
    if (singleton$1 === null) {
      singleton$1 = new SystemZone();
    }
    return singleton$1;
  }
  /** @override **/
  get type() {
    return "system";
  }
  /** @override **/
  get name() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  /** @override **/
  get isUniversal() {
    return false;
  }
  /** @override **/
  offsetName(ts, { format, locale }) {
    return parseZoneInfo(ts, format, locale);
  }
  /** @override **/
  formatOffset(ts, format) {
    return formatOffset(this.offset(ts), format);
  }
  /** @override **/
  offset(ts) {
    return -new Date(ts).getTimezoneOffset();
  }
  /** @override **/
  equals(otherZone) {
    return otherZone.type === "system";
  }
  /** @override **/
  get isValid() {
    return true;
  }
}
let dtfCache = {};
function makeDTF(zone) {
  if (!dtfCache[zone]) {
    dtfCache[zone] = new Intl.DateTimeFormat("en-US", {
      hour12: false,
      timeZone: zone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      era: "short"
    });
  }
  return dtfCache[zone];
}
const typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  era: 3,
  hour: 4,
  minute: 5,
  second: 6
};
function hackyOffset(dtf, date) {
  const formatted = dtf.format(date).replace(/\u200E/g, ""), parsed = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(formatted), [, fMonth, fDay, fYear, fadOrBc, fHour, fMinute, fSecond] = parsed;
  return [fYear, fMonth, fDay, fadOrBc, fHour, fMinute, fSecond];
}
function partsOffset(dtf, date) {
  const formatted = dtf.formatToParts(date);
  const filled = [];
  for (let i = 0; i < formatted.length; i++) {
    const { type, value } = formatted[i];
    const pos = typeToPos[type];
    if (type === "era") {
      filled[pos] = value;
    } else if (!isUndefined(pos)) {
      filled[pos] = parseInt(value, 10);
    }
  }
  return filled;
}
let ianaZoneCache = {};
class IANAZone extends Zone {
  /**
   * @param {string} name - Zone name
   * @return {IANAZone}
   */
  static create(name) {
    if (!ianaZoneCache[name]) {
      ianaZoneCache[name] = new IANAZone(name);
    }
    return ianaZoneCache[name];
  }
  /**
   * Reset local caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCache() {
    ianaZoneCache = {};
    dtfCache = {};
  }
  /**
   * Returns whether the provided string is a valid specifier. This only checks the string's format, not that the specifier identifies a known zone; see isValidZone for that.
   * @param {string} s - The string to check validity on
   * @example IANAZone.isValidSpecifier("America/New_York") //=> true
   * @example IANAZone.isValidSpecifier("Sport~~blorp") //=> false
   * @deprecated This method returns false for some valid IANA names. Use isValidZone instead.
   * @return {boolean}
   */
  static isValidSpecifier(s2) {
    return this.isValidZone(s2);
  }
  /**
   * Returns whether the provided string identifies a real zone
   * @param {string} zone - The string to check
   * @example IANAZone.isValidZone("America/New_York") //=> true
   * @example IANAZone.isValidZone("Fantasia/Castle") //=> false
   * @example IANAZone.isValidZone("Sport~~blorp") //=> false
   * @return {boolean}
   */
  static isValidZone(zone) {
    if (!zone) {
      return false;
    }
    try {
      new Intl.DateTimeFormat("en-US", { timeZone: zone }).format();
      return true;
    } catch (e) {
      return false;
    }
  }
  constructor(name) {
    super();
    this.zoneName = name;
    this.valid = IANAZone.isValidZone(name);
  }
  /** @override **/
  get type() {
    return "iana";
  }
  /** @override **/
  get name() {
    return this.zoneName;
  }
  /** @override **/
  get isUniversal() {
    return false;
  }
  /** @override **/
  offsetName(ts, { format, locale }) {
    return parseZoneInfo(ts, format, locale, this.name);
  }
  /** @override **/
  formatOffset(ts, format) {
    return formatOffset(this.offset(ts), format);
  }
  /** @override **/
  offset(ts) {
    const date = new Date(ts);
    if (isNaN(date))
      return NaN;
    const dtf = makeDTF(this.name);
    let [year, month, day, adOrBc, hour, minute, second] = dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date);
    if (adOrBc === "BC") {
      year = -Math.abs(year) + 1;
    }
    const adjustedHour = hour === 24 ? 0 : hour;
    const asUTC = objToLocalTS({
      year,
      month,
      day,
      hour: adjustedHour,
      minute,
      second,
      millisecond: 0
    });
    let asTS = +date;
    const over = asTS % 1e3;
    asTS -= over >= 0 ? over : 1e3 + over;
    return (asUTC - asTS) / (60 * 1e3);
  }
  /** @override **/
  equals(otherZone) {
    return otherZone.type === "iana" && otherZone.name === this.name;
  }
  /** @override **/
  get isValid() {
    return this.valid;
  }
}
let intlLFCache = {};
function getCachedLF(locString, opts = {}) {
  const key = JSON.stringify([locString, opts]);
  let dtf = intlLFCache[key];
  if (!dtf) {
    dtf = new Intl.ListFormat(locString, opts);
    intlLFCache[key] = dtf;
  }
  return dtf;
}
let intlDTCache = {};
function getCachedDTF(locString, opts = {}) {
  const key = JSON.stringify([locString, opts]);
  let dtf = intlDTCache[key];
  if (!dtf) {
    dtf = new Intl.DateTimeFormat(locString, opts);
    intlDTCache[key] = dtf;
  }
  return dtf;
}
let intlNumCache = {};
function getCachedINF(locString, opts = {}) {
  const key = JSON.stringify([locString, opts]);
  let inf = intlNumCache[key];
  if (!inf) {
    inf = new Intl.NumberFormat(locString, opts);
    intlNumCache[key] = inf;
  }
  return inf;
}
let intlRelCache = {};
function getCachedRTF(locString, opts = {}) {
  const { base: base2, ...cacheKeyOpts } = opts;
  const key = JSON.stringify([locString, cacheKeyOpts]);
  let inf = intlRelCache[key];
  if (!inf) {
    inf = new Intl.RelativeTimeFormat(locString, opts);
    intlRelCache[key] = inf;
  }
  return inf;
}
let sysLocaleCache = null;
function systemLocale() {
  if (sysLocaleCache) {
    return sysLocaleCache;
  } else {
    sysLocaleCache = new Intl.DateTimeFormat().resolvedOptions().locale;
    return sysLocaleCache;
  }
}
function parseLocaleString(localeStr) {
  const xIndex = localeStr.indexOf("-x-");
  if (xIndex !== -1) {
    localeStr = localeStr.substring(0, xIndex);
  }
  const uIndex = localeStr.indexOf("-u-");
  if (uIndex === -1) {
    return [localeStr];
  } else {
    let options;
    let selectedStr;
    try {
      options = getCachedDTF(localeStr).resolvedOptions();
      selectedStr = localeStr;
    } catch (e) {
      const smaller = localeStr.substring(0, uIndex);
      options = getCachedDTF(smaller).resolvedOptions();
      selectedStr = smaller;
    }
    const { numberingSystem, calendar } = options;
    return [selectedStr, numberingSystem, calendar];
  }
}
function intlConfigString(localeStr, numberingSystem, outputCalendar) {
  if (outputCalendar || numberingSystem) {
    if (!localeStr.includes("-u-")) {
      localeStr += "-u";
    }
    if (outputCalendar) {
      localeStr += `-ca-${outputCalendar}`;
    }
    if (numberingSystem) {
      localeStr += `-nu-${numberingSystem}`;
    }
    return localeStr;
  } else {
    return localeStr;
  }
}
function mapMonths(f) {
  const ms2 = [];
  for (let i = 1; i <= 12; i++) {
    const dt = DateTime.utc(2016, i, 1);
    ms2.push(f(dt));
  }
  return ms2;
}
function mapWeekdays(f) {
  const ms2 = [];
  for (let i = 1; i <= 7; i++) {
    const dt = DateTime.utc(2016, 11, 13 + i);
    ms2.push(f(dt));
  }
  return ms2;
}
function listStuff(loc, length, defaultOK, englishFn, intlFn) {
  const mode = loc.listingMode(defaultOK);
  if (mode === "error") {
    return null;
  } else if (mode === "en") {
    return englishFn(length);
  } else {
    return intlFn(length);
  }
}
function supportsFastNumbers(loc) {
  if (loc.numberingSystem && loc.numberingSystem !== "latn") {
    return false;
  } else {
    return loc.numberingSystem === "latn" || !loc.locale || loc.locale.startsWith("en") || new Intl.DateTimeFormat(loc.intl).resolvedOptions().numberingSystem === "latn";
  }
}
class PolyNumberFormatter {
  constructor(intl, forceSimple, opts) {
    this.padTo = opts.padTo || 0;
    this.floor = opts.floor || false;
    const { padTo, floor, ...otherOpts } = opts;
    if (!forceSimple || Object.keys(otherOpts).length > 0) {
      const intlOpts = { useGrouping: false, ...opts };
      if (opts.padTo > 0)
        intlOpts.minimumIntegerDigits = opts.padTo;
      this.inf = getCachedINF(intl, intlOpts);
    }
  }
  format(i) {
    if (this.inf) {
      const fixed = this.floor ? Math.floor(i) : i;
      return this.inf.format(fixed);
    } else {
      const fixed = this.floor ? Math.floor(i) : roundTo(i, 3);
      return padStart(fixed, this.padTo);
    }
  }
}
class PolyDateFormatter {
  constructor(dt, intl, opts) {
    this.opts = opts;
    this.originalZone = void 0;
    let z = void 0;
    if (this.opts.timeZone) {
      this.dt = dt;
    } else if (dt.zone.type === "fixed") {
      const gmtOffset = -1 * (dt.offset / 60);
      const offsetZ = gmtOffset >= 0 ? `Etc/GMT+${gmtOffset}` : `Etc/GMT${gmtOffset}`;
      if (dt.offset !== 0 && IANAZone.create(offsetZ).valid) {
        z = offsetZ;
        this.dt = dt;
      } else {
        z = "UTC";
        this.dt = dt.offset === 0 ? dt : dt.setZone("UTC").plus({ minutes: dt.offset });
        this.originalZone = dt.zone;
      }
    } else if (dt.zone.type === "system") {
      this.dt = dt;
    } else if (dt.zone.type === "iana") {
      this.dt = dt;
      z = dt.zone.name;
    } else {
      z = "UTC";
      this.dt = dt.setZone("UTC").plus({ minutes: dt.offset });
      this.originalZone = dt.zone;
    }
    const intlOpts = { ...this.opts };
    intlOpts.timeZone = intlOpts.timeZone || z;
    this.dtf = getCachedDTF(intl, intlOpts);
  }
  format() {
    if (this.originalZone) {
      return this.formatToParts().map(({ value }) => value).join("");
    }
    return this.dtf.format(this.dt.toJSDate());
  }
  formatToParts() {
    const parts = this.dtf.formatToParts(this.dt.toJSDate());
    if (this.originalZone) {
      return parts.map((part) => {
        if (part.type === "timeZoneName") {
          const offsetName = this.originalZone.offsetName(this.dt.ts, {
            locale: this.dt.locale,
            format: this.opts.timeZoneName
          });
          return {
            ...part,
            value: offsetName
          };
        } else {
          return part;
        }
      });
    }
    return parts;
  }
  resolvedOptions() {
    return this.dtf.resolvedOptions();
  }
}
class PolyRelFormatter {
  constructor(intl, isEnglish, opts) {
    this.opts = { style: "long", ...opts };
    if (!isEnglish && hasRelative()) {
      this.rtf = getCachedRTF(intl, opts);
    }
  }
  format(count, unit) {
    if (this.rtf) {
      return this.rtf.format(count, unit);
    } else {
      return formatRelativeTime(unit, count, this.opts.numeric, this.opts.style !== "long");
    }
  }
  formatToParts(count, unit) {
    if (this.rtf) {
      return this.rtf.formatToParts(count, unit);
    } else {
      return [];
    }
  }
}
class Locale {
  static fromOpts(opts) {
    return Locale.create(opts.locale, opts.numberingSystem, opts.outputCalendar, opts.defaultToEN);
  }
  static create(locale, numberingSystem, outputCalendar, defaultToEN = false) {
    const specifiedLocale = locale || Settings.defaultLocale;
    const localeR = specifiedLocale || (defaultToEN ? "en-US" : systemLocale());
    const numberingSystemR = numberingSystem || Settings.defaultNumberingSystem;
    const outputCalendarR = outputCalendar || Settings.defaultOutputCalendar;
    return new Locale(localeR, numberingSystemR, outputCalendarR, specifiedLocale);
  }
  static resetCache() {
    sysLocaleCache = null;
    intlDTCache = {};
    intlNumCache = {};
    intlRelCache = {};
  }
  static fromObject({ locale, numberingSystem, outputCalendar } = {}) {
    return Locale.create(locale, numberingSystem, outputCalendar);
  }
  constructor(locale, numbering, outputCalendar, specifiedLocale) {
    const [parsedLocale, parsedNumberingSystem, parsedOutputCalendar] = parseLocaleString(locale);
    this.locale = parsedLocale;
    this.numberingSystem = numbering || parsedNumberingSystem || null;
    this.outputCalendar = outputCalendar || parsedOutputCalendar || null;
    this.intl = intlConfigString(this.locale, this.numberingSystem, this.outputCalendar);
    this.weekdaysCache = { format: {}, standalone: {} };
    this.monthsCache = { format: {}, standalone: {} };
    this.meridiemCache = null;
    this.eraCache = {};
    this.specifiedLocale = specifiedLocale;
    this.fastNumbersCached = null;
  }
  get fastNumbers() {
    if (this.fastNumbersCached == null) {
      this.fastNumbersCached = supportsFastNumbers(this);
    }
    return this.fastNumbersCached;
  }
  listingMode() {
    const isActuallyEn = this.isEnglish();
    const hasNoWeirdness = (this.numberingSystem === null || this.numberingSystem === "latn") && (this.outputCalendar === null || this.outputCalendar === "gregory");
    return isActuallyEn && hasNoWeirdness ? "en" : "intl";
  }
  clone(alts) {
    if (!alts || Object.getOwnPropertyNames(alts).length === 0) {
      return this;
    } else {
      return Locale.create(
        alts.locale || this.specifiedLocale,
        alts.numberingSystem || this.numberingSystem,
        alts.outputCalendar || this.outputCalendar,
        alts.defaultToEN || false
      );
    }
  }
  redefaultToEN(alts = {}) {
    return this.clone({ ...alts, defaultToEN: true });
  }
  redefaultToSystem(alts = {}) {
    return this.clone({ ...alts, defaultToEN: false });
  }
  months(length, format = false, defaultOK = true) {
    return listStuff(this, length, defaultOK, months, () => {
      const intl = format ? { month: length, day: "numeric" } : { month: length }, formatStr = format ? "format" : "standalone";
      if (!this.monthsCache[formatStr][length]) {
        this.monthsCache[formatStr][length] = mapMonths((dt) => this.extract(dt, intl, "month"));
      }
      return this.monthsCache[formatStr][length];
    });
  }
  weekdays(length, format = false, defaultOK = true) {
    return listStuff(this, length, defaultOK, weekdays, () => {
      const intl = format ? { weekday: length, year: "numeric", month: "long", day: "numeric" } : { weekday: length }, formatStr = format ? "format" : "standalone";
      if (!this.weekdaysCache[formatStr][length]) {
        this.weekdaysCache[formatStr][length] = mapWeekdays(
          (dt) => this.extract(dt, intl, "weekday")
        );
      }
      return this.weekdaysCache[formatStr][length];
    });
  }
  meridiems(defaultOK = true) {
    return listStuff(
      this,
      void 0,
      defaultOK,
      () => meridiems,
      () => {
        if (!this.meridiemCache) {
          const intl = { hour: "numeric", hourCycle: "h12" };
          this.meridiemCache = [DateTime.utc(2016, 11, 13, 9), DateTime.utc(2016, 11, 13, 19)].map(
            (dt) => this.extract(dt, intl, "dayperiod")
          );
        }
        return this.meridiemCache;
      }
    );
  }
  eras(length, defaultOK = true) {
    return listStuff(this, length, defaultOK, eras, () => {
      const intl = { era: length };
      if (!this.eraCache[length]) {
        this.eraCache[length] = [DateTime.utc(-40, 1, 1), DateTime.utc(2017, 1, 1)].map(
          (dt) => this.extract(dt, intl, "era")
        );
      }
      return this.eraCache[length];
    });
  }
  extract(dt, intlOpts, field) {
    const df = this.dtFormatter(dt, intlOpts), results = df.formatToParts(), matching = results.find((m2) => m2.type.toLowerCase() === field);
    return matching ? matching.value : null;
  }
  numberFormatter(opts = {}) {
    return new PolyNumberFormatter(this.intl, opts.forceSimple || this.fastNumbers, opts);
  }
  dtFormatter(dt, intlOpts = {}) {
    return new PolyDateFormatter(dt, this.intl, intlOpts);
  }
  relFormatter(opts = {}) {
    return new PolyRelFormatter(this.intl, this.isEnglish(), opts);
  }
  listFormatter(opts = {}) {
    return getCachedLF(this.intl, opts);
  }
  isEnglish() {
    return this.locale === "en" || this.locale.toLowerCase() === "en-us" || new Intl.DateTimeFormat(this.intl).resolvedOptions().locale.startsWith("en-us");
  }
  equals(other) {
    return this.locale === other.locale && this.numberingSystem === other.numberingSystem && this.outputCalendar === other.outputCalendar;
  }
}
let singleton = null;
class FixedOffsetZone extends Zone {
  /**
   * Get a singleton instance of UTC
   * @return {FixedOffsetZone}
   */
  static get utcInstance() {
    if (singleton === null) {
      singleton = new FixedOffsetZone(0);
    }
    return singleton;
  }
  /**
   * Get an instance with a specified offset
   * @param {number} offset - The offset in minutes
   * @return {FixedOffsetZone}
   */
  static instance(offset2) {
    return offset2 === 0 ? FixedOffsetZone.utcInstance : new FixedOffsetZone(offset2);
  }
  /**
   * Get an instance of FixedOffsetZone from a UTC offset string, like "UTC+6"
   * @param {string} s - The offset string to parse
   * @example FixedOffsetZone.parseSpecifier("UTC+6")
   * @example FixedOffsetZone.parseSpecifier("UTC+06")
   * @example FixedOffsetZone.parseSpecifier("UTC-6:00")
   * @return {FixedOffsetZone}
   */
  static parseSpecifier(s2) {
    if (s2) {
      const r = s2.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (r) {
        return new FixedOffsetZone(signedOffset(r[1], r[2]));
      }
    }
    return null;
  }
  constructor(offset2) {
    super();
    this.fixed = offset2;
  }
  /** @override **/
  get type() {
    return "fixed";
  }
  /** @override **/
  get name() {
    return this.fixed === 0 ? "UTC" : `UTC${formatOffset(this.fixed, "narrow")}`;
  }
  get ianaName() {
    if (this.fixed === 0) {
      return "Etc/UTC";
    } else {
      return `Etc/GMT${formatOffset(-this.fixed, "narrow")}`;
    }
  }
  /** @override **/
  offsetName() {
    return this.name;
  }
  /** @override **/
  formatOffset(ts, format) {
    return formatOffset(this.fixed, format);
  }
  /** @override **/
  get isUniversal() {
    return true;
  }
  /** @override **/
  offset() {
    return this.fixed;
  }
  /** @override **/
  equals(otherZone) {
    return otherZone.type === "fixed" && otherZone.fixed === this.fixed;
  }
  /** @override **/
  get isValid() {
    return true;
  }
}
class InvalidZone extends Zone {
  constructor(zoneName) {
    super();
    this.zoneName = zoneName;
  }
  /** @override **/
  get type() {
    return "invalid";
  }
  /** @override **/
  get name() {
    return this.zoneName;
  }
  /** @override **/
  get isUniversal() {
    return false;
  }
  /** @override **/
  offsetName() {
    return null;
  }
  /** @override **/
  formatOffset() {
    return "";
  }
  /** @override **/
  offset() {
    return NaN;
  }
  /** @override **/
  equals() {
    return false;
  }
  /** @override **/
  get isValid() {
    return false;
  }
}
function normalizeZone(input, defaultZone2) {
  if (isUndefined(input) || input === null) {
    return defaultZone2;
  } else if (input instanceof Zone) {
    return input;
  } else if (isString(input)) {
    const lowered = input.toLowerCase();
    if (lowered === "default")
      return defaultZone2;
    else if (lowered === "local" || lowered === "system")
      return SystemZone.instance;
    else if (lowered === "utc" || lowered === "gmt")
      return FixedOffsetZone.utcInstance;
    else
      return FixedOffsetZone.parseSpecifier(lowered) || IANAZone.create(input);
  } else if (isNumber(input)) {
    return FixedOffsetZone.instance(input);
  } else if (typeof input === "object" && input.offset && typeof input.offset === "number") {
    return input;
  } else {
    return new InvalidZone(input);
  }
}
let now = () => Date.now(), defaultZone = "system", defaultLocale = null, defaultNumberingSystem = null, defaultOutputCalendar = null, twoDigitCutoffYear = 60, throwOnInvalid;
class Settings {
  /**
   * Get the callback for returning the current timestamp.
   * @type {function}
   */
  static get now() {
    return now;
  }
  /**
   * Set the callback for returning the current timestamp.
   * The function should return a number, which will be interpreted as an Epoch millisecond count
   * @type {function}
   * @example Settings.now = () => Date.now() + 3000 // pretend it is 3 seconds in the future
   * @example Settings.now = () => 0 // always pretend it's Jan 1, 1970 at midnight in UTC time
   */
  static set now(n2) {
    now = n2;
  }
  /**
   * Set the default time zone to create DateTimes in. Does not affect existing instances.
   * Use the value "system" to reset this value to the system's time zone.
   * @type {string}
   */
  static set defaultZone(zone) {
    defaultZone = zone;
  }
  /**
   * Get the default time zone object currently used to create DateTimes. Does not affect existing instances.
   * The default value is the system's time zone (the one set on the machine that runs this code).
   * @type {Zone}
   */
  static get defaultZone() {
    return normalizeZone(defaultZone, SystemZone.instance);
  }
  /**
   * Get the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultLocale() {
    return defaultLocale;
  }
  /**
   * Set the default locale to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultLocale(locale) {
    defaultLocale = locale;
  }
  /**
   * Get the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultNumberingSystem() {
    return defaultNumberingSystem;
  }
  /**
   * Set the default numbering system to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultNumberingSystem(numberingSystem) {
    defaultNumberingSystem = numberingSystem;
  }
  /**
   * Get the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static get defaultOutputCalendar() {
    return defaultOutputCalendar;
  }
  /**
   * Set the default output calendar to create DateTimes with. Does not affect existing instances.
   * @type {string}
   */
  static set defaultOutputCalendar(outputCalendar) {
    defaultOutputCalendar = outputCalendar;
  }
  /**
   * Get the cutoff year after which a string encoding a year as two digits is interpreted to occur in the current century.
   * @type {number}
   */
  static get twoDigitCutoffYear() {
    return twoDigitCutoffYear;
  }
  /**
   * Set the cutoff year after which a string encoding a year as two digits is interpreted to occur in the current century.
   * @type {number}
   * @example Settings.twoDigitCutoffYear = 0 // cut-off year is 0, so all 'yy' are interpretted as current century
   * @example Settings.twoDigitCutoffYear = 50 // '49' -> 1949; '50' -> 2050
   * @example Settings.twoDigitCutoffYear = 1950 // interpretted as 50
   * @example Settings.twoDigitCutoffYear = 2050 // ALSO interpretted as 50
   */
  static set twoDigitCutoffYear(cutoffYear) {
    twoDigitCutoffYear = cutoffYear % 100;
  }
  /**
   * Get whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static get throwOnInvalid() {
    return throwOnInvalid;
  }
  /**
   * Set whether Luxon will throw when it encounters invalid DateTimes, Durations, or Intervals
   * @type {boolean}
   */
  static set throwOnInvalid(t) {
    throwOnInvalid = t;
  }
  /**
   * Reset Luxon's global caches. Should only be necessary in testing scenarios.
   * @return {void}
   */
  static resetCaches() {
    Locale.resetCache();
    IANAZone.resetCache();
  }
}
function isUndefined(o) {
  return typeof o === "undefined";
}
function isNumber(o) {
  return typeof o === "number";
}
function isInteger(o) {
  return typeof o === "number" && o % 1 === 0;
}
function isString(o) {
  return typeof o === "string";
}
function isDate(o) {
  return Object.prototype.toString.call(o) === "[object Date]";
}
function hasRelative() {
  try {
    return typeof Intl !== "undefined" && !!Intl.RelativeTimeFormat;
  } catch (e) {
    return false;
  }
}
function maybeArray(thing) {
  return Array.isArray(thing) ? thing : [thing];
}
function bestBy(arr, by, compare) {
  if (arr.length === 0) {
    return void 0;
  }
  return arr.reduce((best, next) => {
    const pair = [by(next), next];
    if (!best) {
      return pair;
    } else if (compare(best[0], pair[0]) === best[0]) {
      return best;
    } else {
      return pair;
    }
  }, null)[1];
}
function pick(obj, keys) {
  return keys.reduce((a, k) => {
    a[k] = obj[k];
    return a;
  }, {});
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
function integerBetween(thing, bottom, top) {
  return isInteger(thing) && thing >= bottom && thing <= top;
}
function floorMod(x, n2) {
  return x - n2 * Math.floor(x / n2);
}
function padStart(input, n2 = 2) {
  const isNeg = input < 0;
  let padded;
  if (isNeg) {
    padded = "-" + ("" + -input).padStart(n2, "0");
  } else {
    padded = ("" + input).padStart(n2, "0");
  }
  return padded;
}
function parseInteger(string) {
  if (isUndefined(string) || string === null || string === "") {
    return void 0;
  } else {
    return parseInt(string, 10);
  }
}
function parseFloating(string) {
  if (isUndefined(string) || string === null || string === "") {
    return void 0;
  } else {
    return parseFloat(string);
  }
}
function parseMillis(fraction) {
  if (isUndefined(fraction) || fraction === null || fraction === "") {
    return void 0;
  } else {
    const f = parseFloat("0." + fraction) * 1e3;
    return Math.floor(f);
  }
}
function roundTo(number, digits, towardZero = false) {
  const factor = 10 ** digits, rounder = towardZero ? Math.trunc : Math.round;
  return rounder(number * factor) / factor;
}
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
function daysInYear(year) {
  return isLeapYear(year) ? 366 : 365;
}
function daysInMonth(year, month) {
  const modMonth = floorMod(month - 1, 12) + 1, modYear = year + (month - modMonth) / 12;
  if (modMonth === 2) {
    return isLeapYear(modYear) ? 29 : 28;
  } else {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][modMonth - 1];
  }
}
function objToLocalTS(obj) {
  let d2 = Date.UTC(
    obj.year,
    obj.month - 1,
    obj.day,
    obj.hour,
    obj.minute,
    obj.second,
    obj.millisecond
  );
  if (obj.year < 100 && obj.year >= 0) {
    d2 = new Date(d2);
    d2.setUTCFullYear(obj.year, obj.month - 1, obj.day);
  }
  return +d2;
}
function weeksInWeekYear(weekYear) {
  const p1 = (weekYear + Math.floor(weekYear / 4) - Math.floor(weekYear / 100) + Math.floor(weekYear / 400)) % 7, last2 = weekYear - 1, p2 = (last2 + Math.floor(last2 / 4) - Math.floor(last2 / 100) + Math.floor(last2 / 400)) % 7;
  return p1 === 4 || p2 === 3 ? 53 : 52;
}
function untruncateYear(year) {
  if (year > 99) {
    return year;
  } else
    return year > Settings.twoDigitCutoffYear ? 1900 + year : 2e3 + year;
}
function parseZoneInfo(ts, offsetFormat, locale, timeZone = null) {
  const date = new Date(ts), intlOpts = {
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  };
  if (timeZone) {
    intlOpts.timeZone = timeZone;
  }
  const modified = { timeZoneName: offsetFormat, ...intlOpts };
  const parsed = new Intl.DateTimeFormat(locale, modified).formatToParts(date).find((m2) => m2.type.toLowerCase() === "timezonename");
  return parsed ? parsed.value : null;
}
function signedOffset(offHourStr, offMinuteStr) {
  let offHour = parseInt(offHourStr, 10);
  if (Number.isNaN(offHour)) {
    offHour = 0;
  }
  const offMin = parseInt(offMinuteStr, 10) || 0, offMinSigned = offHour < 0 || Object.is(offHour, -0) ? -offMin : offMin;
  return offHour * 60 + offMinSigned;
}
function asNumber(value) {
  const numericValue = Number(value);
  if (typeof value === "boolean" || value === "" || Number.isNaN(numericValue))
    throw new InvalidArgumentError(`Invalid unit value ${value}`);
  return numericValue;
}
function normalizeObject(obj, normalizer) {
  const normalized = {};
  for (const u in obj) {
    if (hasOwnProperty(obj, u)) {
      const v = obj[u];
      if (v === void 0 || v === null)
        continue;
      normalized[normalizer(u)] = asNumber(v);
    }
  }
  return normalized;
}
function formatOffset(offset2, format) {
  const hours = Math.trunc(Math.abs(offset2 / 60)), minutes = Math.trunc(Math.abs(offset2 % 60)), sign = offset2 >= 0 ? "+" : "-";
  switch (format) {
    case "short":
      return `${sign}${padStart(hours, 2)}:${padStart(minutes, 2)}`;
    case "narrow":
      return `${sign}${hours}${minutes > 0 ? `:${minutes}` : ""}`;
    case "techie":
      return `${sign}${padStart(hours, 2)}${padStart(minutes, 2)}`;
    default:
      throw new RangeError(`Value format ${format} is out of range for property format`);
  }
}
function timeObject(obj) {
  return pick(obj, ["hour", "minute", "second", "millisecond"]);
}
const monthsLong = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
const monthsNarrow = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function months(length) {
  switch (length) {
    case "narrow":
      return [...monthsNarrow];
    case "short":
      return [...monthsShort];
    case "long":
      return [...monthsLong];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    default:
      return null;
  }
}
const weekdaysLong = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
const weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weekdaysNarrow = ["M", "T", "W", "T", "F", "S", "S"];
function weekdays(length) {
  switch (length) {
    case "narrow":
      return [...weekdaysNarrow];
    case "short":
      return [...weekdaysShort];
    case "long":
      return [...weekdaysLong];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
const meridiems = ["AM", "PM"];
const erasLong = ["Before Christ", "Anno Domini"];
const erasShort = ["BC", "AD"];
const erasNarrow = ["B", "A"];
function eras(length) {
  switch (length) {
    case "narrow":
      return [...erasNarrow];
    case "short":
      return [...erasShort];
    case "long":
      return [...erasLong];
    default:
      return null;
  }
}
function meridiemForDateTime(dt) {
  return meridiems[dt.hour < 12 ? 0 : 1];
}
function weekdayForDateTime(dt, length) {
  return weekdays(length)[dt.weekday - 1];
}
function monthForDateTime(dt, length) {
  return months(length)[dt.month - 1];
}
function eraForDateTime(dt, length) {
  return eras(length)[dt.year < 0 ? 0 : 1];
}
function formatRelativeTime(unit, count, numeric = "always", narrow = false) {
  const units = {
    years: ["year", "yr."],
    quarters: ["quarter", "qtr."],
    months: ["month", "mo."],
    weeks: ["week", "wk."],
    days: ["day", "day", "days"],
    hours: ["hour", "hr."],
    minutes: ["minute", "min."],
    seconds: ["second", "sec."]
  };
  const lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;
  if (numeric === "auto" && lastable) {
    const isDay = unit === "days";
    switch (count) {
      case 1:
        return isDay ? "tomorrow" : `next ${units[unit][0]}`;
      case -1:
        return isDay ? "yesterday" : `last ${units[unit][0]}`;
      case 0:
        return isDay ? "today" : `this ${units[unit][0]}`;
    }
  }
  const isInPast = Object.is(count, -0) || count < 0, fmtValue = Math.abs(count), singular = fmtValue === 1, lilUnits = units[unit], fmtUnit = narrow ? singular ? lilUnits[1] : lilUnits[2] || lilUnits[1] : singular ? units[unit][0] : unit;
  return isInPast ? `${fmtValue} ${fmtUnit} ago` : `in ${fmtValue} ${fmtUnit}`;
}
function stringifyTokens(splits, tokenToString) {
  let s2 = "";
  for (const token of splits) {
    if (token.literal) {
      s2 += token.val;
    } else {
      s2 += tokenToString(token.val);
    }
  }
  return s2;
}
const macroTokenToFormatOpts = {
  D: DATE_SHORT,
  DD: DATE_MED,
  DDD: DATE_FULL,
  DDDD: DATE_HUGE,
  t: TIME_SIMPLE,
  tt: TIME_WITH_SECONDS,
  ttt: TIME_WITH_SHORT_OFFSET,
  tttt: TIME_WITH_LONG_OFFSET,
  T: TIME_24_SIMPLE,
  TT: TIME_24_WITH_SECONDS,
  TTT: TIME_24_WITH_SHORT_OFFSET,
  TTTT: TIME_24_WITH_LONG_OFFSET,
  f: DATETIME_SHORT,
  ff: DATETIME_MED,
  fff: DATETIME_FULL,
  ffff: DATETIME_HUGE,
  F: DATETIME_SHORT_WITH_SECONDS,
  FF: DATETIME_MED_WITH_SECONDS,
  FFF: DATETIME_FULL_WITH_SECONDS,
  FFFF: DATETIME_HUGE_WITH_SECONDS
};
class Formatter {
  static create(locale, opts = {}) {
    return new Formatter(locale, opts);
  }
  static parseFormat(fmt) {
    let current = null, currentFull = "", bracketed = false;
    const splits = [];
    for (let i = 0; i < fmt.length; i++) {
      const c2 = fmt.charAt(i);
      if (c2 === "'") {
        if (currentFull.length > 0) {
          splits.push({ literal: bracketed || /^\s+$/.test(currentFull), val: currentFull });
        }
        current = null;
        currentFull = "";
        bracketed = !bracketed;
      } else if (bracketed) {
        currentFull += c2;
      } else if (c2 === current) {
        currentFull += c2;
      } else {
        if (currentFull.length > 0) {
          splits.push({ literal: /^\s+$/.test(currentFull), val: currentFull });
        }
        currentFull = c2;
        current = c2;
      }
    }
    if (currentFull.length > 0) {
      splits.push({ literal: bracketed || /^\s+$/.test(currentFull), val: currentFull });
    }
    return splits;
  }
  static macroTokenToFormatOpts(token) {
    return macroTokenToFormatOpts[token];
  }
  constructor(locale, formatOpts) {
    this.opts = formatOpts;
    this.loc = locale;
    this.systemLoc = null;
  }
  formatWithSystemDefault(dt, opts) {
    if (this.systemLoc === null) {
      this.systemLoc = this.loc.redefaultToSystem();
    }
    const df = this.systemLoc.dtFormatter(dt, { ...this.opts, ...opts });
    return df.format();
  }
  formatDateTime(dt, opts = {}) {
    const df = this.loc.dtFormatter(dt, { ...this.opts, ...opts });
    return df.format();
  }
  formatDateTimeParts(dt, opts = {}) {
    const df = this.loc.dtFormatter(dt, { ...this.opts, ...opts });
    return df.formatToParts();
  }
  formatInterval(interval, opts = {}) {
    const df = this.loc.dtFormatter(interval.start, { ...this.opts, ...opts });
    return df.dtf.formatRange(interval.start.toJSDate(), interval.end.toJSDate());
  }
  resolvedOptions(dt, opts = {}) {
    const df = this.loc.dtFormatter(dt, { ...this.opts, ...opts });
    return df.resolvedOptions();
  }
  num(n2, p = 0) {
    if (this.opts.forceSimple) {
      return padStart(n2, p);
    }
    const opts = { ...this.opts };
    if (p > 0) {
      opts.padTo = p;
    }
    return this.loc.numberFormatter(opts).format(n2);
  }
  formatDateTimeFromString(dt, fmt) {
    const knownEnglish = this.loc.listingMode() === "en", useDateTimeFormatter = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory", string = (opts, extract) => this.loc.extract(dt, opts, extract), formatOffset2 = (opts) => {
      if (dt.isOffsetFixed && dt.offset === 0 && opts.allowZ) {
        return "Z";
      }
      return dt.isValid ? dt.zone.formatOffset(dt.ts, opts.format) : "";
    }, meridiem = () => knownEnglish ? meridiemForDateTime(dt) : string({ hour: "numeric", hourCycle: "h12" }, "dayperiod"), month = (length, standalone) => knownEnglish ? monthForDateTime(dt, length) : string(standalone ? { month: length } : { month: length, day: "numeric" }, "month"), weekday = (length, standalone) => knownEnglish ? weekdayForDateTime(dt, length) : string(
      standalone ? { weekday: length } : { weekday: length, month: "long", day: "numeric" },
      "weekday"
    ), maybeMacro = (token) => {
      const formatOpts = Formatter.macroTokenToFormatOpts(token);
      if (formatOpts) {
        return this.formatWithSystemDefault(dt, formatOpts);
      } else {
        return token;
      }
    }, era = (length) => knownEnglish ? eraForDateTime(dt, length) : string({ era: length }, "era"), tokenToString = (token) => {
      switch (token) {
        case "S":
          return this.num(dt.millisecond);
        case "u":
        case "SSS":
          return this.num(dt.millisecond, 3);
        case "s":
          return this.num(dt.second);
        case "ss":
          return this.num(dt.second, 2);
        case "uu":
          return this.num(Math.floor(dt.millisecond / 10), 2);
        case "uuu":
          return this.num(Math.floor(dt.millisecond / 100));
        case "m":
          return this.num(dt.minute);
        case "mm":
          return this.num(dt.minute, 2);
        case "h":
          return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12);
        case "hh":
          return this.num(dt.hour % 12 === 0 ? 12 : dt.hour % 12, 2);
        case "H":
          return this.num(dt.hour);
        case "HH":
          return this.num(dt.hour, 2);
        case "Z":
          return formatOffset2({ format: "narrow", allowZ: this.opts.allowZ });
        case "ZZ":
          return formatOffset2({ format: "short", allowZ: this.opts.allowZ });
        case "ZZZ":
          return formatOffset2({ format: "techie", allowZ: this.opts.allowZ });
        case "ZZZZ":
          return dt.zone.offsetName(dt.ts, { format: "short", locale: this.loc.locale });
        case "ZZZZZ":
          return dt.zone.offsetName(dt.ts, { format: "long", locale: this.loc.locale });
        case "z":
          return dt.zoneName;
        case "a":
          return meridiem();
        case "d":
          return useDateTimeFormatter ? string({ day: "numeric" }, "day") : this.num(dt.day);
        case "dd":
          return useDateTimeFormatter ? string({ day: "2-digit" }, "day") : this.num(dt.day, 2);
        case "c":
          return this.num(dt.weekday);
        case "ccc":
          return weekday("short", true);
        case "cccc":
          return weekday("long", true);
        case "ccccc":
          return weekday("narrow", true);
        case "E":
          return this.num(dt.weekday);
        case "EEE":
          return weekday("short", false);
        case "EEEE":
          return weekday("long", false);
        case "EEEEE":
          return weekday("narrow", false);
        case "L":
          return useDateTimeFormatter ? string({ month: "numeric", day: "numeric" }, "month") : this.num(dt.month);
        case "LL":
          return useDateTimeFormatter ? string({ month: "2-digit", day: "numeric" }, "month") : this.num(dt.month, 2);
        case "LLL":
          return month("short", true);
        case "LLLL":
          return month("long", true);
        case "LLLLL":
          return month("narrow", true);
        case "M":
          return useDateTimeFormatter ? string({ month: "numeric" }, "month") : this.num(dt.month);
        case "MM":
          return useDateTimeFormatter ? string({ month: "2-digit" }, "month") : this.num(dt.month, 2);
        case "MMM":
          return month("short", false);
        case "MMMM":
          return month("long", false);
        case "MMMMM":
          return month("narrow", false);
        case "y":
          return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year);
        case "yy":
          return useDateTimeFormatter ? string({ year: "2-digit" }, "year") : this.num(dt.year.toString().slice(-2), 2);
        case "yyyy":
          return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year, 4);
        case "yyyyyy":
          return useDateTimeFormatter ? string({ year: "numeric" }, "year") : this.num(dt.year, 6);
        case "G":
          return era("short");
        case "GG":
          return era("long");
        case "GGGGG":
          return era("narrow");
        case "kk":
          return this.num(dt.weekYear.toString().slice(-2), 2);
        case "kkkk":
          return this.num(dt.weekYear, 4);
        case "W":
          return this.num(dt.weekNumber);
        case "WW":
          return this.num(dt.weekNumber, 2);
        case "o":
          return this.num(dt.ordinal);
        case "ooo":
          return this.num(dt.ordinal, 3);
        case "q":
          return this.num(dt.quarter);
        case "qq":
          return this.num(dt.quarter, 2);
        case "X":
          return this.num(Math.floor(dt.ts / 1e3));
        case "x":
          return this.num(dt.ts);
        default:
          return maybeMacro(token);
      }
    };
    return stringifyTokens(Formatter.parseFormat(fmt), tokenToString);
  }
  formatDurationFromString(dur, fmt) {
    const tokenToField = (token) => {
      switch (token[0]) {
        case "S":
          return "millisecond";
        case "s":
          return "second";
        case "m":
          return "minute";
        case "h":
          return "hour";
        case "d":
          return "day";
        case "w":
          return "week";
        case "M":
          return "month";
        case "y":
          return "year";
        default:
          return null;
      }
    }, tokenToString = (lildur) => (token) => {
      const mapped = tokenToField(token);
      if (mapped) {
        return this.num(lildur.get(mapped), token.length);
      } else {
        return token;
      }
    }, tokens = Formatter.parseFormat(fmt), realTokens = tokens.reduce(
      (found, { literal, val }) => literal ? found : found.concat(val),
      []
    ), collapsed = dur.shiftTo(...realTokens.map(tokenToField).filter((t) => t));
    return stringifyTokens(tokens, tokenToString(collapsed));
  }
}
class Invalid {
  constructor(reason, explanation) {
    this.reason = reason;
    this.explanation = explanation;
  }
  toMessage() {
    if (this.explanation) {
      return `${this.reason}: ${this.explanation}`;
    } else {
      return this.reason;
    }
  }
}
const ianaRegex = /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function combineRegexes(...regexes) {
  const full = regexes.reduce((f, r) => f + r.source, "");
  return RegExp(`^${full}$`);
}
function combineExtractors(...extractors) {
  return (m2) => extractors.reduce(
    ([mergedVals, mergedZone, cursor], ex) => {
      const [val, zone, next] = ex(m2, cursor);
      return [{ ...mergedVals, ...val }, zone || mergedZone, next];
    },
    [{}, null, 1]
  ).slice(0, 2);
}
function parse(s2, ...patterns) {
  if (s2 == null) {
    return [null, null];
  }
  for (const [regex, extractor] of patterns) {
    const m2 = regex.exec(s2);
    if (m2) {
      return extractor(m2);
    }
  }
  return [null, null];
}
function simpleParse(...keys) {
  return (match2, cursor) => {
    const ret = {};
    let i;
    for (i = 0; i < keys.length; i++) {
      ret[keys[i]] = parseInteger(match2[cursor + i]);
    }
    return [ret, null, cursor + i];
  };
}
const offsetRegex = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/;
const isoExtendedZone = `(?:${offsetRegex.source}?(?:\\[(${ianaRegex.source})\\])?)?`;
const isoTimeBaseRegex = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/;
const isoTimeRegex = RegExp(`${isoTimeBaseRegex.source}${isoExtendedZone}`);
const isoTimeExtensionRegex = RegExp(`(?:T${isoTimeRegex.source})?`);
const isoYmdRegex = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/;
const isoWeekRegex = /(\d{4})-?W(\d\d)(?:-?(\d))?/;
const isoOrdinalRegex = /(\d{4})-?(\d{3})/;
const extractISOWeekData = simpleParse("weekYear", "weekNumber", "weekDay");
const extractISOOrdinalData = simpleParse("year", "ordinal");
const sqlYmdRegex = /(\d{4})-(\d\d)-(\d\d)/;
const sqlTimeRegex = RegExp(
  `${isoTimeBaseRegex.source} ?(?:${offsetRegex.source}|(${ianaRegex.source}))?`
);
const sqlTimeExtensionRegex = RegExp(`(?: ${sqlTimeRegex.source})?`);
function int(match2, pos, fallback) {
  const m2 = match2[pos];
  return isUndefined(m2) ? fallback : parseInteger(m2);
}
function extractISOYmd(match2, cursor) {
  const item = {
    year: int(match2, cursor),
    month: int(match2, cursor + 1, 1),
    day: int(match2, cursor + 2, 1)
  };
  return [item, null, cursor + 3];
}
function extractISOTime(match2, cursor) {
  const item = {
    hours: int(match2, cursor, 0),
    minutes: int(match2, cursor + 1, 0),
    seconds: int(match2, cursor + 2, 0),
    milliseconds: parseMillis(match2[cursor + 3])
  };
  return [item, null, cursor + 4];
}
function extractISOOffset(match2, cursor) {
  const local = !match2[cursor] && !match2[cursor + 1], fullOffset = signedOffset(match2[cursor + 1], match2[cursor + 2]), zone = local ? null : FixedOffsetZone.instance(fullOffset);
  return [{}, zone, cursor + 3];
}
function extractIANAZone(match2, cursor) {
  const zone = match2[cursor] ? IANAZone.create(match2[cursor]) : null;
  return [{}, zone, cursor + 1];
}
const isoTimeOnly = RegExp(`^T?${isoTimeBaseRegex.source}$`);
const isoDuration = /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function extractISODuration(match2) {
  const [s2, yearStr, monthStr, weekStr, dayStr, hourStr, minuteStr, secondStr, millisecondsStr] = match2;
  const hasNegativePrefix = s2[0] === "-";
  const negativeSeconds = secondStr && secondStr[0] === "-";
  const maybeNegate = (num, force = false) => num !== void 0 && (force || num && hasNegativePrefix) ? -num : num;
  return [
    {
      years: maybeNegate(parseFloating(yearStr)),
      months: maybeNegate(parseFloating(monthStr)),
      weeks: maybeNegate(parseFloating(weekStr)),
      days: maybeNegate(parseFloating(dayStr)),
      hours: maybeNegate(parseFloating(hourStr)),
      minutes: maybeNegate(parseFloating(minuteStr)),
      seconds: maybeNegate(parseFloating(secondStr), secondStr === "-0"),
      milliseconds: maybeNegate(parseMillis(millisecondsStr), negativeSeconds)
    }
  ];
}
const obsOffsets = {
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60
};
function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
  const result = {
    year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
    month: monthsShort.indexOf(monthStr) + 1,
    day: parseInteger(dayStr),
    hour: parseInteger(hourStr),
    minute: parseInteger(minuteStr)
  };
  if (secondStr)
    result.second = parseInteger(secondStr);
  if (weekdayStr) {
    result.weekday = weekdayStr.length > 3 ? weekdaysLong.indexOf(weekdayStr) + 1 : weekdaysShort.indexOf(weekdayStr) + 1;
  }
  return result;
}
const rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function extractRFC2822(match2) {
  const [
    ,
    weekdayStr,
    dayStr,
    monthStr,
    yearStr,
    hourStr,
    minuteStr,
    secondStr,
    obsOffset,
    milOffset,
    offHourStr,
    offMinuteStr
  ] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  let offset2;
  if (obsOffset) {
    offset2 = obsOffsets[obsOffset];
  } else if (milOffset) {
    offset2 = 0;
  } else {
    offset2 = signedOffset(offHourStr, offMinuteStr);
  }
  return [result, new FixedOffsetZone(offset2)];
}
function preprocessRFC2822(s2) {
  return s2.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").trim();
}
const rfc1123 = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/, rfc850 = /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/, ascii = /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function extractRFC1123Or850(match2) {
  const [, weekdayStr, dayStr, monthStr, yearStr, hourStr, minuteStr, secondStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}
function extractASCII(match2) {
  const [, weekdayStr, monthStr, dayStr, hourStr, minuteStr, secondStr, yearStr] = match2, result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
  return [result, FixedOffsetZone.utcInstance];
}
const isoYmdWithTimeExtensionRegex = combineRegexes(isoYmdRegex, isoTimeExtensionRegex);
const isoWeekWithTimeExtensionRegex = combineRegexes(isoWeekRegex, isoTimeExtensionRegex);
const isoOrdinalWithTimeExtensionRegex = combineRegexes(isoOrdinalRegex, isoTimeExtensionRegex);
const isoTimeCombinedRegex = combineRegexes(isoTimeRegex);
const extractISOYmdTimeAndOffset = combineExtractors(
  extractISOYmd,
  extractISOTime,
  extractISOOffset,
  extractIANAZone
);
const extractISOWeekTimeAndOffset = combineExtractors(
  extractISOWeekData,
  extractISOTime,
  extractISOOffset,
  extractIANAZone
);
const extractISOOrdinalDateAndTime = combineExtractors(
  extractISOOrdinalData,
  extractISOTime,
  extractISOOffset,
  extractIANAZone
);
const extractISOTimeAndOffset = combineExtractors(
  extractISOTime,
  extractISOOffset,
  extractIANAZone
);
function parseISODate(s2) {
  return parse(
    s2,
    [isoYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset],
    [isoWeekWithTimeExtensionRegex, extractISOWeekTimeAndOffset],
    [isoOrdinalWithTimeExtensionRegex, extractISOOrdinalDateAndTime],
    [isoTimeCombinedRegex, extractISOTimeAndOffset]
  );
}
function parseRFC2822Date(s2) {
  return parse(preprocessRFC2822(s2), [rfc2822, extractRFC2822]);
}
function parseHTTPDate(s2) {
  return parse(
    s2,
    [rfc1123, extractRFC1123Or850],
    [rfc850, extractRFC1123Or850],
    [ascii, extractASCII]
  );
}
function parseISODuration(s2) {
  return parse(s2, [isoDuration, extractISODuration]);
}
const extractISOTimeOnly = combineExtractors(extractISOTime);
function parseISOTimeOnly(s2) {
  return parse(s2, [isoTimeOnly, extractISOTimeOnly]);
}
const sqlYmdWithTimeExtensionRegex = combineRegexes(sqlYmdRegex, sqlTimeExtensionRegex);
const sqlTimeCombinedRegex = combineRegexes(sqlTimeRegex);
const extractISOTimeOffsetAndIANAZone = combineExtractors(
  extractISOTime,
  extractISOOffset,
  extractIANAZone
);
function parseSQL(s2) {
  return parse(
    s2,
    [sqlYmdWithTimeExtensionRegex, extractISOYmdTimeAndOffset],
    [sqlTimeCombinedRegex, extractISOTimeOffsetAndIANAZone]
  );
}
const INVALID$2 = "Invalid Duration";
const lowOrderMatrix = {
  weeks: {
    days: 7,
    hours: 7 * 24,
    minutes: 7 * 24 * 60,
    seconds: 7 * 24 * 60 * 60,
    milliseconds: 7 * 24 * 60 * 60 * 1e3
  },
  days: {
    hours: 24,
    minutes: 24 * 60,
    seconds: 24 * 60 * 60,
    milliseconds: 24 * 60 * 60 * 1e3
  },
  hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1e3 },
  minutes: { seconds: 60, milliseconds: 60 * 1e3 },
  seconds: { milliseconds: 1e3 }
}, casualMatrix = {
  years: {
    quarters: 4,
    months: 12,
    weeks: 52,
    days: 365,
    hours: 365 * 24,
    minutes: 365 * 24 * 60,
    seconds: 365 * 24 * 60 * 60,
    milliseconds: 365 * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: 13,
    days: 91,
    hours: 91 * 24,
    minutes: 91 * 24 * 60,
    seconds: 91 * 24 * 60 * 60,
    milliseconds: 91 * 24 * 60 * 60 * 1e3
  },
  months: {
    weeks: 4,
    days: 30,
    hours: 30 * 24,
    minutes: 30 * 24 * 60,
    seconds: 30 * 24 * 60 * 60,
    milliseconds: 30 * 24 * 60 * 60 * 1e3
  },
  ...lowOrderMatrix
}, daysInYearAccurate = 146097 / 400, daysInMonthAccurate = 146097 / 4800, accurateMatrix = {
  years: {
    quarters: 4,
    months: 12,
    weeks: daysInYearAccurate / 7,
    days: daysInYearAccurate,
    hours: daysInYearAccurate * 24,
    minutes: daysInYearAccurate * 24 * 60,
    seconds: daysInYearAccurate * 24 * 60 * 60,
    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3
  },
  quarters: {
    months: 3,
    weeks: daysInYearAccurate / 28,
    days: daysInYearAccurate / 4,
    hours: daysInYearAccurate * 24 / 4,
    minutes: daysInYearAccurate * 24 * 60 / 4,
    seconds: daysInYearAccurate * 24 * 60 * 60 / 4,
    milliseconds: daysInYearAccurate * 24 * 60 * 60 * 1e3 / 4
  },
  months: {
    weeks: daysInMonthAccurate / 7,
    days: daysInMonthAccurate,
    hours: daysInMonthAccurate * 24,
    minutes: daysInMonthAccurate * 24 * 60,
    seconds: daysInMonthAccurate * 24 * 60 * 60,
    milliseconds: daysInMonthAccurate * 24 * 60 * 60 * 1e3
  },
  ...lowOrderMatrix
};
const orderedUnits$1 = [
  "years",
  "quarters",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
  "milliseconds"
];
const reverseUnits = orderedUnits$1.slice(0).reverse();
function clone$1(dur, alts, clear = false) {
  const conf = {
    values: clear ? alts.values : { ...dur.values, ...alts.values || {} },
    loc: dur.loc.clone(alts.loc),
    conversionAccuracy: alts.conversionAccuracy || dur.conversionAccuracy,
    matrix: alts.matrix || dur.matrix
  };
  return new Duration(conf);
}
function antiTrunc(n2) {
  return n2 < 0 ? Math.floor(n2) : Math.ceil(n2);
}
function convert(matrix, fromMap, fromUnit, toMap, toUnit) {
  const conv = matrix[toUnit][fromUnit], raw = fromMap[fromUnit] / conv, sameSign = Math.sign(raw) === Math.sign(toMap[toUnit]), added = !sameSign && toMap[toUnit] !== 0 && Math.abs(raw) <= 1 ? antiTrunc(raw) : Math.trunc(raw);
  toMap[toUnit] += added;
  fromMap[fromUnit] -= added * conv;
}
function normalizeValues(matrix, vals) {
  reverseUnits.reduce((previous, current) => {
    if (!isUndefined(vals[current])) {
      if (previous) {
        convert(matrix, vals, previous, vals, current);
      }
      return current;
    } else {
      return previous;
    }
  }, null);
}
function removeZeroes(vals) {
  const newVals = {};
  for (const [key, value] of Object.entries(vals)) {
    if (value !== 0) {
      newVals[key] = value;
    }
  }
  return newVals;
}
class Duration {
  /**
   * @private
   */
  constructor(config2) {
    const accurate = config2.conversionAccuracy === "longterm" || false;
    let matrix = accurate ? accurateMatrix : casualMatrix;
    if (config2.matrix) {
      matrix = config2.matrix;
    }
    this.values = config2.values;
    this.loc = config2.loc || Locale.create();
    this.conversionAccuracy = accurate ? "longterm" : "casual";
    this.invalid = config2.invalid || null;
    this.matrix = matrix;
    this.isLuxonDuration = true;
  }
  /**
   * Create Duration from a number of milliseconds.
   * @param {number} count of milliseconds
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  static fromMillis(count, opts) {
    return Duration.fromObject({ milliseconds: count }, opts);
  }
  /**
   * Create a Duration from a JavaScript object with keys like 'years' and 'hours'.
   * If this object is empty then a zero milliseconds duration is returned.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.years
   * @param {number} obj.quarters
   * @param {number} obj.months
   * @param {number} obj.weeks
   * @param {number} obj.days
   * @param {number} obj.hours
   * @param {number} obj.minutes
   * @param {number} obj.seconds
   * @param {number} obj.milliseconds
   * @param {Object} [opts=[]] - options for creating this Duration
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the custom conversion system to use
   * @return {Duration}
   */
  static fromObject(obj, opts = {}) {
    if (obj == null || typeof obj !== "object") {
      throw new InvalidArgumentError(
        `Duration.fromObject: argument expected to be an object, got ${obj === null ? "null" : typeof obj}`
      );
    }
    return new Duration({
      values: normalizeObject(obj, Duration.normalizeUnit),
      loc: Locale.fromObject(opts),
      conversionAccuracy: opts.conversionAccuracy,
      matrix: opts.matrix
    });
  }
  /**
   * Create a Duration from DurationLike.
   *
   * @param {Object | number | Duration} durationLike
   * One of:
   * - object with keys like 'years' and 'hours'.
   * - number representing milliseconds
   * - Duration instance
   * @return {Duration}
   */
  static fromDurationLike(durationLike) {
    if (isNumber(durationLike)) {
      return Duration.fromMillis(durationLike);
    } else if (Duration.isDuration(durationLike)) {
      return durationLike;
    } else if (typeof durationLike === "object") {
      return Duration.fromObject(durationLike);
    } else {
      throw new InvalidArgumentError(
        `Unknown duration argument ${durationLike} of type ${typeof durationLike}`
      );
    }
  }
  /**
   * Create a Duration from an ISO 8601 duration string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the preset conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromISO('P3Y6M1W4DT12H30M5S').toObject() //=> { years: 3, months: 6, weeks: 1, days: 4, hours: 12, minutes: 30, seconds: 5 }
   * @example Duration.fromISO('PT23H').toObject() //=> { hours: 23 }
   * @example Duration.fromISO('P5Y3M').toObject() //=> { years: 5, months: 3 }
   * @return {Duration}
   */
  static fromISO(text2, opts) {
    const [parsed] = parseISODuration(text2);
    if (parsed) {
      return Duration.fromObject(parsed, opts);
    } else {
      return Duration.invalid("unparsable", `the input "${text2}" can't be parsed as ISO 8601`);
    }
  }
  /**
   * Create a Duration from an ISO 8601 time string.
   * @param {string} text - text to parse
   * @param {Object} opts - options for parsing
   * @param {string} [opts.locale='en-US'] - the locale to use
   * @param {string} opts.numberingSystem - the numbering system to use
   * @param {string} [opts.conversionAccuracy='casual'] - the preset conversion system to use
   * @param {string} [opts.matrix=Object] - the conversion system to use
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @example Duration.fromISOTime('11:22:33.444').toObject() //=> { hours: 11, minutes: 22, seconds: 33, milliseconds: 444 }
   * @example Duration.fromISOTime('11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T11:00').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @example Duration.fromISOTime('T1100').toObject() //=> { hours: 11, minutes: 0, seconds: 0 }
   * @return {Duration}
   */
  static fromISOTime(text2, opts) {
    const [parsed] = parseISOTimeOnly(text2);
    if (parsed) {
      return Duration.fromObject(parsed, opts);
    } else {
      return Duration.invalid("unparsable", `the input "${text2}" can't be parsed as ISO 8601`);
    }
  }
  /**
   * Create an invalid Duration.
   * @param {string} reason - simple string of why this datetime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Duration}
   */
  static invalid(reason, explanation = null) {
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Duration is invalid");
    }
    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
    if (Settings.throwOnInvalid) {
      throw new InvalidDurationError(invalid);
    } else {
      return new Duration({ invalid });
    }
  }
  /**
   * @private
   */
  static normalizeUnit(unit) {
    const normalized = {
      year: "years",
      years: "years",
      quarter: "quarters",
      quarters: "quarters",
      month: "months",
      months: "months",
      week: "weeks",
      weeks: "weeks",
      day: "days",
      days: "days",
      hour: "hours",
      hours: "hours",
      minute: "minutes",
      minutes: "minutes",
      second: "seconds",
      seconds: "seconds",
      millisecond: "milliseconds",
      milliseconds: "milliseconds"
    }[unit ? unit.toLowerCase() : unit];
    if (!normalized)
      throw new InvalidUnitError(unit);
    return normalized;
  }
  /**
   * Check if an object is a Duration. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDuration(o) {
    return o && o.isLuxonDuration || false;
  }
  /**
   * Get  the locale of a Duration, such 'en-GB'
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a Duration, such 'beng'. The numbering system is used when formatting the Duration
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Returns a string representation of this Duration formatted according to the specified format string. You may use these tokens:
   * * `S` for milliseconds
   * * `s` for seconds
   * * `m` for minutes
   * * `h` for hours
   * * `d` for days
   * * `w` for weeks
   * * `M` for months
   * * `y` for years
   * Notes:
   * * Add padding by repeating the token, e.g. "yy" pads the years to two digits, "hhhh" pads the hours out to four digits
   * * Tokens can be escaped by wrapping with single quotes.
   * * The duration will be converted to the set of units in the format string using {@link Duration#shiftTo} and the Durations's conversion accuracy setting.
   * @param {string} fmt - the format string
   * @param {Object} opts - options
   * @param {boolean} [opts.floor=true] - floor numerical values
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("y d s") //=> "1 6 2"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("yy dd sss") //=> "01 06 002"
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toFormat("M S") //=> "12 518402000"
   * @return {string}
   */
  toFormat(fmt, opts = {}) {
    const fmtOpts = {
      ...opts,
      floor: opts.round !== false && opts.floor !== false
    };
    return this.isValid ? Formatter.create(this.loc, fmtOpts).formatDurationFromString(this, fmt) : INVALID$2;
  }
  /**
   * Returns a string representation of a Duration with all units included.
   * To modify its behavior use the `listStyle` and any Intl.NumberFormat option, though `unitDisplay` is especially relevant.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
   * @param opts - On option object to override the formatting. Accepts the same keys as the options parameter of the native `Int.NumberFormat` constructor, as well as `listStyle`.
   * @example
   * ```js
   * var dur = Duration.fromObject({ days: 1, hours: 5, minutes: 6 })
   * dur.toHuman() //=> '1 day, 5 hours, 6 minutes'
   * dur.toHuman({ listStyle: "long" }) //=> '1 day, 5 hours, and 6 minutes'
   * dur.toHuman({ unitDisplay: "short" }) //=> '1 day, 5 hr, 6 min'
   * ```
   */
  toHuman(opts = {}) {
    const l2 = orderedUnits$1.map((unit) => {
      const val = this.values[unit];
      if (isUndefined(val)) {
        return null;
      }
      return this.loc.numberFormatter({ style: "unit", unitDisplay: "long", ...opts, unit: unit.slice(0, -1) }).format(val);
    }).filter((n2) => n2);
    return this.loc.listFormatter({ type: "conjunction", style: opts.listStyle || "narrow", ...opts }).format(l2);
  }
  /**
   * Returns a JavaScript object with this Duration's values.
   * @example Duration.fromObject({ years: 1, days: 6, seconds: 2 }).toObject() //=> { years: 1, days: 6, seconds: 2 }
   * @return {Object}
   */
  toObject() {
    if (!this.isValid)
      return {};
    return { ...this.values };
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
   * @example Duration.fromObject({ years: 3, seconds: 45 }).toISO() //=> 'P3YT45S'
   * @example Duration.fromObject({ months: 4, seconds: 45 }).toISO() //=> 'P4MT45S'
   * @example Duration.fromObject({ months: 5 }).toISO() //=> 'P5M'
   * @example Duration.fromObject({ minutes: 5 }).toISO() //=> 'PT5M'
   * @example Duration.fromObject({ milliseconds: 6 }).toISO() //=> 'PT0.006S'
   * @return {string}
   */
  toISO() {
    if (!this.isValid)
      return null;
    let s2 = "P";
    if (this.years !== 0)
      s2 += this.years + "Y";
    if (this.months !== 0 || this.quarters !== 0)
      s2 += this.months + this.quarters * 3 + "M";
    if (this.weeks !== 0)
      s2 += this.weeks + "W";
    if (this.days !== 0)
      s2 += this.days + "D";
    if (this.hours !== 0 || this.minutes !== 0 || this.seconds !== 0 || this.milliseconds !== 0)
      s2 += "T";
    if (this.hours !== 0)
      s2 += this.hours + "H";
    if (this.minutes !== 0)
      s2 += this.minutes + "M";
    if (this.seconds !== 0 || this.milliseconds !== 0)
      s2 += roundTo(this.seconds + this.milliseconds / 1e3, 3) + "S";
    if (s2 === "P")
      s2 += "T0S";
    return s2;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Duration, formatted as a time of day.
   * Note that this will return null if the duration is invalid, negative, or equal to or greater than 24 hours.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Times
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example Duration.fromObject({ hours: 11 }).toISOTime() //=> '11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressMilliseconds: true }) //=> '11:00:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ suppressSeconds: true }) //=> '11:00'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ includePrefix: true }) //=> 'T11:00:00.000'
   * @example Duration.fromObject({ hours: 11 }).toISOTime({ format: 'basic' }) //=> '110000.000'
   * @return {string}
   */
  toISOTime(opts = {}) {
    if (!this.isValid)
      return null;
    const millis = this.toMillis();
    if (millis < 0 || millis >= 864e5)
      return null;
    opts = {
      suppressMilliseconds: false,
      suppressSeconds: false,
      includePrefix: false,
      format: "extended",
      ...opts
    };
    const value = this.shiftTo("hours", "minutes", "seconds", "milliseconds");
    let fmt = opts.format === "basic" ? "hhmm" : "hh:mm";
    if (!opts.suppressSeconds || value.seconds !== 0 || value.milliseconds !== 0) {
      fmt += opts.format === "basic" ? "ss" : ":ss";
      if (!opts.suppressMilliseconds || value.milliseconds !== 0) {
        fmt += ".SSS";
      }
    }
    let str = value.toFormat(fmt);
    if (opts.includePrefix) {
      str = "T" + str;
    }
    return str;
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns an ISO 8601 representation of this Duration appropriate for use in debugging.
   * @return {string}
   */
  toString() {
    return this.toISO();
  }
  /**
   * Returns an milliseconds value of this Duration.
   * @return {number}
   */
  toMillis() {
    return this.as("milliseconds");
  }
  /**
   * Returns an milliseconds value of this Duration. Alias of {@link toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Make this Duration longer by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  plus(duration) {
    if (!this.isValid)
      return this;
    const dur = Duration.fromDurationLike(duration), result = {};
    for (const k of orderedUnits$1) {
      if (hasOwnProperty(dur.values, k) || hasOwnProperty(this.values, k)) {
        result[k] = dur.get(k) + this.get(k);
      }
    }
    return clone$1(this, { values: result }, true);
  }
  /**
   * Make this Duration shorter by the specified amount. Return a newly-constructed Duration.
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @return {Duration}
   */
  minus(duration) {
    if (!this.isValid)
      return this;
    const dur = Duration.fromDurationLike(duration);
    return this.plus(dur.negate());
  }
  /**
   * Scale this Duration by the specified amount. Return a newly-constructed Duration.
   * @param {function} fn - The function to apply to each unit. Arity is 1 or 2: the value of the unit and, optionally, the unit name. Must return a number.
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits(x => x * 2) //=> { hours: 2, minutes: 60 }
   * @example Duration.fromObject({ hours: 1, minutes: 30 }).mapUnits((x, u) => u === "hours" ? x * 2 : x) //=> { hours: 2, minutes: 30 }
   * @return {Duration}
   */
  mapUnits(fn) {
    if (!this.isValid)
      return this;
    const result = {};
    for (const k of Object.keys(this.values)) {
      result[k] = asNumber(fn(this.values[k], k));
    }
    return clone$1(this, { values: result }, true);
  }
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example Duration.fromObject({years: 2, days: 3}).get('years') //=> 2
   * @example Duration.fromObject({years: 2, days: 3}).get('months') //=> 0
   * @example Duration.fromObject({years: 2, days: 3}).get('days') //=> 3
   * @return {number}
   */
  get(unit) {
    return this[Duration.normalizeUnit(unit)];
  }
  /**
   * "Set" the values of specified units. Return a newly-constructed Duration.
   * @param {Object} values - a mapping of units to numbers
   * @example dur.set({ years: 2017 })
   * @example dur.set({ hours: 8, minutes: 30 })
   * @return {Duration}
   */
  set(values) {
    if (!this.isValid)
      return this;
    const mixed = { ...this.values, ...normalizeObject(values, Duration.normalizeUnit) };
    return clone$1(this, { values: mixed });
  }
  /**
   * "Set" the locale and/or numberingSystem.  Returns a newly-constructed Duration.
   * @example dur.reconfigure({ locale: 'en-GB' })
   * @return {Duration}
   */
  reconfigure({ locale, numberingSystem, conversionAccuracy, matrix } = {}) {
    const loc = this.loc.clone({ locale, numberingSystem });
    const opts = { loc, matrix, conversionAccuracy };
    return clone$1(this, opts);
  }
  /**
   * Return the length of the duration in the specified unit.
   * @param {string} unit - a unit such as 'minutes' or 'days'
   * @example Duration.fromObject({years: 1}).as('days') //=> 365
   * @example Duration.fromObject({years: 1}).as('months') //=> 12
   * @example Duration.fromObject({hours: 60}).as('days') //=> 2.5
   * @return {number}
   */
  as(unit) {
    return this.isValid ? this.shiftTo(unit).get(unit) : NaN;
  }
  /**
   * Reduce this Duration to its canonical representation in its current units.
   * @example Duration.fromObject({ years: 2, days: 5000 }).normalize().toObject() //=> { years: 15, days: 255 }
   * @example Duration.fromObject({ hours: 12, minutes: -45 }).normalize().toObject() //=> { hours: 11, minutes: 15 }
   * @return {Duration}
   */
  normalize() {
    if (!this.isValid)
      return this;
    const vals = this.toObject();
    normalizeValues(this.matrix, vals);
    return clone$1(this, { values: vals }, true);
  }
  /**
   * Rescale units to its largest representation
   * @example Duration.fromObject({ milliseconds: 90000 }).rescale().toObject() //=> { minutes: 1, seconds: 30 }
   * @return {Duration}
   */
  rescale() {
    if (!this.isValid)
      return this;
    const vals = removeZeroes(this.normalize().shiftToAll().toObject());
    return clone$1(this, { values: vals }, true);
  }
  /**
   * Convert this Duration into its representation in a different set of units.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).shiftTo('minutes', 'milliseconds').toObject() //=> { minutes: 60, milliseconds: 30000 }
   * @return {Duration}
   */
  shiftTo(...units) {
    if (!this.isValid)
      return this;
    if (units.length === 0) {
      return this;
    }
    units = units.map((u) => Duration.normalizeUnit(u));
    const built = {}, accumulated = {}, vals = this.toObject();
    let lastUnit;
    for (const k of orderedUnits$1) {
      if (units.indexOf(k) >= 0) {
        lastUnit = k;
        let own = 0;
        for (const ak in accumulated) {
          own += this.matrix[ak][k] * accumulated[ak];
          accumulated[ak] = 0;
        }
        if (isNumber(vals[k])) {
          own += vals[k];
        }
        const i = Math.trunc(own);
        built[k] = i;
        accumulated[k] = (own * 1e3 - i * 1e3) / 1e3;
        for (const down in vals) {
          if (orderedUnits$1.indexOf(down) > orderedUnits$1.indexOf(k)) {
            convert(this.matrix, vals, down, built, k);
          }
        }
      } else if (isNumber(vals[k])) {
        accumulated[k] = vals[k];
      }
    }
    for (const key in accumulated) {
      if (accumulated[key] !== 0) {
        built[lastUnit] += key === lastUnit ? accumulated[key] : accumulated[key] / this.matrix[lastUnit][key];
      }
    }
    return clone$1(this, { values: built }, true).normalize();
  }
  /**
   * Shift this Duration to all available units.
   * Same as shiftTo("years", "months", "weeks", "days", "hours", "minutes", "seconds", "milliseconds")
   * @return {Duration}
   */
  shiftToAll() {
    if (!this.isValid)
      return this;
    return this.shiftTo(
      "years",
      "months",
      "weeks",
      "days",
      "hours",
      "minutes",
      "seconds",
      "milliseconds"
    );
  }
  /**
   * Return the negative of this Duration.
   * @example Duration.fromObject({ hours: 1, seconds: 30 }).negate().toObject() //=> { hours: -1, seconds: -30 }
   * @return {Duration}
   */
  negate() {
    if (!this.isValid)
      return this;
    const negated = {};
    for (const k of Object.keys(this.values)) {
      negated[k] = this.values[k] === 0 ? 0 : -this.values[k];
    }
    return clone$1(this, { values: negated }, true);
  }
  /**
   * Get the years.
   * @type {number}
   */
  get years() {
    return this.isValid ? this.values.years || 0 : NaN;
  }
  /**
   * Get the quarters.
   * @type {number}
   */
  get quarters() {
    return this.isValid ? this.values.quarters || 0 : NaN;
  }
  /**
   * Get the months.
   * @type {number}
   */
  get months() {
    return this.isValid ? this.values.months || 0 : NaN;
  }
  /**
   * Get the weeks
   * @type {number}
   */
  get weeks() {
    return this.isValid ? this.values.weeks || 0 : NaN;
  }
  /**
   * Get the days.
   * @type {number}
   */
  get days() {
    return this.isValid ? this.values.days || 0 : NaN;
  }
  /**
   * Get the hours.
   * @type {number}
   */
  get hours() {
    return this.isValid ? this.values.hours || 0 : NaN;
  }
  /**
   * Get the minutes.
   * @type {number}
   */
  get minutes() {
    return this.isValid ? this.values.minutes || 0 : NaN;
  }
  /**
   * Get the seconds.
   * @return {number}
   */
  get seconds() {
    return this.isValid ? this.values.seconds || 0 : NaN;
  }
  /**
   * Get the milliseconds.
   * @return {number}
   */
  get milliseconds() {
    return this.isValid ? this.values.milliseconds || 0 : NaN;
  }
  /**
   * Returns whether the Duration is invalid. Invalid durations are returned by diff operations
   * on invalid DateTimes or Intervals.
   * @return {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this Duration became invalid, or null if the Duration is valid
   * @return {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Duration became invalid, or null if the Duration is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Equality check
   * Two Durations are equal iff they have the same units and the same values for each unit.
   * @param {Duration} other
   * @return {boolean}
   */
  equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }
    if (!this.loc.equals(other.loc)) {
      return false;
    }
    function eq(v1, v2) {
      if (v1 === void 0 || v1 === 0)
        return v2 === void 0 || v2 === 0;
      return v1 === v2;
    }
    for (const u of orderedUnits$1) {
      if (!eq(this.values[u], other.values[u])) {
        return false;
      }
    }
    return true;
  }
}
const INVALID$1 = "Invalid Interval";
function validateStartEnd(start, end) {
  if (!start || !start.isValid) {
    return Interval.invalid("missing or invalid start");
  } else if (!end || !end.isValid) {
    return Interval.invalid("missing or invalid end");
  } else if (end < start) {
    return Interval.invalid(
      "end before start",
      `The end of an interval must be after its start, but you had start=${start.toISO()} and end=${end.toISO()}`
    );
  } else {
    return null;
  }
}
class Interval {
  /**
   * @private
   */
  constructor(config2) {
    this.s = config2.start;
    this.e = config2.end;
    this.invalid = config2.invalid || null;
    this.isLuxonInterval = true;
  }
  /**
   * Create an invalid Interval.
   * @param {string} reason - simple string of why this Interval is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {Interval}
   */
  static invalid(reason, explanation = null) {
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the Interval is invalid");
    }
    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
    if (Settings.throwOnInvalid) {
      throw new InvalidIntervalError(invalid);
    } else {
      return new Interval({ invalid });
    }
  }
  /**
   * Create an Interval from a start DateTime and an end DateTime. Inclusive of the start but not the end.
   * @param {DateTime|Date|Object} start
   * @param {DateTime|Date|Object} end
   * @return {Interval}
   */
  static fromDateTimes(start, end) {
    const builtStart = friendlyDateTime(start), builtEnd = friendlyDateTime(end);
    const validateError = validateStartEnd(builtStart, builtEnd);
    if (validateError == null) {
      return new Interval({
        start: builtStart,
        end: builtEnd
      });
    } else {
      return validateError;
    }
  }
  /**
   * Create an Interval from a start DateTime and a Duration to extend to.
   * @param {DateTime|Date|Object} start
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static after(start, duration) {
    const dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(start);
    return Interval.fromDateTimes(dt, dt.plus(dur));
  }
  /**
   * Create an Interval from an end DateTime and a Duration to extend backwards to.
   * @param {DateTime|Date|Object} end
   * @param {Duration|Object|number} duration - the length of the Interval.
   * @return {Interval}
   */
  static before(end, duration) {
    const dur = Duration.fromDurationLike(duration), dt = friendlyDateTime(end);
    return Interval.fromDateTimes(dt.minus(dur), dt);
  }
  /**
   * Create an Interval from an ISO 8601 string.
   * Accepts `<start>/<end>`, `<start>/<duration>`, and `<duration>/<end>` formats.
   * @param {string} text - the ISO string to parse
   * @param {Object} [opts] - options to pass {@link DateTime#fromISO} and optionally {@link Duration#fromISO}
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {Interval}
   */
  static fromISO(text2, opts) {
    const [s2, e] = (text2 || "").split("/", 2);
    if (s2 && e) {
      let start, startIsValid;
      try {
        start = DateTime.fromISO(s2, opts);
        startIsValid = start.isValid;
      } catch (e2) {
        startIsValid = false;
      }
      let end, endIsValid;
      try {
        end = DateTime.fromISO(e, opts);
        endIsValid = end.isValid;
      } catch (e2) {
        endIsValid = false;
      }
      if (startIsValid && endIsValid) {
        return Interval.fromDateTimes(start, end);
      }
      if (startIsValid) {
        const dur = Duration.fromISO(e, opts);
        if (dur.isValid) {
          return Interval.after(start, dur);
        }
      } else if (endIsValid) {
        const dur = Duration.fromISO(s2, opts);
        if (dur.isValid) {
          return Interval.before(end, dur);
        }
      }
    }
    return Interval.invalid("unparsable", `the input "${text2}" can't be parsed as ISO 8601`);
  }
  /**
   * Check if an object is an Interval. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isInterval(o) {
    return o && o.isLuxonInterval || false;
  }
  /**
   * Returns the start of the Interval
   * @type {DateTime}
   */
  get start() {
    return this.isValid ? this.s : null;
  }
  /**
   * Returns the end of the Interval
   * @type {DateTime}
   */
  get end() {
    return this.isValid ? this.e : null;
  }
  /**
   * Returns whether this Interval's end is at least its start, meaning that the Interval isn't 'backwards'.
   * @type {boolean}
   */
  get isValid() {
    return this.invalidReason === null;
  }
  /**
   * Returns an error code if this Interval is invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this Interval became invalid, or null if the Interval is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Returns the length of the Interval in the specified unit.
   * @param {string} unit - the unit (such as 'hours' or 'days') to return the length in.
   * @return {number}
   */
  length(unit = "milliseconds") {
    return this.isValid ? this.toDuration(...[unit]).get(unit) : NaN;
  }
  /**
   * Returns the count of minutes, hours, days, months, or years included in the Interval, even in part.
   * Unlike {@link Interval#length} this counts sections of the calendar, not periods of time, e.g. specifying 'day'
   * asks 'what dates are included in this interval?', not 'how many days long is this interval?'
   * @param {string} [unit='milliseconds'] - the unit of time to count.
   * @return {number}
   */
  count(unit = "milliseconds") {
    if (!this.isValid)
      return NaN;
    const start = this.start.startOf(unit), end = this.end.startOf(unit);
    return Math.floor(end.diff(start, unit).get(unit)) + (end.valueOf() !== this.end.valueOf());
  }
  /**
   * Returns whether this Interval's start and end are both in the same unit of time
   * @param {string} unit - the unit of time to check sameness on
   * @return {boolean}
   */
  hasSame(unit) {
    return this.isValid ? this.isEmpty() || this.e.minus(1).hasSame(this.s, unit) : false;
  }
  /**
   * Return whether this Interval has the same start and end DateTimes.
   * @return {boolean}
   */
  isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }
  /**
   * Return whether this Interval's start is after the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isAfter(dateTime) {
    if (!this.isValid)
      return false;
    return this.s > dateTime;
  }
  /**
   * Return whether this Interval's end is before the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  isBefore(dateTime) {
    if (!this.isValid)
      return false;
    return this.e <= dateTime;
  }
  /**
   * Return whether this Interval contains the specified DateTime.
   * @param {DateTime} dateTime
   * @return {boolean}
   */
  contains(dateTime) {
    if (!this.isValid)
      return false;
    return this.s <= dateTime && this.e > dateTime;
  }
  /**
   * "Sets" the start and/or end dates. Returns a newly-constructed Interval.
   * @param {Object} values - the values to set
   * @param {DateTime} values.start - the starting DateTime
   * @param {DateTime} values.end - the ending DateTime
   * @return {Interval}
   */
  set({ start, end } = {}) {
    if (!this.isValid)
      return this;
    return Interval.fromDateTimes(start || this.s, end || this.e);
  }
  /**
   * Split this Interval at each of the specified DateTimes
   * @param {...DateTime} dateTimes - the unit of time to count.
   * @return {Array}
   */
  splitAt(...dateTimes) {
    if (!this.isValid)
      return [];
    const sorted = dateTimes.map(friendlyDateTime).filter((d2) => this.contains(d2)).sort(), results = [];
    let { s: s2 } = this, i = 0;
    while (s2 < this.e) {
      const added = sorted[i] || this.e, next = +added > +this.e ? this.e : added;
      results.push(Interval.fromDateTimes(s2, next));
      s2 = next;
      i += 1;
    }
    return results;
  }
  /**
   * Split this Interval into smaller Intervals, each of the specified length.
   * Left over time is grouped into a smaller interval
   * @param {Duration|Object|number} duration - The length of each resulting interval.
   * @return {Array}
   */
  splitBy(duration) {
    const dur = Duration.fromDurationLike(duration);
    if (!this.isValid || !dur.isValid || dur.as("milliseconds") === 0) {
      return [];
    }
    let { s: s2 } = this, idx = 1, next;
    const results = [];
    while (s2 < this.e) {
      const added = this.start.plus(dur.mapUnits((x) => x * idx));
      next = +added > +this.e ? this.e : added;
      results.push(Interval.fromDateTimes(s2, next));
      s2 = next;
      idx += 1;
    }
    return results;
  }
  /**
   * Split this Interval into the specified number of smaller intervals.
   * @param {number} numberOfParts - The number of Intervals to divide the Interval into.
   * @return {Array}
   */
  divideEqually(numberOfParts) {
    if (!this.isValid)
      return [];
    return this.splitBy(this.length() / numberOfParts).slice(0, numberOfParts);
  }
  /**
   * Return whether this Interval overlaps with the specified Interval
   * @param {Interval} other
   * @return {boolean}
   */
  overlaps(other) {
    return this.e > other.s && this.s < other.e;
  }
  /**
   * Return whether this Interval's end is adjacent to the specified Interval's start.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsStart(other) {
    if (!this.isValid)
      return false;
    return +this.e === +other.s;
  }
  /**
   * Return whether this Interval's start is adjacent to the specified Interval's end.
   * @param {Interval} other
   * @return {boolean}
   */
  abutsEnd(other) {
    if (!this.isValid)
      return false;
    return +other.e === +this.s;
  }
  /**
   * Return whether this Interval engulfs the start and end of the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  engulfs(other) {
    if (!this.isValid)
      return false;
    return this.s <= other.s && this.e >= other.e;
  }
  /**
   * Return whether this Interval has the same start and end as the specified Interval.
   * @param {Interval} other
   * @return {boolean}
   */
  equals(other) {
    if (!this.isValid || !other.isValid) {
      return false;
    }
    return this.s.equals(other.s) && this.e.equals(other.e);
  }
  /**
   * Return an Interval representing the intersection of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the maximum start time and the minimum end time of the two Intervals.
   * Returns null if the intersection is empty, meaning, the intervals don't intersect.
   * @param {Interval} other
   * @return {Interval}
   */
  intersection(other) {
    if (!this.isValid)
      return this;
    const s2 = this.s > other.s ? this.s : other.s, e = this.e < other.e ? this.e : other.e;
    if (s2 >= e) {
      return null;
    } else {
      return Interval.fromDateTimes(s2, e);
    }
  }
  /**
   * Return an Interval representing the union of this Interval and the specified Interval.
   * Specifically, the resulting Interval has the minimum start time and the maximum end time of the two Intervals.
   * @param {Interval} other
   * @return {Interval}
   */
  union(other) {
    if (!this.isValid)
      return this;
    const s2 = this.s < other.s ? this.s : other.s, e = this.e > other.e ? this.e : other.e;
    return Interval.fromDateTimes(s2, e);
  }
  /**
   * Merge an array of Intervals into a equivalent minimal set of Intervals.
   * Combines overlapping and adjacent Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  static merge(intervals) {
    const [found, final] = intervals.sort((a, b) => a.s - b.s).reduce(
      ([sofar, current], item) => {
        if (!current) {
          return [sofar, item];
        } else if (current.overlaps(item) || current.abutsStart(item)) {
          return [sofar, current.union(item)];
        } else {
          return [sofar.concat([current]), item];
        }
      },
      [[], null]
    );
    if (final) {
      found.push(final);
    }
    return found;
  }
  /**
   * Return an array of Intervals representing the spans of time that only appear in one of the specified Intervals.
   * @param {Array} intervals
   * @return {Array}
   */
  static xor(intervals) {
    let start = null, currentCount = 0;
    const results = [], ends = intervals.map((i) => [
      { time: i.s, type: "s" },
      { time: i.e, type: "e" }
    ]), flattened = Array.prototype.concat(...ends), arr = flattened.sort((a, b) => a.time - b.time);
    for (const i of arr) {
      currentCount += i.type === "s" ? 1 : -1;
      if (currentCount === 1) {
        start = i.time;
      } else {
        if (start && +start !== +i.time) {
          results.push(Interval.fromDateTimes(start, i.time));
        }
        start = null;
      }
    }
    return Interval.merge(results);
  }
  /**
   * Return an Interval representing the span of time in this Interval that doesn't overlap with any of the specified Intervals.
   * @param {...Interval} intervals
   * @return {Array}
   */
  difference(...intervals) {
    return Interval.xor([this].concat(intervals)).map((i) => this.intersection(i)).filter((i) => i && !i.isEmpty());
  }
  /**
   * Returns a string representation of this Interval appropriate for debugging.
   * @return {string}
   */
  toString() {
    if (!this.isValid)
      return INVALID$1;
    return `[${this.s.toISO()} – ${this.e.toISO()})`;
  }
  /**
   * Returns a localized string representing this Interval. Accepts the same options as the
   * Intl.DateTimeFormat constructor and any presets defined by Luxon, such as
   * {@link DateTime.DATE_FULL} or {@link DateTime.TIME_SIMPLE}. The exact behavior of this method
   * is browser-specific, but in general it will return an appropriate representation of the
   * Interval in the assigned locale. Defaults to the system's locale if no locale has been
   * specified.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {Object} [formatOpts=DateTime.DATE_SHORT] - Either a DateTime preset or
   * Intl.DateTimeFormat constructor options.
   * @param {Object} opts - Options to override the configuration of the start DateTime.
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(); //=> 11/7/2022 – 11/8/2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL); //=> November 7 – 8, 2022
   * @example Interval.fromISO('2022-11-07T09:00Z/2022-11-08T09:00Z').toLocaleString(DateTime.DATE_FULL, { locale: 'fr-FR' }); //=> 7–8 novembre 2022
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString(DateTime.TIME_SIMPLE); //=> 6:00 – 8:00 PM
   * @example Interval.fromISO('2022-11-07T17:00Z/2022-11-07T19:00Z').toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> Mon, Nov 07, 6:00 – 8:00 p
   * @return {string}
   */
  toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
    return this.isValid ? Formatter.create(this.s.loc.clone(opts), formatOpts).formatInterval(this) : INVALID$1;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this Interval.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISO(opts) {
    if (!this.isValid)
      return INVALID$1;
    return `${this.s.toISO(opts)}/${this.e.toISO(opts)}`;
  }
  /**
   * Returns an ISO 8601-compliant string representation of date of this Interval.
   * The time components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @return {string}
   */
  toISODate() {
    if (!this.isValid)
      return INVALID$1;
    return `${this.s.toISODate()}/${this.e.toISODate()}`;
  }
  /**
   * Returns an ISO 8601-compliant string representation of time of this Interval.
   * The date components are ignored.
   * @see https://en.wikipedia.org/wiki/ISO_8601#Time_intervals
   * @param {Object} opts - The same options as {@link DateTime#toISO}
   * @return {string}
   */
  toISOTime(opts) {
    if (!this.isValid)
      return INVALID$1;
    return `${this.s.toISOTime(opts)}/${this.e.toISOTime(opts)}`;
  }
  /**
   * Returns a string representation of this Interval formatted according to the specified format
   * string. **You may not want this.** See {@link Interval#toLocaleString} for a more flexible
   * formatting tool.
   * @param {string} dateFormat - The format string. This string formats the start and end time.
   * See {@link DateTime#toFormat} for details.
   * @param {Object} opts - Options.
   * @param {string} [opts.separator =  ' – '] - A separator to place between the start and end
   * representations.
   * @return {string}
   */
  toFormat(dateFormat, { separator = " – " } = {}) {
    if (!this.isValid)
      return INVALID$1;
    return `${this.s.toFormat(dateFormat)}${separator}${this.e.toFormat(dateFormat)}`;
  }
  /**
   * Return a Duration representing the time spanned by this interval.
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example Interval.fromDateTimes(dt1, dt2).toDuration().toObject() //=> { milliseconds: 88489257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('days').toObject() //=> { days: 1.0241812152777778 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes']).toObject() //=> { hours: 24, minutes: 34.82095 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration(['hours', 'minutes', 'seconds']).toObject() //=> { hours: 24, minutes: 34, seconds: 49.257 }
   * @example Interval.fromDateTimes(dt1, dt2).toDuration('seconds').toObject() //=> { seconds: 88489.257 }
   * @return {Duration}
   */
  toDuration(unit, opts) {
    if (!this.isValid) {
      return Duration.invalid(this.invalidReason);
    }
    return this.e.diff(this.s, unit, opts);
  }
  /**
   * Run mapFn on the interval start and end, returning a new Interval from the resulting DateTimes
   * @param {function} mapFn
   * @return {Interval}
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.toUTC())
   * @example Interval.fromDateTimes(dt1, dt2).mapEndpoints(endpoint => endpoint.plus({ hours: 2 }))
   */
  mapEndpoints(mapFn) {
    return Interval.fromDateTimes(mapFn(this.s), mapFn(this.e));
  }
}
class Info {
  /**
   * Return whether the specified zone contains a DST.
   * @param {string|Zone} [zone='local'] - Zone to check. Defaults to the environment's local zone.
   * @return {boolean}
   */
  static hasDST(zone = Settings.defaultZone) {
    const proto = DateTime.now().setZone(zone).set({ month: 12 });
    return !zone.isUniversal && proto.offset !== proto.set({ month: 6 }).offset;
  }
  /**
   * Return whether the specified zone is a valid IANA specifier.
   * @param {string} zone - Zone to check
   * @return {boolean}
   */
  static isValidIANAZone(zone) {
    return IANAZone.isValidZone(zone);
  }
  /**
   * Converts the input into a {@link Zone} instance.
   *
   * * If `input` is already a Zone instance, it is returned unchanged.
   * * If `input` is a string containing a valid time zone name, a Zone instance
   *   with that name is returned.
   * * If `input` is a string that doesn't refer to a known time zone, a Zone
   *   instance with {@link Zone#isValid} == false is returned.
   * * If `input is a number, a Zone instance with the specified fixed offset
   *   in minutes is returned.
   * * If `input` is `null` or `undefined`, the default zone is returned.
   * @param {string|Zone|number} [input] - the value to be converted
   * @return {Zone}
   */
  static normalizeZone(input) {
    return normalizeZone(input, Settings.defaultZone);
  }
  /**
   * Return an array of standalone month names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @example Info.months()[0] //=> 'January'
   * @example Info.months('short')[0] //=> 'Jan'
   * @example Info.months('numeric')[0] //=> '1'
   * @example Info.months('short', { locale: 'fr-CA' } )[0] //=> 'janv.'
   * @example Info.months('numeric', { locale: 'ar' })[0] //=> '١'
   * @example Info.months('long', { outputCalendar: 'islamic' })[0] //=> 'Rabiʻ I'
   * @return {Array}
   */
  static months(length = "long", { locale = null, numberingSystem = null, locObj = null, outputCalendar = "gregory" } = {}) {
    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length);
  }
  /**
   * Return an array of format month names.
   * Format months differ from standalone months in that they're meant to appear next to the day of the month. In some languages, that
   * changes the string.
   * See {@link Info#months}
   * @param {string} [length='long'] - the length of the month representation, such as "numeric", "2-digit", "narrow", "short", "long"
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @param {string} [opts.outputCalendar='gregory'] - the calendar
   * @return {Array}
   */
  static monthsFormat(length = "long", { locale = null, numberingSystem = null, locObj = null, outputCalendar = "gregory" } = {}) {
    return (locObj || Locale.create(locale, numberingSystem, outputCalendar)).months(length, true);
  }
  /**
   * Return an array of standalone week names.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param {string} [length='long'] - the length of the weekday representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @example Info.weekdays()[0] //=> 'Monday'
   * @example Info.weekdays('short')[0] //=> 'Mon'
   * @example Info.weekdays('short', { locale: 'fr-CA' })[0] //=> 'lun.'
   * @example Info.weekdays('short', { locale: 'ar' })[0] //=> 'الاثنين'
   * @return {Array}
   */
  static weekdays(length = "long", { locale = null, numberingSystem = null, locObj = null } = {}) {
    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length);
  }
  /**
   * Return an array of format week names.
   * Format weekdays differ from standalone weekdays in that they're meant to appear next to more date information. In some languages, that
   * changes the string.
   * See {@link Info#weekdays}
   * @param {string} [length='long'] - the length of the month representation, such as "narrow", "short", "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale=null] - the locale code
   * @param {string} [opts.numberingSystem=null] - the numbering system
   * @param {string} [opts.locObj=null] - an existing locale object to use
   * @return {Array}
   */
  static weekdaysFormat(length = "long", { locale = null, numberingSystem = null, locObj = null } = {}) {
    return (locObj || Locale.create(locale, numberingSystem, null)).weekdays(length, true);
  }
  /**
   * Return an array of meridiems.
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.meridiems() //=> [ 'AM', 'PM' ]
   * @example Info.meridiems({ locale: 'my' }) //=> [ 'နံနက်', 'ညနေ' ]
   * @return {Array}
   */
  static meridiems({ locale = null } = {}) {
    return Locale.create(locale).meridiems();
  }
  /**
   * Return an array of eras, such as ['BC', 'AD']. The locale can be specified, but the calendar system is always Gregorian.
   * @param {string} [length='short'] - the length of the era representation, such as "short" or "long".
   * @param {Object} opts - options
   * @param {string} [opts.locale] - the locale code
   * @example Info.eras() //=> [ 'BC', 'AD' ]
   * @example Info.eras('long') //=> [ 'Before Christ', 'Anno Domini' ]
   * @example Info.eras('long', { locale: 'fr' }) //=> [ 'avant Jésus-Christ', 'après Jésus-Christ' ]
   * @return {Array}
   */
  static eras(length = "short", { locale = null } = {}) {
    return Locale.create(locale, null, "gregory").eras(length);
  }
  /**
   * Return the set of available features in this environment.
   * Some features of Luxon are not available in all environments. For example, on older browsers, relative time formatting support is not available. Use this function to figure out if that's the case.
   * Keys:
   * * `relative`: whether this environment supports relative time formatting
   * @example Info.features() //=> { relative: false }
   * @return {Object}
   */
  static features() {
    return { relative: hasRelative() };
  }
}
function dayDiff(earlier, later) {
  const utcDayStart = (dt) => dt.toUTC(0, { keepLocalTime: true }).startOf("day").valueOf(), ms2 = utcDayStart(later) - utcDayStart(earlier);
  return Math.floor(Duration.fromMillis(ms2).as("days"));
}
function highOrderDiffs(cursor, later, units) {
  const differs = [
    ["years", (a, b) => b.year - a.year],
    ["quarters", (a, b) => b.quarter - a.quarter + (b.year - a.year) * 4],
    ["months", (a, b) => b.month - a.month + (b.year - a.year) * 12],
    [
      "weeks",
      (a, b) => {
        const days = dayDiff(a, b);
        return (days - days % 7) / 7;
      }
    ],
    ["days", dayDiff]
  ];
  const results = {};
  const earlier = cursor;
  let lowestOrder, highWater;
  for (const [unit, differ] of differs) {
    if (units.indexOf(unit) >= 0) {
      lowestOrder = unit;
      results[unit] = differ(cursor, later);
      highWater = earlier.plus(results);
      if (highWater > later) {
        results[unit]--;
        cursor = earlier.plus(results);
      } else {
        cursor = highWater;
      }
    }
  }
  return [cursor, results, highWater, lowestOrder];
}
function diff(earlier, later, units, opts) {
  let [cursor, results, highWater, lowestOrder] = highOrderDiffs(earlier, later, units);
  const remainingMillis = later - cursor;
  const lowerOrderUnits = units.filter(
    (u) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(u) >= 0
  );
  if (lowerOrderUnits.length === 0) {
    if (highWater < later) {
      highWater = cursor.plus({ [lowestOrder]: 1 });
    }
    if (highWater !== cursor) {
      results[lowestOrder] = (results[lowestOrder] || 0) + remainingMillis / (highWater - cursor);
    }
  }
  const duration = Duration.fromObject(results, opts);
  if (lowerOrderUnits.length > 0) {
    return Duration.fromMillis(remainingMillis, opts).shiftTo(...lowerOrderUnits).plus(duration);
  } else {
    return duration;
  }
}
const numberingSystems = {
  arab: "[٠-٩]",
  arabext: "[۰-۹]",
  bali: "[᭐-᭙]",
  beng: "[০-৯]",
  deva: "[०-९]",
  fullwide: "[０-９]",
  gujr: "[૦-૯]",
  hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
  khmr: "[០-៩]",
  knda: "[೦-೯]",
  laoo: "[໐-໙]",
  limb: "[᥆-᥏]",
  mlym: "[൦-൯]",
  mong: "[᠐-᠙]",
  mymr: "[၀-၉]",
  orya: "[୦-୯]",
  tamldec: "[௦-௯]",
  telu: "[౦-౯]",
  thai: "[๐-๙]",
  tibt: "[༠-༩]",
  latn: "\\d"
};
const numberingSystemsUTF16 = {
  arab: [1632, 1641],
  arabext: [1776, 1785],
  bali: [6992, 7001],
  beng: [2534, 2543],
  deva: [2406, 2415],
  fullwide: [65296, 65303],
  gujr: [2790, 2799],
  khmr: [6112, 6121],
  knda: [3302, 3311],
  laoo: [3792, 3801],
  limb: [6470, 6479],
  mlym: [3430, 3439],
  mong: [6160, 6169],
  mymr: [4160, 4169],
  orya: [2918, 2927],
  tamldec: [3046, 3055],
  telu: [3174, 3183],
  thai: [3664, 3673],
  tibt: [3872, 3881]
};
const hanidecChars = numberingSystems.hanidec.replace(/[\[|\]]/g, "").split("");
function parseDigits(str) {
  let value = parseInt(str, 10);
  if (isNaN(value)) {
    value = "";
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      if (str[i].search(numberingSystems.hanidec) !== -1) {
        value += hanidecChars.indexOf(str[i]);
      } else {
        for (const key in numberingSystemsUTF16) {
          const [min, max] = numberingSystemsUTF16[key];
          if (code >= min && code <= max) {
            value += code - min;
          }
        }
      }
    }
    return parseInt(value, 10);
  } else {
    return value;
  }
}
function digitRegex({ numberingSystem }, append = "") {
  return new RegExp(`${numberingSystems[numberingSystem || "latn"]}${append}`);
}
const MISSING_FTP = "missing Intl.DateTimeFormat.formatToParts support";
function intUnit(regex, post = (i) => i) {
  return { regex, deser: ([s2]) => post(parseDigits(s2)) };
}
const NBSP = String.fromCharCode(160);
const spaceOrNBSP = `[ ${NBSP}]`;
const spaceOrNBSPRegExp = new RegExp(spaceOrNBSP, "g");
function fixListRegex(s2) {
  return s2.replace(/\./g, "\\.?").replace(spaceOrNBSPRegExp, spaceOrNBSP);
}
function stripInsensitivities(s2) {
  return s2.replace(/\./g, "").replace(spaceOrNBSPRegExp, " ").toLowerCase();
}
function oneOf(strings, startIndex) {
  if (strings === null) {
    return null;
  } else {
    return {
      regex: RegExp(strings.map(fixListRegex).join("|")),
      deser: ([s2]) => strings.findIndex((i) => stripInsensitivities(s2) === stripInsensitivities(i)) + startIndex
    };
  }
}
function offset(regex, groups) {
  return { regex, deser: ([, h2, m2]) => signedOffset(h2, m2), groups };
}
function simple(regex) {
  return { regex, deser: ([s2]) => s2 };
}
function escapeToken(value) {
  return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function unitForToken(token, loc) {
  const one = digitRegex(loc), two = digitRegex(loc, "{2}"), three = digitRegex(loc, "{3}"), four = digitRegex(loc, "{4}"), six = digitRegex(loc, "{6}"), oneOrTwo = digitRegex(loc, "{1,2}"), oneToThree = digitRegex(loc, "{1,3}"), oneToSix = digitRegex(loc, "{1,6}"), oneToNine = digitRegex(loc, "{1,9}"), twoToFour = digitRegex(loc, "{2,4}"), fourToSix = digitRegex(loc, "{4,6}"), literal = (t) => ({ regex: RegExp(escapeToken(t.val)), deser: ([s2]) => s2, literal: true }), unitate = (t) => {
    if (token.literal) {
      return literal(t);
    }
    switch (t.val) {
      case "G":
        return oneOf(loc.eras("short", false), 0);
      case "GG":
        return oneOf(loc.eras("long", false), 0);
      case "y":
        return intUnit(oneToSix);
      case "yy":
        return intUnit(twoToFour, untruncateYear);
      case "yyyy":
        return intUnit(four);
      case "yyyyy":
        return intUnit(fourToSix);
      case "yyyyyy":
        return intUnit(six);
      case "M":
        return intUnit(oneOrTwo);
      case "MM":
        return intUnit(two);
      case "MMM":
        return oneOf(loc.months("short", true, false), 1);
      case "MMMM":
        return oneOf(loc.months("long", true, false), 1);
      case "L":
        return intUnit(oneOrTwo);
      case "LL":
        return intUnit(two);
      case "LLL":
        return oneOf(loc.months("short", false, false), 1);
      case "LLLL":
        return oneOf(loc.months("long", false, false), 1);
      case "d":
        return intUnit(oneOrTwo);
      case "dd":
        return intUnit(two);
      case "o":
        return intUnit(oneToThree);
      case "ooo":
        return intUnit(three);
      case "HH":
        return intUnit(two);
      case "H":
        return intUnit(oneOrTwo);
      case "hh":
        return intUnit(two);
      case "h":
        return intUnit(oneOrTwo);
      case "mm":
        return intUnit(two);
      case "m":
        return intUnit(oneOrTwo);
      case "q":
        return intUnit(oneOrTwo);
      case "qq":
        return intUnit(two);
      case "s":
        return intUnit(oneOrTwo);
      case "ss":
        return intUnit(two);
      case "S":
        return intUnit(oneToThree);
      case "SSS":
        return intUnit(three);
      case "u":
        return simple(oneToNine);
      case "uu":
        return simple(oneOrTwo);
      case "uuu":
        return intUnit(one);
      case "a":
        return oneOf(loc.meridiems(), 0);
      case "kkkk":
        return intUnit(four);
      case "kk":
        return intUnit(twoToFour, untruncateYear);
      case "W":
        return intUnit(oneOrTwo);
      case "WW":
        return intUnit(two);
      case "E":
      case "c":
        return intUnit(one);
      case "EEE":
        return oneOf(loc.weekdays("short", false, false), 1);
      case "EEEE":
        return oneOf(loc.weekdays("long", false, false), 1);
      case "ccc":
        return oneOf(loc.weekdays("short", true, false), 1);
      case "cccc":
        return oneOf(loc.weekdays("long", true, false), 1);
      case "Z":
      case "ZZ":
        return offset(new RegExp(`([+-]${oneOrTwo.source})(?::(${two.source}))?`), 2);
      case "ZZZ":
        return offset(new RegExp(`([+-]${oneOrTwo.source})(${two.source})?`), 2);
      case "z":
        return simple(/[a-z_+-/]{1,256}?/i);
      case " ":
        return simple(/[^\S\n\r]/);
      default:
        return literal(t);
    }
  };
  const unit = unitate(token) || {
    invalidReason: MISSING_FTP
  };
  unit.token = token;
  return unit;
}
const partTypeStyleToTokenVal = {
  year: {
    "2-digit": "yy",
    numeric: "yyyyy"
  },
  month: {
    numeric: "M",
    "2-digit": "MM",
    short: "MMM",
    long: "MMMM"
  },
  day: {
    numeric: "d",
    "2-digit": "dd"
  },
  weekday: {
    short: "EEE",
    long: "EEEE"
  },
  dayperiod: "a",
  dayPeriod: "a",
  hour: {
    numeric: "h",
    "2-digit": "hh"
  },
  minute: {
    numeric: "m",
    "2-digit": "mm"
  },
  second: {
    numeric: "s",
    "2-digit": "ss"
  },
  timeZoneName: {
    long: "ZZZZZ",
    short: "ZZZ"
  }
};
function tokenForPart(part, formatOpts) {
  const { type, value } = part;
  if (type === "literal") {
    const isSpace = /^\s+$/.test(value);
    return {
      literal: !isSpace,
      val: isSpace ? " " : value
    };
  }
  const style = formatOpts[type];
  let val = partTypeStyleToTokenVal[type];
  if (typeof val === "object") {
    val = val[style];
  }
  if (val) {
    return {
      literal: false,
      val
    };
  }
  return void 0;
}
function buildRegex(units) {
  const re = units.map((u) => u.regex).reduce((f, r) => `${f}(${r.source})`, "");
  return [`^${re}$`, units];
}
function match(input, regex, handlers) {
  const matches = input.match(regex);
  if (matches) {
    const all = {};
    let matchIndex = 1;
    for (const i in handlers) {
      if (hasOwnProperty(handlers, i)) {
        const h2 = handlers[i], groups = h2.groups ? h2.groups + 1 : 1;
        if (!h2.literal && h2.token) {
          all[h2.token.val[0]] = h2.deser(matches.slice(matchIndex, matchIndex + groups));
        }
        matchIndex += groups;
      }
    }
    return [matches, all];
  } else {
    return [matches, {}];
  }
}
function dateTimeFromMatches(matches) {
  const toField = (token) => {
    switch (token) {
      case "S":
        return "millisecond";
      case "s":
        return "second";
      case "m":
        return "minute";
      case "h":
      case "H":
        return "hour";
      case "d":
        return "day";
      case "o":
        return "ordinal";
      case "L":
      case "M":
        return "month";
      case "y":
        return "year";
      case "E":
      case "c":
        return "weekday";
      case "W":
        return "weekNumber";
      case "k":
        return "weekYear";
      case "q":
        return "quarter";
      default:
        return null;
    }
  };
  let zone = null;
  let specificOffset;
  if (!isUndefined(matches.z)) {
    zone = IANAZone.create(matches.z);
  }
  if (!isUndefined(matches.Z)) {
    if (!zone) {
      zone = new FixedOffsetZone(matches.Z);
    }
    specificOffset = matches.Z;
  }
  if (!isUndefined(matches.q)) {
    matches.M = (matches.q - 1) * 3 + 1;
  }
  if (!isUndefined(matches.h)) {
    if (matches.h < 12 && matches.a === 1) {
      matches.h += 12;
    } else if (matches.h === 12 && matches.a === 0) {
      matches.h = 0;
    }
  }
  if (matches.G === 0 && matches.y) {
    matches.y = -matches.y;
  }
  if (!isUndefined(matches.u)) {
    matches.S = parseMillis(matches.u);
  }
  const vals = Object.keys(matches).reduce((r, k) => {
    const f = toField(k);
    if (f) {
      r[f] = matches[k];
    }
    return r;
  }, {});
  return [vals, zone, specificOffset];
}
let dummyDateTimeCache = null;
function getDummyDateTime() {
  if (!dummyDateTimeCache) {
    dummyDateTimeCache = DateTime.fromMillis(1555555555555);
  }
  return dummyDateTimeCache;
}
function maybeExpandMacroToken(token, locale) {
  if (token.literal) {
    return token;
  }
  const formatOpts = Formatter.macroTokenToFormatOpts(token.val);
  const tokens = formatOptsToTokens(formatOpts, locale);
  if (tokens == null || tokens.includes(void 0)) {
    return token;
  }
  return tokens;
}
function expandMacroTokens(tokens, locale) {
  return Array.prototype.concat(...tokens.map((t) => maybeExpandMacroToken(t, locale)));
}
function explainFromTokens(locale, input, format) {
  const tokens = expandMacroTokens(Formatter.parseFormat(format), locale), units = tokens.map((t) => unitForToken(t, locale)), disqualifyingUnit = units.find((t) => t.invalidReason);
  if (disqualifyingUnit) {
    return { input, tokens, invalidReason: disqualifyingUnit.invalidReason };
  } else {
    const [regexString, handlers] = buildRegex(units), regex = RegExp(regexString, "i"), [rawMatches, matches] = match(input, regex, handlers), [result, zone, specificOffset] = matches ? dateTimeFromMatches(matches) : [null, null, void 0];
    if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
      throw new ConflictingSpecificationError(
        "Can't include meridiem when specifying 24-hour format"
      );
    }
    return { input, tokens, regex, rawMatches, matches, result, zone, specificOffset };
  }
}
function parseFromTokens(locale, input, format) {
  const { result, zone, specificOffset, invalidReason } = explainFromTokens(locale, input, format);
  return [result, zone, specificOffset, invalidReason];
}
function formatOptsToTokens(formatOpts, locale) {
  if (!formatOpts) {
    return null;
  }
  const formatter = Formatter.create(locale, formatOpts);
  const parts = formatter.formatDateTimeParts(getDummyDateTime());
  return parts.map((p) => tokenForPart(p, formatOpts));
}
const nonLeapLadder = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], leapLadder = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function unitOutOfRange(unit, value) {
  return new Invalid(
    "unit out of range",
    `you specified ${value} (of type ${typeof value}) as a ${unit}, which is invalid`
  );
}
function dayOfWeek(year, month, day) {
  const d2 = new Date(Date.UTC(year, month - 1, day));
  if (year < 100 && year >= 0) {
    d2.setUTCFullYear(d2.getUTCFullYear() - 1900);
  }
  const js = d2.getUTCDay();
  return js === 0 ? 7 : js;
}
function computeOrdinal(year, month, day) {
  return day + (isLeapYear(year) ? leapLadder : nonLeapLadder)[month - 1];
}
function uncomputeOrdinal(year, ordinal) {
  const table = isLeapYear(year) ? leapLadder : nonLeapLadder, month0 = table.findIndex((i) => i < ordinal), day = ordinal - table[month0];
  return { month: month0 + 1, day };
}
function gregorianToWeek(gregObj) {
  const { year, month, day } = gregObj, ordinal = computeOrdinal(year, month, day), weekday = dayOfWeek(year, month, day);
  let weekNumber = Math.floor((ordinal - weekday + 10) / 7), weekYear;
  if (weekNumber < 1) {
    weekYear = year - 1;
    weekNumber = weeksInWeekYear(weekYear);
  } else if (weekNumber > weeksInWeekYear(year)) {
    weekYear = year + 1;
    weekNumber = 1;
  } else {
    weekYear = year;
  }
  return { weekYear, weekNumber, weekday, ...timeObject(gregObj) };
}
function weekToGregorian(weekData) {
  const { weekYear, weekNumber, weekday } = weekData, weekdayOfJan4 = dayOfWeek(weekYear, 1, 4), yearInDays = daysInYear(weekYear);
  let ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 3, year;
  if (ordinal < 1) {
    year = weekYear - 1;
    ordinal += daysInYear(year);
  } else if (ordinal > yearInDays) {
    year = weekYear + 1;
    ordinal -= daysInYear(weekYear);
  } else {
    year = weekYear;
  }
  const { month, day } = uncomputeOrdinal(year, ordinal);
  return { year, month, day, ...timeObject(weekData) };
}
function gregorianToOrdinal(gregData) {
  const { year, month, day } = gregData;
  const ordinal = computeOrdinal(year, month, day);
  return { year, ordinal, ...timeObject(gregData) };
}
function ordinalToGregorian(ordinalData) {
  const { year, ordinal } = ordinalData;
  const { month, day } = uncomputeOrdinal(year, ordinal);
  return { year, month, day, ...timeObject(ordinalData) };
}
function hasInvalidWeekData(obj) {
  const validYear = isInteger(obj.weekYear), validWeek = integerBetween(obj.weekNumber, 1, weeksInWeekYear(obj.weekYear)), validWeekday = integerBetween(obj.weekday, 1, 7);
  if (!validYear) {
    return unitOutOfRange("weekYear", obj.weekYear);
  } else if (!validWeek) {
    return unitOutOfRange("week", obj.week);
  } else if (!validWeekday) {
    return unitOutOfRange("weekday", obj.weekday);
  } else
    return false;
}
function hasInvalidOrdinalData(obj) {
  const validYear = isInteger(obj.year), validOrdinal = integerBetween(obj.ordinal, 1, daysInYear(obj.year));
  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validOrdinal) {
    return unitOutOfRange("ordinal", obj.ordinal);
  } else
    return false;
}
function hasInvalidGregorianData(obj) {
  const validYear = isInteger(obj.year), validMonth = integerBetween(obj.month, 1, 12), validDay = integerBetween(obj.day, 1, daysInMonth(obj.year, obj.month));
  if (!validYear) {
    return unitOutOfRange("year", obj.year);
  } else if (!validMonth) {
    return unitOutOfRange("month", obj.month);
  } else if (!validDay) {
    return unitOutOfRange("day", obj.day);
  } else
    return false;
}
function hasInvalidTimeData(obj) {
  const { hour, minute, second, millisecond } = obj;
  const validHour = integerBetween(hour, 0, 23) || hour === 24 && minute === 0 && second === 0 && millisecond === 0, validMinute = integerBetween(minute, 0, 59), validSecond = integerBetween(second, 0, 59), validMillisecond = integerBetween(millisecond, 0, 999);
  if (!validHour) {
    return unitOutOfRange("hour", hour);
  } else if (!validMinute) {
    return unitOutOfRange("minute", minute);
  } else if (!validSecond) {
    return unitOutOfRange("second", second);
  } else if (!validMillisecond) {
    return unitOutOfRange("millisecond", millisecond);
  } else
    return false;
}
const INVALID = "Invalid DateTime";
const MAX_DATE = 864e13;
function unsupportedZone(zone) {
  return new Invalid("unsupported zone", `the zone "${zone.name}" is not supported`);
}
function possiblyCachedWeekData(dt) {
  if (dt.weekData === null) {
    dt.weekData = gregorianToWeek(dt.c);
  }
  return dt.weekData;
}
function clone(inst, alts) {
  const current = {
    ts: inst.ts,
    zone: inst.zone,
    c: inst.c,
    o: inst.o,
    loc: inst.loc,
    invalid: inst.invalid
  };
  return new DateTime({ ...current, ...alts, old: current });
}
function fixOffset(localTS, o, tz) {
  let utcGuess = localTS - o * 60 * 1e3;
  const o2 = tz.offset(utcGuess);
  if (o === o2) {
    return [utcGuess, o];
  }
  utcGuess -= (o2 - o) * 60 * 1e3;
  const o3 = tz.offset(utcGuess);
  if (o2 === o3) {
    return [utcGuess, o2];
  }
  return [localTS - Math.min(o2, o3) * 60 * 1e3, Math.max(o2, o3)];
}
function tsToObj(ts, offset2) {
  ts += offset2 * 60 * 1e3;
  const d2 = new Date(ts);
  return {
    year: d2.getUTCFullYear(),
    month: d2.getUTCMonth() + 1,
    day: d2.getUTCDate(),
    hour: d2.getUTCHours(),
    minute: d2.getUTCMinutes(),
    second: d2.getUTCSeconds(),
    millisecond: d2.getUTCMilliseconds()
  };
}
function objToTS(obj, offset2, zone) {
  return fixOffset(objToLocalTS(obj), offset2, zone);
}
function adjustTime(inst, dur) {
  const oPre = inst.o, year = inst.c.year + Math.trunc(dur.years), month = inst.c.month + Math.trunc(dur.months) + Math.trunc(dur.quarters) * 3, c2 = {
    ...inst.c,
    year,
    month,
    day: Math.min(inst.c.day, daysInMonth(year, month)) + Math.trunc(dur.days) + Math.trunc(dur.weeks) * 7
  }, millisToAdd = Duration.fromObject({
    years: dur.years - Math.trunc(dur.years),
    quarters: dur.quarters - Math.trunc(dur.quarters),
    months: dur.months - Math.trunc(dur.months),
    weeks: dur.weeks - Math.trunc(dur.weeks),
    days: dur.days - Math.trunc(dur.days),
    hours: dur.hours,
    minutes: dur.minutes,
    seconds: dur.seconds,
    milliseconds: dur.milliseconds
  }).as("milliseconds"), localTS = objToLocalTS(c2);
  let [ts, o] = fixOffset(localTS, oPre, inst.zone);
  if (millisToAdd !== 0) {
    ts += millisToAdd;
    o = inst.zone.offset(ts);
  }
  return { ts, o };
}
function parseDataToDateTime(parsed, parsedZone, opts, format, text2, specificOffset) {
  const { setZone, zone } = opts;
  if (parsed && Object.keys(parsed).length !== 0 || parsedZone) {
    const interpretationZone = parsedZone || zone, inst = DateTime.fromObject(parsed, {
      ...opts,
      zone: interpretationZone,
      specificOffset
    });
    return setZone ? inst : inst.setZone(zone);
  } else {
    return DateTime.invalid(
      new Invalid("unparsable", `the input "${text2}" can't be parsed as ${format}`)
    );
  }
}
function toTechFormat(dt, format, allowZ = true) {
  return dt.isValid ? Formatter.create(Locale.create("en-US"), {
    allowZ,
    forceSimple: true
  }).formatDateTimeFromString(dt, format) : null;
}
function toISODate(o, extended) {
  const longFormat = o.c.year > 9999 || o.c.year < 0;
  let c2 = "";
  if (longFormat && o.c.year >= 0)
    c2 += "+";
  c2 += padStart(o.c.year, longFormat ? 6 : 4);
  if (extended) {
    c2 += "-";
    c2 += padStart(o.c.month);
    c2 += "-";
    c2 += padStart(o.c.day);
  } else {
    c2 += padStart(o.c.month);
    c2 += padStart(o.c.day);
  }
  return c2;
}
function toISOTime(o, extended, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone) {
  let c2 = padStart(o.c.hour);
  if (extended) {
    c2 += ":";
    c2 += padStart(o.c.minute);
    if (o.c.second !== 0 || !suppressSeconds) {
      c2 += ":";
    }
  } else {
    c2 += padStart(o.c.minute);
  }
  if (o.c.second !== 0 || !suppressSeconds) {
    c2 += padStart(o.c.second);
    if (o.c.millisecond !== 0 || !suppressMilliseconds) {
      c2 += ".";
      c2 += padStart(o.c.millisecond, 3);
    }
  }
  if (includeOffset) {
    if (o.isOffsetFixed && o.offset === 0 && !extendedZone) {
      c2 += "Z";
    } else if (o.o < 0) {
      c2 += "-";
      c2 += padStart(Math.trunc(-o.o / 60));
      c2 += ":";
      c2 += padStart(Math.trunc(-o.o % 60));
    } else {
      c2 += "+";
      c2 += padStart(Math.trunc(o.o / 60));
      c2 += ":";
      c2 += padStart(Math.trunc(o.o % 60));
    }
  }
  if (extendedZone) {
    c2 += "[" + o.zone.ianaName + "]";
  }
  return c2;
}
const defaultUnitValues = {
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, defaultWeekUnitValues = {
  weekNumber: 1,
  weekday: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
}, defaultOrdinalUnitValues = {
  ordinal: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0
};
const orderedUnits = ["year", "month", "day", "hour", "minute", "second", "millisecond"], orderedWeekUnits = [
  "weekYear",
  "weekNumber",
  "weekday",
  "hour",
  "minute",
  "second",
  "millisecond"
], orderedOrdinalUnits = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function normalizeUnit(unit) {
  const normalized = {
    year: "year",
    years: "year",
    month: "month",
    months: "month",
    day: "day",
    days: "day",
    hour: "hour",
    hours: "hour",
    minute: "minute",
    minutes: "minute",
    quarter: "quarter",
    quarters: "quarter",
    second: "second",
    seconds: "second",
    millisecond: "millisecond",
    milliseconds: "millisecond",
    weekday: "weekday",
    weekdays: "weekday",
    weeknumber: "weekNumber",
    weeksnumber: "weekNumber",
    weeknumbers: "weekNumber",
    weekyear: "weekYear",
    weekyears: "weekYear",
    ordinal: "ordinal"
  }[unit.toLowerCase()];
  if (!normalized)
    throw new InvalidUnitError(unit);
  return normalized;
}
function quickDT(obj, opts) {
  const zone = normalizeZone(opts.zone, Settings.defaultZone), loc = Locale.fromObject(opts), tsNow = Settings.now();
  let ts, o;
  if (!isUndefined(obj.year)) {
    for (const u of orderedUnits) {
      if (isUndefined(obj[u])) {
        obj[u] = defaultUnitValues[u];
      }
    }
    const invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);
    if (invalid) {
      return DateTime.invalid(invalid);
    }
    const offsetProvis = zone.offset(tsNow);
    [ts, o] = objToTS(obj, offsetProvis, zone);
  } else {
    ts = tsNow;
  }
  return new DateTime({ ts, zone, loc, o });
}
function diffRelative(start, end, opts) {
  const round = isUndefined(opts.round) ? true : opts.round, format = (c2, unit) => {
    c2 = roundTo(c2, round || opts.calendary ? 0 : 2, true);
    const formatter = end.loc.clone(opts).relFormatter(opts);
    return formatter.format(c2, unit);
  }, differ = (unit) => {
    if (opts.calendary) {
      if (!end.hasSame(start, unit)) {
        return end.startOf(unit).diff(start.startOf(unit), unit).get(unit);
      } else
        return 0;
    } else {
      return end.diff(start, unit).get(unit);
    }
  };
  if (opts.unit) {
    return format(differ(opts.unit), opts.unit);
  }
  for (const unit of opts.units) {
    const count = differ(unit);
    if (Math.abs(count) >= 1) {
      return format(count, unit);
    }
  }
  return format(start > end ? -0 : 0, opts.units[opts.units.length - 1]);
}
function lastOpts(argList) {
  let opts = {}, args;
  if (argList.length > 0 && typeof argList[argList.length - 1] === "object") {
    opts = argList[argList.length - 1];
    args = Array.from(argList).slice(0, argList.length - 1);
  } else {
    args = Array.from(argList);
  }
  return [opts, args];
}
class DateTime {
  /**
   * @access private
   */
  constructor(config2) {
    const zone = config2.zone || Settings.defaultZone;
    let invalid = config2.invalid || (Number.isNaN(config2.ts) ? new Invalid("invalid input") : null) || (!zone.isValid ? unsupportedZone(zone) : null);
    this.ts = isUndefined(config2.ts) ? Settings.now() : config2.ts;
    let c2 = null, o = null;
    if (!invalid) {
      const unchanged = config2.old && config2.old.ts === this.ts && config2.old.zone.equals(zone);
      if (unchanged) {
        [c2, o] = [config2.old.c, config2.old.o];
      } else {
        const ot = zone.offset(this.ts);
        c2 = tsToObj(this.ts, ot);
        invalid = Number.isNaN(c2.year) ? new Invalid("invalid input") : null;
        c2 = invalid ? null : c2;
        o = invalid ? null : ot;
      }
    }
    this._zone = zone;
    this.loc = config2.loc || Locale.create();
    this.invalid = invalid;
    this.weekData = null;
    this.c = c2;
    this.o = o;
    this.isLuxonDateTime = true;
  }
  // CONSTRUCT
  /**
   * Create a DateTime for the current instant, in the system's time zone.
   *
   * Use Settings to override these default values if needed.
   * @example DateTime.now().toISO() //~> now in the ISO format
   * @return {DateTime}
   */
  static now() {
    return new DateTime({});
  }
  /**
   * Create a local DateTime
   * @param {number} [year] - The calendar year. If omitted (as in, call `local()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month, 1-indexed
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @example DateTime.local()                                  //~> now
   * @example DateTime.local({ zone: "America/New_York" })      //~> now, in US east coast time
   * @example DateTime.local(2017)                              //~> 2017-01-01T00:00:00
   * @example DateTime.local(2017, 3)                           //~> 2017-03-01T00:00:00
   * @example DateTime.local(2017, 3, 12, { locale: "fr" })     //~> 2017-03-12T00:00:00, with a French locale
   * @example DateTime.local(2017, 3, 12, 5)                    //~> 2017-03-12T05:00:00
   * @example DateTime.local(2017, 3, 12, 5, { zone: "utc" })   //~> 2017-03-12T05:00:00, in UTC
   * @example DateTime.local(2017, 3, 12, 5, 45)                //~> 2017-03-12T05:45:00
   * @example DateTime.local(2017, 3, 12, 5, 45, 10)            //~> 2017-03-12T05:45:10
   * @example DateTime.local(2017, 3, 12, 5, 45, 10, 765)       //~> 2017-03-12T05:45:10.765
   * @return {DateTime}
   */
  static local() {
    const [opts, args] = lastOpts(arguments), [year, month, day, hour, minute, second, millisecond] = args;
    return quickDT({ year, month, day, hour, minute, second, millisecond }, opts);
  }
  /**
   * Create a DateTime in UTC
   * @param {number} [year] - The calendar year. If omitted (as in, call `utc()` with no arguments), the current time will be used
   * @param {number} [month=1] - The month, 1-indexed
   * @param {number} [day=1] - The day of the month
   * @param {number} [hour=0] - The hour of the day, in 24-hour time
   * @param {number} [minute=0] - The minute of the hour, meaning a number between 0 and 59
   * @param {number} [second=0] - The second of the minute, meaning a number between 0 and 59
   * @param {number} [millisecond=0] - The millisecond of the second, meaning a number between 0 and 999
   * @param {Object} options - configuration options for the DateTime
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} [options.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [options.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @example DateTime.utc()                                              //~> now
   * @example DateTime.utc(2017)                                          //~> 2017-01-01T00:00:00Z
   * @example DateTime.utc(2017, 3)                                       //~> 2017-03-01T00:00:00Z
   * @example DateTime.utc(2017, 3, 12)                                   //~> 2017-03-12T00:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5)                                //~> 2017-03-12T05:00:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45)                            //~> 2017-03-12T05:45:00Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, { locale: "fr" })          //~> 2017-03-12T05:45:00Z with a French locale
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10)                        //~> 2017-03-12T05:45:10Z
   * @example DateTime.utc(2017, 3, 12, 5, 45, 10, 765, { locale: "fr" }) //~> 2017-03-12T05:45:10.765Z with a French locale
   * @return {DateTime}
   */
  static utc() {
    const [opts, args] = lastOpts(arguments), [year, month, day, hour, minute, second, millisecond] = args;
    opts.zone = FixedOffsetZone.utcInstance;
    return quickDT({ year, month, day, hour, minute, second, millisecond }, opts);
  }
  /**
   * Create a DateTime from a JavaScript Date object. Uses the default zone.
   * @param {Date} date - a JavaScript Date object
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @return {DateTime}
   */
  static fromJSDate(date, options = {}) {
    const ts = isDate(date) ? date.valueOf() : NaN;
    if (Number.isNaN(ts)) {
      return DateTime.invalid("invalid input");
    }
    const zoneToUse = normalizeZone(options.zone, Settings.defaultZone);
    if (!zoneToUse.isValid) {
      return DateTime.invalid(unsupportedZone(zoneToUse));
    }
    return new DateTime({
      ts,
      zone: zoneToUse,
      loc: Locale.fromObject(options)
    });
  }
  /**
   * Create a DateTime from a number of milliseconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} milliseconds - a number of milliseconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromMillis(milliseconds, options = {}) {
    if (!isNumber(milliseconds)) {
      throw new InvalidArgumentError(
        `fromMillis requires a numerical input, but received a ${typeof milliseconds} with value ${milliseconds}`
      );
    } else if (milliseconds < -MAX_DATE || milliseconds > MAX_DATE) {
      return DateTime.invalid("Timestamp out of range");
    } else {
      return new DateTime({
        ts: milliseconds,
        zone: normalizeZone(options.zone, Settings.defaultZone),
        loc: Locale.fromObject(options)
      });
    }
  }
  /**
   * Create a DateTime from a number of seconds since the epoch (meaning since 1 January 1970 00:00:00 UTC). Uses the default zone.
   * @param {number} seconds - a number of seconds since 1970 UTC
   * @param {Object} options - configuration options for the DateTime
   * @param {string|Zone} [options.zone='local'] - the zone to place the DateTime into
   * @param {string} [options.locale] - a locale to set on the resulting DateTime instance
   * @param {string} options.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} options.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromSeconds(seconds, options = {}) {
    if (!isNumber(seconds)) {
      throw new InvalidArgumentError("fromSeconds requires a numerical input");
    } else {
      return new DateTime({
        ts: seconds * 1e3,
        zone: normalizeZone(options.zone, Settings.defaultZone),
        loc: Locale.fromObject(options)
      });
    }
  }
  /**
   * Create a DateTime from a JavaScript object with keys like 'year' and 'hour' with reasonable defaults.
   * @param {Object} obj - the object to create the DateTime from
   * @param {number} obj.year - a year, such as 1987
   * @param {number} obj.month - a month, 1-12
   * @param {number} obj.day - a day of the month, 1-31, depending on the month
   * @param {number} obj.ordinal - day of the year, 1-365 or 366
   * @param {number} obj.weekYear - an ISO week year
   * @param {number} obj.weekNumber - an ISO week number, between 1 and 52 or 53, depending on the year
   * @param {number} obj.weekday - an ISO weekday, 1-7, where 1 is Monday and 7 is Sunday
   * @param {number} obj.hour - hour of the day, 0-23
   * @param {number} obj.minute - minute of the hour, 0-59
   * @param {number} obj.second - second of the minute, 0-59
   * @param {number} obj.millisecond - millisecond of the second, 0-999
   * @param {Object} opts - options for creating this DateTime
   * @param {string|Zone} [opts.zone='local'] - interpret the numbers in the context of a particular zone. Can take any value taken as the first argument to setZone()
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromObject({ year: 1982, month: 5, day: 25}).toISODate() //=> '1982-05-25'
   * @example DateTime.fromObject({ year: 1982 }).toISODate() //=> '1982-01-01'
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }) //~> today at 10:26:06
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'utc' }),
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'local' })
   * @example DateTime.fromObject({ hour: 10, minute: 26, second: 6 }, { zone: 'America/New_York' })
   * @example DateTime.fromObject({ weekYear: 2016, weekNumber: 2, weekday: 3 }).toISODate() //=> '2016-01-13'
   * @return {DateTime}
   */
  static fromObject(obj, opts = {}) {
    obj = obj || {};
    const zoneToUse = normalizeZone(opts.zone, Settings.defaultZone);
    if (!zoneToUse.isValid) {
      return DateTime.invalid(unsupportedZone(zoneToUse));
    }
    const tsNow = Settings.now(), offsetProvis = !isUndefined(opts.specificOffset) ? opts.specificOffset : zoneToUse.offset(tsNow), normalized = normalizeObject(obj, normalizeUnit), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber, loc = Locale.fromObject(opts);
    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    }
    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }
    const useWeekData = definiteWeekDef || normalized.weekday && !containsGregor;
    let units, defaultValues, objNow = tsToObj(tsNow, offsetProvis);
    if (useWeekData) {
      units = orderedWeekUnits;
      defaultValues = defaultWeekUnitValues;
      objNow = gregorianToWeek(objNow);
    } else if (containsOrdinal) {
      units = orderedOrdinalUnits;
      defaultValues = defaultOrdinalUnitValues;
      objNow = gregorianToOrdinal(objNow);
    } else {
      units = orderedUnits;
      defaultValues = defaultUnitValues;
    }
    let foundFirst = false;
    for (const u of units) {
      const v = normalized[u];
      if (!isUndefined(v)) {
        foundFirst = true;
      } else if (foundFirst) {
        normalized[u] = defaultValues[u];
      } else {
        normalized[u] = objNow[u];
      }
    }
    const higherOrderInvalid = useWeekData ? hasInvalidWeekData(normalized) : containsOrdinal ? hasInvalidOrdinalData(normalized) : hasInvalidGregorianData(normalized), invalid = higherOrderInvalid || hasInvalidTimeData(normalized);
    if (invalid) {
      return DateTime.invalid(invalid);
    }
    const gregorian = useWeekData ? weekToGregorian(normalized) : containsOrdinal ? ordinalToGregorian(normalized) : normalized, [tsFinal, offsetFinal] = objToTS(gregorian, offsetProvis, zoneToUse), inst = new DateTime({
      ts: tsFinal,
      zone: zoneToUse,
      o: offsetFinal,
      loc
    });
    if (normalized.weekday && containsGregor && obj.weekday !== inst.weekday) {
      return DateTime.invalid(
        "mismatched weekday",
        `you can't specify both a weekday of ${normalized.weekday} and a date of ${inst.toISO()}`
      );
    }
    return inst;
  }
  /**
   * Create a DateTime from an ISO 8601 string
   * @param {string} text - the ISO string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the time to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} [opts.outputCalendar] - the output calendar to set on the resulting DateTime instance
   * @param {string} [opts.numberingSystem] - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromISO('2016-05-25T09:08:34.123')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00')
   * @example DateTime.fromISO('2016-05-25T09:08:34.123+06:00', {setZone: true})
   * @example DateTime.fromISO('2016-05-25T09:08:34.123', {zone: 'utc'})
   * @example DateTime.fromISO('2016-W05-4')
   * @return {DateTime}
   */
  static fromISO(text2, opts = {}) {
    const [vals, parsedZone] = parseISODate(text2);
    return parseDataToDateTime(vals, parsedZone, opts, "ISO 8601", text2);
  }
  /**
   * Create a DateTime from an RFC 2822 string
   * @param {string} text - the RFC 2822 string
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since the offset is always specified in the string itself, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with a fixed-offset zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23:12 GMT')
   * @example DateTime.fromRFC2822('Fri, 25 Nov 2016 13:23:12 +0600')
   * @example DateTime.fromRFC2822('25 Nov 2016 13:23 Z')
   * @return {DateTime}
   */
  static fromRFC2822(text2, opts = {}) {
    const [vals, parsedZone] = parseRFC2822Date(text2);
    return parseDataToDateTime(vals, parsedZone, opts, "RFC 2822", text2);
  }
  /**
   * Create a DateTime from an HTTP header date
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @param {string} text - the HTTP header date
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - convert the time to this zone. Since HTTP dates are always in UTC, this has no effect on the interpretation of string, merely the zone the resulting DateTime is expressed in.
   * @param {boolean} [opts.setZone=false] - override the zone with the fixed-offset zone specified in the string. For HTTP dates, this is always UTC, so this option is equivalent to setting the `zone` option to 'utc', but this option is included for consistency with similar methods.
   * @param {string} [opts.locale='system's locale'] - a locale to set on the resulting DateTime instance
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @param {string} opts.numberingSystem - the numbering system to set on the resulting DateTime instance
   * @example DateTime.fromHTTP('Sun, 06 Nov 1994 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sunday, 06-Nov-94 08:49:37 GMT')
   * @example DateTime.fromHTTP('Sun Nov  6 08:49:37 1994')
   * @return {DateTime}
   */
  static fromHTTP(text2, opts = {}) {
    const [vals, parsedZone] = parseHTTPDate(text2);
    return parseDataToDateTime(vals, parsedZone, opts, "HTTP", opts);
  }
  /**
   * Create a DateTime from an input string and format string.
   * Defaults to en-US if no locale has been specified, regardless of the system's locale. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/parsing?id=table-of-tokens).
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see the link below for the formats)
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @return {DateTime}
   */
  static fromFormat(text2, fmt, opts = {}) {
    if (isUndefined(text2) || isUndefined(fmt)) {
      throw new InvalidArgumentError("fromFormat requires an input string and a format");
    }
    const { locale = null, numberingSystem = null } = opts, localeToUse = Locale.fromOpts({
      locale,
      numberingSystem,
      defaultToEN: true
    }), [vals, parsedZone, specificOffset, invalid] = parseFromTokens(localeToUse, text2, fmt);
    if (invalid) {
      return DateTime.invalid(invalid);
    } else {
      return parseDataToDateTime(vals, parsedZone, opts, `format ${fmt}`, text2, specificOffset);
    }
  }
  /**
   * @deprecated use fromFormat instead
   */
  static fromString(text2, fmt, opts = {}) {
    return DateTime.fromFormat(text2, fmt, opts);
  }
  /**
   * Create a DateTime from a SQL date, time, or datetime
   * Defaults to en-US if no locale has been specified, regardless of the system's locale
   * @param {string} text - the string to parse
   * @param {Object} opts - options to affect the creation
   * @param {string|Zone} [opts.zone='local'] - use this zone if no offset is specified in the input string itself. Will also convert the DateTime to this zone
   * @param {boolean} [opts.setZone=false] - override the zone with a zone specified in the string itself, if it specifies one
   * @param {string} [opts.locale='en-US'] - a locale string to use when parsing. Will also set the DateTime to this locale
   * @param {string} opts.numberingSystem - the numbering system to use when parsing. Will also set the resulting DateTime to this numbering system
   * @param {string} opts.outputCalendar - the output calendar to set on the resulting DateTime instance
   * @example DateTime.fromSQL('2017-05-15')
   * @example DateTime.fromSQL('2017-05-15 09:12:34')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342+06:00')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles')
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342 America/Los_Angeles', { setZone: true })
   * @example DateTime.fromSQL('2017-05-15 09:12:34.342', { zone: 'America/Los_Angeles' })
   * @example DateTime.fromSQL('09:12:34.342')
   * @return {DateTime}
   */
  static fromSQL(text2, opts = {}) {
    const [vals, parsedZone] = parseSQL(text2);
    return parseDataToDateTime(vals, parsedZone, opts, "SQL", text2);
  }
  /**
   * Create an invalid DateTime.
   * @param {DateTime} reason - simple string of why this DateTime is invalid. Should not contain parameters or anything else data-dependent
   * @param {string} [explanation=null] - longer explanation, may include parameters and other useful debugging information
   * @return {DateTime}
   */
  static invalid(reason, explanation = null) {
    if (!reason) {
      throw new InvalidArgumentError("need to specify a reason the DateTime is invalid");
    }
    const invalid = reason instanceof Invalid ? reason : new Invalid(reason, explanation);
    if (Settings.throwOnInvalid) {
      throw new InvalidDateTimeError(invalid);
    } else {
      return new DateTime({ invalid });
    }
  }
  /**
   * Check if an object is an instance of DateTime. Works across context boundaries
   * @param {object} o
   * @return {boolean}
   */
  static isDateTime(o) {
    return o && o.isLuxonDateTime || false;
  }
  /**
   * Produce the format string for a set of options
   * @param formatOpts
   * @param localeOpts
   * @returns {string}
   */
  static parseFormatForOpts(formatOpts, localeOpts = {}) {
    const tokenList = formatOptsToTokens(formatOpts, Locale.fromObject(localeOpts));
    return !tokenList ? null : tokenList.map((t) => t ? t.val : null).join("");
  }
  /**
   * Produce the the fully expanded format token for the locale
   * Does NOT quote characters, so quoted tokens will not round trip correctly
   * @param fmt
   * @param localeOpts
   * @returns {string}
   */
  static expandFormat(fmt, localeOpts = {}) {
    const expanded = expandMacroTokens(Formatter.parseFormat(fmt), Locale.fromObject(localeOpts));
    return expanded.map((t) => t.val).join("");
  }
  // INFO
  /**
   * Get the value of unit.
   * @param {string} unit - a unit such as 'minute' or 'day'
   * @example DateTime.local(2017, 7, 4).get('month'); //=> 7
   * @example DateTime.local(2017, 7, 4).get('day'); //=> 4
   * @return {number}
   */
  get(unit) {
    return this[unit];
  }
  /**
   * Returns whether the DateTime is valid. Invalid DateTimes occur when:
   * * The DateTime was created from invalid calendar information, such as the 13th month or February 30
   * * The DateTime was created by an operation on another invalid date
   * @type {boolean}
   */
  get isValid() {
    return this.invalid === null;
  }
  /**
   * Returns an error code if this DateTime is invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  /**
   * Returns an explanation of why this DateTime became invalid, or null if the DateTime is valid
   * @type {string}
   */
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  /**
   * Get the locale of a DateTime, such 'en-GB'. The locale is used when formatting the DateTime
   *
   * @type {string}
   */
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  /**
   * Get the numbering system of a DateTime, such 'beng'. The numbering system is used when formatting the DateTime
   *
   * @type {string}
   */
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  /**
   * Get the output calendar of a DateTime, such 'islamic'. The output calendar is used when formatting the DateTime
   *
   * @type {string}
   */
  get outputCalendar() {
    return this.isValid ? this.loc.outputCalendar : null;
  }
  /**
   * Get the time zone associated with this DateTime.
   * @type {Zone}
   */
  get zone() {
    return this._zone;
  }
  /**
   * Get the name of the time zone.
   * @type {string}
   */
  get zoneName() {
    return this.isValid ? this.zone.name : null;
  }
  /**
   * Get the year
   * @example DateTime.local(2017, 5, 25).year //=> 2017
   * @type {number}
   */
  get year() {
    return this.isValid ? this.c.year : NaN;
  }
  /**
   * Get the quarter
   * @example DateTime.local(2017, 5, 25).quarter //=> 2
   * @type {number}
   */
  get quarter() {
    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
  }
  /**
   * Get the month (1-12).
   * @example DateTime.local(2017, 5, 25).month //=> 5
   * @type {number}
   */
  get month() {
    return this.isValid ? this.c.month : NaN;
  }
  /**
   * Get the day of the month (1-30ish).
   * @example DateTime.local(2017, 5, 25).day //=> 25
   * @type {number}
   */
  get day() {
    return this.isValid ? this.c.day : NaN;
  }
  /**
   * Get the hour of the day (0-23).
   * @example DateTime.local(2017, 5, 25, 9).hour //=> 9
   * @type {number}
   */
  get hour() {
    return this.isValid ? this.c.hour : NaN;
  }
  /**
   * Get the minute of the hour (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30).minute //=> 30
   * @type {number}
   */
  get minute() {
    return this.isValid ? this.c.minute : NaN;
  }
  /**
   * Get the second of the minute (0-59).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52).second //=> 52
   * @type {number}
   */
  get second() {
    return this.isValid ? this.c.second : NaN;
  }
  /**
   * Get the millisecond of the second (0-999).
   * @example DateTime.local(2017, 5, 25, 9, 30, 52, 654).millisecond //=> 654
   * @type {number}
   */
  get millisecond() {
    return this.isValid ? this.c.millisecond : NaN;
  }
  /**
   * Get the week year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 12, 31).weekYear //=> 2015
   * @type {number}
   */
  get weekYear() {
    return this.isValid ? possiblyCachedWeekData(this).weekYear : NaN;
  }
  /**
   * Get the week number of the week year (1-52ish).
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2017, 5, 25).weekNumber //=> 21
   * @type {number}
   */
  get weekNumber() {
    return this.isValid ? possiblyCachedWeekData(this).weekNumber : NaN;
  }
  /**
   * Get the day of the week.
   * 1 is Monday and 7 is Sunday
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2014, 11, 31).weekday //=> 4
   * @type {number}
   */
  get weekday() {
    return this.isValid ? possiblyCachedWeekData(this).weekday : NaN;
  }
  /**
   * Get the ordinal (meaning the day of the year)
   * @example DateTime.local(2017, 5, 25).ordinal //=> 145
   * @type {number|DateTime}
   */
  get ordinal() {
    return this.isValid ? gregorianToOrdinal(this.c).ordinal : NaN;
  }
  /**
   * Get the human readable short month name, such as 'Oct'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthShort //=> Oct
   * @type {string}
   */
  get monthShort() {
    return this.isValid ? Info.months("short", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable long month name, such as 'October'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).monthLong //=> October
   * @type {string}
   */
  get monthLong() {
    return this.isValid ? Info.months("long", { locObj: this.loc })[this.month - 1] : null;
  }
  /**
   * Get the human readable short weekday, such as 'Mon'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayShort //=> Mon
   * @type {string}
   */
  get weekdayShort() {
    return this.isValid ? Info.weekdays("short", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the human readable long weekday, such as 'Monday'.
   * Defaults to the system's locale if no locale has been specified
   * @example DateTime.local(2017, 10, 30).weekdayLong //=> Monday
   * @type {string}
   */
  get weekdayLong() {
    return this.isValid ? Info.weekdays("long", { locObj: this.loc })[this.weekday - 1] : null;
  }
  /**
   * Get the UTC offset of this DateTime in minutes
   * @example DateTime.now().offset //=> -240
   * @example DateTime.utc().offset //=> 0
   * @type {number}
   */
  get offset() {
    return this.isValid ? +this.o : NaN;
  }
  /**
   * Get the short human name for the zone's current offset, for example "EST" or "EDT".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameShort() {
    if (this.isValid) {
      return this.zone.offsetName(this.ts, {
        format: "short",
        locale: this.locale
      });
    } else {
      return null;
    }
  }
  /**
   * Get the long human name for the zone's current offset, for example "Eastern Standard Time" or "Eastern Daylight Time".
   * Defaults to the system's locale if no locale has been specified
   * @type {string}
   */
  get offsetNameLong() {
    if (this.isValid) {
      return this.zone.offsetName(this.ts, {
        format: "long",
        locale: this.locale
      });
    } else {
      return null;
    }
  }
  /**
   * Get whether this zone's offset ever changes, as in a DST.
   * @type {boolean}
   */
  get isOffsetFixed() {
    return this.isValid ? this.zone.isUniversal : null;
  }
  /**
   * Get whether the DateTime is in a DST.
   * @type {boolean}
   */
  get isInDST() {
    if (this.isOffsetFixed) {
      return false;
    } else {
      return this.offset > this.set({ month: 1, day: 1 }).offset || this.offset > this.set({ month: 5 }).offset;
    }
  }
  /**
   * Returns true if this DateTime is in a leap year, false otherwise
   * @example DateTime.local(2016).isInLeapYear //=> true
   * @example DateTime.local(2013).isInLeapYear //=> false
   * @type {boolean}
   */
  get isInLeapYear() {
    return isLeapYear(this.year);
  }
  /**
   * Returns the number of days in this DateTime's month
   * @example DateTime.local(2016, 2).daysInMonth //=> 29
   * @example DateTime.local(2016, 3).daysInMonth //=> 31
   * @type {number}
   */
  get daysInMonth() {
    return daysInMonth(this.year, this.month);
  }
  /**
   * Returns the number of days in this DateTime's year
   * @example DateTime.local(2016).daysInYear //=> 366
   * @example DateTime.local(2013).daysInYear //=> 365
   * @type {number}
   */
  get daysInYear() {
    return this.isValid ? daysInYear(this.year) : NaN;
  }
  /**
   * Returns the number of weeks in this DateTime's year
   * @see https://en.wikipedia.org/wiki/ISO_week_date
   * @example DateTime.local(2004).weeksInWeekYear //=> 53
   * @example DateTime.local(2013).weeksInWeekYear //=> 52
   * @type {number}
   */
  get weeksInWeekYear() {
    return this.isValid ? weeksInWeekYear(this.weekYear) : NaN;
  }
  /**
   * Returns the resolved Intl options for this DateTime.
   * This is useful in understanding the behavior of formatting methods
   * @param {Object} opts - the same options as toLocaleString
   * @return {Object}
   */
  resolvedLocaleOptions(opts = {}) {
    const { locale, numberingSystem, calendar } = Formatter.create(
      this.loc.clone(opts),
      opts
    ).resolvedOptions(this);
    return { locale, numberingSystem, outputCalendar: calendar };
  }
  // TRANSFORM
  /**
   * "Set" the DateTime's zone to UTC. Returns a newly-constructed DateTime.
   *
   * Equivalent to {@link DateTime#setZone}('utc')
   * @param {number} [offset=0] - optionally, an offset from UTC in minutes
   * @param {Object} [opts={}] - options to pass to `setZone()`
   * @return {DateTime}
   */
  toUTC(offset2 = 0, opts = {}) {
    return this.setZone(FixedOffsetZone.instance(offset2), opts);
  }
  /**
   * "Set" the DateTime's zone to the host's local zone. Returns a newly-constructed DateTime.
   *
   * Equivalent to `setZone('local')`
   * @return {DateTime}
   */
  toLocal() {
    return this.setZone(Settings.defaultZone);
  }
  /**
   * "Set" the DateTime's zone to specified zone. Returns a newly-constructed DateTime.
   *
   * By default, the setter keeps the underlying time the same (as in, the same timestamp), but the new instance will report different local times and consider DSTs when making computations, as with {@link DateTime#plus}. You may wish to use {@link DateTime#toLocal} and {@link DateTime#toUTC} which provide simple convenience wrappers for commonly used zones.
   * @param {string|Zone} [zone='local'] - a zone identifier. As a string, that can be any IANA zone supported by the host environment, or a fixed-offset name of the form 'UTC+3', or the strings 'local' or 'utc'. You may also supply an instance of a {@link DateTime#Zone} class.
   * @param {Object} opts - options
   * @param {boolean} [opts.keepLocalTime=false] - If true, adjust the underlying time so that the local time stays the same, but in the target zone. You should rarely need this.
   * @return {DateTime}
   */
  setZone(zone, { keepLocalTime = false, keepCalendarTime = false } = {}) {
    zone = normalizeZone(zone, Settings.defaultZone);
    if (zone.equals(this.zone)) {
      return this;
    } else if (!zone.isValid) {
      return DateTime.invalid(unsupportedZone(zone));
    } else {
      let newTS = this.ts;
      if (keepLocalTime || keepCalendarTime) {
        const offsetGuess = zone.offset(this.ts);
        const asObj = this.toObject();
        [newTS] = objToTS(asObj, offsetGuess, zone);
      }
      return clone(this, { ts: newTS, zone });
    }
  }
  /**
   * "Set" the locale, numberingSystem, or outputCalendar. Returns a newly-constructed DateTime.
   * @param {Object} properties - the properties to set
   * @example DateTime.local(2017, 5, 25).reconfigure({ locale: 'en-GB' })
   * @return {DateTime}
   */
  reconfigure({ locale, numberingSystem, outputCalendar } = {}) {
    const loc = this.loc.clone({ locale, numberingSystem, outputCalendar });
    return clone(this, { loc });
  }
  /**
   * "Set" the locale. Returns a newly-constructed DateTime.
   * Just a convenient alias for reconfigure({ locale })
   * @example DateTime.local(2017, 5, 25).setLocale('en-GB')
   * @return {DateTime}
   */
  setLocale(locale) {
    return this.reconfigure({ locale });
  }
  /**
   * "Set" the values of specified units. Returns a newly-constructed DateTime.
   * You can only set units with this method; for "setting" metadata, see {@link DateTime#reconfigure} and {@link DateTime#setZone}.
   * @param {Object} values - a mapping of units to numbers
   * @example dt.set({ year: 2017 })
   * @example dt.set({ hour: 8, minute: 30 })
   * @example dt.set({ weekday: 5 })
   * @example dt.set({ year: 2005, ordinal: 234 })
   * @return {DateTime}
   */
  set(values) {
    if (!this.isValid)
      return this;
    const normalized = normalizeObject(values, normalizeUnit), settingWeekStuff = !isUndefined(normalized.weekYear) || !isUndefined(normalized.weekNumber) || !isUndefined(normalized.weekday), containsOrdinal = !isUndefined(normalized.ordinal), containsGregorYear = !isUndefined(normalized.year), containsGregorMD = !isUndefined(normalized.month) || !isUndefined(normalized.day), containsGregor = containsGregorYear || containsGregorMD, definiteWeekDef = normalized.weekYear || normalized.weekNumber;
    if ((containsGregor || containsOrdinal) && definiteWeekDef) {
      throw new ConflictingSpecificationError(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    }
    if (containsGregorMD && containsOrdinal) {
      throw new ConflictingSpecificationError("Can't mix ordinal dates with month/day");
    }
    let mixed;
    if (settingWeekStuff) {
      mixed = weekToGregorian({ ...gregorianToWeek(this.c), ...normalized });
    } else if (!isUndefined(normalized.ordinal)) {
      mixed = ordinalToGregorian({ ...gregorianToOrdinal(this.c), ...normalized });
    } else {
      mixed = { ...this.toObject(), ...normalized };
      if (isUndefined(normalized.day)) {
        mixed.day = Math.min(daysInMonth(mixed.year, mixed.month), mixed.day);
      }
    }
    const [ts, o] = objToTS(mixed, this.o, this.zone);
    return clone(this, { ts, o });
  }
  /**
   * Add a period of time to this DateTime and return the resulting DateTime
   *
   * Adding hours, minutes, seconds, or milliseconds increases the timestamp by the right number of milliseconds. Adding days, months, or years shifts the calendar, accounting for DSTs and leap years along the way. Thus, `dt.plus({ hours: 24 })` may result in a different time than `dt.plus({ days: 1 })` if there's a DST shift in between.
   * @param {Duration|Object|number} duration - The amount to add. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   * @example DateTime.now().plus(123) //~> in 123 milliseconds
   * @example DateTime.now().plus({ minutes: 15 }) //~> in 15 minutes
   * @example DateTime.now().plus({ days: 1 }) //~> this time tomorrow
   * @example DateTime.now().plus({ days: -1 }) //~> this time yesterday
   * @example DateTime.now().plus({ hours: 3, minutes: 13 }) //~> in 3 hr, 13 min
   * @example DateTime.now().plus(Duration.fromObject({ hours: 3, minutes: 13 })) //~> in 3 hr, 13 min
   * @return {DateTime}
   */
  plus(duration) {
    if (!this.isValid)
      return this;
    const dur = Duration.fromDurationLike(duration);
    return clone(this, adjustTime(this, dur));
  }
  /**
   * Subtract a period of time to this DateTime and return the resulting DateTime
   * See {@link DateTime#plus}
   * @param {Duration|Object|number} duration - The amount to subtract. Either a Luxon Duration, a number of milliseconds, the object argument to Duration.fromObject()
   @return {DateTime}
   */
  minus(duration) {
    if (!this.isValid)
      return this;
    const dur = Duration.fromDurationLike(duration).negate();
    return clone(this, adjustTime(this, dur));
  }
  /**
   * "Set" this DateTime to the beginning of a unit of time.
   * @param {string} unit - The unit to go to the beginning of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @example DateTime.local(2014, 3, 3).startOf('month').toISODate(); //=> '2014-03-01'
   * @example DateTime.local(2014, 3, 3).startOf('year').toISODate(); //=> '2014-01-01'
   * @example DateTime.local(2014, 3, 3).startOf('week').toISODate(); //=> '2014-03-03', weeks always start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('day').toISOTime(); //=> '00:00.000-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).startOf('hour').toISOTime(); //=> '05:00:00.000-05:00'
   * @return {DateTime}
   */
  startOf(unit) {
    if (!this.isValid)
      return this;
    const o = {}, normalizedUnit = Duration.normalizeUnit(unit);
    switch (normalizedUnit) {
      case "years":
        o.month = 1;
      case "quarters":
      case "months":
        o.day = 1;
      case "weeks":
      case "days":
        o.hour = 0;
      case "hours":
        o.minute = 0;
      case "minutes":
        o.second = 0;
      case "seconds":
        o.millisecond = 0;
        break;
    }
    if (normalizedUnit === "weeks") {
      o.weekday = 1;
    }
    if (normalizedUnit === "quarters") {
      const q = Math.ceil(this.month / 3);
      o.month = (q - 1) * 3 + 1;
    }
    return this.set(o);
  }
  /**
   * "Set" this DateTime to the end (meaning the last millisecond) of a unit of time
   * @param {string} unit - The unit to go to the end of. Can be 'year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', or 'millisecond'.
   * @example DateTime.local(2014, 3, 3).endOf('month').toISO(); //=> '2014-03-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('year').toISO(); //=> '2014-12-31T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3).endOf('week').toISO(); // => '2014-03-09T23:59:59.999-05:00', weeks start on Mondays
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('day').toISO(); //=> '2014-03-03T23:59:59.999-05:00'
   * @example DateTime.local(2014, 3, 3, 5, 30).endOf('hour').toISO(); //=> '2014-03-03T05:59:59.999-05:00'
   * @return {DateTime}
   */
  endOf(unit) {
    return this.isValid ? this.plus({ [unit]: 1 }).startOf(unit).minus(1) : this;
  }
  // OUTPUT
  /**
   * Returns a string representation of this DateTime formatted according to the specified format string.
   * **You may not want this.** See {@link DateTime#toLocaleString} for a more flexible formatting tool. For a table of tokens and their interpretations, see [here](https://moment.github.io/luxon/#/formatting?id=table-of-tokens).
   * Defaults to en-US if no locale has been specified, regardless of the system's locale.
   * @param {string} fmt - the format string
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toFormat('yyyy LLL dd') //=> '2017 Apr 22'
   * @example DateTime.now().setLocale('fr').toFormat('yyyy LLL dd') //=> '2017 avr. 22'
   * @example DateTime.now().toFormat('yyyy LLL dd', { locale: "fr" }) //=> '2017 avr. 22'
   * @example DateTime.now().toFormat("HH 'hours and' mm 'minutes'") //=> '20 hours and 55 minutes'
   * @return {string}
   */
  toFormat(fmt, opts = {}) {
    return this.isValid ? Formatter.create(this.loc.redefaultToEN(opts)).formatDateTimeFromString(this, fmt) : INVALID;
  }
  /**
   * Returns a localized string representing this date. Accepts the same options as the Intl.DateTimeFormat constructor and any presets defined by Luxon, such as `DateTime.DATE_FULL` or `DateTime.TIME_SIMPLE`.
   * The exact behavior of this method is browser-specific, but in general it will return an appropriate representation
   * of the DateTime in the assigned locale.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
   * @param formatOpts {Object} - Intl.DateTimeFormat constructor options and configuration options
   * @param {Object} opts - opts to override the configuration options on this DateTime
   * @example DateTime.now().toLocaleString(); //=> 4/20/2017
   * @example DateTime.now().setLocale('en-gb').toLocaleString(); //=> '20/04/2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL); //=> 'April 20, 2017'
   * @example DateTime.now().toLocaleString(DateTime.DATE_FULL, { locale: 'fr' }); //=> '28 août 2022'
   * @example DateTime.now().toLocaleString(DateTime.TIME_SIMPLE); //=> '11:32 AM'
   * @example DateTime.now().toLocaleString(DateTime.DATETIME_SHORT); //=> '4/20/2017, 11:32 AM'
   * @example DateTime.now().toLocaleString({ weekday: 'long', month: 'long', day: '2-digit' }); //=> 'Thursday, April 20'
   * @example DateTime.now().toLocaleString({ weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }); //=> 'Thu, Apr 20, 11:27 AM'
   * @example DateTime.now().toLocaleString({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }); //=> '11:32'
   * @return {string}
   */
  toLocaleString(formatOpts = DATE_SHORT, opts = {}) {
    return this.isValid ? Formatter.create(this.loc.clone(opts), formatOpts).formatDateTime(this) : INVALID;
  }
  /**
   * Returns an array of format "parts", meaning individual tokens along with metadata. This is allows callers to post-process individual sections of the formatted output.
   * Defaults to the system's locale if no locale has been specified
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
   * @param opts {Object} - Intl.DateTimeFormat constructor options, same as `toLocaleString`.
   * @example DateTime.now().toLocaleParts(); //=> [
   *                                   //=>   { type: 'day', value: '25' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'month', value: '05' },
   *                                   //=>   { type: 'literal', value: '/' },
   *                                   //=>   { type: 'year', value: '1982' }
   *                                   //=> ]
   */
  toLocaleParts(opts = {}) {
    return this.isValid ? Formatter.create(this.loc.clone(opts), opts).formatDateTimeParts(this) : [];
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=false] - add the time zone format extension
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1983, 5, 25).toISO() //=> '1982-05-25T00:00:00.000Z'
   * @example DateTime.now().toISO() //=> '2017-04-22T20:47:05.335-04:00'
   * @example DateTime.now().toISO({ includeOffset: false }) //=> '2017-04-22T20:47:05.335'
   * @example DateTime.now().toISO({ format: 'basic' }) //=> '20170422T204705.335-0400'
   * @return {string}
   */
  toISO({
    format = "extended",
    suppressSeconds = false,
    suppressMilliseconds = false,
    includeOffset = true,
    extendedZone = false
  } = {}) {
    if (!this.isValid) {
      return null;
    }
    const ext = format === "extended";
    let c2 = toISODate(this, ext);
    c2 += "T";
    c2 += toISOTime(this, ext, suppressSeconds, suppressMilliseconds, includeOffset, extendedZone);
    return c2;
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's date component
   * @param {Object} opts - options
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc(1982, 5, 25).toISODate() //=> '1982-05-25'
   * @example DateTime.utc(1982, 5, 25).toISODate({ format: 'basic' }) //=> '19820525'
   * @return {string}
   */
  toISODate({ format = "extended" } = {}) {
    if (!this.isValid) {
      return null;
    }
    return toISODate(this, format === "extended");
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's week date
   * @example DateTime.utc(1982, 5, 25).toISOWeekDate() //=> '1982-W21-2'
   * @return {string}
   */
  toISOWeekDate() {
    return toTechFormat(this, "kkkk-'W'WW-c");
  }
  /**
   * Returns an ISO 8601-compliant string representation of this DateTime's time component
   * @param {Object} opts - options
   * @param {boolean} [opts.suppressMilliseconds=false] - exclude milliseconds from the format if they're 0
   * @param {boolean} [opts.suppressSeconds=false] - exclude seconds from the format if they're 0
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.extendedZone=true] - add the time zone format extension
   * @param {boolean} [opts.includePrefix=false] - include the `T` prefix
   * @param {string} [opts.format='extended'] - choose between the basic and extended format
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime() //=> '07:34:19.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34, seconds: 0, milliseconds: 0 }).toISOTime({ suppressSeconds: true }) //=> '07:34Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ format: 'basic' }) //=> '073419.361Z'
   * @example DateTime.utc().set({ hour: 7, minute: 34 }).toISOTime({ includePrefix: true }) //=> 'T07:34:19.361Z'
   * @return {string}
   */
  toISOTime({
    suppressMilliseconds = false,
    suppressSeconds = false,
    includeOffset = true,
    includePrefix = false,
    extendedZone = false,
    format = "extended"
  } = {}) {
    if (!this.isValid) {
      return null;
    }
    let c2 = includePrefix ? "T" : "";
    return c2 + toISOTime(
      this,
      format === "extended",
      suppressSeconds,
      suppressMilliseconds,
      includeOffset,
      extendedZone
    );
  }
  /**
   * Returns an RFC 2822-compatible string representation of this DateTime
   * @example DateTime.utc(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 +0000'
   * @example DateTime.local(2014, 7, 13).toRFC2822() //=> 'Sun, 13 Jul 2014 00:00:00 -0400'
   * @return {string}
   */
  toRFC2822() {
    return toTechFormat(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", false);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in HTTP headers. The output is always expressed in GMT.
   * Specifically, the string conforms to RFC 1123.
   * @see https://www.w3.org/Protocols/rfc2616/rfc2616-sec3.html#sec3.3.1
   * @example DateTime.utc(2014, 7, 13).toHTTP() //=> 'Sun, 13 Jul 2014 00:00:00 GMT'
   * @example DateTime.utc(2014, 7, 13, 19).toHTTP() //=> 'Sun, 13 Jul 2014 19:00:00 GMT'
   * @return {string}
   */
  toHTTP() {
    return toTechFormat(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Date
   * @example DateTime.utc(2014, 7, 13).toSQLDate() //=> '2014-07-13'
   * @return {string}
   */
  toSQLDate() {
    if (!this.isValid) {
      return null;
    }
    return toISODate(this, true);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL Time
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc().toSQL() //=> '05:15:16.345'
   * @example DateTime.now().toSQL() //=> '05:15:16.345 -04:00'
   * @example DateTime.now().toSQL({ includeOffset: false }) //=> '05:15:16.345'
   * @example DateTime.now().toSQL({ includeZone: false }) //=> '05:15:16.345 America/New_York'
   * @return {string}
   */
  toSQLTime({ includeOffset = true, includeZone = false, includeOffsetSpace = true } = {}) {
    let fmt = "HH:mm:ss.SSS";
    if (includeZone || includeOffset) {
      if (includeOffsetSpace) {
        fmt += " ";
      }
      if (includeZone) {
        fmt += "z";
      } else if (includeOffset) {
        fmt += "ZZ";
      }
    }
    return toTechFormat(this, fmt, true);
  }
  /**
   * Returns a string representation of this DateTime appropriate for use in SQL DateTime
   * @param {Object} opts - options
   * @param {boolean} [opts.includeZone=false] - include the zone, such as 'America/New_York'. Overrides includeOffset.
   * @param {boolean} [opts.includeOffset=true] - include the offset, such as 'Z' or '-04:00'
   * @param {boolean} [opts.includeOffsetSpace=true] - include the space between the time and the offset, such as '05:15:16.345 -04:00'
   * @example DateTime.utc(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 Z'
   * @example DateTime.local(2014, 7, 13).toSQL() //=> '2014-07-13 00:00:00.000 -04:00'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeOffset: false }) //=> '2014-07-13 00:00:00.000'
   * @example DateTime.local(2014, 7, 13).toSQL({ includeZone: true }) //=> '2014-07-13 00:00:00.000 America/New_York'
   * @return {string}
   */
  toSQL(opts = {}) {
    if (!this.isValid) {
      return null;
    }
    return `${this.toSQLDate()} ${this.toSQLTime(opts)}`;
  }
  /**
   * Returns a string representation of this DateTime appropriate for debugging
   * @return {string}
   */
  toString() {
    return this.isValid ? this.toISO() : INVALID;
  }
  /**
   * Returns the epoch milliseconds of this DateTime. Alias of {@link DateTime#toMillis}
   * @return {number}
   */
  valueOf() {
    return this.toMillis();
  }
  /**
   * Returns the epoch milliseconds of this DateTime.
   * @return {number}
   */
  toMillis() {
    return this.isValid ? this.ts : NaN;
  }
  /**
   * Returns the epoch seconds of this DateTime.
   * @return {number}
   */
  toSeconds() {
    return this.isValid ? this.ts / 1e3 : NaN;
  }
  /**
   * Returns the epoch seconds (as a whole number) of this DateTime.
   * @return {number}
   */
  toUnixInteger() {
    return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
  }
  /**
   * Returns an ISO 8601 representation of this DateTime appropriate for use in JSON.
   * @return {string}
   */
  toJSON() {
    return this.toISO();
  }
  /**
   * Returns a BSON serializable equivalent to this DateTime.
   * @return {Date}
   */
  toBSON() {
    return this.toJSDate();
  }
  /**
   * Returns a JavaScript object with this DateTime's year, month, day, and so on.
   * @param opts - options for generating the object
   * @param {boolean} [opts.includeConfig=false] - include configuration attributes in the output
   * @example DateTime.now().toObject() //=> { year: 2017, month: 4, day: 22, hour: 20, minute: 49, second: 42, millisecond: 268 }
   * @return {Object}
   */
  toObject(opts = {}) {
    if (!this.isValid)
      return {};
    const base2 = { ...this.c };
    if (opts.includeConfig) {
      base2.outputCalendar = this.outputCalendar;
      base2.numberingSystem = this.loc.numberingSystem;
      base2.locale = this.loc.locale;
    }
    return base2;
  }
  /**
   * Returns a JavaScript Date equivalent to this DateTime.
   * @return {Date}
   */
  toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  }
  // COMPARE
  /**
   * Return the difference between two DateTimes as a Duration.
   * @param {DateTime} otherDateTime - the DateTime to compare this one to
   * @param {string|string[]} [unit=['milliseconds']] - the unit or array of units (such as 'hours' or 'days') to include in the duration.
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @example
   * var i1 = DateTime.fromISO('1982-05-25T09:45'),
   *     i2 = DateTime.fromISO('1983-10-14T10:30');
   * i2.diff(i1).toObject() //=> { milliseconds: 43807500000 }
   * i2.diff(i1, 'hours').toObject() //=> { hours: 12168.75 }
   * i2.diff(i1, ['months', 'days']).toObject() //=> { months: 16, days: 19.03125 }
   * i2.diff(i1, ['months', 'days', 'hours']).toObject() //=> { months: 16, days: 19, hours: 0.75 }
   * @return {Duration}
   */
  diff(otherDateTime, unit = "milliseconds", opts = {}) {
    if (!this.isValid || !otherDateTime.isValid) {
      return Duration.invalid("created by diffing an invalid DateTime");
    }
    const durOpts = { locale: this.locale, numberingSystem: this.numberingSystem, ...opts };
    const units = maybeArray(unit).map(Duration.normalizeUnit), otherIsLater = otherDateTime.valueOf() > this.valueOf(), earlier = otherIsLater ? this : otherDateTime, later = otherIsLater ? otherDateTime : this, diffed = diff(earlier, later, units, durOpts);
    return otherIsLater ? diffed.negate() : diffed;
  }
  /**
   * Return the difference between this DateTime and right now.
   * See {@link DateTime#diff}
   * @param {string|string[]} [unit=['milliseconds']] - the unit or units units (such as 'hours' or 'days') to include in the duration
   * @param {Object} opts - options that affect the creation of the Duration
   * @param {string} [opts.conversionAccuracy='casual'] - the conversion system to use
   * @return {Duration}
   */
  diffNow(unit = "milliseconds", opts = {}) {
    return this.diff(DateTime.now(), unit, opts);
  }
  /**
   * Return an Interval spanning between this DateTime and another DateTime
   * @param {DateTime} otherDateTime - the other end point of the Interval
   * @return {Interval}
   */
  until(otherDateTime) {
    return this.isValid ? Interval.fromDateTimes(this, otherDateTime) : this;
  }
  /**
   * Return whether this DateTime is in the same unit of time as another DateTime.
   * Higher-order units must also be identical for this function to return `true`.
   * Note that time zones are **ignored** in this comparison, which compares the **local** calendar time. Use {@link DateTime#setZone} to convert one of the dates if needed.
   * @param {DateTime} otherDateTime - the other DateTime
   * @param {string} unit - the unit of time to check sameness on
   * @example DateTime.now().hasSame(otherDT, 'day'); //~> true if otherDT is in the same current calendar day
   * @return {boolean}
   */
  hasSame(otherDateTime, unit) {
    if (!this.isValid)
      return false;
    const inputMs = otherDateTime.valueOf();
    const adjustedToZone = this.setZone(otherDateTime.zone, { keepLocalTime: true });
    return adjustedToZone.startOf(unit) <= inputMs && inputMs <= adjustedToZone.endOf(unit);
  }
  /**
   * Equality check
   * Two DateTimes are equal if and only if they represent the same millisecond, have the same zone and location, and are both valid.
   * To compare just the millisecond values, use `+dt1 === +dt2`.
   * @param {DateTime} other - the other DateTime
   * @return {boolean}
   */
  equals(other) {
    return this.isValid && other.isValid && this.valueOf() === other.valueOf() && this.zone.equals(other.zone) && this.loc.equals(other.loc);
  }
  /**
   * Returns a string representation of a this time relative to now, such as "in two days". Can only internationalize if your
   * platform supports Intl.RelativeTimeFormat. Rounds down by default.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} [options.style="long"] - the style of units, must be "long", "short", or "narrow"
   * @param {string|string[]} options.unit - use a specific unit or array of units; if omitted, or an array, the method will pick the best unit. Use an array or one of "years", "quarters", "months", "weeks", "days", "hours", "minutes", or "seconds"
   * @param {boolean} [options.round=true] - whether to round the numbers in the output.
   * @param {number} [options.padding=0] - padding in milliseconds. This allows you to round up the result if it fits inside the threshold. Don't use in combination with {round: false} because the decimal output will include the padding.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelative() //=> "in 1 day"
   * @example DateTime.now().setLocale("es").toRelative({ days: 1 }) //=> "dentro de 1 día"
   * @example DateTime.now().plus({ days: 1 }).toRelative({ locale: "fr" }) //=> "dans 23 heures"
   * @example DateTime.now().minus({ days: 2 }).toRelative() //=> "2 days ago"
   * @example DateTime.now().minus({ days: 2 }).toRelative({ unit: "hours" }) //=> "48 hours ago"
   * @example DateTime.now().minus({ hours: 36 }).toRelative({ round: false }) //=> "1.5 days ago"
   */
  toRelative(options = {}) {
    if (!this.isValid)
      return null;
    const base2 = options.base || DateTime.fromObject({}, { zone: this.zone }), padding = options.padding ? this < base2 ? -options.padding : options.padding : 0;
    let units = ["years", "months", "days", "hours", "minutes", "seconds"];
    let unit = options.unit;
    if (Array.isArray(options.unit)) {
      units = options.unit;
      unit = void 0;
    }
    return diffRelative(base2, this.plus(padding), {
      ...options,
      numeric: "always",
      units,
      unit
    });
  }
  /**
   * Returns a string representation of this date relative to today, such as "yesterday" or "next month".
   * Only internationalizes on platforms that supports Intl.RelativeTimeFormat.
   * @param {Object} options - options that affect the output
   * @param {DateTime} [options.base=DateTime.now()] - the DateTime to use as the basis to which this time is compared. Defaults to now.
   * @param {string} options.locale - override the locale of this DateTime
   * @param {string} options.unit - use a specific unit; if omitted, the method will pick the unit. Use one of "years", "quarters", "months", "weeks", or "days"
   * @param {string} options.numberingSystem - override the numberingSystem of this DateTime. The Intl system may choose not to honor this
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar() //=> "tomorrow"
   * @example DateTime.now().setLocale("es").plus({ days: 1 }).toRelative() //=> ""mañana"
   * @example DateTime.now().plus({ days: 1 }).toRelativeCalendar({ locale: "fr" }) //=> "demain"
   * @example DateTime.now().minus({ days: 2 }).toRelativeCalendar() //=> "2 days ago"
   */
  toRelativeCalendar(options = {}) {
    if (!this.isValid)
      return null;
    return diffRelative(options.base || DateTime.fromObject({}, { zone: this.zone }), this, {
      ...options,
      numeric: "auto",
      units: ["years", "months", "days"],
      calendary: true
    });
  }
  /**
   * Return the min of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the minimum
   * @return {DateTime} the min DateTime, or undefined if called with no argument
   */
  static min(...dateTimes) {
    if (!dateTimes.every(DateTime.isDateTime)) {
      throw new InvalidArgumentError("min requires all arguments be DateTimes");
    }
    return bestBy(dateTimes, (i) => i.valueOf(), Math.min);
  }
  /**
   * Return the max of several date times
   * @param {...DateTime} dateTimes - the DateTimes from which to choose the maximum
   * @return {DateTime} the max DateTime, or undefined if called with no argument
   */
  static max(...dateTimes) {
    if (!dateTimes.every(DateTime.isDateTime)) {
      throw new InvalidArgumentError("max requires all arguments be DateTimes");
    }
    return bestBy(dateTimes, (i) => i.valueOf(), Math.max);
  }
  // MISC
  /**
   * Explain how a string would be parsed by fromFormat()
   * @param {string} text - the string to parse
   * @param {string} fmt - the format the string is expected to be in (see description)
   * @param {Object} options - options taken by fromFormat()
   * @return {Object}
   */
  static fromFormatExplain(text2, fmt, options = {}) {
    const { locale = null, numberingSystem = null } = options, localeToUse = Locale.fromOpts({
      locale,
      numberingSystem,
      defaultToEN: true
    });
    return explainFromTokens(localeToUse, text2, fmt);
  }
  /**
   * @deprecated use fromFormatExplain instead
   */
  static fromStringExplain(text2, fmt, options = {}) {
    return DateTime.fromFormatExplain(text2, fmt, options);
  }
  // FORMAT PRESETS
  /**
   * {@link DateTime#toLocaleString} format like 10/14/1983
   * @type {Object}
   */
  static get DATE_SHORT() {
    return DATE_SHORT;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED() {
    return DATE_MED;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, Oct 14, 1983'
   * @type {Object}
   */
  static get DATE_MED_WITH_WEEKDAY() {
    return DATE_MED_WITH_WEEKDAY;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983'
   * @type {Object}
   */
  static get DATE_FULL() {
    return DATE_FULL;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Tuesday, October 14, 1983'
   * @type {Object}
   */
  static get DATE_HUGE() {
    return DATE_HUGE;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_SIMPLE() {
    return TIME_SIMPLE;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SECONDS() {
    return TIME_WITH_SECONDS;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_SHORT_OFFSET() {
    return TIME_WITH_SHORT_OFFSET;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get TIME_WITH_LONG_OFFSET() {
    return TIME_WITH_LONG_OFFSET;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_SIMPLE() {
    return TIME_24_SIMPLE;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SECONDS() {
    return TIME_24_WITH_SECONDS;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 EDT', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_SHORT_OFFSET() {
    return TIME_24_WITH_SHORT_OFFSET;
  }
  /**
   * {@link DateTime#toLocaleString} format like '09:30:23 Eastern Daylight Time', always 24-hour.
   * @type {Object}
   */
  static get TIME_24_WITH_LONG_OFFSET() {
    return TIME_24_WITH_LONG_OFFSET;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT() {
    return DATETIME_SHORT;
  }
  /**
   * {@link DateTime#toLocaleString} format like '10/14/1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_SHORT_WITH_SECONDS() {
    return DATETIME_SHORT_WITH_SECONDS;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED() {
    return DATETIME_MED;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Oct 14, 1983, 9:30:33 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_SECONDS() {
    return DATETIME_MED_WITH_SECONDS;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Fri, 14 Oct 1983, 9:30 AM'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_MED_WITH_WEEKDAY() {
    return DATETIME_MED_WITH_WEEKDAY;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL() {
    return DATETIME_FULL;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'October 14, 1983, 9:30:33 AM EDT'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_FULL_WITH_SECONDS() {
    return DATETIME_FULL_WITH_SECONDS;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE() {
    return DATETIME_HUGE;
  }
  /**
   * {@link DateTime#toLocaleString} format like 'Friday, October 14, 1983, 9:30:33 AM Eastern Daylight Time'. Only 12-hour if the locale is.
   * @type {Object}
   */
  static get DATETIME_HUGE_WITH_SECONDS() {
    return DATETIME_HUGE_WITH_SECONDS;
  }
}
function friendlyDateTime(dateTimeish) {
  if (DateTime.isDateTime(dateTimeish)) {
    return dateTimeish;
  } else if (dateTimeish && dateTimeish.valueOf && isNumber(dateTimeish.valueOf())) {
    return DateTime.fromJSDate(dateTimeish);
  } else if (dateTimeish && typeof dateTimeish === "object") {
    return DateTime.fromObject(dateTimeish);
  } else {
    throw new InvalidArgumentError(
      `Unknown datetime argument: ${dateTimeish}, of type ${typeof dateTimeish}`
    );
  }
}
class OADocument {
  constructor(ref, data, createdTime, updatedTime) {
    this.ref = ref;
    this.data = data;
    this.createdTime = createdTime;
    this.updatedTime = updatedTime;
  }
  get id() {
    return this.ref.key;
  }
  static fromSnapshot(snap) {
    const data = snap.val();
    if (!data) {
      return null;
    }
    const createdTime = data.createdTime ? DateTime.fromISO(data.createdTime) : DateTime.now();
    const updatedTime = data.updatedTime ? DateTime.fromISO(data.updatedTime) : DateTime.now();
    return new OADocument(snap.ref, data, createdTime, updatedTime);
  }
}
class CollectionKey {
  constructor(name) {
    this.name = name;
  }
}
class Collection {
  constructor(path, db) {
    this.path = path;
    this.db = db;
  }
  waitReady() {
    return new Promise((resolve, reject) => {
      this.db.ready().then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
  }
  ref(id) {
    return this.db.ref(`${this.path}/${id}`);
  }
  async get(id) {
    await this.waitReady();
    const snap = await this.ref(id).get();
    if (!snap) {
      return null;
    }
    return OADocument.fromSnapshot(snap);
  }
  async update(id, data) {
    await this.waitReady();
    await this.ref(id).update({
      ...data,
      updatedTime: DateTime.now().toISO()
    });
  }
  async set(id, data) {
    await this.waitReady();
    await this.ref(id).set({
      ...data,
      createdTime: DateTime.now().toISO(),
      updatedTime: DateTime.now().toISO()
    });
  }
  async delete(id) {
    await this.waitReady();
    await this.ref(id).remove();
  }
  async list() {
    await this.waitReady();
    const docs = [];
    await this.db.ref(this.path).forEach(
      (snap) => {
        const doc = OADocument.fromSnapshot(snap);
        if (doc) {
          docs.push(doc);
        }
      }
    );
    return docs;
  }
  subcollection(id, key) {
    return new Collection(`${this.path}/${id}/${key.name}`, this.db);
  }
  watchById(id) {
    return new Observable((subscriber) => {
      const ref = this.ref(id);
      const handler = (snap) => {
        if (!snap) {
          subscriber.next(null);
          return;
        }
        subscriber.next(OADocument.fromSnapshot(snap));
      };
      ref.on("value", handler);
      return () => ref.off("value", handler);
    });
  }
  watchQuery() {
    return new Observable((subscriber) => {
      const ref = this.db.ref(this.path);
      const handler = (snap) => {
        const docs = [];
        snap.forEach((snap2) => {
          const doc = OADocument.fromSnapshot(snap2);
          if (doc) {
            docs.push(doc);
          }
          return true;
        });
        subscriber.next(docs);
      };
      ref.on("value", handler);
      return () => ref.off("value", handler);
    }).pipe(
      startWith(null),
      switchMap((data) => !data ? this.query() : of(data))
    );
  }
  query(limit = 100) {
    return from(
      this.db.ref(this.path).query().take(limit).get()
    ).pipe(
      map$1((snaps) => {
        const docs = [];
        snaps.forEach((snap) => {
          const doc = OADocument.fromSnapshot(snap);
          if (doc) {
            docs.push(doc);
          }
          return true;
        });
        return docs;
      })
    );
  }
  async add(data) {
    await this.waitReady();
    const ref = this.db.ref(this.path).push();
    await ref.set({
      ...data,
      createdTime: DateTime.now().toISO(),
      updatedTime: DateTime.now().toISO()
    });
    return ref.key;
  }
}
const _Database = class {
  constructor(db) {
    this.db = db;
  }
  static initDatabase() {
    const db = BrowserAceBase.WithIndexedDB("classroom-tube", {
      logLevel: "warn"
    });
    return new Promise((resolve, reject) => {
      db.ready().then(() => resolve(db)).catch((err) => reject(err));
    });
  }
  collection(key) {
    return new Collection(key.name, this.db);
  }
};
let Database = _Database;
__publicField(Database, "instance", new Promise((resolve, reject) => {
  _Database.initDatabase().then((db) => {
    resolve(new _Database(db));
  }).catch((err) => {
    reject(err);
  });
}));
const COLLECTIONS = {
  COURSES: new CollectionKey("courses"),
  COURSE_ITEMS: new CollectionKey("courses-items"),
  NOTES: new CollectionKey("notes")
};
class CourseState {
  constructor(playlist) {
    __publicField(this, "waitDb", Database.instance);
    this.playlist = playlist;
  }
  get id() {
    return this.playlist.id;
  }
  async enroll() {
    const playlist = await this.playlist.getPlaylist();
    if (!playlist) {
      return false;
    }
    const course = {
      playlistId: this.id,
      title: playlist.title,
      description: playlist.description,
      thumbnailUrl: playlist.thumbnails.default.url,
      snippet: playlist
    };
    const videos = await this.playlist.getVideos();
    const db = await this.waitDb;
    const courses = db.collection(COLLECTIONS.COURSES);
    const item = await courses.get(this.id);
    if (item) {
      return true;
    }
    await courses.set(this.id, course);
    for (const video of this.parsePlaylistItems(videos)) {
      await courses.subcollection(this.id, COLLECTIONS.COURSE_ITEMS).set(video.videoId, video);
    }
    return true;
  }
  findCommonPrefix(names) {
    return names.reduce((prefix, name) => {
      if (prefix === null) {
        return name;
      }
      for (let i = 0; i < prefix.length; i++) {
        if (prefix[i].toLowerCase() !== name[i].toLowerCase()) {
          return prefix.substring(0, i);
        }
      }
      return prefix;
    }, null) ?? "";
  }
  parsePlaylistItems(items) {
    const commonPrefix = this.findCommonPrefix(items.map((item) => item.snippet.title));
    const courseItems = [];
    let order = 0;
    for (const item of items) {
      const videoId = item.snippet.resourceId.videoId;
      const prefix = commonPrefix === "" ? "" : commonPrefix + " ";
      const title = prefix.length > 0 ? item.snippet.title.substring(prefix.length - 1) : item.snippet.title;
      courseItems.push({
        videoId,
        description: item.snippet.description,
        durationSeconds: 0,
        snippet: item.snippet,
        thumbnailUrl: item.snippet.thumbnails.default.url,
        title,
        order: order++,
        completed: false,
        leftAtSeconds: 0
      });
    }
    return courseItems;
  }
  watch() {
    const db = Database.instance;
    return from(db).pipe(
      switchMap((db2) => db2.collection(COLLECTIONS.COURSES).watchById(this.id))
    );
  }
  watchItem(id) {
    const db = Database.instance;
    return from(db).pipe(
      switchMap((db2) => db2.collection(COLLECTIONS.COURSES).subcollection(this.id, COLLECTIONS.COURSE_ITEMS).watchById(id))
    );
  }
  watchItems() {
    const db = Database.instance;
    return from(db).pipe(
      switchMap(
        (db2) => db2.collection(COLLECTIONS.COURSES).subcollection(this.id, COLLECTIONS.COURSE_ITEMS).watchQuery()
      ),
      map$1((items) => items.sort((a, b) => a.data.order - b.data.order))
    );
  }
  async getAllItems() {
    const db = await this.waitDb;
    return lastValueFrom(
      db.collection(COLLECTIONS.COURSES).subcollection(this.id, COLLECTIONS.COURSE_ITEMS).query().pipe(
        map$1((items) => items.sort((a, b) => a.data.order - b.data.order))
      )
    );
  }
  async markAsCompleted(id) {
    const db = await this.waitDb;
    await db.collection(COLLECTIONS.COURSES).subcollection(this.id, COLLECTIONS.COURSE_ITEMS).update(id, {
      completed: true
    });
  }
  async markAsNotCompleted(id) {
    const db = await this.waitDb;
    await db.collection(COLLECTIONS.COURSES).subcollection(this.id, COLLECTIONS.COURSE_ITEMS).update(id, {
      completed: false
    });
  }
  async addNote(content, item, timestampSeconds) {
    const db = await this.waitDb;
    const notes2 = db.collection(COLLECTIONS.NOTES);
    return notes2.add(
      {
        author: "Me",
        playlistId: this.id,
        videoId: item.videoId,
        content,
        videoTimestampSeconds: timestampSeconds,
        postTime: DateTime.now().toISO()
      }
    );
  }
  watchNotesOf(item) {
    const db = Database.instance;
    return from(db).pipe(
      switchMap(
        (db2) => db2.collection(COLLECTIONS.NOTES).watchQuery().pipe(
          map$1(
            (notes2) => notes2.filter((note) => note.data.videoId === item.videoId).sort((a, b) => {
              return a.data.videoTimestampSeconds - b.data.videoTimestampSeconds;
            })
          )
        )
      )
    );
  }
  deleteNoteById(noteId) {
    const db = Database.instance;
    return db.then((db2) => db2.collection(COLLECTIONS.NOTES).delete(noteId));
  }
}
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[10] = list[i];
  return child_ctx;
}
function create_else_block$1(ctx) {
  let div;
  let t;
  return {
    c() {
      div = element("div");
      t = text("Loading...");
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      t = claim_text(div_nodes, "Loading...");
      div_nodes.forEach(detach);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t);
    },
    p: noop$3,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block$2(ctx) {
  let div;
  let if_block = (
    /*$items$*/
    ctx[5] && create_if_block_1$1(ctx)
  );
  return {
    c() {
      div = element("div");
      if (if_block)
        if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if (if_block)
        if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "playlist-items-list flex flex-col");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if (if_block)
        if_block.m(div, null);
    },
    p(ctx2, dirty) {
      if (
        /*$items$*/
        ctx2[5]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_1$1(ctx2);
          if_block.c();
          if_block.m(div, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (detaching)
        detach(div);
      if (if_block)
        if_block.d();
    }
  };
}
function create_if_block_1$1(ctx) {
  let each_1_anchor;
  let each_value = (
    /*$items$*/
    ctx[5]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty$1();
    },
    l(nodes) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(nodes);
      }
      each_1_anchor = empty$1();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(target, anchor);
      }
      insert_hydration(target, each_1_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*$items$, $currentItem$, player, course*/
      99) {
        each_value = /*$items$*/
        ctx2[5];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    d(detaching) {
      destroy_each(each_blocks, detaching);
      if (detaching)
        detach(each_1_anchor);
    }
  };
}
function create_if_block_2$1(ctx) {
  let button;
  let span;
  let t0_value = (
    /*item*/
    ctx[10].data.title + ""
  );
  let t0;
  let t1;
  let t2;
  let t3;
  let mounted;
  let dispose;
  let if_block0 = (
    /*item*/
    ctx[10].data.completed && create_if_block_4$1(ctx)
  );
  let if_block1 = !/*item*/
  ctx[10].data.completed && create_if_block_3$1(ctx);
  function click_handler_2() {
    return (
      /*click_handler_2*/
      ctx[9](
        /*item*/
        ctx[10]
      )
    );
  }
  return {
    c() {
      button = element("button");
      span = element("span");
      t0 = text(t0_value);
      t1 = space();
      if (if_block0)
        if_block0.c();
      t2 = space();
      if (if_block1)
        if_block1.c();
      t3 = space();
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      span = claim_element(button_nodes, "SPAN", { class: true });
      var span_nodes = children(span);
      t0 = claim_text(span_nodes, t0_value);
      span_nodes.forEach(detach);
      t1 = claim_space(button_nodes);
      if (if_block0)
        if_block0.l(button_nodes);
      t2 = claim_space(button_nodes);
      if (if_block1)
        if_block1.l(button_nodes);
      t3 = claim_space(button_nodes);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(span, "class", "flex flex-grow");
      attr(button, "class", "playlist-items-list-item flex flex-row justify-start items-center m-1");
      toggle_class(
        button,
        "active",
        /*item*/
        ctx[10].id === /*$currentItem$*/
        ctx[6].videoId
      );
      toggle_class(
        button,
        "completed",
        /*item*/
        ctx[10].data.completed
      );
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      append_hydration(button, span);
      append_hydration(span, t0);
      append_hydration(button, t1);
      if (if_block0)
        if_block0.m(button, null);
      append_hydration(button, t2);
      if (if_block1)
        if_block1.m(button, null);
      append_hydration(button, t3);
      if (!mounted) {
        dispose = listen(button, "click", click_handler_2);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*$items$*/
      32 && t0_value !== (t0_value = /*item*/
      ctx[10].data.title + ""))
        set_data(t0, t0_value);
      if (
        /*item*/
        ctx[10].data.completed
      ) {
        if (if_block0) {
          if_block0.p(ctx, dirty);
        } else {
          if_block0 = create_if_block_4$1(ctx);
          if_block0.c();
          if_block0.m(button, t2);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      if (!/*item*/
      ctx[10].data.completed) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_3$1(ctx);
          if_block1.c();
          if_block1.m(button, t3);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
      if (dirty & /*$items$, $currentItem$*/
      96) {
        toggle_class(
          button,
          "active",
          /*item*/
          ctx[10].id === /*$currentItem$*/
          ctx[6].videoId
        );
      }
      if (dirty & /*$items$*/
      32) {
        toggle_class(
          button,
          "completed",
          /*item*/
          ctx[10].data.completed
        );
      }
    },
    d(detaching) {
      if (detaching)
        detach(button);
      if (if_block0)
        if_block0.d();
      if (if_block1)
        if_block1.d();
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_4$1(ctx) {
  let button;
  let i;
  let mounted;
  let dispose;
  function click_handler() {
    return (
      /*click_handler*/
      ctx[7](
        /*item*/
        ctx[10]
      )
    );
  }
  return {
    c() {
      button = element("button");
      i = element("i");
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      i = claim_element(button_nodes, "I", { class: true });
      children(i).forEach(detach);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(i, "class", "fas fa-check text-green-500");
      attr(button, "class", "progress-switch completed");
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      append_hydration(button, i);
      if (!mounted) {
        dispose = listen(button, "click", stop_propagation(click_handler));
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_3$1(ctx) {
  let button;
  let i;
  let mounted;
  let dispose;
  function click_handler_1() {
    return (
      /*click_handler_1*/
      ctx[8](
        /*item*/
        ctx[10]
      )
    );
  }
  return {
    c() {
      button = element("button");
      i = element("i");
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      i = claim_element(button_nodes, "I", { class: true });
      children(i).forEach(detach);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(i, "class", "fas fa-check text-white");
      attr(button, "class", "progress-switch");
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      append_hydration(button, i);
      if (!mounted) {
        dispose = listen(button, "click", stop_propagation(click_handler_1));
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function create_each_block$1(ctx) {
  let if_block_anchor;
  let if_block = (
    /*$currentItem$*/
    ctx[6] && create_if_block_2$1(ctx)
  );
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty$1();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty$1();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (
        /*$currentItem$*/
        ctx2[6]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_2$1(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_fragment$2(ctx) {
  let div;
  function select_block_type(ctx2, dirty) {
    if (
      /*loaded*/
      ctx2[3]
    )
      return create_if_block$2;
    return create_else_block$1;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      div = element("div");
      if_block.c();
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "playlist-items flex flex-col items-center");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      if_block.m(div, null);
    },
    p(ctx2, [dirty]) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(div, null);
        }
      }
    },
    i: noop$3,
    o: noop$3,
    d(detaching) {
      if (detaching)
        detach(div);
      if_block.d();
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let currentItem$;
  let loaded;
  let items$;
  let $items$, $$unsubscribe_items$ = noop$3, $$subscribe_items$ = () => ($$unsubscribe_items$(), $$unsubscribe_items$ = subscribe(items$, ($$value) => $$invalidate(5, $items$ = $$value)), items$);
  let $currentItem$, $$unsubscribe_currentItem$ = noop$3, $$subscribe_currentItem$ = () => ($$unsubscribe_currentItem$(), $$unsubscribe_currentItem$ = subscribe(currentItem$, ($$value) => $$invalidate(6, $currentItem$ = $$value)), currentItem$);
  $$self.$$.on_destroy.push(() => $$unsubscribe_items$());
  $$self.$$.on_destroy.push(() => $$unsubscribe_currentItem$());
  let { player = null } = $$props;
  let { course = null } = $$props;
  const click_handler = (item) => course == null ? void 0 : course.markAsNotCompleted(item.id);
  const click_handler_1 = (item) => course == null ? void 0 : course.markAsCompleted(item.id);
  const click_handler_2 = (item) => player.playVideo(item.id);
  $$self.$$set = ($$props2) => {
    if ("player" in $$props2)
      $$invalidate(0, player = $$props2.player);
    if ("course" in $$props2)
      $$invalidate(1, course = $$props2.course);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*player*/
    1) {
      $$subscribe_currentItem$($$invalidate(4, currentItem$ = (player == null ? void 0 : player.currentItem$()) ?? EMPTY));
    }
    if ($$self.$$.dirty & /*player, course*/
    3) {
      $$invalidate(3, loaded = !!player && !!course);
    }
    if ($$self.$$.dirty & /*course*/
    2) {
      $$subscribe_items$($$invalidate(2, items$ = (course == null ? void 0 : course.watchItems()) ?? EMPTY));
    }
  };
  return [
    player,
    course,
    items$,
    loaded,
    currentItem$,
    $items$,
    $currentItem$,
    click_handler,
    click_handler_1,
    click_handler_2
  ];
}
class PlaylistItems extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { player: 0, course: 1 });
  }
}
const notes = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[21] = list[i];
  return child_ctx;
}
function create_if_block$1(ctx) {
  let div1;
  let textarea;
  let t;
  let div0;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let mounted;
  let dispose;
  let each_value = (
    /*$notes$*/
    ctx[6]
  );
  const get_key = (ctx2) => (
    /*note*/
    ctx2[21].id
  );
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
  }
  return {
    c() {
      div1 = element("div");
      textarea = element("textarea");
      t = space();
      div0 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      textarea = claim_element(div1_nodes, "TEXTAREA", {
        class: true,
        placeholder: true,
        rows: true
      });
      children(textarea).forEach(detach);
      t = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(div0_nodes);
      }
      div0_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(textarea, "class", "notes-textarea");
      attr(textarea, "placeholder", "Type your note here...");
      textarea.disabled = /*disabled*/
      ctx[3];
      attr(textarea, "rows", "5");
      attr(div0, "class", "notes");
      attr(div1, "class", "notes-container");
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      append_hydration(div1, textarea);
      set_input_value(
        textarea,
        /*newNote*/
        ctx[2]
      );
      ctx[15](textarea);
      append_hydration(div1, t);
      append_hydration(div1, div0);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(div0, null);
      }
      if (!mounted) {
        dispose = [
          listen(
            textarea,
            "input",
            /*textarea_input_handler*/
            ctx[14]
          ),
          listen(
            textarea,
            "focus",
            /*focus_handler*/
            ctx[16]
          ),
          listen(
            textarea,
            "blur",
            /*blur_handler*/
            ctx[17]
          ),
          listen(
            textarea,
            "keydown",
            /*addNote*/
            ctx[7]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*disabled*/
      8) {
        textarea.disabled = /*disabled*/
        ctx2[3];
      }
      if (dirty & /*newNote*/
      4) {
        set_input_value(
          textarea,
          /*newNote*/
          ctx2[2]
        );
      }
      if (dirty & /*stringifyDate, $notes$, secondsToTime, deleteNote*/
      832) {
        each_value = /*$notes$*/
        ctx2[6];
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div0, destroy_block, create_each_block, null, get_each_context);
      }
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      ctx[15](null);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_each_block(key_1, ctx) {
  let div6;
  let div2;
  let div0;
  let t0_value = (
    /*note*/
    ctx[21].data.content + ""
  );
  let t0;
  let t1;
  let div1;
  let button;
  let i;
  let t2;
  let div5;
  let div3;
  let t3_value = (
    /*secondsToTime*/
    ctx[8](
      /*note*/
      ctx[21].data.videoTimestampSeconds
    ) + ""
  );
  let t3;
  let t4;
  let div4;
  let t5_value = stringifyDate(
    /*note*/
    ctx[21].data.postTime
  ) + "";
  let t5;
  let t6;
  let mounted;
  let dispose;
  function click_handler() {
    return (
      /*click_handler*/
      ctx[18](
        /*note*/
        ctx[21]
      )
    );
  }
  return {
    key: key_1,
    first: null,
    c() {
      div6 = element("div");
      div2 = element("div");
      div0 = element("div");
      t0 = text(t0_value);
      t1 = space();
      div1 = element("div");
      button = element("button");
      i = element("i");
      t2 = space();
      div5 = element("div");
      div3 = element("div");
      t3 = text(t3_value);
      t4 = space();
      div4 = element("div");
      t5 = text(t5_value);
      t6 = space();
      this.h();
    },
    l(nodes) {
      div6 = claim_element(nodes, "DIV", { class: true });
      var div6_nodes = children(div6);
      div2 = claim_element(div6_nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div0 = claim_element(div2_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      t0 = claim_text(div0_nodes, t0_value);
      div0_nodes.forEach(detach);
      t1 = claim_space(div2_nodes);
      div1 = claim_element(div2_nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      button = claim_element(div1_nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      i = claim_element(button_nodes, "I", { class: true });
      children(i).forEach(detach);
      button_nodes.forEach(detach);
      div1_nodes.forEach(detach);
      div2_nodes.forEach(detach);
      t2 = claim_space(div6_nodes);
      div5 = claim_element(div6_nodes, "DIV", { class: true });
      var div5_nodes = children(div5);
      div3 = claim_element(div5_nodes, "DIV", { class: true });
      var div3_nodes = children(div3);
      t3 = claim_text(div3_nodes, t3_value);
      div3_nodes.forEach(detach);
      t4 = claim_space(div5_nodes);
      div4 = claim_element(div5_nodes, "DIV", { class: true });
      var div4_nodes = children(div4);
      t5 = claim_text(div4_nodes, t5_value);
      div4_nodes.forEach(detach);
      div5_nodes.forEach(detach);
      t6 = claim_space(div6_nodes);
      div6_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "note-content flex-grow");
      attr(i, "class", "fas fa-trash-alt");
      attr(button, "class", "delete-btn");
      attr(div1, "class", "note-actions");
      attr(div2, "class", "note-body flex mb-2");
      attr(div3, "class", "note-timestamp");
      attr(div4, "class", "note-date");
      attr(div5, "class", "note-footer");
      attr(div6, "class", "note");
      this.first = div6;
    },
    m(target, anchor) {
      insert_hydration(target, div6, anchor);
      append_hydration(div6, div2);
      append_hydration(div2, div0);
      append_hydration(div0, t0);
      append_hydration(div2, t1);
      append_hydration(div2, div1);
      append_hydration(div1, button);
      append_hydration(button, i);
      append_hydration(div6, t2);
      append_hydration(div6, div5);
      append_hydration(div5, div3);
      append_hydration(div3, t3);
      append_hydration(div5, t4);
      append_hydration(div5, div4);
      append_hydration(div4, t5);
      append_hydration(div6, t6);
      if (!mounted) {
        dispose = listen(button, "click", click_handler);
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*$notes$*/
      64 && t0_value !== (t0_value = /*note*/
      ctx[21].data.content + ""))
        set_data(t0, t0_value);
      if (dirty & /*$notes$*/
      64 && t3_value !== (t3_value = /*secondsToTime*/
      ctx[8](
        /*note*/
        ctx[21].data.videoTimestampSeconds
      ) + ""))
        set_data(t3, t3_value);
      if (dirty & /*$notes$*/
      64 && t5_value !== (t5_value = stringifyDate(
        /*note*/
        ctx[21].data.postTime
      ) + ""))
        set_data(t5, t5_value);
    },
    d(detaching) {
      if (detaching)
        detach(div6);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment$1(ctx) {
  let if_block_anchor;
  let mounted;
  let dispose;
  let if_block = (
    /*state*/
    ctx[0] && /*player*/
    ctx[1] && /*$notes$*/
    ctx[6] && create_if_block$1(ctx)
  );
  return {
    c() {
      if (if_block)
        if_block.c();
      if_block_anchor = empty$1();
    },
    l(nodes) {
      if (if_block)
        if_block.l(nodes);
      if_block_anchor = empty$1();
    },
    m(target, anchor) {
      if (if_block)
        if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
      if (!mounted) {
        dispose = listen(
          window,
          "keydown",
          /*keydown_handler*/
          ctx[13]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*state*/
        ctx2[0] && /*player*/
        ctx2[1] && /*$notes$*/
        ctx2[6]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$1(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop$3,
    o: noop$3,
    d(detaching) {
      if (if_block)
        if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
      mounted = false;
      dispose();
    }
  };
}
function stringifyDate(postTime) {
  return new Date(postTime).toLocaleString();
}
function instance$1($$self, $$props, $$invalidate) {
  let notes$;
  let $notes$, $$unsubscribe_notes$ = noop$3, $$subscribe_notes$ = () => ($$unsubscribe_notes$(), $$unsubscribe_notes$ = subscribe(notes$, ($$value) => $$invalidate(6, $notes$ = $$value)), notes$);
  $$self.$$.on_destroy.push(() => $$unsubscribe_notes$());
  let newNote = "";
  let disabled = false;
  let { state = null } = $$props;
  let { player = null } = $$props;
  async function addNote(event) {
    if (event.key !== "Enter") {
      return;
    }
    if (event.shiftKey) {
      return;
    }
    if (!player) {
      return;
    }
    if (newNote === "") {
      event.preventDefault();
      return;
    }
    const currentItem = player.currentItem;
    const currentTime = await player.getCurrentTime();
    if (currentItem && state) {
      $$invalidate(3, disabled = true);
      try {
        await state.addNote(newNote, currentItem, currentTime);
        $$invalidate(2, newNote = "");
      } catch (e) {
        console.error(e);
      } finally {
        $$invalidate(3, disabled = false);
      }
      if (wasPlayingBeforeFocus) {
        await player.resume();
      }
    }
  }
  let wasPlayingBeforeFocus = false;
  function watchNotes(player2, state2) {
    return player2.currentItem$().pipe(switchMap((item) => item ? state2.watchNotesOf(item) : of(null)));
  }
  function secondsToTime(secs) {
    return Duration.fromObject({ seconds: secs }).toFormat("hh:mm:ss");
  }
  async function deleteNote(id) {
    if (state) {
      await state.deleteNoteById(id);
    }
  }
  async function onInputFocus() {
    if (player) {
      wasPlayingBeforeFocus = await player.getStatus() === PlayerStates.PLAYING;
      await player.pause();
    }
  }
  function onInputBlur() {
    if (wasPlayingBeforeFocus && newNote === "" && player) {
      player.resume();
    }
  }
  let noteInput = null;
  function onKeyDown(event) {
    if (event.ctrlKey && event.key === "o") {
      if (!noteInput) {
        return;
      }
      event.preventDefault();
      if (event.target === noteInput) {
        noteInput.blur();
      } else {
        noteInput.focus();
      }
    }
  }
  const keydown_handler = (event) => onKeyDown(event);
  function textarea_input_handler() {
    newNote = this.value;
    $$invalidate(2, newNote);
  }
  function textarea_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      noteInput = $$value;
      $$invalidate(4, noteInput);
    });
  }
  const focus_handler = (event) => onInputFocus();
  const blur_handler = () => onInputBlur();
  const click_handler = (note) => deleteNote(note.id);
  $$self.$$set = ($$props2) => {
    if ("state" in $$props2)
      $$invalidate(0, state = $$props2.state);
    if ("player" in $$props2)
      $$invalidate(1, player = $$props2.player);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*player, state*/
    3) {
      $$subscribe_notes$($$invalidate(5, notes$ = player && state ? watchNotes(player, state) : of(null)));
    }
  };
  return [
    state,
    player,
    newNote,
    disabled,
    noteInput,
    notes$,
    $notes$,
    addNote,
    secondsToTime,
    deleteNote,
    onInputFocus,
    onInputBlur,
    onKeyDown,
    keydown_handler,
    textarea_input_handler,
    textarea_binding,
    focus_handler,
    blur_handler,
    click_handler
  ];
}
class Notes extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { state: 0, player: 1 });
  }
}
const { window: window_1 } = globals;
function create_if_block_5(ctx) {
  let div;
  let t_value = (
    /*$currentItem$*/
    ctx[8].title + ""
  );
  let t;
  return {
    c() {
      div = element("div");
      t = text(t_value);
      this.h();
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      t = claim_text(div_nodes, t_value);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div, "class", "playlist-content-title flex flex-row justify-center items-center");
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t);
    },
    p(ctx2, dirty) {
      if (dirty & /*$currentItem$*/
      256 && t_value !== (t_value = /*$currentItem$*/
      ctx2[8].title + ""))
        set_data(t, t_value);
    },
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_else_block_2(ctx) {
  let div;
  let t;
  return {
    c() {
      div = element("div");
      t = text("Loading...");
    },
    l(nodes) {
      div = claim_element(nodes, "DIV", {});
      var div_nodes = children(div);
      t = claim_text(div_nodes, "Loading...");
      div_nodes.forEach(detach);
    },
    m(target, anchor) {
      insert_hydration(target, div, anchor);
      append_hydration(div, t);
    },
    p: noop$3,
    i: noop$3,
    o: noop$3,
    d(detaching) {
      if (detaching)
        detach(div);
    }
  };
}
function create_if_block(ctx) {
  let div0;
  let t;
  let div1;
  let notes2;
  let current;
  let if_block = (
    /*player*/
    ctx[0] && create_if_block_1(ctx)
  );
  notes2 = new Notes({
    props: {
      state: (
        /*course*/
        ctx[2]
      ),
      player: (
        /*player*/
        ctx[0]
      )
    }
  });
  return {
    c() {
      div0 = element("div");
      if (if_block)
        if_block.c();
      t = space();
      div1 = element("div");
      create_component(notes2.$$.fragment);
      this.h();
    },
    l(nodes) {
      div0 = claim_element(nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      if (if_block)
        if_block.l(div0_nodes);
      div0_nodes.forEach(detach);
      t = claim_space(nodes);
      div1 = claim_element(nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      claim_component(notes2.$$.fragment, div1_nodes);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(div0, "class", "playlist-content-controls flex flex-row justify-center items-center");
      attr(div1, "class", "playlist-content-notes flex flex-row justify-center items-center");
    },
    m(target, anchor) {
      insert_hydration(target, div0, anchor);
      if (if_block)
        if_block.m(div0, null);
      insert_hydration(target, t, anchor);
      insert_hydration(target, div1, anchor);
      mount_component(notes2, div1, null);
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*player*/
        ctx2[0]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block_1(ctx2);
          if_block.c();
          if_block.m(div0, null);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
      const notes_changes = {};
      if (dirty & /*course*/
      4)
        notes_changes.state = /*course*/
        ctx2[2];
      if (dirty & /*player*/
      1)
        notes_changes.player = /*player*/
        ctx2[0];
      notes2.$set(notes_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(notes2.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(notes2.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching)
        detach(div0);
      if (if_block)
        if_block.d();
      if (detaching)
        detach(t);
      if (detaching)
        detach(div1);
      destroy_component(notes2);
    }
  };
}
function create_if_block_1(ctx) {
  let div1;
  let button;
  let i;
  let button_disabled_value;
  let t0;
  let div0;
  let t1;
  let mounted;
  let dispose;
  function select_block_type_1(ctx2, dirty) {
    if (
      /*$isPlaying$*/
      ctx2[10]
    )
      return create_if_block_4;
    return create_else_block_1;
  }
  let current_block_type = select_block_type_1(ctx);
  let if_block0 = current_block_type(ctx);
  let if_block1 = (
    /*$currentItem$*/
    ctx[8] && create_if_block_2(ctx)
  );
  return {
    c() {
      div1 = element("div");
      button = element("button");
      i = element("i");
      t0 = space();
      div0 = element("div");
      if_block0.c();
      t1 = space();
      if (if_block1)
        if_block1.c();
      this.h();
    },
    l(nodes) {
      div1 = claim_element(nodes, "DIV", { class: true });
      var div1_nodes = children(div1);
      button = claim_element(div1_nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      i = claim_element(button_nodes, "I", { class: true });
      children(i).forEach(detach);
      button_nodes.forEach(detach);
      t0 = claim_space(div1_nodes);
      div0 = claim_element(div1_nodes, "DIV", { class: true });
      var div0_nodes = children(div0);
      if_block0.l(div0_nodes);
      div0_nodes.forEach(detach);
      t1 = claim_space(div1_nodes);
      if (if_block1)
        if_block1.l(div1_nodes);
      div1_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(i, "class", "fas fa-step-backward");
      attr(button, "class", "player-controls-btn");
      button.disabled = button_disabled_value = !/*$hasPrevious$*/
      ctx[9];
      attr(div0, "class", "mx-2");
      attr(div1, "class", "flex flex-row justify-center");
    },
    m(target, anchor) {
      insert_hydration(target, div1, anchor);
      append_hydration(div1, button);
      append_hydration(button, i);
      append_hydration(div1, t0);
      append_hydration(div1, div0);
      if_block0.m(div0, null);
      append_hydration(div1, t1);
      if (if_block1)
        if_block1.m(div1, null);
      if (!mounted) {
        dispose = listen(button, "click", function() {
          if (is_function(
            /*previous*/
            ctx[12](
              /*player*/
              ctx[0]
            )
          ))
            ctx[12](
              /*player*/
              ctx[0]
            ).apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*$hasPrevious$*/
      512 && button_disabled_value !== (button_disabled_value = !/*$hasPrevious$*/
      ctx[9])) {
        button.disabled = button_disabled_value;
      }
      if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block0) {
        if_block0.p(ctx, dirty);
      } else {
        if_block0.d(1);
        if_block0 = current_block_type(ctx);
        if (if_block0) {
          if_block0.c();
          if_block0.m(div0, null);
        }
      }
      if (
        /*$currentItem$*/
        ctx[8]
      ) {
        if (if_block1) {
          if_block1.p(ctx, dirty);
        } else {
          if_block1 = create_if_block_2(ctx);
          if_block1.c();
          if_block1.m(div1, null);
        }
      } else if (if_block1) {
        if_block1.d(1);
        if_block1 = null;
      }
    },
    d(detaching) {
      if (detaching)
        detach(div1);
      if_block0.d();
      if (if_block1)
        if_block1.d();
      mounted = false;
      dispose();
    }
  };
}
function create_else_block_1(ctx) {
  let button;
  let i;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      i = element("i");
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      i = claim_element(button_nodes, "I", { class: true });
      children(i).forEach(detach);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(i, "class", "fas fa-play");
      attr(button, "class", "player-controls-btn");
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      append_hydration(button, i);
      if (!mounted) {
        dispose = listen(button, "click", function() {
          if (is_function(
            /*resume*/
            ctx[15](
              /*player*/
              ctx[0]
            )
          ))
            ctx[15](
              /*player*/
              ctx[0]
            ).apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_4(ctx) {
  let button;
  let i;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      i = element("i");
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      i = claim_element(button_nodes, "I", { class: true });
      children(i).forEach(detach);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(i, "class", "fas fa-pause");
      attr(button, "class", "player-controls-btn");
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      append_hydration(button, i);
      if (!mounted) {
        dispose = listen(button, "click", function() {
          if (is_function(
            /*pause*/
            ctx[14](
              /*player*/
              ctx[0]
            )
          ))
            ctx[14](
              /*player*/
              ctx[0]
            ).apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
    },
    d(detaching) {
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_2(ctx) {
  let if_block_anchor;
  function select_block_type_2(ctx2, dirty) {
    if (
      /*$currentItem$*/
      ctx2[8].completed
    )
      return create_if_block_3;
    return create_else_block;
  }
  let current_block_type = select_block_type_2(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      if_block.c();
      if_block_anchor = empty$1();
    },
    l(nodes) {
      if_block.l(nodes);
      if_block_anchor = empty$1();
    },
    m(target, anchor) {
      if_block.m(target, anchor);
      insert_hydration(target, if_block_anchor, anchor);
    },
    p(ctx2, dirty) {
      if (current_block_type === (current_block_type = select_block_type_2(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      }
    },
    d(detaching) {
      if_block.d(detaching);
      if (detaching)
        detach(if_block_anchor);
    }
  };
}
function create_else_block(ctx) {
  let button;
  let i;
  let button_disabled_value;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      i = element("i");
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      i = claim_element(button_nodes, "I", { class: true });
      children(i).forEach(detach);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(i, "class", "fas fa-check");
      attr(button, "class", "player-controls-btn completed");
      button.disabled = button_disabled_value = !/*$hasNext$*/
      ctx[11];
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      append_hydration(button, i);
      if (!mounted) {
        dispose = listen(button, "click", function() {
          if (is_function(
            /*next*/
            ctx[13](
              /*player*/
              ctx[0],
              /*$currentItem$*/
              ctx[8]
            )
          ))
            ctx[13](
              /*player*/
              ctx[0],
              /*$currentItem$*/
              ctx[8]
            ).apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*$hasNext$*/
      2048 && button_disabled_value !== (button_disabled_value = !/*$hasNext$*/
      ctx[11])) {
        button.disabled = button_disabled_value;
      }
    },
    d(detaching) {
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function create_if_block_3(ctx) {
  let button;
  let i;
  let button_disabled_value;
  let mounted;
  let dispose;
  return {
    c() {
      button = element("button");
      i = element("i");
      this.h();
    },
    l(nodes) {
      button = claim_element(nodes, "BUTTON", { class: true });
      var button_nodes = children(button);
      i = claim_element(button_nodes, "I", { class: true });
      children(i).forEach(detach);
      button_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(i, "class", "fas fa-step-forward");
      attr(button, "class", "player-controls-btn");
      button.disabled = button_disabled_value = !/*$hasNext$*/
      ctx[11];
    },
    m(target, anchor) {
      insert_hydration(target, button, anchor);
      append_hydration(button, i);
      if (!mounted) {
        dispose = listen(button, "click", function() {
          if (is_function(
            /*next*/
            ctx[13](
              /*player*/
              ctx[0]
            )
          ))
            ctx[13](
              /*player*/
              ctx[0]
            ).apply(this, arguments);
        });
        mounted = true;
      }
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*$hasNext$*/
      2048 && button_disabled_value !== (button_disabled_value = !/*$hasNext$*/
      ctx[11])) {
        button.disabled = button_disabled_value;
      }
    },
    d(detaching) {
      if (detaching)
        detach(button);
      mounted = false;
      dispose();
    }
  };
}
function create_fragment(ctx) {
  let meta;
  let t0;
  let section;
  let div2;
  let div1;
  let div0;
  let t1;
  let t2;
  let current_block_type_index;
  let if_block1;
  let t3;
  let playlistitems;
  let current;
  let mounted;
  let dispose;
  let if_block0 = (
    /*$currentItem$*/
    ctx[8] && create_if_block_5(ctx)
  );
  const if_block_creators = [create_if_block, create_else_block_2];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*loaded*/
      ctx2[3]
    )
      return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  playlistitems = new PlaylistItems({
    props: {
      player: (
        /*player*/
        ctx[0]
      ),
      course: (
        /*course*/
        ctx[2]
      )
    }
  });
  return {
    c() {
      meta = element("meta");
      t0 = space();
      section = element("section");
      div2 = element("div");
      div1 = element("div");
      div0 = element("div");
      t1 = space();
      if (if_block0)
        if_block0.c();
      t2 = space();
      if_block1.c();
      t3 = space();
      create_component(playlistitems.$$.fragment);
      this.h();
    },
    l(nodes) {
      const head_nodes = head_selector("svelte-1mclfgv", document.head);
      meta = claim_element(head_nodes, "META", { name: true, content: true });
      head_nodes.forEach(detach);
      t0 = claim_space(nodes);
      section = claim_element(nodes, "SECTION", { class: true });
      var section_nodes = children(section);
      div2 = claim_element(section_nodes, "DIV", { class: true });
      var div2_nodes = children(div2);
      div1 = claim_element(div2_nodes, "DIV", { class: true, id: true });
      var div1_nodes = children(div1);
      div0 = claim_element(div1_nodes, "DIV", {});
      children(div0).forEach(detach);
      div1_nodes.forEach(detach);
      t1 = claim_space(div2_nodes);
      if (if_block0)
        if_block0.l(div2_nodes);
      t2 = claim_space(div2_nodes);
      if_block1.l(div2_nodes);
      div2_nodes.forEach(detach);
      t3 = claim_space(section_nodes);
      claim_component(playlistitems.$$.fragment, section_nodes);
      section_nodes.forEach(detach);
      this.h();
    },
    h() {
      document.title = "Open Academy - Class";
      attr(meta, "name", "description");
      attr(meta, "content", "Open Academy is a free, open-source platform for online learning.");
      attr(div1, "class", "playlist-content-player");
      attr(div1, "id", "player");
      attr(div2, "class", "playlist-content flex flex-col flex-grow");
      attr(section, "class", "class-container flex flex-row h-full");
    },
    m(target, anchor) {
      append_hydration(document.head, meta);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, section, anchor);
      append_hydration(section, div2);
      append_hydration(div2, div1);
      append_hydration(div1, div0);
      ctx[18](div0);
      append_hydration(div2, t1);
      if (if_block0)
        if_block0.m(div2, null);
      append_hydration(div2, t2);
      if_blocks[current_block_type_index].m(div2, null);
      append_hydration(section, t3);
      mount_component(playlistitems, section, null);
      current = true;
      if (!mounted) {
        dispose = listen(
          window_1,
          "keydown",
          /*keydown_handler*/
          ctx[17]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*$currentItem$*/
        ctx2[8]
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
        } else {
          if_block0 = create_if_block_5(ctx2);
          if_block0.c();
          if_block0.m(div2, t2);
        }
      } else if (if_block0) {
        if_block0.d(1);
        if_block0 = null;
      }
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block1 = if_blocks[current_block_type_index];
        if (!if_block1) {
          if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block1.c();
        } else {
          if_block1.p(ctx2, dirty);
        }
        transition_in(if_block1, 1);
        if_block1.m(div2, null);
      }
      const playlistitems_changes = {};
      if (dirty & /*player*/
      1)
        playlistitems_changes.player = /*player*/
        ctx2[0];
      if (dirty & /*course*/
      4)
        playlistitems_changes.course = /*course*/
        ctx2[2];
      playlistitems.$set(playlistitems_changes);
    },
    i(local) {
      if (current)
        return;
      transition_in(if_block1);
      transition_in(playlistitems.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(if_block1);
      transition_out(playlistitems.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      detach(meta);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(section);
      ctx[18](null);
      if (if_block0)
        if_block0.d();
      if_blocks[current_block_type_index].d();
      destroy_component(playlistitems);
      mounted = false;
      dispose();
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let isPlaying$;
  let hasPrevious$;
  let hasNext$;
  let currentItem$;
  let $currentItem$, $$unsubscribe_currentItem$ = noop$3, $$subscribe_currentItem$ = () => ($$unsubscribe_currentItem$(), $$unsubscribe_currentItem$ = subscribe(currentItem$, ($$value) => $$invalidate(8, $currentItem$ = $$value)), currentItem$);
  let $hasPrevious$, $$unsubscribe_hasPrevious$ = noop$3, $$subscribe_hasPrevious$ = () => ($$unsubscribe_hasPrevious$(), $$unsubscribe_hasPrevious$ = subscribe(hasPrevious$, ($$value) => $$invalidate(9, $hasPrevious$ = $$value)), hasPrevious$);
  let $isPlaying$, $$unsubscribe_isPlaying$ = noop$3, $$subscribe_isPlaying$ = () => ($$unsubscribe_isPlaying$(), $$unsubscribe_isPlaying$ = subscribe(isPlaying$, ($$value) => $$invalidate(10, $isPlaying$ = $$value)), isPlaying$);
  let $hasNext$, $$unsubscribe_hasNext$ = noop$3, $$subscribe_hasNext$ = () => ($$unsubscribe_hasNext$(), $$unsubscribe_hasNext$ = subscribe(hasNext$, ($$value) => $$invalidate(11, $hasNext$ = $$value)), hasNext$);
  $$self.$$.on_destroy.push(() => $$unsubscribe_currentItem$());
  $$self.$$.on_destroy.push(() => $$unsubscribe_hasPrevious$());
  $$self.$$.on_destroy.push(() => $$unsubscribe_isPlaying$());
  $$self.$$.on_destroy.push(() => $$unsubscribe_hasNext$());
  let container = null;
  let player = null;
  let course = null;
  let loaded = false;
  async function init2() {
    if (!container) {
      console.warn("Container not found");
      $$invalidate(3, loaded = true);
      return;
    }
    const searchParams = new URLSearchParams(window.location.search);
    const playlistId = searchParams.get("list");
    if (!playlistId) {
      console.warn("Playlist ID not found");
      $$invalidate(3, loaded = true);
      return;
    }
    const playlist = new YoutubePlaylist(playlistId);
    $$invalidate(2, course = new CourseState(playlist));
    const enrolled = await course.enroll();
    if (!enrolled) {
      console.warn("Course not enrolled");
      $$invalidate(3, loaded = true);
      return;
    }
    $$invalidate(0, player = await CoursePlayer.create(container, course));
    $$invalidate(3, loaded = true);
  }
  onMount(async () => {
    await init2();
  });
  function refreshPlayer() {
    $$invalidate(0, player);
  }
  async function previous(player2) {
    await player2.playPrevious();
    refreshPlayer();
  }
  async function next(player2, item) {
    if (item && course) {
      await course.markAsCompleted(item.videoId);
    }
    await player2.playNext();
    refreshPlayer();
  }
  async function pause(player2) {
    await player2.pause();
    refreshPlayer();
  }
  async function resume(player2) {
    await player2.resume();
    refreshPlayer();
  }
  function onWindowKeyDown(event) {
    if (!player) {
      return;
    }
    const currentPlayer = player;
    if (event.code === "Space") {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }
      event.preventDefault();
      currentPlayer.getStatus().then((currentStatus) => {
        switch (currentStatus) {
          case PlayerStates.PLAYING:
            pause(currentPlayer).then();
            break;
          case PlayerStates.PAUSED:
            resume(currentPlayer).then();
            break;
        }
      });
    }
  }
  const keydown_handler = (event) => onWindowKeyDown(event);
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      container = $$value;
      $$invalidate(1, container);
    });
  }
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*player*/
    1) {
      $$subscribe_isPlaying$($$invalidate(7, isPlaying$ = player == null ? void 0 : player.isPlaying$()));
    }
    if ($$self.$$.dirty & /*player*/
    1) {
      $$subscribe_hasPrevious$($$invalidate(6, hasPrevious$ = player == null ? void 0 : player.hasPrevious$()));
    }
    if ($$self.$$.dirty & /*player*/
    1) {
      $$subscribe_hasNext$($$invalidate(5, hasNext$ = player == null ? void 0 : player.hasNext$()));
    }
    if ($$self.$$.dirty & /*player*/
    1) {
      $$subscribe_currentItem$($$invalidate(4, currentItem$ = player == null ? void 0 : player.currentItem$()));
    }
  };
  return [
    player,
    container,
    course,
    loaded,
    currentItem$,
    hasNext$,
    hasPrevious$,
    isPlaying$,
    $currentItem$,
    $hasPrevious$,
    $isPlaying$,
    $hasNext$,
    previous,
    next,
    pause,
    resume,
    onWindowKeyDown,
    keydown_handler,
    div0_binding
  ];
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, {});
  }
}
export {
  ObjectUnsubscribedError as $,
  AsyncAction as A,
  mergeMap as B,
  scheduleIterable as C,
  __generator as D,
  EMPTY as E,
  timer as F,
  popNumber as G,
  mergeAll as H,
  noop$2 as I,
  OperatorSubscriber as J,
  __values as K,
  arrRemove as L,
  pipe as M,
  concatAll as N,
  Observable as O,
  Page as P,
  concat as Q,
  distinctUntilChanged as R,
  Subscription as S,
  mergeInternals as T,
  switchMap as U,
  async as V,
  observable as W,
  Scheduler as X,
  Subscriber as Y,
  lastValueFrom as Z,
  __extends as _,
  __spreadArray as a,
  UnsubscriptionError as a0,
  empty as a1,
  scheduled as a2,
  config as a3,
  startWith as a4,
  __read as b,
  createOperatorSubscriber as c,
  Subject as d,
  dateTimestampProvider as e,
  AsyncScheduler as f,
  of as g,
  hasLift as h,
  isFunction as i,
  SafeSubscriber as j,
  EmptyError as k,
  createErrorClass as l,
  isValidDate as m,
  executeSchedule as n,
  operate as o,
  innerFrom as p,
  asyncScheduler as q,
  map$1 as r,
  isScheduler as s,
  subscribeOn as t,
  observeOn as u,
  popScheduler as v,
  popResultSelector as w,
  from as x,
  identity as y,
  isArrayLike as z
};
