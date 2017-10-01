const adapter = require('adapters/googleGeocode')
const rawResponse = require('./g_geocode_-41.29,174.78.json')

function extractLocation() {
  return adapter.extractLocation(rawResponse)
}


module.exports = {
  extractLocation
}