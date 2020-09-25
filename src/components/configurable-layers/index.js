import React, { useState, useMemo, useEffect, useReducer } from 'react'
import PropTypes from 'prop-types'
import { GeoJsonLayer } from 'deck.gl'

import { parseDeckGLLayerFromConfig } from './utils'
import Map from '../generic-map'


const propTypes = {
  data: PropTypes.array.isRequired,
  layers: PropTypes.array.isRequired,
}

const defaultProps = {
  data: [],
  layers: [],
}

const ConfigurableLayerMap = ({
  dataConfig,
  layerConfig,
}) => {
  useEffect(() => {
    configurableLayerDispatch({ type: 'init', payload: { layerConfig, dataConfig } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [{ layers }, configurableLayerDispatch] = useReducer((state, { type, payload }) => {
    if (type === 'init') {
      const { dataConfig, layerConfig } = payload
      // ====[NOTE] ids are for single-use sessions
      // ====[TODO] more thorough ID functions
      const dataIdMap = {}
      const data = dataConfig.reduce((agg, { id, data }, i) => {
        const newId = `data-${new Date().getTime()}-${i}`
        dataIdMap[id] = newId
        return {
          ...agg,
          [newId]: data,
        }
      }, {})

      const layers = layerConfig.reduce((agg, layer, i) => {
        const id = `layer-${new Date().getTime()}-${i}`
        // ====[TODO] fallback for invalid/missing dataId
        return {
          ...agg,
          [id]: {
            config: layer,
            deckLayer: parseDeckGLLayerFromConfig({ ...layer, id })(data[dataIdMap[layer.dataId]])},
        }
      }, {})
      return {
        ...state,
        data,
        layers,
      }
    }
    return state
    // ====[TODO] config changes and scoped/bootstrapped reducer functions
    // ====[TODO] "meta" layer features like tooltip, highlight, label, legend
    // { data: { [dataId]: dataset }, layers: { [layerId]: layerConfig }}
  }, { data: {}, layers: {}, })

  return (
    <Map
      layers={Object.values(layers).map(o => o.deckLayer)}
      // ====[TODO] how slow is running this constantly?
      getTooltip={({ object, layer }) => {
        if (!object) {
          return null
        }
        let data = object
        if (layer instanceof GeoJsonLayer) {
          data = object.properties
        }
        return data[layers[layer.props.id].config.tooltip]
      }}
    />
  )
}

ConfigurableLayerMap.propTypes = propTypes
ConfigurableLayerMap.defaultProps = defaultProps

export default ConfigurableLayerMap
