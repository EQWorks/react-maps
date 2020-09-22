/* eslint-disable react/prop-types */
import React from 'react'
import { storiesOf } from '@storybook/react'
import axios from 'axios'

import FO from '../src/actions'
import { LocusMLMap } from '../src'


const getAxios = () => axios.create({
  baseURL: process.env.API_URL,
  headers: { 'eq-api-jwt': process.env.FO_TOKEN },
})

const postMLQuery = FO(getAxios()).postMLQuery

storiesOf('Locus ML', module)
  .add('Raw Input', () => (
    <LocusMLMap postMLQuery={postMLQuery} radiusBasedOnInit='' useRawInput />
  ))
  .add('Distance onClick', () => (
    <LocusMLMap postMLQuery={postMLQuery} radiusBasedOnInit='' />
  ))
  .add('ST_Contains with Draw', () => (
    <LocusMLMap postMLQuery={postMLQuery} />
  ))
