const config = require('../utils/config')
const axios = require('axios')
const { isViolator } = require('../utils/droneViolators')
const pilotInformationCache = require('../utils/pilotInformationCache')

// Get pilot information only if drone has violated
const getPilot = (droneSn) => {
  if (isViolator(droneSn)) {
    const cache = pilotInformationCache.getCache()
    if (droneSn in cache) {
      // Get info from cache
      return Promise.resolve(cache[droneSn])
    } else {
      // Get info from API
      const request = axios.get(`${config.PILOT_URL}/${droneSn}`)
      return request.then((response) => {
        const data = response.data
        pilotInformationCache.setPilotInformation(droneSn, data)
        return data
      })
    }
  } else {
    return Promise.reject()
  }
}

module.exports = {
  getPilot
}
