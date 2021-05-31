/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { storiesOf } from '@storybook/react'
import POIMap from '../src/components/poi-map'
import Map from '../src/components/generic-map'
import IntelligenceMap from '../src/components/intelligence-map'
import geoProvinceJson from './data/pois-geojson-province.json'
import geoProvinceValueJson from './data/geo-province-value.json'
import geoCityJson from './data/pois-geojson-city.json'

import { getCircleRadiusCentroid } from '../src/shared/utils/index'

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN

const getTooltip = (data) => {
  let temp = data
  let toolTipText

  if (temp && temp.properties) {
    toolTipText = `<span>${temp.properties.CMANAME} (${temp.value.toFixed(2)}%)</span>`
  }

  return toolTipText
}

const useGeoJsonCentroidData = (geoJson) => {
  const [geoCentroidData, setGeoCentroidData] = useState([])

  useEffect(() => {
    const getGeoJsonCentroid = async (geoProvinceJson) => {
      let response = []

      await Promise.all(geoProvinceJson.map(async (el, index) => {
        let provinceValue = geoProvinceValueJson[index]

        try {
          let centroid = await getCircleRadiusCentroid({ polygon: el.geometry })
          response.push({ provinceValue ,centroid })
        } catch (error) {
          console.error(error)
        }
      }))

      setGeoCentroidData(response)
    }

    getGeoJsonCentroid(geoJson)
  })

  return geoCentroidData
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
  .add('Intellignce Map', () => {
    const centroidJson = useGeoJsonCentroidData(geoProvinceJson)

    return (
      <IntelligenceMap 
        mapboxApiAccessToken={ MAPBOX_ACCESS_TOKEN }
        getTooltip={getTooltip}
        geoProvinceJson={ geoProvinceJson } 
        geoProvinceValueJson={ geoProvinceValueJson }
        geoProvinceCentroidJson={ centroidJson } 
        geoCityJson={ geoCityJson }/>
    )
  })
