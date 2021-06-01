import React from 'react'
import { MVTLayer } from '@deck.gl/geo-layers'

import {
  commonProps,
  commonDefaultProps,
} from '../shared/map-props'
import Map from './generic-map'


const GeoCohortMVT = ({ mapboxApiAccessToken }) => {
  const layer = new MVTLayer({
    data: 'https://mapsource.eqworks.io/maps/gc-8/{z}/{x}/{y}.vector.pbf',
    minZoom: 0,
    maxZoom: 23,
    getLineColor: [192, 192, 192],
    getFillColor: [140, 170, 180],
    lineWidthMinPixels: 1,
  })

  console.log('layer: ', layer)
  return (
    <Map
      layers={[layer]}
      mapboxApiAccessToken={mapboxApiAccessToken}
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
