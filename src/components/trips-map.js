import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
  commonProps,
  commonDefaultProps,
} from '../shared/map-props'

import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core'
import { DeckGL } from '@deck.gl/react'
import { StaticMap } from 'react-map-gl'
import { PolygonLayer } from '@deck.gl/layers'
import { TripsLayer } from '@deck.gl/geo-layers'


import { styled, setup } from 'goober'


setup(React.createElement)

const MapContainer = styled('div')`
  height: 100%;
  width: 100%;
  position: absolute;
`

const propTypes = {
  layers: PropTypes.array,
  setDimensionsCb: PropTypes.func,
  setHighlightObj: PropTypes.func,
  getTooltip: PropTypes.func,
  getCursor: PropTypes.func,
  viewStateOverride: PropTypes.object,
  legend: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.bool,
  ]),
  showTooltip: PropTypes.bool,
  renderTooltip: PropTypes.func,
  pitch: PropTypes.number,
}

const DATA_URL = {
  BUILDINGS:
    'https://locus-cdn.s3.amazonaws.com/assets/toronto-buildings.json', // eslint-disable-line
  TRIPS: 'https://locus-cdn.s3.amazonaws.com/assets/toronto-trips2.json' // eslint-disable-line
}

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
})

const pointLight = new PointLight({
  color: [255, 255, 255],
  intensity: 2.0,
  position: [-74.05, 40.7, 8000],
})

const lightingEffect = new LightingEffect({ ambientLight, pointLight })

const material = {
  ambient: 0.1,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [60, 64, 70],
}

const DEFAULT_THEME = {
  buildingColor: [74, 80, 87],
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  material,
  effects: [lightingEffect],
}

const INITIAL_VIEW_STATE = {
  longitude: -79.39,
  latitude: 43.66,
  zoom: 13,
  pitch: 45,
  bearing: 0,
}

const landCover = [[[-79.61, 43.53], [-79.18, 43.53], [-79.18, 43.78], [-79.66, 43.78]]]

const defaultProps = {
  layers: [],
  setDimensionsCb: () => { },
  setHighlightObj: () => { },
  getTooltip: () => { },
  getCursor: () => { },
  viewStateOverride: {},
  legend: undefined,
  showTooltip: false,
  renderTooltip: undefined,
  pitch: 0,
}

// DeckGL react component
const TripsMap = ({
  mapboxApiAccessToken,
  buildings = DATA_URL.BUILDINGS,
  trips = DATA_URL.TRIPS,
  trailLength = 180,
  initialViewState = INITIAL_VIEW_STATE,
  theme = DEFAULT_THEME,
  loopLength = 1800, // unit corresponds to the timestamp in source data
  animationSpeed = 1,
}) => {

  const [time, setTime] = useState(0)
  const [animation] = useState({})

  const animate = () => {
    setTime(t => (t + animationSpeed) % loopLength)
    animation.id = window.requestAnimationFrame(animate)
  }

  useEffect(
    () => {
      animation.id = window.requestAnimationFrame(animate)
      return () => window.cancelAnimationFrame(animation.id)
    },
    [animation],
  )

  const layers = [
    // This is only needed when using shadow effects
    new PolygonLayer({
      id: 'ground',
      data: landCover,
      getPolygon: f => f,
      stroked: false,
      getFillColor: [0, 0, 0, 0],
    }),
    new TripsLayer({
      id: 'trips',
      data: trips,
      getPath: d => d.path,
      getTimestamps: d => d.timestamps.map(p => p - 1620403500),
      getColor: d => (d.vendor === 0 ? theme.trailColor0 : theme.trailColor1),
      opacity: 0.3,
      widthMinPixels: 2,
      rounded: true,
      trailLength,
      currentTime: time,

      shadowEnabled: false,
    }),
    new PolygonLayer({
      id: 'buildings',
      data: buildings,
      extruded: true,
      wireframe: false,
      opacity: 0.5,
      getPolygon: f => f.polygon,
      getElevation: f => f.height,
      getFillColor: theme.buildingColor,
      material: theme.material,
    }),
  ]

  return (
    <MapContainer>
      <DeckGL
        layers={layers}
        effects={theme.effects}
        initialViewState={initialViewState}
        controller={true}
      >
        <StaticMap reuseMaps mapStyle="mapbox://styles/dilshaneq/ckowvrtv00vol17nvjc2zk30y" preventStyleDiffing={true} mapboxApiAccessToken={mapboxApiAccessToken} />
      </DeckGL>
    </MapContainer>
  )
}

TripsMap.propTypes = {
  ...propTypes,
  ...StaticMap.propTypes,
  ...commonProps,
}
TripsMap.defaultProps = {
  ...defaultProps,
  ...StaticMap.defaultProps,
  ...commonDefaultProps,
}

export default TripsMap
