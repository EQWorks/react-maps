import { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'

import { ScatterplotLayer } from 'deck.gl'

import { useLegends, useMapData, useRadius, useFill } from '../../hooks'


export const useConfigurableScatterplot = ({
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
  scatterLayerProps,
}) => {
  const { data, metrics, metricDispatch } = useMapData({})

  const { finalGetRadius, radiusBasedOn, setRadiusBasedOn } = useRadius({
    radiusBasedOnInit,
    getRadius,
    radiusDataScale,
    radii,
    metrics,
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
    // if (useTooltip) {
    //   tooltipDispatch({ type: 'show', payload: o })
    // }
  }, [onClick, useTooltip])

  const layers = useMemo(() => ([
    new ScatterplotLayer({
      id: 'xyz-scatterplot-layer',
      data,
      getPosition: d => [d.lon, d.lat],
      pickable: useTooltip || onClick || onHover,
      onClick: finalOnClick,
      onHover,
      opacity,
      getRadius: finalGetRadius,
      getFillColor: finalGetFillColor,
      updateTriggers: {
        getRadius: [finalGetRadius, radiusBasedOn, getRadius],
        getFillColor: [finalGetFillColor, fillBasedOn, getFillColor],
      },
      getLineWidth,
      getLineColor,
      ...scatterLayerProps,
    })
  ]), [
    scatterLayerProps,
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
    getFillColor,
    getLineColor,
    getLineWidth,
    opacity,
  ])

  const legends = useLegends({ radiusBasedOn, fillBasedOn, fillColors, metrics })

  return {
    metrics,
    metricDispatch,
    radiusBasedOn,
    setRadiusBasedOn,
    fillBasedOn,
    setFillBasedOn,
    layers,
    legends,
  }
}