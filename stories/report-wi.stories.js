/* eslint-disable react/prop-types */
import React from 'react'
import { storiesOf } from '@storybook/react'
import axios from 'axios'

import FO from '../src/actions'
import ReportMap from '../src/components/report-wi-map'


const getAxios = () => axios.create({
  baseURL: process.env.API_URL,
  headers: { 'eq-api-jwt': process.env.FO_TOKEN },
})

const getReport = FO(getAxios()).getReportWi

storiesOf('Walk-In Report', module)
  .add('Basic Report', () => (
    <ReportMap getReport={getReport} report_id={4} layer_id={1} map_id={145} />
  ))
  .add('Report with Tooltip', () => (
    <ReportMap getReport={getReport} report_id={4} layer_id={1} map_id={145} useTooltip />
  ))
  .add('Radius Based On Visits', () => (
    // NOTE: large values skew this
    <ReportMap
      getReport={getReport}
      report_id={4}
      layer_id={1}
      map_id={145}
      radiusBasedOn='visits'
    />
  ))
  .add('Fill Based On Visits', () => (
    // NOTE: large values skew this
    <ReportMap
      getReport={getReport}
      report_id={4}
      layer_id={1}
      map_id={145}
      fillBasedOn='visits'
    />
  ))
  .add('Default Legend', () => (
    <ReportMap
      getReport={getReport}
      report_id={4}
      layer_id={1}
      map_id={145}
      fillBasedOn='visits'
      defaultKeyMetric='visits'
      showLegend
    />
  ))
  .add('Bottom Right Legend', () => (
    <ReportMap
      getReport={getReport}
      report_id={4}
      layer_id={1}
      map_id={145}
      fillBasedOn='visits'
      defaultKeyMetric='visits'
      showLegend
      legendPosition='bottom-right'
    />
  ))
  .add('Multiple Legends', () => (
    <ReportMap
      getReport={getReport}
      report_id={4}
      layer_id={1}
      map_id={145}
      fillBasedOn='visits'
      radiusBasedOn='visits'
      showLegend
      legendPosition='bottom-right'
    />
  ))
