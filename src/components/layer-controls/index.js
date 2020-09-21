import React from 'react'
import PropTypes from 'prop-types'


const LAYER_FEATURE_KEYS = {
  scatterplot: { latitude: ['lat', 'latitude'], longitude: ['lon', 'lng', 'longitude'] },
  geojson: { geojson: ['geojson'] },
}

const LayerControls = ({
  payload, // locusml data
  layerType,
  featureKeys, // ====[TODO] convert to object
  setLayer,
  metrics,
  fillBasedOn,
  setFillBasedOn,
  radiusBasedOn,
  setRadiusBasedOn,
  elevationBasedOn,
  setElevationBasedOn,
}) => {
  return (
    <div>
      {payload ? (<div>
        <strong>Layer Type</strong>
        <select value={layerType} onChange={e => setLayer({ type: 'layer', value: e.target.value })}>\
          <option value=''>None</option>
          <option value='scatterplot'>Scatterplot</option>
          <option value='geojson'>Geojson</option>
        </select>
      </div>) : 'Use a LocusML query to fetch data!'}
      {layerType && (<div>
        <strong>Geo Feature Config</strong>
        {Object.keys(LAYER_FEATURE_KEYS[layerType]).map(key => (
          <div key={key}>
            <strong>{key}</strong>
            <select value={featureKeys[key]} onChange={e => setLayer({ type: 'featureKeys', value: { [key]: e.target.value } })}>
              {Object.keys(payload[0]).map(key => <option key={key}>{key}</option>)}
            </select>
          </div>
        ))}
      </div>)}
      {metrics && layerType && (<div>
        <strong>Fill Based On</strong>
        <select value={fillBasedOn} onChange={e => setFillBasedOn(e.target.value)}>
          <option value=''>None</option>
          {Object.keys(metrics).map(key => <option key={key}>{key}</option>)}
        </select>
      </div>)}
      {metrics && layerType === 'scatterplot' && (<div>
        <strong>Radius Based On</strong>
        <select value={radiusBasedOn} onChange={e => setRadiusBasedOn(e.target.value)}>
          <option value=''>None</option>
          {Object.keys(metrics).map(key => <option key={key}>{key}</option>)}
        </select>
      </div>)}
      {metrics && layerType === 'geojson' && (<div>
        <strong>Elevation Based On</strong>
        <select value={elevationBasedOn} onChange={e => setElevationBasedOn(e.target.value)}>
          <option value=''>None</option>
          {Object.keys(metrics).map(key => <option key={key}>{key}</option>)}
        </select>
      </div>)}
    </div>
  )
}

export default LayerControls
