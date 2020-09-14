import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { useQuery } from 'react-query'

import { interpolateBlues } from 'd3-scale-chromatic'

import { useConfigurableGeoJson } from './layers/configurable-geojson'
import { useConfigurableScatterplot } from './layers/configurable-scatterplot'

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

// ====[TODO] validation
// ====[TODO] parseExpression logic
const columnKey = columns => columns.map(([name, view]) => `${name}/${view}`).join('|##|')

const generateLocusMLQueryKey = ({ query, views }) => {
  return [
    `type:${query.type}`,
    `columns:${columnKey(query.columns)}`,
    `filters:${filterKey(query.filters)}`,
    `from:${query.from}`,
    `joins:${'x'}`,
    `where:${'x'}`,
    `groupBy:${columnKey(query.groupBy)}`,
    // ====[TODO] proper sorting
    `orderBy:${columnKey(query.orderBy)}`,
    `views:${views.map(({ id }) => id).join('|##|')}`
  ].join('/__/')
  "query": {
      "joins": [],
      "where": [
          {
              "type": "operator",
              "values": ["=", ["date_type", "report_1_4"], 2]
          },
          {
              "type": "operator",
              "values": ["=", ["start_date", "report_1_4"], "2017-11-13T05:00:00.000Z"]
          },
          {
              "type": "operator",
              "values": ["=", ["end_date", "report_1_4"], "2017-11-19T05:00:00.000Z"]
          },
          {
              "type": "function",
              "values": [
                  "dWithin",
                  { "type": "function", "cast": "geography", "values": ["setSRID", { "type": "function", "values": ["makePoint", ["lat", "report_1_4"],["lon","report_1_4"]] }, 4326] },
                  { "type": "function", "cast": "geography", "values": ["setSRID", { "type": "function", "values": ["makePoint", 45.4700622, -73.6164971] }, 4326] },
                  100000
              ]
          }
      ]
  },
  "views": [
      {
          "type": "report",
          "id": "report_1_4",
          "report_id": 4,
          "layer_id": 1,
          "name": "report_1_4"
      }
  ]
  return JSON.stringify(query)
}

const LocusMLMap = ({
  postMLQuery,
  fillBasedOnInit,
  fillDataScale,
  fillColors,
  getFillColor,
  radiusBasedOnInit,
  getRadius,
  radiusDataScale,
  radii,
  onClick,
  onHover,
  opacity,
  getLineWidth,
  getLineColor,
  showLegend,
  legendPosition,
  ...scatterLayerProps
}) => {
  console.log('=======')
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

  // ====[TODO] proper defaults for props & hooks
  const {
    metrics,
    metricDispatch,
    radiusBasedOn,
    setRadiusBasedOn,
    fillBasedOn,
    setFillBasedOn,
    layers,
    legends,
  } = useConfigurableScatterplot({
    radiusBasedOnInit,
    getRadius: () => 1000,
    radii: [0, 1000],
    radiusDataScale: 'linear',
    fillBasedOnInit,
    getFillColor,
    fillDataScale,
    fillColors,
    onClick,
    onHover,
    opacity,
    getLineWidth,
    getLineColor,
    scatterLayerProps,
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
          <strong>Radius Based On</strong>
          <select value={radiusBasedOn} onChange={e => setRadiusBasedOn(e.target.value)}>
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
