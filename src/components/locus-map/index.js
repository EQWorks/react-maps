import React, { useState, useEffect, useMemo, useReducer, useCallback } from 'react'
import PropTypes from 'prop-types'

import { MVTLayer } from '@deck.gl/geo-layers'
import tUnion from '@turf/union'
import tCenter from '@turf/center'

import { Loader, getTailwindConfigColor } from '@eqworks/lumen-labs'
import { styled, setup } from 'goober'

import { typographyPropTypes, typographyDefaultProps } from '../../shared/map-props'
import { useLegends } from './hooks'
import { parseDeckGLLayerFromConfig, getObjectMVTData } from './utils/layer'
import { getTooltipParams } from './utils/tooltip'
import { setView } from './utils/map-view'
import { setView as simpleSetView } from '../../utils/map-view'
import Map from '../generic-map'
import MapTooltip from '../tooltip'
import tooltipNode from '../tooltip/tooltip-node'
import Legend from '../legend'
import { LEGEND_SIZE, LEGEND_POSITION, GEOJSON_TYPES } from '../../constants'


setup(React.createElement)

const LoaderWrapper = styled('div')`
  margin: 1rem;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${getTailwindConfigColor('secondary-50')};
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  opacity: 0.9;
`

const LocusMap = ({
  dataConfig,
  layerConfig,
  mapConfig,
}) => {
  const [finalDataConfig, setFinalDataConfig] = useState([])
  const [viewStateOverride, setViewStateOverride] = useState({})
  const [{ height, width }, setDimensions] = useState({})
  const [selectedFeatureIndexes, setSelectedFeatureIndexes] = useState([])
  const [selectShape, setSelectShape] = useState([])
  const [renderedFeatures, setRenderedFeatures] = useState([])
  const [renderCycleMVT, setRenderCycleMVT] = useState(0)
  // limits viewport adjusting by data to one time only, the first time when map loads with data
  const [viewportAdjustedByData, setViewportAdjustedByData] = useState(false)
  const [processingMapData, setProcessingMapData] = useState(true)

  const selectMode = useMemo(() =>
    layerConfig.find(layer => layer.layer === 'select' && layer.visible !== false), [layerConfig])

  // covers the cases when we cannot detect that map finished re-rendering polygons in a new viepwort
  useEffect(() => {
    if (processingMapData) {
      setTimeout(() => setProcessingMapData(false), 20000)
    }
  }, [processingMapData])

  // set controller for Map comp
  const controller = useMemo(() => {
    const layerList = layerConfig.reduce((agg, layer) => [...agg, layer.layer], [])
    if (layerList?.includes('select')) {
      return { ...controller, doubleClickZoom: false }
    }
    return { controller: true }
  }, [layerConfig])

  /**
   * finalOnClick - React hook that handles map's onClick events
   * @param { object } param
   * @param { object } param.info - clicked map object info
   */
  const finalOnClick = useCallback(info => {
    if (typeof mapConfig?.onClick === 'function') {
      mapConfig?.onClick(info)
    } else if (info.object && !selectMode) {  // when click event occurs, map will zoom in on the clicked object
      const obj = info.object
      let [data, longitude, latitude, zoom] = [[],0,0]
      // case for GeoJSON objects
      if (obj.geometry && obj.type === 'Feature') {
        data = [obj]
      } else if (info.layer.props.layerGeometry.source && info.layer.props.layerGeometry.target) {
        // arc layer object
        ['source', 'target'].forEach(point => {
          const { longitude, latitude, geometryAccessor = d => d } =
            info.layer.props.layerGeometry[point]
          data = [
            ...data,
            {
              type: 'Feature',
              geometry: {
                coordinates: [
                  obj[geometryAccessor(longitude)],
                  obj[geometryAccessor(latitude)],
                ],
                type: GEOJSON_TYPES.point,
              },
              properties: obj,
            },
          ]
        })
      } else {
        // case for Scatterplot point
        const { longitude, latitude, geometryAccessor = d => d }  = info.layer.props.layerGeometry
        data = [{
          type: 'Feature',
          geometry: {
            coordinates: [
              obj[geometryAccessor(longitude)],
              obj[geometryAccessor(latitude)],
            ],
            type: GEOJSON_TYPES.point,
          },
          properties: obj,
        }]
      }
      [longitude, latitude, zoom] = [...Object.values(simpleSetView({ data, height, width }))]
      setViewStateOverride(o => ({
        ...o,
        longitude,
        latitude,
        zoom,
      }))
    }
  }, [mapConfig, selectMode, width, height])

  // set state for layers and data
  const [{ layers }, configurableLayerDispatch] = useReducer((state, { type, payload }) => {
    if (type === 'init') {
      const { dataConfig, layerConfig } = payload
      // ====[NOTE] ids are for single-use sessions
      // ====[TODO] more thorough ID functions
      const dataIdMap = {}
      const data = dataConfig.reduce((agg, { id, data }, i) => {
        const newId = `data-${new Date().getTime()}-${i}`
        dataIdMap[id] = newId
        return {
          ...agg,
          [newId]: data,
        }
      }, {})

      let layers = layerConfig.reduce((agg, layer, i) => {
        const id = `layer-${layer.layer}-${new Date().getTime()}-${i}`
        // ====[TODO] fallback for invalid/missing dataId
        return {
          ...agg,
          [id]: {
            config: layer,
            deckLayer: parseDeckGLLayerFromConfig({
              ...layer,
              selectedFeatureIndexes,
              setSelectShape,
              id,
              setProcessingMapData,
            })(data[dataIdMap[layer.dataId]]),
          },
        }
      }, {})

      layers = state.layers['MVTRenderedFeatures'] ?
        {
          ['MVTRenderedFeatures']: state.layers['MVTRenderedFeatures'],
          ...layers,
        } :
        layers
      return {
        ...state,
        data,
        layers,
      }
    }

    if (type === 'select') {
      const { data } = payload
      const { layers } = state
      let selectLayer = {}

      for (const id in layers) {
        if (layers[id].config.layer === 'select') {
          selectLayer = {
            [id]: {
              ...layers[id],
              deckLayer: parseDeckGLLayerFromConfig({
                ...layers[id].config,
                id,
                selectedFeatureIndexes,
                setSelectShape,
              })(data),
            },
          }
        }
      }
      return {
        ...state,
        layers: {
          ...layers,
          ...selectLayer,
        },
      }
    }

    if (type === 'get GeoJSONMVT') {
      const { layer } = payload
      return {
        ...state,
        layers: {
          ...state.layers,
          ...layer,
        },
      }
    }

    return state
  }, { data: {}, layers: {} })

  // get all geometry for polygons in the viewport from MVT binary file
  const onViewportLoad = useCallback(tiles => {
    let renderedTiles = []
    tiles?.forEach(tile => {
      // data in world coordinates (WGS84)
      renderedTiles = tile.dataInWGS84 ? [...renderedTiles, ...tile.dataInWGS84] : renderedTiles
    })
    setRenderCycleMVT(o => o + 1)
    setRenderedFeatures(renderedTiles)
  }, [])

  /**
   * case when reading geometry from MVT layer to use in a GeoJSON layer:
   * get params of GeoJSON layer that uses MVT geom
   */
  const {
    geoJSONMVTLayerData,
    geoJSONMVTDataId,
    geoJSONMVTGeoKey,
    geoJSONMVTLayer,
    visibleMVTLayer,
    textGeoJSONMVTLayer,
  } = useMemo(() => {
    const geoJSONLayers = layerConfig?.filter(layer => layer.layer === 'geojson')
    const visbleMVTLayer = layerConfig.some(layer => layer.layer === 'MVT' &&
      (layer.visible === undefined || (layer.visible !== undefined && layer.visible)))
    const geoJSONMVT = geoJSONLayers?.reduce((acc, layer) => {
      const geoJSONLayerTileData = dataConfig.find(layerData => layerData.id === layer.dataId)
      if (geoJSONLayerTileData?.data?.tileGeom) {
        const { id, data } = geoJSONLayerTileData
        const geoKey = layer.geometry?.geoKey || ''
        acc = {
          geoJSONMVTLayerData: data,
          geoJSONMVTDataId: id,
          geoJSONMVTGeoKey: geoKey,
          geoJSONMVTLayer: layer,
        }
      }
      return acc
    }, {})
    const textGeoJSONMVTLayer = layerConfig?.find(layer =>
      layer.layer === 'text' && layer.dataId === geoJSONMVT.geoJSONMVTDataId)
    return { ...geoJSONMVT, visbleMVTLayer, textGeoJSONMVTLayer }
  }, [layerConfig, dataConfig])

  // create MVT layer to get all geometry for polygons in the viewport
  useEffect(() => {
    if (geoJSONMVTLayerData) {
      const id = 'MVTRenderedFeatures'
      const mvtLayer = new MVTLayer({
        ...geoJSONMVTLayer,
        id,
        data: geoJSONMVTLayerData.tileGeom,
        getFillColor: [251, 201, 78],
        pickable: false,
        visible: true,
        opacity: 0,
        showLegend: false,
        onViewportLoad,
      })
      configurableLayerDispatch({
        type: 'get GeoJSONMVT',
        payload: {
          layer: {
            [id]: { deckLayer: mvtLayer },
          },
        },
      })
    }
  }, [geoJSONMVTLayerData, geoJSONMVTLayer, onViewportLoad])

  // set finalDataConfig, taking care of the case when reading geometry from MVT layer
  useEffect(() => {
    if (geoJSONMVTLayerData && geoJSONMVTGeoKey) {
      const { tileData } = geoJSONMVTLayerData
      if (tileData?.length) {
        const tileDataObj = tileData.reduce((objData, item) => {
          const id = item[geoJSONMVTGeoKey]
          objData[id] = { ...item }
          return objData
        }, {})
        // combine geometry from MVT layer with data
        const combinedData = renderedFeatures.reduce((objData, item) => {
          const id = item.properties?.geo_id
          if (tileDataObj[id]) {
            let newPoly = item
            // merge polygons/multipolygons of a geo_id from different tiles into one single polygon/multipolygon
            if (objData[id]) {
              newPoly = tUnion(objData[id], item)
            }
            const centre = tCenter(newPoly)
            const [longitude, latitude] = textGeoJSONMVTLayer && centre?.geometry ?
              centre.geometry.coordinates :
              []
            objData[id] = {
              ...newPoly,
              properties:
              {
                ...item.properties,
                ...tileDataObj[id],
                longitude,
                latitude,
              },
            }
          }
          return objData
        }, {})
        const finalData = Object.values(combinedData)
        // add final data array for geojson layer
        setFinalDataConfig([
          ...dataConfig.filter(o => o.id !== geoJSONMVTDataId),
          { id: geoJSONMVTDataId, data: finalData },
        ])
      } else {
        setFinalDataConfig([
          ...dataConfig.filter(o => o.id !== geoJSONMVTDataId),
          { id: geoJSONMVTDataId, data: [] },
        ])
      }
    } else {
      const textLayer = layerConfig?.find(layer =>
        layer.layer === 'text' &&
        layer.dataId !== geoJSONMVTDataId)
      const textLayerData = dataConfig?.find(data => data.id === textLayer?.dataId)?.data
      let finalData = textLayerData
      // enrich geoJSON data objects with centre coordinates of polygons for text layer if required
      if (textLayer && textLayerData?.[0]?.type === 'Feature' &&
        [GEOJSON_TYPES.polygon, GEOJSON_TYPES.multipolygon].includes(textLayerData[0].geometry?.type)) {
        finalData = finalData?.reduce((acc, d) => {
          const centre = tCenter(d)
          const [longitude, latitude] = centre?.geometry?.coordinates || []
          return [
            ...acc,
            {
              ...d,
              properties: {
                ...d.properties,
                longitude,
                latitude,
              },
            },
          ]
        }, [])
        const { dataId } = textLayer || {}
        setFinalDataConfig([
          ...dataConfig.filter(o => o.id !== dataId),
          { id: dataId, data: finalData },
        ])
      } else {
        setFinalDataConfig(dataConfig)
      }
    }
  }, [
    dataConfig,
    layerConfig,
    renderedFeatures,
    geoJSONMVTLayerData,
    geoJSONMVTGeoKey,
    geoJSONMVTDataId,
    textGeoJSONMVTLayer,
  ])

  // set up condition for Loader render
  useEffect(() => {
    setProcessingMapData(true)
    // finalDataConfig cannot tell us when an MVT layer finishes loading tiles on the map
    if (finalDataConfig?.length && !visibleMVTLayer) {
      if (geoJSONMVTLayerData?.tileData?.length) {
        const finalGeoJSONMVTData = finalDataConfig.find(({ id }) => id === geoJSONMVTDataId)
        if (!renderedFeatures.length || finalGeoJSONMVTData?.data?.[0]?.properties) {
          setProcessingMapData(false)
        }
      } else {
        setProcessingMapData(false)
      }
    }
  }, [
    layerConfig,
    dataConfig,
    geoJSONMVTLayerData,
    geoJSONMVTDataId,
    visibleMVTLayer,
    finalDataConfig,
    renderedFeatures,
  ])

  // set initial layers and their corresponding data
  useEffect(() => {
    if (finalDataConfig.length) {
      configurableLayerDispatch({
        type: 'init',
        payload: { layerConfig, dataConfig: finalDataConfig },
      })
    }
  }, [layerConfig, finalDataConfig, dataConfig])

  // adjust viewport based on data
  useEffect(() => {
    if (width && height && finalDataConfig.length && !renderCycleMVT && !viewportAdjustedByData) {
      // recenter based on data
      let dataGeomList = []
      layerConfig.forEach(layer => {
        // don't adjust viewport when layer is 'arc', 'MVT', 'geojson', or 'select'
        if (!['arc', 'MVT', 'select'].includes(layer.layer)) {
          const data = finalDataConfig.find(elem => elem.id === layer.dataId)?.data
          // don't adjust viewport for geojson layer using mvt tile geom
          if (data?.length && geoJSONMVTDataId !== layer.dataId) {
            dataGeomList = [...dataGeomList, { data, ...layer.geometry }]
          }
        }
      })
      const dataView = dataGeomList?.length ? setView({ dataGeomList, width, height }) : {}
      if (!selectShape.length) {
        setViewStateOverride(o => ({
          ...o,
          ...dataView,
        }))
      }
      // limit adjusting viewport by data only to first time loading of the map
      setViewportAdjustedByData(true)
    }
  }, [
    finalDataConfig,
    layerConfig,
    mapConfig,
    selectShape,
    renderedFeatures,
    renderCycleMVT,
    height,
    width,
    viewportAdjustedByData,
    geoJSONMVTDataId,
  ])

  // update state for 'select' layer
  useEffect(() => {
    const selectActive = layerConfig.find(layer => layer.layer === 'select')
    if (selectActive && selectShape.length) {
      setSelectedFeatureIndexes([0])
      configurableLayerDispatch({ type: 'select', payload: { data: selectShape } })
    }
  }, [layerConfig, selectShape])

  // get all config data for all layer legends
  const legends = useLegends({ dataConfig: finalDataConfig, layerConfig, legendSize: mapConfig?.legendSize })

  // set legend element
  const legend = useMemo(() => {
    return (mapConfig.showMapLegend && (mapConfig.legendNode ||
      (legends?.length > 0 &&
        <Legend
          legends={legends}
          { ...mapConfig }
        />
      )
    ))}, [legends, mapConfig])

  /**
   * need to memoize map component so it doesn't render for each state change
   * this eliminates errors in re-rendering layers on the map when state changes
   */
  const locusMap = useMemo(() => (
    <Map
      layers={Object.values(layers).map(o => o.deckLayer)}
      setDimensionsCb={o => setDimensions(o)}
      viewStateOverride={viewStateOverride}
      controller={controller}
      { ...mapConfig }
      getCursor={mapConfig.cursor ?
        mapConfig.cursor(Object.values(layers).map(o => o.deckLayer)) :
        () => {}
      }
      showTooltip={mapConfig.showMapTooltip}
      renderTooltip={({ hoverInfo }) => {
        const { tooltipProps, ...tooltipParams } = getTooltipParams({ hoverInfo })
        const objMVTData = hoverInfo.layer.id.includes('MVT') ?
          getObjectMVTData({ dataConfig: finalDataConfig, hoverInfo }) :
          {}
        const { layer : { props: { interactions } } } = hoverInfo
        const tooltip = interactions?.tooltip
        if (tooltip) {
          return (
            <MapTooltip
              info={hoverInfo}
              tooltipProps={tooltipProps}
              typography={mapConfig.typography || typographyDefaultProps.typography}
            >
              {mapConfig.tooltipNode ||
                tooltipNode({
                  ...tooltipParams,
                  params: {
                    ...hoverInfo.object,
                    properties: {
                      ...hoverInfo.object.properties,
                      ...objMVTData,
                    },
                  },
                })
              }
            </MapTooltip>
          )
        }
        return null
      }}
      onClick={finalOnClick}
      setProcessingMapData={geoJSONMVTLayerData || visibleMVTLayer ?
        setProcessingMapData :
        () => {}
      }
    />
  ), [
    controller,
    finalDataConfig,
    mapConfig,
    layers,
    viewStateOverride,
    geoJSONMVTLayerData,
    visibleMVTLayer,
    finalOnClick,
  ])

  return (
    <>
      {locusMap}
      {legend}
      {processingMapData &&
        <LoaderWrapper>
          <Loader
            open={processingMapData}
            classes={{ icon: 'text-primary-700' }}
          />
        </LoaderWrapper>
      }
    </>
  )
}

LocusMap.propTypes = {
  dataConfig: PropTypes.array.isRequired,
  layerConfig: PropTypes.array.isRequired,
  mapConfig: PropTypes.shape({
    cursor: PropTypes.func,
    legendPosition: PropTypes.oneOf([...LEGEND_POSITION]),
    legendSize: PropTypes.oneOf([...Object.values(LEGEND_SIZE)]),
    legendNode: PropTypes.node,
    showMapLegend: PropTypes.bool,
    tooltipNode: PropTypes.node,
    showMapTooltip: PropTypes.bool,
    initViewState: PropTypes.object,
    setCurrentViewport: PropTypes.func,
    pitch: PropTypes.number,
    mapboxApiAccessToken: PropTypes.string.isRequired,
    typography: PropTypes.object,
  }).isRequired,
  ...typographyPropTypes,
}

LocusMap.defaultProps = {
  ...typographyDefaultProps,
}

export default LocusMap
