import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'

import { FlyToInterpolator } from '@deck.gl/core'
import { GeoJsonLayer, TextLayer } from '@deck.gl/layers'

import Map from '../generic-map'
import { getProvinceFillColor, getCityFillColor } from './hooks'

import {
  commonProps,
  commonDefaultProps,
} from '../../shared/map-props'

const INIT_VIEW_STATE = {
  pitch: 0,
  bearing: 0,
  transitionDuration: 1000,
  transitionInterpolator: new FlyToInterpolator(),
  latitude: 58,
  longitude: -94,
  zoom: 2.6,
}

const propTypes = {
  viewStateOverride: PropTypes.object,
  pitch: PropTypes.number,
}

const defaultProps = {
  viewStateOverride: {},
  pitch: 0,
}

// DeckGL react component
const IntelligenceMap = ({
  mapboxApiAccessToken,
  geoProvinceCentroidJson,
  intelligenceProvince,
  intelligenceCity,
}) => {
  const [hoverProvince, setHoverProvince] = useState({})
  const [hoverCity, setHoverCity] = useState({})

  let minP = null
  let maxP = null

  Object.values(intelligenceProvince).forEach((province) => {
    if (!minP || province.value.total < minP) {
      minP = province.value.total
    }
    if (!maxP || province.value.total > maxP) {
      maxP = province.value.total
    }
  })

  let minC = null
  let maxC = null

  Object.values(intelligenceCity).forEach((city) => {
    if (!minC || city.value.total < minC) {
      minC = city.value.total
    }
    if (!maxC || city.value.total > maxC) {
      maxC = city.value.total
    }
  })

  const handleFillColor = (type, d) => {
    let fillColor;

    if (type === 'outer') {
      fillColor = getProvinceFillColor(d.value.total, maxP, minP)
      if (hoverProvince.object) {
        if (d.properties.CODE === hoverProvince.object.properties.CODE) {
          fillColor = [157, 185, 202]
        } 
      }
    } 
    else if (type === 'inner') {
      fillColor = getCityFillColor(d.value.total, maxC, minC)

      if (hoverCity.object) {
        if (d?.properties?.CMANAME === hoverCity.object.properties?.CMANAME) {
          fillColor = [0, 92, 161]
        }
      }
    }

    return fillColor
  }

  const getTooltip = (data) => {
    let temp = data
    let toolTipText

    if (temp && temp.properties.CMANAME) {
      toolTipText = `<span>${temp.properties.CMANAME} (${temp.value.percentage.toFixed(2)}%)</span>`
    }

    return toolTipText
  }
  
  const layers = useMemo(() => { 
    return [
      new GeoJsonLayer({
        id: 'outerGeo-layer',
        data: intelligenceProvince,
        pickable: true,
        stroked: true,
        filled: true,
        getLineColor: [0, 0, 0],
        lineWidthMinPixels: 1,
        getFillColor: d => handleFillColor('outer', d),
        updateTriggers: {
          getFillColor: { hoverProvince },
        },
        onHover: data => setHoverProvince(data),
      }),

      new GeoJsonLayer({
        id: 'innerGeo-layer',
        data: intelligenceCity,
        pickable: true,
        stroked: true,
        filled: true,
        getLineColor: [0, 0, 0],
        lineWidthMinPixels: 1,
        getFillColor: d => handleFillColor('inner', d),
        updateTriggers: {
          getFillColor: [hoverCity],
        },
        onHover: data => setHoverCity(data),
      }),

      new TextLayer({
        id: 'text-layer',
        data: geoProvinceCentroidJson,
        billboard: false,
        pickable: false,
        getPosition: d => d.centroid.coordinates,
        getText: d => `${d.name}\n ${d.value.percentage}%`,
        getPixelOffset: d => [d.offset.x, d.offset.y],
        getSize: 12,
        getAngle: 0,
        getTextAnchor: 'middle',
        getAlignmentBaseline: 'center',
      }),
    ]
  })

  return (
    <Map 
      layers={layers}
      getTooltip={(object) => object && getTooltip(object.object) && {
        html: getTooltip(object.object),
        style: {
          color: 'black',
          backgroundColor: 'white',
          borderRadius: '10px',
          border: '1px solid black',
        },
      }}
      controller={false}
      pitch={20}
      viewStateOverride={INIT_VIEW_STATE}
      mapboxApiAccessToken={mapboxApiAccessToken}
      mapStyle="mapbox://styles/chiuleung/ckon6rngz3wpg17pkwuj12hrx"
    />
  )
}

IntelligenceMap.propTypes = {
  ...propTypes,
  ...commonProps,
}
IntelligenceMap.defaultProps = {
  ...defaultProps,
  ...commonDefaultProps,
}

export default IntelligenceMap