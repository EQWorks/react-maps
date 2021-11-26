"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _goober = require("goober");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

(0, _goober.setup)(_react["default"].createElement);
var Title = (0, _goober.styled)('div')(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  margin: 0px;\n  fontWeight: 700;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n"])));
var Id = (0, _goober.styled)('div')(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  margin: 0px;\n  font-size: 10px;\n  color: #808080;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n"])));
var TooltipAttributes = (0, _goober.styled)('div')(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  display: grid;\n  grid-template-columns: auto auto;\n  grid-gap: 10px;\n"])));
var Keys = (0, _goober.styled)('div')(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  fontWeight: 600;\n  display: flex;\n  flex-direction: column;\n"])));
var Values = (0, _goober.styled)('div')(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n"])));
var Line = (0, _goober.styled)('hr')(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  border-top: 1px solid #6c6c6c;\n"])));
/**
 * tooltipNode - returns a node element with: name, id, and 'key: value' pairs for Tooltip component
 * @param { object } param
 * @param { object } param.tooltipKeys - object of attribute keys for Tooltip component
 * @param { function } param.formatData - object of data formatting for different key values
 * @param { function } param.formatTooltipTitle - function to truncate Tooltip title
 * @param { object } param.params - object of deck.gl onHover event
 * @returns { Node } - node element
 */

var tooltipNode = function tooltipNode(_ref) {
  var _nameAccessor, _idAccessor, _nameAccessor2, _idAccessor2;

  var tooltipKeys = _ref.tooltipKeys,
      _ref$formatData = _ref.formatData,
      formatData = _ref$formatData === void 0 ? function (d) {
    return d;
  } : _ref$formatData,
      _ref$formatTooltipTit = _ref.formatTooltipTitle,
      formatTooltipTitle = _ref$formatTooltipTit === void 0 ? function (d) {
    return d;
  } : _ref$formatTooltipTit,
      _ref$formatPropertyLa = _ref.formatPropertyLabel,
      formatPropertyLabel = _ref$formatPropertyLa === void 0 ? function (d) {
    return d;
  } : _ref$formatPropertyLa,
      params = _ref.params;
  var name = tooltipKeys.name,
      id = tooltipKeys.id,
      metricKeys = tooltipKeys.metricKeys,
      nameAccessor = tooltipKeys.nameAccessor,
      idAccessor = tooltipKeys.idAccessor,
      metricAccessor = tooltipKeys.metricAccessor,
      metricAliases = tooltipKeys.metricAliases;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, name && ((_nameAccessor = nameAccessor(params)) === null || _nameAccessor === void 0 ? void 0 : _nameAccessor[name]) && /*#__PURE__*/_react["default"].createElement(Title, null, formatTooltipTitle(nameAccessor(params)[name])), id && ((_idAccessor = idAccessor(params)) === null || _idAccessor === void 0 ? void 0 : _idAccessor[id]) && /*#__PURE__*/_react["default"].createElement(Id, null, idAccessor(params)[id]), (metricKeys === null || metricKeys === void 0 ? void 0 : metricKeys.length) && /*#__PURE__*/_react["default"].createElement("div", null, (((_nameAccessor2 = nameAccessor(params)) === null || _nameAccessor2 === void 0 ? void 0 : _nameAccessor2[name]) || ((_idAccessor2 = idAccessor(params)) === null || _idAccessor2 === void 0 ? void 0 : _idAccessor2[id])) && /*#__PURE__*/_react["default"].createElement(Line, null), /*#__PURE__*/_react["default"].createElement(TooltipAttributes, null, /*#__PURE__*/_react["default"].createElement(Keys, null, Object.entries(metricAccessor(params)).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 1),
        key = _ref3[0];

    return metricKeys.includes(key) && /*#__PURE__*/_react["default"].createElement("div", {
      key: key
    }, (metricAliases === null || metricAliases === void 0 ? void 0 : metricAliases[key]) || formatPropertyLabel(key), ":");
  })), /*#__PURE__*/_react["default"].createElement(Values, null, Object.entries(metricAccessor(params)).map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
        key = _ref5[0],
        value = _ref5[1];

    return metricKeys.includes(key) && /*#__PURE__*/_react["default"].createElement("div", {
      key: key
    }, formatData !== null && formatData !== void 0 && formatData[key] ? formatData === null || formatData === void 0 ? void 0 : formatData[key](value) : value);
  })))));
};

var _default = tooltipNode;
exports["default"] = _default;