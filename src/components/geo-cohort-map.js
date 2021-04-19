import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { GeoJsonLayer } from '@deck.gl/layers'
import PropTypes from 'prop-types'

import {
  commonProps,
  commonDefaultProps,
  typographyPropTypes,
  typographyDefaultProps,
  tooltipPropTypes,
  tooltipDefaultProps,
} from '../shared/map-props'

import Map from './generic-map'
import { setView, setFinalLayerDataAccessor } from '../shared/utils'
import { useMapData, useLegends, useArrayFillColors } from '../hooks'


const propTypes = {
  fillBasedOn: PropTypes.string,
  fillDataScale: PropTypes.string,
  fillColors: PropTypes.array,
  elevationBasedOn: PropTypes.string,
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

  reportData: PropTypes.array.isRequired,
  // highlightId: PropTypes.number,
  getCursor: PropTypes.func,
  getTooltip: PropTypes.func,
  showTooltip: PropTypes.bool,
  tooltipNode: PropTypes.func,
}

const defaultProps = {
  fillBasedOn: '',
  fillDataScale: 'linear',
  fillColors: ['#0062d9', '#dd196b'],
  elevationBasedOn: '',
  elevationDataScale: 'linear',
  elevations: [0, 1000],
  onClick: undefined,
  onHover: undefined,
  opacity: 0.8,
  filled: true,
  getFillColor: [0, 98, 217],
  getElevation: 0,
  stroked: true,
  lineWidthUnits: 'pixels',
  getLineWidth: 2,
  getLineColor: [0, 0, 0],
  showLegend: false,
  legendPosition: 'top-left',
  getTooltip: undefined,
  showTooltip: false,
  tooltipNode: undefined,
  getCursor: undefined,
}

const GeoCohortMap = ({
  reportData,
  filled,
  stroked,
  fillBasedOn,
  fillDataScale,
  fillColors,
  elevationBasedOn,
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
  getCursor,
  getTooltip,
  showTooltip,
  tooltipProps,
  tooltipNode,
  tooltipKeys,
  typography,
  mapboxApiAccessToken,
  ...geoJsonLayerProps
}) => {
  const [viewStateOverride, setViewOverride] = useState({})
  // const [highlightId, setHighlightId] = useState(0)
  const [{ height, width }, setDimensions] = useState({})

  useEffect(() => {
    if (width && height) {
      // recenter based on data
      const dataView = setView({ data: reportData, width, height })
      setViewOverride(o => ({
        ...o,
        ...dataView,
      }))
    }
  }, [reportData, height, width])

  /**
   * finalOnClick - React hook that handles layer's onClick events
   * @param { object } param
   * @param { object } param.object - clicked object on the map
   */
  const finalOnClick = useCallback(({ object }) => {
    if (onClick) {
      onClick(object)
    } else if (object) {
      // recenter and zoom on the clicked element
      const dataView = setView({ data: [object], width, height })
      setViewOverride(o => ({
        ...o,
        ...dataView,
      }))
    }
  }, [onClick, width, height])

  useEffect(() => {
    if (reportData.length) {
      metricDispatch({ type: 'data', payload : reportData })
    }
  }, [metricDispatch, reportData])

  const { metrics, metricDispatch } = useMapData({
    dataAccessor: d => d,
    dataPropertyAccessor: d => d.properties,
  })

  /**
   * finalTooltipKeys - React hook that returns an object of keys for map's Tooltip component
   * @returns { Node } - object of keys { name, id, metricKeys }
   */
  const finalTooltipKeys = useMemo(() => {
    let metricKeysArray = []
    // set metricKeys array if no custom keys are given
    if (!tooltipKeys?.metricKeys?.length) {
      ([elevationBasedOn, fillBasedOn]).forEach((key) => {
        if (key) {
          metricKeysArray.push(key)
        }
      })
    }
    return {
      ...tooltipKeys,
      metricKeys: metricKeysArray,
    }
  }, [tooltipKeys, elevationBasedOn, fillBasedOn])

  // we need to convert string format color (used in legend) to array format color for deck.gl
  const layerFillColors = useArrayFillColors({ fillColors })

  const layers = useMemo(() => ([
    new GeoJsonLayer({
      id: `${reportData[0]?.properties._id.GeoCohortListID}-fsa-layer || 'generic-geojson-layer`,
      data: reportData,
      pickable: Boolean(onClick || onHover || getTooltip || getCursor),
      stroked,
      onClick: finalOnClick,
      opacity,
      extruded: elevationBasedOn.length,
      filled,
      getFillColor: setFinalLayerDataAccessor({
        dataKey: fillBasedOn,
        dataPropertyAccessor: (d) => d.properties,
        getLayerProp: getFillColor,
        layerDataScale: fillDataScale,
        layerPropRange: layerFillColors,
        metrics,
      }),
      getElevation: setFinalLayerDataAccessor({
        dataKey: elevationBasedOn,
        dataPropertyAccessor: (d) => d.properties,
        getLayerProp: getElevation,
        layerDataScale: elevationDataScale,
        layerPropRange: elevations,
        metrics,
      }),
      getLineWidth,
      getLineColor,
      updateTriggers: {
        getFillColor: [fillBasedOn, getFillColor, fillDataScale, layerFillColors, metrics],
        getElevation: [elevationBasedOn, getElevation, elevationDataScale, elevations, metrics],
        getLineWidth: [getLineWidth],
        getLineColor: [getLineColor],
      },
      ...geoJsonLayerProps,
    }),
  ]), [
    geoJsonLayerProps,
    reportData,
    metrics,
    onClick,
    finalOnClick,
    onHover,
    elevationBasedOn,
    elevationDataScale,
    elevations,
    filled,
    stroked,
    fillBasedOn,
    fillDataScale,
    layerFillColors,
    getElevation,
    getFillColor,
    getLineColor,
    getLineWidth,
    opacity,
    getCursor,
    getTooltip,
  ])

  const legends = useLegends({ elevationBasedOn, fillBasedOn, fillColors, metrics })

  return (
    <Map
      layers={layers}
      setDimensionsCb={(o) => setDimensions(o)}
      getTooltip={getTooltip}
      getCursor={getCursor}
      onHover={onHover}
      viewStateOverride={viewStateOverride}
      showTooltip={showTooltip}
      tooltipProps={tooltipProps}
      tooltipNode={tooltipNode}
      typography={typography}
      tooltipKeys={finalTooltipKeys}
      showLegend={showLegend}
      legendPosition={legendPosition}
      legends={legends}
      mapboxApiAccessToken={mapboxApiAccessToken}
    />
  )
}

GeoCohortMap.propTypes = {
  ...propTypes,
  ...commonProps,
  ...tooltipPropTypes,
  ...typographyPropTypes,
}
GeoCohortMap.defaultProps = {
  ...defaultProps,
  ...commonDefaultProps,
  ...tooltipDefaultProps,
  ...typographyDefaultProps,
}

export default GeoCohortMap
