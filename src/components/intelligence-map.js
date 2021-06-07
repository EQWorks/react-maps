import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'

import { FlyToInterpolator } from '@deck.gl/core'
import { GeoJsonLayer, TextLayer } from '@deck.gl/layers'

import Map from './generic-map'

import {
  commonProps,
  commonDefaultProps,
} from '../shared/map-props'

const INIT_VIEW_STATE = {
  pitch: 0,
  bearing: 1,
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
  geoProvinceJson,
  geoProvinceValueJson,
  geoProvinceCentroidJson,
  geoCityJson
}) => {
  const [hoverProvince, setHoverProvince] = useState({})
  const [hoverCity, setHoverCity] = useState({})

  const handleFillColor = (type, d) => {
    let fillColor

    if (type === 'outer') {
      fillColor = [153, 204, 255, 70]

      geoProvinceValueJson.forEach(el => {
        if (hoverProvince.object) {
          if (d.pr_code === hoverProvince.object.pr_code) {
            fillColor = [0, 0, 0, 50]
          } 
          else if (d.pr_code === el.pr_code && el.value > 1) {
            (fillColor = [0, 128, 255, 80 + el.value])
          }
        } 
        else if (d.pr_code === el.pr_code && el.value > 1) {
          (fillColor = [0, 128, 255, 80 + el.value])
        }
      })
    } 
    else if (type === 'inner') {
      fillColor = [51, 51, 255, 90]

      if (hoverCity.object) {
        if (d?.properties?.CMANAME === hoverCity.object.properties?.CMANAME) {
          fillColor = [51, 51, 255, 255]
        }
      }
    }

    return fillColor
  }

  const getTooltip = (data) => {
    let temp = data
    let toolTipText

    if (temp && temp.properties) {
      toolTipText = `<span>${temp.properties.CMANAME} (${temp.value.toFixed(2)}%)</span>`
    }

    return toolTipText
  }
  
  const layers = useMemo(() => { 
    return [
      new GeoJsonLayer({
        id: 'outerGeo-layer',
        data: geoProvinceJson,
        pickable: true,
        stroked: false,
        extruded: true,
        filled: true,
        wireframe: true,
        getFillColor: d => handleFillColor('outer', d),
        updateTriggers: {
          getFillColor: { hoverProvince },
        },
        onHover: data => setHoverProvince(data),
      }),

      new GeoJsonLayer({
        id: 'innerGeo-layer',
        data: geoCityJson,
        pickable: true,
        stroked: false,
        extruded: true,
        filled: true,
        wireframe: true,
        getFillColor: d => handleFillColor('inner', d),
        updateTriggers: {
          getFillColor: [hoverCity],
        },
        onHover: data => setHoverCity(data),
      }),

      new TextLayer({
        id: 'text-layer',
        data: geoProvinceCentroidJson,
        pickable: false,
        getPosition: d => d.centroid.coordinates,
        getText: d => `${d.provinceValue.pr_name}\n ${d.provinceValue.value}%`,
        getPixelOffset: d => [d.offset.x, d.offset.y],
        getSize: 18,
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