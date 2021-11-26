"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _layers = require("@nebula.gl/layers");

var _editModes = require("@nebula.gl/edit-modes");

var _constants = require("../../constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var defaultProps = {
  id: 'edit-draw layer',
  pickingRadius: 12,
  visible: false,
  getTentativeLineWidth: 2,
  getEditHandlePointColor: function getEditHandlePointColor() {
    return [182, 38, 40];
  },
  _subLayerProps: {
    geojson: {
      lineWidthScale: 1,
      lineWidthMinPixels: 0,
      lineWidthUnits: 'pixels',
      parameters: {
        depthTest: false
      }
    },
    guides: {
      parameters: {
        depthTest: false
      }
    }
  }
};
var EDIT_DRAW_MODE = {
  'point-draw': _editModes.DrawPointMode,
  'polygon-draw': _editModes.DrawPolygonMode,
  'poi-edit': _editModes.ModifyMode,
  'poi-radius-edit': _editModes.TransformMode
};
/**
 * POIEditDraw - sets the POI editing / drawing layer
 * @param { object } param - props for EditableGeoJsonLayer
 * @param { object } param.mapProps - object of map properties
 * @param { array } param.data - data array
 * @param { function } param.updatePOI - function to update POI during editing
 * @param { string } param.mode - editing / drawing mode
 * @param { number } param.POIType - POI type
 * @param { array } param.selectedFeatureIndexes - array of selected feature indexes
 * @param { array } param.visible - whether the layer is visible or not
 * @returns { instanceOf EditableGeoJsonLayer}
 */

var POIEditDraw = function POIEditDraw(_ref) {
  var _data$;

  var mapProps = _ref.mapProps,
      data = _ref.data,
      updatePOI = _ref.updatePOI,
      mode = _ref.mode,
      POIType = _ref.POIType,
      selectedFeatureIndexes = _ref.selectedFeatureIndexes,
      visible = _ref.visible;
  var editFillColour = mapProps.editFillColour,
      polygonFillColour = mapProps.polygonFillColour,
      editLineColour = mapProps.editLineColour,
      polygonLineColour = mapProps.polygonLineColour,
      lineWidth = mapProps.lineWidth,
      opacity = mapProps.opacity;
  var prevCoordinates = (_data$ = data[0]) === null || _data$ === void 0 ? void 0 : _data$.prevCoordinates;
  var editDrawMode = mode === 'edit' ? POIType === _constants.TYPE_RADIUS.code ? 'poi-radius-edit' : 'poi-edit' : ['create-point', 'point-draw'].includes(mode) ? 'point-draw' : 'polygon-draw';
  return new _layers.EditableGeoJsonLayer(_objectSpread(_objectSpread({}, defaultProps), {}, {
    data: {
      type: 'FeatureCollection',
      features: data
    },
    mode: EDIT_DRAW_MODE[editDrawMode],
    selectedFeatureIndexes: selectedFeatureIndexes,
    onEdit: function onEdit(_ref2) {
      var _updatedData$features;

      var updatedData = _ref2.updatedData,
          editType = _ref2.editType;

      /**
       * need condition here otherwise we get errors when we draw as updatedData.features is updated
       * only when we finish drawing a point or an entire polygon
       */
      if (visible && updatedData !== null && updatedData !== void 0 && (_updatedData$features = updatedData.features) !== null && _updatedData$features !== void 0 && _updatedData$features.length && (!data.length || // these conditions are for calling updatePOI only when we have new edited / created geometries
      data.length && !data.includes(updatedData.features[updatedData.features.length - 1]))) {
        updatePOI({
          editedPOIList: updatedData.features,
          editType: editType,
          prevCoordinates: prevCoordinates
        });
      }
    },
    visible: visible,
    _subLayerProps: _objectSpread(_objectSpread({}, defaultProps._subLayerProps), {}, {
      geojson: _objectSpread(_objectSpread({}, defaultProps._subLayerProps.geojson), {}, {
        data: data,
        getFillColor: function getFillColor() {
          return mode === 'edit' ? editFillColour : polygonFillColour;
        },
        getLineColor: function getLineColor() {
          return mode === 'edit' ? editLineColour : polygonLineColour;
        },
        getLineWidth: function getLineWidth() {
          return lineWidth;
        },
        opacity: opacity,
        getRadius: function getRadius(d) {
          if (POIType === _constants.TYPE_RADIUS.code) {
            return d.properties.radius;
          }

          return null;
        },
        updateTriggers: {
          getFillColor: [mode, editFillColour, polygonFillColour],
          getLineColor: [mode, editLineColour, polygonLineColour],
          getLineWidth: lineWidth,
          getRadius: [POIType, data]
        }
      })
    })
  }));
};

var _default = POIEditDraw;
exports["default"] = _default;