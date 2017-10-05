import locations from 'modules/locations'
import geoCode from '../data/wu'
const { reducer, actionTypes } = locations

test('has correct initial state', () => {
  const expected = {
    isFetching: false,
    items: []
  }

  expect(reducer(undefined, {})).toEqual(expected)
})


test('handles RECEIVE action', () => {
  const location = geoCode.getLocation()
  const nextState = reducer(undefined, { type: actionTypes.RECEIVE, location: location })

  expect(nextState.items.length).toBe(1)
  expect(nextState.items[0]).toBe(location)
  expect(location).toMatchSnapshot()
})

test('handles update location with specific id', () => {
  const location = geoCode.getLocation()
  location.id = 5
  const nextState = reducer(undefined, { type: actionTypes.RECEIVE, location: location })

  expect(nextState.items.length).toBe(6)
  expect(nextState.items[5]).toBe(location)
  expect(location).toMatchSnapshot()
})
