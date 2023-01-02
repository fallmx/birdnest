const config = require('../utils/config')
const axios = require('axios')
const convert = require('xml-js')

const getAll = () => {
  const request = axios.get(config.DETECTOR_URL)
  return request.then((response) => {
    const xml = response.data
    const json = convert.xml2json(xml, { compact: true, spaces: 2 })
    return JSON.parse(json)
  })
}

module.exports = {
  getAll
}
