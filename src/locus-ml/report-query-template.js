import React, { useReducer } from 'react'


const BASE_REPORT_QUERY = ({ distanceInMeters, lat, lon }) => ({
  "query": {
      "type": "select",
      "columns": [
          [
              "poi_id",
              "report_1_4"
          ],
          [
              "name",
              "report_1_4"
          ],
          [
              "lat",
              "report_1_4"
          ],
          [
              "lon",
              "report_1_4"
          ],
          [
              "address_label",
              "report_1_4"
          ],
          [
              "report_id",
              "report_1_4"
          ],
          [
              "date_type",
              "report_1_4"
          ],
          [
              "start_date",
              "report_1_4"
          ],
          [
              "end_date",
              "report_1_4"
          ],
          [
              "repeat_type",
              "report_1_4"
          ],
          [
              "visits",
              "report_1_4"
          ],
          [
              "outlier",
              "report_1_4"
          ],
          [
              "unique_visitors",
              "report_1_4"
          ],
          [
              "repeat_visits",
              "report_1_4"
          ],
          [
              "repeat_visitors",
              "report_1_4"
          ],
          [
              "visits_hod",
              "report_1_4"
          ],
          [
              "visits_dow",
              "report_1_4"
          ],
          [
              "unique_visitors_hod",
              "report_1_4"
          ],
          [
              "unique_visitors_dow",
              "report_1_4"
          ],
          [
              "unique_visitors_single_visit",
              "report_1_4"
          ],
          [
              "unique_visitors_multi_visit",
              "report_1_4"
          ],
          [
              "unique_xdevice",
              "report_1_4"
          ],
          [
              "unique_hh",
              "report_1_4"
          ],
          [
              "repeat_visitors_hh",
              "report_1_4"
          ],
          [
              "outlier",
              "report_1_4"
          ],
          [
              "time_zone",
              "report_1_4"
          ]
      ],
      "from": "report_1_4",
      "joins": [],
      "where": [
          {
              "type": "operator",
              "values": ["=", ["date_type", "report_1_4"], 2]
          },
          {
              "type": "operator",
              "values": ["=", ["start_date", "report_1_4"], "2017-11-13T05:00:00.000Z"]
          },
          {
              "type": "operator",
              "values": ["=", ["end_date", "report_1_4"], "2017-11-19T05:00:00.000Z"]
          },
          {
              "type": "function",
              "values": [
                  "dWithin",
                  { "type": "function", "cast": "geography", "values": ["setSRID", { "type": "function", "values": ["makePoint", ["lat", "report_1_4"],["lon","report_1_4"]] }, 4326] },
                  { "type": "function", "cast": "geography", "values": ["setSRID", { "type": "function", "values": ["makePoint", lat, lon] }, 4326] },
                  distanceInMeters
              ]
          }
      ],
      "orderBy": [
          [
              "poi_id",
              "report_1_4"
          ]
      ],
      "groupBy": []
  },
  "views": [
      {
          "type": "report",
          "id": "report_1_4",
          "report_id": 4,
          "layer_id": 1,
          "name": "report_1_4"
      }
  ]
})

const distanceInMeters = 100000
const lat = 45.4700622
const lon = -73.6164971

// ====[TODO] how to bootstrap report period interaction, i.e. given a report, choose a default value
export const usePointRadiusTemplate = () => {
  const [queryTemplate, dispatch] = useReducer((state, { type, value }) => {
    let update = {
      ...state,
      [type]: value,
    }
    // ====[TODO] review of this state. Why not just coords[]?
    if (type === 'coordinates') {
      update = {
        ...state,
        ...value,
      }
    }
    return {
      ...update,
      query: BASE_REPORT_QUERY(update)
    }
  }, {
    query: BASE_REPORT_QUERY({ distanceInMeters, lat, lon }),
    distanceInMeters,
    lat,
    lon,
  })
  const setDistance = value => dispatch({ type: 'distanceInMeters', value })
  const setCoordinates = value => dispatch({ type: 'coordinates', value })
  return { ...queryTemplate, setDistance, setCoordinates }
}
