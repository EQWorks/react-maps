"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _goober = require("goober");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

(0, _goober.setup)(_react["default"].createElement);
var Gradient = (0, _goober.styled)('div')(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  height: 15px;\n  margin: auto;\n  background-image: linear-gradient(", ");\n"])), function (_ref) {
  var mincolor = _ref.mincolor,
      maxcolor = _ref.maxcolor;
  return "to right, ".concat(mincolor, ", ").concat(maxcolor);
});
var Size = (0, _goober.styled)('div')(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: ", ";\n"])), function (_ref2) {
  var max = _ref2.max;
  return max ? 'space-between' : 'center';
});
var Circle = (0, _goober.styled)('div')(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  box-sizing: border-box;\n  width: ", ";\n  height: ", ";\n  border: 1px solid ", ";\n  border-radius: ", ";\n  background-color: ", ";\n"])), function (_ref3) {
  var size = _ref3.size;
  return "".concat(size, "px");
}, function (_ref4) {
  var size = _ref4.size;
  return "".concat(size, "px");
}, function (_ref5) {
  var linecolor = _ref5.linecolor;
  return linecolor;
}, function (_ref6) {
  var size = _ref6.size;
  return "".concat(size / 2, "px");
}, function (_ref7) {
  var color = _ref7.color;
  return color;
});
var HeightWrapper = (0, _goober.styled)('div')(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  border-left: ", ";\n  border-right: ", ";\n  height: 15px;\n  display: flex;\n  align-items: center;\n"])), function (_ref8) {
  var pos = _ref8.pos;
  return pos ? '1px solid black' : '';
}, function (_ref9) {
  var pos = _ref9.pos;
  return pos ? '' : '1px solid black';
});
var Height = (0, _goober.styled)('div')(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  width: ", "px;\n  height: 7px;\n  border-bottom: 1px solid black;\n  border-top: 1px solid black;\n  background-color: ", ";\n"])), function (_ref10) {
  var width = _ref10.width;
  return width;
}, function (_ref11) {
  var color = _ref11.color;
  return color;
});

var LegendSymbol = function LegendSymbol(_ref12) {
  var symbolProps = _ref12.symbolProps;
  var max = symbolProps.max,
      minColor = symbolProps.minColor,
      maxColor = symbolProps.maxColor,
      dots = symbolProps.dots,
      size = symbolProps.size,
      legendSize = symbolProps.legendSize,
      zeroRadiusSize = symbolProps.zeroRadiusSize,
      type = symbolProps.type,
      symbolLineColor = symbolProps.symbolLineColor;

  if (type === 'elevation') {
    return /*#__PURE__*/_react["default"].createElement(Size, {
      max: max
    }, /*#__PURE__*/_react["default"].createElement(HeightWrapper, {
      pos: 'left'
    }, /*#__PURE__*/_react["default"].createElement(Height, {
      width: legendSize === 'full' ? 21 : 16,
      color: !max ? minColor : maxColor
    })), max > 0 && /*#__PURE__*/_react["default"].createElement(HeightWrapper, null, /*#__PURE__*/_react["default"].createElement(Height, {
      width: legendSize === 'full' ? 84 : 50,
      color: maxColor
    })));
  }

  if (type === 'gradient') {
    var _ref13 = max > 0 ? [minColor, maxColor] : [minColor, minColor],
        _ref14 = _slicedToArray(_ref13, 2),
        minGradCol = _ref14[0],
        maxGradCol = _ref14[1];

    return /*#__PURE__*/_react["default"].createElement(Gradient, {
      mincolor: minGradCol,
      maxcolor: maxGradCol
    });
  }

  if (type === 'size') {
    return /*#__PURE__*/_react["default"].createElement(Size, {
      max: max
    }, max > 0 ? new Array(legendSize === 'full' ? dots : 4).fill(0).map(function (_, i) {
      return /*#__PURE__*/_react["default"].createElement(Circle, {
        key: i,
        size: (i + .75) * size + size,
        color: maxColor,
        max: max,
        linecolor: symbolLineColor
      });
    }) : /*#__PURE__*/_react["default"].createElement(Circle, {
      size: zeroRadiusSize,
      color: !max ? minColor : maxColor,
      max: max,
      linecolor: symbolLineColor
    }));
  } // TODO: choropleth using import { scaleThreshold } from 'd3-scale'
  // potentially different methods of calculating domain, e.g. linear vs quartile

  /*
    export const COLOR_SCALE = scaleThreshold()
      .domain([-0.6, -0.45, -0.3, -0.15, 0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.05, 1.2])
      .range([
        [65, 182, 196],
        [127, 205, 187],
        [199, 233, 180],
        [237, 248, 177],
        // zero
        [255, 255, 204],
        [255, 237, 160],
        [254, 217, 118],
        [254, 178, 76],
        [253, 141, 60],
        [252, 78, 42],
        [227, 26, 28],
        [189, 0, 38],
        [128, 0, 38]
      ]);
  */


  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null);
};

LegendSymbol.propTypes = {
  symbolProps: _propTypes["default"].shape({
    type: _propTypes["default"].string,
    legendSize: _propTypes["default"].string.isRequired,
    fillBasedOn: _propTypes["default"].string,
    max: _propTypes["default"].number,
    minColor: _propTypes["default"].string,
    maxColor: _propTypes["default"].string,
    dots: _propTypes["default"].number,
    size: _propTypes["default"].number,
    zeroRadiusSize: _propTypes["default"].number,
    symbolLineColor: _propTypes["default"].string
  })
};
LegendSymbol.defaultProps = {
  symbolProps: {
    type: 'gradient',
    fillBasedOn: '',
    max: undefined,
    minColor: 'rgb(0,0,0)',
    maxColor: 'rgb(255,0,0)',
    dots: 5,
    size: 5,
    zeroRadiusSize: 20,
    symbolLineColor: 'rgb(0,0,0)'
  }
};
var _default = LegendSymbol;
exports["default"] = _default;