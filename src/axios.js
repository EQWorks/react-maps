import axios from 'axios'
import FirstOrder from './actions'

const getAxios = () => axios.create({
  baseURL: process.env.API_URL,
  headers: { 'eq-api-jwt': process.env.FO_TOKEN },
})

export default FirstOrder(getAxios())
