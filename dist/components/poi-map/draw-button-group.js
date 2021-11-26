"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("@material-ui/core/styles");

var _ButtonGroup = _interopRequireDefault(require("@material-ui/core/ButtonGroup"));

var _AddBoxOutlined = _interopRequireDefault(require("@material-ui/icons/AddBoxOutlined"));

var _AddLocationOutlined = _interopRequireDefault(require("@material-ui/icons/AddLocationOutlined"));

var _DeleteOutline = _interopRequireDefault(require("@material-ui/icons/DeleteOutline"));

var _lumenUi = require("@eqworks/lumen-ui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var basicIconButtonStyle = {
  paddingLeft: '20px',
  maxWidth: '35px',
  minWidth: '35px',
  maxHeight: '30px',
  minHeight: '30px'
};
var StyledButtonDraw = (0, _styles.withStyles)(function (theme) {
  return {
    root: _objectSpread(_objectSpread({}, basicIconButtonStyle), {}, {
      borderColor: "".concat(theme.palette.primary.main)
    })
  };
})(_lumenUi.Button);
var StyledButtonDelete = (0, _styles.withStyles)(function (theme) {
  return {
    root: _objectSpread(_objectSpread({}, basicIconButtonStyle), {}, {
      color: "".concat(theme.palette.error.main),
      borderColor: "".concat(theme.palette.error.main)
    })
  };
})(_lumenUi.Button);

var DrawButtonGroup = function DrawButtonGroup(_ref) {
  var mode = _ref.mode,
      setDrawModeOn = _ref.setDrawModeOn,
      onErase = _ref.onErase;
  return /*#__PURE__*/_react["default"].createElement(_ButtonGroup["default"], {
    orientation: "vertical"
  }, /*#__PURE__*/_react["default"].createElement(StyledButtonDraw, {
    startIcon: mode === 'create-point' ? /*#__PURE__*/_react["default"].createElement(_AddLocationOutlined["default"], null) : /*#__PURE__*/_react["default"].createElement(_AddBoxOutlined["default"], null),
    size: "small",
    type: "secondary",
    color: "primary",
    onClick: setDrawModeOn
  }), /*#__PURE__*/_react["default"].createElement(StyledButtonDelete, {
    startIcon: /*#__PURE__*/_react["default"].createElement(_DeleteOutline["default"], null),
    size: "small",
    type: "secondary",
    color: "red",
    onClick: onErase
  }));
};

DrawButtonGroup.propTypes = {
  mode: _propTypes["default"].string.isRequired,
  setDrawModeOn: _propTypes["default"].func.isRequired,
  onErase: _propTypes["default"].func.isRequired
};
var _default = DrawButtonGroup;
exports["default"] = _default;