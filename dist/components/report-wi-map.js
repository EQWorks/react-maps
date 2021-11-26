"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mapProps = require("../shared/map-props");

var _goober = require("goober");

var _d3Scale = require("d3-scale");

var _d3ScaleChromatic = require("d3-scale-chromatic");

var _d3Color = require("d3-color");

var _hooks = require("../hooks");

var _constants = require("../constants");

var _datasets = require("../datasets");

var _utils = require("../shared/utils");

var _oldGenericMap = _interopRequireDefault(require("./old-generic-map"));

var _scatterPlot = _interopRequireDefault(require("./layers/scatter-plot"));

var _entryList = _interopRequireDefault(require("./entry-list"));

var _controls = _interopRequireDefault(require("./controls"));

var _reportWiMetrics = _interopRequireDefault(require("./controls/report-wi-metrics"));

var _reportPeriods = _interopRequireDefault(require("./controls/report-periods"));

var _templateObject, _templateObject2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

(0, _goober.setup)(_react["default"].createElement);
var SCALES = {
  'linear': _d3Scale.scaleLinear,
  'quantile': _d3Scale.scaleQuantile,
  'quantize': _d3Scale.scaleQuantize
};
var Container = (0, _goober.styled)('div')(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding: 5px;\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n"])));
var MapContainer = (0, _goober.styled)('div')(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  flex-grow: 10;\n  padding: 5px;\n"]))); // DeckGL react component

var ReportWIMap = function ReportWIMap(_ref) {
  var getReport = _ref.getReport,
      report_id = _ref.report_id,
      layer_id = _ref.layer_id,
      map_id = _ref.map_id,
      radiusBasedOnInit = _ref.radiusBasedOn,
      radiusDataScale = _ref.radiusDataScale,
      radii = _ref.radii,
      fillBasedOnInit = _ref.fillBasedOn,
      fillDataScale = _ref.fillDataScale,
      fillColors = _ref.fillColors,
      onClick = _ref.onClick,
      onHover = _ref.onHover,
      opacity = _ref.opacity,
      getRadius = _ref.getRadius,
      getFillColor = _ref.getFillColor,
      getLineWidth = _ref.getLineWidth,
      getLineColor = _ref.getLineColor,
      showLegend = _ref.showLegend,
      legendPosition = _ref.legendPosition,
      useTooltip = _ref.useTooltip,
      dataPropertyAccessor = _ref.dataPropertyAccessor,
      mapboxApiAccessToken = _ref.mapboxApiAccessToken,
      scatterLayerProps = _objectWithoutProperties(_ref, ["getReport", "report_id", "layer_id", "map_id", "radiusBasedOn", "radiusDataScale", "radii", "fillBasedOn", "fillDataScale", "fillColors", "onClick", "onHover", "opacity", "getRadius", "getFillColor", "getLineWidth", "getLineColor", "showLegend", "legendPosition", "useTooltip", "dataPropertyAccessor", "mapboxApiAccessToken"]);

  var _useReducer = (0, _react.useReducer)(function (state, _ref2) {
    var type = _ref2.type,
        payload = _ref2.payload;

    if (type === 'show') {
      var x = payload.x,
          y = payload.y,
          object = payload.object,
          lngLat = payload.lngLat;
      return _objectSpread(_objectSpread({}, state), {}, {
        // toggle clicked object
        show: !state.show || (state.object || {}).poi_id !== object.poi_id,
        x: x,
        y: y,
        lngLat: lngLat,
        object: object
      });
    }

    return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, type, payload));
  }, {
    show: false,
    translate: true
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      tooltip = _useReducer2[0],
      tooltipDispatch = _useReducer2[1];

  var finalOnClick = (0, _react.useCallback)(function (o) {
    if (onClick) {
      onClick(o);
    }

    if (useTooltip) {
      tooltipDispatch({
        type: 'show',
        payload: o
      });
    }
  }, [onClick, useTooltip]);

  var _useTimeline = (0, _hooks.useTimeline)([], 500),
      timelineDispatch = _useTimeline.timelineDispatch,
      timeline = _objectWithoutProperties(_useTimeline, ["timelineDispatch"]);

  var _useState = (0, _react.useState)('period'),
      _useState2 = _slicedToArray(_useState, 2),
      timelineType = _useState2[0],
      setTimelineType = _useState2[1];

  var handleTimelineTypeChange = function handleTimelineTypeChange(e) {
    return setTimelineType(e.target.value);
  }; // TODO reducer for below
  // TODO init should be accounted for


  var _useState3 = (0, _react.useState)(radiusBasedOnInit),
      _useState4 = _slicedToArray(_useState3, 2),
      radiusBasedOn = _useState4[0],
      setRadiusBasedOn = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = _slicedToArray(_useState5, 2),
      radiusBasedOnType = _useState6[0],
      setRadiusBasedOnType = _useState6[1];

  var _useState7 = (0, _react.useState)(fillBasedOnInit),
      _useState8 = _slicedToArray(_useState7, 2),
      fillBasedOn = _useState8[0],
      setFillBasedOn = _useState8[1];

  var _useState9 = (0, _react.useState)(''),
      _useState10 = _slicedToArray(_useState9, 2),
      fillBasedOnType = _useState10[0],
      setFillBasedOnType = _useState10[1];

  var report = (0, _hooks.useFullReport)({
    getReport: getReport,
    report_id: report_id,
    layer_id: layer_id,
    map_id: map_id
  });

  var _useReducer3 = (0, _react.useReducer)(function (state, _ref3) {
    var type = _ref3.type,
        payload = _ref3.payload;

    if (type === 'api') {
      return _objectSpread(_objectSpread({}, state), {}, {
        period: payload.duration,
        periods: payload.durations.filter(function (_ref4) {
          var date_type = _ref4.date_type;
          return date_type == payload.duration.date_type;
        }),
        durations: payload.durations
      });
    }

    if (type === 'periodType') {
      if (payload !== state.period.date_type) {
        var _periods = state.durations.filter(function (_ref5) {
          var date_type = _ref5.date_type;
          return date_type == payload;
        });

        return _objectSpread(_objectSpread({}, state), {}, {
          period: _periods[0],
          periods: _periods
        });
      }

      return state;
    }

    return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, type, payload));
  }, {
    period: {},
    periods: [],
    durations: [],
    periodType: 1
  }),
      _useReducer4 = _slicedToArray(_useReducer3, 2),
      _useReducer4$ = _useReducer4[0],
      period = _useReducer4$.period,
      periods = _useReducer4$.periods,
      periodDispatch = _useReducer4[1];

  (0, _react.useEffect)(function () {
    periodDispatch({
      type: 'api',
      payload: report
    });
  }, [report]); // 2 way sync with timeline
  // TODO could add logic to TURN OFF other basedOn when changes are made
  // e.g. manually set radiusBasedOn, then when you change timelineType
  // to fillBasedOn, radiusBasedOn is set to ''

  (0, _react.useEffect)(function () {
    if (timelineType === 'period') {
      timelineDispatch({
        type: 'timestamps',
        payload: periods
      });
    } else if (['hod-r', 'hod-f'].includes(timelineType)) {
      if (timelineType.split('-')[1] === 'r') {
        setRadiusBasedOnType('hod');
      } else {
        setFillBasedOnType('hod');
      }

      timelineDispatch({
        type: 'timestamps',
        payload: _constants.hours
      });
    } else if (['dow-r', 'dow-f'].includes(timelineType)) {
      if (timelineType.split('-')[1] === 'r') {
        setRadiusBasedOnType('dow');
      } else {
        setFillBasedOnType('dow');
      }

      timelineDispatch({
        type: 'timestamps',
        payload: _constants.days
      });
    }
  }, [periods, timelineDispatch, timelineType]); // TODO: the state should be a direct result of activeIndex
  // timelineType should never change while the player is active?

  (0, _react.useEffect)(function () {
    if (timelineType === 'period') {
      periodDispatch({
        type: 'period',
        payload: periods[timeline.activeIndex] || {}
      });
    } else if (timelineType === 'hod-f') {
      setFillBasedOn(_constants.hours[timeline.activeIndex]);
    } else if (timelineType === 'hod-r') {
      setRadiusBasedOn(_constants.hours[timeline.activeIndex]);
    } else if (timelineType === 'dow-f') {
      setFillBasedOn(_constants.days[timeline.activeIndex]);
    } else if (timelineType === 'dow-r') {
      setRadiusBasedOn(_constants.days[timeline.activeIndex]);
    }
  }, [timeline.activeIndex, periods, timelineType]);
  (0, _react.useEffect)(function () {
    timelineDispatch({
      type: 'timestamps',
      payload: periods
    });
  }, [timelineDispatch, periods]);

  var _ref6 = report[period.key] || {
    data: [],
    metrics: {}
  },
      data = _ref6.data,
      metrics = _ref6.metrics;

  var layers = (0, _react.useMemo)(function () {
    var finalGetRadius = getRadius;

    if (radiusBasedOn.length) {
      var d3Fn = SCALES[radiusDataScale]([(metrics[radiusBasedOn] || {
        min: 0
      }).min, (metrics[radiusBasedOn] || {
        max: 10
      }).max], radii);

      finalGetRadius = function finalGetRadius(d) {
        return d3Fn(d[radiusBasedOn]);
      };
    }

    var finalGetFillColor = getFillColor;

    if (fillBasedOn.length) {
      var _d3Fn = SCALES[fillDataScale]([(metrics[fillBasedOn] || {
        min: 0
      }).min, (metrics[fillBasedOn] || {
        max: 10
      }).max], fillColors);

      finalGetFillColor = function finalGetFillColor(d) {
        var ret = (0, _d3Color.color)(_d3Fn(d[fillBasedOn]));
        return [ret.r, ret.g, ret.b];
      };
    }

    return [(0, _scatterPlot["default"])(_objectSpread({
      id: "".concat(report_id, "-report-scatterplot-layer"),
      data: data,
      getPosition: function getPosition(d) {
        return [d.lon, d.lat];
      },
      pickable: useTooltip || onClick || onHover,
      onClick: finalOnClick,
      onHover: onHover,
      opacity: opacity,
      getRadius: finalGetRadius,
      getFillColor: finalGetFillColor,
      updateTriggers: {
        getRadius: [finalGetRadius, radiusBasedOn, getRadius],
        getFillColor: [finalGetFillColor, fillBasedOn, getFillColor]
      },
      getLineWidth: getLineWidth,
      getLineColor: getLineColor
    }, scatterLayerProps))];
  }, [report_id, scatterLayerProps, data, metrics, useTooltip, finalOnClick, onClick, onHover, radiusBasedOn, radiusDataScale, radii, fillBasedOn, fillColors, fillDataScale, getFillColor, getLineColor, getLineWidth, getRadius, opacity]);
  var legends = (0, _hooks.useLegends)({
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
    objColor: (0, _utils.getStrFillColor)({
      fillColor: getFillColor,
      opacity: (0, _utils.setLegendOpacity)({
        opacity: opacity
      })
    }),
    data: data,
    dataPropertyAccessor: dataPropertyAccessor,
    symbolLineColor: typeof getLineColor !== 'function' ? (0, _utils.getStrFillColor)({
      fillColor: getLineColor,
      opacity: (0, _utils.setLegendOpacity)({
        opacity: opacity
      })
    }) : ''
  });

  var handleRadiusBasedOnChange = function handleRadiusBasedOnChange(e) {
    return setRadiusBasedOn(e.target.value);
  };

  var handleRadiusTypeChange = function handleRadiusTypeChange(e) {
    var update = e.target.value;
    var basedOn = '';

    if (update === 'metric') {
      basedOn = _datasets.reportWI.DATA_FIELDS[0];
    } else if (update === 'dow') {
      basedOn = _constants.days[0];
    } else if (update === 'hod') {
      basedOn = _constants.hours[0];
    }

    setRadiusBasedOn(basedOn);
    setRadiusBasedOnType(update);
  };

  var handleFillBasedOnChange = function handleFillBasedOnChange(e) {
    return setFillBasedOn(e.target.value);
  };

  var handleFillTypeChange = function handleFillTypeChange(e) {
    var update = e.target.value;
    var basedOn = '';

    if (update === 'metric') {
      basedOn = _datasets.reportWI.DATA_FIELDS[0];
    } else if (update === 'dow') {
      basedOn = _constants.days[0];
    } else if (update === 'hod') {
      basedOn = _constants.hours[0];
    }

    setFillBasedOn(basedOn);
    setFillBasedOnType(update);
  };

  return /*#__PURE__*/_react["default"].createElement(Container, null, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", null, "Radius Based On:"), /*#__PURE__*/_react["default"].createElement(_reportWiMetrics["default"], {
    selected: radiusBasedOn,
    callback: handleRadiusBasedOnChange,
    type: radiusBasedOnType,
    typeCallback: handleRadiusTypeChange
  }), /*#__PURE__*/_react["default"].createElement("label", null, "Fill Based On:"), /*#__PURE__*/_react["default"].createElement(_reportWiMetrics["default"], {
    selected: fillBasedOn,
    callback: handleFillBasedOnChange,
    type: fillBasedOnType,
    typeCallback: handleFillTypeChange
  }), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("label", null, "Timeline Type"), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("select", {
    onChange: handleTimelineTypeChange,
    disabled: timeline.player
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: "period"
  }, "Report Period (uses current metric)"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "hod-r"
  }, "Hour of Day (Radius)"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "hod-f"
  }, "Hour of Day (Fill)"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "dow-r"
  }, "Day of Week (Radius)"), /*#__PURE__*/_react["default"].createElement("option", {
    value: "dow-f"
  }, "Day of Week (Fill)"))), /*#__PURE__*/_react["default"].createElement(_reportPeriods["default"], {
    selected: period,
    selectPeriodType: function selectPeriodType(payload) {
      return periodDispatch({
        type: 'periodType',
        payload: payload
      });
    },
    selectPeriod: function selectPeriod(payload) {
      return periodDispatch({
        type: 'period',
        payload: payload
      });
    },
    periods: periods
  })), timeline.timestamps && timeline.timestamps.length > 0 && /*#__PURE__*/_react["default"].createElement(_controls["default"], timeline), /*#__PURE__*/_react["default"].createElement(MapContainer, null, /*#__PURE__*/_react["default"].createElement(_oldGenericMap["default"], _extends({
    layers: layers,
    showLegend: showLegend,
    position: legendPosition,
    legends: legends,
    showTooltip: tooltip.show,
    tooltipNode: /*#__PURE__*/_react["default"].createElement(_entryList["default"], tooltip) // x, y, translate

  }, tooltip, {
    mapboxApiAccessToken: mapboxApiAccessToken
  }))));
};

ReportWIMap.propTypes = _objectSpread({
  getReport: _propTypes["default"].func.isRequired,
  report_id: _propTypes["default"].number.isRequired,
  layer_id: _propTypes["default"].number.isRequired,
  map_id: _propTypes["default"].number.isRequired,
  radiusBasedOn: _propTypes["default"].string,
  radiusDataScale: _propTypes["default"].string,
  radii: _propTypes["default"].array,
  fillBasedOn: _propTypes["default"].string,
  fillDataScale: _propTypes["default"].string,
  fillColors: _propTypes["default"].array,
  onClick: _propTypes["default"].func,
  onHover: _propTypes["default"].func,
  opacity: _propTypes["default"].number,
  getRadius: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].array]),
  radiusUnits: _propTypes["default"].string,
  filled: _propTypes["default"].bool,
  getFillColor: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].array]),
  stroked: _propTypes["default"].bool,
  lineWidthUnits: _propTypes["default"].string,
  getLineWidth: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].array]),
  getLineColor: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].array]),
  showLegend: _propTypes["default"].bool,
  legendPosition: _propTypes["default"].string,
  defaultKeyMetric: _propTypes["default"].string,
  useTooltip: _propTypes["default"].bool,
  dataPropertyAccessor: _propTypes["default"].func
}, _mapProps.commonProps);
ReportWIMap.defaultProps = _objectSpread({
  radiusBasedOn: '',
  radiusDataScale: 'linear',
  radii: [5, 50],
  fillBasedOn: '',
  fillDataScale: 'linear',
  fillColors: [(0, _d3ScaleChromatic.interpolateBlues)(0), (0, _d3ScaleChromatic.interpolateBlues)(1)],
  onClick: undefined,
  onHover: undefined,
  opacity: 0.8,
  getRadius: 10,
  // radiusScale: 5,
  radiusUnits: 'pixels',
  // radiusMinPixels: 10,
  // radiusMaxPixels: 100,
  // getColor: () => null,
  filled: true,
  getFillColor: [255, 140, 0],
  // lineWidthUnits,
  // lineWidthMinPixels: 1,
  // lineWidthMaxPixels: 10,
  stroked: true,
  lineWidthUnits: 'pixels',
  getLineWidth: 2,
  getLineColor: [0, 0, 0],
  showLegend: false,
  legendPosition: 'top-left',
  useTooltip: false,
  dataPropertyAccessor: function dataPropertyAccessor(d) {
    return d;
  }
}, _mapProps.commonDefaultProps);
var _default = ReportWIMap;
exports["default"] = _default;