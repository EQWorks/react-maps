import PropTypes from 'prop-types'

import { getTailwindConfigColor } from '@eqworks/lumen-labs'

export const commonProps = {
  mapboxApiAccessToken: PropTypes.string.isRequired,
}

export const commonDefaultProps = {
  mapboxApiAccessToken:'no-token',
}

export const typographyPropTypes = {
  typography: PropTypes.shape({
    fontFamily: PropTypes.string.isRequired,
    fontSize: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
  }),
}

export const typographyDefaultProps = {
  typography: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '12px',
    textColor: 'black',
  },
}

export const tooltipPropTypes = {
  tooltipKeys: PropTypes.oneOfType([
    PropTypes.PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      metricKeys: PropTypes.array,
      nameAccessor: PropTypes.func,
      idAccessor: PropTypes.func,
      metricAliases: PropTypes.object,
    }),
    PropTypes.array,
  ]),
  tooltipProps: PropTypes.shape({
    backgroundColor: PropTypes.string.isRequired,
    boxShadow: PropTypes.string.isRequired,
    borderRadius: PropTypes.string.isRequired,
    padding: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
  }),
}

export const tooltipDefaultProps = {
  tooltipKeys: {
    name: '',
    id: '',
    metricKeys: undefined,
    nameAccessor: d => d,
    idAccessor: d => d,
    metricAccessor: d => d,
    metricAliases: {},
  },
  tooltipProps: {
    backgroundColor: getTailwindConfigColor('secondary-50'),
    boxShadow: '0 0.125rem 0.5rem 0 rgba(12, 12, 13, 0.15)',
    borderRadius: '0.15rem',
    padding: '0.5rem',
    opacity: 0.9,
  },  
}

export const POIMapProps = {
  mapProps: PropTypes.shape({
    fillColour: PropTypes.array.isRequired,
    polygonFillColour: PropTypes.array.isRequired,
    lineColour: PropTypes.array.isRequired,
    lineWidth: PropTypes.number.isRequired,
    opacity: PropTypes.number.isRequired,
  }),
}

export const POIMapDefaultProps = {
  mapProps: {
    // fillColour: [250, 198, 175],
    fillColour: [255, 244, 203],
    polygonFillColour: [175, 156, 230],
    polygonLineColour: [137, 121, 181],
    editFillColour:[212, 62, 52],
    editLineColour:[182, 38, 40],
    // lineColour: [242, 157, 132],
    lineColour: [245, 217, 120],
    lineWidth: 2,
    opacity: 0.2,
  },
}
