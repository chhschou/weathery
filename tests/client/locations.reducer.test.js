import locations from 'modules/locations'
import geoCode from '../data/googleGeocode'
const { reducer, actionTypes } = locations

test('has correct initial state', () => {
  const expected = {
    isFetching: false,
    items: []
  }

  expect(reducer(undefined, {})).toEqual(expected)
})


test('handles RECEIVE action', () => {
  const location = geoCode.extractLocation()
  const nextState = reducer(undefined, { type: actionTypes.RECEIVE, location: location })

  expect(nextState.items.length).toBe(1)
  expect(nextState.items[0]).toBe(location)
})

test('handles update location with specific id', () => {
  const location = geoCode.extractLocation()
  location.id = 5
  const nextState = reducer(undefined, { type: actionTypes.RECEIVE, location: location })

  expect(nextState.items.length).toBe(6)
  expect(nextState.items[5]).toBe(location)
})
