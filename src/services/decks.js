/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/decks'

const get = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const post = async newObject => {
  const response = await axios.post(baseUrl, newObject)
  return response
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  // response.data only send back json message, but we want status code
  return response
}

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response
}

export default { get, post, update, remove }
