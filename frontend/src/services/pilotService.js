import axios from 'axios'
const baseUrl = '/pilot'

// Get pilot information from backend
const getPilot = (droneSn) => {
  const request = axios.get(`${baseUrl}/${droneSn}`)
  return request.then((response) => response.data)
}

export default {
  getPilot
}
