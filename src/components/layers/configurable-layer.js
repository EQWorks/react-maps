import { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'

import { ScatterplotLayer, GeoJsonLayer } from 'deck.gl'

import { useLegends, useMapData, useRadius, useFill, useElevation } from '../../hooks'


export const useConfigurableLayer = ({
  layerType,
  featureKeys,
  elevationBasedOnInit,
  getElevation,
  elevationDataScale,
  elevations,
  radiusBasedOnInit,
  getRadius,
  radiusDataScale,
  radii,
  fillBasedOnInit,
  getFillColor,
  fillDataScale,
  fillColors,
  onClick,
  onHover,
  useTooltip,
  opacity,
  getLineWidth,
  getLineColor,
  otherLayerProps,
}) => {
  let dataAccessor
  let dataPropertyAccessor

  if (layerType === 'geojson') {
    dataAccessor = d => d.features
    dataPropertyAccessor = d => d.properties
  }
  const { data, metrics, metricDispatch } = useMapData({
    dataAccessor,
    dataPropertyAccessor,
  })

  const { finalGetRadius, radiusBasedOn, setRadiusBasedOn } = useRadius({
    radiusBasedOnInit,
    getRadius,
    radiusDataScale,
    radii,
    metrics,
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
  })

  const finalOnClick = useCallback(o => {
    if (onClick) {
      onClick(o)
    }
    // ====[TODO] decide tooltip
    // if (useTooltip) {
    //   tooltipDispatch({ layerType: 'show', payload: o })
    // }
  }, [onClick, useTooltip])

  // ====[TODO] map of layer config? Similar to utils > processLayers
  const layers = useMemo(() => {
    const layersToRender = []
    // ====[TODO] layer config validation
    if (layerType ==='scatterplot' && data[0][featureKeys.longitude]) {
      layersToRender.push(new ScatterplotLayer({
        id: 'xyz-scatterplot-layer',
        data,
        getPosition: d => [d[featureKeys.longitude], d[featureKeys.latitude]],
        pickable: useTooltip || onClick || onHover,
        onClick: finalOnClick,
        onHover,
        opacity,
        getRadius: finalGetRadius,
        getFillColor: finalGetFillColor,
        updateTriggers: {
          getRadius: [finalGetRadius, radiusBasedOn, getRadius],
          getFillColor: [finalGetFillColor, fillBasedOn, getFillColor],
          getPosition: [featureKeys.longitude, featureKeys.latitude],
        },
        getLineWidth,
        getLineColor,
        ...otherLayerProps,
      }))
    }
    if (layerType === 'geojson' && data[0][featureKeys.geojson]) {
      layersToRender.push(new GeoJsonLayer({
        id: `xyz-geojson-layer`,
        // ====[TODO] should we add the other keys from data into the geojson?
        data: data.map(o => o[featureKeys.geojson]),
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
          getElevation: [finalGetElevation, elevationDataScale, elevations]
        },
        ...otherLayerProps,
      }))
    }
    return layersToRender
  }, [
    layerType,
    featureKeys,
    otherLayerProps,
    data,
    onClick,
    onHover,
    finalOnClick,
    useTooltip,
    finalGetRadius,
    radiusBasedOn,
    getRadius,
    finalGetFillColor,
    fillBasedOn,
    fillDataScale,
    fillColors,
    getFillColor,
    finalGetElevation,
    elevationBasedOn,
    elevationDataScale,
    elevations,
    getLineColor,
    getLineWidth,
    opacity,
  ])

  const legends = useLegends({ radiusBasedOn, fillBasedOn, fillColors, metrics })

  console.log("=====> CONFIGURABLE LAYER!", featureKeys, layers)
  return {
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
  }
}