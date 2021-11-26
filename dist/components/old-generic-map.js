"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _newDeckGlCore = require("new-deck-gl-core");

var _react2 = require("@deck.gl/react");

var _reactMapGl = require("react-map-gl");

var _goober = require("goober");

var _fullTooltip = _interopRequireDefault(require("./full-tooltip"));

var _legend = _interopRequireDefault(require("./legend"));

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

(0, _goober.setup)(_react["default"].createElement);
var MapContainer = (0, _goober.styled)('div')(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  height: 100%;\n  width: 100%;\n  position: absolute;\n"])));
var MAP_VIEW = new _newDeckGlCore.MapView({
  repeat: true
});
var INIT_VIEW_STATE = {
  pitch: 0,
  bearing: 0,
  transitionDuration: 1000,
  transitionInterpolator: new _newDeckGlCore.FlyToInterpolator(),
  latitude: 52,
  longitude: -100,
  zoom: 2.5
};

var getPositionFromLngLat = function getPositionFromLngLat(_ref) {
  var lngLat = _ref.lngLat,
      viewState = _objectWithoutProperties(_ref, ["lngLat"]);

  return new _newDeckGlCore.WebMercatorViewport(_objectSpread({}, viewState)).project(lngLat);
}; // DeckGL react component


var Map = function Map(_ref2) {
  var layers = _ref2.layers,
      setDimensionsCb = _ref2.setDimensionsCb,
      getTooltip = _ref2.getTooltip,
      getCursor = _ref2.getCursor,
      viewStateOverride = _ref2.viewStateOverride,
      showLegend = _ref2.showLegend,
      position = _ref2.position,
      legends = _ref2.legends,
      showTooltip = _ref2.showTooltip,
      tooltipNode = _ref2.tooltipNode,
      mapboxApiAccessToken = _ref2.mapboxApiAccessToken,
      tooltipProps = _objectWithoutProperties(_ref2, ["layers", "setDimensionsCb", "getTooltip", "getCursor", "viewStateOverride", "showLegend", "position", "legends", "showTooltip", "tooltipNode", "mapboxApiAccessToken"]);

  var deckRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(INIT_VIEW_STATE),
      _useState2 = _slicedToArray(_useState, 2),
      viewState = _useState2[0],
      setViewState = _useState2[1];

  (0, _react.useLayoutEffect)(function () {
    setViewState(function (o) {
      return _objectSpread(_objectSpread(_objectSpread({}, INIT_VIEW_STATE), o), viewStateOverride);
    });
  }, [viewStateOverride]); // TODO: unify management of viewState and expose as callback

  var _useState3 = (0, _react.useState)({
    height: 0,
    width: 0
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      _useState4$ = _useState4[0],
      height = _useState4$.height,
      width = _useState4$.width,
      setDimensions = _useState4[1];

  var _useState5 = (0, _react.useState)({
    x: 0,
    y: 0
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      _useState6$ = _useState6[0],
      x = _useState6$.x,
      y = _useState6$.y,
      setTooltip = _useState6[1]; // NOTE: keep tooltip x/y consistent with viewport movement


  (0, _react.useEffect)(function () {
    if (tooltipProps.lngLat && deckRef && deckRef.current) {
      var _getPositionFromLngLa = getPositionFromLngLat(_objectSpread(_objectSpread(_objectSpread({}, deckRef.current.deck.viewState), viewState), {}, {
        height: height,
        width: width,
        lngLat: tooltipProps.lngLat
      })),
          _getPositionFromLngLa2 = _slicedToArray(_getPositionFromLngLa, 2),
          _x = _getPositionFromLngLa2[0],
          _y = _getPositionFromLngLa2[1];

      setTooltip({
        x: _x,
        y: _y
      });
    }
  }, [tooltipProps.lngLat, viewState, height, width, deckRef]);
  return /*#__PURE__*/_react["default"].createElement(MapContainer, null, /*#__PURE__*/_react["default"].createElement(_react2.DeckGL, {
    ref: deckRef,
    onLoad: function onLoad() {
      var _deckRef$current$deck = deckRef.current.deck,
          height = _deckRef$current$deck.height,
          width = _deckRef$current$deck.width;
      setDimensionsCb({
        height: height,
        width: width
      });
      setDimensions({
        height: height,
        width: width
      });
    },
    onResize: function onResize(_ref3) {
      var height = _ref3.height,
          width = _ref3.width;
      // viewState doesn't update dimensions correctly
      setDimensions({
        height: height,
        width: width
      });
      setDimensionsCb({
        height: height,
        width: width
      });
    },
    onViewStateChange: function onViewStateChange(o) {
      var viewState = o.viewState;
      setViewState(viewState);
    },
    initialViewState: viewState,
    views: MAP_VIEW,
    layers: layers,
    controller: true,
    getTooltip: getTooltip,
    getCursor: getCursor // NOTE: same structure as layer click
    // onHover={d => console.log('----> map hover', d)}
    // onClick={d => console.log('----> map click', d)}

  }, /*#__PURE__*/_react["default"].createElement(_reactMapGl.StaticMap, {
    mapboxApiAccessToken: mapboxApiAccessToken
  })), showLegend && legends.length > 0 && /*#__PURE__*/_react["default"].createElement(_legend["default"], {
    legends: legends,
    legendPosition: position
  }), showTooltip && /*#__PURE__*/_react["default"].createElement(_fullTooltip["default"], _extends({}, tooltipProps, {
    x: x,
    y: y,
    h: height,
    w: width
  }), tooltipNode));
};

Map.propTypes = _objectSpread({
  layers: _propTypes["default"].array,
  setDimensionsCb: _propTypes["default"].func,
  getTooltip: _propTypes["default"].func,
  getCursor: _propTypes["default"].func,
  viewStateOverride: _propTypes["default"].object,
  showLegend: _propTypes["default"].bool,
  position: _propTypes["default"].string,
  legends: _propTypes["default"].array,
  showTooltip: _propTypes["default"].bool,
  tooltipNode: _propTypes["default"].node
}, _reactMapGl.StaticMap.propTypes.current);
Map.defaultProps = _objectSpread({
  layers: [],
  setDimensionsCb: function setDimensionsCb() {},
  getTooltip: function getTooltip() {},
  getCursor: function getCursor() {},
  viewStateOverride: {},
  showLegend: false,
  position: 'top-left',
  legends: [],
  showTooltip: false
}, _reactMapGl.StaticMap.defaultProps);
var _default = Map;
exports["default"] = _default;