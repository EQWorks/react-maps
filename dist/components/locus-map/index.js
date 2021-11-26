"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mapProps = require("../../shared/map-props");

var _hooks = require("./hooks");

var _utils = require("./utils");

var _genericMap = _interopRequireDefault(require("../generic-map"));

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _tooltipNode = _interopRequireDefault(require("../tooltip/tooltip-node"));

var _legend = _interopRequireDefault(require("../legend"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var LocusMap = function LocusMap(_ref) {
  var dataConfig = _ref.dataConfig,
      layerConfig = _ref.layerConfig,
      mapConfig = _ref.mapConfig;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      viewStateOverride = _useState2[0],
      setViewOverride = _useState2[1];

  var _useState3 = (0, _react.useState)({}),
      _useState4 = _slicedToArray(_useState3, 2),
      _useState4$ = _useState4[0],
      height = _useState4$.height,
      width = _useState4$.width,
      setDimensions = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedFeatureIndexes = _useState6[0],
      setSelectedFeatureIndexes = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      selectShape = _useState8[0],
      setSelectShape = _useState8[1]; // set controller for Map comp


  var controller = (0, _react.useMemo)(function () {
    var layerList = layerConfig.reduce(function (agg, layer) {
      return [].concat(_toConsumableArray(agg), [layer.layer]);
    }, []);

    if (layerList !== null && layerList !== void 0 && layerList.includes('select')) {
      return {
        doubleClickZoom: false
      };
    }

    return {
      controller: true
    };
  }, [layerConfig]); // set state for layers and data

  var _useReducer = (0, _react.useReducer)(function (state, _ref2) {
    var type = _ref2.type,
        payload = _ref2.payload;

    if (type === 'init') {
      var _dataConfig = payload.dataConfig,
          _layerConfig = payload.layerConfig; // ====[NOTE] ids are for single-use sessions
      // ====[TODO] more thorough ID functions

      var dataIdMap = {};

      var data = _dataConfig.reduce(function (agg, _ref3, i) {
        var id = _ref3.id,
            data = _ref3.data;
        var newId = "data-".concat(new Date().getTime(), "-").concat(i);
        dataIdMap[id] = newId;
        return _objectSpread(_objectSpread({}, agg), {}, _defineProperty({}, newId, data));
      }, {});

      var _layers = _layerConfig.reduce(function (agg, layer, i) {
        var id = "layer-".concat(layer.layer, "-").concat(new Date().getTime(), "-").concat(i); // ====[TODO] fallback for invalid/missing dataId

        return _objectSpread(_objectSpread({}, agg), {}, _defineProperty({}, id, {
          config: layer,
          deckLayer: (0, _utils.parseDeckGLLayerFromConfig)(_objectSpread(_objectSpread({}, layer), {}, {
            selectedFeatureIndexes: selectedFeatureIndexes,
            setSelectShape: setSelectShape,
            id: id
          }))(data[dataIdMap[layer.dataId]])
        }));
      }, {});

      return _objectSpread(_objectSpread({}, state), {}, {
        data: data,
        layers: _layers
      });
    }

    if (type === 'select') {
      var _data = payload.data;
      var _layers2 = state.layers;
      var selectLayer = {};

      for (var id in _layers2) {
        if (_layers2[id].config.layer === 'select') {
          selectLayer = _defineProperty({}, id, _objectSpread(_objectSpread({}, _layers2[id]), {}, {
            deckLayer: (0, _utils.parseDeckGLLayerFromConfig)(_objectSpread(_objectSpread({}, _layers2[id].config), {}, {
              id: id,
              selectedFeatureIndexes: selectedFeatureIndexes,
              setSelectShape: setSelectShape
            }))(_data)
          }));
        }
      }

      return _objectSpread(_objectSpread({}, state), {}, {
        layers: _objectSpread(_objectSpread({}, _layers2), selectLayer)
      });
    }

    return state;
  }, {
    data: {},
    layers: {}
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      layers = _useReducer2[0].layers,
      configurableLayerDispatch = _useReducer2[1]; // set initial layers and their corresponding data


  (0, _react.useEffect)(function () {
    configurableLayerDispatch({
      type: 'init',
      payload: {
        layerConfig: layerConfig,
        dataConfig: dataConfig
      }
    });
  }, [layerConfig, dataConfig]); // adjust viewport based on data

  (0, _react.useEffect)(function () {
    if (width && height) {
      var _dataGeomList;

      // recenter based on data
      var dataGeomList = [];
      layerConfig.forEach(function (layer) {
        if (!['arc', 'MVT', 'select'].includes(layer.layer)) {
          var _dataConfig$filter$;

          var data = dataConfig === null || dataConfig === void 0 ? void 0 : (_dataConfig$filter$ = dataConfig.filter(function (elem) {
            return elem.id === layer.dataId;
          })[0]) === null || _dataConfig$filter$ === void 0 ? void 0 : _dataConfig$filter$.data;

          if (data !== null && data !== void 0 && data.length) {
            dataGeomList = [].concat(_toConsumableArray(dataGeomList), [_objectSpread({
              data: data
            }, layer.geometry)]);
          }
        }
      });
      var dataView = (_dataGeomList = dataGeomList) !== null && _dataGeomList !== void 0 && _dataGeomList.length ? (0, _utils.setView)({
        dataGeomList: dataGeomList,
        width: width,
        height: height
      }) : {}; // don't adjust viewport when we select data on map by drawing shapes

      if (!selectShape.length) {
        setViewOverride(function (o) {
          return _objectSpread(_objectSpread({}, o), dataView);
        });
      }
    }
  }, [dataConfig, layerConfig, selectShape, height, width]); // update state for 'select' layer

  (0, _react.useEffect)(function () {
    var selectActive = layerConfig.find(function (layer) {
      return layer.layer === 'select';
    });

    if (selectActive && selectShape.length) {
      setSelectedFeatureIndexes([0]);
      configurableLayerDispatch({
        type: 'select',
        payload: {
          data: selectShape
        }
      });
    }
  }, [layerConfig, selectShape]); // get all config data for all layer legends

  var legends = (0, _hooks.useLegends)({
    dataConfig: dataConfig,
    layerConfig: layerConfig
  }); // set legend element

  var legend = (0, _react.useMemo)(function () {
    return mapConfig.showMapLegend && (mapConfig.legendNode || (legends === null || legends === void 0 ? void 0 : legends.length) > 0 && /*#__PURE__*/_react["default"].createElement(_legend["default"], _extends({
      legends: legends
    }, mapConfig)));
  }, [legends, mapConfig]);
  return /*#__PURE__*/_react["default"].createElement(_genericMap["default"], _extends({
    layers: Object.values(layers).map(function (o) {
      return o.deckLayer;
    }),
    setDimensionsCb: function setDimensionsCb(o) {
      return setDimensions(o);
    },
    viewStateOverride: viewStateOverride,
    controller: controller
  }, mapConfig, {
    getCursor: mapConfig.cursor ? mapConfig.cursor(Object.values(layers).map(function (o) {
      return o.deckLayer;
    })) : function () {},
    showTooltip: mapConfig.showMapTooltip,
    renderTooltip: function renderTooltip(_ref4) {
      var hoverInfo = _ref4.hoverInfo;

      var _getTooltipParams = (0, _utils.getTooltipParams)({
        hoverInfo: hoverInfo
      }),
          tooltipProps = _getTooltipParams.tooltipProps,
          tooltipParams = _objectWithoutProperties(_getTooltipParams, ["tooltipProps"]);

      var objMVTData = hoverInfo.layer.id.includes('MVT') ? (0, _utils.getObjectMVTData)({
        dataConfig: dataConfig,
        hoverInfo: hoverInfo
      }) : {};
      return /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
        info: hoverInfo,
        tooltipProps: tooltipProps,
        typography: (mapConfig === null || mapConfig === void 0 ? void 0 : mapConfig.typography) || _mapProps.typographyDefaultProps.typography
      }, mapConfig.tooltipNode || (0, _tooltipNode["default"])(_objectSpread(_objectSpread({}, tooltipParams), {}, {
        params: _objectSpread(_objectSpread({}, hoverInfo.object), {}, {
          properties: _objectSpread(_objectSpread({}, hoverInfo.object.properties), objMVTData)
        })
      })));
    },
    legend: legend
  }));
};

LocusMap.propTypes = _objectSpread({
  dataConfig: _propTypes["default"].array.isRequired,
  layerConfig: _propTypes["default"].array.isRequired,
  mapConfig: _propTypes["default"].shape({
    cursor: _propTypes["default"].func,
    legendPosition: _propTypes["default"].oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
    legendSize: _propTypes["default"].oneOf(['full', 'widget']),
    legendNode: _propTypes["default"].node,
    showMapLegend: _propTypes["default"].bool,
    tooltipNode: _propTypes["default"].node,
    showMapTooltip: _propTypes["default"].bool,
    mapboxApiAccessToken: _propTypes["default"].string.isRequired,
    typography: _propTypes["default"].object
  }).isRequired
}, _mapProps.typographyPropTypes);
LocusMap.defaultProps = _objectSpread({}, _mapProps.typographyDefaultProps);
var _default = LocusMap;
exports["default"] = _default;