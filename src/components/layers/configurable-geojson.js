import { useMemo } from 'react'
import PropTypes from 'prop-types'

import { GeoJsonLayer } from 'deck.gl'

import { useLegends, useMapData, useElevation, useFill } from '../../hooks'


export const useConfigurableGeoJson = ({
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
}) => {
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
      id: `xyz-geojson-layer`,
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
        getElevation: [finalGetElevation, elevationDataScale, elevations]
      },
      ...geoJsonLayerProps,
    })
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

  const legends = useLegends({ elevationBasedOn, fillBasedOn, fillColors, metrics })

  return {
    metrics,
    metricDispatch,
    elevationBasedOn,
    setElevationBasedOn,
    fillBasedOn,
    setFillBasedOn,
    layers,
    legends,
  }
}