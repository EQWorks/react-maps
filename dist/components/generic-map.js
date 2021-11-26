"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mapProps = require("../shared/map-props");

var _newDeckGlCore = require("new-deck-gl-core");

var _react2 = require("@deck.gl/react");

var _reactMapGl = require("react-map-gl");

var _goober = require("goober");

var _templateObject;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
}; // DeckGL react component

var Map = function Map(_ref) {
  var layers = _ref.layers,
      setDimensionsCb = _ref.setDimensionsCb,
      setHighlightObj = _ref.setHighlightObj,
      getTooltip = _ref.getTooltip,
      getCursor = _ref.getCursor,
      viewStateOverride = _ref.viewStateOverride,
      legend = _ref.legend,
      onHover = _ref.onHover,
      showTooltip = _ref.showTooltip,
      renderTooltip = _ref.renderTooltip,
      pitch = _ref.pitch,
      initViewState = _ref.initViewState,
      setZoom = _ref.setZoom,
      setCurrentViewport = _ref.setCurrentViewport,
      controller = _ref.controller,
      mapboxApiAccessToken = _ref.mapboxApiAccessToken;
  var deckRef = (0, _react.useRef)();

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      mapViewState = _useState2[0],
      setMapViewState = _useState2[1];

  var _useState3 = (0, _react.useState)({}),
      _useState4 = _slicedToArray(_useState3, 2),
      hoverInfo = _useState4[0],
      setHoverInfo = _useState4[1];

  (0, _react.useLayoutEffect)(function () {
    setMapViewState(function (o) {
      return _objectSpread(_objectSpread(_objectSpread({}, INIT_VIEW_STATE), o), viewStateOverride);
    });
  }, [viewStateOverride]);
  (0, _react.useEffect)(function () {
    setMapViewState(function (o) {
      return _objectSpread(_objectSpread(_objectSpread({}, INIT_VIEW_STATE), o), {}, {
        pitch: pitch
      });
    });
  }, [pitch]);
  /**
   * finalOnHover - React hook that handles the onHover event for deck.gl map
   * @param { object } param - object of deck.gl onHover event
   * @param { object } param.hoverInfo - info of hovered object on map
   */

  var finalOnHover = (0, _react.useCallback)(function (hoverInfo) {
    if (onHover) {
      onHover(hoverInfo);
    }

    if (showTooltip && hoverInfo !== null && hoverInfo !== void 0 && hoverInfo.object) {
      setHoverInfo(hoverInfo);
    } else {
      setHoverInfo(null);
    }
  }, [onHover, showTooltip]);
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
      setMapViewState(initViewState || INIT_VIEW_STATE);
    },
    onResize: function onResize(_ref2) {
      var height = _ref2.height,
          width = _ref2.width;
      setDimensionsCb({
        height: height,
        width: width
      });
    },
    onViewStateChange: function onViewStateChange(o) {
      var viewState = o.viewState,
          interactionState = o.interactionState;
      var isDragging = interactionState.isDragging,
          inTransition = interactionState.inTransition,
          isZooming = interactionState.isZooming,
          isPanning = interactionState.isPanning,
          isRotating = interactionState.isRotating;
      setMapViewState(viewState); // makes tooltip info disappear when we click and zoom in on a location

      setHoverInfo(null); // send zoom and viewState to parent comp

      if (!isDragging || !inTransition || !isZooming || !isPanning || !isRotating) {
        setZoom(viewState.zoom);

        if (viewState.zoom >= 10) {
          setCurrentViewport(viewState);
        }
      } // reset highlightObj when we are actively interacting with the map in other ways


      if (isDragging || isZooming || isPanning || isRotating) {
        setHighlightObj(null);
      }
    },
    initialViewState: mapViewState,
    views: MAP_VIEW,
    layers: layers,
    controller: controller,
    onHover: finalOnHover,
    getTooltip: getTooltip,
    getCursor: getCursor,
    onClick: function onClick(_ref3) {
      var object = _ref3.object;

      if (!object) {
        setHighlightObj(null);
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactMapGl.StaticMap, {
    mapboxApiAccessToken: mapboxApiAccessToken
  })), legend, showTooltip && (hoverInfo === null || hoverInfo === void 0 ? void 0 : hoverInfo.object) && typeof renderTooltip === 'function' && renderTooltip({
    hoverInfo: hoverInfo
  }));
};

Map.propTypes = _objectSpread(_objectSpread({
  layers: _propTypes["default"].array,
  setDimensionsCb: _propTypes["default"].func,
  setHighlightObj: _propTypes["default"].func,
  getTooltip: _propTypes["default"].func,
  getCursor: _propTypes["default"].func,
  viewStateOverride: _propTypes["default"].object,
  legend: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].bool]),
  showTooltip: _propTypes["default"].bool,
  renderTooltip: _propTypes["default"].func,
  initViewState: _propTypes["default"].object,
  pitch: _propTypes["default"].number,
  setZoom: _propTypes["default"].func,
  setCurrentViewport: _propTypes["default"].func,
  controller: _propTypes["default"].object
}, _reactMapGl.StaticMap.propTypes), _mapProps.commonProps);
Map.defaultProps = _objectSpread(_objectSpread({
  layers: [],
  setDimensionsCb: function setDimensionsCb() {},
  setHighlightObj: function setHighlightObj() {},
  getTooltip: function getTooltip() {},
  getCursor: function getCursor() {},
  viewStateOverride: {},
  legend: undefined,
  showTooltip: false,
  renderTooltip: undefined,
  pitch: 0,
  initViewState: undefined,
  setZoom: function setZoom() {},
  setCurrentViewport: function setCurrentViewport() {},
  controller: {
    controller: true
  }
}, _reactMapGl.StaticMap.defaultProps), _mapProps.commonDefaultProps);
var _default = Map;
exports["default"] = _default;