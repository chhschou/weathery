import test from 'ava'

const { getAddrComponents } = require('../data/googleGeocode')

test('getAddrComponents works', t => {
  const expected = [
    {
      "level": 2,
      "longName": "Wellington City",
      "shortName": "Wellington City"
    },
    {
      "level": 1,
      "longName": "Wellington",
      "shortName": "Wellington"
    },
    {
      "level": 0,
      "longName": "New Zealand",
      "shortName": "NZ"
    }
  ]


  const actual = getAddrComponents()
  t.deepEqual(actual, expected)
})