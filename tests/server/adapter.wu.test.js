import test from 'ava'
const data = require('../data/wu.js')

test('wu conditions adaptor works', t => {
  const actual = data.getConditions()
  const expected = {
    "timeStamp": "1504869815",
    "text": "Mostly Cloudy",
    "tempF": 55.5,
    "tempC": 13.1,
    "feelslikeF": "55.5",
    "feelslikeC": "13.1",
    "iconUrl": "http://icons.wxug.com/i/c/k/nt_mostlycloudy.gif"
  }

  t.deepEqual(actual, expected)
})

test('run this to create a mockdata.json', t => {
  const output = {}
  output.conditions = data.getConditions()
  output.f = data.getForecastDay()
  output.h = data.getForecastHours()
  const fs = require('fs')
  fs.writeFileSync('./tests/data/mockdata.json', JSON.stringify(output, null, 2))

  t.pass()
})