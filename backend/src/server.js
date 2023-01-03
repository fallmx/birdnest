const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.static('build'))

app.use(cors())

// Violator subscribe endpoint
const sendViolators = require('./controllers/sendViolators')
app.get('/violators', sendViolators.newConnection)

// Pilot information endpoint
const pilotRouter = require('./controllers/pilot')
app.use('/pilot', pilotRouter)

module.exports = app
