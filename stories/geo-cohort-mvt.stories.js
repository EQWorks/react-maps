import React from 'react'
import { storiesOf } from '@storybook/react'

import { GeoCohortMVTMap } from '../src'
import { getCursor } from '../src/utils'


const mapboxApiAccessToken = process.env.MAPBOX_ACCESS_TOKEN

storiesOf('Geo-Cohort-MVT Map', module)
  .add('GeoCohortMapMVT - basic', () => (
    <GeoCohortMVTMap
      getCursor={getCursor()}
      mapboxApiAccessToken={mapboxApiAccessToken}
    />
  ))
