"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _layers = require("@deck.gl/layers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultProps = {
  id: 'polygon-layer',
  stroked: true,
  filled: true,
  wireframe: true,
  lineWidthMinPixels: 1,
  getPolygon: function getPolygon(d) {
    return d.geometry.coordinates;
  },
  visible: false
};
/**
 * POIPolygon - sets the POI polygon layer
 * @param { object } param - props for PolygonLayer
 * @param { object } param.mapProps - object of map properties
 * @param { array } param.data - data array
 * @returns { instanceOf PolygonLayer } 
 */

var POIPolygon = function POIPolygon(_ref) {
  var mapProps = _ref.mapProps,
      data = _ref.data,
      visible = _ref.visible,
      props = _objectWithoutProperties(_ref, ["mapProps", "data", "visible"]);

  var polygonFillColour = mapProps.polygonFillColour,
      lineColour = mapProps.lineColour,
      lineWidth = mapProps.lineWidth,
      opacity = mapProps.opacity;
  return new _layers.PolygonLayer(_objectSpread(_objectSpread({
    data: data
  }, defaultProps), {}, {
    getFillColor: function getFillColor() {
      return polygonFillColour;
    },
    getLineColor: function getLineColor() {
      return lineColour;
    },
    getLineWidth: function getLineWidth() {
      return lineWidth;
    },
    updateTriggers: {
      getFillColor: polygonFillColour,
      getLineColor: lineColour,
      getLineWidth: lineWidth
    },
    opacity: opacity,
    visible: visible,
    pickable: visible
  }, props));
};

var _default = POIPolygon;
exports["default"] = _default;