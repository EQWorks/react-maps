import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import DeckGL, { FlyToInterpolator, MapView, WebMercatorViewport } from 'deck.gl'
import { StaticMap } from 'react-map-gl'

import { styled, setup } from 'goober'

import MapTooltip from './tooltip'
import Legend from './legend'


setup(React.createElement)

const MapContainer = styled('div')`
  height: 100%;
  width: 100%;
  position: absolute;
`

const MAP_VIEW = new MapView({ repeat: true });

const INIT_VIEW_STATE = {
  pitch: 0,
  bearing: 0,
  transitionDuration: 300,
  transitionInterpolator: new FlyToInterpolator(),
  // latitude: 52,
  // longitude: -100,
  // latitude: 49.6646529,
  // longitude: -112.7979942,
  longitude: -79.43598,
  latitude: 43.65993,
  zoom: 10,
  // zoom: 2.5,
}

const propTypes = {
  layers: PropTypes.array,
  showLegend: PropTypes.bool,
  position: PropTypes.string,
  legends: PropTypes.array,
  showTooltip: PropTypes.bool,
  tooltipNode: PropTypes.node,
  getTooltip: PropTypes.func,
}
const defaultProps = {
  layers: [],
  showLegend: false,
  position: 'top-left',
  legends: [],
  showTooltip: false,
  getTooltip: () => {},
}

const getPositionFromLngLat = ({ lngLat, ...viewState }) => new WebMercatorViewport({
  ...viewState,
}).project(lngLat)

// DeckGL react component
const Map = ({
  layers,
  showLegend,
  position,
  legends,
  showTooltip,
  tooltipNode,
  onClick,
  getTooltip,
  ...tooltipProps
}) => {
  const deckRef = useRef()
  const [viewState, setViewState] = useState({})
  // TODO: unify management of viewState and expose as callback
  const [{ height, width }, setDimensions] = useState({ height: 0, width: 0 })
  const [{ x, y }, setTooltip] = useState({ x: 0, y: 0 })
  // NOTE: keep tooltip x/y consistent with viewport movement
  useEffect(() => {
    if (tooltipProps.lngLat && deckRef && deckRef.current) {
      const [x, y] = getPositionFromLngLat({
        ...deckRef.current.deck.viewState,
        ...viewState,
        height,
        width,
        lngLat: tooltipProps.lngLat,
      })
      setTooltip({ x, y })
    }
  }, [tooltipProps.lngLat, viewState, height, width, deckRef])


  return (
    <MapContainer>
      <DeckGL
        ref={deckRef}
        onLoad={() => {
          const { height, width } = deckRef.current.deck
          setDimensions({ height, width })
        }}
        onResize={({ height, width }) => {
          // viewState doesn't update dimensions correctly
          setDimensions({ height, width })
        }}
        onViewStateChange={o => {
          const { viewState } = o
          setViewState(viewState)
        }}
        initialViewState={ INIT_VIEW_STATE }
        views={ MAP_VIEW }
        layers={layers}
        controller={ true }
        // NOTE: same structure as layer click
        // onHover={d => console.log('----> map hover', d)}
        onClick={onClick}
        getTooltip={getTooltip}
      >
        <StaticMap mapboxApiAccessToken={ process.env.MAPBOX_ACCESS_TOKEN } />
      </DeckGL>
      {showLegend && <Legend legends={legends} position={position} />}
      {showTooltip && (
        <MapTooltip
          {...tooltipProps}
          x={x}
          y={y}
          h={height}
          w={width}
        >
          {tooltipNode}
        </MapTooltip>
      )}
    </MapContainer>
  )
}


Map.propTypes = propTypes
Map.defaultProps = defaultProps

export default Map
