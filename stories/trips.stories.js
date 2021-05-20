/* eslint-disable react/prop-types */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { TripsMap } from '../src'


const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN

storiesOf('Trips Map', module)
  .add('Trips layer', () => (
    <TripsMap
      mapboxApiAccessToken={ MAPBOX_ACCESS_TOKEN }
    />
  ))
