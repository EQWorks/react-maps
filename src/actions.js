import { transformReportWi } from './transforms'
import { genUniqueDateKey } from './utils'


const parseUrlParams = d => `&startDate=${d.start_date}&endDate=${d.end_date}&dateType=${d.date_type}`
// requires axios-like signature with JWT provided
const FO = (api) => ({
  getReportWi: async ({ report_id, layer_id, map_id, currentDuration, params }) => {
    const url = `/report/${report_id}?layerID=${layer_id}&mapID=${map_id}${currentDuration ? parseUrlParams(currentDuration) : ''}`
    const { data: { report, duration, durations } } = await api.get(url, { params })

    return {
      data: transformReportWi(report),
      duration: { ...duration, key: genUniqueDateKey(duration) },
      // TODO review end-to-end use of durations, seems like duplicated effort
      durations: Object.values(durations).reduce((flat, dateTypeRanges) => (
        [
          ...flat,
          ...dateTypeRanges.map(o => ({ ...o, key: genUniqueDateKey(o) }))
        ]
      ), []),
    }
  },
  getPoiList: async ({ poi_list_id, params }) => {
    const url = `/poi/${poi_list_id}`
    const { data: { eachPOIData } } = await api.get(url, { params })
    /*
      eachPOIData: [,…]
      message: "Fetched pois for poilist 1291"
      poiListID: 1291
      poiListName: "FCL Amy’s Location"
      rowCount: 264
      status: "success"
    */

    return eachPOIData.map(({ geo_json_poi }) => geo_json_poi)
  }
})

export default FO
