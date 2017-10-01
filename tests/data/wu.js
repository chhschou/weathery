const adapter = require('adapters/wu')
const rawResponse = require('./wu.json')

function getConditions() {
  // https://api.wunderground.com/api/<apikey>/conditions/q/new_zealand/Wellington.json
  return adapter.getConditions(rawResponse.conditions)
}

function getForecastDays() {
  // https://api.wunderground.com/api/<apikey>/forecast10day/q/new_zealand/Wellington.json
  return adapter.getForecastDays(rawResponse.f10)
}

function getForecastHours() {
  // https://api.wunderground.com/api/<apikey>/hourly10day/q/new_zealand/Wellington.json
  return adapter.getForecastHours(rawResponse.h10)
}

module.exports = {
  getConditions,
  getForecastDays,
  getForecastHours
}