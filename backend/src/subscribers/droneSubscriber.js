const cron = require('node-cron')
const detectorService = require('../services/detectorService')

let callbackFunction = null

const setCallbackFunction = (callback) => {
  callbackFunction = callback
}

const subscriber = cron.schedule('*/2 * * * * *', () => {
  detectorService.getAll()
    .then((data) => {
      callbackFunction(data.report.capture.drone)
    })
}, {
  scheduled: false
})

const startSubscriber = () => {
  subscriber.start()
}

module.exports = {
  setCallbackFunction,
  startSubscriber
}
