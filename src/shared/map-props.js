import PropTypes from 'prop-types'

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
    border: PropTypes.string.isRequired,
    borderRadius: PropTypes.string.isRequired,
    padding: PropTypes.string.isRequired,
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
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2px 8px 0 rgba(12, 12, 13, 0.15)',
    border: '1px solid rgba(255, 255, 255)',
    borderRadius: '3px',
    padding: '8px',
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
    fillColour: [199, 251, 255],
    polygonFillColour: [245, 163, 185],
    polygonLineColour: [237, 94, 132],
    editFillColour:[245, 163, 185],
    editLineColour:[237, 94, 132],
    lineColour: [132, 210, 239],
    lineWidth: 2,
    opacity: 0.2,
  },
}
