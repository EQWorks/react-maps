import React, { useState } from 'react'
import { MVTLayer } from '@deck.gl/geo-layers'

import {
  commonProps,
  commonDefaultProps,
} from '../shared/map-props'
import Map from './generic-map'

import { getCursor } from '../utils'
import MapTooltip from '../components/tooltip'
import tooltipNode from '../components/tooltip/tooltip-node'

import geoCohortPostalraw from '../../stories/data/geo-cohort-postal.json'
import geoCohortFSAraw from '../../stories//data/geo-cohort-FSA.json'

const reportData = {
  ...Object.fromEntries(geoCohortFSAraw.map((item) => [item.GeoCohortItem, { Imps: item.Imps, Clicks: item.Clicks }])),
  ...Object.fromEntries(geoCohortPostalraw.map((item) => [item.GeoCohortItem, { Imps: item.Imps, Clicks: item.Clicks }])),
}

const GeoCohortMVT = ({ mapboxApiAccessToken }) => {
  const layer = new MVTLayer({
    data: 'https://mapsource.eqworks.io/maps/gc-8/{z}/{x}/{y}.vector.pbf',
    minZoom: 0,
    maxZoom: 23,
    lineWidthMinPixels: 1,
    getLineColor: [180, 180, 180],
    pickable: true,
    getFillColor: ({ properties: { fsa, postalcode } }) => {
      //ap
      const { Imps } = reportData[fsa || postalcode] || { Imps: 0 }
      return Imps ? [ Imps % 2000,0, Imps % 200, 100] : [255, 255, 255, 0]
    },
  })

  const [zoom, setZoom] = useState(1)

  return (
    <Map
      layers={[layer]}
      mapboxApiAccessToken={mapboxApiAccessToken}
      showTooltip={true}
      setZoom={setZoom}
      getCursor={getCursor}
      renderTooltip={({ hoverInfo }) => (
        <MapTooltip
          info={hoverInfo}
        >

          {tooltipNode({
            tooltipKeys: {
              name: zoom >= 11 ? 'postalcode' : 'fsa',
              nameAccessor: (params) => params.properties,
              metricKeys: ['Imps', 'Clicks'],
              metricAccessor: ({ properties: { fsa, postalcode } }) => reportData[fsa || postalcode] || {},
              idAccessor: () => { },

            },
            formatPropertyLabel: d => d,
            params: hoverInfo.object,
            formatTooltipTitle: d => d,
          })}
        </MapTooltip>
      )}
    />
  )
}

GeoCohortMVT.propTypes = {
  ...commonProps,
}
GeoCohortMVT.defaultProps = {
  ...commonDefaultProps,
}

export default GeoCohortMVT
