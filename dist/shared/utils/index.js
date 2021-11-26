"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLegendConfigs = exports.getSuperclusterRadius = exports.setLegendOpacity = exports.getArrayGradientFillColors = exports.getStrFillColor = exports.getArrayFillColors = exports.strToArrayColor = exports.setFinalLayerDataProperty = exports.getDataRange = exports.getCircleRadiusCentroid = exports.createCircleFromPointRadius = exports.getDataCoordinates = exports.setView = void 0;

var _newDeckGlCore = require("new-deck-gl-core");

var _circle = _interopRequireDefault(require("@turf/circle"));

var _helpers = require("@turf/helpers");

var _centroid = _interopRequireDefault(require("@turf/centroid"));

var _bbox = _interopRequireDefault(require("@turf/bbox"));

var _distance = _interopRequireDefault(require("@turf/distance"));

var _constants = require("../../constants");

var _d3Color = require("d3-color");

var _d3Array = require("d3-array");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * setView - handles calculations of viewState lat, long, and zoom, based on
 *           data coordinates and deck size
 * @param { object } param
 * @param { array } param.data - data to display on the map
 * @param { number } param.width - deck container width
 * @param { number } param.height - deck container height
 * @return { object } { latitude, longitude, zoom } - lat, long, and zoom for new viewState
 */
var setView = function setView(_ref) {
  var _data$, _data$$geometry, _data$0$properties, _data$0$geometry, _data$0$properties2, _data$0$properties3;

  var data = _ref.data,
      width = _ref.width,
      height = _ref.height;
  var viewData = data; // for lists <100 radii, set viewport to fit radius for all POIs

  if (((_data$ = data[0]) === null || _data$ === void 0 ? void 0 : (_data$$geometry = _data$.geometry) === null || _data$$geometry === void 0 ? void 0 : _data$$geometry.type) === 'Point' && (data === null || data === void 0 ? void 0 : data.length) < 100) {
    viewData = [];
    data.forEach(function (point) {
      var _point$properties;

      if (point !== null && point !== void 0 && (_point$properties = point.properties) !== null && _point$properties !== void 0 && _point$properties.radius) {
        var pointCoord = point.geometry.coordinates;
        var pointRadius = point.properties.radius;
        viewData.push(createCircleFromPointRadius({
          centre: pointCoord,
          radius: pointRadius
        }));
      } else {
        // cover case for a POI without a radius
        viewData.push(point);
      }
    });
  }

  var formattedGeoData = getDataCoordinates({
    data: viewData
  });
  var dataLonDiff = formattedGeoData[0][0] - formattedGeoData[1][0];
  /**
   * -120 is the diff in longitude between the westernmost and easternmost points of
   * North America: (-172 - (-52)) = -120
   * Compare to the diff in longitude between westernmost point of NA and easternmost point of
   * Australia: -172 - (+153) = -325
   * Because we deal with a pitch, the distortion in map requires more padding between so extreme
   * points. We also need to reduce padding with map container shrinking size,
   * otherwise fitBounds breaks when padding is greater than map dimensions.
   */

  var padding = Math.min(width, height) / 4;

  if (dataLonDiff > -120) {
    padding = Math.min(width, height) / 10;
  } else if (Math.min(width, height) / 2 > 75) {
    padding = 75;
  } // set padding larger when we edit one radii POI


  if (data.length === 1 && !((_data$0$properties = data[0].properties) !== null && _data$0$properties !== void 0 && _data$0$properties.polygon)) {
    padding = Math.min(width, height) / 8;
  }

  var viewPort = new _newDeckGlCore.WebMercatorViewport({
    width: width,
    height: height
  }).fitBounds(formattedGeoData, {
    padding: padding
  });
  var longitude = viewPort.longitude,
      latitude = viewPort.latitude,
      zoom = viewPort.zoom; // set a lower value zoom for a point with small or inexistent radius to have better map perspective

  if ((data === null || data === void 0 ? void 0 : data.length) === 1 && ((_data$0$geometry = data[0].geometry) === null || _data$0$geometry === void 0 ? void 0 : _data$0$geometry.type) === 'Point' && (!((_data$0$properties2 = data[0].properties) !== null && _data$0$properties2 !== void 0 && _data$0$properties2.radius) || ((_data$0$properties3 = data[0].properties) === null || _data$0$properties3 === void 0 ? void 0 : _data$0$properties3.radius) < 10)) {
    zoom = Math.min(zoom, 18);
  }

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
 * @returns { array } - coordinates that define the boundary area where the data is located
 */


exports.setView = setView;

var getDataCoordinates = function getDataCoordinates(_ref2) {
  var _data$2, _data$2$geometry;

  var data = _ref2.data;
  var coordinateArray;

  if ((_data$2 = data[0]) !== null && _data$2 !== void 0 && (_data$2$geometry = _data$2.geometry) !== null && _data$2$geometry !== void 0 && _data$2$geometry.type) {
    coordinateArray = data.reduce(function (acc, point) {
      var _point$geometry;

      var POIType = (_point$geometry = point.geometry) === null || _point$geometry === void 0 ? void 0 : _point$geometry.type;

      if (POIType === 'Point') {
        return [].concat(_toConsumableArray(acc), [point.geometry.coordinates]);
      }

      if (POIType === 'Polygon') {
        var _point$geometry$coord;

        return [].concat(_toConsumableArray(acc), _toConsumableArray((_point$geometry$coord = point.geometry.coordinates) === null || _point$geometry$coord === void 0 ? void 0 : _point$geometry$coord.flat()));
      }

      if (POIType === 'MultiPolygon') {
        var _point$geometry$coord2;

        return [].concat(_toConsumableArray(acc), _toConsumableArray((_point$geometry$coord2 = point.geometry.coordinates) === null || _point$geometry$coord2 === void 0 ? void 0 : _point$geometry$coord2.flat().flat()));
      }
    }, []);
  } else {
    coordinateArray = data.reduce(function (acc, point) {
      return [].concat(_toConsumableArray(acc), [[point === null || point === void 0 ? void 0 : point.lon, point === null || point === void 0 ? void 0 : point.lat]]);
    }, []);
  }

  var _coordinateArray$redu = coordinateArray.reduce(function (_ref3, point) {
    var _ref4 = _slicedToArray(_ref3, 2),
        _ref4$ = _slicedToArray(_ref4[0], 2),
        minLng = _ref4$[0],
        minLat = _ref4$[1],
        _ref4$2 = _slicedToArray(_ref4[1], 2),
        maxLng = _ref4$2[0],
        maxLat = _ref4$2[1];

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
 * createCircleFromPointRadius - creates a circle / polygon GeoJSON feature from a radius and a set
 *                               of coordinates
 * @param { object } param
 * @param { array } param.centre - array of coordinates for circle centroid [lon, lat]
 * @param { number } param.radius - radius value
 * @return { object } - GeoJSON object of created circle / polygon
 */


exports.getDataCoordinates = getDataCoordinates;

var createCircleFromPointRadius = function createCircleFromPointRadius(_ref5) {
  var centre = _ref5.centre,
      radius = _ref5.radius;
  // ToDo: research how large our radius can get and if can make a formula to set better step number
  var options = {
    steps: radius < 500 ? 50 : 100,
    units: 'meters'
  };
  var createdCircle = (0, _circle["default"])(centre, radius, options);
  createdCircle.properties.polygon_json = JSON.stringify(createdCircle.geometry);
  createdCircle.properties.poiType = 1;
  return createdCircle;
};
/**
 * getCircleRadiusCentroid - calculates the radius and centroid of a circle / polygon
 * @param { object } polygon - GeoJSON polygon object
 * @return { object } - the values of the circle's radius and centroid coordinates
 */


exports.createCircleFromPointRadius = createCircleFromPointRadius;

var getCircleRadiusCentroid = function getCircleRadiusCentroid(_ref6) {
  var polygon = _ref6.polygon;
  polygon = _objectSpread(_objectSpread({}, polygon), {}, {
    type: 'Feature'
  });
  var centroid = (0, _centroid["default"])(polygon);
  var bound = (0, _bbox["default"])(polygon);
  var radius = (0, _distance["default"])(centroid, (0, _helpers.point)([(bound[0] + bound[2]) / 2, bound[3]])); // return radius in meters

  var coordinates = centroid.geometry.coordinates;
  radius = Math.round(radius * 1000000) / 1000;
  return {
    radius: radius,
    coordinates: coordinates
  };
};
/**
 * getDataRange - returns array of min and max values of a data set
 * @param { object } param
 * @param { array } param.data - data array
 * @param { string } param.dataKey - data attribute key
 * @param { function } param.dataPropertyAccessor - function to access data attribute
 * @return { array  } - array of min and max values
 */


exports.getCircleRadiusCentroid = getCircleRadiusCentroid;

var getDataRange = function getDataRange(_ref7) {
  var data = _ref7.data,
      dataKey = _ref7.dataKey,
      dataPropertyAccessor = _ref7.dataPropertyAccessor;

  if (data !== null && data !== void 0 && data.length) {
    return (0, _d3Array.extent)(data, function (d) {
      return dataPropertyAccessor(d)[dataKey];
    });
  }
};
/**
 * setFinalLayerDataProperty - returns function or values to set deck.gl layer property (ex: fill colour, radius)
 * @param { object } param
 * @param { array } param.data - data array
 * @param { number || string || array || object } param.value - value for (attribute data || layer prop) or data attribute key
 * @param { number || string || array } param.defaultValue - default value attribute data || layer prop
 * @param { function } param.dataScale - D3 scale function
 * @param { array } param.valueOptions - array of range values for the deck.gl layer property
 * @param { function } param.dataPropertyAccessor - function to help access attribute data
 * @param { function } param.geometryAccessor - function to help access geometry keys
 * @param { string } param.mvtGeoKey - geometry key for mvt layer
 * @param { string } param.highlightId - id of selected object on the map
 * @return { function || number || array  } - final function/number/array for deck.gl layer data accessor
 */


exports.getDataRange = getDataRange;

var setFinalLayerDataProperty = function setFinalLayerDataProperty(_ref8) {
  var _data$tileData, _layerData, _value$field;

  var data = _ref8.data,
      value = _ref8.value,
      defaultValue = _ref8.defaultValue,
      dataScale = _ref8.dataScale,
      valueOptions = _ref8.valueOptions,
      _ref8$dataPropertyAcc = _ref8.dataPropertyAccessor,
      dataPropertyAccessor = _ref8$dataPropertyAcc === void 0 ? function (d) {
    return d;
  } : _ref8$dataPropertyAcc,
      _ref8$geometryAccesso = _ref8.geometryAccessor,
      geometryAccessor = _ref8$geometryAccesso === void 0 ? function (d) {
    return d;
  } : _ref8$geometryAccesso,
      mvtGeoKey = _ref8.mvtGeoKey,
      _ref8$highlightId = _ref8.highlightId,
      highlightId = _ref8$highlightId === void 0 ? null : _ref8$highlightId;

  if (!value) {
    return typeof defaultValue === 'function' ? defaultValue(highlightId) : defaultValue;
  } // case for radius for GeoJSON layer


  if (value.field && !dataScale && !valueOptions) {
    return function (d) {
      return dataPropertyAccessor(d)[value.field];
    };
  }

  var layerData = data !== null && data !== void 0 && (_data$tileData = data.tileData) !== null && _data$tileData !== void 0 && _data$tileData.length ? data.tileData : data;

  if ((_layerData = layerData) !== null && _layerData !== void 0 && _layerData.length && (_value$field = value.field) !== null && _value$field !== void 0 && _value$field.length && valueOptions !== null && valueOptions !== void 0 && valueOptions.length) {
    var _data$tileData3;

    var sample = dataPropertyAccessor(layerData[0]);

    if (sample[value.field] === undefined) {
      return defaultValue;
    }

    var dataRange = getDataRange({
      data: layerData,
      dataKey: value.field,
      dataPropertyAccessor: dataPropertyAccessor
    });

    if (dataRange.length >= 2 && dataRange[0] !== dataRange[1]) {
      var _data$tileData2;

      var d3Fn = _constants.SCALES[dataScale](dataRange, valueOptions); // case for MVT layer


      if (data !== null && data !== void 0 && (_data$tileData2 = data.tileData) !== null && _data$tileData2 !== void 0 && _data$tileData2.length) {
        layerData = Object.fromEntries(data.tileData.map(function (item) {
          return [geometryAccessor(item)[mvtGeoKey], {
            value: dataPropertyAccessor(item)[value.field]
          }];
        }));
        return function (_ref9) {
          var geo_id = _ref9.properties.geo_id;

          var _ref10 = layerData[geo_id] || {
            value: 0
          },
              value = _ref10.value;

          if (value || value === dataRange[0]) {
            return d3Fn(value);
          } // tiles with no data values will be transparent


          return [255, 255, 255, 0];
        };
      }

      return function (d) {
        return d3Fn(dataPropertyAccessor(d)[value.field]);
      };
    } // case for mvt layer: tiles with no data values will be transparent


    if (data !== null && data !== void 0 && (_data$tileData3 = data.tileData) !== null && _data$tileData3 !== void 0 && _data$tileData3.length) {
      return [255, 255, 255, 0];
    }

    return valueOptions[0];
  }

  return typeof value === 'function' ? defaultValue(highlightId) : value;
};
/**
 * strToArrayColor - transforms a string format color ex.'#0062d9' into an array of rgb color values
 * @param { object } param
 * @param { string } param.strColor - string format color
 * @returns { array  } - an array of rgb color values [r, g, b]
 */


exports.setFinalLayerDataProperty = setFinalLayerDataProperty;

var strToArrayColor = function strToArrayColor(_ref11) {
  var strColor = _ref11.strColor;
  var layerColor = (0, _d3Color.color)(strColor);
  return [layerColor.r, layerColor.g, layerColor.b];
};
/**
 * getArrayFillColors - converts an array of string format colour in array format
 * @param { object } param
 * @param { string } param.fillColors - array of string format colours ['#0062d9', '#dd196b']
 * @returns { array } - array format colour [[r, g, b]]
 */


exports.strToArrayColor = strToArrayColor;

var getArrayFillColors = function getArrayFillColors(_ref12) {
  var fillColors = _ref12.fillColors;
  return fillColors.map(function (strColor) {
    return strToArrayColor({
      strColor: strColor
    });
  });
};
/**
* getStrFillColor - converts an array format colour [r, g, b] in a string format colour
* @param { object } param
* @param { array || function } param.getFillColor - function or array of Deck.gl layer fill colours
* @param { string } param.opacity - opacity value
* @returns { array } - string format colour 'rgb(r, g, b, opacity)'
*/


exports.getArrayFillColors = getArrayFillColors;

var getStrFillColor = function getStrFillColor(_ref13) {
  var fillColor = _ref13.fillColor,
      _ref13$opacity = _ref13.opacity,
      opacity = _ref13$opacity === void 0 ? 1 : _ref13$opacity;
  var color = typeof fillColor === 'function' ? fillColor(0)(1) : fillColor;
  return "rgba(".concat(color[0], ", ").concat(color[1], ", ").concat(color[2], ", ").concat(opacity, ")");
};
/**
* getArrayGradientFillColors - converts an array of string or array format colours
* in an array of rgba string format colours
* @param { object } param
* @param { array } param.fillColors - array of string or array format colours
                                      ex: ['#0062d9', '#dd196b'] or [[214, 232, 253], [39, 85, 196]]
* @param { string } param.opacity - opacity value
* @returns { array } - array of rgba string format colours ['rgb(r, g, b, opacity)']
*/


exports.getStrFillColor = getStrFillColor;

var getArrayGradientFillColors = function getArrayGradientFillColors(_ref14) {
  var fillColors = _ref14.fillColors,
      opacity = _ref14.opacity;
  return fillColors.map(function (strColor) {
    var arrayColor = Array.isArray(strColor) ? strColor : strToArrayColor({
      strColor: strColor
    });
    return "rgba(".concat(arrayColor[0], ", ").concat(arrayColor[1], ", ").concat(arrayColor[2], ", ").concat(opacity, ")");
  });
};
/**
 * setLegendOpacity - adjusts legend opacity to match closer to deck.gl layer opacity
 * @param { object } param
 * @param { number } param.opacity - map opacity value
 * @returns { number  } - legend opacity value
 */


exports.getArrayGradientFillColors = getArrayGradientFillColors;

var setLegendOpacity = function setLegendOpacity(_ref15) {
  var opacity = _ref15.opacity;
  return opacity >= 1 ? 1 : opacity > 0.6 ? 0.9 : opacity + 0.2;
};
/**
 * getSuperclusterRadius - determines cluster radius
 * @param { object } param
 * @param { number } param.zoom - viewstate zoom
 * @param { number } param.sizeScale - scale for cluster radius size
 * @returns { number  } - cluster radius in pixels
 */


exports.setLegendOpacity = setLegendOpacity;

var getSuperclusterRadius = function getSuperclusterRadius(_ref16) {
  var zoom = _ref16.zoom,
      _ref16$sizeScale = _ref16.sizeScale,
      sizeScale = _ref16$sizeScale === void 0 ? _constants.CLUSTER_SIZE_SCALE : _ref16$sizeScale;
  return zoom > 15 ? sizeScale / 2 : sizeScale;
};
/**
 * setLegendConfigs - set config objects for all legends of a map layer
 * @param { object } param
 * @param { string } param.elevationBasedOn - data attribute key for elevation
 * @param { string } param.fillBasedOn - data attribute key for fill
 * @param { array } param.fillColors - array of string or array colors
 * @param { string } param.objColor - string format colour 'rgb(r, g, b, opacity)'
 * @param { string } param.radiusBasedOn - data attribute key for radius
 * @param { array } param.data - data array
 * @param { function } param.dataPropertyAccessor - function to access data attribute values in the data objects
 * @param { object } param.legendProps - various other legend props:
 *               {metricAliases, formatLegendTitle, formatPropertyLabel,formatData, symbolLineColor}
 * @returns { array  } - array of legend config objects
 */


exports.getSuperclusterRadius = getSuperclusterRadius;

var setLegendConfigs = function setLegendConfigs(_ref17) {
  var _ref17$elevationBased = _ref17.elevationBasedOn,
      elevationBasedOn = _ref17$elevationBased === void 0 ? '' : _ref17$elevationBased,
      _ref17$fillBasedOn = _ref17.fillBasedOn,
      fillBasedOn = _ref17$fillBasedOn === void 0 ? '' : _ref17$fillBasedOn,
      fillColors = _ref17.fillColors,
      _ref17$objColor = _ref17.objColor,
      objColor = _ref17$objColor === void 0 ? '' : _ref17$objColor,
      _ref17$radiusBasedOn = _ref17.radiusBasedOn,
      radiusBasedOn = _ref17$radiusBasedOn === void 0 ? '' : _ref17$radiusBasedOn,
      _ref17$data = _ref17.data,
      data = _ref17$data === void 0 ? [] : _ref17$data,
      _ref17$dataPropertyAc = _ref17.dataPropertyAccessor,
      dataPropertyAccessor = _ref17$dataPropertyAc === void 0 ? function (d) {
    return d;
  } : _ref17$dataPropertyAc,
      legendProps = _objectWithoutProperties(_ref17, ["elevationBasedOn", "fillBasedOn", "fillColors", "objColor", "radiusBasedOn", "data", "dataPropertyAccessor"]);

  var _ref18 = fillColors && typeof fillColors === 'string' ? [fillColors, fillColors] : [(fillColors === null || fillColors === void 0 ? void 0 : fillColors[0]) || objColor, (fillColors === null || fillColors === void 0 ? void 0 : fillColors[1]) || objColor],
      _ref19 = _slicedToArray(_ref18, 2),
      minColor = _ref19[0],
      maxColor = _ref19[1];

  var legends = [];

  if (fillBasedOn.length && data !== null && data !== void 0 && data.length) {
    // TODO support quantile/quantize
    // i.e. different lengths of fillColors[]
    var dataRange = getDataRange({
      data: data,
      dataKey: fillBasedOn,
      dataPropertyAccessor: dataPropertyAccessor
    });
    legends.push(_objectSpread({
      minColor: minColor,
      maxColor: maxColor,
      type: 'gradient',
      min: dataRange[0],
      max: dataRange[1],
      label: fillBasedOn
    }, legendProps));
  }

  if (elevationBasedOn.length && data !== null && data !== void 0 && data.length) {
    var _dataRange = getDataRange({
      data: data,
      dataKey: elevationBasedOn,
      dataPropertyAccessor: dataPropertyAccessor
    });

    legends.push(_objectSpread({
      type: 'elevation',
      minColor: minColor,
      maxColor: maxColor,
      min: _dataRange[0],
      max: _dataRange[1],
      label: elevationBasedOn
    }, legendProps));
  }

  if (radiusBasedOn.length && data !== null && data !== void 0 && data.length) {
    var _dataRange2 = getDataRange({
      data: data,
      dataKey: radiusBasedOn,
      dataPropertyAccessor: dataPropertyAccessor
    });

    legends.push(_objectSpread({
      minColor: minColor,
      maxColor: maxColor,
      type: 'size',
      dots: 5,
      size: 5,
      zeroRadiusSize: 20,
      min: _dataRange2[0],
      max: _dataRange2[1],
      label: radiusBasedOn
    }, legendProps));
  }

  return legends;
};

exports.setLegendConfigs = setLegendConfigs;