const adapter = require('../../server/adapters/wu')
const rawResponse = require('./wu.json')

function getConditions() {
  // http://api.wunderground.com/api/<apikey>/conditions/q/new_zealand/Wellington.json
  return adapter.getConditions(rawResponse.conditions)
}

function getForecastDay() {
  // http://api.wunderground.com/api/<apikey>/forecast10day/q/new_zealand/Wellington.json
  return adapter.getForecastDay(rawResponse.f10)
}

function getForecastHours() {
  // http://api.wunderground.com/api/<apikey>/hourly10day/q/new_zealand/Wellington.json
  return adapter.getForecastHours(rawResponse.h10)
}

module.exports = {
  getConditions,
  getForecastDay,
  getForecastHours
}