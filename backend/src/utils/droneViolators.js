const sendViolators = require('../controllers/sendViolators')

/*
  {
    '*drone serial number*': {
      closest: *closest distance to nest*,
      timer: *Timeout object to cancel the timeout*
    },
    ...
  }
*/
const violators = {}

// Checks if drone serial number is a violator
const isViolator = (droneSn) => {
  return droneSn in violators
}

// Update the closest confirmed distance and reset the 10 minute timer
const handleSee = (droneSighting) => {
  const violation = checkViolation(droneSighting)
  const violatorToUpdate = violators[droneSighting.serialNumber._text]

  violatorToUpdate.closest = Math.min(violatorToUpdate.closest, violation.distance)

  clearTimeout(violatorToUpdate.timer)
  violatorToUpdate.timer = getDeleteTimer(droneSighting.serialNumber._text)
}

// Returns a Timeout object with which to cancel the timeout
const getDeleteTimer = (droneSn) => setTimeout(() => {
  delete violators[droneSn]
}, 600000)

// Returns an objects distance from the nest/NDZ center
const distanceFromCenter = (y, x) => {
  const centerY = 250000
  const centerX = 250000

  return Math.sqrt((centerY - y) ** 2 + (centerX - x) ** 2)
}

// Returns if the drone sightings is in violation and it's distance from the nest/NDZ center
const checkViolation = (droneSighting) => {
  const droneY = Number(droneSighting.positionY._text)
  const droneX = Number(droneSighting.positionX._text)

  const zoneRadius = 100000

  const distance = distanceFromCenter(droneY, droneX)

  return {
    isViolating: distance < zoneRadius,
    distance: distance
  }
}

// Adds a new violator with it's violation distance and a self-destruct timer for 10 mins unless cancelled
const addViolator = (droneSn, distance) => {
  violators[droneSn] = {
    closest: distance,
    timer: getDeleteTimer(droneSn)
  }
}

// Finds new violations, updates existing violators and sends information forwards
const evaluate = (droneSightingsList) => {
  droneSightingsList.forEach((droneSighting) => {
    if (isViolator(droneSighting.serialNumber._text)) {
      // Update existing violator
      handleSee(droneSighting)
    } else {
      const violation = checkViolation(droneSighting)

      if (violation.isViolating) {
        // Add new violator
        addViolator(droneSighting.serialNumber._text, violation.distance)
      }
    }
  })

  // Parse information to a sendable form and send forwards
  const violatorsToSend = []
  Object.entries(violators).forEach((violator) => {
    violatorsToSend.push({
      serialNumber: violator[0],
      closest: violator[1].closest
    })
  })
  sendViolators.setViolatorsToSend(violatorsToSend)
  sendViolators.sendViolators()
}

module.exports = {
  isViolator,
  evaluate
}
