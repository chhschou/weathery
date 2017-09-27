import weathers from 'modules/weathers'

test('has correct initialstate', () => {
  const expected = {
    isFetching: new Set(),
    items: {}
  }

  const nextState = weathers.reducer(undefined, {})
  expect(nextState).toEqual(expected)
})
