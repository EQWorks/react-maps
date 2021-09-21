import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'

import ButtonGroup from '@material-ui/core/ButtonGroup'
import AddCircleOutlineOutlined from '@material-ui/icons/AddCircleOutlineOutlined'
import AddBoxOutlined from '@material-ui/icons/AddBoxOutlined'
import AddOutlined from '@material-ui/icons/AddOutlined'

import { Button } from '@eqworks/lumen-ui'

import { LocusMap } from '../src'
import { getCursor } from '../src/utils'

import xwiData from './data/xwi-report.json'
import poiRadiiTo from './data/pois-radii-to.json'
import mvtData from './data/locus-map-mvt.json'


const basicIconButtonStyle = {
  paddingLeft: '20px',
  maxWidth: '35px',
  minWidth: '35px',
  maxHeight: '30px',
  minHeight: '30px',
}

const StyledButtonSelect = withStyles({
  root: basicIconButtonStyle,
})(Button)

const SelectButtonGroup = ({ setSelectShape }) => {
  return (
    <ButtonGroup orientation='horizontal'>
      <StyledButtonSelect
        startIcon={ <AddCircleOutlineOutlined />}
        size='small'
        type='secondary'
        onClick={() => setSelectShape('circle')}
      />
      <StyledButtonSelect
        startIcon={<AddBoxOutlined />}
        size='small'
        type='secondary'
        onClick={() => setSelectShape('rectangle')}
      />
      <StyledButtonSelect
        startIcon={<AddOutlined />}
        size='small'
        type='secondary'
        onClick={() => setSelectShape('polygon')}
      />
    </ButtonGroup>
  )
}

SelectButtonGroup.propTypes = {
  setSelectShape: PropTypes.func.isRequired,
}

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
  { id: 'select-123', data: [] },
]

const GeoJSONLayerConfig = {
  layer: 'geojson',
  dataId: 'poiGeojson-123',
  visualizations: {
    radius: {
      value: { field: 'radius' },
      valueOptions: [5, 15],
      dataScale: 'linear',
    },
    fill: {
      value: { field: 'radius' },
      valueOptions: [[214, 232, 253], [39, 85, 196]],
      dataScale: 'linear',
    },
  },
  interactions: {},
}

const arcLayerConfig = {
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
}

const ScatterPlotLayer1Config = {
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
}

const ScatterPlotLayer2Config = {
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
}

const selectLayerConfig = {
  layer: 'select',
  dataId: 'select-123',
  layerMode: 'circle',
  visualizations: {},
  interactions: {},
  opacity: 0.5,
}

const MVTLayerConfig = {
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
}

const mapConfig = {
  cursor: (layers) => getCursor({ layers }),
  mapboxApiAccessToken,
}

const Template = (args) => <LocusMap {...args} />

const geojsonArgs = { layerConfig: [GeoJSONLayerConfig], dataConfig, mapConfig }

export const GeoJSONLayer = Template.bind({})
GeoJSONLayer.args = geojsonArgs
GeoJSONLayer.storyName = 'GeoJSON Layer for WI & VWI Reports'

const xwiReportArgs = {
  layerConfig: [arcLayerConfig, ScatterPlotLayer1Config, ScatterPlotLayer2Config],
  dataConfig,
  mapConfig,
}

export const XWIReportLayers = Template.bind({})
XWIReportLayers.args = xwiReportArgs
XWIReportLayers.storyName = 'Arc & Scatterplot Layers for XWI Reports'

const initViewState = {
  altitude: 1.5,
  bearing: 0,
  height: 958,
  latitude: 43.4050109111904,
  longitude: -79.2278102419036,
  maxPitch: 60,
  maxZoom: 20,
  minPitch: 0,
  minZoom: 0,
  pitch: 0,
  width: 1580,
  zoom: 8.549383306739653,
}
const MVTLayerArgs = { layerConfig: [MVTLayerConfig], dataConfig, mapConfig: { ...mapConfig, initViewState } }

export const MVTLayer = Template.bind({})
MVTLayer.args = MVTLayerArgs
MVTLayer.storyName = 'MVT Layer with demographic data'

export const SelectDataLayer = () => {
  const [selectShape, setSelectShape] = useState('circle')

  const selectArgs = {
    layerConfig: [{ ...selectLayerConfig, layerMode: selectShape }, GeoJSONLayerConfig],
    dataConfig,
    mapConfig,
  }

  return (
    <div>
      <p style={{ color: 'red' }}>FIRST: choose shape to select data!</p>
      <SelectButtonGroup setSelectShape={setSelectShape} />
      <LocusMap { ...selectArgs } />
    </div>
  )
}
SelectDataLayer.storyName = 'Select data on map by drawing shapes'

const layerConfig = [
  selectLayerConfig,
  MVTLayerConfig,
  GeoJSONLayerConfig,
  arcLayerConfig,
  ScatterPlotLayer1Config,
  ScatterPlotLayer2Config,
]

const mapArgs = {
  layerConfig,
  dataConfig,
  mapConfig,
}

export const AllLayers = Template.bind({})
AllLayers.args = mapArgs
