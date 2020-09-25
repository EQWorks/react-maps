import React from 'react'
import { storiesOf } from '@storybook/react'

import { ConfigurableLayerMap } from '../src'
import vwiData from './data/locus-ml-vwi.json'
import poiRadiiTo from './data/pois-radiito.json'
import { interpolateBlues } from 'd3-scale-chromatic'

const TEST_DATA_CONFIG = [
  { id: 'vwiArray-123', data: vwiData },
  { id: 'poiGeojson-123', data: poiRadiiTo },
]

const TEST_LAYER_CONFIG = [
  {
    layer: 'scatterplot',
    dataId: 'vwiArray-123',
    geometry: { longitude: 'lon', latitude: 'lat' },
    visualizations: {
      radius: {
        value: { field: 'visits' },
        valueOptions: [10, 100],
        dataScale: 'linear',
      },
      fill: {
        value: { field: 'visits' },
        /*
          ====[NOTE]
          sequential scale of blues, given 0 -> 1
          passed on to dataScaleFn (e.g. scaleLinear)
          which can use other value types e.g. ['yellow', 'red']
        */
        valueOptions: [interpolateBlues(0.5), interpolateBlues(1)],
        dataScale: 'linear',
      },
    },
    interactions: {},
  },
  {
    layer: 'geojson',
    dataId: 'poiGeojson-123',
    visualizations: {
      radius: {
        value: { field: 'radius' },
        valueOptions: [100, 500],
        dataScale: 'linear',
      },
      lineWidth: { value: 5 },
      fill: {
        value: { field: 'id' },
        valueOptions: [interpolateBlues(0), interpolateBlues(1)],
        dataScale: 'linear',
      },
    },
    interactions: {},
    tooltip: 'address'
  }
]

storiesOf('Configurable Layer', module)
  .add('Test', () => (
    <ConfigurableLayerMap layerConfig={TEST_LAYER_CONFIG} dataConfig={TEST_DATA_CONFIG} />
  ))
