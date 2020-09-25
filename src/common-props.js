import PropTypes from 'prop-types'
import { interpolateBlues } from 'd3-scale-chromatic'


export const deckLayerPropTypes = {
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  opacity: PropTypes.number,
}

export const deckLayerDefaultProps = {
  onClick: undefined,
  onHover: undefined,
  opacity: 0.8,
}

export const dynamicFillPropTypes = {
  fillBasedOnInit: PropTypes.string,
  fillDataScale: PropTypes.string,
  fillColors: PropTypes.array,
  filled: PropTypes.bool,
  getFillColor: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
  ]),
}

export const dynamicFillDefaultProps = {
  fillBasedOnInit: '',
  fillDataScale: 'linear',
  fillColors: [interpolateBlues(0), interpolateBlues(1)],
  filled: true,
  getFillColor: [255, 140, 0],
}

export const dynamicElevationPropTypes = {
  elevationBasedOnInit: PropTypes.string,
  elevationDataScale: PropTypes.string,
  elevations: PropTypes.array,
  getElevation: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
  ]),
  // elevationScale
}

export const dynamicElevationDefaultProps = {
  elevationBasedOnInit: '',
  elevationDataScale: 'linear',
  elevations: [0, 1000000],
  getElevation: 0,
}

export const defaultMapPropTypes = {
  lineWidthUnits: PropTypes.string,
  getLineWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
  ]),
  getLineColor: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
  ]),
  showLegend: PropTypes.bool,
  legendPosition: PropTypes.string,
}

export const defaultMapDefaultProps = {
  lineWidthUnits: 'pixels',
  getLineWidth: 2,
  getLineColor: [0, 0, 0],
  showLegend: false,
  legendPosition: 'top-left',
}

const propTypes = {
  stroked: PropTypes.bool,
  
}

const defaultProps = {
  stroked: true,

}