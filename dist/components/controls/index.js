"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TimelineControls = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _goober = require("goober");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

(0, _goober.setup)(_react["default"].createElement);
var ControlContainer = (0, _goober.styled)('div')(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  flex-grow: 1;\n  padding: 5px;\n"])));
var ControlButton = (0, _goober.styled)('button')(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  cursor: ", ";\n  border-radius: 7px;\n  border: 1px solid ", ";\n  color: ", ";\n  background-color: white;\n  margin-left: 5px;\n  padding: 3px;\n  font-family: roboto;\n  font-weight: 900;\n  font-size: 10px;\n"])), function (_ref) {
  var disabled = _ref.disabled;
  return disabled ? 'default' : 'pointer';
}, function (_ref2) {
  var disabled = _ref2.disabled;
  return disabled ? 'rgba(0,0,0,0.2)' : 'black';
}, function (_ref3) {
  var disabled = _ref3.disabled;
  return disabled ? 'rgba(0,0,0,0.2)' : 'black';
});
var Subtext = (0, _goober.styled)('div')(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  font-size: 7px;\n  color: rgba(0,0,0,0.7);\n"])));
var ProgressBarContainer = (0, _goober.styled)('div')(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  width: 100px;\n  height: 15px;\n  border: 1px solid black;\n  margin: 0;\n  padding: 0;\n"])));
var ProgressBar = (0, _goober.styled)('div')(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  height: 100%;\n  width: ", "%;\n  background-color: blue;\n"])), function (_ref4) {
  var progress = _ref4.progress;
  return progress;
});

var TimelineControls = function TimelineControls(_ref5) {
  var forward = _ref5.forward,
      rewind = _ref5.rewind,
      startTimeline = _ref5.startTimeline,
      stopTimeline = _ref5.stopTimeline,
      changeSpeed = _ref5.changeSpeed,
      move = _ref5.move,
      player = _ref5.player,
      direction = _ref5.direction,
      activeIndex = _ref5.activeIndex,
      speed = _ref5.speed,
      timestamps = _ref5.timestamps;
  return /*#__PURE__*/_react["default"].createElement(ControlContainer, null, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(Subtext, null, "Period ", activeIndex + 1, " of ", timestamps.length), /*#__PURE__*/_react["default"].createElement(ProgressBarContainer, null, /*#__PURE__*/_react["default"].createElement(ProgressBar, {
    progress: 100 * (activeIndex + 1) / timestamps.length
  })), /*#__PURE__*/_react["default"].createElement(ControlButton, {
    onClick: startTimeline,
    disabled: player || direction > 0 && activeIndex >= timestamps.length - 1 || direction < 0 && activeIndex <= 0
  }, "Start"), /*#__PURE__*/_react["default"].createElement(ControlButton, {
    onClick: stopTimeline,
    disabled: !player
  }, "Stop")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(ControlButton, {
    onClick: move(-1),
    disabled: !activeIndex
  }, '<<', " Step"), /*#__PURE__*/_react["default"].createElement(ControlButton, {
    onClick: move(1),
    disabled: activeIndex === timestamps.length - 1
  }, "Step ", '>>')), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(ControlButton, {
    onClick: forward,
    disabled: direction > 0
  }, "Forward"), /*#__PURE__*/_react["default"].createElement(ControlButton, {
    onClick: rewind,
    disabled: direction < 0
  }, "Rewind")), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(ControlButton, {
    onClick: changeSpeed(-100),
    disabled: speed <= 0
  }, "Speed Up"), /*#__PURE__*/_react["default"].createElement(ControlButton, {
    onClick: changeSpeed(100),
    disabled: speed >= 1000
  }, "Speed Down"), /*#__PURE__*/_react["default"].createElement(Subtext, null, "Current Speed: ", speed, "ms per tick")));
};

exports.TimelineControls = TimelineControls;
TimelineControls.propTypes = {
  forward: _propTypes["default"].func.isRequired,
  rewind: _propTypes["default"].func.isRequired,
  startTimeline: _propTypes["default"].func.isRequired,
  stopTimeline: _propTypes["default"].func.isRequired,
  changeSpeed: _propTypes["default"].func.isRequired,
  reset: _propTypes["default"].func.isRequired,
  move: _propTypes["default"].func.isRequired,
  player: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].bool]).isRequired,
  direction: _propTypes["default"].number.isRequired,
  activeIndex: _propTypes["default"].number.isRequired,
  speed: _propTypes["default"].number.isRequired,
  timestamps: _propTypes["default"].array.isRequired
};
var _default = TimelineControls;
exports["default"] = _default;