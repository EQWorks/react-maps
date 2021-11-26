"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PeriodSelector = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _goober = require("goober");

var _constants = require("../../constants");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

(0, _goober.setup)(_react["default"].createElement);
var ControlContainer = (0, _goober.styled)('div')(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  flex-grow: 1;\n  padding: 5px;\n"])));

var formatDate = function formatDate(d) {
  return "".concat(d.getUTCDate(), "/").concat(d.getUTCMonth() + 1, "/").concat(d.getUTCFullYear());
};

var PeriodSelector = function PeriodSelector(_ref) {
  var selectPeriod = _ref.selectPeriod,
      selectPeriodType = _ref.selectPeriodType,
      selected = _ref.selected,
      periods = _ref.periods;
  return /*#__PURE__*/_react["default"].createElement(ControlContainer, null, periods.length ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("label", null, "Report Period"), /*#__PURE__*/_react["default"].createElement("select", {
    value: selected.date_type,
    onChange: function onChange(e) {
      return selectPeriodType(e.target.value);
    }
  }, Object.entries(_constants.DATE_TYPES).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        key = _ref3[0],
        text = _ref3[1];

    return /*#__PURE__*/_react["default"].createElement("option", {
      key: key,
      value: key
    }, text);
  })), /*#__PURE__*/_react["default"].createElement("select", {
    value: selected.key,
    onChange: function onChange(e) {
      return selectPeriod(periods.find(function (o) {
        return o.key === e.target.value;
      }));
    }
  }, periods.map(function (_ref4) {
    var key = _ref4.key,
        start_date = _ref4.start_date,
        end_date = _ref4.end_date;
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: key,
      value: key
    }, formatDate(new Date(start_date)), " - ", formatDate(new Date(end_date)));
  }))) : /*#__PURE__*/_react["default"].createElement("p", null, "No Report Data"));
};

exports.PeriodSelector = PeriodSelector;
PeriodSelector.propTypes = {
  selectPeriod: _propTypes["default"].func.isRequired,
  selectPeriodType: _propTypes["default"].func.isRequired,
  periods: _propTypes["default"].array,
  selected: _propTypes["default"].object
};
PeriodSelector.defaultProps = {
  periods: [],
  selected: {}
};
var _default = PeriodSelector;
exports["default"] = _default;