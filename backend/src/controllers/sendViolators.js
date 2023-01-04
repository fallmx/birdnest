const uuid = require('uuid').v4
const droneSubscriber = require('../subscribers/droneSubscriber')

/*
  [{
    id: *client uuid*,
    response: *Express Response object*
  }, ...]
*/
// Contains active connections, and the Response objects with which to send messages to clients
let clients = []

let violatorsToSend = []
let lastSent = ''

const setViolatorsToSend = (newViolators) => {
  violatorsToSend = newViolators
}

// Opens a new Server-Sent Events connection
const newConnection = (request, response) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  }

  response.writeHead(200, headers)

  // Send initial data to client
  const data = `data: ${JSON.stringify(violatorsToSend)}\n\n`
  response.write(data)

  // Open a connection
  const clientId = uuid()
  clients.push({
    id: clientId,
    response: response
  })
  console.log(`${clientId}: connection opened`)

  // Stop possible scheduler-suspend timer or possibly start subscriber
  droneSubscriber.stopSuspendTimer()
  droneSubscriber.startSubscriber()

  // Handle close client connection
  request.on('close', () => {
    clients = clients.filter((client) => client.id !== clientId)
    console.log(`${clientId}: connection closed`)
    if (clients.length === 0) {
      // If no traffic, start a timer to suspend scheduler
      droneSubscriber.startSuspendTimer()
    }
  })
}

// Send new violator state through every Server-Sent Events connection, *if changed*
const sendViolators = () => {
  const toSend = `data: ${JSON.stringify(violatorsToSend)}\n\n`

  // Check if data has changed
  if (toSend !== lastSent) {
    clients.forEach((client) => {
      client.response.write(toSend)
    })
    lastSent = toSend
  }
}

module.exports = {
  setViolatorsToSend,
  newConnection,
  sendViolators
}
