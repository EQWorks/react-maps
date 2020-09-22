import React, { useState, useMemo, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'

import { useQuery } from 'react-query'

import {
  EditableGeoJsonLayer,
  DrawPointMode,
  DrawCircleFromCenterMode,
  DrawRectangleMode,
  DrawPolygonMode,
} from 'nebula.gl'

import { interpolateBlues } from 'd3-scale-chromatic'

import { useConfigurableLayer } from './layers/configurable-layer'
import LayerControls from './layer-controls'
import { generateLocusMLQueryKey } from '../locus-ml/locus-ml-utils'
import { usePointRadiusTemplate } from '../locus-ml/report-query-template'

import Map from './generic-map'


const DRAW_MODE = {
  'polygon': DrawPolygonMode,
  'rectangle': DrawRectangleMode,
  'circle': DrawCircleFromCenterMode,
}

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
  radiusBasedOnInit: '',
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

const LAYER_FEATURE_KEYS = {
  scatterplot: { latitude: ['lat', 'latitude'], longitude: ['lon', 'lng', 'longitude'] },
  geojson: { geojson: ['geojson'] },
}


const LocusMLMap = ({
  postMLQuery,
  useRawInput,
  fillBasedOnInit,
  fillDataScale,
  fillColors,
  getFillColor,
  radiusBasedOnInit,
  getRadius,
  radiusDataScale,
  radii,
  elevationBasedOnInit,
  elevationDataScale,
  elevations,
  getElevation,
  onClick,
  onHover,
  opacity,
  getLineWidth,
  getLineColor,
  showLegend,
  legendPosition,
  ...otherLayerProps
}) => {
  console.log('======= RENDER =======')
  const [query, setMLQuery] = useState('{}')
  const [queryKey, setQueryKey] = useState('')

  const { query: templateQuery, distanceInMeters, lat, lon, setDistance, setCoordinates } = usePointRadiusTemplate()

  const setCoordsOnClick = o => {
    console.log('====> on click', o)
    const [lon, lat] = o.coordinate
    setCoordinates({ lat, lon })
  }
  // ====[TODO] temp state solution
  useEffect(() => {
    if (!useRawInput) {
      setMLQuery(templateQuery)
    }
  }, [useRawInput, templateQuery])

  const handleSetData = () => {
    try {
      const jsonQuery = typeof query === 'object' ? query : JSON.parse(query)
      const queryKey = generateLocusMLQueryKey(jsonQuery)
      console.log('=====> handle set data!', queryKey)
      setQueryKey(queryKey)
    } catch (e) {
      console.warn("===== INVALID LOCUSML QUERY =====", e)
    }
  }
  const {
    isSuccess,
    isLoading,
    error,
    data: payload,
  } = useQuery(
    queryKey,
    () => postMLQuery({ query: typeof query === 'object' ? query : JSON.parse(query) }),
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

  const [
    {
      layerType,
      featureKeys,
    },
    setLayer,
  ] = useReducer((state, { type, value }) => {
    if (type === 'layer') {
      let { featureKeys } = state
      if (payload) {
        // check for default feature keys
        // assumes [{}] payload
        featureKeys = Object.entries(LAYER_FEATURE_KEYS[value] || {}).reduce((agg, [internalKey, defaultKeys]) => {
          console.log('--->', internalKey, defaultKeys)
          for (let i = 0; i < defaultKeys.length; i++) {
            const key = defaultKeys[i]
            // ====[TODO] sample other rows of the return
            console.log("====> SEARCHING FOR", key)
            if (key in payload[0]) {
              agg[internalKey]  = key
              break
            }
          }
          return agg
        }, {})
      }
      console.log('----> update layer type', value)
      return {
        ...state,
        layerType: value,
        featureKeys,
      }
    }

    if (type === 'featureKeys') {
      return {
        ...state,
        featureKeys: {
          ...state.featureKeys,
          ...value,
        }
      }
    }
    return {
      ...state,
      [payload]: value,
    }
  }, {})

  // from useConfigurableXXXLayer
  const {
    metrics,
    metricDispatch,
    radiusBasedOn,
    setRadiusBasedOn,
    fillBasedOn,
    setFillBasedOn,
    elevationBasedOn,
    setElevationBasedOn,
    layers,
    legends,
  } = useConfigurableLayer({
    layerType,
    featureKeys,
    payload,
    radiusBasedOnInit,
    getRadius: () => 1000,
    radii: [0, 1000],
    radiusDataScale: 'linear',
    fillBasedOnInit,
    getFillColor,
    fillDataScale,
    fillColors,
    elevationBasedOnInit,
    elevationDataScale,
    elevations,
    getElevation,
    onClick,
    onHover,
    opacity,
    getLineWidth,
    getLineColor,
    otherLayerProps,
  })

  const [draw, setDraw] = useState(false)
  const [features, setFeatures] = useState([])

  const finalLayers = useMemo(() => {
    let finalLayers = []
    if (draw) {
      finalLayers.push(new EditableGeoJsonLayer({
        id: 'ml-contains-draw',
        data: {
          type: 'FeatureCollection',
          features,
        },
        mode: DRAW_MODE[draw],
        selectedFeatureIndexes: [], // can be static
        onEdit: ({ updatedData, editType }) => {
          console.log('=====> EDIT!', updatedData, editType)
          // https://nebula.gl/docs/api-reference/layers/editable-geojson-layer
          if (editType === 'addFeature') {
            setFeatures(updatedData.features.slice(-1))
          }
        }
      }))
    }
    finalLayers = [...finalLayers, ...layers]
    return finalLayers
  }, [layers, draw, features, setFeatures])

  return (
    <div>
      <div>
        <button onClick={handleSetData}>Load ML Query</button>
        {useRawInput ? (<>
          <textarea onChange={e => setMLQuery(e.target.value)}/>
        </>) : (<div>
          <label>Radius (m)</label>
          <input type='number' value={distanceInMeters} onChange={e => setDistance(e.target.value)} />
          <p>Current Coordinates: {lat} / {lon} (click map to set)</p>
          <label>Draw</label>
          <select onChange={e => setDraw(e.target.value)}>
            <option value={false}>None</option>
            <option value='rectangle'>Rectangle</option>
            <option value='circle'>Circle</option>
            <option value='polygon'>Polygon</option>
          </select>
        </div>)}
        <LayerControls
          payload={payload}
          layerType={layerType}
          featureKeys={featureKeys}
          metrics={metrics}
          setLayer={setLayer}
          radiusBasedOn={radiusBasedOn}
          setRadiusBasedOn={setRadiusBasedOn}
          elevationBasedOn={elevationBasedOn}
          setElevationBasedOn={setElevationBasedOn}
          fillBasedOn={fillBasedOn}
          setFillBasedOn={setFillBasedOn}
        />
      </div>
      <Map
        layers={finalLayers}
        showLegend={showLegend}
        position={legendPosition}
        legends={legends}
        onClick={setCoordsOnClick}
      />
    </div>
  )
}

LocusMLMap.propTypes = propTypes
LocusMLMap.defaultProps = defaultProps

export default LocusMLMap
