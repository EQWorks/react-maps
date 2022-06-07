import  { getDataRange } from './index'
import { LEGEND_SIZE, LEGEND_DOTS, LEGEND_RADIUS_SIZE } from '../constants'


/**
 * setLegendOpacity - adjusts legend opacity to match closer to deck.gl layer opacity
 * @param { object } param
 * @param { number } param.opacity - map opacity value
 * @returns { number  } - legend opacity value
 */
export const setLegendOpacity = ({ opacity }) =>
  opacity >= 1 ? 1 : (opacity > 0.6 ? 0.9 : opacity + 0.2)

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
*               {keyAliases, formatLegendTitle, formatDataKey, formatDataValue, symbolLineColor}
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
  legendSize = LEGEND_SIZE.large,
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
      // TO DO - use to customize legend symbol for radius/size
      dots: LEGEND_DOTS[legendSize],
      size: LEGEND_RADIUS_SIZE.default,
      zeroRadiusSize: LEGEND_RADIUS_SIZE.zero,
      min: dataRange[0],
      max: dataRange[1],
      label: radiusBasedOn,
      ...legendProps,
    })
  }
  return legends
}