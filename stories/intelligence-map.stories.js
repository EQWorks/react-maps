/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { storiesOf } from '@storybook/react'
import IntelligenceMap from '../src/components/intelligence-map/intelligence-map'
import geoProvinceJson from './data/geo-province.json'
import geoProvinceValueJson from './data/geo-province-value.json'
import geoCityJson from './data/geo-province-city.json'

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

const useGeoJsonCentroidData = () => {
  const [geoCentroidData, setGeoCentroidData] = useState([])

  useEffect(() => {
    const getGeoJsonCentroid = async (geoJson) => {
      let response = []

      await Promise.all(geoJson.map(async (el, index) => {
        let provinceValue = geoProvinceValueJson[index]

        try {
          let centroid = await getCircleRadiusCentroid({ polygon: el.geometry })
          response.push({ provinceValue, centroid, offset: el.offset ? el.offset : { x: 0, y: 0 } })
        } catch (error) {
          console.error(error)
        }
      }))

      setGeoCentroidData(response)
    }

    getGeoJsonCentroid(geoProvinceJson)
  },[])

  return geoCentroidData
}

storiesOf('Intellignce Map', module)
  .add('Local Data', () => {
    const centroidJson = useGeoJsonCentroidData()
    
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
