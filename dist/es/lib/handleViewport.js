"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _hoistNonReactStatics = _interopRequireDefault(require("hoist-non-react-statics"));

var _useInViewport = _interopRequireDefault(require("./useInViewport"));

var _constants = require("./constants");

var _jsxRuntime = require("react/jsx-runtime");

var _excluded = ["onEnterViewport", "onLeaveViewport"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var isFunctionalComponent = Component => {
  return typeof Component === 'function' && !(Component.prototype && Component.prototype.render);
};

var isReactComponent = Component => {
  return Component.prototype && Component.prototype.isReactComponent;
};

function handleViewport(TargetComponent, options, config) {
  if (options === void 0) {
    options = _constants.defaultOptions;
  }

  if (config === void 0) {
    config = _constants.defaultConfig;
  }

  var ForwardedRefComponent = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
    var refProps = _extends({
      forwardedRef: ref
    }, isReactComponent(TargetComponent) && !isFunctionalComponent(TargetComponent) ? {
      ref
    } : {});

    return /*#__PURE__*/(0, _jsxRuntime.jsx)(TargetComponent, _extends({}, props, refProps));
  });

  function InViewport(_ref) {
    var {
      onEnterViewport = _constants.noop,
      onLeaveViewport = _constants.noop
    } = _ref,
        restProps = _objectWithoutPropertiesLoose(_ref, _excluded);

    var node = (0, _react.useRef)();
    var {
      inViewport,
      enterCount,
      leaveCount
    } = (0, _useInViewport.default)(node, options, config, {
      onEnterViewport,
      onLeaveViewport
    });
    var injectedProps = {
      inViewport,
      enterCount,
      leaveCount
    };
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(ForwardedRefComponent, _extends({}, restProps, injectedProps, {
      ref: node
    }));
  }

  var name = TargetComponent.displayName || TargetComponent.name || 'Component';
  InViewport.displayName = "handleViewport(" + name + ")";
  return (0, _hoistNonReactStatics.default)(InViewport, ForwardedRefComponent);
}

var _default = handleViewport;
exports.default = _default;