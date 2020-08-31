import React, { useReducer, useEffect } from 'react'

import POIMap from './poi-map'


const PoiListMap = ({ getPoiList, poi_list_id }) => {
  const [{ poiData, layerArray }, dispatch] = useReducer((state, payload) => {
    // ====[TODO] option controls
    // ====[Q?] can cluster and geojson coexist?
    // ['icon', 'geojson', 'cluster', 'polygon']

    // ====[NOTE] our default geojson layer has getRadius: d => d.properties.radius
    // which allows use to just add with no configuration
    const layerArray = payload[0].properties.poiType === 1 ? ['polygon'] : ['icon']
    if (![null, undefined].includes(payload[0].properties.radius)) {
      layerArray.push('geojson')
    }
    return {
      poiData: payload,
      layerArray
    }
  }, { poiData: [], layerArray: ['icon'] })

  useEffect(() => {
    const getData = async () => {
      const data = await getPoiList({ poi_list_id })
      dispatch(data)
    }
    getData()
  }, [poi_list_id])

  return <POIMap poiData={poiData} layerArray={layerArray} />
}

export default PoiListMap
