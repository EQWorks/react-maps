import React, { useEffect } from 'react'

import KeplerGL from 'kepler.gl'
import { connect } from 'react-redux'
import { addDataToMap } from 'kepler.gl/actions';

import TorontoCenter from '../kepler-config/toronto-center.json'

const Map = (props) => {
  
  console.log(props)
  useEffect(() => {
    props.dispatch(addDataToMap(TorontoCenter))
  }, [])
  return <KeplerGL {...props} />
}

export default connect()(Map)
