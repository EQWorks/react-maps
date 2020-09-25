import { ScatterplotLayer, GeoJsonLayer } from 'deck.gl'
// ====[TODO] extensions? https://deck.gl/docs/api-reference/extensions/data-filter-extension

/*
  ====[TODO] what about a COMBO layer?
  multi: true,
  layers: [
    {custom object},
    'name of layer',
  ]
*/

// ====[NOTE] default keys to check for when loading data
const DEFAULT_GEOMETRY_KEYS = {
  latitude: ['lat', 'latitude'],
  longitude: ['lon', 'longitude'],
  geojson: ['geojson'],
}

// ====[TODO] better type-checking e.g. parseInt
const validKey = (value, type) => value !== undefined && value !== null && typeof value === type

// ====[NOTE] consumed by UI to define how a user can interact with a given layer
export const LAYER_CONFIGURATIONS = {
  scatterplot: {
    notAClass: false,
    deckGLClass: ScatterplotLayer,
    geometry: {
      propName: 'getPosition',
      // ====[TODO] support [lon,lat] array?
      // =========] inv => d => inv ? [...d[coordKey]].reverse() : d[coordKey]
      propFn: ({ longitude, latitude }) => d => [d[longitude], d[latitude]],
      longitude: { type: 'number' },
      latitude: { type: 'number' }
    },
    validator: (d) => Array.isArray(d) && d.every(row => DEFAULT_GEOMETRY_KEYS.latitude.some(key => validKey(row[key], 'number')) && DEFAULT_GEOMETRY_KEYS.longitude.some(key => validKey(row[key], 'number'))),
    // ====[NOTE] each value can always be based on a field
    // ====[NOTE] if value.field, then define a way to choose the range of values
    // =========] eventually supplied to d3.range() via genNumberProp, genColorProp
    visualizations: ['radius', 'fill', 'lineWidth', 'lineColor'],
    interactions: ['click', 'hover', 'tooltip', 'highlight', 'labels'],
    defaultProps: {
      // ====[TODO] difference between these defaults and prop defaults below
      radiusScale: 10,
      radiusUnits: 'px',
    }
  },
  geojson: {
    notAClass: false,
    deckGLClass: GeoJsonLayer,
    dataPropertyAccessor: d => d.properties,
    geometry: {
      // ====[TODO] how to handle geojson field vs just geojson data
      geojson: { type: ['object', 'array'] },
    },
    validator: (d) => Array.isArray(d) && d.every(row => hasGeoJson(row)),
    // ====[TODO] radius isn't always valid, so how do we turn it off?
    // =========] GeoJson is EITHER radius around geometry.coordinates OR just coordinates
    visualizations: ['radius', 'elevation', 'fill', 'lineWidth', 'lineColor'],
    interactions: ['click', 'hover', 'tooltip', 'highlight', 'labels'],
    defaultProps: {
      radiusScale: 10,
      radiusUnits: 'px',
      lineWidthScale: 10,
      lineWidthUnits: 'px',
    }
  },
  // ====[TODO] tileLayer https://deck.gl/examples/tile-layer/
}

// ====[NOTE] props that are available for configuration via UI
export const PROP_CONFIGURATIONS = {
  fill: {
    defaultValue: [0,0,255],
    deckGLName: 'getFillColor',
    valueType: 'color',
    control: 'select',
    options: ['picker', 'scales'],
    byProducts: { filled: true },
  },
  radius: {
    defaultValue: 10,
    deckGLName: 'getRadius',
    valueType: 'number',
    control: 'slider',
  },
  lineWidth: {
    defaultValue: 5,
    deckGLName: 'getLineWidth',
    valueType: 'number',
    control: 'slider',
    byProducts: { stroked: true }
  },
  lineColor: {
    defaultValue: [0,0,0],
    deckGLName: 'getLineColor',
    valueType: 'color',
    control: 'select',
    options: ['picker', 'scales'],
    byProducts: { stroked: true },
  },
  elevation: {
    defaultValue: 10,
    deckGLName: 'getElevation',
    valueType: 'number',
    control: 'slider',
    byProducts: { extruded: true },
  },
  /*
    ====[TODO]
    radiusScale: 10
    radiusUnits: 'px'
    lineWidthScale: 10
    lineWidthUnits: 'px'
    click: 'onClick', // pickable
    hover: 'onHover', // pickable
  */
}
