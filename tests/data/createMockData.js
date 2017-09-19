const locationData = require('../data/g_geocode_-41.29,174.78.json')
const weatherData = require('../data/wu.js')

const data = {}
data.locations = [{ id: 1, ...locationData }]
data.weathers = [
  {
    id: 1,
    conditions: weatherData.getConditions(),
    f: weatherData.getForecastDay(),
    h: weatherData.getForecastHours()
  }
]

const fs = require('fs')
fs.writeFileSync('./tests/data/mockdata.json', JSON.stringify(data, null, 2))
