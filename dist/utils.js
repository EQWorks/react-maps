"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.truncate = truncate;
exports.formatDataPOI = exports.getCursor = exports.calculateReportWIMetrics = exports.colorIntensityByMetric = exports.intensityByMetric = void 0;

var _datasets = require("./datasets");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// TODO more built in types, e.g. intervals, filter
// TODO cap max & mins
var intensityByMetric = function intensityByMetric(_ref) {
  var _ref$intensityCallbac = _ref.intensityCallback,
      intensityCallback = _ref$intensityCallbac === void 0 ? false : _ref$intensityCallbac,
      _ref$invert = _ref.invert,
      invert = _ref$invert === void 0 ? false : _ref$invert,
      multiplier = _ref.multiplier,
      base = _ref.base,
      metric = _ref.metric,
      _ref$metricStats = _ref.metricStats,
      max = _ref$metricStats.max,
      min = _ref$metricStats.min,
      _ref$getDataObject = _ref.getDataObject,
      getDataObject = _ref$getDataObject === void 0 ? function (d) {
    return d;
  } : _ref$getDataObject;
  if (intensityCallback) return function (d) {
    return intensityCallback(d) * multiplier + base;
  };

  var intensity = function intensity(v) {
    return (v - min) / (max - min);
  };

  if (invert) intensity = function intensity(v) {
    return (max - v) / (max - min);
  };
  if (max === min) intensity = function intensity() {
    return 1;
  };
  return function (d) {
    return intensity(getDataObject(d)[metric]) * multiplier + base;
  };
};

exports.intensityByMetric = intensityByMetric;

var colorIntensityByMetric = function colorIntensityByMetric(_ref2) {
  var _ref2$intensityCallba = _ref2.intensityCallback,
      intensityCallback = _ref2$intensityCallba === void 0 ? false : _ref2$intensityCallba,
      _ref2$invert = _ref2.invert,
      invert = _ref2$invert === void 0 ? false : _ref2$invert,
      color = _ref2.color,
      metric = _ref2.metric,
      _ref2$metricStats = _ref2.metricStats,
      max = _ref2$metricStats.max,
      min = _ref2$metricStats.min,
      _ref2$getDataObject = _ref2.getDataObject,
      getDataObject = _ref2$getDataObject === void 0 ? function (d) {
    return d;
  } : _ref2$getDataObject;
  if (intensityCallback) return function (d) {
    return color.map(function (_ref3) {
      var base = _ref3.base,
          multiplier = _ref3.multiplier;
      return intensityCallback(d) * multiplier + base;
    });
  };

  var intensity = function intensity(v) {
    return (v - min) / (max - min);
  };

  if (invert) intensity = function intensity(v) {
    return (max - v) / (max - min);
  };
  if (max === min) intensity = function intensity() {
    return 1;
  };
  return function (d) {
    return color.map(function (_ref4) {
      var base = _ref4.base,
          multiplier = _ref4.multiplier;
      return intensity(getDataObject(d)[metric]) * multiplier + base;
    });
  };
};

exports.colorIntensityByMetric = colorIntensityByMetric;

var calculateReportWIMetrics = function calculateReportWIMetrics(agg, row) {
  return _objectSpread({}, _datasets.reportWI.DATA_FIELDS.reduce(function (rowAgg, key) {
    return _objectSpread(_objectSpread({}, rowAgg), {}, _defineProperty({}, key, {
      max: Math.max((agg[key] || {
        max: null
      }).max, row[key]),
      min: Math.min((agg[key] || {
        min: null
      }).min, row[key])
    }));
  }, {}));
};
/**
 * getCursor - sets cursor for different layers and hover state
 * @param { object } params
 * @param { array } param.layers - current array of layers used in map
 * @return { function } - cursor function
 */


exports.calculateReportWIMetrics = calculateReportWIMetrics;

var getCursor = function getCursor() {
  var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      layers = _ref5.layers;

  if (layers !== null && layers !== void 0 && layers.length) {
    var _drawLayer$props;

    var drawLayer = layers.find(function (layer) {
      return layer.id === 'edit-draw layer' || layer.id.includes('select');
    });

    if (drawLayer !== null && drawLayer !== void 0 && (_drawLayer$props = drawLayer.props) !== null && _drawLayer$props !== void 0 && _drawLayer$props.visible) {
      return drawLayer.getCursor.bind(drawLayer);
    }
  }

  return function (_ref6) {
    var isDragging = _ref6.isDragging,
        isHovering = _ref6.isHovering;
    return isDragging ? 'grabbing' : isHovering ? 'pointer' : 'grab';
  };
};
/**
 * truncate - returns formatted string, by truncating to a certain nr of characters
 * @param { string } fullStr - string to format
 * @param { number } strLen - length of formatted string
 * @param { string } separator - string to separate formatted string
 * @returns { string } - formatted string
 */


exports.getCursor = getCursor;

function truncate(fullStr, strLen) {
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ... ';

  if (fullStr.length <= strLen) {
    return fullStr;
  }

  var sepLen = separator.length;
  var charsToShow = strLen - sepLen;
  var frontChars = Math.ceil(charsToShow / 2);
  var backChars = Math.floor(charsToShow / 2);
  return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
} // object of formatting functions for lon and lat keys in the POI map


var formatDataPOI = {
  lon: function lon(val) {
    return Math.round(val * 100) / 100 + String.fromCharCode(176);
  },
  lat: function lat(val) {
    return Math.round(val * 100) / 100 + String.fromCharCode(176);
  }
};
exports.formatDataPOI = formatDataPOI;