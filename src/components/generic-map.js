import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import DeckGL, { FlyToInterpolator, MapView, WebMercatorViewport } from 'deck.gl'
import { StaticMap } from 'react-map-gl'

import styled from 'styled-components'

import MapTooltip from './tooltip'
import Legend from './legend'


const MapContainer = styled.div`
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
  latitude: 52,
  longitude: -100,
  zoom: 2.5,
}

const propTypes = {
  layers: PropTypes.array,
  showLegend: PropTypes.bool,
  showTooltip: PropTypes.bool,
  tooltipProps: PropTypes.object,
  tooltipNode: PropTypes.node,
}
const defaultProps = {
  layers: [],
  showLegend: false,
  showTooltip: false,
  tooltipProps: {},
}

const getPositionFromLngLat = ({ lngLat, ...viewState }) => new WebMercatorViewport({
  ...viewState,
}).project(lngLat)

// DeckGL react component
const Map = ({ layers, showLegend, showTooltip, tooltipNode, tooltipProps, ...legendProps }) => {
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
        getTooltip={({object}) => object && object.properties.address_region}
        // NOTE: same structure as layer click
        // onHover={d => console.log('----> map hover', d)}
        // onClick={d => console.log('----> map click', d)}
      >
        <StaticMap mapboxApiAccessToken={ process.env.MAPBOX_ACCESS_TOKEN } />
      </DeckGL>
      {showLegend && <Legend {...legendProps} />}
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
