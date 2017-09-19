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
