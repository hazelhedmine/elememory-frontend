/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/users'

const get = async (id, token) => {
  // sets the token to the authorization header
  const config = {
    headers: { Authorization: `bearer ${token}` },
  }
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

const signup = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { get, signup, update }
