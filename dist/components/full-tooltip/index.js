"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _goober = require("goober");

var _hooks = require("./hooks");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

(0, _goober.setup)(_react["default"].createElement);
var Tooltip = (0, _goober.styled)('div', _react.forwardRef)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  left: ", "px;\n  top: ", "px;\n  max-height: ", "px;\n  max-width: ", "px;\n  z-index: 9999;\n  position: absolute;\n  overflow: auto;\n  padding: 0em;\n  background-color: white;\n"])), function (_ref) {
  var left = _ref.left;
  return left;
}, function (_ref2) {
  var top = _ref2.top;
  return top;
}, function (props) {
  return props['max-height'];
}, function (props) {
  return props['max-width'];
});

var MapTooltipContainer = function MapTooltipContainer(_ref3) {
  var x = _ref3.x,
      y = _ref3.y,
      w = _ref3.w,
      h = _ref3.h,
      children = _ref3.children,
      translate = _ref3.translate,
      classes = _ref3.classes;
  // TODO anchor position configuration, currently just bottom right
  var tooltipRef = (0, _react.useRef)();
  var dimensions = (0, _hooks.useDimensions)(tooltipRef, w, h);
  var xOffset = Math.max(-dimensions.w, w - (x + dimensions.w));
  var yOffset = Math.max(-dimensions.h, h - (y + dimensions.h));
  return /*#__PURE__*/_react["default"].createElement(Tooltip, {
    ref: tooltipRef,
    className: classes,
    left: x + (!translate || xOffset > 0 ? 0 : xOffset),
    top: y + (!translate || yOffset > 0 ? 0 : yOffset),
    "max-height": Math.min(dimensions.h, h / 2),
    "max-width": Math.min(dimensions.w, w / 2)
  }, children);
};

MapTooltipContainer.propTypes = {
  x: _propTypes["default"].number.isRequired,
  y: _propTypes["default"].number.isRequired,
  w: _propTypes["default"].number.isRequired,
  h: _propTypes["default"].number.isRequired,
  children: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].element]).isRequired,
  translate: _propTypes["default"].bool,
  classes: _propTypes["default"].string
};
MapTooltipContainer.defaultProps = {
  translate: false,
  classes: ''
};
var _default = MapTooltipContainer;
exports["default"] = _default;