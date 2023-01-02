require('dotenv').config()

const PORT = process.env.PORT
const DETECTOR_URL = process.env.DETECTOR_URL

module.exports = {
  PORT,
  DETECTOR_URL
}
