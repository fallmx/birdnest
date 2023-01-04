const config = require('./src/utils/config')

// Start server
const expressServer = require('./src/server')
const http = require('http')
const server = http.createServer(expressServer)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

// Start subscribing drones from the detector and sending the information to be evaluated
const droneViolators = require('./src/utils/droneViolators')
const droneSubscriber = require('./src/subscribers/droneSubscriber')
droneSubscriber.setCallbackFunction(droneViolators.evaluate)
droneSubscriber.startSubscriber()
droneSubscriber.startSuspendTimer()
