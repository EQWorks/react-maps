import { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'

import { ScatterplotLayer, GeoJsonLayer } from 'deck.gl'

import { useLegends, useMapData, useRadius, useFill, useElevation } from '../../hooks'


// one object to generate options & controls
// one object to be consumed
// ====[TODO] what about a COMBO layer?
/*
  multi: true,
  layers: [
    {custom object},
    'name of layer',
  ]
*/

const latitudeFields = ['lat', 'latitude']
const longitudeFields = ['lon', 'longitude']
// ====[TODO] parseInt
const validKey = (value, type) => value !== undefined && value !== null && typeof value === type
// ====[TODO] actual geojson validation
const hasGeoJson = row => Object.isObject(row) && Object.values(row).some(value => value.features !== null)

const LAYER_CONFIG = {
  // ====[TODO] tileLayer https://deck.gl/examples/tile-layer/
  scatterplot: {
    notAClass: false,
    deckGLClass: ScatterplotLayer,
    geometry: {
      longitude: { source: 'field', type: 'number' },
      latitude: { source: 'field', type: 'number' }
    },
    validator: (d) => Array.isArray(d) && d.every(row => latitudeFields.some(key => validKey(row[key], 'number')) &&  longitudeFields.some(key => validKey(row[key], 'number'))), 
    // ====[NOTE] can always be based on a field
    configurableVisualizations: {
      radius: {
        default: 10,
        // ====[NOTE] if BASED_ON, then define a way to choose the range of values?
        // radius -> range of floats, min -> max
        // ====[TODO] look at d3 scales and the effect of supplying [1,4,6] as values of radii/elevations
        type: 'number',
        control: 'slider'
      },
      fill: {
        default: [255, 0, 0],
        // array of color options to use as fillColors
        // ====[TODO] different templates for color choices? each a picker for d3 colors vs preset scales vs just lightness?
        type: 'color',
        control: 'select',
        options: ['picker', 'scales']
      },
      strokeWidth: {
        default: 1,
        type: 'number',
        control: 'slider'
      },
      strokeColor: {
        default: [255, 0, 0],
        type: 'color',
        control: 'select',
        options: ['picker', 'scales']
      },
    },
    configurableInteractions: {
      // onClick
      // onHover
      // highlight based on?
      // labels
    }
  },
  geojson: {
    notAClass: false,
    deckGLClass: GeoJsonLayer,
    geometry: {
      geojson: { source: 'field', type: 'object' },
    },
    validator: (d) => Array.isArray(d) && d.every(row => hasGeoJson(row)), 
    configurableVisualizations: {
      elevation: {
        default: 10,
        type: 'number',
        control: 'slider'
      },
      fill: {
        default: [255, 0, 0],
        type: 'color',
        control: 'select',
        options: ['picker', 'scales']
      },
      strokeWidth: {
        default: 1,
        type: 'number',
        control: 'slider'
      },
      strokeColor: {
        default: [255, 0, 0],
        type: 'color',
        control: 'select',
        options: ['picker', 'scales']
      },
    },
    configurableInteractions: {
      // onClick
      // onHover
      // highlight based on?
      // labels
    }
  }
}
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