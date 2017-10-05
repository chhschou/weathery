const data = require('../data/wu.js')

test('wu data adaptor works', () => {
  expect(data.getConditions()).toMatchSnapshot()
  expect(data.getLocation()).toMatchSnapshot()
  expect(data.getForecastDays()).toMatchSnapshot()
  expect(data.getForecastHours()).toMatchSnapshot()
})