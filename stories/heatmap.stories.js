/* eslint-disable react/prop-types */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { HeatMap } from '../src'
import vwiJson from './data/locus-ml-vwi.json'

const mapboxApiAccessToken = process.env.MAPBOX_ACCESS_TOKEN

storiesOf('Heat map', module)
  .add('Default', () => (
    <HeatMap reportData={vwiJson} mapboxApiAccessToken={mapboxApiAccessToken} />
  ))
