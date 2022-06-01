"use strict";

exports.__esModule = true;
exports.noop = exports.defaultProps = exports.defaultOptions = exports.defaultConfig = void 0;
var defaultOptions = {};
exports.defaultOptions = defaultOptions;
var defaultConfig = {
  disconnectOnLeave: false
};
exports.defaultConfig = defaultConfig;

var noop = () => {};

exports.noop = noop;
var defaultProps = {
  onEnterViewport: noop,
  onLeaveViewport: noop
};
exports.defaultProps = defaultProps;