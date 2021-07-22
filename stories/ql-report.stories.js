/* eslint-disable react/prop-types */
import React from 'react'
import { storiesOf } from '@storybook/react'

import { QLReportMap } from '../src'
import { getCursor } from '../src/utils'
import vwiJson from './data/locus-ml-vwi.json'
import vwiJsonZero from './data/locus-ql-zero.json'


const mapboxApiAccessToken = process.env.MAPBOX_ACCESS_TOKEN || process.env.STORYBOOK_MAPBOX_ACCESS_TOKEN

const formatPropertyLabel = (s) => [
  s.charAt(0).toUpperCase(),
  s.slice(1).replace(/_/g, ' '),
].join('')

const truncate = (fullStr, strLen, separator = ' ... ') => {
  if (fullStr.length <= strLen) {
    return fullStr
  }
  const sepLen = separator.length
  const charsToShow = strLen - sepLen
  const frontChars = Math.ceil(charsToShow / 2)
  const backChars = Math.floor(charsToShow / 2)

  return fullStr.substr(0, frontChars)
           + separator
           + fullStr.substr(fullStr.length - backChars)
}

storiesOf('Locus QL Report', module)
  .add('VWI - basic', () => (
    <QLReportMap
      reportData={vwiJson}
      mapboxApiAccessToken={mapboxApiAccessToken}
    />
  ))
  .add('VWI - default cursor on hover and default zoom on click', () => (
    <QLReportMap
      reportData={vwiJson}
      getCursor={getCursor()}
      mapboxApiAccessToken={mapboxApiAccessToken}
    />
  ))
  .add('VWI - disable default onClick and cursor', () => (
    <QLReportMap
      reportData={vwiJson}
      onClick={() => {}}
      mapboxApiAccessToken={mapboxApiAccessToken}
    />
  ))
  .add('VWI - data-based radius', () => (
    <QLReportMap
      reportData={vwiJson}
      getCursor={getCursor()}
      radiusBasedOn={'converted_visits'}
      mapboxApiAccessToken={mapboxApiAccessToken}
    />
  ))
  .add('VWI - data-based colour fill', () => (
    <QLReportMap
      reportData={vwiJson}
      getCursor={getCursor()}
      fillBasedOn={'converted_unique_visitors'}
      mapboxApiAccessToken={mapboxApiAccessToken}
    />
  ))
  .add('VWI - tooltip', () => (
    <QLReportMap
      reportData={vwiJson}
      getCursor={getCursor()}
      showTooltip={true}
      radiusBasedOn={'converted_visits'}
      fillBasedOn={'converted_unique_visitors'}
      mapboxApiAccessToken={mapboxApiAccessToken}
    />
  ))
  .add('VWI - show legend for data-based radius', () => (
    <QLReportMap
      reportData={vwiJson}
      getCursor={getCursor()}
      showTooltip={true}
      radiusBasedOn={'converted_unique_visitors_single_visit'}
      showLegend={true}
      mapboxApiAccessToken={mapboxApiAccessToken}
    />
  ))
  .add('VWI - show legend for data-based colour tones', () => (
    <QLReportMap
      reportData={vwiJson}
      getCursor={getCursor()}
      showTooltip={true}
      fillBasedOn={'converted_unique_visitors'}
      showLegend={true}
      mapboxApiAccessToken={mapboxApiAccessToken}
    />
  ))
  .add('VWI - custom opacity', () => (
    <QLReportMap
      reportData={vwiJson}
      getCursor={getCursor()}
      showTooltip={true}
      radiusBasedOn={'converted_visits'}
      showLegend={true}
      opacity={.1}
      mapboxApiAccessToken={mapboxApiAccessToken}
    />
  ))
  .add('VWI - zero min and max values for radius and radiusFill legend', () => (
    <QLReportMap
      reportData={vwiJsonZero}
      getCursor={getCursor()}
      showTooltip={true}
      radiusBasedOn={'visits'}
      fillBasedOn={'converted_unique_visitors_single_visit'}
      showLegend={true}
      opacity={.5}
      mapboxApiAccessToken={mapboxApiAccessToken}
    />
  ))
  .add('VWI - format property key in Legend title and Tooltip keys', () => (
    <QLReportMap
      reportData={vwiJson}
      getCursor={getCursor()}
      showTooltip={true}
      radiusBasedOn={'visits'}
      fillBasedOn={'converted_unique_visitors_single_visit'}
      formatPropertyLabel={formatPropertyLabel}
      showLegend={true}
      opacity={.5}
      mapboxApiAccessToken={mapboxApiAccessToken}
    />
  ))
  .add('VWI - format tootltip title', () => (
    <QLReportMap
      reportData={vwiJson}
      getCursor={getCursor()}
      showTooltip={true}
      radiusBasedOn={'visits'}
      formatPropertyLabel={formatPropertyLabel}
      formatTooltipTitle={(title) => truncate(title, 20)}
      showLegend={true}
      opacity={.5}
      mapboxApiAccessToken={mapboxApiAccessToken}
    />
  ))
