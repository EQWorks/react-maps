"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _goober = require("goober");

var _legendSymbol = _interopRequireDefault(require("./legend-symbol"));

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

(0, _goober.setup)(_react["default"].createElement);
var LegendBody = (0, _goober.styled)('div')(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  align-items: center;\n  margin-top: .75rem;\n"])));
var LegendTitle = (0, _goober.styled)('div')(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  margin: 0 auto 10px auto;\n  text-align: center;\n  fontWeight: 700;\n  max-width: ", ";\n  overflow-wrap: anywhere;\n"])), function (_ref) {
  var legendelemwidth = _ref.legendelemwidth;
  return legendelemwidth;
});
var LegendElements = (0, _goober.styled)('div')(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"])));
var LegendTextContainer = (0, _goober.styled)('div')(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  width: ", ";\n  padding: ", ";\n  margin-top: 5px;\n"])), function (_ref2) {
  var textcontainerwidth = _ref2.textcontainerwidth;
  return textcontainerwidth;
}, function (_ref3) {
  var textcontainerpadding = _ref3.textcontainerpadding;
  return textcontainerpadding;
});
var LegendText = (0, _goober.styled)('div')(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  color: black;\n  margin: ", ";\n"])), function (_ref4) {
  var max = _ref4.max;
  return max ? '' : 'auto';
});
var LegendSymbolContainer = (0, _goober.styled)('div')(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  width: ", ";\n"])), function (_ref5) {
  var max = _ref5.max,
      legendelemwidth = _ref5.legendelemwidth;
  return max ? legendelemwidth : '20px';
});

var LegendItem = function LegendItem(_ref6) {
  var legendItemProps = _ref6.legendItemProps;

  var min = legendItemProps.min,
      max = legendItemProps.max,
      label = legendItemProps.label,
      metricAliases = legendItemProps.metricAliases,
      _legendItemProps$form = legendItemProps.formatLegendTitle,
      formatLegendTitle = _legendItemProps$form === void 0 ? function (d) {
    return d;
  } : _legendItemProps$form,
      _legendItemProps$form2 = legendItemProps.formatPropertyLabel,
      formatPropertyLabel = _legendItemProps$form2 === void 0 ? function (d) {
    return d;
  } : _legendItemProps$form2,
      formatData = legendItemProps.formatData,
      type = legendItemProps.type,
      legendSize = legendItemProps.legendSize,
      symbolProps = _objectWithoutProperties(legendItemProps, ["min", "max", "label", "metricAliases", "formatLegendTitle", "formatPropertyLabel", "formatData", "type", "legendSize"]);

  var legendElemWidth = legendSize === 'full' ? '120px' : '80px';
  var textContainerWidth = '20px';

  if (max > 0) {
    textContainerWidth = legendSize === 'full' ? '130px' : '90px';

    if (type === 'size') {
      textContainerWidth = legendElemWidth;
    }
  }

  var textContainerPadding = '0px';

  if (max > 0) {
    textContainerPadding = legendSize === 'full' ? '0 0 0 3px' : '0 3px 0 5px';

    if (type === 'size') {
      textContainerPadding = legendSize === 'full' ? '0 5px 0 3px' : '0';
    }
  }

  var title = formatLegendTitle((metricAliases === null || metricAliases === void 0 ? void 0 : metricAliases[label]) || formatPropertyLabel(label));

  var _ref7 = formatData !== null && formatData !== void 0 && formatData[label] ? [formatData[label](min), formatData[label](max)] : [min, max],
      _ref8 = _slicedToArray(_ref7, 2),
      minValue = _ref8[0],
      maxValue = _ref8[1];

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, max !== undefined && min !== undefined && /*#__PURE__*/_react["default"].createElement(LegendBody, null, /*#__PURE__*/_react["default"].createElement(LegendTitle, {
    legendelemwidth: legendElemWidth
  }, title), /*#__PURE__*/_react["default"].createElement(LegendElements, null, /*#__PURE__*/_react["default"].createElement(LegendSymbolContainer, {
    max: max,
    legendelemwidth: legendElemWidth
  }, /*#__PURE__*/_react["default"].createElement(_legendSymbol["default"], {
    symbolProps: _objectSpread({
      max: max,
      type: type,
      legendSize: legendSize
    }, symbolProps)
  })), /*#__PURE__*/_react["default"].createElement(LegendTextContainer, {
    textcontainerpadding: textContainerPadding,
    textcontainerwidth: textContainerWidth
  }, /*#__PURE__*/_react["default"].createElement(LegendText, {
    max: max
  }, minValue.toLocaleString()), max > 0 && /*#__PURE__*/_react["default"].createElement(LegendText, {
    max: max
  }, maxValue.toLocaleString())))));
};

LegendItem.propTypes = {
  legendItemProps: _propTypes["default"].shape({
    label: _propTypes["default"].string,
    max: _propTypes["default"].number,
    min: _propTypes["default"].number,
    metricAliases: _propTypes["default"].object,
    formatLegendTitle: _propTypes["default"].func,
    formatPropertyLabel: _propTypes["default"].func,
    formatData: _propTypes["default"].object,
    type: _propTypes["default"].string,
    legendSize: _propTypes["default"].string.isRequired,
    symbolProps: _propTypes["default"].object
  })
};
LegendItem.defaultProps = {
  legendItemProps: {
    label: '',
    max: undefined,
    min: undefined,
    metricAliases: undefined,
    formatLegendTitle: function formatLegendTitle(d) {
      return d;
    },
    formatPropertyLabel: function formatPropertyLabel(d) {
      return d;
    },
    formatData: undefined,
    type: '',
    symbolProps: undefined
  }
};
var _default = LegendItem;
exports["default"] = _default;