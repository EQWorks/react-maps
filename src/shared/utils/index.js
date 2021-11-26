import { WebMercatorViewport } from 'new-deck-gl-core'

import circle from '@turf/circle'
import { point } from '@turf/helpers'
import tCentroid from '@turf/centroid'
import tBBox from '@turf/bbox'
import tDistance from '@turf/distance'
import { SCALES, CLUSTER_SIZE_SCALE } from '../../constants'
import { color } from 'd3-color'
import { extent } from 'd3-array'


/**
 * setView - handles calculations of viewState lat, long, and zoom, based on
 *           data coordinates and deck size
 * @param { object } param
 * @param { array } param.data - data to display on the map
 * @param { number } param.width - deck container width
 * @param { number } param.height - deck container height
 * @return { object } { latitude, longitude, zoom } - lat, long, and zoom for new viewState
 */
export const setView = ({ data, width, height }) => {
  let viewData = data

  // for lists <100 radii, set viewport to fit radius for all POIs
  if (data[0]?.geometry?.type === 'Point' && data?.length < 100) {
    viewData = []
    data.forEach(point => {
      if (point?.properties?.radius) {
        const pointCoord = point.geometry.coordinates
        const pointRadius = point.properties.radius
        viewData.push(createCircleFromPointRadius({ centre: pointCoord, radius: pointRadius }))
      } else {
        // cover case for a POI without a radius
        viewData.push(point)
      }
    })
  }

  const formattedGeoData = getDataCoordinates({ data: viewData })
  const dataLonDiff = formattedGeoData[0][0] - formattedGeoData[1][0]

  /**
   * -120 is the diff in longitude between the westernmost and easternmost points of
   * North America: (-172 - (-52)) = -120
   * Compare to the diff in longitude between westernmost point of NA and easternmost point of
   * Australia: -172 - (+153) = -325
   * Because we deal with a pitch, the distortion in map requires more padding between so extreme
   * points. We also need to reduce padding with map container shrinking size,
   * otherwise fitBounds breaks when padding is greater than map dimensions.
   */
  let padding = Math.min(width, height) / 4
  if (dataLonDiff > -120) {
    padding = Math.min(width, height) / 10
  } else if (Math.min(width, height) / 2 > 75) {
    padding =  75
  }

  // set padding larger when we edit one radii POI
  if (data.length === 1 && !data[0].properties?.polygon) {
    padding = Math.min(width, height) / 8
  }

  const viewPort = new WebMercatorViewport({ width, height })
    .fitBounds(formattedGeoData, { padding })

  let { longitude, latitude, zoom } = viewPort

  // set a lower value zoom for a point with small or inexistent radius to have better map perspective
  if (data?.length === 1 && data[0].geometry?.type === 'Point' &&
      (!data[0].properties?.radius || data[0].properties?.radius < 10)) {
    zoom = Math.min(zoom, 18)
  }

  return { longitude, latitude, zoom }
}

/**
 * getDataCoordinates - gets the coordinates that enclose all location data, including polygons
 * @param { object } param
 * @param { array } param.data - location data array
 * @returns { array } - coordinates that define the boundary area where the data is located
 */
export const getDataCoordinates = ({ data }) => {
  let coordinateArray
  if (data[0]?.geometry?.type) {
    coordinateArray = data.reduce((acc, point) => {
      const POIType = point.geometry?.type
      if (POIType === 'Point') {
        return [...acc, point.geometry.coordinates]
      }
      if (POIType === 'Polygon') {
        return [...acc, ...point.geometry.coordinates?.flat()]
      }
      if (POIType === 'MultiPolygon') {
        return [...acc, ...point.geometry.coordinates?.flat().flat()]
      }
    }, [])
  } else {
    coordinateArray = data.reduce((acc, point) => [...acc, [point?.lon, point?.lat]], [])
  }

  const [minCoords, maxCoords] = coordinateArray.reduce(
    ([[minLng, minLat], [maxLng, maxLat]], point) => {
      const [lng, lat] = point
      return [
        [Math.min(minLng, lng), Math.min(minLat, lat)],
        [Math.max(maxLng, lng), Math.max(maxLat, lat)],
      ]
    }, [[180, 90], [-180, -90]])

  return [ minCoords, maxCoords ]
}

/**
 * createCircleFromPointRadius - creates a circle / polygon GeoJSON feature from a radius and a set
 *                               of coordinates
 * @param { object } param
 * @param { array } param.centre - array of coordinates for circle centroid [lon, lat]
 * @param { number } param.radius - radius value
 * @return { object } - GeoJSON object of created circle / polygon
 */
export const createCircleFromPointRadius = ({ centre, radius }) => {
  // ToDo: research how large our radius can get and if can make a formula to set better step number
  const options = { steps: radius < 500 ? 50 : 100, units: 'meters' }
  let createdCircle = circle(centre, radius, options)
  createdCircle.properties.polygon_json = JSON.stringify(createdCircle.geometry)
  createdCircle.properties.poiType = 1
  return createdCircle
}

/**
 * getCircleRadiusCentroid - calculates the radius and centroid of a circle / polygon
 * @param { object } polygon - GeoJSON polygon object
 * @return { object } - the values of the circle's radius and centroid coordinates
 */
export const getCircleRadiusCentroid = ({ polygon }) => {
  polygon = {
    ...polygon,
    type: 'Feature',
  }
  const centroid = tCentroid(polygon)
  const bound = tBBox(polygon)
  let radius = tDistance(centroid, point(([(bound[0] + bound[2]) / 2, bound[3]])))
  // return radius in meters
  let coordinates = centroid.geometry.coordinates
  radius = Math.round(radius * 1000000) / 1000
  return { radius, coordinates }
}

/**
 * getDataRange - returns array of min and max values of a data set
 * @param { object } param
 * @param { array } param.data - data array
 * @param { string } param.dataKey - data attribute key
 * @param { function } param.dataPropertyAccessor - function to access data attribute
 * @return { array  } - array of min and max values
 */
export const getDataRange = ({ data, dataKey, dataPropertyAccessor }) => {
  if (data?.length) {
    return extent(data, d => dataPropertyAccessor(d)[dataKey])
  }
}

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
export const setFinalLayerDataProperty = ({
  data,
  value,
  defaultValue,
  dataScale,
  valueOptions,
  dataPropertyAccessor = d => d,
  geometryAccessor = d => d,
  mvtGeoKey,
  highlightId = null,
}) => {
  if (!value) {
    return typeof defaultValue === 'function' ? defaultValue(highlightId) : defaultValue
  }
  // case for radius for GeoJSON layer
  if (value.field && !dataScale && !valueOptions) {
    return d => dataPropertyAccessor(d)[value.field]
  }
  let layerData = data?.tileData?.length ? data.tileData : data

  if (layerData?.length && value.field?.length && valueOptions?.length) {
    const sample = dataPropertyAccessor(layerData[0])
    if (sample[value.field] === undefined) {
      return defaultValue
    }
    const dataRange = getDataRange({ data: layerData, dataKey: value.field, dataPropertyAccessor })
    if (dataRange.length >= 2 && dataRange[0] !== dataRange[1]) {
      const d3Fn = SCALES[dataScale](dataRange, valueOptions)
      // case for MVT layer
      if (data?.tileData?.length) {
        layerData = Object.fromEntries(data.tileData.map((item) =>
          [geometryAccessor(item)[mvtGeoKey], { value: dataPropertyAccessor(item)[value.field] }]))
        return ({ properties: { geo_id } }) => {
          const { value } = layerData[geo_id] || { value: 0 }
          if (value || value === dataRange[0]) {
            return d3Fn(value)
          }
          // tiles with no data values will be transparent
          return [255, 255, 255, 0]
        }
      }
      return (d) => d3Fn(dataPropertyAccessor(d)[value.field])
    }
    // case for mvt layer: tiles with no data values will be transparent
    if (data?.tileData?.length) {
      return [255, 255, 255, 0]
    }
    return valueOptions[0]
  }

  return typeof value === 'function' ? defaultValue(highlightId) : value
}

/**
 * strToArrayColor - transforms a string format color ex.'#0062d9' into an array of rgb color values
 * @param { object } param
 * @param { string } param.strColor - string format color
 * @returns { array  } - an array of rgb color values [r, g, b]
 */
export const strToArrayColor = ({ strColor }) => {
  const layerColor = color(strColor)
  return [layerColor.r, layerColor.g, layerColor.b]
}

/**
 * getArrayFillColors - converts an array of string format colour in array format
 * @param { object } param
 * @param { string } param.fillColors - array of string format colours ['#0062d9', '#dd196b']
 * @returns { array } - array format colour [[r, g, b]]
 */
export const getArrayFillColors = ({ fillColors }) =>
  fillColors.map((strColor) => {
    return strToArrayColor({ strColor })
  })

/**
* getStrFillColor - converts an array format colour [r, g, b] in a string format colour
* @param { object } param
* @param { array || function } param.getFillColor - function or array of Deck.gl layer fill colours
* @param { string } param.opacity - opacity value
* @returns { array } - string format colour 'rgb(r, g, b, opacity)'
*/
export const getStrFillColor = ({ fillColor, opacity = 1 }) => {
  const color = typeof fillColor === 'function' ? fillColor(0)(1) : fillColor
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`
}

/**
* getArrayGradientFillColors - converts an array of string or array format colours
* in an array of rgba string format colours
* @param { object } param
* @param { array } param.fillColors - array of string or array format colours
                                      ex: ['#0062d9', '#dd196b'] or [[214, 232, 253], [39, 85, 196]]
* @param { string } param.opacity - opacity value
* @returns { array } - array of rgba string format colours ['rgb(r, g, b, opacity)']
*/
export const getArrayGradientFillColors = ({ fillColors, opacity }) => {
  return fillColors.map(strColor => {
    const arrayColor = Array.isArray(strColor) ? strColor : strToArrayColor({ strColor })
    return `rgba(${arrayColor[0]}, ${arrayColor[1]}, ${arrayColor[2]}, ${opacity})`
  })}

/**
 * setLegendOpacity - adjusts legend opacity to match closer to deck.gl layer opacity
 * @param { object } param
 * @param { number } param.opacity - map opacity value
 * @returns { number  } - legend opacity value
 */
export const setLegendOpacity = ({ opacity }) =>
  opacity >= 1 ? 1 : (opacity > 0.6 ? 0.9 : opacity + 0.2)

/**
 * getSuperclusterRadius - determines cluster radius
 * @param { object } param
 * @param { number } param.zoom - viewstate zoom
 * @param { number } param.sizeScale - scale for cluster radius size
 * @returns { number  } - cluster radius in pixels
 */
export const getSuperclusterRadius = ({ zoom, sizeScale = CLUSTER_SIZE_SCALE }) =>
  zoom > 15 ?
    sizeScale / 2 :
    sizeScale

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
export const setLegendConfigs = ({
  elevationBasedOn = '',
  fillBasedOn = '',
  fillColors,
  objColor = '',
  radiusBasedOn = '',
  data = [],
  dataPropertyAccessor = d => d,
  ...legendProps
}) => {
  const [minColor, maxColor] = fillColors && typeof fillColors === 'string' ?
    [fillColors, fillColors] :
    [fillColors?.[0] || objColor, fillColors?.[1] || objColor]

  const legends = []
  if (fillBasedOn.length && data?.length) {
    // TODO support quantile/quantize
    // i.e. different lengths of fillColors[]
    const dataRange = getDataRange({ data, dataKey: fillBasedOn, dataPropertyAccessor })
    legends.push({
      minColor,
      maxColor,
      type: 'gradient',
      min: dataRange[0],
      max: dataRange[1],
      label: fillBasedOn,
      ...legendProps,
    })
  }

  if (elevationBasedOn.length && data?.length) {
    const dataRange = getDataRange({ data, dataKey: elevationBasedOn, dataPropertyAccessor })
    legends.push({
      type: 'elevation',
      minColor,
      maxColor,
      min: dataRange[0],
      max: dataRange[1],
      label: elevationBasedOn,
      ...legendProps,
    })
  }

  if (radiusBasedOn.length && data?.length) {
    const dataRange = getDataRange({ data, dataKey: radiusBasedOn, dataPropertyAccessor })
    legends.push({
      minColor,
      maxColor,
      type: 'size',
      dots: 5,
      size: 5,
      zeroRadiusSize: 20,
      min: dataRange[0],
      max: dataRange[1],
      label: radiusBasedOn,
      ...legendProps,
    })
  }
  return legends
}
