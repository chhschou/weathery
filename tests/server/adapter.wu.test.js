const data = require('../data/wu.js')

test('wu conditions adaptor works', () => {
  const actual = data.getConditions()
  expect(actual).toMatchSnapshot()
})
