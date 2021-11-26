"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isClusterZoomLevel = exports.processLayers = void 0;

var _supercluster = _interopRequireDefault(require("supercluster"));

var eqMapLayers = _interopRequireWildcard(require("../../components/layers"));

var _utils = require("../../shared/utils");

var _constants = require("../../constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * processLayers - returns layers used by POIMap
 * @param { object } param
 * @param { array } param.mapLayers - array of layers to show on map
 * @param { array } param.layerPool - array of all layers used by map in general
 * @param { object } param.props - layers' props
 * @returns { array } - array of Deck.gl and Nebula.gl layers used by POIMap
 */
var processLayers = function processLayers(_ref) {
  var mapLayers = _ref.mapLayers,
      layerPool = _ref.layerPool,
      props = _ref.props;
  return layerPool.map(function (layer) {
    return mapLayers.includes(layer) ? setLayer({
      layer: layer,
      props: props,
      visible: true
    }) : setLayer({
      layer: layer,
      props: props,
      visible: false
    });
  });
};
/**
 * setLayer - sets a map layer
 * @param { object } param
 * @param { string } param.layer - name of a layer found in src/components/layers/index.js
 * @param { object } param.props - object of layer props
 * @param { boolean } param.visible - boolean to be used to set a certain layer visible or not on the map
 * @returns { instanceOf } - Deck.gl or Nebula.gl layer
 */


exports.processLayers = processLayers;

var setLayer = function setLayer(_ref2) {
  var layer = _ref2.layer,
      props = _ref2.props,
      visible = _ref2.visible;
  return layer === 'POICluster' ? new eqMapLayers[layer](_objectSpread(_objectSpread({}, props), {}, {
    visible: visible
  })) : eqMapLayers[layer](_objectSpread(_objectSpread({}, props), {}, {
    visible: visible
  }));
};
/**
 * isClusterZoomLevel - determines if we should use cluster layer for the data in the current viewport
 * @param { object } param
 * @param { string } param.layerVisibleData - layer data displayed in the current viewport
 * @param { string } param.viewportBBOX - bounding box coordinates for the current viewport
 * @param { string } param.zoom - current map viewport zoom
 * @returns { boolean } - boolean indicating whether we should show clusters on the map
 */


var isClusterZoomLevel = function isClusterZoomLevel(_ref3) {
  var layerVisibleData = _ref3.layerVisibleData,
      viewportBBOX = _ref3.viewportBBOX,
      zoom = _ref3.zoom;
  var visiblePOIs = layerVisibleData.reduce(function (agg, elem) {
    return elem.objects ? [].concat(_toConsumableArray(agg), _toConsumableArray(elem.objects)) : [].concat(_toConsumableArray(agg), [elem.object]);
  }, []);

  if (visiblePOIs.length) {
    var getPosition = function getPosition(d) {
      return d.geometry.coordinates;
    };

    var index = new _supercluster["default"]({
      maxZoom: _constants.SUPERCLUSTER_ZOOM,
      radius: (0, _utils.getSuperclusterRadius)({
        zoom: zoom
      })
    });
    index.load(visiblePOIs.map(function (d) {
      return {
        geometry: {
          coordinates: getPosition(d)
        },
        properties: d.properties
      };
    }));
    var z = Math.floor(zoom);
    var clusterData = index.getClusters(viewportBBOX, z);
    return Boolean(clusterData.find(function (elem) {
      var _elem$properties;

      return elem === null || elem === void 0 ? void 0 : (_elem$properties = elem.properties) === null || _elem$properties === void 0 ? void 0 : _elem$properties.cluster;
    }));
  }
};

exports.isClusterZoomLevel = isClusterZoomLevel;