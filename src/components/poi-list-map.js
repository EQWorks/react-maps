import React, { useReducer, useEffect } from 'react'

import Deck from './deck'


const PoiListMap = ({ getPoiList, poi_list_id }) => {
	const [{ poiData, layerArray }, dispatch] = useReducer((state, payload) => {
		return {
			poiData: payload,
			// ====[TODO] options for layerArray based on poiType
			// ['icon', 'geojson', 'cluster', 'polygon']
			// cluster AND geojson?

			// our default geojson layer has: getRadius: d => d.properties.radius,
			layerArray: payload[0].properties.poiType === 1 ? ['polygon'] : ['icon', 'geojson']
		}
	}, { poiData: [], layerArray: ['icon'] })

	useEffect(() => {
		const getData = async () => {
			const data = await getPoiList({ poi_list_id })
			console.log(data)
			dispatch(data)
		}
		getData()
	}, [poi_list_id])

	return <Deck poiData={poiData} layerArray={layerArray} />
}

export default PoiListMap
