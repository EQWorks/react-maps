"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _goober = require("goober");

var _mapProps = require("../../shared/map-props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _goober.setup)(_react["default"].createElement);
var TooltipWrapper = (0, _goober.styled)('div')(function (_ref) {
  var info = _ref.info,
      typography = _ref.typography,
      tooltipstyle = _ref.tooltipstyle;
  return _objectSpread(_objectSpread(_objectSpread({}, typography), tooltipstyle), {}, {
    position: 'absolute',
    zIndex: 1,
    pointerEvents: 'none',
    left: "calc(".concat(info.x, "px + 10px)"),
    top: "calc(".concat(info.y, "px + 10px)")
  });
}); // Tooltip component - general tooltip for maps

var Tooltip = function Tooltip(_ref2) {
  var info = _ref2.info,
      children = _ref2.children,
      typography = _ref2.typography,
      tooltipProps = _ref2.tooltipProps;
  return /*#__PURE__*/_react["default"].createElement(TooltipWrapper, {
    info: info,
    typography: typography,
    tooltipstyle: tooltipProps
  }, children);
};

Tooltip.propTypes = _objectSpread(_objectSpread({
  info: _propTypes["default"].object.isRequired,
  children: _propTypes["default"].element.isRequired
}, _mapProps.typographyPropTypes), _mapProps.tooltipPropTypes);
Tooltip.defaultProps = _objectSpread(_objectSpread({}, _mapProps.typographyDefaultProps), _mapProps.tooltipDefaultProps);
var _default = Tooltip;
exports["default"] = _default;