// Initialize environment variables from .env
require('dotenv').config()

// Port for Express server
const PORT = process.env.PORT

// Url for drone detector API
const DETECTOR_URL = process.env.DETECTOR_URL

// Url for pilot information API
const PILOT_URL = process.env.PILOT_URL

module.exports = {
  PORT,
  DETECTOR_URL,
  PILOT_URL
}
