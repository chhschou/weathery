const { extractLocation } = require('../data/googleGeocode')

test('extractLocation works', () => {
  const actual = extractLocation()
  expect(actual).toMatchSnapshot()
})