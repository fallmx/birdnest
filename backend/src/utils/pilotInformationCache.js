// Cache for pilot information
const pilotInformationCache = {}

// Return reference to cache
const getCache = () => {
  return pilotInformationCache
}

// Set information to cache
const setPilotInformation = (droneSn, data) => {
  pilotInformationCache[droneSn] = data
}

// Delete information from cache
const deletePilotInformation = (droneSn) => {
  delete pilotInformationCache[droneSn]
}

module.exports = {
  getCache,
  setPilotInformation,
  deletePilotInformation
}
