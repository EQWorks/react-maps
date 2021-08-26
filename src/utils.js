import { reportWI } from './datasets'


// TODO more built in types, e.g. intervals, filter
// TODO cap max & mins
export const intensityByMetric = ({
  intensityCallback = false,
  invert = false,
  multiplier,
  base,
  metric,
  metricStats: { max, min },
  getDataObject = d => d,
}) => {
  if (intensityCallback) return d => intensityCallback(d) * multiplier + base
  let intensity = v => (v - min) / (max - min)
  if (invert) intensity = v => (max - v) / (max - min)
  if (max === min) intensity = () => 1
  return d => intensity(getDataObject(d)[metric]) * multiplier + base
}

export const colorIntensityByMetric = ({
  intensityCallback = false,
  invert = false,
  color, // [{ base, multiplier }]
  metric,
  metricStats: { max, min },
  getDataObject = d => d,
}) => {
  if (intensityCallback) return d => color.map(({ base, multiplier }) => intensityCallback(d) * multiplier + base)
  let intensity = v => (v - min) / (max - min)
  if (invert) intensity = v => (max - v) / (max - min)
  if (max === min) intensity = () => 1
  return d => color.map(({ base, multiplier }) => intensity(getDataObject(d)[metric]) * multiplier + base)
}

export const calculateReportWIMetrics = (agg, row) => ({
  ...reportWI.DATA_FIELDS.reduce((rowAgg, key) => ({
    ...rowAgg,
    [key]: {
      max: Math.max((agg[key] || { max: null }).max, row[key]),
      min: Math.min((agg[key] || { min: null }).min, row[key]),
    },
  }), {}),
})

/**
 * getCursor - sets cursor for different layers and hover state
 * @param { object } params
 * @param { array } param.layers - current array of layers used in map
 * @return { function } - cursor function
 */
export const getCursor = ({ layers } = {}) => {
  if (layers?.length) {
    const drawLayer = layers.find(layer => layer.id === 'edit-draw layer')
    if (drawLayer?.props?.visible) {
      return drawLayer.getCursor.bind(drawLayer)
    }
  }
  return ({ isDragging, isHovering }) => (isDragging ? 'grabbing' : (isHovering ? 'pointer' : 'grab'))
}

export const getFillColor = (value, max, min) => {
  const totalDiff = max - min
  if (!value) {
    return 'hsl(203, 93%, 90%)'
  }
  if (totalDiff === 0) {
    return 'hsl(203, 93%, 55%)'
  }

  const minLightness = 55
  const maxLightness = 90
  const totalLightnessDiff = maxLightness - minLightness
  const lightness = maxLightness - ((value - min) / totalDiff * totalLightnessDiff)
  return `hsl(203, 93%, ${lightness}%)`
}

export const getMetFillColor = (value, max, min) => {
  const totalDiff = max - min
  if (!value) {
    return 'hsl(210, 63%, 55%)'
  }
  if (totalDiff === 0) {
    return 'hsl(210, 63%, 26%)'
  }

  const minLightness = 26
  const maxLightness = 55
  const totalLightnessDiff = maxLightness - minLightness
  const lightness = maxLightness - ((value - min) / totalDiff * totalLightnessDiff)
  return `hsl(210, 63%, ${lightness}%)`
}
