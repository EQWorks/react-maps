import React, { useMemo, useEffect, useRef, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { styled, setup } from 'goober'

import LegendSymbol from './legend-symbol'
import { LEGEND_TYPE, LEGEND_SYMBOL_WIDTH } from '../../constants'


setup(React.createElement)

const LegendBody = styled('div')`
  align-items: center;
  margin-top: 0.75rem;
`

const LegendTitle = styled('div')`
  margin: 0 auto 0.625rem auto;
  text-align: center;
  fontWeight: 700;
  max-width: ${({ legendelemwidth }) => legendelemwidth}rem;
  overflow-wrap: anywhere;
`

const LegendElements = styled('div')`
  display: flex;
  flex-direction: column;
  margin-left: ${({ legendelementsleftmargin }) => legendelementsleftmargin}rem;
  ${({ max }) => max ? '' : 'align-items: center'};
`

const LegendTextContainer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: ${({ textcontainerwidth }) => textcontainerwidth}rem;
  margin-left: ${({ textcontainerleftmargin }) => textcontainerleftmargin}rem;
  margin-top: 0.325rem;
`

const LegendTextMin = styled('div', forwardRef)`
  color: black;
`

const LegendTextMax = styled('div', forwardRef)`
  color: black;
`

const LegendSymbolContainer = styled('div')`
  width: ${({ legendelemwidth }) => legendelemwidth}rem;
  margin-left: ${({ symbolcontainerleftmargin }) => symbolcontainerleftmargin}rem;
`

const fontSize = getComputedStyle(document.documentElement).fontSize.slice(0, -2) || 16

const LegendItem = ({ legendItemProps }) => {

  const {
    min,
    max,
    label,
    metricAliases,
    formatLegendTitle = d => d,
    formatPropertyLabel = d => d,
    formatData,
    type,
    legendSize,
    symbolMarginLeft,
    setSymbolMarginLeft,
    setOpacity,
    ...symbolProps
  } = legendItemProps

  const legendElemWidth = min !== max && max > 0 ?
    LEGEND_SYMBOL_WIDTH[legendSize] :
    LEGEND_SYMBOL_WIDTH.zero
  const title = formatLegendTitle(metricAliases?.[label] || formatPropertyLabel(label))
  const [minValue, maxValue] = formatData?.[label] ?
    [formatData[label](min), formatData[label](max)] :
    [min, max]

  const textMin = useRef(null)
  const textMax = useRef(null)
  const textMinWidth = fontSize ? textMin.current?.getBoundingClientRect()?.width / fontSize : 0
  const textMaxWidth = fontSize ? textMax.current?.getBoundingClientRect()?.width / fontSize : 0

  /*
   * text container width for gradient and elevation legends, where value label centres align with
   * the edges of the legend symbol container
   */
  let textContainerWidth = min !== max && max > 0 && textMinWidth && textMaxWidth ?
    textMinWidth / 2 + textMaxWidth / 2 + legendElemWidth :
    textMinWidth || 0

  let symbolContainerLeftMargin = 0
  let textContainerLeftMargin = 0

  // don't adjust margins when we have no data variance
  if (min !== max && max > 0 && textMinWidth && type !== LEGEND_TYPE.size) {
    symbolContainerLeftMargin = textMinWidth / 2
  }

  if (min !== max && max > 0 && textMinWidth && type === LEGEND_TYPE.size) {
    const { dots, size } = symbolProps
    // for radius (size) width is samller, as the value labels align with the centers of the edge circles
    textContainerWidth = !isNaN(size) && size && !isNaN(dots) && dots ?
      textContainerWidth - (2.5 + dots) * size / 2 : // half of each circle size
      textContainerWidth
    const smallSymbolRadius = !isNaN(size) && size ? 1.75 * size / 2 : 0
    if (smallSymbolRadius <= textMinWidth / 2) {
      symbolContainerLeftMargin = textMinWidth / 2 - smallSymbolRadius
    } else {
      textContainerLeftMargin = smallSymbolRadius - textMinWidth / 2
    }
  }

  // set symbolMarginLeft as the maxium left margin value of all legend item symbols
  useEffect(() => {
    if (symbolContainerLeftMargin) {
      setSymbolMarginLeft(prev => Math.max(prev, symbolContainerLeftMargin))
    }
  }, [symbolContainerLeftMargin, setSymbolMarginLeft])

  // adjust LegendElement left margin so the legend symbols of all legends align vertically
  const legendElementsLeftMargin = useMemo(() => {
    if (symbolMarginLeft > symbolContainerLeftMargin) {
      return symbolMarginLeft - symbolContainerLeftMargin
    }
    return 0
  }, [symbolMarginLeft, symbolContainerLeftMargin])

  // reveal Legend only after the textContainerWidth has been calculated
  useEffect(() => {
    if (textContainerWidth) {
      setOpacity(0.9)
    }
  }, [textContainerWidth, setOpacity])

  return (
    <>
      {max !== undefined && min !== undefined && (
        <LegendBody>
          <LegendTitle legendelemwidth={LEGEND_SYMBOL_WIDTH[legendSize]}>{title}</LegendTitle>
          <LegendElements max={max} legendelementsleftmargin={legendElementsLeftMargin}>
            <LegendSymbolContainer
              legendelemwidth={legendElemWidth}
              symbolcontainerleftmargin={symbolContainerLeftMargin}
            >
              <LegendSymbol symbolProps={{ max, type, legendSize, ...symbolProps }} />
            </LegendSymbolContainer>
            <LegendTextContainer
              textcontainerwidth={textContainerWidth}
              textcontainerleftmargin={textContainerLeftMargin}
            >
              <LegendTextMin ref={textMin}>{minValue.toLocaleString()}</LegendTextMin>
              {max > 0 && <LegendTextMax ref={textMax}>{maxValue.toLocaleString()}</LegendTextMax>}
            </LegendTextContainer>
          </LegendElements>
        </LegendBody>
      )}
    </>
  )
}

LegendItem.propTypes = {
  legendItemProps: PropTypes.shape({
    label: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    metricAliases: PropTypes.object,
    formatLegendTitle: PropTypes.func,
    formatPropertyLabel: PropTypes.func,
    formatData: PropTypes.object,
    type: PropTypes.string.isRequired,
    legendSize: PropTypes.string.isRequired,
    symbolProps: PropTypes.object,
    symbolMarginLeft: PropTypes.number.isRequired,
    setSymbolMarginLeft: PropTypes.func.isRequired,
    setOpacity: PropTypes.func.isRequired,
  }),
}

LegendItem.defaultProps = {
  legendItemProps: {
    label: '',
    max: undefined,
    min: undefined,
    metricAliases: undefined,
    formatLegendTitle: d => d,
    formatPropertyLabel: d => d,
    formatData: undefined,
    symbolProps: undefined,
  },
}

export default LegendItem
