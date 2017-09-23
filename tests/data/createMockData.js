const locationData = require('../data/googleGeocode')
const weatherData = require('../data/wu.js')

const data = {}
data.locations = [{ id: 1, addrComponents: locationData.getAddrComponents() }]
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
