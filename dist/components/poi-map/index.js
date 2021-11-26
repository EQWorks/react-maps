"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react2 = _interopRequireDefault(require("@deck.gl/react"));

var _newDeckGlCore = require("new-deck-gl-core");

var _reactMapGl = require("react-map-gl");

var _reactMapGlGeocoder = _interopRequireDefault(require("react-map-gl-geocoder"));

var _core = require("@material-ui/core");

var _lumenUi = require("@eqworks/lumen-ui");

var _goober = require("goober");

var _drawButtonGroup = _interopRequireDefault(require("./draw-button-group"));

var _tooltip = _interopRequireDefault(require("../tooltip"));

var _tooltipNode = _interopRequireDefault(require("../tooltip/tooltip-node"));

var _utils = require("./utils");

var _utils2 = require("../../shared/utils");

var _utils3 = require("../../utils");

var _mapProps = require("../../shared/map-props");

var _constants = require("../../constants");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

(0, _goober.setup)(_react["default"].createElement);
var MapWrapper = (0, _goober.styled)('div')(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n"])));
var SwitchContainerCluster = (0, _goober.styled)('div')(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  position: absolute;\n  margin: 10px;\n  z-index: 1;\n  background-color: white;\n  border-radius: 3px;\n  padding: 5px;\n"])));
var SwitchContainerRadius = (0, _goober.styled)('div')(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  position: absolute;\n  margin: 10px;\n  margin-top: ", "px;\n  z-index: 1;\n  background-color: white;\n  border-radius: 3px;\n  padding: 5px;\n"])), function (props) {
  return props.clusterswitch ? 50 : 10;
});
var DrawButtonContainer = (0, _goober.styled)('div')(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  position: absolute;\n  right: 15px;\n  z-index: 1;\n  background-color: white;\n  border-radius: 3px;\n"])));
var MapContainer = (0, _goober.styled)('div', _react.forwardRef)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  padding: 15px;\n  width: 100%;\n  height: 100%;\n  position: absolute;\n"]))); // initial map view

var INIT_VIEW_STATE = {
  pitch: 25,
  bearing: 0,
  transitionDuration: 2000,
  transitionInterpolator: new _newDeckGlCore.FlyToInterpolator(),
  latitude: 52,
  longitude: -100,
  zoom: 2.5,
  minZoom: 0
}; // initial map view for drawing mode

var INIT_VIEW_CREATE_STATE = {
  pitch: 25,
  bearing: 0,
  transitionDuration: 2000,
  transitionInterpolator: new _newDeckGlCore.FlyToInterpolator(),
  latitude: 43.661539,
  longitude: -79.361079,
  zoom: 5
};
var INIT_VIEW = {
  display: INIT_VIEW_STATE,
  edit: INIT_VIEW_STATE,
  create: INIT_VIEW_CREATE_STATE,
  draw: INIT_VIEW_CREATE_STATE,
  emptyMap: INIT_VIEW_STATE
}; // DeckGL React component

var POIMap = function POIMap(_ref) {
  var _activePOI$properties3;

  var POIData = _ref.POIData,
      activePOI = _ref.activePOI,
      setActivePOI = _ref.setActivePOI,
      setDraftActivePOI = _ref.setDraftActivePOI,
      onClickHandle = _ref.onClickHandle,
      mode = _ref.mode,
      cluster = _ref.cluster,
      controller = _ref.controller,
      tooltipKeys = _ref.tooltipKeys,
      tooltipProps = _ref.tooltipProps,
      mapProps = _ref.mapProps,
      typography = _ref.typography,
      mapboxApiAccessToken = _ref.mapboxApiAccessToken,
      forwardGeocoder = _ref.forwardGeocoder,
      geocoderOnResult = _ref.geocoderOnResult,
      dataPropertyAccessor = _ref.dataPropertyAccessor,
      formatTooltipTitle = _ref.formatTooltipTitle,
      formatPropertyLabel = _ref.formatPropertyLabel,
      formatData = _ref.formatData;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedFeatureIndexes = _useState4[0],
      setSelectedFeatureIndexes = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      showIcon = _useState6[0],
      setShowIcon = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      createDrawMode = _useState8[0],
      setCreateDrawMode = _useState8[1];

  var _useState9 = (0, _react.useState)(true),
      _useState10 = _slicedToArray(_useState9, 2),
      allowDrawing = _useState10[0],
      setAllowDrawing = _useState10[1];

  var _useState11 = (0, _react.useState)({}),
      _useState12 = _slicedToArray(_useState11, 2),
      onClickPayload = _useState12[0],
      setOnClickPayload = _useState12[1];

  var _useState13 = (0, _react.useState)(null),
      _useState14 = _slicedToArray(_useState13, 2),
      hoverInfo = _useState14[0],
      setHoverInfo = _useState14[1];

  var _useState15 = (0, _react.useState)(INIT_VIEW_STATE.zoom),
      _useState16 = _slicedToArray(_useState15, 2),
      zoom = _useState16[0],
      setZoom = _useState16[1];

  var _useState17 = (0, _react.useState)(),
      _useState18 = _slicedToArray(_useState17, 2),
      viewportBBOX = _useState18[0],
      setViewportBBOX = _useState18[1];

  var _useState19 = (0, _react.useState)(false),
      _useState20 = _slicedToArray(_useState19, 2),
      showRadius = _useState20[0],
      setShowRadius = _useState20[1];

  var _useState21 = (0, _react.useState)(false),
      _useState22 = _slicedToArray(_useState21, 2),
      showClusters = _useState22[0],
      setShowClusters = _useState22[1];

  var _useState23 = (0, _react.useState)(false),
      _useState24 = _slicedToArray(_useState23, 2),
      clusterZoom = _useState24[0],
      setClusterZoom = _useState24[1]; // used to block reset of view state when we transition from the cluster to the icon layer


  var _useState25 = (0, _react.useState)(),
      _useState26 = _slicedToArray(_useState25, 2),
      layerVisibleData = _useState26[0],
      setLayerVisibleData = _useState26[1];

  var mapContainerRef = (0, _react.useRef)();
  var deckRef = (0, _react.useRef)();
  var mapRef = (0, _react.useRef)();

  var _useState27 = (0, _react.useState)({}),
      _useState28 = _slicedToArray(_useState27, 2),
      _useState28$ = _useState28[0],
      width = _useState28$.width,
      height = _useState28$.height,
      setDimensions = _useState28[1]; // React hook that sets POIType


  var POIType = (0, _react.useMemo)(function () {
    var _activePOI$properties, _POIData$, _POIData$$properties;

    if (mode === 'create-point') {
      return _constants.TYPE_RADIUS.code;
    }

    if (mode === 'create-polygon') {
      return _constants.TYPE_POLYGON.code;
    }

    return activePOI !== null && activePOI !== void 0 && (_activePOI$properties = activePOI.properties) !== null && _activePOI$properties !== void 0 && _activePOI$properties.poiType ? activePOI.properties.poiType : (_POIData$ = POIData[0]) === null || _POIData$ === void 0 ? void 0 : (_POIData$$properties = _POIData$.properties) === null || _POIData$$properties === void 0 ? void 0 : _POIData$$properties.poiType;
  }, [mode, activePOI, POIData]); // React Hook to handle setting up data for DeckGL layers

  (0, _react.useEffect)(function () {
    var _activePOI$properties2;

    // remove created activePOI from data list if it was added to POI list in poi-manage
    if (mode === 'empty' || !mode || mode === 'create-polygon' && !(activePOI !== null && activePOI !== void 0 && activePOI.properties)) {
      setData([]);
    }

    if (!(activePOI !== null && activePOI !== void 0 && activePOI.properties) && !showIcon) {
      setData(POIData);
    }

    if (mode === 'display' && activePOI !== null && activePOI !== void 0 && activePOI.properties || mode === 'edit' && POIType === _constants.TYPE_POLYGON.code || mode === 'create-point' && activePOI !== null && activePOI !== void 0 && (_activePOI$properties2 = activePOI.properties) !== null && _activePOI$properties2 !== void 0 && _activePOI$properties2.radius) {
      setData([activePOI]); // disable drawing mode when we have edited radius so we can display radius on map

      setCreateDrawMode(false);
    }

    if (mode === 'edit' && POIType === _constants.TYPE_RADIUS.code) {
      /**
       * in order to edit the radius of a poi on the map, we create a new GeoJSON circle / polygon
       * feature, based on the poi coordinates and its radius
       */
      var centre = activePOI.geometry.coordinates;
      var radius = activePOI.properties.radius;
      var createdCircle = (0, _utils2.createCircleFromPointRadius)({
        centre: centre,
        radius: radius
      });
      setData([{
        geometry: createdCircle.geometry,
        properties: _objectSpread(_objectSpread({}, activePOI.properties), createdCircle.properties),
        // keep previous coordinates in order to edit radius based on the centroid of poi
        prevCoordinates: activePOI.geometry.coordinates
      }]);
    }
  }, [POIData, activePOI, activePOI === null || activePOI === void 0 ? void 0 : (_activePOI$properties3 = activePOI.properties) === null || _activePOI$properties3 === void 0 ? void 0 : _activePOI$properties3.radius, mode, POIType, showIcon]); // React hook that sets mapLayers - the layers used by POIMap during various map modes

  var mapLayers = (0, _react.useMemo)(function () {
    if (mode === 'empty') {
      return [];
    }

    if (mode === 'edit' || mode.endsWith('-draw') || createDrawMode) {
      // this allows displaying an icon on the POI location found by Geodeocder and when drawing a Polygon
      if (mode === 'create-polygon') {
        var _data$, _data$$geometry;

        // only show POIIcon layer when we have a 'Point' feature as data[0] = activePOI while drawing POIs
        if (((_data$ = data[0]) === null || _data$ === void 0 ? void 0 : (_data$$geometry = _data$.geometry) === null || _data$$geometry === void 0 ? void 0 : _data$$geometry.type) === 'Point') {
          return ['POIEditDraw', 'POIIcon'];
        }

        return ['POIEditDraw'];
      }

      if (mode === 'create-point') {
        return ['POIEditDraw', 'POIIcon'];
      }

      return ['POIEditDraw'];
    }

    if (POIType === _constants.TYPE_RADIUS.code) {
      var _data$2, _data$2$properties;

      if (showRadius || mode === 'create-point' && (_data$2 = data[0]) !== null && _data$2 !== void 0 && (_data$2$properties = _data$2.properties) !== null && _data$2$properties !== void 0 && _data$2$properties.radius) {
        return ['POIGeoJson', 'POIIcon'];
      }

      if (cluster && showClusters && clusterZoom) {
        return ['POICluster'];
      }

      return ['POIIcon'];
    }

    if (POIType === _constants.TYPE_POLYGON.code) {
      // we show an icon when the geocoder finds only a 'Point' feature and wants to display location on map
      if (showIcon) {
        return ['POIIcon'];
      }

      return ['POIGeoJson'];
    }

    return [];
  }, [mode, data, cluster, showClusters, clusterZoom, POIType, createDrawMode, showRadius, showIcon]); // define mapMode to separate functionality

  var mapMode = (0, _react.useMemo)(function () {
    var _data$3, _data$3$properties;

    // drawing mode has an empty data set, so we need to set mapMode for drawing before the next case
    if (mode.endsWith('-draw') || createDrawMode) {
      return 'draw';
    }

    if (mode.startsWith('create-')) {
      return 'create';
    }

    if (mode === 'empty' || !mode) {
      return 'emptyMap';
    } // this has to be set before editing modes, otherwise we change the map view while editing


    if ((_data$3 = data[0]) !== null && _data$3 !== void 0 && (_data$3$properties = _data$3.properties) !== null && _data$3$properties !== void 0 && _data$3$properties.isOnMapEditing) {
      return 'isOnMapEditing';
    }

    return mode;
  }, [mode, createDrawMode, data]); // set viewParam for different map modes
  // this means that we don't reset viewPort during drawing

  var viewParam = (0, _react.useMemo)(function () {
    return {
      display: {
        type: 'data view',
        payload: {
          data: data,
          height: height,
          width: width
        }
      },
      edit: {
        type: 'edit',
        payload: {
          data: data,
          height: height,
          width: width
        }
      },
      create: {
        type: 'create',
        payload: {
          data: data,
          height: height,
          width: width
        }
      },
      // we don't adjust view during editing
      isOnMapEditing: {},
      draw: {},
      emptyMap: {
        type: 'empty map',
        payload: INIT_VIEW[mapMode]
      }
    };
  }, [data, height, width, mapMode]); // React hook that selects feature when map is in editing mode

  (0, _react.useEffect)(function () {
    if (['edit', 'isOnMapEditing'].includes(mapMode)) {
      setSelectedFeatureIndexes([0]);
    }
  }, [mapMode]);
  /**
   * onClick - React hook that handles various in-house and custom onClick methods
   * @param { object } param - object of deck.gl click event
   * @param { object } param.object - clicked object on map
   * @param { object } param.layer - deck.gl layer
   * @param { array } param.coordinate - coordinates of the clicked object
   */

  var onClick = (0, _react.useCallback)(function (_ref2) {
    var object = _ref2.object,
        layer = _ref2.layer,
        coordinate = _ref2.coordinate;

    // if clicked object is a cluster, zoom in
    if (object !== null && object !== void 0 && object.cluster) {
      var _coordinate = _slicedToArray(coordinate, 2),
          longitude = _coordinate[0],
          latitude = _coordinate[1];

      setOnClickPayload({
        longitude: longitude,
        latitude: latitude,
        zoom: layer.state.z + 2
      }); // if clicked object is a point on the map, set it as activePOI and zoom in
    } else if (object !== null && object !== void 0 && object.type) {
      var _data = [object];

      var _ref3 = _toConsumableArray(Object.values((0, _utils2.setView)({
        data: _data,
        height: height,
        width: width
      }))),
          _longitude = _ref3[0],
          _latitude = _ref3[1],
          _zoom = _ref3[2];

      setActivePOI(object);
      setOnClickPayload({
        longitude: _longitude,
        latitude: _latitude,
        zoom: _zoom
      });
    } else {
      // custom onClick
      onClickHandle({
        object: object,
        layer: layer,
        coordinate: coordinate
      }, setOnClickPayload);
    }
  }, [setActivePOI, onClickHandle, height, width]);
  /**
   * onHover - React hook that handles onHover event
   * @param { object } info - object received during onHover event
   */

  var onHover = (0, _react.useCallback)(function (info) {
    var _object$properties;

    var object = info.object;

    if (object !== null && object !== void 0 && (_object$properties = object.properties) !== null && _object$properties !== void 0 && _object$properties.id && !(object !== null && object !== void 0 && object.cluster)) {
      setHoverInfo(_objectSpread({}, info));
    } else {
      setHoverInfo(null);
    }
  }, []); // state viewState

  var _useReducer = (0, _react.useReducer)(function (state, _ref4) {
    var type = _ref4.type,
        payload = _ref4.payload;

    if (['data view', 'edit', 'create'].includes(type)) {
      return {
        viewState: _objectSpread(_objectSpread({}, state.viewState), (0, _utils2.setView)(payload))
      };
    }

    if (type === 'onClick') {
      return {
        viewState: _objectSpread(_objectSpread({}, state.viewState), payload)
      };
    }

    if (type === 'empty map') {
      return {
        viewState: payload
      };
    }

    return state;
  }, {
    viewState: INIT_VIEW[mapMode]
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      viewState = _useReducer2[0].viewState,
      viewStateDispatch = _useReducer2[1]; // FIX: FlyToInterpolator doesn't seem to be trigerred when transitioning from empty map to some data
  // React Hook to handle setting up viewState based on POIs coordinates and deck map container size


  (0, _react.useLayoutEffect)(function () {
    if ((mapMode === 'emptyMap' && !(data !== null && data !== void 0 && data.length) || data !== null && data !== void 0 && data.length) && viewParam && mapMode && width && height) {
      viewStateDispatch(viewParam[mapMode]);
    }
  }, [data, width, height, viewParam, mapMode]); // React Hook to update viewState for onClick events

  (0, _react.useEffect)(function () {
    viewStateDispatch({
      type: 'onClick',
      payload: onClickPayload
    });
  }, [onClickPayload]);
  /**
   * updatePOI - React hook that updates data on the map and activePOI with the edited / drawn features
   * @param { array } editedPOIList - updated / drawn feature list
   * @param { string } editType - type of edit
   * @param { array } prevCoordinates - previous coordinates of a POI
   */

  var updatePOI = (0, _react.useCallback)(function (_ref5) {
    var editedPOIList = _ref5.editedPOIList,
        editType = _ref5.editType,
        prevCoordinates = _ref5.prevCoordinates;
    // we signal the map that we are actively editing so the map doesn't adjust view
    editedPOIList[0].properties.isOnMapEditing = true;
    var editedRadius = null;
    var editedCoordinates = null;
    var editedPOI = editedPOIList[0];
    /**
     * If we change radius of a poi, we keep previous coordinates of the edited circle and calculate
     * new circle coordinates based on the edited radius. We do this because nebula.gl TransformMode
     * scales objects relative to a point of a surrounding box and not relative to the object's centroid.
     * https://nebula.gl/geojson-editor/
     */
    // case: scale

    if (editType.includes('scal')) {
      // change only radius, not coordinates; recalculate circle points for new radius to show on the map
      editedPOI = activePOI;
      editedRadius = (0, _utils2.getCircleRadiusCentroid)({
        polygon: editedPOIList[0]
      }).radius;
      var createdCircle = (0, _utils2.createCircleFromPointRadius)({
        centre: prevCoordinates,
        radius: editedRadius
      });
      editedPOIList = [{
        geometry: createdCircle.geometry,
        properties: _objectSpread(_objectSpread({}, editedPOIList[0].properties), {}, {
          editradius: editedRadius,
          radius: editedRadius
        }),
        prevCoordinates: prevCoordinates
      }];
    } // case: translate


    if (editType.includes('transl')) {
      var _getCircleRadiusCentr = (0, _utils2.getCircleRadiusCentroid)({
        polygon: editedPOIList[0]
      }),
          coordinates = _getCircleRadiusCentr.coordinates;

      editedPOI = activePOI;
      editedCoordinates = {
        editedlon: coordinates[0],
        editedlat: coordinates[1]
      };
      editedPOIList[0].prevCoordinates = coordinates;
    } // case: rotate


    if (editType.includes('rot')) {
      editedPOI = activePOI;
    } // allow only one POI to be drawn in POI create modes; keep last drawn point


    if (mode.startsWith('create-')) {
      editedPOI = editedPOIList.pop();
      editedPOIList = [editedPOI];
    }

    setData(editedPOIList);
    setDraftActivePOI({
      editedPOI: editedPOI,
      editedRadius: editedRadius,
      editedCoordinates: editedCoordinates
    });
  }, [activePOI, mode, setDraftActivePOI]); // layerPool - array of potential layer names

  var layerPool = (0, _react.useMemo)(function () {
    return createDrawMode || mode === 'edit' || mode.endsWith('-draw') ? ['POIGeoJson', 'POIEditDraw', 'POIIcon', 'POICluster'] : // don't include POIEditDraw layer for editing or drawing unless needed
    ['POIGeoJson', 'POIIcon', 'POICluster'];
  }, [mode, createDrawMode]); // set layers for DeckGL map
  // don't set layers for display and edit modes unless we have POIs in data

  var layers = (0, _react.useMemo)(function () {
    if (data !== null && data !== void 0 && data.length && (mode === 'display' || mode === 'edit' && selectedFeatureIndexes.length) || mode.endsWith('-draw') || mode.startsWith('create-')) {
      return (0, _utils.processLayers)({
        mapLayers: mapLayers,
        layerPool: layerPool,
        props: {
          mapProps: mapProps,
          data: data,
          updatePOI: updatePOI,
          onClick: onClick,
          onHover: onHover,
          mode: mode,
          POIType: POIType,
          zoom: zoom,
          selectedFeatureIndexes: selectedFeatureIndexes
        }
      });
    }

    return [];
  }, [mapLayers, layerPool, mapProps, data, updatePOI, onClick, onHover, mode, POIType, zoom, selectedFeatureIndexes]);
  var getCurrentCursor = (0, _utils3.getCursor)({
    layers: layers
  }); // set state for clusterZoom

  (0, _react.useEffect)(function () {
    if (cluster && showClusters && layerVisibleData !== null && layerVisibleData !== void 0 && layerVisibleData.length && viewportBBOX !== null && viewportBBOX !== void 0 && viewportBBOX.length && zoom) {
      setClusterZoom((0, _utils.isClusterZoomLevel)({
        layerVisibleData: layerVisibleData,
        viewportBBOX: viewportBBOX,
        zoom: zoom
      }));
    }
  }, [cluster, showClusters, layerVisibleData, viewportBBOX, zoom]); // hide radius switch when we have clusters enabled and cluster level zoom

  (0, _react.useEffect)(function () {
    if (cluster && clusterZoom && showClusters) {
      setShowRadius(false);
    }
  }, [cluster, showClusters, clusterZoom]);
  /**
   * finalTooltipKeys - React hook that returns an object of keys for MapTooltip component
   * @returns { object } - object of tooltip keys
   * { name, id, metricKeys, metricAliases, nameAccessor, idAccessor, metricAccessor}
   */

  var finalTooltipKeys = (0, _react.useMemo)(function () {
    var id = tooltipKeys.id,
        idAccessor = tooltipKeys.idAccessor,
        name = tooltipKeys.name,
        nameAccessor = tooltipKeys.nameAccessor;
    var metricKeysArray = (tooltipKeys === null || tooltipKeys === void 0 ? void 0 : tooltipKeys.metricKeys) || ['lon', 'lat'];
    return _objectSpread(_objectSpread({}, tooltipKeys), {}, {
      id: id || 'id',
      idAccessor: idAccessor || dataPropertyAccessor,
      name: name || 'name',
      nameAccessor: nameAccessor || dataPropertyAccessor,
      metricKeys: metricKeysArray,
      metricAccessor: dataPropertyAccessor
    });
  }, [tooltipKeys, dataPropertyAccessor]); // mapCanRender - conditions to render the map

  var mapCanRender = Boolean((0, _react.useMemo)(function () {
    var _data$4, _data$4$properties;

    return mapLayers.includes('POIEditDraw') && ((_data$4 = data[0]) === null || _data$4 === void 0 ? void 0 : (_data$4$properties = _data$4.properties) === null || _data$4$properties === void 0 ? void 0 : _data$4$properties.poiType) === _constants.TYPE_POLYGON.code || !mapLayers.includes('POIEditDraw') && data.length || // cases for empty map
    mode === 'empty' || !POIData.length;
  }, [data, POIData, mapLayers, mode]));
  return /*#__PURE__*/_react["default"].createElement(MapWrapper, null, POIType === _constants.TYPE_RADIUS.code && cluster && mapMode === 'display' && (data === null || data === void 0 ? void 0 : data.length) > 1 && /*#__PURE__*/_react["default"].createElement(SwitchContainerCluster, null, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    control: /*#__PURE__*/_react["default"].createElement(_lumenUi.Switch, {
      checked: showClusters,
      onChange: function onChange() {
        if (!showClusters) {
          var _deckRef$current, _deckRef$current2, _deckRef$current2$dec;

          setLayerVisibleData(deckRef === null || deckRef === void 0 ? void 0 : (_deckRef$current = deckRef.current) === null || _deckRef$current === void 0 ? void 0 : _deckRef$current.pickObjects({
            x: 0,
            y: 0,
            width: width,
            height: height
          }));

          var _viewState = deckRef === null || deckRef === void 0 ? void 0 : (_deckRef$current2 = deckRef.current) === null || _deckRef$current2 === void 0 ? void 0 : (_deckRef$current2$dec = _deckRef$current2.deck.viewState) === null || _deckRef$current2$dec === void 0 ? void 0 : _deckRef$current2$dec['default-view'];

          setZoom(_viewState.zoom);
          setViewportBBOX(new _newDeckGlCore.WebMercatorViewport(_viewState).getBounds());
        }

        setShowClusters(!showClusters);
      }
    }),
    label: "Show Clusters"
  })), POIType === _constants.TYPE_RADIUS.code && (cluster && showClusters && !clusterZoom || cluster && !showClusters || !cluster) && mapMode === 'display' && /*#__PURE__*/_react["default"].createElement(SwitchContainerRadius, {
    clusterswitch: cluster && (data === null || data === void 0 ? void 0 : data.length) > 1 ? 'yes' : undefined
  }, /*#__PURE__*/_react["default"].createElement(_core.FormControlLabel, {
    control: /*#__PURE__*/_react["default"].createElement(_lumenUi.Switch, {
      checked: showRadius,
      onChange: function onChange() {
        return setShowRadius(!showRadius);
      }
    }),
    label: "Show Radius"
  })), /*#__PURE__*/_react["default"].createElement(MapContainer, {
    ref: mapContainerRef
  }, (hoverInfo === null || hoverInfo === void 0 ? void 0 : hoverInfo.object) && /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
    info: hoverInfo,
    tooltipProps: tooltipProps,
    typography: typography
  }, (0, _tooltipNode["default"])({
    tooltipKeys: finalTooltipKeys,
    formatData: formatData,
    formatTooltipTitle: formatTooltipTitle,
    formatPropertyLabel: formatPropertyLabel,
    params: hoverInfo.object.properties
  })), mode.startsWith('create-') && /*#__PURE__*/_react["default"].createElement(DrawButtonContainer, null, /*#__PURE__*/_react["default"].createElement(_drawButtonGroup["default"], {
    mode: mode // delete values of previous editedPOI before starting to draw another POI
    ,
    setDrawModeOn: function setDrawModeOn() {
      if (allowDrawing) {
        setCreateDrawMode(true);
        setDraftActivePOI({
          editedPOI: null
        });
      }
    },
    onErase: function onErase() {
      setData([]);
      setDraftActivePOI({
        editedPOI: null
      });
    }
  })), mapCanRender && /*#__PURE__*/_react["default"].createElement(_react2["default"], {
    ref: deckRef,
    initialViewState: viewState,
    layers: layers,
    controller: controller,
    onLoad: function onLoad() {
      var _deckRef$current3;

      var _deckRef$current$deck = deckRef === null || deckRef === void 0 ? void 0 : (_deckRef$current3 = deckRef.current) === null || _deckRef$current3 === void 0 ? void 0 : _deckRef$current3.deck,
          height = _deckRef$current$deck.height,
          width = _deckRef$current$deck.width;

      setDimensions({
        height: height,
        width: width
      });
    },
    onResize: function onResize(_ref6) {
      var height = _ref6.height,
          width = _ref6.width;
      setDimensions({
        height: height,
        width: width
      });
    }
    /**
     * USE once nebula.gl fixes selectedFeatureIndex out of range value cases (ie [], null)
     * onClick for edit mode to select feature for editing
     * check that selected feature is not a 'guides' sublayer
     * https://github.com/uber/nebula.gl/blob/master/examples/editor/example.js
     * https://nebula.gl/docs/api-reference/layers/editable-geojson-layer
     */
    // onClick={ (info) => {
    //   const index = []
    //   if (['edit', 'isOnMapEditing'].includes(mapMode) && info?.object && !info.isGuide) {
    //     index.push(info.index)
    //     setSelectedFeatureIndexes(index)
    //   }
    //   // we deselect feature during editing when we click outside its limits
    //   if (!info?.object && data[0]) {
    //     setSelectedFeatureIndexes([])
    //     data[0].properties.isOnMapEditing = false
    //   }
    // }}
    ,
    onViewStateChange: function onViewStateChange(o) {
      var viewState = o.viewState;

      if (cluster && showClusters) {
        setZoom(viewState.zoom);
        setViewportBBOX(new _newDeckGlCore.WebMercatorViewport(viewState).getBounds());
      }
    },
    onInteractionStateChange: function onInteractionStateChange(interactionState) {
      var inTransition = interactionState.inTransition;

      if (inTransition) {
        setAllowDrawing(false);
      } else {
        setAllowDrawing(true);
      }

      setHoverInfo(null);
    },
    getCursor: getCurrentCursor,
    onAfterRender: function onAfterRender() {
      if (cluster && showClusters) {
        var _deckRef$current4;

        setLayerVisibleData(deckRef === null || deckRef === void 0 ? void 0 : (_deckRef$current4 = deckRef.current) === null || _deckRef$current4 === void 0 ? void 0 : _deckRef$current4.pickObjects({
          x: 0,
          y: 0,
          width: width,
          height: height
        }));
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactMapGl.StaticMap, {
    ref: mapRef,
    mapboxApiAccessToken: mapboxApiAccessToken
  }, mode.startsWith('create-') && /*#__PURE__*/_react["default"].createElement(_reactMapGlGeocoder["default"], {
    mapRef: mapRef,
    containerRef: mapContainerRef,
    mapboxApiAccessToken: mapboxApiAccessToken,
    inputValue: "",
    marker: false,
    position: "top-left",
    countries: "ca, us",
    language: "en",
    localGeocoder: forwardGeocoder,
    onResult: function onResult(_ref7) {
      var result = _ref7.result;
      // reset state in map before displaying a new geocoder result
      setCreateDrawMode(false);
      setShowIcon(false);
      setDraftActivePOI({
        editedPOI: null
      });
      geocoderOnResult({
        result: result,
        POIType: POIType
      }).then(function (feature) {
        var _feature$geometry;

        setData([feature]);
        /**
         * particular case when we only find a 'Point' feature and not a 'Polygon'
         * and we want to display location on the map
         */

        if (POIType === 1 && (feature === null || feature === void 0 ? void 0 : (_feature$geometry = feature.geometry) === null || _feature$geometry === void 0 ? void 0 : _feature$geometry.type) === 'Point') {
          setShowIcon(true);
        }
      });
    }
  })))));
};

POIMap.propTypes = _objectSpread(_objectSpread(_objectSpread(_objectSpread({
  POIData: _propTypes["default"].array,
  activePOI: _propTypes["default"].object,
  setActivePOI: _propTypes["default"].func,
  setDraftActivePOI: _propTypes["default"].func,
  onClickHandle: _propTypes["default"].func,
  mode: _propTypes["default"].string,
  cluster: _propTypes["default"].bool,
  controller: _propTypes["default"].object,
  forwardGeocoder: _propTypes["default"].func,
  geocoderOnResult: _propTypes["default"].func,
  dataPropertyAccessor: _propTypes["default"].func,
  formatTooltipTitle: _propTypes["default"].func,
  formatPropertyLabel: _propTypes["default"].func,
  formatData: _propTypes["default"].object
}, _mapProps.typographyPropTypes), _mapProps.tooltipPropTypes), _mapProps.POIMapProps), _reactMapGl.StaticMap.propTypes);
POIMap.defaultProps = _objectSpread(_objectSpread(_objectSpread(_objectSpread({
  POIData: [],
  activePOI: null,
  setActivePOI: function setActivePOI() {},
  setDraftActivePOI: function setDraftActivePOI() {},
  onClickHandle: function onClickHandle() {},
  mode: '',
  cluster: false,
  controller: {
    controller: true
  },
  forwardGeocoder: function forwardGeocoder() {},
  geocoderOnResult: function geocoderOnResult() {},
  dataPropertyAccessor: function dataPropertyAccessor(d) {
    return d;
  },
  formatTooltipTitle: function formatTooltipTitle(title) {
    return (0, _utils3.truncate)(title, 20);
  },
  formatPropertyLabel: function formatPropertyLabel(d) {
    return d;
  },
  formatData: _utils3.formatDataPOI
}, _mapProps.typographyDefaultProps), _mapProps.tooltipDefaultProps), _mapProps.POIMapDefaultProps), _reactMapGl.StaticMap.defaultProps);
var _default = POIMap;
exports["default"] = _default;