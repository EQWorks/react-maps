import React from 'react'

import { LocusMap } from '../src'
import { getCursor } from '../src/utils'

import xwiData from './data/xwi-report.json'
import poiRadiiTo from './data/pois-radii-to.json'
import mvtData from './data/locus-map-mvt.json'


const mapboxApiAccessToken = process.env.MAPBOX_ACCESS_TOKEN || process.env.STORYBOOK_MAPBOX_ACCESS_TOKEN

export default {
  title: 'Locus Map',
  component: LocusMap,
}

const dataConfig = [
  { id: 'xwiReport-123', data: xwiData },
  { id: 'poiGeojson-123', data: poiRadiiTo },
  { id: 'mvt-123',
    data: {
      tileGeom: 'https://mapsource-dev.locus.place/maps/ct/{z}/{x}/{y}.vector.pbf?',
      tileData: mvtData,
    },
  },
]

const layerConfig = [
  {
    layer: 'MVT',
    dataId: 'mvt-123',
    visualizations: {
      fill: {
        value: { field: 'value' },
        valueOptions: [[ 247, 254, 236], [10, 97, 11]],
        dataScale: 'linear',
      },
    },
    interactions: {},
    opacity: 0.2,
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
      fill: {
        value: { field: 'radius' },
        valueOptions: [[214, 232, 253], [39, 85, 196]],
        dataScale: 'linear',
      },
    },
    interactions: {},
  },
  {
    layer: 'arc',
    dataId: 'xwiReport-123',
    geometry: {
      source: { longitude: 'source_lon', latitude: 'source_lat' },
      target: { longitude: 'target_lon', latitude: 'target_lat' },
    },
    visualizations: {
      sourceArcColor: { value: [182, 38, 40] },
      targetArcColor: { value: [251, 201, 78] },
      arcWidth: { value: 2 },
    },
    interactions: {},
  },
  {
    layer: 'scatterplot',
    dataId: 'xwiReport-123',
    geometry: { longitude: 'source_lon', latitude: 'source_lat' },
    visualizations: {
      radius: { value: 5 },
      fill: {
        value: [182, 38, 40],
      },
    },
    interactions: {},
  },
  {
    layer: 'scatterplot',
    dataId: 'xwiReport-123',
    geometry: { longitude: 'target_lon', latitude: 'target_lat' },
    visualizations: {
      radius: { value: 5 },
      fill: {
        value: [251, 201, 78],
      },
    },
    interactions: {},
  },
]

const mapArgs = {
  layerConfig,
  dataConfig,
  getCursor: getCursor(),
  mapboxApiAccessToken,
}

const Template = (args) => <LocusMap {...args} />

export const Basic = Template.bind({})
Basic.args = mapArgs
