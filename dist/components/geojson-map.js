"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mapProps = require("../shared/map-props");

var _layers = require("@deck.gl/layers");

var _d3ScaleChromatic = require("d3-scale-chromatic");

var _hooks = require("../hooks");

var _utils = require("../shared/utils");

var _oldGenericMap = _interopRequireDefault(require("./old-generic-map"));

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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var GeoJsonMap = function GeoJsonMap(_ref) {
  var fillBasedOnInit = _ref.fillBasedOnInit,
      fillDataScale = _ref.fillDataScale,
      fillColors = _ref.fillColors,
      elevationBasedOnInit = _ref.elevationBasedOnInit,
      elevationDataScale = _ref.elevationDataScale,
      elevations = _ref.elevations,
      onClick = _ref.onClick,
      onHover = _ref.onHover,
      opacity = _ref.opacity,
      getElevation = _ref.getElevation,
      getFillColor = _ref.getFillColor,
      getLineWidth = _ref.getLineWidth,
      getLineColor = _ref.getLineColor,
      showLegend = _ref.showLegend,
      legendPosition = _ref.legendPosition,
      dataPropertyAccessor = _ref.dataPropertyAccessor,
      mapboxApiAccessToken = _ref.mapboxApiAccessToken,
      geoJsonLayerProps = _objectWithoutProperties(_ref, ["fillBasedOnInit", "fillDataScale", "fillColors", "elevationBasedOnInit", "elevationDataScale", "elevations", "onClick", "onHover", "opacity", "getElevation", "getFillColor", "getLineWidth", "getLineColor", "showLegend", "legendPosition", "dataPropertyAccessor", "mapboxApiAccessToken"]);

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      geoJson = _useState2[0],
      setGeoJson = _useState2[1];

  var handleSetData = function handleSetData() {
    try {
      var payload = JSON.parse(geoJson); // basic validation

      if (payload.type === 'FeatureCollection' && payload.features[0]) {
        metricDispatch({
          type: 'data',
          payload: payload
        });
      }
    } catch (e) {
      console.warn('Not Valid JSON');
    }
  };

  var _useMapData = (0, _hooks.useMapData)({
    dataAccessor: function dataAccessor(d) {
      return d.features;
    },
    dataPropertyAccessor: function dataPropertyAccessor(d) {
      return d.properties;
    }
  }),
      data = _useMapData.data,
      metrics = _useMapData.metrics,
      metricDispatch = _useMapData.metricDispatch;

  var _useElevation = (0, _hooks.useElevation)({
    elevationBasedOnInit: elevationBasedOnInit,
    getElevation: getElevation,
    elevationDataScale: elevationDataScale,
    elevations: elevations,
    metrics: metrics,
    dataPropertyAccessor: function dataPropertyAccessor(d) {
      return d.properties;
    }
  }),
      elevationBasedOn = _useElevation.elevationBasedOn,
      finalGetElevation = _useElevation.finalGetElevation,
      setElevationBasedOn = _useElevation.setElevationBasedOn;

  var _useFill = (0, _hooks.useFill)({
    fillBasedOnInit: fillBasedOnInit,
    getFillColor: getFillColor,
    fillDataScale: fillDataScale,
    fillColors: fillColors,
    metrics: metrics,
    dataPropertyAccessor: function dataPropertyAccessor(d) {
      return d.properties;
    }
  }),
      fillBasedOn = _useFill.fillBasedOn,
      finalGetFillColor = _useFill.finalGetFillColor,
      setFillBasedOn = _useFill.setFillBasedOn;

  var layers = (0, _react.useMemo)(function () {
    return [new _layers.GeoJsonLayer(_objectSpread({
      id: 'xyz-scatterplot-layer',
      data: data,
      pickable: onClick || onHover,
      onClick: onClick,
      onHover: onHover,
      opacity: opacity,
      extruded: elevationBasedOn.length,
      getFillColor: finalGetFillColor,
      getElevation: finalGetElevation,
      getLineWidth: getLineWidth,
      getLineColor: getLineColor,
      updateTriggers: {
        getFillColor: [finalGetFillColor, fillDataScale, fillColors],
        getElevation: [finalGetElevation, elevationDataScale, elevations]
      }
    }, geoJsonLayerProps))];
  }, [geoJsonLayerProps, data, onClick, onHover, elevationBasedOn, elevationDataScale, elevations, finalGetElevation, finalGetFillColor, fillColors, fillDataScale, getLineColor, getLineWidth, opacity]);
  var legends = (0, _hooks.useLegends)({
    elevationBasedOn: elevationBasedOn,
    fillBasedOn: fillBasedOn,
    data: data,

    /**
    * We convert an array of string format colors, into an array of rgba string format colours so we
    * can use them in the Legend Gradient component
    *
    * There is visually a difference between the legend opacity for color gradient and map opacity,
    * we need to adjust opacity for symbols in the legend to have a closer match
    */
    fillColors: (0, _utils.getArrayGradientFillColors)({
      fillColors: fillColors,
      opacity: (0, _utils.setLegendOpacity)({
        opacity: opacity
      })
    }),
    dataPropertyAccessor: dataPropertyAccessor
  });
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: handleSetData
  }, "Load GeoJSON"), /*#__PURE__*/_react["default"].createElement("textarea", {
    onChange: function onChange(e) {
      return setGeoJson(e.target.value);
    }
  }), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Fill Based On"), /*#__PURE__*/_react["default"].createElement("select", {
    value: fillBasedOn,
    onChange: function onChange(e) {
      return setFillBasedOn(e.target.value);
    }
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: ""
  }, "None"), Object.keys(metrics).map(function (key) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: key
    }, key);
  }))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("strong", null, "Elevation Based On"), /*#__PURE__*/_react["default"].createElement("select", {
    value: elevationBasedOn,
    onChange: function onChange(e) {
      return setElevationBasedOn(e.target.value);
    }
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: ""
  }, "None"), Object.keys(metrics).map(function (key) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: key
    }, key);
  })))), /*#__PURE__*/_react["default"].createElement(_oldGenericMap["default"], {
    layers: layers,
    showLegend: showLegend,
    position: legendPosition,
    legends: legends,
    mapboxApiAccessToken: mapboxApiAccessToken
  }));
};

GeoJsonMap.propTypes = _objectSpread({
  fillBasedOnInit: _propTypes["default"].string,
  fillDataScale: _propTypes["default"].string,
  fillColors: _propTypes["default"].array,
  elevationBasedOnInit: _propTypes["default"].string,
  elevationDataScale: _propTypes["default"].string,
  elevations: _propTypes["default"].array,
  onClick: _propTypes["default"].func,
  onHover: _propTypes["default"].func,
  opacity: _propTypes["default"].number,
  filled: _propTypes["default"].bool,
  getFillColor: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].array]),
  getElevation: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].func]),
  // elevationScale
  stroked: _propTypes["default"].bool,
  lineWidthUnits: _propTypes["default"].string,
  getLineWidth: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].func]),
  getLineColor: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].array]),
  showLegend: _propTypes["default"].bool,
  legendPosition: _propTypes["default"].string,
  dataPropertyAccessor: _propTypes["default"].func
}, _mapProps.commonProps);
GeoJsonMap.defaultProps = _objectSpread({
  fillBasedOnInit: '',
  fillDataScale: 'linear',
  fillColors: [(0, _d3ScaleChromatic.interpolateBlues)(0), (0, _d3ScaleChromatic.interpolateBlues)(1)],
  elevationBasedOnInit: '',
  elevationDataScale: 'linear',
  elevations: [0, 1000000],
  onClick: undefined,
  onHover: undefined,
  opacity: 0.8,
  filled: true,
  getFillColor: [255, 140, 0],
  getElevation: 0,
  stroked: true,
  lineWidthUnits: 'pixels',
  getLineWidth: 2,
  getLineColor: [0, 0, 0],
  showLegend: false,
  legendPosition: 'top-left',
  dataPropertyAccessor: function dataPropertyAccessor(d) {
    return d.properties;
  }
}, _mapProps.commonDefaultProps);
var _default = GeoJsonMap;
exports["default"] = _default;