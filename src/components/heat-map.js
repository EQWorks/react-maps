import PropTypes from 'prop-types'
import React from 'react'
import DeckGL from '@deck.gl/react'
import { HeatmapLayer } from '@deck.gl/aggregation-layers'
import { StaticMap } from 'react-map-gl'
// import { FlyToInterpolator } from "deck.gl";
import * as d3 from 'd3-scale'

const INITIAL_VIEW_STATE = {
  longitude: -112.8452,
  latitude: 49.6956,
  zoom: 13,
  pitch: 0,
  bearing: 0,
}

const integratedScale = (domain, range, value) => {
  const scale = d3.scaleLinear()
    .domain([domain[0], domain[1]])
    .range([range[0], range[1]])
  return scale(value)
}

const HeatMap = ({ reportData, mapboxApiAccessToken }) => {

  const layers = new HeatmapLayer({
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
  })


  return (
    <div>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
      >
        <StaticMap
          preventStyleDiffing={true}
          mapboxApiAccessToken={mapboxApiAccessToken}
        />
      </DeckGL>
    </div>
  )
}

HeatMap.propTypes = {
  mapboxApiAccessToken: PropTypes.string.required,
  reportData: PropTypes.object.required,
}

export default HeatMap
