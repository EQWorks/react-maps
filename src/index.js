import React, { useEffect } from 'react'
import axios from 'axios'

import KeplerGL from 'kepler.gl'
import { connect } from 'react-redux'
import { addDataToMap } from 'kepler.gl/actions';

import TorontoCenter from '../kepler-config/toronto-center.json'

import { buildReportWiConfig } from './kepler-config-builders'

import FO from './actions'

const getAxios = () => axios.create({
  baseURL: process.env.API_URL,
  headers: { 'eq-api-jwt': process.env.FO_TOKEN },
})

const testActions = FO(getAxios())

const Map = (props) => {
  
  // console.log(props)
  useEffect(() => {
    const getData = async () => {
      const data = await testActions.getReportWi({})
      const config = buildReportWiConfig(data)
      console.log(config)
      props.dispatch(addDataToMap(config))
    }
    getData()
    // props.dispatch(addDataToMap(TorontoCenter))
  }, [])
  return <KeplerGL {...props} />
}

export default connect()(Map)
