"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFullReport = exports.useReport = void 0;

var _react = require("react");

var _reactQuery = require("react-query");

var _utils = require("../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// for manual changing of report duration
var useReport = function useReport(_ref) {
  var getReport = _ref.getReport,
      report_id = _ref.report_id,
      layer_id = _ref.layer_id,
      map_id = _ref.map_id,
      currentDuration = _ref.currentDuration;

  var _useQuery = (0, _reactQuery.useQuery)( // unique query key (for caching, etc.)
  [report_id, layer_id, map_id, currentDuration], function () {
    return getReport({
      report_id: report_id,
      layer_id: layer_id,
      map_id: map_id,
      currentDuration: currentDuration
    });
  }),
      isSuccess = _useQuery.isSuccess,
      payload = _useQuery.data;

  var _useReducer = (0, _react.useReducer)(function (state, _ref2) {
    var type = _ref2.type,
        payload = _ref2.payload;

    if (['init', 'single_period'].includes(type)) {
      var _value;

      var duration = payload.duration,
          durationKey = payload.durationKey,
          durations = payload.durations,
          data = payload.data;
      var value = (_value = {}, _defineProperty(_value, durationKey, {
        data: data,
        duration: duration,
        metrics: data.reduce(_utils.calculateReportWIMetrics, {})
      }), _defineProperty(_value, "currentDuration", durationKey), _value); // TODO is this necessary? 'durations' is sent with every request

      if (type === 'init') {
        value.durations = durations;
      }

      return _objectSpread(_objectSpread({}, state), value);
    }

    return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, type, payload));
  }, {}),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      report = _useReducer2[0],
      reportDispatch = _useReducer2[1]; // { currentDuration: durationKey, [durationKey]: { data, metric } }


  (0, _react.useEffect)(function () {
    if (isSuccess) {
      reportDispatch({
        type: currentDuration.length ? 'single_period' : 'init',
        payload: payload
      });
    }
  }, [isSuccess, currentDuration.length, payload]);
  return report;
}; // For using all report durations


exports.useReport = useReport;

var useFullReport = function useFullReport(_ref3) {
  var getReport = _ref3.getReport,
      report_id = _ref3.report_id,
      layer_id = _ref3.layer_id,
      map_id = _ref3.map_id;

  var _useQuery2 = (0, _reactQuery.useQuery)([report_id, layer_id, map_id], function () {
    return getReport({
      report_id: report_id,
      layer_id: layer_id,
      map_id: map_id
    });
  }),
      payload = _useQuery2.data;

  var _useQuery3 = (0, _reactQuery.useQuery)([report_id, layer_id, map_id, payload === null || payload === void 0 ? void 0 : payload.durations], function () {
    var _payload$durations;

    return Promise.all(payload === null || payload === void 0 ? void 0 : (_payload$durations = payload.durations) === null || _payload$durations === void 0 ? void 0 : _payload$durations.map(function (currentDuration) {
      return getReport({
        report_id: report_id,
        layer_id: layer_id,
        map_id: map_id,
        currentDuration: currentDuration
      });
    }));
  }, {
    enabled: payload
  }),
      isSuccess = _useQuery3.isSuccess,
      durationData = _useQuery3.data;

  var _useReducer3 = (0, _react.useReducer)(function (state, _ref4) {
    var type = _ref4.type,
        payload = _ref4.payload;

    if (type === 'full_report') {
      var duration = payload.duration,
          durations = payload.durations,
          fullReport = payload.fullReport;
      return _objectSpread({
        duration: duration,
        durations: durations
      }, fullReport);
    }

    return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, type, payload));
  }, {
    duration: {},
    durations: []
  }),
      _useReducer4 = _slicedToArray(_useReducer3, 2),
      report = _useReducer4[0],
      reportDispatch = _useReducer4[1]; // { currentDuration: durationKey, [durationKey]: { data, metric } }
  // TODO make .reduce more efficient
  // TODO don't re-use POI meta data, only report metrics


  (0, _react.useEffect)(function () {
    if (isSuccess) {
      var data = payload.data,
          duration = payload.duration,
          durations = payload.durations;

      var fullReport = _objectSpread(_defineProperty({}, duration.key, {
        data: data,
        metrics: data.reduce(_utils.calculateReportWIMetrics, {})
      }), durationData.reduce(function (agg, ele) {
        return _objectSpread(_objectSpread({}, agg), {}, _defineProperty({}, ele.duration.key, _objectSpread(_objectSpread({}, ele), {}, {
          metrics: ele.data.reduce(_utils.calculateReportWIMetrics, {}) // { min, max }

        })));
      }, {}));

      reportDispatch({
        type: 'full_report',
        payload: {
          duration: duration,
          durations: durations,
          fullReport: fullReport
        }
      });
    }
  }, [isSuccess, payload, durationData]);
  return report;
};

exports.useFullReport = useFullReport;