/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/users'

const signup = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { signup, update }
