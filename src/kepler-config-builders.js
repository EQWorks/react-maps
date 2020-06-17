export const buildReportWiConfig = report => {
  const sampleTripData = {
    // TODO sustainable way to map this data e.g. predefined objects
    fields: Object.entries(report[0]).map(([name, value], i) => {
      let type = 'real'
      let format = ''
      if (name === 'start_date' || name === 'end_date') {
        type = 'datetime'
        // 2018-07-14T00:00:00.000Z
        format = 'YYYY-M-D H:m:s'
      } else if (typeof value === 'string') {
        type = 'string'
      }
      return {
        name,
        format,
        tableFieldIndex: i,
        type,
      }
    }),
    /*
    [
      {name: 'tpep_pickup_datetime', format: 'YYYY-M-D H:m:s', type: 'timestamp'},
      {name: 'pickup_longitude', format: '', type: 'real'},
      {name: 'pickup_latitude', format: '', type: 'real'}
    ],
    */
    rows: [...report.map(o => Object.values(o)),
      Object.values({ ...report[0], start_date: '2018-07-09 20:00 -04:00' }),
      Object.values({ ...report[0], start_date: '2018-07-10 20:00 -04:00' }),
      Object.values({ ...report[0], start_date: '2018-07-11 20:00 -04:00' })
    ],
    /*
    [
      ['2015-01-15 19:05:39 +00:00', -73.99389648, 40.75011063],
      ['2015-01-15 19:05:39 +00:00', -73.97642517, 40.73981094],
      ['2015-01-15 19:05:40 +00:00', -73.96870422, 40.75424576],
    ]
    */
  }
  const sampleConfig = {
    visState: {
      // filters: [
      //   {
      //     id: 'me',
      //     dataId: 'test_trip_data',
      //     name: 'tpep_pickup_datetime',
      //     type: 'timeRange',
      //     enlarged: true
      //   }
      // ]
    }
  }

  return {
    datasets: {
      info: {
        label: 'Sample Taxi Trips in New York City',
        id: 'test_trip_data'
      },
      data: sampleTripData
    },
    config: sampleConfig,
    option: {
      centerMap: true,
      readOnly: false,
      keepExistingConfig: false
    },
    info: {
      title: 'Taro and Blue',
      description: 'This is my map'
    },
  }
}