import React, { useState, useCallback, useLayoutEffect, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

import {
  commonProps,
  commonDefaultProps,
} from '../shared/map-props'

import { FlyToInterpolator, MapView } from '@deck.gl/core'
import DeckGL from '@deck.gl/react'
import { StaticMap } from 'react-map-gl'
import { GeoJsonLayer, TextLayer } from '@deck.gl/layers';

import { styled, setup } from 'goober'


setup(React.createElement)

const MapContainer = styled('div')`
  height: 100%;
  width: 100%;
  position: absolute;
`

const MAP_VIEW = new MapView({ repeat: true })


const INIT_VIEW_STATE = {
  pitch: 0,
  bearing: 0,
  transitionDuration: 1000,
  transitionInterpolator: new FlyToInterpolator(),
  latitude: 61.411,
  longitude: -99,
  zoom: 2.5,
}

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

const defaultProps = {
  layers: [],
  setDimensionsCb: () => {},
  setHighlightObj: () => {},
  getTooltip: () => {},
  getCursor: () => {},
  viewStateOverride: {},
  legend: undefined,
  showTooltip: false,
  renderTooltip: undefined,
  pitch: 0,
}

// DeckGL react component
const IntelligenceMap = ({
  layers,
  setDimensionsCb,
  setHighlightObj,
  getTooltip,
  getCursor,
  viewStateOverride,
  legend,
  onHover,
  showTooltip,
  renderTooltip,
  pitch,
  mapboxApiAccessToken,
  geoProvinceJson,
}) => {
  const deckRef = useRef()
  const [viewState, setViewState] = useState(INIT_VIEW_STATE)
  const [hoverInfo, setHoverInfo] = useState({})

  const [GeoJson, setGeoJson] = useState(false)
  const [hoverProvince, setHoverProvince] = useState({})
  
  useEffect(() => {
    setGeoJson(geoProvinceJson)
  }, []);

  const handleFillColor = d => {
    let fillColor = [153, 204, 255, 70]
    if (hoverProvince.object) {
      if (d.pr_code === hoverProvince.object.pr_code) {
        fillColor = [0, 128, 255, 99]
      } else {
        fillColor = [153, 204, 255, 70]
      }
    } 

    return fillColor
  }

  layers = [
    new GeoJsonLayer({
      id: 'polygon-layer',
      data: GeoJson,
      pickable: true,
      stroked: false,
      extruded: true,
      filled: true,
      wireframe: true,
      getLineWidth: 1,
      lineWidthMinPixels: 1,
      lineWidthScale: 20,
      getText: d => d.pr_name,
      getLineWidth: 1,
      getElevation: 30,
      getFillColor: d => handleFillColor(d),
      getRadius: 100,
      updateTriggers: {
        getFillColor: [hoverProvince]
      },
      onHover: d => setHoverProvince(d)
  }),

  new TextLayer({
    id: 'text-layer',
    data: 'https://raw.githubusercontent.com/Clavicus/Testing-Requests/master/canadian-provinces.json',
    pickable: true,
    getPosition: d => [d.longitude, d.latitude],
    getText: d => d.short,
    getSize: 30,
    getAngle: 0,
    getTextAnchor: 'middle',
    getAlignmentBaseline: 'center',
  }),
];

  useLayoutEffect(() => {
    setViewState(o => ({
      ...INIT_VIEW_STATE,
      ...o,
      ...viewStateOverride,
      pitch,
    }))
  }, [pitch, viewStateOverride])

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
        ref={deckRef}
        onLoad={() => {
          const { height, width } = deckRef.current.deck
          setDimensionsCb({ height, width })
        }}
        onResize={({ height, width }) => {
          setDimensionsCb({ height, width })
        }}
        onViewStateChange={o => {
          const { viewState } = o
          setViewState(viewState)
          // makes tooltip info disappear when we click and zoom in on a location
          setHoverInfo(null)
        }}
        initialViewState={viewState}
        views={ MAP_VIEW }
        layers={layers}
        controller={true}
        onHover={finalOnHover}
        getTooltip={data => data.object && data.object.pr_name}
        getCursor={getCursor}
        onClick={({ object }) => {
          if(!object) {
            setHighlightObj(null)
          }
        }}
      >
        <StaticMap mapboxApiAccessToken={mapboxApiAccessToken}/>
      </DeckGL>
      {legend}
      {showTooltip && hoverInfo?.object && typeof renderTooltip === 'function' && (
        renderTooltip({ hoverInfo })
      )}
    </MapContainer>
  )
}

IntelligenceMap.propTypes = {
  ...propTypes,
  ...StaticMap.propTypes,
  ...commonProps,
}
IntelligenceMap.defaultProps = {
  ...defaultProps,
  ...StaticMap.defaultProps,
  ...commonDefaultProps,
}

export default IntelligenceMap
