/* eslint-disable react/prop-types */
import React from 'react'
import { storiesOf } from '@storybook/react'
import axios from 'axios'

import FO from '../src/actions'
import PopularTimesMap from '../src/components/popular-times-map'


const getAxios = () => axios.create({
  baseURL: process.env.API_URL,
  headers: { 'eq-api-jwt': process.env.FO_TOKEN },
})

const getPopularTimes = FO(getAxios()).getPopularTime

storiesOf('Popular Time', module)
  .add('Basic',  () => <PopularTimesMap getPopularTimes={getPopularTimes} />)