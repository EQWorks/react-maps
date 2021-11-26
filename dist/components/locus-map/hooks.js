"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLegends = void 0;

var _react = require("react");

var _utils = require("../../shared/utils");

var _constants = require("./constants");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * useLegends - React Hook to set legend config objects for all map layers
 * @param { object } param
 * @param { object } param.dataConfig - data configuration object for all map layers
 * @param { object } param.layerConfig - layer configuration object for map
 * @returns { array } - array of legend config objects for all map layers
 */
var useLegends = function useLegends(_ref) {
  var dataConfig = _ref.dataConfig,
      layerConfig = _ref.layerConfig;
  var dataMap = dataConfig.reduce(function (map, data) {
    map[data.id] = data;
    return map;
  }, {});
  var mapLegends = (0, _react.useMemo)(function () {
    var legends = [];
    layerConfig.forEach(function (layer) {
      var _layer$legend, _layer$legend2;

      var visualizations = layer.visualizations,
          _layer$opacity = layer.opacity,
          opacity = _layer$opacity === void 0 ? 1 : _layer$opacity,
          metricAliases = layer.metricAliases,
          formatPropertyLabel = layer.formatPropertyLabel,
          formatData = layer.formatData;
      var showLegend = (_layer$legend = layer.legend) === null || _layer$legend === void 0 ? void 0 : _layer$legend.showLegend;
      var formatLegendTitle = (_layer$legend2 = layer.legend) === null || _layer$legend2 === void 0 ? void 0 : _layer$legend2.formatLegendTitle;

      if (showLegend) {
        var _dataMap$layer$dataId, _data, _LAYER_CONFIGURATIONS, _visualizations$fill, _visualizations$fill$, _visualizations$radiu, _visualizations$radiu2, _visualizations$eleva, _visualizations$eleva2, _visualizations$fill2, _visualizations$fill3;

        var data = ((_dataMap$layer$dataId = dataMap[layer.dataId]) === null || _dataMap$layer$dataId === void 0 ? void 0 : _dataMap$layer$dataId.data) || {};
        data = (_data = data) !== null && _data !== void 0 && _data.tileData ? data.tileData : data;

        var dataPropertyAccessor = layer.dataPropertyAccessor || ((_LAYER_CONFIGURATIONS = _constants.LAYER_CONFIGURATIONS[layer.layer]) === null || _LAYER_CONFIGURATIONS === void 0 ? void 0 : _LAYER_CONFIGURATIONS.dataPropertyAccessor) || function (d) {
          return d;
        };

        var fillBasedOn = visualizations === null || visualizations === void 0 ? void 0 : (_visualizations$fill = visualizations.fill) === null || _visualizations$fill === void 0 ? void 0 : (_visualizations$fill$ = _visualizations$fill.value) === null || _visualizations$fill$ === void 0 ? void 0 : _visualizations$fill$.field;
        var radiusBasedOn = visualizations === null || visualizations === void 0 ? void 0 : (_visualizations$radiu = visualizations.radius) === null || _visualizations$radiu === void 0 ? void 0 : (_visualizations$radiu2 = _visualizations$radiu.value) === null || _visualizations$radiu2 === void 0 ? void 0 : _visualizations$radiu2.field;
        var elevationBasedOn = visualizations === null || visualizations === void 0 ? void 0 : (_visualizations$eleva = visualizations.elevation) === null || _visualizations$eleva === void 0 ? void 0 : (_visualizations$eleva2 = _visualizations$eleva.value) === null || _visualizations$eleva2 === void 0 ? void 0 : _visualizations$eleva2.field;
        var symbolLineColor = (0, _utils.getStrFillColor)({
          fillColor: (visualizations === null || visualizations === void 0 ? void 0 : visualizations.lineColor) || _constants.PROP_CONFIGURATIONS.lineColor.defaultValue,
          opacity: (0, _utils.setLegendOpacity)({
            opacity: opacity
          })
        });
        /**
         * We convert an array of array-format colors, into an array of rgba string format colours so we
         * can use them in the Legend Gradient component
         *
         * There is visually a difference between the legend opacity for color gradient and map opacity,
         * we need to adjust opacity for symbols in the legend to have a closer match
         */

        var fillColors = visualizations !== null && visualizations !== void 0 && (_visualizations$fill2 = visualizations.fill) !== null && _visualizations$fill2 !== void 0 && _visualizations$fill2.valueOptions ? (0, _utils.getArrayGradientFillColors)({
          fillColors: visualizations.fill.valueOptions,
          opacity: (0, _utils.setLegendOpacity)({
            opacity: opacity
          })
        }) : null;
        var objColor = Array.isArray(visualizations === null || visualizations === void 0 ? void 0 : (_visualizations$fill3 = visualizations.fill) === null || _visualizations$fill3 === void 0 ? void 0 : _visualizations$fill3.value) ? (0, _utils.getStrFillColor)({
          fillColor: visualizations.fill.value,
          opacity: (0, _utils.setLegendOpacity)({
            opacity: opacity
          })
        }) : (0, _utils.getStrFillColor)({
          fillColor: _constants.PROP_CONFIGURATIONS.fill.defaultValue,
          opacity: (0, _utils.setLegendOpacity)({
            opacity: opacity
          })
        });
        var layerLegends = (0, _utils.setLegendConfigs)({
          data: data,
          dataPropertyAccessor: dataPropertyAccessor,
          elevationBasedOn: elevationBasedOn,
          fillBasedOn: fillBasedOn,
          fillColors: fillColors,
          radiusBasedOn: radiusBasedOn,
          metricAliases: metricAliases,
          formatLegendTitle: formatLegendTitle,
          formatPropertyLabel: formatPropertyLabel,
          formatData: formatData,
          symbolLineColor: symbolLineColor,
          objColor: objColor
        });
        legends = [].concat(_toConsumableArray(legends), _toConsumableArray(layerLegends));
      }
    });
    return legends;
  }, [layerConfig, dataMap]);
  return mapLegends;
};

exports.useLegends = useLegends;