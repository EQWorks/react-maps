/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { storiesOf } from '@storybook/react'

import IntelligenceMap from '../src/components/intelligenceMap/intelligence-map'
import intelligenceProvince from '../src/components/intelligenceMap/data/intelligence-province.json'
import intelligenceCity from '../src/components/intelligenceMap/data/intelligence-city.json'
import provinceCentroid from '../src/components/intelligenceMap/data/province-centroid.json'

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN

const useGeoJsonCentroidData = () => {
  const [geoCentroidData, setGeoCentroidData] = useState([])

  useEffect(() => {
    const getGeoJsonCentroid = async (geoJson) => {
      let response = []

      await Promise.all(geoJson.map(async (el, index) => {
        try {
          response.push(
            { 
              ...provinceCentroid.centroid[index],
              value: el.value,
            },
          )
        } catch (error) {
          console.error(error)
        }
      }))

      setGeoCentroidData(response)
    }

    getGeoJsonCentroid(intelligenceProvince)
  },[])

  return geoCentroidData
}

storiesOf('Intellignce Map', module)
  .add('Local Data', () => {
    const centroidJson = useGeoJsonCentroidData()
    
    return (
      <IntelligenceMap 
        mapboxApiAccessToken={ MAPBOX_ACCESS_TOKEN }
        intelligenceProvince={ intelligenceProvince }
        intelligenceCity={ intelligenceCity }
        geoProvinceCentroidJson={ centroidJson }
        pitch={25}
      />
    )
  })
