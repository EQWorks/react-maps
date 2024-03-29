import React, { useState, useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'

import { useDebounce } from 'use-debounce'

import {
  commonProps,
  commonDefaultProps,
} from '../shared/map-props'

import { FlyToInterpolator, MapView } from '@deck.gl/core'
import { DeckGL } from '@deck.gl/react'
// https://deck.gl/docs/whats-new#use-react-map-gl-components-with-deckgl
import { _MapContext as MapContext, StaticMap, NavigationControl } from 'react-map-gl'

import { styled, setup } from 'goober'


setup(React.createElement)

const MapContainer = styled('div')({
  height: '100%',
  width: '100%',
  position: 'absolute',
})

const NavigationContainer = styled('div')(({ position }) => ({
  position: 'absolute',
  zIndex: 1,
  ...position,
}))

const MAP_VIEW = new MapView({ repeat: true })

const INIT_VIEW_STATE = {
  pitch: 0,
  bearing: 0,
  transitionDuration: 1000,
  transitionInterpolator: new FlyToInterpolator(),
  latitude: 52,
  longitude: -100,
  zoom: 2.5,
}

// DeckGL react component
const Map = ({
  layers,
  setDimensionsCb,
  setHighlightObj,
  getTooltip,
  getCursor,
  viewStateOverride,
  legend,
  legendPosition,
  onHover,
  onClick,
  showTooltip,
  renderTooltip,
  pitch,
  initViewState,
  setZoom,
  setCurrentViewport,
  setProcessingMapData,
  setInInteractiveState,
  controller,
  mapboxApiAccessToken,
}) => {
  const [mapViewState, setMapViewState] = useState({ ...INIT_VIEW_STATE, ...initViewState, pitch })
  const [{ height, width }, setDimensions] = useState({})
  const [hoverInfo, setHoverInfo] = useState({})

  const [inTransition, setInTransition] = useState(false)
  const [render, setRender] = useState(false)
  const [inInteractiveState] = useDebounce(inTransition || render, 300)

  useEffect(() => setInInteractiveState(inInteractiveState), [inInteractiveState, setInInteractiveState])

  const navigationPosition = useMemo(() => {
    let [right, left] = []
    if (legendPosition.split('-')[0] === 'bottom' && legendPosition.split('-')[1] === 'left') {
      right = '2.35rem'
    } else {
      left = '0.5rem'
    }
    return Object.freeze({ bottom: '5.75rem', right, left })
  }, [legendPosition])

  /*
   * we have to keep updating mapViewState in separate useEffect hooks as all props used to update
   * are independent of each other and are intended to be applied on the current mapViewState value
   */

  // initViewState is received externally in react-maps components
  useEffect(() => {
    if (initViewState && typeof initViewState === 'object' && !Array.isArray(initViewState)) {
      setMapViewState(o => ({
        ...o,
        ...initViewState,
      }))
    }
  }, [initViewState])

  // viewStateOverride is received from a react-maps map component
  useEffect(() => setMapViewState(o => ({ ...o, ...viewStateOverride })), [viewStateOverride])

  // pitch is applied when we have elevation and can be passed on either externally or internally in react-maps
  useEffect(() => {
    if (!Number.isNaN(pitch)) {
      setMapViewState(o => ({
        ...o,
        pitch,
      }))
    }
  }, [pitch])

  /**
   * finalOnHover - React hook that handles the onHover event for deck.gl map
   * @param { object } param - object of deck.gl onHover event
   * @param { object } param.hoverInfo - info of hovered object on map
   */
  const finalOnHover = useCallback(hoverInfo => {
    if (onHover) {
      onHover(hoverInfo)
    }
    if (showTooltip && hoverInfo?.object) {
      setHoverInfo(hoverInfo)
    } else {
      setHoverInfo(null)
    }
  }, [onHover, showTooltip])

  return (
    <MapContainer>
      <DeckGL
        ContextProvider={MapContext.Provider}
        onResize={({ height, width }) => {
          setDimensionsCb({ height, width })
          setDimensions({ height, width })
        }}
        onViewStateChange={o => {
          const { viewState, interactionState } = o
          if (!interactionState) {
            return // "hack" to allow MapContext/NavigationControl take over
          }
          const{ isDragging, isZooming, isPanning, isRotating, inTransition } = interactionState
          if (inTransition) {
            setInTransition(true)
          }
          // makes tooltip info disappear when we click and zoom in on a location
          setHoverInfo(null)
          // send zoom and viewState to parent comp
          if ([isDragging, isZooming, isPanning, isRotating].every(action => !action)) {
            setZoom(viewState.zoom)
            setCurrentViewport(viewState)
          }
          // reset highlightObj when we are actively interacting with the map in other ways
          if ([isDragging, isZooming, isPanning, isRotating].some(action => !action)) {
            setHighlightObj(null)
          }
          setMapViewState(o => ({
            ...o,
            ...viewState,
            // viewState overrides some of INIT_VIEW_STATE props we would like to keep
            transitionDuration: INIT_VIEW_STATE.transitionDuration,
            transitionInterpolator: INIT_VIEW_STATE.transitionInterpolator,
          }))
        }}
        onInteractionStateChange={(interactionState) => {
          const{ isDragging, inTransition, isZooming, isPanning, isRotating } = interactionState
          // when interaction with map ends, resets processingMapData state to show Loader component
          if ([isDragging, isZooming, isPanning, isRotating, inTransition].every(action => !action)) {
            setProcessingMapData(true)
          }
          setInTransition(inTransition)
        }}
        onBeforeRender={() => setRender(true)}
        onAfterRender={() => setRender(false)}
        initialViewState={mapViewState}
        views={ MAP_VIEW }
        layers={layers}
        controller={controller}
        onHover={finalOnHover}
        getTooltip={getTooltip}
        getCursor={getCursor}
        onClick={info => {
          if(!info?.object) {
            setHighlightObj(null)
          }
          onClick(info)
        }}
        glOptions={{
          preserveDrawingBuffer: true,  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
        }}
      >
        <NavigationContainer position={navigationPosition}>
          <NavigationControl showCompass={false}/>
        </NavigationContainer>
        <StaticMap
          mapboxApiAccessToken={mapboxApiAccessToken}
          preserveDrawingBuffer
        />
      </DeckGL>
      {legend}
      {showTooltip && hoverInfo?.object && typeof renderTooltip === 'function' && (
        renderTooltip({ hoverInfo, mapWidth: width, mapHeight: height })
      )}
    </MapContainer>
  )
}

Map.propTypes = {
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
  legendPosition: PropTypes.string,
  showTooltip: PropTypes.bool,
  renderTooltip: PropTypes.func,
  initViewState: PropTypes.object,
  pitch: PropTypes.number,
  setZoom: PropTypes.func,
  setCurrentViewport: PropTypes.func,
  onHover: PropTypes.func,
  onClick: PropTypes.func,
  setProcessingMapData: PropTypes.func,
  setInInteractiveState: PropTypes.func,
  controller: PropTypes.object,
  ...StaticMap.propTypes,
  ...commonProps,
}

Map.defaultProps = {
  layers: [],
  setDimensionsCb: () => {},
  setHighlightObj: () => {},
  getTooltip: () => {},
  getCursor: () => {},
  viewStateOverride: {},
  legend: undefined,
  legendPosition: 'bottom-right',
  showTooltip: false,
  renderTooltip: undefined,
  pitch: 0,
  initViewState: undefined,
  setZoom: () => {},
  setCurrentViewport: () => {},
  controller: { controller: true },
  onHover: () => {},
  onClick: () => {},
  setProcessingMapData: () => {},
  setInInteractiveState: () => {},
  ...StaticMap.defaultProps,
  ...commonDefaultProps,
}

export default Map
