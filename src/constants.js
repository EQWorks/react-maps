import { scaleLinear, scaleQuantile, scaleQuantize, scaleLog } from 'd3-scale'


export const DATE_TYPES = { 1: 'Daily', 2: 'Weekly', 3: 'Monthly' }
export const hours = new Array(24).fill(0).map((_, i) => `${i}`)
export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
export const TYPE_POLYGON = {
  code: 1,
  name: 'polygon',
  plural: 'polygons',
}
export const TYPE_RADIUS = {
  code: 2,
  name: 'radius',
  plural: 'radii',
}

export const COLOURS = ['#0062d9', '#f65b20', '#ffaa00', '#dd196b', '#9928b3', '#00b5c8', '#a8a8a8']

export const SCALES = {
  'linear': scaleLinear,
  'log': scaleLog,
  'quantile': scaleQuantile,
  'quantize': scaleQuantize,
}

export const CLUSTER_SIZE_SCALE = 40
export const SUPERCLUSTER_ZOOM = 20

export const LEGEND_TYPE = {
  size: 'size',
  elevation: 'elevation',
  gradient: 'gradient',
}

export const LEGEND_SIZE = {
  small: 'sm',
  large: 'lg',
}

export const LEGEND_POSITION = ['top-left', 'top-right', 'bottom-left', 'bottom-right']

export const LEGEND_DOTS = {
  lg: 5,
  sm: 4,
}
export const LEGEND_RADIUS_SIZE = {
  default: 0.325,
  zero: 1.25,
}

export const  LEGEND_SYMBOL_WIDTH = {
  lg: 7.5,
  sm: 5,
  zero: 1.25,
}

export const LEGEND_HEIGHT_WIDTH = {
  left: {
    lg: 1.325,
    sm: 1,
  },
  right: {
    lg: 5.25,
    sm: 3.125,
  },
}

export const GEOJSON_TYPES = {
  point: 'Point',
  polygon: 'Polygon',
  multipolygon: 'MultiPolygon',
}
