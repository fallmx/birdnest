const config = require('../utils/config')
const axios = require('axios')
const { isViolator } = require('../utils/droneViolators')

// Get pilot information only if drone has violated
const getPilot = (droneSn) => {
  if (isViolator(droneSn)) {
    const request = axios.get(`${config.PILOT_URL}/${droneSn}`)
    return request.then((response) => response.data)
  } else {
    return Promise.reject()
  }
}

module.exports = {
  getPilot
}
