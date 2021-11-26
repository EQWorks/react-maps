"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getObjectMVTData = exports.getTooltipParams = exports.getDataCoordinates = exports.setView = exports.parseDeckGLLayerFromConfig = void 0;

var _newDeckGlCore = require("new-deck-gl-core");

var _editModes = require("@nebula.gl/edit-modes");

var _utils = require("../../shared/utils");

var _constants = require("./constants");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * parseDeckGLLayerFromConfig - sets up layer props & returns deck.gl layer
 * @param { object } param
 * @param { string } param.id - deck.gl layer id
 * @param { object } param.geometry - object of geometry props specific to layer
 * @param { object } param.visualizations - object of layer visualisations
 * @param { object } param.interactions - object of layer interactions (ex: click, tooltip)
 * @param { object } param.others - the rest of layer configurations
 * @returns { instanceOf } { deck.gl Layer } - deck.gl map layer
 */
var parseDeckGLLayerFromConfig = function parseDeckGLLayerFromConfig(_ref) {
  var id = _ref.id,
      layer = _ref.layer,
      geometry = _ref.geometry,
      visualizations = _ref.visualizations,
      interactions = _ref.interactions,
      others = _objectWithoutProperties(_ref, ["id", "layer", "geometry", "visualizations", "interactions"]);

  var _LAYER_CONFIGURATIONS = _constants.LAYER_CONFIGURATIONS[layer],
      layerPropertyAccessor = _LAYER_CONFIGURATIONS.dataPropertyAccessor,
      layerGeom = _LAYER_CONFIGURATIONS.geometry,
      Layer = _LAYER_CONFIGURATIONS.deckGLClass,
      defaultProps = _LAYER_CONFIGURATIONS.defaultProps,
      layerVisualizations = _LAYER_CONFIGURATIONS.visualizations;
  var layerMode = others.layerMode;
  var dataPropertyAccessor = (others === null || others === void 0 ? void 0 : others.dataPropertyAccessor) || layerPropertyAccessor;
  var geometryAccessor = (geometry === null || geometry === void 0 ? void 0 : geometry.geometryAccessor) || (layerGeom === null || layerGeom === void 0 ? void 0 : layerGeom.geometryAccessor);
  var mvtGeoKey = (geometry === null || geometry === void 0 ? void 0 : geometry.geoKey) || (layerGeom === null || layerGeom === void 0 ? void 0 : layerGeom.geoKey);
  var mode = null;

  switch (layerMode) {
    case 'circle':
      mode = _editModes.DrawCircleByDiameterMode;
      break;

    case 'rectangle':
      mode = _editModes.DrawRectangleMode;
      break;

    case 'polygon':
      mode = _editModes.DrawPolygonMode;
      break;

    default:
      mode = undefined;
      break;
  } // ====[NOTE] if a layer requires explicit geometry (all except GeoJson?)
  // =========] pass its configured values (references to data fields) to final propFn


  var geometryProps = {};

  if (layerGeom !== null && layerGeom !== void 0 && layerGeom.propName) {
    geometryProps = _defineProperty({}, layerGeom.propName, layerGeom.propFn(_objectSpread({
      geometryAccessor: geometryAccessor
    }, geometry)));
  }

  if (layerGeom !== null && layerGeom !== void 0 && layerGeom.source) {
    var _geometryProps2;

    geometryProps = (_geometryProps2 = {}, _defineProperty(_geometryProps2, layerGeom.source.propName, layerGeom.source.propFn(_objectSpread({
      geometryAccessor: geometryAccessor
    }, geometry.source))), _defineProperty(_geometryProps2, layerGeom.target.propName, layerGeom.target.propFn(_objectSpread({
      geometryAccessor: geometryAccessor
    }, geometry.target))), _geometryProps2);
  }

  if (layer === 'MVT') {
    geometryProps = {
      geoKey: mvtGeoKey,
      geometryAccessor: geometryAccessor
    };
  } // ====[TODO] correct fallback logic for the above. Should throw an error or prompt someone to choose
  // ====[TODO] calculate field extents in advance, so every configurable aspect doesn't need to


  var propsWithData = function propsWithData(_ref2) {
    var data = _ref2.data,
        highlightId = _ref2.highlightId;
    return _objectSpread({}, layerVisualizations.reduce(function (agg, name) {
      var config = visualizations[name] || {};
      var _PROP_CONFIGURATIONS$ = _constants.PROP_CONFIGURATIONS[name],
          deckGLName = _PROP_CONFIGURATIONS$.deckGLName,
          defaultValue = _PROP_CONFIGURATIONS$.defaultValue,
          _PROP_CONFIGURATIONS$2 = _PROP_CONFIGURATIONS$.byProducts,
          byProducts = _PROP_CONFIGURATIONS$2 === void 0 ? {} : _PROP_CONFIGURATIONS$2;
      return _objectSpread(_objectSpread({}, agg), {}, _defineProperty({}, deckGLName, (0, _utils.setFinalLayerDataProperty)(_objectSpread(_objectSpread({}, config), {}, {
        data: data,
        defaultValue: defaultValue,
        dataPropertyAccessor: dataPropertyAccessor,
        mvtGeoKey: mvtGeoKey,
        geometryAccessor: geometryAccessor,
        highlightId: highlightId
      }))), byProducts);
    }, {}));
  };

  var click = interactions.click,
      hover = interactions.hover,
      tooltip = interactions.tooltip,
      highlight = interactions.highlight,
      labels = interactions.labels;
  return function (data) {
    var _data$tileData;

    return new Layer(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({
      id: id,
      data: layer === 'MVT' ? data === null || data === void 0 ? void 0 : data.tileGeom : layer === 'select' ? {
        type: 'FeatureCollection',
        features: data
      } : data,
      // ====[TODO] logic for below
      // updateTriggers
      mode: mode,
      visualizations: visualizations,
      interactions: interactions,
      dataPropertyAccessor: dataPropertyAccessor
    }, defaultProps), others), propsWithData({
      data: data
    })), geometryProps), {}, {
      pickable: click || hover || tooltip || highlight || labels,
      onEdit: layer !== 'select' ? function () {} : function (_ref3) {
        var _updatedData$features;

        var updatedData = _ref3.updatedData;
        var setSelectShape = others.setSelectShape;
        /**
         * need condition here otherwise we get errors when we draw as updatedData.features is updated
         * only when we finish drawing a point or an entire polygon
         */

        if (updatedData !== null && updatedData !== void 0 && (_updatedData$features = updatedData.features) !== null && _updatedData$features !== void 0 && _updatedData$features.length && (!data.length || // these conditions are for calling setSelectShape only when we have new edited / created geometries
        data.length && !data.includes(updatedData.features[updatedData.features.length - 1]))) {
          setSelectShape(updatedData.features);
        }
      },
      visible: layer === 'MVT' ? Boolean(data === null || data === void 0 ? void 0 : (_data$tileData = data.tileData) === null || _data$tileData === void 0 ? void 0 : _data$tileData.length) : Boolean(data === null || data === void 0 ? void 0 : data.length)
    }));
  };
};
/**
 * setView - handles calculations of viewState lat, long, and zoom, based on
 *           data coordinates and deck size
 * @param { object } param
 * @param { array } param.dataGeomList - array of data arrays and associated geometry to display on the map
 * @param { number } param.width - deck container width
 * @param { number } param.height - deck container height
 * @returns { object } { latitude, longitude, zoom } - lat, long, and zoom for new viewState
 */


exports.parseDeckGLLayerFromConfig = parseDeckGLLayerFromConfig;

var setView = function setView(_ref4) {
  var dataGeomList = _ref4.dataGeomList,
      width = _ref4.width,
      height = _ref4.height;
  var dataCoordinateArray = dataGeomList.map(function (_ref5) {
    var data = _ref5.data,
        longitude = _ref5.longitude,
        latitude = _ref5.latitude,
        _ref5$geometryAccesso = _ref5.geometryAccessor,
        geometryAccessor = _ref5$geometryAccesso === void 0 ? function (d) {
      return d;
    } : _ref5$geometryAccesso;
    return getDataCoordinates({
      data: data,
      longitude: longitude,
      latitude: latitude,
      geometryAccessor: geometryAccessor
    });
  }).flat();
  var formattedGeoData = dataCoordinateArray.reduce(function (_ref6, coords) {
    var _ref7 = _slicedToArray(_ref6, 2),
        _ref7$ = _slicedToArray(_ref7[0], 2),
        minLng = _ref7$[0],
        minLat = _ref7$[1],
        _ref7$2 = _slicedToArray(_ref7[1], 2),
        maxLng = _ref7$2[0],
        maxLat = _ref7$2[1];

    var _coords = _slicedToArray(coords, 2),
        lng = _coords[0],
        lat = _coords[1];

    return [[Math.min(minLng, lng), Math.min(minLat, lat)], [Math.max(maxLng, lng), Math.max(maxLat, lat)]];
  }, [[180, 90], [-180, -90]]);
  var dataLonDiff = formattedGeoData[0][0] - formattedGeoData[1][0];
  /**
   * -120 is the diff in longitude between the westernmost and easternmost points of
   * North America: (-172 - (-52)) = -120
   * Compare to the diff in longitude between westernmost point of NA and easternmost point of
   * Australia: -172 - (+153) = -325
   * We need to reduce padding with map container shrinking size,
   * otherwise fitBounds breaks when padding is greater than map dimensions.
   */

  var padding = Math.min(width, height) / 4;

  if (dataLonDiff > -120) {
    padding = Math.min(width, height) / 10;
  } else if (Math.min(width, height) / 2 > 75) {
    padding = 75;
  }

  var viewPort = new _newDeckGlCore.WebMercatorViewport({
    width: width,
    height: height
  }).fitBounds(formattedGeoData, {
    padding: padding
  });
  var longitude = viewPort.longitude,
      latitude = viewPort.latitude,
      zoom = viewPort.zoom;
  return {
    longitude: longitude,
    latitude: latitude,
    zoom: zoom
  };
};
/**
 * getDataCoordinates - gets the coordinates that enclose all location data, including polygons
 * @param { object } param
 * @param { array } param.data - location data array
 * @param { function } param.geometryAccessor - function to help access geometry in the data set
 * @param { string } param.longitude - longitude key in data object
 * @param { string } param.latitude - latitude key in data object
 * @returns { array } - coordinates that define the boundary area where the data is located
 */


exports.setView = setView;

var getDataCoordinates = function getDataCoordinates(_ref8) {
  var _data$, _data$$geometry;

  var data = _ref8.data,
      geometryAccessor = _ref8.geometryAccessor,
      longitude = _ref8.longitude,
      latitude = _ref8.latitude;
  var POIType;
  var coordinateArray = [];

  if ((_data$ = data[0]) !== null && _data$ !== void 0 && (_data$$geometry = _data$.geometry) !== null && _data$$geometry !== void 0 && _data$$geometry.type) {
    var _data$2, _data$2$geometry;

    POIType = (_data$2 = data[0]) === null || _data$2 === void 0 ? void 0 : (_data$2$geometry = _data$2.geometry) === null || _data$2$geometry === void 0 ? void 0 : _data$2$geometry.type;
    coordinateArray = data.reduce(function (acc, point) {
      var _point$geometry;

      return [].concat(_toConsumableArray(acc), [point === null || point === void 0 ? void 0 : (_point$geometry = point.geometry) === null || _point$geometry === void 0 ? void 0 : _point$geometry.coordinates]);
    }, []);
  } else {
    coordinateArray = data.reduce(function (acc, point) {
      var _geometryAccessor, _geometryAccessor2;

      return [].concat(_toConsumableArray(acc), [[(_geometryAccessor = geometryAccessor(point)) === null || _geometryAccessor === void 0 ? void 0 : _geometryAccessor[longitude], (_geometryAccessor2 = geometryAccessor(point)) === null || _geometryAccessor2 === void 0 ? void 0 : _geometryAccessor2[latitude]]]);
    }, []);
  }

  if (POIType === 'Polygon') {
    coordinateArray = coordinateArray.flat().flat();
  }

  if (POIType === 'MultiPolygon') {
    coordinateArray = coordinateArray.flat().flat().flat();
  }

  var _coordinateArray$redu = coordinateArray.reduce(function (_ref9, point) {
    var _ref10 = _slicedToArray(_ref9, 2),
        _ref10$ = _slicedToArray(_ref10[0], 2),
        minLng = _ref10$[0],
        minLat = _ref10$[1],
        _ref10$2 = _slicedToArray(_ref10[1], 2),
        maxLng = _ref10$2[0],
        maxLat = _ref10$2[1];

    var _point = _slicedToArray(point, 2),
        lng = _point[0],
        lat = _point[1];

    return [[Math.min(minLng, lng), Math.min(minLat, lat)], [Math.max(maxLng, lng), Math.max(maxLat, lat)]];
  }, [[180, 90], [-180, -90]]),
      _coordinateArray$redu2 = _slicedToArray(_coordinateArray$redu, 2),
      minCoords = _coordinateArray$redu2[0],
      maxCoords = _coordinateArray$redu2[1];

  return [minCoords, maxCoords];
};
/**
 * getTooltipParams - gets all props related to tooltip component
 * @param { object } param
 * @param { object } param.hoverInfo - object of hovered element on the map
 * @returns { object } - object of tooltip component keys and values
 */


exports.getDataCoordinates = getDataCoordinates;

var getTooltipParams = function getTooltipParams(_ref11) {
  var _layerProps$interacti2, _visualizations$fill, _visualizations$fill$, _visualizations$radiu, _visualizations$radiu2, _visualizations$eleva, _visualizations$eleva2;

  var hoverInfo = _ref11.hoverInfo;
  var layerProps = hoverInfo.layer.props;
  var visualizations = layerProps.visualizations,
      dataPropertyAccessor = layerProps.dataPropertyAccessor,
      formatData = layerProps.formatData,
      formatPropertyLabel = layerProps.formatPropertyLabel,
      metricAliases = layerProps.metricAliases;

  var _layerProps$interacti = layerProps === null || layerProps === void 0 ? void 0 : (_layerProps$interacti2 = layerProps.interactions) === null || _layerProps$interacti2 === void 0 ? void 0 : _layerProps$interacti2.tooltip,
      tooltipKeys = _layerProps$interacti.tooltipKeys,
      formatTooltipTitle = _layerProps$interacti.formatTooltipTitle,
      tooltipProps = _layerProps$interacti.tooltipProps;

  var fillBasedOn = visualizations === null || visualizations === void 0 ? void 0 : (_visualizations$fill = visualizations.fill) === null || _visualizations$fill === void 0 ? void 0 : (_visualizations$fill$ = _visualizations$fill.value) === null || _visualizations$fill$ === void 0 ? void 0 : _visualizations$fill$.field;
  var radiusBasedOn = visualizations === null || visualizations === void 0 ? void 0 : (_visualizations$radiu = visualizations.radius) === null || _visualizations$radiu === void 0 ? void 0 : (_visualizations$radiu2 = _visualizations$radiu.value) === null || _visualizations$radiu2 === void 0 ? void 0 : _visualizations$radiu2.field;
  var elevationBasedOn = visualizations === null || visualizations === void 0 ? void 0 : (_visualizations$eleva = visualizations.elevation) === null || _visualizations$eleva === void 0 ? void 0 : (_visualizations$eleva2 = _visualizations$eleva.value) === null || _visualizations$eleva2 === void 0 ? void 0 : _visualizations$eleva2.field;

  var _ref12 = tooltipKeys ? tooltipKeys : {},
      name = _ref12.name,
      id = _ref12.id,
      metricKeys = _ref12.metricKeys,
      metricAccessor = _ref12.metricAccessor,
      nameAccessor = _ref12.nameAccessor,
      idAccessor = _ref12.idAccessor;

  var metricKeysArray = _toConsumableArray((tooltipKeys === null || tooltipKeys === void 0 ? void 0 : tooltipKeys.metricKeys) || []); // set metricKeys array if no custom keys are given


  if (!(metricKeys !== null && metricKeys !== void 0 && metricKeys.length)) {
    [radiusBasedOn, fillBasedOn, elevationBasedOn].forEach(function (key) {
      if (key) {
        metricKeysArray.push(key);
      }
    });
  }

  return {
    tooltipKeys: {
      name: name || 'name',
      id: id || 'id',
      nameAccessor: nameAccessor || dataPropertyAccessor,
      idAccessor: idAccessor || dataPropertyAccessor,
      metricKeys: metricKeysArray,
      metricAccessor: metricAccessor || dataPropertyAccessor,
      metricAliases: metricAliases
    },
    formatData: formatData,
    formatTooltipTitle: formatTooltipTitle,
    formatPropertyLabel: formatPropertyLabel,
    tooltipProps: tooltipProps
  };
}; // ====[TODO] should we define also all geometry accessors for MVT layer?? Current solution is based on our MVT tegola files

/**
 * getObjectMVTData - gets all data attribute keys & values for a hovered MVT object
 * @param { object } param
 * @param { object } param.dataConfig - data configuration object for all map layers
 * @param { object } param.hoverInfo - object of onHover event
 * @returns { object } - object of data { key: value } pairs corresponding to an MVT object
 */


exports.getTooltipParams = getTooltipParams;

var getObjectMVTData = function getObjectMVTData(_ref13) {
  var _dataConfig$find, _dataConfig$find$data;

  var dataConfig = _ref13.dataConfig,
      hoverInfo = _ref13.hoverInfo;
  var _hoverInfo$layer$prop = hoverInfo.layer.props,
      dataId = _hoverInfo$layer$prop.dataId,
      geoKey = _hoverInfo$layer$prop.geoKey,
      geometryAccessor = _hoverInfo$layer$prop.geometryAccessor;
  var geo_id = hoverInfo.object.properties.geo_id;
  var tileData = (_dataConfig$find = dataConfig.find(function (data) {
    return data.id === dataId;
  })) === null || _dataConfig$find === void 0 ? void 0 : (_dataConfig$find$data = _dataConfig$find.data) === null || _dataConfig$find$data === void 0 ? void 0 : _dataConfig$find$data.tileData;
  return tileData.find(function (d) {
    return geometryAccessor(d)[geoKey] === geo_id;
  });
};

exports.getObjectMVTData = getObjectMVTData;