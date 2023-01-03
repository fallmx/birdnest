const express = require('express')
const app = express()

// Violator subscribe endpoint
const sendViolators = require('./middleware/sendViolators')
app.get('/violators', sendViolators.newConnection)

module.exports = app
