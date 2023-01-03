const cron = require('node-cron')
const detectorService = require('../services/detectorService')

// What to do with the detector data
let callbackFunction = null

const setCallbackFunction = (callback) => {
  callbackFunction = callback
}

// Get detector data every 2 seconds
const subscriber = cron.schedule('*/2 * * * * *', () => {
  detectorService.getAll()
    .then((data) => {
      callbackFunction(data.report.capture.drone)
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
  startSubscriber
}
