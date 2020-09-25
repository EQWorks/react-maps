import { scaleLinear, scaleQuantile, scaleQuantize } from 'd3-scale'
import { extent } from 'd3-array'
import { color } from 'd3-color'
import { PROP_CONFIGURATIONS, LAYER_CONFIGURATIONS } from './constants'

const SCALES = {
  'linear': scaleLinear,
  'quantile': scaleQuantile,
  'quantize': scaleQuantize,
}

const genNumberProp = ({
  defaultValue,
  value,
  dataScale,
  valueOptions,
  dataPropertyAccessor,
  data,
}) => {
  // value is false/undefined, { field: 'keyInDataRow' }, someFunctionBasedOnDatRow, someNumber
  if (!value) {
    return defaultValue
  }
  // ====[TODO] validation for value.field (exists, is a number etc.)
  if (value.field) {
    const sample = dataPropertyAccessor(data[0])
    if (sample[value.field] === undefined) {
      console.warn('Invalid field provided to number')
      return defaultValue
    }
    const d3Fn = SCALES[dataScale](extent(data, d => dataPropertyAccessor(d)[value.field]), valueOptions)
    return d => d3Fn(dataPropertyAccessor(d)[value.field])
  }
  return value
}

const genColorProp = ({
  defaultValue,
  value,
  dataScale,
  valueOptions,
  dataPropertyAccessor,
  data,
}) => {
  if (!value) {
    return defaultValue
  }
  if (value.field) {
    const sample = dataPropertyAccessor(data[0])
    if (sample[value.field] === undefined) {
      console.warn('Invalid field provided to color')
      return defaultValue
    }
    const d3Fn = SCALES[dataScale](extent(data, d => dataPropertyAccessor(d)[value.field]), valueOptions)
    return d => {
      const ret = color(d3Fn(dataPropertyAccessor(d)[value.field]))
      return [ret.r, ret.g, ret.b]
    }
  }
  return value
}

const GENERATE_PROP_FNS = {
  'number': genNumberProp,
  'color': genColorProp,
}

export const parseDeckGLLayerFromConfig = ({
  id,
  layer,
  geometry,
  visualizations,
  interactions,
  ...other
}) => {
  const {
    dataPropertyAccessor = d => d,
    geometry: layerGeom,
    deckGLClass: Layer,
    defaultProps,
    visualizations: layerVisualizaitons,
  } = LAYER_CONFIGURATIONS[layer]

  // ====[NOTE] if a layer requires explicit geometry (all except GeoJson?)
  // =========] pass its configured values (references to data fields) to final propFn
  const geometryProps = layerGeom.propName ?
    { [layerGeom.propName]: layerGeom.propFn({ ...geometry }) } : {}
  // ====[TODO] correct fallback logic for the above. Should throw an error or prompt someone to choose

  // ====[TODO] calculate field extents in advance, so every configurable aspect doesn't need to
  const propsWithData = data => ({
    // ====[TODO] trim invalid visualization values for a given layer
    // =========] and provide the defaults from PROP_CONFIG
    ...layerVisualizaitons.reduce((agg, name) => {
      const config = visualizations[name] || {}
      const { deckGLName, valueType, defaultValue, byProducts = {} } = PROP_CONFIGURATIONS[name]
      return {
        ...agg,
        [deckGLName]: GENERATE_PROP_FNS[valueType]({
          ...config,
          defaultValue,
          dataPropertyAccessor,
          data,
         }),
        ...byProducts,
      }}, {})
  })

  return data => new Layer({
    id,
    data,
    // ====[TODO] logic for below
    // pickable
    // updateTriggers
    ...defaultProps,
    ...other,
    ...propsWithData(data),
    ...geometryProps,

  })
}
