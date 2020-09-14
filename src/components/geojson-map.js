import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { interpolateBlues } from 'd3-scale-chromatic'

import { useConfigurableGeoJson } from './layers/configurable-geojson'
import Map from './generic-map'


const propTypes = {
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
}

const defaultProps = {
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
}

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

  const {
    metrics,
    metricDispatch,
    elevationBasedOn,
    setElevationBasedOn,
    fillBasedOn,
    setFillBasedOn,
    layers,
    legends,
  } = useConfigurableGeoJson({
    elevationBasedOnInit,
    getElevation,
    elevationDataScale,
    elevations,
    fillBasedOnInit,
    getFillColor,
    fillDataScale,
    fillColors,
    onClick,
    onHover,
    opacity,
    getLineWidth,
    getLineColor,
    geoJsonLayerProps,
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
      />
    </div>
  )
}

GeoJsonMap.propTypes = propTypes
GeoJsonMap.defaultProps = defaultProps

export default GeoJsonMap
