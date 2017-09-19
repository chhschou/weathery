const adapter = require('../../server/adapters/googleGeocode')
const rawResponse = require('./g_geocode_-41.29,174.78.json')

function getAddrComponents() {
  return adapter.getAddrComponents(rawResponse)
}


module.exports = {
  getAddrComponents
}