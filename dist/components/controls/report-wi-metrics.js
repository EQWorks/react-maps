"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MetricSelector = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _goober = require("goober");

var _constants = require("../../constants");

var _datasets = require("../../datasets");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

(0, _goober.setup)(_react["default"].createElement);
var ControlContainer = (0, _goober.styled)('div')(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  flex-grow: 1;\n  padding: 5px;\n"])));

var MetricSelector = function MetricSelector(_ref) {
  var selected = _ref.selected,
      callback = _ref.callback,
      type = _ref.type,
      typeCallback = _ref.typeCallback;
  return /*#__PURE__*/_react["default"].createElement(ControlContainer, null, /*#__PURE__*/_react["default"].createElement("select", {
    value: type,
    onChange: typeCallback
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: ""
  }, "None"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "metric"
  }, "Report Metric"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "dow"
  }, "Day of Week"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "hod"
  }, "Hour of Day")), type === 'metric' && /*#__PURE__*/_react["default"].createElement("select", {
    value: selected,
    onChange: callback
  }, _datasets.reportWI.DATA_FIELDS.map(function (key) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: key,
      value: key
    }, key);
  })), type === 'dow' && /*#__PURE__*/_react["default"].createElement("select", {
    value: selected,
    onChange: callback
  }, _constants.days.map(function (key) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: key,
      value: key
    }, key);
  })), type === 'hod' && /*#__PURE__*/_react["default"].createElement("select", {
    value: selected,
    onChange: callback
  }, _constants.hours.map(function (key) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: key,
      value: key
    }, key);
  })));
};

exports.MetricSelector = MetricSelector;
MetricSelector.propTypes = {
  selected: _propTypes["default"].string.isRequired,
  callback: _propTypes["default"].func.isRequired,
  type: _propTypes["default"].string.isRequired,
  typeCallback: _propTypes["default"].func.isRequired
};
var _default = MetricSelector;
exports["default"] = _default;