import React, { useState, useEffect } from 'react'
import HexagonMap from './hexagon-map'


const PopularTimeMap = ({ getPopularTimes }) => {
  // lat, lon
  // HOUR
  // one api call = one location
  // could be HOUR or DAY

  // 1) a utility, draw or click, to pull a bunch of locations
  // ---- choose which hour
  // ---- choose which day (requires pulling)
  // 2) some pre-agg dataset to pull locations e.g. from builder?
  const[data, setData] = useState([
    {
      "lat": 43.63,
      "lon": -79.59,
      "hour": "0",
      "agg_counts_mean": 4.6875,
      "agg_counts_median": 1
    },
    {
      "lat": 43.63,
      "lon": -79.59,
      "hour": "1",
      "agg_counts_mean": 8.22222222222222,
      "agg_counts_median": 2
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "10",
        "agg_counts_mean": 11.75,
        "agg_counts_median": 2
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "11",
        "agg_counts_mean": 11.5,
        "agg_counts_median": 1
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "12",
        "agg_counts_mean": 10.4,
        "agg_counts_median": 2
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "13",
        "agg_counts_mean": 9.6,
        "agg_counts_median": 1
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "14",
        "agg_counts_mean": 6.1,
        "agg_counts_median": 1
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "15",
        "agg_counts_mean": 6.14285714285714,
        "agg_counts_median": 1
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "16",
        "agg_counts_mean": 4.55555555555556,
        "agg_counts_median": 2
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "17",
        "agg_counts_mean": 7.8,
        "agg_counts_median": 4
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "18",
        "agg_counts_mean": 4.33333333333333,
        "agg_counts_median": 1
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "19",
        "agg_counts_mean": 3.46153846153846,
        "agg_counts_median": 1
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "2",
        "agg_counts_mean": 11.6666666666667,
        "agg_counts_median": 1
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "20",
        "agg_counts_mean": 3.91666666666667,
        "agg_counts_median": 1
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "21",
        "agg_counts_mean": 5.25,
        "agg_counts_median": 1
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "22",
        "agg_counts_mean": 6.22222222222222,
        "agg_counts_median": 1
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "23",
        "agg_counts_mean": 3.83333333333333,
        "agg_counts_median": 1
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "3",
        "agg_counts_mean": 10.6666666666667,
        "agg_counts_median": 2
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "4",
        "agg_counts_mean": 6.57142857142857,
        "agg_counts_median": 1
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "5",
        "agg_counts_mean": 15,
        "agg_counts_median": 1
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "6",
        "agg_counts_mean": 34,
        "agg_counts_median": 34
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "7",
        "agg_counts_mean": 6.5,
        "agg_counts_median": 1
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "8",
        "agg_counts_mean": 6.33333333333333,
        "agg_counts_median": 1
    },
    {
        "lat": 43.63,
        "lon": -79.59,
        "hour": "9",
        "agg_counts_mean": 15,
        "agg_counts_median": 4
    }
])

  // useEffect(() => {
  //   const getData = async () => {
  //     const apiData = await getPopularTimes({ coords: [43.63,-79.59,12.390770404271539] })
  //     setData(apiData)
  //   }
  //   getData()
  // }, [])

  return <HexagonMap dataInit={data} />
}


export default PopularTimeMap



