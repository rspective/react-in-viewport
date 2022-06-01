(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./lib/handleViewport", "./lib/useInViewport"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./lib/handleViewport"), require("./lib/useInViewport"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.handleViewport, global.useInViewport);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _handleViewport, _useInViewport) {
  "use strict";

  _exports.__esModule = true;
  _exports.useInViewport = _exports.handleViewport = _exports["default"] = _exports.customProps = void 0;
  _handleViewport = _interopRequireDefault(_handleViewport);
  _exports.handleViewport = _handleViewport["default"];
  _useInViewport = _interopRequireDefault(_useInViewport);
  _exports.useInViewport = _useInViewport["default"];

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  var customProps = ['inViewport', 'enterCount', 'leaveCount'];
  _exports.customProps = customProps;
  var _default = _handleViewport["default"];
  _exports["default"] = _default;
});