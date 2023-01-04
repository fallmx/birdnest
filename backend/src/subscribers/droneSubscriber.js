const cron = require('node-cron')
const detectorService = require('../services/detectorService')

// What to do with the detector data
let callbackFunction = null

const setCallbackFunction = (callback) => {
  callbackFunction = callback
}

// Timer to suspend scheduler
let timer = null

const startSuspendTimer = () => {
  timer = setTimeout(() => {
    console.log('suspend')
    subscriber.stop()
  }, 1_800_000) // 30 minutes
}

const stopSuspendTimer = () => {
  clearTimeout(timer)
}

// Get detector data every 2 seconds
const subscriber = cron.schedule('*/2 * * * * *', () => {
  detectorService.getAll()
    .then((data) => {
      callbackFunction(data.report.capture.drone)
    })
    .catch((error) => {
      console.log(error.message)
    })
}, {
  scheduled: false // Set scheduler to false by default
})

// Start scheduler
const startSubscriber = () => {
  subscriber.start()
}

module.exports = {
  setCallbackFunction,
  startSuspendTimer,
  stopSuspendTimer,
  startSubscriber
}
