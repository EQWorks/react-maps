"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _layers = require("@deck.gl/layers");

var _constants = require("../../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultProps = {
  id: 'geojson-layer',
  stroked: true,
  visible: false,
  filled: true,
  extruded: false,
  lineWidthScale: 1,
  lineWidthMinPixels: 0,
  lineWidthUnits: 'pixels',
  getElevation: 0,
  parameters: {
    depthTest: false
  },
  pointRadiusScale: 1,
  transitions: {
    getPositions: 600,
    getRadius: {
      type: 'spring',
      stiffness: 0.01,
      damping: 0.15,
      enter: function enter() {
        return [0];
      } // grow from size 0

    }
  }
};
/**
 * POIGeoJson - sets the POI icon layer
 * @param { object } param - props for GeoJsonLayer
 * @param { object } param.mapProps - object of map properties
 * @param { array } param.data - data array
 * @param { number } param.POIType - POI type
 * @returns { instanceOf GeoJsonLayer } 
 */

var POIGeoJson = function POIGeoJson(_ref) {
  var data = _ref.data,
      mapProps = _ref.mapProps,
      POIType = _ref.POIType,
      visible = _ref.visible,
      props = _objectWithoutProperties(_ref, ["data", "mapProps", "POIType", "visible"]);

  var fillColour = mapProps.fillColour,
      polygonFillColour = mapProps.polygonFillColour,
      lineColour = mapProps.lineColour,
      polygonLineColour = mapProps.polygonLineColour,
      lineWidth = mapProps.lineWidth,
      opacity = mapProps.opacity;
  return new _layers.GeoJsonLayer(_objectSpread(_objectSpread({
    data: data
  }, defaultProps), {}, {
    getRadius: function getRadius(d) {
      if (POIType === _constants.TYPE_RADIUS.code) {
        return d.properties.radius;
      }

      return null;
    },
    getFillColor: function getFillColor() {
      if (POIType === _constants.TYPE_RADIUS.code) {
        return fillColour;
      }

      return polygonFillColour;
    },
    getLineColor: function getLineColor() {
      if (POIType === _constants.TYPE_RADIUS.code) {
        return lineColour;
      }

      return polygonLineColour;
    },
    getLineWidth: function getLineWidth() {
      return lineWidth;
    },
    updateTriggers: {
      getRadius: [POIType, data],
      getFillColor: [POIType, fillColour, polygonFillColour],
      getLineColor: [POIType, lineColour, polygonLineColour],
      getLineWidth: lineWidth
    },
    opacity: opacity,
    transitions: data.length === 1 ? _objectSpread({}, defaultProps.transitions) : {},
    visible: visible,
    pickable: visible
  }, props));
};

var _default = POIGeoJson;
exports["default"] = _default;