const config = require('../utils/config')
const axios = require('axios')
const convert = require('xml-js')

// Get information from the detector API then return as Object
const getAll = () => {
  const request = axios.get(config.DETECTOR_URL)
  return request.then((response) => {
    const xml = response.data
    return convert.xml2js(xml, { compact: true, spaces: 2 })
  })
}

module.exports = {
  getAll
}
