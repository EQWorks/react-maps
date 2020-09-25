import { useState, useEffect, useMemo, useReducer } from 'react'
import { scaleLinear, scaleQuantile, scaleQuantize } from 'd3-scale'
import { color } from 'd3-color'

const SCALES = {
  'linear': scaleLinear,
  'quantile': scaleQuantile,
  'quantize': scaleQuantize,
}

export const useNumber = ({
  defaultValue,
  value,
  dataScale,
  valueOptions,
  data,
  dataPropertyAccessor = d => d,
}) => {
  // value is false/undefined, { field: 'keyInDataRow' }, someFunctionBasedOnDatRow, someNumber
  const getNumber = useMemo(() => {
    if (!value) {
      return defaultValue
    }
    // ====[TODO] validation for value.field (exists, is a number etc.)
    if (value.field) {
      const d3Fn = SCALES[dataScale](data.map(row => dataPropertyAccessor(row)[value.field] || 0), valueOptions)
      return d => d3Fn(dataPropertyAccessor(d)[value.field])
    }
    return value
  }, [defaultValue, value, dataScale, valueOptions, data, dataPropertyAccessor])

  return getNumber
}

export const useColor = ({
  defaultValue,
  value,
  dataScale,
  valueOptions,
  data,
  dataPropertyAccessor = d => d,
}) => {
  const getColor = useMemo(() => {
    if (!value) {
      return defaultValue
    }
    if (value.field) {
      const d3Fn = SCALES[dataScale](data.map(row => dataPropertyAccessor(row)[value.field] || 0), valueOptions)
      return d => {
        const ret = color(d3Fn(dataPropertyAccessor(d)[value.field]))
        return [ret.r, ret.g, ret.b]
      }
    }
    return value
  }, [defaultValue, value, dataScale, valueOptions, data, dataPropertyAccessor])

  return getColor
}
