const express = require('express')
const app = express()

// Serve React frontend
app.use(express.static('build'))

const cors = require('cors')
app.use(cors())

// Violator subscribe endpoint
const sendViolators = require('./controllers/sendViolators')
app.get('/violators', sendViolators.newConnection)

// Pilot information endpoint
const pilotRouter = require('./controllers/pilot')
app.use('/pilot', pilotRouter)

module.exports = app
