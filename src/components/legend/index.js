import React from 'react'
import PropTypes from 'prop-types'
import { typographyPropTypes, typographyDefaultProps } from '../../shared/map-props'
import { styled, setup } from 'goober'

import LegendItem from './legend-item'


setup(React.createElement)

const LegendContainer = styled('div')(({ num_legends, position, typography }) => ({
  ...typography,
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  cursor: num_legends > 1 ? 'pointer' : 'default',
  backgroundColor: 'rgba(255,255,255,0.9)',
  padding: '0 1rem 1rem',
  borderRadius: '0.2rem',
  ...position,
}))

const propTypes = {
  position: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right']),
  legends: PropTypes.arrayOf(PropTypes.shape({
    max: PropTypes.number,
    min: PropTypes.number,
    label: PropTypes.string,
  })),
  metricAliases: PropTypes.object,
  formatLegendTitle: PropTypes.func,
  formatPropertyLabel: PropTypes.func,
  formatData: PropTypes.object,
}

const defaultProps = {
  position: 'top-left',
  legends: [
    {
      max: undefined,
      min: undefined,
      label: '',
    },
  ],
  metricAliases: undefined,
  formatLegendTitle: d => d,
  formatPropertyLabel: d => d,
  formatData: undefined,
}

const Legend = ({
  position,
  legends,
  metricAliases,
  formatLegendTitle,
  formatPropertyLabel,
  formatData,
  typography,
}) => {
  let objPosition = {}
  objPosition[position.split('-')[0]] = '1rem'
  objPosition[position.split('-')[1]] = '1rem'
  // const [activeLegend, setActiveLegend] = useState(0)
  // const handleLegendChange = () => setActiveLegend(o => o === legends.length - 1 ? 0 : o + 1)

  return (
    <>
      <LegendContainer
        num_legends={legends.length}
        // onClick={handleLegendChange}
        position={objPosition}
        typography={typography}
      >
        {legends.map(({ type, ...legendProps }) => (
          <LegendItem
            key={type}
            legendItemProps={{
              type,
              metricAliases,
              formatLegendTitle,
              formatPropertyLabel,
              formatData,
              ...legendProps,
            }}
          />
        ))}
      </LegendContainer>
    </>
  )
}

Legend.propTypes = { ...propTypes, ...typographyPropTypes }
Legend.defaultProps = { ...defaultProps,  ...typographyDefaultProps }

export default Legend
