import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'

import { commonProps, commonDefaultProps } from '../shared/map-props'

import { GeoJsonLayer } from '@deck.gl/layers'

import { interpolateBlues } from 'd3-scale-chromatic'

import { useLegends, useMapData, useElevation, useFill } from '../hooks'
import { getArrayGradientFillColors } from '../utils/color'
import { setLegendOpacity } from '../utils/legend'
import Map from './old-generic-map'


const GeoJsonMap = ({
  fillBasedOnInit,
  fillDataScale,
  fillColors,
  elevationBasedOnInit,
  elevationDataScale,
  elevations,
  onClick,
  onHover,
  opacity,
  getElevation,
  getFillColor,
  getLineWidth,
  getLineColor,
  showLegend,
  legendPosition,
  dataPropertyAccessor,
  mapboxApiAccessToken,
  ...geoJsonLayerProps
}) => {
  const [geoJson, setGeoJson] = useState('')
  const handleSetData = () => {
    try {
      const payload = JSON.parse(geoJson)
      // basic validation
      if (payload.type === 'FeatureCollection' && payload.features[0]) {
        metricDispatch({ type: 'data', payload })
      }
    } catch (e) {
      console.warn('Not Valid JSON')
    }
  }

  const { data, metrics, metricDispatch } = useMapData({
    dataAccessor: d => d.features,
    dataPropertyAccessor: d => d.properties,
  })
  
  const { elevationBasedOn, finalGetElevation, setElevationBasedOn } = useElevation({
    elevationBasedOnInit,
    getElevation,
    elevationDataScale,
    elevations,
    metrics,
    dataPropertyAccessor: d => d.properties,
  })

  const { fillBasedOn, finalGetFillColor, setFillBasedOn } = useFill({
    fillBasedOnInit,
    getFillColor,
    fillDataScale,
    fillColors,
    metrics,
    dataPropertyAccessor: d => d.properties,
  })

  const layers = useMemo(() => ([
    new GeoJsonLayer({
      id: 'xyz-scatterplot-layer',
      data,
      pickable: onClick || onHover,
      onClick,
      onHover,
      opacity,
      extruded: elevationBasedOn.length,
      getFillColor: finalGetFillColor,
      getElevation: finalGetElevation,
      getLineWidth,
      getLineColor,
      updateTriggers: {
        getFillColor: [finalGetFillColor, fillDataScale, fillColors],
        getElevation: [finalGetElevation, elevationDataScale, elevations],
      },
      ...geoJsonLayerProps,
    }),
  ]), [
    geoJsonLayerProps,
    data,
    onClick,
    onHover,
    elevationBasedOn,
    elevationDataScale,
    elevations,
    finalGetElevation,
    finalGetFillColor,
    fillColors,
    fillDataScale,
    getLineColor,
    getLineWidth,
    opacity,
  ])

  const legends = useLegends({
    elevationBasedOn,
    fillBasedOn,
    data,
    /**
   * We convert an array of string format colors, into an array of rgba string format colours so we
   * can use them in the Legend Gradient component
   *
   * There is visually a difference between the legend opacity for color gradient and map opacity,
   * we need to adjust opacity for symbols in the legend to have a closer match
   */
    fillColors: getArrayGradientFillColors({ fillColors, opacity: setLegendOpacity({ opacity }) }),
    dataPropertyAccessor,
  })

  return (
    <div>
      <div>
        <button onClick={handleSetData}>Load GeoJSON</button>
        <textarea onChange={e => setGeoJson(e.target.value)}/>
        <div>
          <strong>Fill Based On</strong>
          <select value={fillBasedOn} onChange={e => setFillBasedOn(e.target.value)}>
            <option value=''>None</option>
            {Object.keys(metrics).map(key => <option key={key}>{key}</option>)}
          </select>
        </div>
        <div>
          <strong>Elevation Based On</strong>
          <select value={elevationBasedOn} onChange={e => setElevationBasedOn(e.target.value)}>
            <option value=''>None</option>
            {Object.keys(metrics).map(key => <option key={key}>{key}</option>)}
          </select>
        </div>
      </div>
      <Map
        layers={layers}
        showLegend={showLegend}
        position={legendPosition}
        legends={legends}
        mapboxApiAccessToken={ mapboxApiAccessToken }
      />
    </div>
  )
}

GeoJsonMap.propTypes = {
  fillBasedOnInit: PropTypes.string,
  fillDataScale: PropTypes.string,
  fillColors: PropTypes.array,
  elevationBasedOnInit: PropTypes.string,
  elevationDataScale: PropTypes.string,
  elevations: PropTypes.array,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  opacity: PropTypes.number,
  filled: PropTypes.bool,
  getFillColor: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
  ]),
  getElevation: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
  ]),
  // elevationScale
  stroked: PropTypes.bool,
  lineWidthUnits: PropTypes.string,
  getLineWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.func,
  ]),
  getLineColor: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array,
  ]),
  showLegend: PropTypes.bool,
  legendPosition: PropTypes.string,
  dataPropertyAccessor: PropTypes.func,
  ...commonProps,
}

GeoJsonMap.defaultProps = {
  fillBasedOnInit: '',
  fillDataScale: 'linear',
  fillColors: [interpolateBlues(0), interpolateBlues(1)],
  elevationBasedOnInit: '',
  elevationDataScale: 'linear',
  elevations: [0, 1000000],
  onClick: undefined,
  onHover: undefined,
  opacity: 0.8,
  filled: true,
  getFillColor: [255, 140, 0],
  getElevation: 0,
  stroked: true,
  lineWidthUnits: 'pixels',
  getLineWidth: 2,
  getLineColor: [0, 0, 0],
  showLegend: false,
  legendPosition: 'top-left',
  dataPropertyAccessor: d => d.properties,
  ...commonDefaultProps,
}

export default GeoJsonMap
