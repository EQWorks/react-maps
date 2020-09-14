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
  getPopularTime: async ({ coords }) => {
    const url = `/activity/popular-times?coords[]=${coords.join(',')}&region=yyz&frequency=hour`
    const { data } = await api.get(url)
    console.log('---> DATA!', data)
  }
})

export default FO
