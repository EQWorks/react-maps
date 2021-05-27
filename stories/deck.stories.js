/* eslint-disable react/prop-types */
import React from 'react'
import { storiesOf } from '@storybook/react'
import POIMap from '../src/components/poi-map'
import Map from '../src/components/generic-map'
import IntelligenceMap from '../src/components/intelligence-map'
import geoProvinceJson from './data/pois-geojson-province.json'
import geoProvinceValueJson from './data/geo-province-value.json'
import geoCityJson from './data/pois-geojson-city.json'

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN

const getTooltip = (data) => {
  let temp = data;
  let toolTipText;

  if (temp && temp.properties) {
    toolTipText = `${temp.properties.CMANAME} ${temp.value}`
  }

  return toolTipText
}

storiesOf('Deck', module)
  .add('POIMap generic', () => (
    <POIMap mapboxApiAccessToken={ MAPBOX_ACCESS_TOKEN }/>
  ))
  .add('POIMap no data, mode empty', () => (
    <POIMap POIData={ [] } mode={ 'empty' } mapboxApiAccessToken={ MAPBOX_ACCESS_TOKEN }/>
  ))
  .add('Generic Map', () => (
    <Map mapboxApiAccessToken={ MAPBOX_ACCESS_TOKEN }/>
  ))
  .add('Intellignce Map', () => (
    <IntelligenceMap 
      mapboxApiAccessToken={ MAPBOX_ACCESS_TOKEN }
      getTooltip={getTooltip}
      geoProvinceJson={ geoProvinceJson } 
      geoProvinceValueJson={ geoProvinceValueJson } 
      geoCityJson={ geoCityJson }/>
  ))
