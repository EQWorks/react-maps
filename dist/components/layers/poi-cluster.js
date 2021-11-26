"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _newDeckGlCore = require("new-deck-gl-core");

var _layers = require("@deck.gl/layers");

var _supercluster = _interopRequireDefault(require("supercluster"));

var _cluster = _interopRequireDefault(require("../icons/cluster.json"));

var _cluster2 = _interopRequireDefault(require("../icons/cluster.png"));

var _utils = require("../../shared/utils");

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * getIconName - sets icon name for clusters
 * @param { object } d - POI data point
 * @returns { string } - POI or cluster icon name
 */
var getIconName = function getIconName(d) {
  var size = d.properties.point_count; // if size exists it is a cluster, get right number for icon name

  return size ? "marker-".concat(size < 10 ? size : Math.min(Math.floor(size / 10) * 10, 100)) : 'marker-1';
};
/**
 * getIconSize - sets the icon size for clusters
 * @param { object } d - POI data point
 * @returns { number } - POI or cluster icon size
 */


var getIconSize = function getIconSize() {
  return function (d) {
    // if d.properties.cluster exists it is a cluster, get right size for icon
    return d.properties.cluster ? Math.min(100, d.properties.point_count) / 100 + 1 + .5 : 1.3;
  };
}; // creates an icon layer that includes clusters


var IconClusterLayer = /*#__PURE__*/function (_CompositeLayer) {
  _inherits(IconClusterLayer, _CompositeLayer);

  var _super = _createSuper(IconClusterLayer);

  function IconClusterLayer() {
    _classCallCheck(this, IconClusterLayer);

    return _super.apply(this, arguments);
  }

  _createClass(IconClusterLayer, [{
    key: "shouldUpdateState",
    value: function shouldUpdateState(_ref) {
      var changeFlags = _ref.changeFlags;
      return changeFlags.somethingChanged;
    }
  }, {
    key: "updateState",
    value: function updateState(_ref2) {
      var props = _ref2.props,
          oldProps = _ref2.oldProps,
          changeFlags = _ref2.changeFlags;
      var rebuildIndex = changeFlags.dataChanged || props.sizeScale !== oldProps.sizeScale;

      if (rebuildIndex) {
        var index = new _supercluster["default"]({
          maxZoom: props.superclusterZoom,
          radius: props.getSuperclusterRadius(this.props.zoom)
        });
        index.load(props.data.map(function (d) {
          return {
            geometry: {
              coordinates: props.getPosition(d)
            },
            properties: d
          };
        }));
        this.setState({
          index: index
        });
      }

      var z = Math.floor(this.props.zoom);

      if (rebuildIndex || z !== this.state.z) {
        this.setState({
          data: this.state.index.getClusters([-180, -85, 180, 85], z),
          z: z
        });
      }
    }
  }, {
    key: "getPickingInfo",
    value: function getPickingInfo(_ref3) {
      var info = _ref3.info,
          mode = _ref3.mode;
      var pickedObject = info.object && info.object.properties;

      if (pickedObject) {
        if (pickedObject.cluster && mode !== 'hover') {
          info.objects = this.state.index.getLeaves(pickedObject.cluster_id, 25).map(function (f) {
            return f.properties;
          });
        }

        info.object = pickedObject;
      }

      return info;
    }
  }, {
    key: "renderLayers",
    value: function renderLayers() {
      var data = this.state.data;

      var _this$props = this.props,
          iconAtlas = _this$props.iconAtlas,
          iconMapping = _this$props.iconMapping,
          sizeScale = _this$props.sizeScale,
          getPosition = _this$props.getPosition,
          visible = _this$props.visible,
          props = _objectWithoutProperties(_this$props, ["iconAtlas", "iconMapping", "sizeScale", "getPosition", "visible"]);

      return new _layers.IconLayer(this.getSubLayerProps(_objectSpread({
        id: 'icon',
        data: data,
        iconAtlas: iconAtlas,
        iconMapping: iconMapping,
        sizeScale: sizeScale,
        getPosition: getPosition,
        getIcon: function getIcon(d) {
          return getIconName(d);
        },
        getSize: getIconSize(),
        visible: visible,
        pickable: visible
      }, props)));
    }
  }]);

  return IconClusterLayer;
}(_newDeckGlCore.CompositeLayer);

IconClusterLayer.defaultProps = {
  id: 'icon-cluster',
  getPosition: function getPosition(d) {
    return d.geometry.coordinates;
  },
  iconAtlas: _cluster2["default"],
  iconMapping: _cluster["default"],
  sizeScale: _constants.CLUSTER_SIZE_SCALE,
  superclusterZoom: _constants.SUPERCLUSTER_ZOOM,
  getSuperclusterRadius: _utils.getSuperclusterRadius,
  visible: false
};
var _default = IconClusterLayer;
exports["default"] = _default;