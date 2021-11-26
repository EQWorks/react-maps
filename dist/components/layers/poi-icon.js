"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _layers = require("@deck.gl/layers");

var _poiLocation = _interopRequireDefault(require("../icons/poi-location.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// icon mapping for poi icon layer
var POI_ICON_MAPPING = {
  marker: {
    x: 0,
    y: 0,
    width: 128,
    height: 128,
    anchorY: 128
  }
};
var defaultProps = {
  iconAtlas: _poiLocation["default"],
  iconMapping: POI_ICON_MAPPING,
  billboard: true,
  getIcon: function getIcon() {
    return 'marker';
  },
  getPosition: function getPosition(d) {
    return d.geometry.coordinates;
  },
  getSize: 5,
  visible: false
};
/**
 * setPOIIcon - sets the POI icon layer
 * @param { object } props - props object for passing data and other attributes to POIIcon
 * @returns { instanceOf IconLayer}
 */

var POIIcon = function POIIcon(_ref) {
  var visible = _ref.visible,
      props = _objectWithoutProperties(_ref, ["visible"]);

  return new _layers.IconLayer(_objectSpread(_objectSpread({}, defaultProps), {}, {
    sizeScale: props.data.length === 1 ? 12 : props.data.length < 8 ? 8 : 5,
    visible: visible,
    pickable: visible
  }, props));
};

var _default = POIIcon;
exports["default"] = _default;