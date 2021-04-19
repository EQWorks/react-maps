import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { HeatmapLayer } from '@deck.gl/aggregation-layers'
import Map from './generic-map'
import * as d3 from 'd3-scale'

const integratedScale = (domain, range, value) => {
  const scale = d3.scaleLinear()
    .domain([domain[0], domain[1]])
    .range([range[0], range[1]])
  return scale(value)
}

const HeatMap = ({ reportData, mapboxApiAccessToken }) => {

  const layers = useMemo(() => ([
    new HeatmapLayer({
      id: 'heatmap',
      data: reportData,
      radiusPixels: 100,
      opacity: 0.4,
      threshold: 0.2,
      pickable: false,
      visible: true,
      getPosition: (d) => [d.lon, d.lat],
      getWeight: (d) => {
        return integratedScale([0, 550], [1, 100], d.converted_visits)
      },
    }),
  ]))

  return (
    <div>
      <Map
        layers={layers}
        mapboxApiAccessToken={mapboxApiAccessToken}
      />
    </div>
  )
}

HeatMap.propTypes = {
  mapboxApiAccessToken: PropTypes.string.required,
  reportData: PropTypes.object.required,
}

export default HeatMap
