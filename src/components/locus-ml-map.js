import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useQuery } from 'react-query'

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

const generateLocusMLQueryKey = query => {
  return JSON.stringify(query)
}

const LocusMLMap = ({
  postMLQuery,
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
  const [query, setMLQuery] = useState('{}')
  const [queryKey, setQueryKey] = useState('')

  const handleSetData = () => {
    try {
      const jsonQuery = JSON.parse(query)
      const queryKey = generateLocusMLQueryKey(jsonQuery)
      setQueryKey(queryKey)
    } catch (e) {
      console.warn("===== INVALID LOCUSML QUERY =====")
    }
  }
  const {
    isSuccess,
    isLoading,
    error,
    data: payload,
  } = useQuery(
    'locusml',
    () => postMLQuery({ query: JSON.parse(query) }),
  )
  
  useEffect(() => {
    if (isSuccess) {
      console.log('======> UPDATE MAP DATA', payload)
      metricDispatch({ type: 'data', payload })
    }
  }, [payload, isSuccess, metricDispatch])

  // ====[TODO] a successful query here is [{}] with no geojson
  // ====] do we convert the data?
  // ====] or use a toggle to switch between the layers?
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
        <button onClick={handleSetData}>Load ML Query</button>
        <textarea onChange={e => setMLQuery(e.target.value)}/>
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

LocusMLMap.propTypes = propTypes
LocusMLMap.defaultProps = defaultProps

export default LocusMLMap
