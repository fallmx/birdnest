const pilotRouter = require('express').Router()
const pilotService = require('../services/pilotService')

// Get violator pilot information with drone serial number
pilotRouter.get('/:id', (request, response) => {
  pilotService
    .getPilot(request.params.id)
    .then((data) => {
      response.json(data)
    })
    .catch(() => {
      response.status(404).end()
    })

})

module.exports = pilotRouter
