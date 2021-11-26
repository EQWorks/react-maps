"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _layers = require("@deck.gl/layers");

var _newDeckGlCore = require("new-deck-gl-core");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mapProps = require("../shared/map-props");

var _genericMap = _interopRequireDefault(require("./generic-map"));

var _legend = _interopRequireDefault(require("./legend"));

var _tooltip = _interopRequireDefault(require("./tooltip"));

var _tooltipNode = _interopRequireDefault(require("./tooltip/tooltip-node"));

var _utils = require("../shared/utils");

var _hooks = require("../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

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

var layerPool = ['FSALayer', 'GeoCohortLayer'];

var GeoCohortMap = function GeoCohortMap(_ref) {
  var reportFSAData = _ref.reportFSAData,
      reportGeoCohortData = _ref.reportGeoCohortData,
      filled = _ref.filled,
      stroked = _ref.stroked,
      fillBasedOn = _ref.fillBasedOn,
      fillDataScale = _ref.fillDataScale,
      fillColors = _ref.fillColors,
      elevationBasedOn = _ref.elevationBasedOn,
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
      legendNode = _ref.legendNode,
      getCursor = _ref.getCursor,
      getTooltip = _ref.getTooltip,
      showTooltip = _ref.showTooltip,
      tooltipProps = _ref.tooltipProps,
      tooltipNode = _ref.tooltipNode,
      tooltipKeys = _ref.tooltipKeys,
      typography = _ref.typography,
      pitch = _ref.pitch,
      dataPropertyAccessor = _ref.dataPropertyAccessor,
      formatLegendTitle = _ref.formatLegendTitle,
      formatTooltipTitle = _ref.formatTooltipTitle,
      formatPropertyLabel = _ref.formatPropertyLabel,
      formatData = _ref.formatData,
      setViewportBBox = _ref.setViewportBBox,
      setApiBBox = _ref.setApiBBox,
      mapboxApiAccessToken = _ref.mapboxApiAccessToken,
      geoJsonLayerProps = _objectWithoutProperties(_ref, ["reportFSAData", "reportGeoCohortData", "filled", "stroked", "fillBasedOn", "fillDataScale", "fillColors", "elevationBasedOn", "elevationDataScale", "elevations", "onClick", "onHover", "opacity", "getElevation", "getFillColor", "getLineWidth", "getLineColor", "showLegend", "legendPosition", "legendNode", "getCursor", "getTooltip", "showTooltip", "tooltipProps", "tooltipNode", "tooltipKeys", "typography", "pitch", "dataPropertyAccessor", "formatLegendTitle", "formatTooltipTitle", "formatPropertyLabel", "formatData", "setViewportBBox", "setApiBBox", "mapboxApiAccessToken"]);

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      viewStateOverride = _useState2[0],
      setViewOverride = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      highlightObj = _useState4[0],
      setHighlightObj = _useState4[1];

  var _useState5 = (0, _react.useState)({}),
      _useState6 = _slicedToArray(_useState5, 2),
      _useState6$ = _useState6[0],
      height = _useState6$.height,
      width = _useState6$.width,
      setDimensions = _useState6[1];

  var _useState7 = (0, _react.useState)(1),
      _useState8 = _slicedToArray(_useState7, 2),
      zoom = _useState8[0],
      setZoom = _useState8[1];

  var _useState9 = (0, _react.useState)(),
      _useState10 = _slicedToArray(_useState9, 2),
      currentViewport = _useState10[0],
      setCurrentViewport = _useState10[1]; // calculate bbox coords for current viewport and extended area around


  (0, _react.useEffect)(function () {
    if (currentViewport !== null && currentViewport !== void 0 && currentViewport.zoom) {
      setViewportBBox(new _newDeckGlCore.WebMercatorViewport(currentViewport).getBounds());
      setApiBBox(new _newDeckGlCore.WebMercatorViewport(_objectSpread(_objectSpread({}, currentViewport), {}, {
        zoom: 9
      })).getBounds());
    }
  }, [currentViewport, setViewportBBox, setApiBBox]);

  var _useMemo = (0, _react.useMemo)(function () {
    if (width && height && reportFSAData !== null && reportFSAData !== void 0 && reportFSAData.length) {
      var _setView = (0, _utils.setView)({
        data: reportFSAData,
        width: width,
        height: height
      }),
          FSALayerZoom = _setView.zoom; // reportFSAData is retrieved faster than reportGeoCohortData, so display it until the second loads


      return zoom < Math.max(FSALayerZoom + 1, 10) || !(reportGeoCohortData !== null && reportGeoCohortData !== void 0 && reportGeoCohortData.length) ? [reportFSAData, 'FSALayer'] : [reportGeoCohortData, 'GeoCohortLayer'];
    }

    return [];
  }, [zoom, width, height, reportFSAData, reportGeoCohortData]),
      _useMemo2 = _slicedToArray(_useMemo, 2),
      activeData = _useMemo2[0],
      activeLayer = _useMemo2[1]; // set initial viewport to display all FSA polygons on the map


  var initViewState = (0, _react.useMemo)(function () {
    if (reportFSAData !== null && reportFSAData !== void 0 && reportFSAData.length && width && height) {
      return _objectSpread(_objectSpread({}, (0, _utils.setView)({
        data: reportFSAData,
        width: width,
        height: height
      })), {}, {
        pitch: pitch
      });
    }

    return null;
  }, [reportFSAData, pitch, height, width]);
  /**
   * finalOnClick - React hook that handles layer's onClick events
   * @param { object } param
   * @param { object } param.object - clicked object on the map
   */

  var finalOnClick = (0, _react.useCallback)(function (_ref2) {
    var object = _ref2.object;

    if (typeof onClick === 'function') {
      onClick(object);
    } else if (object !== null && object !== void 0 && object.type) {
      // recenter and zoom on the clicked element
      var dataView = (0, _utils.setView)({
        data: [object],
        width: width,
        height: height
      });
      setViewOverride(function (o) {
        return _objectSpread(_objectSpread({}, o), dataView);
      });
      setHighlightObj(object);
    }
  }, [onClick, width, height]);
  /**
   * finalTooltipKeys - React hook that returns an object of keys for map's Tooltip component
   * @returns { object } - object of tooltip keys
   * { name, id, metricKeys, metricAliases, nameAccessor, idAccessor, metricAccessor}
   */

  var finalTooltipKeys = (0, _react.useMemo)(function () {
    var name = tooltipKeys.name,
        nameAccessor = tooltipKeys.nameAccessor,
        metricKeys = tooltipKeys.metricKeys;

    var metricKeysArray = _toConsumableArray(metricKeys || []); // set metricKeys array if no custom keys are given


    if (showTooltip && !(metricKeys !== null && metricKeys !== void 0 && metricKeys.length)) {
      [elevationBasedOn, fillBasedOn].forEach(function (key) {
        if (key) {
          metricKeysArray.push(key);
        }
      });
    }

    return _objectSpread(_objectSpread({}, tooltipKeys), {}, {
      name: name || 'GeoCohortItem',
      nameAccessor: nameAccessor || dataPropertyAccessor,
      metricKeys: metricKeysArray,
      metricAccessor: dataPropertyAccessor
    });
  }, [showTooltip, tooltipKeys, elevationBasedOn, fillBasedOn, dataPropertyAccessor]); // set layer configuration for the map

  var layers = (0, _react.useMemo)(function () {
    var highlightId = highlightObj === null || highlightObj === void 0 ? void 0 : highlightObj.GeoCohortItem;
    return layerPool.map(function (layer) {
      return new _layers.GeoJsonLayer(_objectSpread({
        id: layer,
        visible: activeLayer === layer,
        data: layer === 'FSALayer' ? reportFSAData : reportGeoCohortData || [],
        pickable: Boolean(onClick || onHover || getTooltip || getCursor),
        stroked: stroked,
        onClick: finalOnClick,
        opacity: opacity,
        extruded: elevationBasedOn.length,
        filled: filled,
        getFillColor: (0, _utils.setFinalLayerDataProperty)({
          data: activeData,
          value: fillBasedOn ? {
            field: fillBasedOn
          } : getFillColor,
          defaultValue: getFillColor,
          dataScale: fillDataScale,
          valueOptions: (0, _utils.getArrayFillColors)({
            fillColors: fillColors
          }),
          // we need to convert string format color (used in legend) to array format color for deck.gl
          dataPropertyAccessor: dataPropertyAccessor,
          highlightId: highlightId
        }),
        getElevation: (0, _utils.setFinalLayerDataProperty)({
          data: activeData,
          value: elevationBasedOn ? {
            field: elevationBasedOn
          } : getElevation,
          defaultValue: getElevation,
          valueOptions: elevations,
          dataScale: elevationDataScale,
          dataPropertyAccessor: dataPropertyAccessor
        }),
        getLineWidth: getLineWidth,
        getLineColor: getLineColor,
        updateTriggers: {
          getFillColor: [activeData, fillBasedOn, dataPropertyAccessor, getFillColor, fillDataScale, fillColors, highlightId],
          getElevation: [activeData, elevationBasedOn, dataPropertyAccessor, getElevation, elevationDataScale, elevations],
          getLineWidth: [getLineWidth],
          getLineColor: [getLineColor]
        }
      }, geoJsonLayerProps));
    });
  }, [geoJsonLayerProps, activeData, activeLayer, reportFSAData, reportGeoCohortData, highlightObj === null || highlightObj === void 0 ? void 0 : highlightObj.GeoCohortItem, onClick, finalOnClick, onHover, elevationBasedOn, elevationDataScale, elevations, filled, stroked, fillBasedOn, fillDataScale, fillColors, getElevation, getFillColor, getLineColor, getLineWidth, opacity, getCursor, getTooltip, dataPropertyAccessor]); // prepare list of legends with used parameteres

  var legends = (0, _hooks.useLegends)({
    elevationBasedOn: elevationBasedOn,
    fillBasedOn: fillBasedOn,

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
    // convert array format color (used in deck.gl elevation fill) into str format color for legend
    data: activeLayer === 'FSALayer' ? reportFSAData : reportGeoCohortData || [],
    metricAliases: tooltipKeys.metricAliases,
    formatLegendTitle: formatLegendTitle,
    formatPropertyLabel: formatPropertyLabel,
    formatData: formatData,
    dataPropertyAccessor: dataPropertyAccessor
  }); // set legend element

  var legend = (0, _react.useMemo)(function () {
    return showLegend && (legendNode || (legends === null || legends === void 0 ? void 0 : legends.length) > 0 && /*#__PURE__*/_react["default"].createElement(_legend["default"], {
      legends: legends,
      legendPosition: legendPosition,
      typograpy: typography
    }));
  }, [showLegend, legends, legendPosition, typography, legendNode]);
  return /*#__PURE__*/_react["default"].createElement(_genericMap["default"], {
    layers: layers,
    setDimensionsCb: function setDimensionsCb(o) {
      return setDimensions(o);
    },
    setHighlightObj: setHighlightObj,
    getTooltip: getTooltip,
    getCursor: getCursor,
    onHover: onHover,
    viewStateOverride: viewStateOverride,
    showTooltip: showTooltip,
    renderTooltip: function renderTooltip(_ref3) {
      var hoverInfo = _ref3.hoverInfo;
      return /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
        info: hoverInfo,
        tooltipProps: tooltipProps,
        typography: typography
      }, tooltipNode({
        tooltipKeys: finalTooltipKeys,
        formatData: formatData,
        formatTooltipTitle: formatTooltipTitle,
        formatPropertyLabel: formatPropertyLabel,
        params: hoverInfo.object
      }));
    },
    legend: legend,
    pitch: pitch,
    initViewState: initViewState,
    setZoom: setZoom,
    setCurrentViewport: setCurrentViewport,
    mapboxApiAccessToken: mapboxApiAccessToken
  });
};

GeoCohortMap.propTypes = _objectSpread(_objectSpread(_objectSpread({
  reportFSAData: _propTypes["default"].array.isRequired,
  reportGeoCohortData: _propTypes["default"].array.isRequired,
  fillBasedOn: _propTypes["default"].string,
  fillDataScale: _propTypes["default"].string,
  fillColors: _propTypes["default"].array,
  elevationBasedOn: _propTypes["default"].string,
  elevationDataScale: _propTypes["default"].string,
  elevations: _propTypes["default"].array,
  onClick: _propTypes["default"].func,
  onHover: _propTypes["default"].func,
  opacity: _propTypes["default"].number,
  filled: _propTypes["default"].bool,
  getFillColor: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].array]),
  getElevation: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].func]),
  stroked: _propTypes["default"].bool,
  lineWidthUnits: _propTypes["default"].string,
  getLineWidth: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].func]),
  getLineColor: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].array]),
  showLegend: _propTypes["default"].bool,
  legendPosition: _propTypes["default"].string,
  legendNode: _propTypes["default"].node,
  getCursor: _propTypes["default"].func,
  getTooltip: _propTypes["default"].func,
  showTooltip: _propTypes["default"].bool,
  tooltipNode: _propTypes["default"].func,
  dataPropertyAccessor: _propTypes["default"].func,
  pitch: _propTypes["default"].number,
  formatLegendTitle: _propTypes["default"].func,
  formatTooltipTitle: _propTypes["default"].func,
  formatPropertyLabel: _propTypes["default"].func,
  formatData: _propTypes["default"].object,
  setViewportBBox: _propTypes["default"].func,
  setApiBBox: _propTypes["default"].func
}, _mapProps.commonProps), _mapProps.tooltipPropTypes), _mapProps.typographyPropTypes);
GeoCohortMap.defaultProps = _objectSpread(_objectSpread(_objectSpread({
  fillBasedOn: '',
  fillDataScale: 'linear',
  fillColors: ['#bae0ff', '#0075ff'],
  elevationBasedOn: '',
  elevationDataScale: 'linear',
  elevations: [0, 1000],
  onClick: undefined,
  onHover: undefined,
  opacity: 0.5,
  filled: true,
  getFillColor: function getFillColor(highlightId) {
    return function (d) {
      return (d === null || d === void 0 ? void 0 : d.GeoCohortItem) === highlightId ? [255, 138, 0] : [0, 117, 255];
    };
  },
  getElevation: 0,
  stroked: true,
  lineWidthUnits: 'pixels',
  getLineWidth: 1,
  getLineColor: [34, 66, 205],
  showLegend: false,
  legendPosition: 'top-left',
  legendNode: undefined,
  getTooltip: undefined,
  showTooltip: false,
  tooltipNode: _tooltipNode["default"],
  getCursor: undefined,
  pitch: 0,
  dataPropertyAccessor: function dataPropertyAccessor(d) {
    return d;
  },
  formatLegendTitle: function formatLegendTitle(d) {
    return d;
  },
  formatTooltipTitle: function formatTooltipTitle(d) {
    return d;
  },
  formatPropertyLabel: function formatPropertyLabel(d) {
    return d;
  },
  formatData: undefined,
  setViewportBBox: function setViewportBBox() {},
  setApiBBox: function setApiBBox() {}
}, _mapProps.commonDefaultProps), _mapProps.tooltipDefaultProps), _mapProps.typographyDefaultProps);
var _default = GeoCohortMap;
exports["default"] = _default;